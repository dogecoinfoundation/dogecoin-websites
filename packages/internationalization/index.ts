import type en from './dictionaries/en.json';
import { allLanguages, supportedLanguages, targetLanguages, defaultLanguage } from './languages';

// Export language configuration
export { allLanguages, supportedLanguages, targetLanguages, defaultLanguage };

// Keep backward compatibility
export const locales = allLanguages;

export type Dictionary = typeof en;
type Dictionaries = Record<keyof typeof locales, () => Promise<Dictionary>>;

const dictionaries = locales.reduce<Dictionaries>((acc, locale) => {
  acc[locale as keyof typeof locales] = () =>
    import(`./dictionaries/${locale}.json`).then((mod) => mod.default);
  return acc;
}, {} as Dictionaries);

// Deep merge function to combine dictionaries
function deepMerge(target: any, source: any): any {
  if (!source || typeof source !== 'object') {
    return target;
  }
  
  if (!target || typeof target !== 'object') {
    return source;
  }
  
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
        result[key] = deepMerge(result[key], source[key]);
      } else {
        // Only override if target doesn't have this key or it's undefined/null
        if (!(key in result) || result[key] == null) {
          result[key] = source[key];
        }
      }
    }
  }
  
  return result;
}

export const getDictionary = async (locale: string) => {
  // Import server-only only when this function is actually called
  await import('server-only');
  
  const dictionaryFunction = dictionaries[locale as keyof typeof locales];
  
  if (!dictionaryFunction) {
    throw new Error(`Dictionary not found for locale: ${locale}`);
  }
  
  const dictionary = await dictionaryFunction();
  
  // If requesting English, return as-is (no fallback needed)
  if (locale === defaultLanguage) {
    return dictionary;
  }
  
  // For other languages, merge with English as fallback
  const englishDictionary = await dictionaries[defaultLanguage]();
  const mergedDictionary = deepMerge(dictionary, englishDictionary);

  return mergedDictionary;
};
