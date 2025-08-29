export type ContentType = 'blog' | 'projects' | 'activities';

export interface ContentMeta {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt?: string;
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
  technologies?: string[];
  status: 'active' | 'completed' | 'planned';
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
}

export interface Activity extends ActivityMeta {
  html: string;
}