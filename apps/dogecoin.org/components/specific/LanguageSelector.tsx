import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { getAssetPath, getClientBasePath, getClientNavPath, getClientAssetPath } from '@/lib/assets';
import { supportedLanguages, allLanguages } from '@repo/internationalization/languages-client';

interface LanguageMetadata {
  code: string;
  name: string;
  flag: string;
}

const getSupportedLanguages = (): LanguageMetadata[] => {
  return allLanguages.map(code => ({
    code,
    name: supportedLanguages[code].name,
    flag: `/assets/images/flags/${code}.png`
  }));
};

const getLanguageMetadata = (code: string): LanguageMetadata | undefined => {
  const languages = getSupportedLanguages();
  return languages.find(lang => lang.code === code);
};

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  
  const currentLanguage = String(params.locale) || 'en';
  const languages = getSupportedLanguages();
  const currentLang = getLanguageMetadata(currentLanguage) ?? languages[0];
  
  if (!currentLang) {
    return null;
  }
  
  return (
    <div className="language-selector">
      <button 
        className="language-selector-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={getAssetPath(currentLang.flag)}
          alt={`${currentLang.name} flag`}
          width={24}
          height={24}
          className="language-flag"
        />
                       <span className="language-code">{currentLang.code.toUpperCase()}</span>
        <svg 
          className={`language-dropdown-arrow ${isOpen ? 'open' : ''}`}
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="none"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {isOpen && (
        <div className="language-dropdown" style={{ padding: '6px' }}>
          {languages.map((language: LanguageMetadata) => (
            <button
              key={language.code}
              className={`language-option ${language.code === currentLanguage ? 'active' : ''}`}
              onClick={() => {
                // Get current pathname without locale and base path
                const pathname = window.location.pathname;
                
                // Remove base path first
                const basePath = getClientBasePath();
                let pathWithoutBase = pathname;
                if (basePath && pathname.startsWith(basePath)) {
                  pathWithoutBase = pathname.slice(basePath.length);
                }
                
                // Remove current locale
                const pathWithoutLocale = pathWithoutBase.replace(`/${currentLanguage}`, '') || '/';
                
                // Navigate to new locale using the client nav path utility
                router.push(getClientNavPath(pathWithoutLocale, language.code));
                setIsOpen(false);
              }}
            >
              <Image
                src={getClientAssetPath(language.flag)}
                alt={`${language.name} flag`}
                width={24}
                height={24}
                className="language-flag"
              />
              <span className="language-name">
                {language.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 