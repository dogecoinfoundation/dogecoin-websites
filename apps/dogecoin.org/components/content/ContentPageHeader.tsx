'use client';

import React from 'react';
import Image from 'next/image';
import { SearchBar } from './SearchBar';
import { getAssetPath } from '@/lib/assets';

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
      <div className="flex items-center" style={{ gap: '24px' }}>
        <button 
          onClick={handleFilters}
          className="filters-button flex items-center gap-2 hover:opacity-75 transition-opacity"
          style={{ 
            color: '#878685', 
            fontSize: '16px',
            padding: '8px 12px',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Image
            src={getAssetPath('/assets/svg/icons/filter.svg')}
            alt="Filter"
            width={16}
            height={16}
            style={{ filter: 'brightness(0) saturate(100%) invert(52%) sepia(6%) saturate(259%) hue-rotate(349deg) brightness(96%) contrast(93%)' }}
          />
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