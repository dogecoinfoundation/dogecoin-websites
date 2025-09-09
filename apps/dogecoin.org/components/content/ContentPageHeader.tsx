'use client';

import React from 'react';
import { SearchBar } from './SearchBar';

interface ContentPageHeaderProps {
  title: string;
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export function ContentPageHeader({ title, onSearch, searchQuery }: ContentPageHeaderProps) {
  const handleSearch = (query: string) => {
    onSearch?.(query);
  };

  return (
    <div className="content-page-header">
      <h1 className="content-page-title">{title}</h1>
      <div className="content-page-controls">
        <SearchBar 
          placeholder="Search" 
          onSearch={handleSearch}
          className="content-page-search"
          value={searchQuery}
          isActive={!!searchQuery}
        />
      </div>
    </div>
  );
}