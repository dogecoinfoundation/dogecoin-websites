export type ContentType = 'blog' | 'projects' | 'activities';

export interface ContentMeta {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt?: string;
  draft?: boolean;
  [key: string]: any;
}

export interface ContentItem extends ContentMeta {
  html: string;
}

export interface ContentConfig {
  contentType: ContentType;
  contentDir: string;
  defaultImage: string;
  sortBy?: 'date' | 'title' | 'custom';
  sortOrder?: 'asc' | 'desc';
}

export interface BlogPostMeta extends ContentMeta {
  year: number;
  type: 'Article' | 'Important' | 'Event';
  author?: string;
}

export interface BlogPost extends BlogPostMeta {
  html: string;
}

export interface ProjectMeta extends ContentMeta {
  tags?: string[];
  description?: string;
  github?: string;
  demo?: string;
  website?: string;
  featured?: boolean;
}

export interface Project extends ProjectMeta {
  html: string;
}

export interface ActivityMeta extends ContentMeta {
  category: 'community' | 'development' | 'education' | 'event';
  location?: string;
  participants?: number;
  featured?: boolean;
  tags?: string[];
  description?: string;
  summary?: {
    text: string;
    keyPoints?: string[];
  };
  color?: string;
  subtitle?: string;
  imagePosition?: 'left' | 'right';
  imageBorderRadius?: number;
}

export interface Activity extends ActivityMeta {
  html: string;
}