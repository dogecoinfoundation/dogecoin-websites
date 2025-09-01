#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { supportedLanguages, defaultLanguage, targetLanguages } from './languages';

interface JsonTranslationMeta {
  language: string;
  reviewStatus: Record<string, {
    humanReviewed: boolean;
    translatedBy?: string;
    translatedAt?: string;
  }>;
}

interface ContentReviewStatus {
  humanReviewed: boolean;
  translatedBy?: string;
  translatedAt?: string;
}

interface ReviewReport {
  jsonTranslations: {
    needsReview: Array<{
      language: string;
      path: string;
      translatedBy?: string;
      translatedAt?: string;
    }>;
    missing: Array<{
      language: string;
      path: string;
    }>;
    humanReviewed: Array<{
      language: string;
      path: string;
      translatedBy?: string;
      translatedAt?: string;
    }>;
  };
  contentTranslations: {
    needsReview: Array<{
      language: string;
      file: string;
      translatedAt?: string;
    }>;
    missing: Array<{
      language: string;
      expectedFile: string;
      originalFile: string;
    }>;
    humanReviewed: Array<{
      language: string;
      file: string;
      translatedBy?: string;
      translatedAt?: string;
    }>;
  };
}

class TranslationReviewTool {
  private dictionariesPath: string;
  private contentPath: string;
  private siteName: string;

  constructor(siteName: string = 'dogecoin.org') {
    this.siteName = siteName;
    this.dictionariesPath = path.join(__dirname, 'dictionaries');
    this.contentPath = path.join(__dirname, `../../apps/${siteName}/content`);
  }

  private flattenObject(obj: any, prefix: string = ''): string[] {
    const keys: string[] = [];
    
    for (const [key, value] of Object.entries(obj)) {
      if (key === '_meta') continue; // Skip metadata
      
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        keys.push(...this.flattenObject(value, newKey));
      } else {
        keys.push(newKey);
      }
    }
    
