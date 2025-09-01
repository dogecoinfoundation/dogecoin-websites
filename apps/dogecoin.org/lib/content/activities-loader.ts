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
      category: item.category ?? 'community',
      location: item.location,
      participants: item.participants,
      featured: item.featured ?? false,
      description: item.description,
      summary: item.summary,
      color: item.color,
      subtitle: item.subtitle,
      imagePosition: item.imagePosition,
      imageBorderRadius: item.imageBorderRadius
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
      category: item.category ?? 'community',
      location: item.location,
      participants: item.participants,
      featured: item.featured ?? false,
      description: item.description,
      summary: item.summary,
      color: item.color,
      subtitle: item.subtitle,
      imagePosition: item.imagePosition,
      imageBorderRadius: item.imageBorderRadius
    } as Activity;
  }
}