'use client';

import React from 'react';
import { ContentGrid } from '@/components/content/ContentGrid';
import { ProjectCard } from '@/components/specific/ProjectCard';
import { ContentPageHeader } from '@/components/content/ContentPageHeader';
import type { ProjectMeta } from '@/lib/content/types';

interface ProjectsContentProps {
  projects: ProjectMeta[];
  locale: string;
  t: any;
}

export function ProjectsContent({ projects, locale, t }: ProjectsContentProps) {
  const [filteredProjects, setFilteredProjects] = React.useState(projects);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  // Aggregate all tags with their counts
  const tagCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach(project => {
      project.tags?.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([tag, count]) => ({ tag, count }));
  }, [projects]);

  // Define a set of vibrant colors for project accent lines
  const accentColors = [
    '#FF46CE', // Pink
    '#2BF9FF', // Cyan
    '#62FF46', // Green
    '#FFFC36', // Yellow
    '#FF7D47', // Orange
    '#9B59FF', // Purple
    '#FF5959', // Red
    '#46C8FF', // Blue
  ];

  const applyFilters = React.useCallback((query: string, tags: string[]) => {
    let filtered = projects;

    // Apply tag filtering
    if (tags.length > 0) {
      filtered = filtered.filter(project => 
        project.tags?.some(tag => tags.includes(tag)) ?? false
      );
    }

    // Apply search filtering
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter((project) => {
        const titleMatch = project.title.toLowerCase().includes(searchTerm);
        const tagsMatch = project.tags?.some(tag => 
          tag.toLowerCase().includes(searchTerm)
        ) ?? false;
        const descriptionMatch = project.description?.toLowerCase().includes(searchTerm) ?? false;
        
        return titleMatch || tagsMatch || descriptionMatch;
      });
    }

    setFilteredProjects(filtered);
  }, [projects]);

  const handleSearch = React.useCallback((query: string) => {
    setSearchQuery(query);
    applyFilters(query, selectedTags);
  }, [applyFilters, selectedTags]);

  const handleTagToggle = React.useCallback((tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newSelectedTags);
    applyFilters(searchQuery, newSelectedTags);
  }, [selectedTags, searchQuery, applyFilters]);

  return (
    <>
      <ContentPageHeader 
        title={t.projects.title} 
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      {/* Tag Filter Section */}
      <div className="content-tags-filter">
        <button
          onClick={() => {
            setSelectedTags([]);
            applyFilters(searchQuery, []);
          }}
          className={`content-tag-pill ${selectedTags.length === 0 ? 'content-tag-pill-selected' : ''}`}
        >
          All projects
        </button>
        {tagCounts.map(({ tag, count }) => (
          <button
            key={tag}
            onClick={() => handleTagToggle(tag)}
            className={`content-tag-pill ${selectedTags.includes(tag) ? 'content-tag-pill-selected' : ''}`}
          >
            {tag} ({count})
          </button>
        ))}
      </div>

      <ContentGrid>
        {filteredProjects.map((project, index) => {
          const links = [];
          if (project.github) {
            links.push({ label: 'GitHub', url: project.github, icon: 'github' as const });
          }
          if (project.discord) {
            links.push({ label: 'Discord', url: project.discord, icon: 'discord' as const });
          }
          if (project.website) {
            links.push({ label: 'Website', url: project.website, icon: 'web' as const });
          }

          const tags = [...(project.tags ?? [])];

          // Cycle through accent colors
          const accentColor = accentColors[index % accentColors.length];

          return (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              image={project.image}
              description={project.description}
              tags={tags}
              draft={project.draft}
              links={links}
              locale={locale}
              accentColor={accentColor}
              priority={index < 3}
              t={t.projects}
            />
          );
        })}
      </ContentGrid>

      {filteredProjects.length === 0 && searchQuery && (
        <div className="content-empty-state">
          <p>{t.projects.noProjectsFound.replace('{query}', searchQuery)}</p>
        </div>
      )}

      {filteredProjects.length === 0 && !searchQuery && (
        <div className="content-empty-state">
          <p>{t.projects.noProjectsAvailable}</p>
        </div>
      )}
    </>
  );
}