export type ContentType = 'blog' | 'project' | 'activity';

export type BlogPostType = 'Article' | 'Important' | 'Event';
export type ProjectCategory = 'Development' | 'Community' | 'Infrastructure' | 'Education';
export type ActivityType = 'Hackathon' | 'Meetup' | 'Workshop' | 'Campaign';

export interface BaseContentMeta {
  slug: string;
  title: string;
  date: string; // ISO string
  year: number;
  image: string; // public path
  excerpt?: string;
  author?: string;
}

export interface BlogPostMeta extends BaseContentMeta {
  type: BlogPostType;
}

export interface ProjectMeta extends BaseContentMeta {
  category: ProjectCategory;
  github?: string;
  website?: string;
  status: 'Active' | 'Completed' | 'In Progress';
}

export interface ActivityMeta extends BaseContentMeta {
  type: ActivityType;
  location?: string;
  eventDate?: string;
  registrationUrl?: string;
}

export interface BaseContent extends BaseContentMeta {
  html: string;
}

export interface BlogPost extends BlogPostMeta, BaseContent {}
export interface Project extends ProjectMeta, BaseContent {}
export interface Activity extends ActivityMeta, BaseContent {}

export type ContentMeta = BlogPostMeta | ProjectMeta | ActivityMeta;
export type Content = BlogPost | Project | Activity;