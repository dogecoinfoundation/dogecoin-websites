import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';

interface LanguageMetadata {
  code: string;
  name: string;
  flag: string;
}

// Language name mappings
const languageNames: Record<string, string> = {
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'ja': 'Japanese',
  'ko': 'Korean',
  'zh': 'Chinese',
  'ar': 'Arabic',
  'hi': 'Hindi',
  'tr': 'Turkish',
  'nl': 'Dutch',
  'pl': 'Polish',
  'sv': 'Swedish',
  'da': 'Danish',
  'no': 'Norwegian',
  'fi': 'Finnish',
  'cs': 'Czech',
  'sk': 'Slovak',
  'hu': 'Hungarian',
  'ro': 'Romanian',
  'bg': 'Bulgarian',
  'hr': 'Croatian',
  'sl': 'Slovenian',
  'et': 'Estonian',
  'lv': 'Latvian',
  'lt': 'Lithuanian',
  'mt': 'Maltese',
  'ga': 'Irish',
  'cy': 'Welsh',
  'eu': 'Basque',
  'ca': 'Catalan',
  'gl': 'Galician',
  'is': 'Icelandic',
  'mk': 'Macedonian',
  'sq': 'Albanian',
  'sr': 'Serbian',
  'bs': 'Bosnian',
  'me': 'Montenegrin',
  'uk': 'Ukrainian',
  'be': 'Belarusian',
  'kk': 'Kazakh',
  'ky': 'Kyrgyz',
  'uz': 'Uzbek',
  'tg': 'Tajik',
  'mn': 'Mongolian',
  'ka': 'Georgian',
  'hy': 'Armenian',
  'az': 'Azerbaijani',
  'fa': 'Persian',
  'ur': 'Urdu',
  'bn': 'Bengali',
  'ta': 'Tamil',
  'te': 'Telugu',
  'ml': 'Malayalam',
  'kn': 'Kannada',
  'gu': 'Gujarati',
  'pa': 'Punjabi',
  'or': 'Odia',
  'as': 'Assamese',
  'ne': 'Nepali',
  'si': 'Sinhala',
  'my': 'Burmese',
  'km': 'Khmer',
  'lo': 'Lao',
  'th': 'Thai',
  'vi': 'Vietnamese',
  'id': 'Indonesian',
  'ms': 'Malay',
  'tl': 'Filipino',
  'sw': 'Swahili',
  'am': 'Amharic',
  'yo': 'Yoruba',
  'ig': 'Igbo',
  'ha': 'Hausa',
  'zu': 'Zulu',
  'xh': 'Xhosa',
  'af': 'Afrikaans',
  'he': 'Hebrew',
  'yi': 'Yiddish',
  'gd': 'Scottish Gaelic',
  'kw': 'Cornish',
  'br': 'Breton',
  'fo': 'Faroese',
  'kl': 'Greenlandic',
  'sm': 'Samoan',
  'to': 'Tongan',
  'fj': 'Fijian',
  'mi': 'Maori',
  'haw': 'Hawaiian',
  'ty': 'Tahitian',
  'mg': 'Malagasy',
  'st': 'Southern Sotho',
  'tn': 'Tswana',
  'ts': 'Tsonga',
  've': 'Venda',
  'nr': 'Southern Ndebele',
  'ss': 'Swati',
  'sn': 'Shona',
  'rw': 'Kinyarwanda',
  'ak': 'Akan',
  'tw': 'Twi',
  'ee': 'Ewe',
  'lg': 'Ganda',
  'ny': 'Chichewa',
  'so': 'Somali',
  'om': 'Oromo',
  'ti': 'Tigrinya',
  'aa': 'Afar',
  'dz': 'Dzongkha',
  'bo': 'Tibetan',
  'ug': 'Uyghur',
  'ii': 'Sichuan Yi',
  'za': 'Zhuang',
  'hmn': 'Hmong',
  'ceb': 'Cebuano',
  'jv': 'Javanese',
  'su': 'Sundanese',
  'ban': 'Balinese',
  'ace': 'Acehnese',
  'bug': 'Buginese',
  'mad': 'Madurese',
  'min': 'Minangkabau',
  'bjn': 'Banjar',
  'gor': 'Gorontalo',
  'mak': 'Makassarese',
  'mdr': 'Mandar',
  'sas': 'Sasak',
  'sun': 'Sundanese',
  'tet': 'Tetum',
  'crs': 'Seychellois Creole',
  'mfe': 'Mauritian Creole',
  'rcf': 'Réunion Creole',
  'gcf': 'Guadeloupean Creole',
  'ht': 'Haitian Creole',
  'pcm': 'Nigerian Pidgin',
  'jam': 'Jamaican Creole',
  'srn': 'Sranan Tongo',
  'djk': 'Aukan',
  'srm': 'Saramaccan',
  'nag': 'Naga Pidgin',
  'tpi': 'Tok Pisin',
  'pis': 'Pijin',
  'bisl': 'Bislama',
  'tcs': 'Torres Strait Creole',
  'yue': 'Cantonese',
  'nan': 'Min Nan',
  'hak': 'Hakka',
  'wuu': 'Wu Chinese',
  'gan': 'Gan Chinese',
  'hsn': 'Xiang Chinese',
  'cmn': 'Mandarin Chinese',
  'lzh': 'Literary Chinese',
  'cdo': 'Min Dong',
  'cjy': 'Jin Chinese',
  'czh': 'Huizhou Chinese',
  'czo': 'Min Zhong',
  'cpx': 'Pu-Xian Min',
  'czt': 'Zhenan Min',
  'gan-hant': 'Gan Chinese (Traditional)',
  'yue-hant': 'Cantonese (Traditional)',
  'nan-hant': 'Min Nan (Traditional)',
  'hak-hant': 'Hakka (Traditional)',
  'wuu-hant': 'Wu Chinese (Traditional)',
  'hsn-hant': 'Xiang Chinese (Traditional)',
  'cmn-hant': 'Mandarin Chinese (Traditional)',
  'lzh-hant': 'Literary Chinese (Traditional)',
  'cdo-hant': 'Min Dong (Traditional)',
  'cjy-hant': 'Jin Chinese (Traditional)',
  'czh-hant': 'Huizhou Chinese (Traditional)',
  'czo-hant': 'Min Zhong (Traditional)',
  'cpx-hant': 'Pu-Xian Min (Traditional)',
  'czt-hant': 'Zhenan Min (Traditional)',
};

// Available languages based on what's in the dictionaries folder
const availableLanguages: string[] = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ko'];

const getSupportedLanguages = (): LanguageMetadata[] => {
  return availableLanguages.map(code => ({
    code,
    name: languageNames[code] ?? code.toUpperCase(),
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
          src={currentLang.flag}
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
                // Get current pathname without locale
                const pathname = window.location.pathname;
                const pathWithoutLocale = pathname.replace(`/${currentLanguage}`, '') || '/';
                
                // Navigate to new locale
                router.push(`/${language.code}${pathWithoutLocale}`);
                setIsOpen(false);
              }}
            >
              <Image
                src={language.flag}
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