#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function validateAndNormalizeDirectories(directories) {
  const validDirs = [];
  
  for (const dir of directories) {
    const normalizedPath = path.normalize(dir);
    
    if (!fs.existsSync(normalizedPath)) {
      console.error(`Error: Directory "${normalizedPath}" does not exist.`);
      continue;
    }
    
    if (!fs.statSync(normalizedPath).isDirectory()) {
      console.error(`Error: "${normalizedPath}" is not a directory.`);
      continue;
    }
    
    validDirs.push({
      originalPath: dir,
      path: normalizedPath,
      name: path.basename(normalizedPath)
    });
  }
  
  return validDirs;
}

function analyzeContentTags(directories) {
  const tagMap = new Map();
  const contentSummary = new Map();
  
  try {
    const validDirs = validateAndNormalizeDirectories(directories);
    
    if (validDirs.length === 0) {
      console.log('No valid directories to analyze.');
      return;
    }

    console.log(`Analyzing directories: ${validDirs.map(d => d.originalPath).join(', ')}\n`);

    // Process each directory
    for (const dir of validDirs) {
      const items = fs.readdirSync(dir.path, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      let processedCount = 0;

      for (const item of items) {
        const metadataPath = path.join(dir.path, item, 'metadata.json');
        
        if (fs.existsSync(metadataPath)) {
          try {
            const metadataContent = fs.readFileSync(metadataPath, 'utf-8');
            const metadata = JSON.parse(metadataContent);
            
            // Process tags for this item
            if (metadata.tags && Array.isArray(metadata.tags)) {
              for (const tag of metadata.tags) {
                // Normalize tag to lowercase for case-insensitive analysis
                const normalizedTag = tag.toLowerCase();
                if (!tagMap.has(normalizedTag)) {
                  tagMap.set(normalizedTag, []);
                }
                tagMap.get(normalizedTag).push(`${dir.originalPath}/${item}`);
              }
              processedCount++;
            }
          } catch (error) {
            console.error(`Error reading metadata for ${dir.originalPath}/${item}:`, error);
          }
        }
      }

      contentSummary.set(dir.originalPath, {
        total: items.length,
        withTags: processedCount
      });
    }

    // Convert to sorted analysis
    const tagAnalysis = Array.from(tagMap.entries())
      .map(([tag, items]) => ({
        tag,
        count: items.length,
        items: items.sort()
      }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));

    // Display results
    console.log('='.repeat(70));
    const title = validDirs.length === 1 
      ? `TAG ANALYSIS - ${validDirs[0].name.toUpperCase()}`
      : 'TAG ANALYSIS - MULTIPLE DIRECTORIES';
    console.log(title);
    console.log('='.repeat(70));
    console.log(`Total unique tags: ${tagAnalysis.length}`);
    
    // Content summary
    console.log('\nDIRECTORY SUMMARY:');
    for (const [dirPath, summary] of contentSummary) {
      console.log(`• ${dirPath}: ${summary.withTags}/${summary.total} items with tags`);
    }
    
    const totalItems = Array.from(contentSummary.values()).reduce((sum, s) => sum + s.withTags, 0);
    console.log(`\nTotal items with tags: ${totalItems}\n`);

    // Summary table
    console.log('TAG USAGE SUMMARY:');
    console.log('-'.repeat(50));
    console.log('Tag'.padEnd(20) + 'Count'.padStart(6) + '  Used In');
    console.log('-'.repeat(50));

    for (const analysis of tagAnalysis) {
      const tagDisplay = analysis.tag.padEnd(20);
      const countDisplay = analysis.count.toString().padStart(6);
      const itemsDisplay = analysis.items.length > 3 
        ? `${analysis.items.slice(0, 3).join(', ')}... (+${analysis.items.length - 3} more)`
        : analysis.items.join(', ');
      
      console.log(`${tagDisplay}${countDisplay}  ${itemsDisplay}`);
    }

    console.log('\n' + '='.repeat(70));
    
    // Additional insights
    if (tagAnalysis.length > 0) {
      const mostUsedTag = tagAnalysis[0];
      const uniqueTags = tagAnalysis.filter(t => t.count === 1);
      
      console.log('INSIGHTS:');
      console.log(`• Most used tag: "${mostUsedTag.tag}" (${mostUsedTag.count} items)`);
      console.log(`• Unique tags (used by only 1 item): ${uniqueTags.length}`);
      console.log(`• Average tags per item: ${(Array.from(tagMap.values()).flat().length / totalItems).toFixed(1)}`);
      
      // Directory breakdown
      if (validDirs.length > 1) {
        const dirUsage = new Map();
        for (const [tag, items] of tagMap) {
          for (const item of items) {
            const dirPath = item.substring(0, item.lastIndexOf('/'));
            if (!dirUsage.has(dirPath)) {
              dirUsage.set(dirPath, new Set());
            }
            dirUsage.get(dirPath).add(tag);
          }
        }
        
        console.log('\n• Tags by directory:');
        for (const [dirPath, tags] of dirUsage) {
          console.log(`  - ${dirPath}: ${tags.size} unique tags`);
        }
      }
      
      if (uniqueTags.length > 0 && uniqueTags.length <= 10) {
        console.log(`\n• Unique tags: ${uniqueTags.map(t => t.tag).join(', ')}`);
      }
    }

  } catch (error) {
    console.error('Error analyzing content tags:', error);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

// Show usage if help is requested or no directories provided
if (args.includes('--help') || args.includes('-h') || args.length === 0) {
  console.log('Usage: node tag-analyzer.js <directory1> [directory2] [...]');
  console.log('');
  console.log('Examples:');
  console.log('  node tag-analyzer.js apps/dogecoin.org/content/projects');
  console.log('  node tag-analyzer.js apps/dogecoin.org/content/activities');
  console.log('  node tag-analyzer.js apps/dogecoin.org/content/blog');
  console.log('  node tag-analyzer.js apps/dogecoin.org/content/projects apps/dogecoin.org/content/activities');
  console.log('');
  console.log('Note: Directories must contain subdirectories with metadata.json files');
  process.exit(args.length === 0 ? 1 : 0);
}

// Run the analysis with provided directories
analyzeContentTags(args);