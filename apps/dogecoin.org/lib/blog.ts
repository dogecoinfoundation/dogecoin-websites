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
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => e.name.replace(/\.md$/, ''));
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  const dir = getBlogContentDir();
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const posts: BlogPostMeta[] = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const filePath = path.join(dir, entry.name);
    const raw = await fs.readFile(filePath, 'utf8');
    const { data } = matter(raw);

    const slug = entry.name.replace(/\.md$/, '');
    const date = new Date(String(data.date));
    const year = date.getFullYear();

    posts.push({
      slug,
      title: String(data.title ?? slug),
      date: date.toISOString(),
      year,
      type: (data.type ?? 'Article') as BlogPostType,
      image: String(data.image ?? '/assets/images/activity-dogecoin.png'),
      excerpt: data.excerpt != null ? String(data.excerpt) : undefined,
      author: data.author != null ? String(data.author) : undefined,
    });
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const dir = getBlogContentDir();
  const filePath = path.join(dir, `${slug}.md`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);

    const html = await marked.parse(preprocessMarkdown(content));
    const date = new Date(String(data.date));
    const year = date.getFullYear();

    return {
      slug,
      title: String(data.title ?? slug),
      date: date.toISOString(),
      year,
      type: (data.type ?? 'Article') as BlogPostType,
      image: String(data.image ?? '/assets/images/activity-dogecoin.png'),
      excerpt: data.excerpt != null ? String(data.excerpt) : undefined,
      author: data.author != null ? String(data.author) : undefined,
      html: typeof html === 'string' ? html : String(html),
    };
  } catch {
    return null;
  }
}

// Lightweight preprocessor to support custom flags in markdown
// - [Label](url) {{gold-button}} -> <a class="gold-button" href="url">Label</a>
// - {{card-list}} followed by markdown list items becomes a custom card list
function preprocessMarkdown(content: string): string {
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


