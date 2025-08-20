import path from 'node:path';
import fs from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';

export type BlogPostType = 'Article' | 'Important' | 'Event';

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string; // ISO string
  year: number;
  type: BlogPostType;
  image: string; // public path
  excerpt?: string;
  author?: string;
}

export interface BlogPost extends BlogPostMeta {
  html: string;
}

function getBlogContentDir(): string {
  // During build and runtime, CWD is the app root (apps/dogecoin.org)
  return path.join(process.cwd(), 'content', 'blog');
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const dir = getBlogContentDir();
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
}

export async function getAllBlogPosts(locale: string): Promise<BlogPostMeta[]> {
  const dir = getBlogContentDir();
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const posts: BlogPostMeta[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const filePath = await resolveLocaleMarkdownFile(path.join(dir, slug), locale);
    if (!filePath) continue;
    const raw = await fs.readFile(filePath, 'utf8');
    const { data } = matter(raw);

    const date = new Date(String(data.date));
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date in blog post ${slug}: ${data.date}`);
      continue;
    }
    const year = date.getFullYear();

    posts.push({
      slug,
      title: String(data.title ?? slug),
      date: date.toISOString(),
      year,
      type: (data.type ?? 'Article') as BlogPostType,
      image: normalizeImagePath(String(data.image ?? '/assets/images/activity-dogecoin.png'), slug),
      excerpt: data.excerpt != null ? String(data.excerpt) : undefined,
      author: data.author != null ? String(data.author) : undefined,
    });
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export async function getBlogPostBySlug(slug: string, locale: string): Promise<BlogPost | null> {
  const dir = getBlogContentDir();
  const folder = path.join(dir, slug);
  const filePath = await resolveLocaleMarkdownFile(folder, locale);
  if (!filePath) return null;
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);

    const html = await marked.parse(preprocessMarkdown(content, slug));
    const date = new Date(String(data.date));
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date in blog post ${slug}: ${data.date}`);
      return null;
    }
    const year = date.getFullYear();

    return {
      slug,
      title: String(data.title ?? slug),
      date: date.toISOString(),
      year,
      type: (data.type ?? 'Article') as BlogPostType,
      image: normalizeImagePath(String(data.image ?? '/assets/images/activity-dogecoin.png'), slug),
      excerpt: data.excerpt != null ? String(data.excerpt) : undefined,
      author: data.author != null ? String(data.author) : undefined,
      html: typeof html === 'string' ? html : String(html),
    };
  } catch {
    return null;
  }
}

async function resolveLocaleMarkdownFile(folder: string, locale: string): Promise<string | null> {
  try {
    const entries = await fs.readdir(folder, { withFileTypes: true });
    // Prefer exact "<locale>.md"
    const exact = entries.find((e) => e.isFile() && e.name === `${locale}.md`);
    if (exact) return path.join(folder, exact.name);
    // Then files that start with "<locale>-*.md"
    const prefixed = entries.find((e) => e.isFile() && e.name.startsWith(`${locale}-`) && e.name.endsWith('.md'));
    if (prefixed) return path.join(folder, prefixed.name);
    // Fallback to English
    const enExact = entries.find((e) => e.isFile() && e.name === 'en.md');
    if (enExact) return path.join(folder, enExact.name);
    const enPrefixed = entries.find((e) => e.isFile() && e.name.startsWith('en-') && e.name.endsWith('.md'));
    if (enPrefixed) return path.join(folder, enPrefixed.name);
    return null;
  } catch {
    return null;
  }
}

