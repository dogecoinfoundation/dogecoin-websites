import path from 'node:path';
import fs from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { ContentConfig, ContentMeta, ContentItem } from './types';

export class ContentLoader {
  private config: ContentConfig;

  constructor(config: ContentConfig) {
    this.config = config;
  }

  private async loadLocalMetadata(itemFolder: string): Promise<Record<string, any>> {
    try {
      const metadataPath = path.join(itemFolder, 'metadata.json');
      const raw = await fs.readFile(metadataPath, 'utf8');
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  private isDevelopment(): boolean {
    return process.env.NODE_ENV !== 'production' && process.env.STATIC_EXPORT !== 'true';
  }

  private getContentDir(): string {
    return path.join(process.cwd(), 'content', this.config.contentDir);
  }

  async getAllSlugs(): Promise<string[]> {
    const dir = this.getContentDir();
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      return entries
        .filter((e) => e.isDirectory())
        .map((e) => e.name);
    } catch {
      return [];
    }
  }

  async getAllContent(locale: string): Promise<ContentMeta[]> {
    const dir = this.getContentDir();
    const isDev = this.isDevelopment();
    
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      const items: ContentMeta[] = [];

      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const slug = entry.name;
        const itemFolder = path.join(dir, slug);
        const filePath = await this.resolveLocaleMarkdownFile(itemFolder, locale);
        if (!filePath) continue;

        const raw = await fs.readFile(filePath, 'utf8');
        const { data } = matter(raw);

        // Load local metadata
        const localMetadata = await this.loadLocalMetadata(itemFolder);

        const meta = this.processMeta(slug, data, localMetadata);
        if (!meta) continue;

        // Filter out draft content in production/static export
        if (meta.draft && !isDev) continue;

        items.push(meta);
      }

      return this.sortContent(items);
    } catch {
      return [];
    }
  }

  async getAllContentWithExtractedData(locale: string): Promise<ContentMeta[]> {
    const dir = this.getContentDir();
    const isDev = this.isDevelopment();
    
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      const items: ContentMeta[] = [];

      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const slug = entry.name;
        const itemFolder = path.join(dir, slug);
        const filePath = await this.resolveLocaleMarkdownFile(itemFolder, locale);
        if (!filePath) continue;

        const raw = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(raw);

        // Load local metadata
        const localMetadata = await this.loadLocalMetadata(itemFolder);

        const meta = this.processMeta(slug, data, localMetadata);
        if (!meta) continue;

        // Filter out draft content in production/static export
        if (meta.draft && !isDev) continue;

        // Extract title, subtitle, description and summary from content
        const title = this.extractTitleFromContent(content);
        const subtitle = this.extractSubtitleFromContent(content);
        const description = this.extractDescriptionFromContent(content);
        const summary = this.extractSummaryFromContent(content);

        items.push({
          ...meta,
          title: title || meta.title, // fallback to meta title if content title not found
          subtitle,
          description,
          summary
        });
      }

      return this.sortContent(items);
    } catch {
      return [];
    }
  }

  async getContentBySlug(slug: string, locale: string): Promise<ContentItem | null> {
    const dir = this.getContentDir();
    const folder = path.join(dir, slug);
    const filePath = await this.resolveLocaleMarkdownFile(folder, locale);
    const isDev = this.isDevelopment();
    
    if (!filePath) return null;
    
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(raw);

      const processedContent = this.preprocessMarkdown(content, slug);
      const html = await marked.parse(processedContent);

      // Load local metadata
      const localMetadata = await this.loadLocalMetadata(folder);

      const meta = this.processMeta(slug, data, localMetadata);
      if (!meta) return null;

      // Filter out draft content in production/static export
      if (meta.draft && !isDev) return null;

      return {
        ...meta,
        html: typeof html === 'string' ? html : String(html),
      };
    } catch {
      return null;
    }
  }

  async getContentBySlugWithExtractedData(slug: string, locale: string): Promise<ContentItem | null> {
    const dir = this.getContentDir();
    const folder = path.join(dir, slug);
    const filePath = await this.resolveLocaleMarkdownFile(folder, locale);
    const isDev = this.isDevelopment();
    
    if (!filePath) return null;
    
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(raw);

      const processedContent = this.preprocessMarkdown(content, slug);
      const html = await marked.parse(processedContent);

      // Load local metadata
      const localMetadata = await this.loadLocalMetadata(folder);

      const meta = this.processMeta(slug, data, localMetadata);
      if (!meta) return null;

      // Filter out draft content in production/static export
      if (meta.draft && !isDev) return null;

      // Extract title, subtitle, description and summary from content
      const title = this.extractTitleFromContent(content);
      const subtitle = this.extractSubtitleFromContent(content);
      const description = this.extractDescriptionFromContent(content);
      const summary = this.extractSummaryFromContent(content);

      return {
        ...meta,
        title: title || meta.title,
        subtitle,
        description,
        summary,
        html: typeof html === 'string' ? html : String(html),
      };
    } catch {
      return null;
    }
  }

  private processMeta(slug: string, data: any, localMetadata: Record<string, any>): ContentMeta | null {
    // Merge local metadata with file metadata, prioritizing local for core fields
    const mergedData = {
      ...localMetadata,  // Local metadata first
      ...data,           // File metadata second (can override title and content-specific fields)
    };

    // Use date from local metadata if available, otherwise from file
    const dateValue = localMetadata.date || data.date;
    if (!dateValue) {
      console.warn(`No date found for ${this.config.contentType} item ${slug}`);
      return null;
    }

    const date = new Date(String(dateValue));
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date in ${this.config.contentType} item ${slug}: ${dateValue}`);
      return null;
    }

    const imageValue = localMetadata.image || data.image || this.config.defaultImage;
    const baseM = {
      slug,
      title: String(data.title || localMetadata.title || slug),  // Allow file to override title, fallback to slug
      date: date.toISOString(),
      image: this.normalizeImagePath(String(imageValue), slug),
      excerpt: localMetadata.excerpt || data.excerpt || undefined,
      draft: Boolean(localMetadata.draft),  // Draft flag from local metadata only
    };

    return {
      ...mergedData,
      ...baseM,
    };
  }

  private sortContent(items: ContentMeta[]): ContentMeta[] {
    const { sortBy = 'date', sortOrder = 'desc' } = this.config;
    
    return items.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'date') {
        comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      }
      
      return sortOrder === 'asc' ? -comparison : comparison;
    });
  }

  private async resolveLocaleMarkdownFile(folder: string, locale: string): Promise<string | null> {
    try {
      const entries = await fs.readdir(folder, { withFileTypes: true });
      const exact = entries.find((e) => e.isFile() && e.name === `${locale}.md`);
      if (exact) return path.join(folder, exact.name);
      
      const prefixed = entries.find((e) => e.isFile() && e.name.startsWith(`${locale}-`) && e.name.endsWith('.md'));
      if (prefixed) return path.join(folder, prefixed.name);
      
      const enExact = entries.find((e) => e.isFile() && e.name === 'en.md');
      if (enExact) return path.join(folder, enExact.name);
      
      const enPrefixed = entries.find((e) => e.isFile() && e.name.startsWith('en-') && e.name.endsWith('.md'));
      if (enPrefixed) return path.join(folder, enPrefixed.name);
      
      return null;
    } catch {
      return null;
    }
  }

  private normalizeImagePath(imageFromFrontmatter: string, slug: string): string {
    if (imageFromFrontmatter.startsWith('/')) return imageFromFrontmatter;
    const normalized = imageFromFrontmatter.replace(/^\.\//, '');
    return `/assets/${this.config.contentType}/${slug}/${normalized}`;
  }

  protected preprocessMarkdown(content: string, slug: string): string {
    let result = content;
    
    result = result.replace(/!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g, (_m, alt, src) => {
      const cleaned = String(src).trim().replace(/^\.\//, '');
      const mapped = `/assets/${this.config.contentType}/${slug}/${cleaned}`;
      const safeAlt = String(alt ?? '').replace(/"/g, '&quot;');
      return `![${safeAlt}](${mapped})`;
    });

    return result;
  }

  protected parseMetadataSection(content: string): Record<string, any> {
    const metadataMatch = content.match(/^<!--\s*METADATA\s*\n([\s\S]*?)\n-->/);
    if (!metadataMatch || !metadataMatch[1]) return {};

    const metadataContent = metadataMatch[1];
    const metadata: Record<string, any> = {};

    // Parse simple key-value pairs
    const lines = metadataContent.split('\n');
    let currentKey = '';
    let currentValue = '';
    let inKeyPoints = false;
    const keyPoints: string[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      if (trimmedLine === 'keyPoints:') {
        if (currentKey && currentValue) {
          metadata[currentKey] = currentValue.trim();
        }
        inKeyPoints = true;
        currentKey = '';
        currentValue = '';
        continue;
      }

      if (inKeyPoints) {
        if (trimmedLine.startsWith('- ')) {
          keyPoints.push(trimmedLine.substring(2).trim());
        } else {
          // End of keyPoints, start new key
          inKeyPoints = false;
          if (keyPoints.length > 0) {
            metadata.keyPoints = keyPoints.slice();
          }
          // Parse the new key-value pair
          const colonIndex = trimmedLine.indexOf(':');
          if (colonIndex !== -1) {
            currentKey = trimmedLine.substring(0, colonIndex).trim();
            currentValue = trimmedLine.substring(colonIndex + 1).trim();
          }
        }
      } else {
        const colonIndex = trimmedLine.indexOf(':');
        if (colonIndex !== -1) {
          if (currentKey && currentValue) {
            metadata[currentKey] = currentValue.trim();
          }
          currentKey = trimmedLine.substring(0, colonIndex).trim();
          currentValue = trimmedLine.substring(colonIndex + 1).trim();
        } else {
          // Continuation of previous value
          if (currentValue) {
            currentValue += ' ' + trimmedLine;
          }
        }
      }
    }

    // Add the last key-value pair
    if (currentKey && currentValue) {
      metadata[currentKey] = currentValue.trim();
    }
    if (inKeyPoints && keyPoints.length > 0) {
      metadata.keyPoints = keyPoints;
    }

    return metadata;
  }

  protected extractTitleFromContent(content: string): string | undefined {
    const metadata = this.parseMetadataSection(content);
    return metadata.title || undefined;
  }

  protected extractSubtitleFromContent(content: string): string | undefined {
    const metadata = this.parseMetadataSection(content);
    return metadata.subtitle || undefined;
  }

  protected extractDescriptionFromContent(content: string): string | undefined {
    const metadata = this.parseMetadataSection(content);
    return metadata.description || undefined;
  }

  protected extractSummaryFromContent(content: string): { text: string; keyPoints?: string[] } | undefined {
    const metadata = this.parseMetadataSection(content);
    if (!metadata.summary) return undefined;

    return {
      text: metadata.summary,
      keyPoints: metadata.keyPoints && metadata.keyPoints.length > 0 ? metadata.keyPoints : undefined
    };
  }
}