export const supportedLanguages = {
  en: { name: 'English', nativeName: 'English', isDefault: true },
  es: { name: 'Spanish', nativeName: 'Español', isDefault: false },
  fr: { name: 'French', nativeName: 'Français', isDefault: false },
  de: { name: 'German', nativeName: 'Deutsch', isDefault: false },
  it: { name: 'Italian', nativeName: 'Italiano', isDefault: false },
  pt: { name: 'Portuguese', nativeName: 'Português', isDefault: false },
  ru: { name: 'Russian', nativeName: 'Русский', isDefault: false },
  zh: { name: 'Chinese', nativeName: '中文', isDefault: false },
  ko: { name: 'Korean', nativeName: '한국어', isDefault: false }
} as const;

export const defaultLanguage = 'en' as const;
export const targetLanguages = Object.keys(supportedLanguages).filter(
  lang => !supportedLanguages[lang as keyof typeof supportedLanguages].isDefault
) as Array<Exclude<keyof typeof supportedLanguages, 'en'>>;
export const allLanguages = Object.keys(supportedLanguages) as Array<keyof typeof supportedLanguages>;

export type SupportedLanguage = keyof typeof supportedLanguages;
export type TargetLanguage = typeof targetLanguages[number];

export interface TranslationReviewMeta {
  humanReviewed: boolean;
  translatedBy?: string;
  translatedAt?: string;
}