'use client';

import React from 'react';
import Image from 'next/image';
import { getAssetPath } from '@/lib/assets';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({ 
  placeholder = 'Search...', 
  onSearch, 
  className = '' 
}: SearchBarProps) {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className={`search-bar-container ${className}`}>
      <div className="search-bar">
        <Image
          src={getAssetPath('/assets/svg/icons/search.svg')}
          alt="Search"
          width={20}
          height={20}
          className="search-bar-icon"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="search-bar-input"
        />
      </div>
    </form>
  );
}