    return keys;
  }

  private analyzeJsonTranslations(): ReviewReport['jsonTranslations'] {
    const needsReview: Array<{language: string, path: string, translatedBy?: string, translatedAt?: string}> = [];
    const missing: Array<{language: string, path: string}> = [];
    const humanReviewed: Array<{language: string, path: string, translatedBy?: string, translatedAt?: string}> = [];

    // Get all translation keys from English (source)
    const enPath = path.join(this.dictionariesPath, 'en.json');
    const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const allKeys = this.flattenObject(enContent).filter(key => key.startsWith(this.siteName));

    for (const lang of targetLanguages) {
      const langPath = path.join(this.dictionariesPath, `${lang}.json`);
      
      if (!fs.existsSync(langPath)) {
        // All keys are missing - need creation
        allKeys.forEach(key => {
          missing.push({
            language: lang,
            path: key
          });
        });
        continue;
      }

      const content = JSON.parse(fs.readFileSync(langPath, 'utf8'));
      const meta: JsonTranslationMeta | undefined = content._meta;
      
      if (!meta || !meta.reviewStatus) {
        // No metadata - check if translations actually exist in the file
        allKeys.forEach(key => {
          const keyPath = key.split('.');
          let current = content;
          let exists = true;
          
          for (const segment of keyPath) {
            if (current && typeof current === 'object' && segment in current) {
              current = current[segment];
            } else {
              exists = false;
              break;
            }
          }
          
          if (!exists) {
            missing.push({
              language: lang,
              path: key
            });
          } else {
            needsReview.push({
              language: lang,
              path: key,
              translatedBy: 'AI', // Assume AI if no metadata
              translatedAt: undefined
            });
          }
        });
        continue;
      }

      // Check each key's review status
      allKeys.forEach(key => {
        // First check if the key exists in the actual content structure
        // Handle keys that may have dots in the object key names (like "dogecoin.org")
        let current = content;
        let exists = true;
        
        // Try to find the longest matching key prefix first
        const keyParts = key.split('.');
        let matchedIndex = 0;
        
        // Check if there's a direct match for compound keys like "dogecoin.org"
        for (let i = keyParts.length; i > 0; i--) {
          const potentialKey = keyParts.slice(0, i).join('.');
          if (current && typeof current === 'object' && potentialKey in current) {
            current = current[potentialKey];
            matchedIndex = i;
            break;
          }
        }
        
        // If we found a compound key, continue with the remaining path
        if (matchedIndex > 0) {
          const remainingPath = keyParts.slice(matchedIndex);
          for (const segment of remainingPath) {
            if (current && typeof current === 'object' && segment in current) {
              current = current[segment];
            } else {
              exists = false;
              break;
            }
          }
        } else {
          // No compound key found, treat as regular path
          for (const segment of keyParts) {
            if (current && typeof current === 'object' && segment in current) {
              current = current[segment];
            } else {
              exists = false;
              break;
            }
          }
        }
        
        if (!exists) {
          missing.push({
            language: lang,
            path: key
          });
          return;
        }

        // Key exists, now check review status
        const reviewStatus = meta.reviewStatus[key];
        
        if (!reviewStatus) {
          // No metadata means it's AI translated and needs review
          needsReview.push({
            language: lang,
            path: key,
            translatedBy: 'AI',
            translatedAt: undefined
          });
        } else if (!reviewStatus.humanReviewed) {
          needsReview.push({
            language: lang,
            path: key,
            translatedBy: reviewStatus.translatedBy,
            translatedAt: reviewStatus.translatedAt
          });
        } else {
          humanReviewed.push({
            language: lang,
            path: key,
            translatedBy: reviewStatus.translatedBy,
            translatedAt: reviewStatus.translatedAt
          });
        }
      });
    }

    return { needsReview, missing, humanReviewed };
  }

  private findContentFiles(): Array<{type: string, slug: string, files: string[]}> {
    const contentTypes = ['blog', 'projects', 'activities'];
    const contentFiles: Array<{type: string, slug: string, files: string[]}> = [];

    for (const contentType of contentTypes) {
      const typePath = path.join(this.contentPath, contentType);
      if (!fs.existsSync(typePath)) continue;

      const slugs = fs.readdirSync(typePath).filter(item => 
        fs.statSync(path.join(typePath, item)).isDirectory()
      );

      for (const slug of slugs) {
        const slugPath = path.join(typePath, slug);
        const files = fs.readdirSync(slugPath)
          .filter(file => file.endsWith('.md'))
          .map(file => path.join(slugPath, file));
        
        contentFiles.push({ type: contentType, slug, files });
      }
    }

    return contentFiles;
  }

  private analyzeContentTranslations(): ReviewReport['contentTranslations'] {
    const needsReview: Array<{language: string, file: string, translatedAt?: string}> = [];
    const missing: Array<{language: string, expectedFile: string, originalFile: string}> = [];
    const humanReviewed: Array<{language: string, file: string, reviewedBy: string, reviewedAt: string}> = [];

    const contentFiles = this.findContentFiles();

    for (const {type, slug, files} of contentFiles) {
      // Find English file (source)
      const enFile = files.find(file => file.endsWith('en.md'));
      if (!enFile) continue;

      // Check each target language
      for (const lang of targetLanguages) {
        const expectedFile = path.join(path.dirname(enFile), `${lang}.md`);
        const relativeExpectedFile = path.relative(this.contentPath, expectedFile);
        const relativeEnFile = path.relative(this.contentPath, enFile);

        if (!fs.existsSync(expectedFile)) {
          missing.push({
            language: lang,
            expectedFile: relativeExpectedFile,
            originalFile: relativeEnFile
          });
          continue;
        }

        // Parse frontmatter
        try {
          const fileContent = fs.readFileSync(expectedFile, 'utf8');
          const { data } = matter(fileContent);
          const reviewStatus = data as ContentReviewStatus;

          if (!reviewStatus.humanReviewed) {
            needsReview.push({
              language: lang,
              file: relativeExpectedFile,
              translatedAt: reviewStatus.translatedAt
            });
          } else {
            humanReviewed.push({
              language: lang,
              file: relativeExpectedFile,
              translatedBy: reviewStatus.translatedBy,
              translatedAt: reviewStatus.translatedAt
            });
          }
        } catch (error) {
          // File exists but can't parse - needs review
          needsReview.push({
            language: lang,
            file: relativeExpectedFile,
            translatedAt: 'Unknown'
          });
        }
      }
    }

    return { needsReview, missing, humanReviewed };
  }

  private generateMarkdownReport(report: ReviewReport): string {
    const { jsonTranslations, contentTranslations } = report;
    
    let markdown = `# Translation Status Report - ${this.siteName}\n\n`;
    markdown += `Generated on: ${new Date().toISOString()}\n\n`;
    markdown += `This report shows which translations need human attention:\n\n`;
    markdown += `- **AI→Human**: AI translation exists but needs human review and confirmation\n`;
    markdown += `- **Missing (Need Creation)**: No translation exists, needs to be created from scratch\n\n`;

    // Summary statistics
    const totalJsonNeedsReview = jsonTranslations.needsReview.length;
    const totalJsonMissing = jsonTranslations.missing.length;
    const totalContentNeedsReview = contentTranslations.needsReview.length;
    const totalContentMissing = contentTranslations.missing.length;
    const totalJsonReviewed = jsonTranslations.humanReviewed.length;
    const totalContentReviewed = contentTranslations.humanReviewed.length;

    markdown += `## Summary\n\n`;
    markdown += `- **Dictionary Items needing human review**: ${totalJsonNeedsReview}\n`;
    markdown += `- **Dictionary Items missing (need creation)**: ${totalJsonMissing}\n`;
    markdown += `- **Posts needing human review**: ${totalContentNeedsReview}\n`;
    markdown += `- **Posts missing (need creation)**: ${totalContentMissing}\n\n`;

    // Group by language for better readability
    const languageStats = targetLanguages.map(lang => {
      const jsonNeedsReview = jsonTranslations.needsReview.filter(item => item.language === lang).length;
      const jsonMissing = jsonTranslations.missing.filter(item => item.language === lang).length;
      const contentNeedsReview = contentTranslations.needsReview.filter(item => item.language === lang).length;
      const contentMissing = contentTranslations.missing.filter(item => item.language === lang).length;
      const jsonReviewed = jsonTranslations.humanReviewed.filter(item => item.language === lang).length;
      const contentReviewed = contentTranslations.humanReviewed.filter(item => item.language === lang).length;
      
      const total = jsonNeedsReview + jsonMissing + contentNeedsReview + contentMissing + jsonReviewed + contentReviewed;
      
      return {
        lang,
        langName: supportedLanguages[lang].nativeName,
        jsonNeedsReview,
        jsonMissing,
        contentNeedsReview,
        contentMissing,
        jsonReviewed,
        contentReviewed,
        total
      };
    });

    markdown += `## By Language\n\n`;
    markdown += `| Language | Dict Items (AI→Human) | Dict Items (Missing) | Posts (AI→Human) | Posts (Missing) | Total |\n`;
    markdown += `|----------|----------------------|---------------------|-------------------|-----------------|-------|\n`;
    
    for (const stats of languageStats) {
      const total = stats.jsonNeedsReview + stats.jsonMissing + stats.contentNeedsReview + stats.contentMissing;
      markdown += `| ${stats.langName} (${stats.lang}) | ${stats.jsonNeedsReview} | ${stats.jsonMissing} | ${stats.contentNeedsReview} | ${stats.contentMissing} | ${total} |\n`;
    }
    markdown += `\n`;

    // Detailed sections
    if (contentTranslations.missing.length > 0) {
      markdown += `## Posts Missing (Need Creation)\n\n`;
      const missingByLang = contentTranslations.missing.reduce((acc, item) => {
        if (!acc[item.language]) acc[item.language] = [];
        acc[item.language].push(item);
        return acc;
      }, {} as Record<string, typeof contentTranslations.missing>);

      for (const [lang, items] of Object.entries(missingByLang)) {
        markdown += `### ${supportedLanguages[lang as keyof typeof supportedLanguages].nativeName} (${lang})\n\n`;
        for (const item of items) {
          markdown += `- \`${item.expectedFile}\`\n`;
        }
        markdown += `\n`;
      }
    }

    if (contentTranslations.needsReview.length > 0) {
      markdown += `## Posts Needing Human Review (AI→Human)\n\n`;
      const needsReviewByLang = contentTranslations.needsReview.reduce((acc, item) => {
        if (!acc[item.language]) acc[item.language] = [];
        acc[item.language].push(item);
        return acc;
      }, {} as Record<string, typeof contentTranslations.needsReview>);

      for (const [lang, items] of Object.entries(needsReviewByLang)) {
        markdown += `### ${supportedLanguages[lang as keyof typeof supportedLanguages].nativeName} (${lang})\n\n`;
        for (const item of items) {
          // Only show translation info if it was human translated
          const translationInfo = (item.translatedBy && item.translatedBy !== 'AI' && item.translatedAt) 
            ? ` (translated by ${item.translatedBy}: ${item.translatedAt})` 
            : '';
          markdown += `- \`${item.file}\`${translationInfo}\n`;
        }
        markdown += `\n`;
      }
    }

    if (jsonTranslations.missing.length > 0) {
      markdown += `## Dictionary Items Missing (Need Creation)\n\n`;
      const jsonMissingByLang = jsonTranslations.missing.reduce((acc, item) => {
        if (!acc[item.language]) acc[item.language] = [];
        acc[item.language].push(item);
        return acc;
      }, {} as Record<string, typeof jsonTranslations.missing>);

      for (const [lang, items] of Object.entries(jsonMissingByLang)) {
        if (items.length > 10) {
          markdown += `### ${supportedLanguages[lang as keyof typeof supportedLanguages].nativeName} (${lang}) - ${items.length} dictionary items need creation\n\n`;
          markdown += `<details>\n<summary>Click to expand list</summary>\n\n`;
          for (const item of items) {
            markdown += `- \`${item.path}\`\n`;
          }
          markdown += `\n</details>\n\n`;
        } else if (items.length > 0) {
          markdown += `### ${supportedLanguages[lang as keyof typeof supportedLanguages].nativeName} (${lang})\n\n`;
          for (const item of items) {
            markdown += `- \`${item.path}\`\n`;
          }
          markdown += `\n`;
        }
      }
    }

    if (jsonTranslations.needsReview.length > 0) {
      markdown += `## Dictionary Items Needing Human Review (AI→Human)\n\n`;
      const jsonNeedsReviewByLang = jsonTranslations.needsReview.reduce((acc, item) => {
        if (!acc[item.language]) acc[item.language] = [];
        acc[item.language].push(item);
        return acc;
      }, {} as Record<string, typeof jsonTranslations.needsReview>);

      for (const [lang, items] of Object.entries(jsonNeedsReviewByLang)) {
        if (items.length > 10) {
          markdown += `### ${supportedLanguages[lang as keyof typeof supportedLanguages].nativeName} (${lang}) - ${items.length} AI translations need human review\n\n`;
          markdown += `<details>\n<summary>Click to expand list</summary>\n\n`;
          for (const item of items) {
            // Only show translation info if it was human translated
            const translationInfo = (item.translatedBy && item.translatedBy !== 'AI' && item.translatedAt) 
              ? ` (translated by ${item.translatedBy}: ${item.translatedAt})` 
              : '';
            markdown += `- \`${item.path}\`${translationInfo}\n`;
          }
          markdown += `\n</details>\n\n`;
        } else if (items.length > 0) {
          markdown += `### ${supportedLanguages[lang as keyof typeof supportedLanguages].nativeName} (${lang})\n\n`;
          for (const item of items) {
            // Only show translation info if it was human translated
            const translationInfo = (item.translatedBy && item.translatedBy !== 'AI' && item.translatedAt) 
              ? ` (translated by ${item.translatedBy}: ${item.translatedAt})` 
              : '';
            markdown += `- \`${item.path}\`${translationInfo}\n`;
          }
          markdown += `\n`;
        }
      }
    }


    return markdown;
  }

  public generateReport(): ReviewReport {
    console.log('🔍 Analyzing JSON translations...');
    const jsonTranslations = this.analyzeJsonTranslations();
    
    console.log('📄 Analyzing content translations...');
    const contentTranslations = this.analyzeContentTranslations();
    
    return {
      jsonTranslations,
      contentTranslations
    };
  }

  public async saveReport(outputPath: string = 'translation-review-report.md'): Promise<void> {
    const report = this.generateReport();
    const markdown = this.generateMarkdownReport(report);
    
    fs.writeFileSync(outputPath, markdown);
    console.log(`📊 Translation review report saved to: ${outputPath}`);
  }
}

// CLI usage
if (require.main === module) {
  const siteName = process.argv[2] || 'dogecoin.org';
  const outputPath = process.argv[3] || `translation-review-report-${siteName}.md`;
  
  const tool = new TranslationReviewTool(siteName);
  tool.saveReport(outputPath).catch(console.error);
}

export { TranslationReviewTool };