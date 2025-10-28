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
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

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
    <div className="projects-page-layout">
      {/* Desktop Sidebar */}
      <aside className="projects-sidebar">
        <div className="sidebar-header">
          <h3 className="sidebar-title">Filter Projects</h3>
          <span className="sidebar-count">
            {filteredProjects.length} of {projects.length} projects
          </span>
        </div>

        <div className="sidebar-content">
          {/* Clear All Button */}
          <div className="sidebar-actions">
            <button
              onClick={() => {
                setSelectedTags([]);
                applyFilters(searchQuery, []);
              }}
              className={`sidebar-clear-btn ${selectedTags.length === 0 ? 'sidebar-clear-btn-disabled' : ''}`}
              disabled={selectedTags.length === 0}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Clear all
            </button>
          </div>

          {/* All Projects Button */}
          <div className="sidebar-section">
            <button
              onClick={() => {
                setSelectedTags([]);
                applyFilters(searchQuery, []);
              }}
              className={`sidebar-pill sidebar-pill-all ${selectedTags.length === 0 ? 'sidebar-pill-selected' : ''}`}
            >
              <span className="sidebar-pill-text">All Projects</span>
              <span className="sidebar-pill-count">{projects.length}</span>
            </button>
          </div>

          {/* Tag Filters */}
          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Categories</h4>
            <div className="sidebar-tags-list">
              {tagCounts.map(({ tag, count }) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`sidebar-pill ${selectedTags.includes(tag) ? 'sidebar-pill-selected' : ''}`}
                >
                  <span className="sidebar-pill-text">{tag}</span>
                  <span className="sidebar-pill-count">{count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="projects-main-content">
        <ContentPageHeader 
          title={t.projects.title} 
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />

        {/* Mobile Filter Toggle */}
        <div className="mobile-filter-header">
          <button
            className="mobile-filter-toggle"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            aria-expanded={isFilterOpen}
          >
            <svg className="filter-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
            </svg>
            <span>Filters</span>
            {selectedTags.length > 0 && (
              <span className="filter-badge">{selectedTags.length}</span>
            )}
          </button>
        </div>

        {/* Mobile Filter Panel */}
        <div className={`mobile-filter-panel ${isFilterOpen ? 'mobile-filter-panel-open' : ''}`}>
          <div className="mobile-filter-content">
            {/* Clear All Button */}
            <div className="mobile-filter-actions">
              <button
                onClick={() => {
                  setSelectedTags([]);
                  applyFilters(searchQuery, []);
                }}
                className={`mobile-clear-btn ${selectedTags.length === 0 ? 'mobile-clear-btn-disabled' : ''}`}
                disabled={selectedTags.length === 0}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Clear all
              </button>
            </div>

            {/* All Projects Button */}
            <div className="mobile-filter-section">
              <button
                onClick={() => {
                  setSelectedTags([]);
                  applyFilters(searchQuery, []);
                }}
                className={`mobile-pill mobile-pill-all ${selectedTags.length === 0 ? 'mobile-pill-selected' : ''}`}
              >
                <span className="mobile-pill-text">All Projects</span>
                <span className="mobile-pill-count">{projects.length}</span>
              </button>
            </div>

            {/* Tag Filters */}
            <div className="mobile-filter-section">
              <h4 className="mobile-section-title">Categories</h4>
              <div className="mobile-tags-list">
                {tagCounts.map(({ tag, count }) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`mobile-pill ${selectedTags.includes(tag) ? 'mobile-pill-selected' : ''}`}
                  >
                    <span className="mobile-pill-text">{tag}</span>
                    <span className="mobile-pill-count">{count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
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
      </main>
    </div>
  );
}