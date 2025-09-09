import { BlogLoader } from './blog-loader';
import { ProjectsLoader } from './projects-loader';
import { ActivitiesLoader } from './activities-loader';

const blogLoader = new BlogLoader();
const projectsLoader = new ProjectsLoader();
const activitiesLoader = new ActivitiesLoader();

export async function getAllBlogSlugs(): Promise<string[]> {
  return blogLoader.getAllSlugs();
}

export async function getAllBlogPosts(locale: string) {
  return blogLoader.getAllBlogPosts(locale);
}

export async function getBlogPostBySlug(slug: string, locale: string) {
  return blogLoader.getBlogPostBySlug(slug, locale);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  return projectsLoader.getAllSlugs();
}

export async function getAllProjects(locale: string) {
  return projectsLoader.getAllProjects(locale);
}

export async function getFeaturedProjects(locale: string) {
  return projectsLoader.getFeaturedProjects(locale);
}

export async function getProjectBySlug(slug: string, locale: string) {
  return projectsLoader.getProjectBySlug(slug, locale);
}

export async function getRandomProjects(locale: string, count = 3, excludeSlug?: string) {
  return projectsLoader.getRandomProjects(locale, count, excludeSlug);
}

export async function getAllActivitySlugs(): Promise<string[]> {
  return activitiesLoader.getAllSlugs();
}

export async function getAllActivities(locale: string) {
  return activitiesLoader.getAllActivities(locale);
}

export async function getFeaturedActivities(locale: string) {
  return activitiesLoader.getFeaturedActivities(locale);
}

export async function getActivityBySlug(slug: string, locale: string) {
  return activitiesLoader.getActivityBySlug(slug, locale);
}

export type { 
  BlogPostMeta, 
  BlogPost, 
  ProjectMeta, 
  Project, 
  ActivityMeta, 
  Activity 
} from './types';

export { shouldShowDraftBadge } from './utils';