import { ContentLoader } from './loader';
import type { ProjectMeta, Project } from './types';

export class ProjectsLoader extends ContentLoader {
  constructor() {
    super({
      contentType: 'projects',
      contentDir: 'projects',
      defaultImage: '/assets/images/placeholder.jpg',
      sortBy: 'date',
      sortOrder: 'desc'
    });
  }

  async getAllProjects(locale: string): Promise<ProjectMeta[]> {
    const items = await this.getAllContentWithExtractedData(locale);
    return items.map(item => ({
      ...item,
      tags: item.tags as string[] | undefined,
      description: item.description as string | undefined,
      github: item.github as string | undefined,
      discord: item.discord as string | undefined,
      website: item.website as string | undefined,
      featured: (item.featured as boolean | undefined) ?? false
    } as ProjectMeta));
  }

  async getFeaturedProjects(locale: string): Promise<ProjectMeta[]> {
    const allProjects = await this.getAllProjects(locale);
    return allProjects.filter(project => project.featured);
  }

  async getProjectBySlug(slug: string, locale: string): Promise<Project | null> {
    const item = await this.getContentBySlugWithExtractedData(slug, locale);
    if (!item) return null;
    
    return {
      ...item,
      tags: item.tags as string[] | undefined,
      description: item.description as string | undefined,
      github: item.github as string | undefined,
      discord: item.discord as string | undefined,
      website: item.website as string | undefined,
      featured: (item.featured as boolean | undefined) ?? false
    } as Project;
  }
}