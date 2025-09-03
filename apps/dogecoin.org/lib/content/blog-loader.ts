import { ContentLoader } from './loader';
import type { BlogPostMeta, BlogPost } from './types';

export class BlogLoader extends ContentLoader {
  constructor() {
    super({
      contentType: 'blog',
      contentDir: 'blog',
      defaultImage: '/assets/images/activity-dogecoin.png',
      sortBy: 'date',
      sortOrder: 'desc'
    });
  }

  async getAllBlogPosts(locale: string): Promise<BlogPostMeta[]> {
    const items = await this.getAllContent(locale);
    return items.map(item => {
      const date = new Date(item.date);
      return {
        ...item,
        year: date.getFullYear(),
        type: (item.type ?? 'Article') as BlogPostMeta['type'],
        author: item.author as string | undefined
      } as BlogPostMeta;
    });
  }

  async getBlogPostBySlug(slug: string, locale: string): Promise<BlogPost | null> {
    const item = await this.getContentBySlug(slug, locale);
    if (!item) return null;
    
    const date = new Date(item.date);
    return {
      ...item,
      year: date.getFullYear(),
      type: (item.type ?? 'Article') as BlogPostMeta['type'],
      author: item.author
    } as BlogPost;
  }

  protected preprocessMarkdown(content: string, slug: string): string {
    let result = super.preprocessMarkdown(content, slug);

    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)\s*\{\{gold-button\}\}/g, (_m, label, url) => {
      return `<a class="gold-button" href="${url}">${label}</a>`;
    });

    result = result.replace(/\{\{gold-text\}\}([\s\S]*?)\{\{\/gold-text\}\}/g, (_m, inner) => {
      return `<span class="gold-text">${String(inner).trim()}</span>`;
    });

    const lines = result.split(/\r?\n/);
    const out: string[] = [];
    
    for (let i = 0; i < lines.length; i += 1) {
      const line = String(lines[i] ?? '');

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
          const mDash = /^\s*[-*]\s+(.+)$/.exec(l);
          const mNum = /^\s*\d+\.\s+(.+)$/.exec(l);
          if (mDash?.[1] != null) {
            items.push(mDash[1]);
          } else if (mNum?.[1] != null) {
            items.push(mNum[1]);
          } else {
            break;
          }
        }
        const listHtml = [
          '<ul class="card-list">',
          ...items.map((text, idx) => `<li><div class="card-list-number">${idx + 1}</div><p>${text}</p></li>`),
          '</ul>',
          '',
        ].join('\n');
        out.push(listHtml);
        i = j - 1;
        continue;
      }
      
      out.push(line);
    }

    return out.join('\n');
  }
}