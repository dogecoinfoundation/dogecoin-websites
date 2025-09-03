'use client';

import React from 'react';
import { SearchBar } from './SearchBar';

interface ContentPageHeaderProps {
  title: string;
}

export function ContentPageHeader({ title }: ContentPageHeaderProps) {
  const handleSearch = (query: string) => {
    // TODO: Implement search functionality
    console.log('Search:', query);
  };

  const handleFilters = () => {
    // TODO: Implement filters functionality
    console.log('Open filters');
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="section-heading">{title}</h1>
      <div className="flex items-center gap-4">
        <button 
          onClick={handleFilters}
          className="filters-button px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Filters
        </button>
        <SearchBar 
          placeholder="Search" 
          onSearch={handleSearch}
          className="content-search-bar"
          style={{ width: '248px' }}
        />
      </div>
    </div>
  );
}