import { ContentLoader } from './loader';
import type { ActivityMeta, Activity } from './types';

export class ActivitiesLoader extends ContentLoader {
  constructor() {
    super({
      contentType: 'activities',
      contentDir: 'activities',
      defaultImage: '/assets/images/activity-dogecoin.png',
      sortBy: 'date',
      sortOrder: 'desc'
    });
  }

  async getAllActivities(locale: string): Promise<ActivityMeta[]> {
    const items = await this.getAllContentWithExtractedData(locale);
    return items.map(item => ({
      ...item,
      category: (item.category as ActivityMeta['category'] | undefined) ?? 'community',
      location: item.location as string | undefined,
      participants: item.participants as number | undefined,
      featured: (item.featured as boolean | undefined) ?? false,
      tags: item.tags as string[] | undefined,
      description: item.description as string | undefined,
      summary: item.summary as { text: string; keyPoints?: string[] } | undefined,
      color: item.color as string | undefined,
      subtitle: item.subtitle as string | undefined,
      imagePosition: item.imagePosition as 'left' | 'right' | undefined,
      imageBorderRadius: item.imageBorderRadius as number | undefined
    } as ActivityMeta));
  }

  async getFeaturedActivities(locale: string): Promise<ActivityMeta[]> {
    const allActivities = await this.getAllActivities(locale);
    return allActivities.filter(activity => activity.featured);
  }

  async getActivityBySlug(slug: string, locale: string): Promise<Activity | null> {
    const item = await this.getContentBySlugWithExtractedData(slug, locale);
    if (!item) return null;
    
    return {
      ...item,
      category: (item.category as ActivityMeta['category'] | undefined) ?? 'community',
      location: item.location as string | undefined,
      participants: item.participants as number | undefined,
      featured: (item.featured as boolean | undefined) ?? false,
      tags: item.tags as string[] | undefined,
      description: item.description as string | undefined,
      summary: item.summary as { text: string; keyPoints?: string[] } | undefined,
      color: item.color as string | undefined,
      subtitle: item.subtitle as string | undefined,
      imagePosition: item.imagePosition as 'left' | 'right' | undefined,
      imageBorderRadius: item.imageBorderRadius as number | undefined
    } as Activity;
  }
}