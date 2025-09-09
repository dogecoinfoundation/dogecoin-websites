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

  private async loadLocalMetadata(itemFolder: string): Promise<Record<string, unknown>> {
    try {
      const metadataPath = path.join(itemFolder, 'metadata.json');
      const raw = await fs.readFile(metadataPath, 'utf8');
      return JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return {};
    }
  }

  private isDevelopment(): boolean {
    // eslint-disable-next-line no-restricted-properties, turbo/no-undeclared-env-vars
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
          title: title ?? meta.title, // fallback to meta title if content title not found
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
      let html = await marked.parse(processedContent);
      
      // Post-process to handle layout wrappers
      html = this.postprocessHtml(html);

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
      let html = await marked.parse(processedContent);
      
      // Post-process to handle layout wrappers
      html = this.postprocessHtml(html);

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
        title: title ?? meta.title,
        subtitle,
        description,
        summary,
        html: typeof html === 'string' ? html : String(html),
      };
    } catch {
      return null;
    }
  }

  private processMeta(slug: string, data: unknown, localMetadata: Record<string, unknown>): ContentMeta | null {
    const dataObj = data as Record<string, unknown>;
    // Merge local metadata with file metadata, prioritizing local for core fields
    const mergedData = {
      ...localMetadata,  // Local metadata first
      ...dataObj,           // File metadata second (can override title and content-specific fields)
    };

    // Use date from local metadata if available, otherwise from file
    const dateValue = localMetadata.date ?? dataObj.date;
    if (!dateValue) {
      console.warn(`No date found for ${this.config.contentType} item ${slug}`);
      return null;
    }

    const date = new Date(dateValue as string | number | Date);
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date in ${this.config.contentType} item ${slug}: ${JSON.stringify(dateValue)}`);
      return null;
    }

    const title = (dataObj.title ?? localMetadata.title ?? slug) as string;
    const image = (localMetadata.image ?? dataObj.image ?? this.config.defaultImage) as string;
    
    const baseM = {
      slug,
      title,  // Allow file to override title, fallback to slug
      date: date.toISOString(),
      image: this.normalizeImagePath(image, slug),
      excerpt: (localMetadata.excerpt ?? dataObj.excerpt ?? undefined) as string | undefined,
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
    
    // Handle image path mapping
    result = result.replace(/!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g, (_m, alt, src) => {
      const cleaned = String(src).trim().replace(/^\.\//, '');
      const mapped = `/assets/${this.config.contentType}/${slug}/${cleaned}`;
      const safeAlt = String(alt ?? '').replace(/"/g, '&quot;');
      return `![${safeAlt}](${mapped})`;
    });

    // Handle custom image styling
    result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)\s*\{\{(small-image|square-image)\}\}/g, (_m, alt, src, styleClass) => {
      const safeAlt = String(alt ?? '').replace(/"/g, '&quot;');
      return `<img src="${src}" alt="${safeAlt}" class="${styleClass}">`;
    });

    // Handle simple content wrappers
    result = result.replace(/\{\{(centered-heading|image-caption)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (_m, className, content) => {
      return `<div class="${className}">${content.trim()}</div>`;
    });

    // Handle gold buttons
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)\s*\{\{gold-button\}\}/g, (_m, text, url) => {
      return `<a href="${url}" class="gold-button">${text}</a>`;
    });

    return result;
  }

  protected postprocessHtml(html: string): string {
    let result = html;
    
    // Process two-column layouts
    // First, handle the column-divider marker
    result = result.replace(/<p>\{\{two-column\}\}<\/p>([\s\S]*?)<p>\{\{column-divider\}\}<\/p>([\s\S]*?)<p>\{\{\/two-column\}\}<\/p>/g,
      (_m, leftContent, rightContent) => {
        // Group image + caption combinations in the left content
        const processedLeftContent = this.groupImageCaptions(leftContent.trim());
        return `<div class="image-text-layout">${processedLeftContent}<div class="text-content">${rightContent.trim()}</div></div>`;
      }
    );
    
    // Alternative pattern if markers are not wrapped in p tags
    result = result.replace(/\{\{two-column\}\}([\s\S]*?)\{\{column-divider\}\}([\s\S]*?)\{\{\/two-column\}\}/g,
      (_m, leftContent, rightContent) => {
        // Group image + caption combinations in the left content
        const processedLeftContent = this.groupImageCaptions(leftContent.trim());
        return `<div class="image-text-layout">${processedLeftContent}<div class="text-content">${rightContent.trim()}</div></div>`;
      }
    );
    
    return result;
  }

  private groupImageCaptions(content: string): string {
    // Group square/small images with their following captions
    let result = content;
    
    // Match image followed by caption and wrap them together
    result = result.replace(
      /(<img[^>]*class="[^"]*(?:square-image|small-image)[^"]*"[^>]*>)\s*(<div class="image-caption">[\s\S]*?<\/div>)/g,
      '<div class="image-with-caption">$1$2</div>'
    );
    
    return result;
  }

  protected parseMetadataSection(content: string): Record<string, unknown> {
    const metadataMatch = /^<!--\s*METADATA\s*\n([\s\S]*?)\n-->/.exec(content);
    if (!metadataMatch?.[1]) return {};

    const metadataContent = metadataMatch[1];
    const metadata: Record<string, unknown> = {};

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
    return (metadata.title as string) || undefined;
  }

  protected extractSubtitleFromContent(content: string): string | undefined {
    const metadata = this.parseMetadataSection(content);
    return (metadata.subtitle as string) || undefined;
  }

  protected extractDescriptionFromContent(content: string): string | undefined {
    const metadata = this.parseMetadataSection(content);
    return (metadata.description as string) || undefined;
  }

  protected extractSummaryFromContent(content: string): { text: string; keyPoints?: string[] } | undefined {
    const metadata = this.parseMetadataSection(content);
    if (!metadata.summary) return undefined;

    return {
      text: metadata.summary as string,
      keyPoints: (metadata.keyPoints as string[] | undefined)?.length ? metadata.keyPoints as string[] : undefined
    };
  }
}