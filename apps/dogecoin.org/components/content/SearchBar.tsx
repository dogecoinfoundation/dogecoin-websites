'use client';

import React from 'react';
import Image from 'next/image';
import { getAssetPath } from '@/lib/assets';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  value?: string;
  isActive?: boolean;
}

export function SearchBar({ 
  placeholder = 'Search...', 
  onSearch, 
  className = '',
  value,
  isActive = false
}: SearchBarProps) {
  const [internalQuery, setInternalQuery] = React.useState('');
  
  // Use controlled value if provided, otherwise use internal state
  const query = value ?? internalQuery;
  const setQuery = value !== undefined ? 
    (newValue: string) => onSearch?.(newValue) : 
    setInternalQuery;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    
    // Real-time filtering - call onSearch immediately for controlled components
    if (value !== undefined) {
      onSearch?.(newValue);
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <form onSubmit={handleSubmit} className={`search-bar-container ${className}`}>
      <div className={`search-bar ${isActive ? 'search-bar-active' : ''}`}>
        <Image
          src={getAssetPath('/assets/svg/icons/search.svg')}
          alt="Search"
          width={20}
          height={20}
          className="search-bar-icon"
          style={{ width: '20px', height: '20px', objectFit: 'contain' }}
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="search-bar-input"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="search-bar-clear"
          >
            <Image
              src={getAssetPath('/assets/svg/icons/x-circle-contained.svg')}
              alt="Clear"
              width={20}
              height={20}
              className="search-bar-clear-icon"
              style={{ width: '20px', height: '20px', objectFit: 'contain' }}
            />
          </button>
        )}
      </div>
    </form>
  );
}