function normalizeImagePath(imageFromFrontmatter: string, slug: string): string {
  // If it's an absolute path already, keep it
  if (imageFromFrontmatter.startsWith('/')) return imageFromFrontmatter;
  // Otherwise, treat it as a path relative to the blog folder and map into public assets
  const normalized = imageFromFrontmatter.replace(/^\.\//, '');
  return `/assets/blog/${slug}/${normalized}`;
}

// Lightweight preprocessor to support custom flags in markdown
// - [Label](url) {{gold-button}} -> <a class="gold-button" href="url">Label</a>
// - {{card-list}} followed by markdown list items becomes a custom card list
function preprocessMarkdown(content: string, slug: string): string {
  // Transform gold buttons placed as trailing flags after a markdown link
  let result = content.replace(/\[([^\]]+)\]\(([^)]+)\)\s*\{\{gold-button\}\}/g, (_m, label, url) => {
    return `<a class="gold-button" href="${url}">${label}</a>`;
  });

  // Inline gold-text: replace anywhere in the text before block handling
  // Example: Some {{gold-text}}shiny words{{/gold-text}} inside a paragraph
  result = result.replace(/\{\{gold-text\}\}([\s\S]*?)\{\{\/gold-text\}\}/g, (_m, inner) => {
    return `<span class="gold-text">${String(inner).trim()}</span>`;
  });

  // Transform card-list blocks
  // Rewrite relative image links to point to copied public assets
  // Example: ![Alt](image.png) or ![Alt](./images/hero.jpg) -> /assets/blog/<slug>/image.png
  result = result.replace(/!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g, (_m, alt, src) => {
    const cleaned = String(src).trim().replace(/^\.\//, '');
    const mapped = `/assets/blog/${slug}/${cleaned}`;
    const safeAlt = String(alt ?? '').replace(/"/g, '&quot;');
    return `![$${safeAlt}](${mapped})`.replace('$', '');
  });

  const lines = result.split(/\r?\n/);
  const out: string[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = String(lines[i] ?? '');

    // centered-heading block
    if (/^\s*\{\{centered-heading\}\}\s*$/.test(line)) {
      const buf: string[] = [];
      let j = i + 1;
      for (; j < lines.length; j += 1) {
        const l = String(lines[j] ?? '');
        if (/^\s*\{\{\/centered-heading\}\}\s*$/.test(l)) {
          j += 1;
          break;
        }
        buf.push(l);
      }
      const inner = buf.join('\n').trim();
      out.push(`<div class="centered-heading">${inner}</div>`);
      i = j - 1;
      continue;
    }

    // centered-gold-heading block
    if (/^\s*\{\{centered-gold-heading\}\}\s*$/.test(line)) {
      const buf: string[] = [];
      let j = i + 1;
      for (; j < lines.length; j += 1) {
        const l = String(lines[j] ?? '');
        if (/^\s*\{\{\/centered-gold-heading\}\}\s*$/.test(l)) {
          j += 1;
          break;
        }
        buf.push(l);
      }
      const inner = buf.join('\n').trim();
      out.push(`<div class="centered-gold-heading">${inner}</div>`);
      i = j - 1;
      continue;
    }

    // gold-text (paragraph) block
    if (/^\s*\{\{gold-text\}\}\s*$/.test(line)) {
      const buf: string[] = [];
      let j = i + 1;
      for (; j < lines.length; j += 1) {
        const l = String(lines[j] ?? '');
        if (/^\s*\{\{\/gold-text\}\}\s*$/.test(l)) {
          j += 1;
          break;
        }
        buf.push(l);
      }
      const inner = buf.join('\n').trim();
      out.push(`<p class="gold-text">${inner}</p>`);
      i = j - 1;
      continue;
    }
    if (/^\s*\{\{card-list\}\}\s*$/.test(line)) {
      const items: string[] = [];
      let j = i + 1;
      for (; j < lines.length; j += 1) {
        const l = String(lines[j] ?? '');
        if (/^\s*$/.test(l)) break;
        const mDash = l.match(/^\s*[-*]\s+(.+)$/);
        const mNum = l.match(/^\s*\d+\.\s+(.+)$/);
        if (mDash && mDash[1] != null) {
          items.push(mDash[1]);
        } else if (mNum && mNum[1] != null) {
          items.push(mNum[1]);
        } else {
          // Not a list item, stop block
          break;
        }
      }
      // Build custom list HTML
      const listHtml = [
        '<ul class="card-list">',
        ...items.map((text, idx) => `<li><div class="card-list-number">${idx + 1}</div><p>${text}</p></li>`),
        '</ul>',
        '',
      ].join('\n');
      out.push(listHtml);
      i = j - 1; // continue after processed block
      continue;
    }
    out.push(line);
  }

  return out.join('\n');
}


