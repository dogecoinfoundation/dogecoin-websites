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
    const items = await this.getAllContent(locale);
    return items.map(item => ({
      ...item,
      category: item.category ?? 'community',
      location: item.location,
      participants: item.participants,
      featured: item.featured ?? false
    } as ActivityMeta));
  }

  async getActivityBySlug(slug: string, locale: string): Promise<Activity | null> {
    const item = await this.getContentBySlug(slug, locale);
    if (!item) return null;
    
    return {
      ...item,
      category: item.category ?? 'community',
      location: item.location,
      participants: item.participants,
      featured: item.featured ?? false
    } as Activity;
  }
}