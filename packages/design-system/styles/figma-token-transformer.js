#!/usr/bin/env node

/**
 * Figma Token Transformer & Validator
 * 
 * This script transforms Figma's exported variables.json into optimized CSS custom properties
 * while maintaining a clear mapping between Figma names and CSS variable names.
 * Includes built-in collision detection and mapping validation.
 * 
 * Usage: 
 *   node figma-token-transformer.js           # Transform and validate
 *   node figma-token-transformer.js --validate-only  # Validation only
 * 
 * Input: variables.json (Figma export)
 * Output: figma-tokens-generated.css (optimized CSS)
 */

const fs = require('fs');
const path = require('path');

// Token name mapping configuration
// Maps Figma's naming convention to our optimized naming
const TOKEN_MAPPINGS = {
  // Colors - Order matters: more specific patterns first
  'Colour/brand/secondary/seconday-': 'brand-secondary-', // Handle typo in Figma (same output as correct spelling)
  'Colour/brand/secondary/secondary-': 'brand-secondary-',
  'Colour/brand/primary/primary-': 'brand-primary-',
  'Colour/white/color-white-a': 'white-alpha-', // Handle inconsistency (must come first)
  'Colour/white/white-a': 'white-alpha-',
  'Colour/white/white': 'white-base',
  'Colour/black/color-black-a': 'black-alpha-', // Handle inconsistency (must come first) 
  'Colour/black/black-a': 'black-alpha-',
  'Colour/black/black': 'black-base',
  'Colour/accent/color-accent-': 'accent-alt-', // Handle inconsistency (different output)
  'Colour/accent/accent-': 'accent-',
  'Colour/neutral/neutral-': 'neutral-',
  'Colour/utility/success/success-': 'success-',
  'Colour/utility/warning/warning-': 'warning-',
  
  // Measurements
  'Measurements/spacing/spacing-4xs': 'spacing-0.5',
  'Measurements/spacing/spacing-3xs': 'spacing-1',
  'Measurements/spacing/spacing-2xs': 'spacing-2',
  'Measurements/spacing/spacing-xs': 'spacing-3',
  'Measurements/spacing/spacing-sm': 'spacing-4',
  'Measurements/spacing/spacing-md': 'spacing-5',
  'Measurements/spacing/spacing-lg': 'spacing-6',
  'Measurements/spacing/spacing-xl': 'spacing-8',
  'Measurements/spacing/spacing-2xl': 'spacing-12',
  'Measurements/spacing/spacing-3xl': 'spacing-16',
  'Measurements/spacing/spacing-4xl': 'spacing-20',
  'Measurements/spacing/spacing-5xl': 'spacing-32',
  
  'Measurements/border-radius/border-radius-sm': 'radius-sm',
  'Measurements/border-radius/border-radius-md': 'radius-default',
  'Measurements/border-radius/border-radius-lg': 'radius-md',
  'Measurements/border-radius/border-radius-xl': 'radius-lg',
  'Measurements/border-radius/border-radius-2xl': 'radius-xl',
  'Measurements/border-radius/border-radius-full': 'radius-full',
  
  // Typography - Preserve distinct token names for future flexibility
  'Typography/font-family-heading': 'font-heading',
  'Typography/font-family-paragraph': 'font-body',
  'Typography/font-family-link': 'font-link',
  'Typography/font-family-button': 'font-button',
  'Typography/font-weight-heading': 'font-weight-heading',
  'Typography/font-weight-paragraph': 'font-weight-body',
  'Typography/font-weight-link': 'font-weight-link',
  'Typography/font-weight-button': 'font-weight-button',
  'Typography/font-weight-strong': 'font-weight-strong',
  
  // Component tokens
  'Body/background/body': 'background-primary',
  'Button/primary/background/button-primary': 'button-primary-bg',
  'Button/primary/background/button-primary-hover': 'button-primary-bg-hover',
  'Button/primary/background/button-primary-focus': 'button-primary-bg-focus',
  'Button/primary/color/button-primary': 'button-primary-text',
  'Button/secondary/color/button-secondary': 'button-secondary-text',
  'Button/secondary/border/button-secondary': 'button-secondary-border',
  'Button/secondary/background/button-secondary-hover': 'button-secondary-bg-hover',
  'Button/secondary/background/button-secondary-focus': 'button-secondary-bg-focus',
  'Button/tertiary/color/button-tertiary': 'button-tertiary-text',
  'Button/tertiary/background/button-tertiary-hover': 'button-tertiary-bg-hover',
  'Button/tertiary/background/button-tertiary-focus': 'button-tertiary-bg-focus',
  'Button/warning/color/button-warning': 'button-warning-text',
  'Button/warning/border/button-warning': 'button-warning-border',
  'Button/warning/background/button-warning-hover': 'button-warning-bg-hover',
  'Button/warning/background/button-warning-focus': 'button-warning-bg-focus',
  'Card/background/card': 'card-bg',
  'Card/border/card': 'card-border',
  'Divider/border/primary-dark': 'border-default',
  'Divider/border/secondary-dark': 'border-subtle',
  'Form/input/background/input': 'input-bg',
  'Form/input/background/input-focus': 'input-bg-focus',
  'Form/input/border/input': 'input-border',
  'Form/input/border/input-focus': 'input-border-focus',
  'Form/input/color/input-placeholder': 'input-placeholder',
  'Text/color/text-primary': 'foreground-primary',
  'Text/color/text-secondary': 'foreground-secondary',
  'Text/color/text-link': 'interactive-primary',
  'Text/color/text-warning': 'status-warning',
  'Text/color/text-primary-light': 'foreground-inverse',
  'Text/color/text-secondary-light': 'foreground-secondary-light',
  'Text/color/text-link-light': 'interactive-primary-light',
};

// Responsive typography mappings
const TYPOGRAPHY_RESPONSIVE_MAPPINGS = {
  'Typography/heading/h1/font-size': 'heading-1',
  'Typography/heading/h2/font-size': 'heading-2',
  'Typography/heading/h3/font-size': 'heading-3',
  'Typography/heading/h4/font-size': 'heading-4',
  'Typography/heading/h5/font-size': 'heading-5',
  'Typography/paragraph/body-lead/font-size': 'body-lead',
  'Typography/paragraph/body/font-size': 'body-default',
  'Typography/paragraph/caption/font-size': 'body-small',
  'Typography/button/xlarge/font-size': 'button-xl',
  'Typography/button/large/font-size': 'button-lg',
  'Typography/button/medium/font-size': 'button-md',
  'Typography/button/small/font-size': 'button-sm',
};

// Section spacing mappings
const SECTION_MAPPINGS = {
  'Section/section-x': 'section-padding-x',
  'Section/section-y-sm': 'section-padding-y-sm',
  'Section/section-y': 'section-padding-y',
  'Section/section-y-lg': 'section-padding-y-lg',
};

/**
 * Transform a Figma variable name to CSS custom property name
 * Uses exact matching for better collision prevention
 */
function transformTokenName(figmaName) {
  // Remove spaces and convert to lowercase for comparison
  const normalizedName = figmaName.replace(/\s+/g, '-').toLowerCase();
  
  // 1. Check for exact matches first (highest priority)
  for (const [figmaPattern, cssPattern] of Object.entries(TOKEN_MAPPINGS)) {
    if (normalizedName === figmaPattern.toLowerCase()) {
      return cssPattern;
    }
  }
  
  // 2. Check responsive typography mappings (exact match)
  for (const [figmaPattern, cssPattern] of Object.entries(TYPOGRAPHY_RESPONSIVE_MAPPINGS)) {
    if (normalizedName === figmaPattern.toLowerCase()) {
      return cssPattern;
    }
  }
  
  // 3. Check section mappings (exact match)
  for (const [figmaPattern, cssPattern] of Object.entries(SECTION_MAPPINGS)) {
    if (normalizedName === figmaPattern.toLowerCase()) {
      return cssPattern;
    }
  }
  
  // 4. Fallback to pattern matching (ordered by specificity - longer patterns first)
  const sortedMappings = Object.entries(TOKEN_MAPPINGS)
    .sort(([a], [b]) => b.length - a.length); // Sort by length descending
  
  for (const [figmaPattern, cssPattern] of sortedMappings) {
    const pattern = figmaPattern.toLowerCase();
    if (normalizedName.includes(pattern)) {
      let cssName = normalizedName.replace(pattern, cssPattern);
      
      // Clean up the name
      cssName = cssName
        .replace(/\//g, '-')
        .replace(/-{2,}/g, '-')
        .replace(/^-|-$/g, '');
      
      return cssName;
    }
  }
  
  // 5. Default transformation if no patterns match
  let cssName = normalizedName
    .replace(/\//g, '-')
    .replace(/colour-/g, '')
    .replace(/measurements-/g, '')
    .replace(/typography-/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');
  
  return cssName;
}

/**
 * Get CSS value from Figma variable, handling aliases and references
 */
function getCSSValue(variable, allVariables = null) {
  // Handle alias resolution
  if (variable.isAlias && typeof variable.value === 'object' && variable.value.name) {
    if (!allVariables) {
      console.warn(`⚠️  Cannot resolve alias for "${variable.name}" - no variable registry provided`);
      return '/* UNRESOLVED ALIAS */';
    }
    
    // Find the referenced variable
    const referencedVar = allVariables.find(v => v.name === variable.value.name);
    if (!referencedVar) {
      console.warn(`⚠️  Cannot find referenced variable "${variable.value.name}" for alias "${variable.name}"`);
      return '/* MISSING REFERENCE */';
    }
    
    // Recursively resolve the referenced variable (in case it's also an alias)
    return getCSSValue(referencedVar, allVariables);
  }
  
  // Handle direct values based on type
  if (variable.type === 'color') {
    return variable.value;
  } else if (variable.type === 'number') {
    // Assume numbers are pixels unless it's a font weight or line height
    const name = variable.name.toLowerCase();
    if (name.includes('font-weight') || name.includes('line-height')) {
      return variable.value.toString();
    }
    return `${variable.value}px`;
  } else if (variable.type === 'string') {
    // Handle font families
    if (variable.name.toLowerCase().includes('font-family')) {
      return `"${variable.value}"`;
    }
    return variable.value;
  }
  
  // Fallback for unknown types or malformed data
  if (typeof variable.value === 'object') {
    console.warn(`⚠️  Unknown object value for variable "${variable.name}":`, variable.value);
    return '/* UNKNOWN OBJECT VALUE */';
  }
  
  return variable.value;
}

/**
 * Validate token mappings for collisions and conflicts
 */
function validateMappings() {
  console.log('🔍 Token Mapping Validation Report\n');
  
  // 1. Check for duplicate CSS output names
  console.log('1. DUPLICATE CSS OUTPUT ANALYSIS');
  console.log('================================');
  
  const allMappings = {
    ...TOKEN_MAPPINGS,
    ...TYPOGRAPHY_RESPONSIVE_MAPPINGS,
    ...SECTION_MAPPINGS
  };
  
  const cssNames = Object.values(allMappings);
  const nameCount = {};
  const intentionalDuplicates = new Set([
    'brand-secondary', // Handles typo and correct spelling
    'white-alpha', // Handles inconsistent prefixes
    'black-alpha', // Handles inconsistent prefixes
  ]);
  
  cssNames.forEach(name => {
    // Handle pattern suffixes (e.g., "brand-primary-")
    if (name.endsWith('-')) {
      const baseName = name.slice(0, -1);
      nameCount[baseName] = (nameCount[baseName] || 0) + 1;
    } else {
      nameCount[name] = (nameCount[name] || 0) + 1;
    }
  });
  
  const duplicates = Object.entries(nameCount)
    .filter(([, count]) => count > 1)
    .filter(([name]) => !intentionalDuplicates.has(name));
  
  if (duplicates.length === 0) {
    console.log('✅ No unexpected duplicate CSS output names found');
    if (intentionalDuplicates.size > 0) {
      console.log('ℹ️  Intentional duplicates handled: ' + Array.from(intentionalDuplicates).join(', '));
    }
  } else {
    console.log('❌ Unexpected duplicate CSS output names detected:');
    duplicates.forEach(([name, count]) => {
      console.log(`   ${name}: appears ${count} times`);
    });
  }
  
  // 2. Check for pattern conflicts
  console.log('\n2. PATTERN CONFLICT ANALYSIS');
  console.log('=============================');
  
  const patterns = Object.keys(allMappings);
  const conflicts = [];
  
  for (let i = 0; i < patterns.length; i++) {
    for (let j = i + 1; j < patterns.length; j++) {
      const pattern1 = patterns[i].toLowerCase();
      const pattern2 = patterns[j].toLowerCase();
      
      // Check if one pattern is contained within another
      if (pattern1.includes(pattern2) || pattern2.includes(pattern1)) {
        conflicts.push({
          pattern1: patterns[i],
          pattern2: patterns[j],
          css1: allMappings[patterns[i]],
          css2: allMappings[patterns[j]]
        });
      }
    }
  }
  
  if (conflicts.length === 0) {
    console.log('✅ No pattern conflicts found');
  } else {
    console.log('⚠️  Pattern conflicts detected (may be intentional):');
    conflicts.forEach(conflict => {
      console.log(`   "${conflict.pattern1}" vs "${conflict.pattern2}"`);
      console.log(`   → "${conflict.css1}" vs "${conflict.css2}"`);
    });
  }
  
  // 3. Summary
  console.log('\n3. MAPPING SUMMARY');
  console.log('==================');
  
  const patternCategories = {
    'Color patterns': patterns.filter(p => p.startsWith('Colour/')),
    'Measurement patterns': patterns.filter(p => p.startsWith('Measurements/')),
    'Typography patterns': patterns.filter(p => p.startsWith('Typography/')),
    'Component patterns': patterns.filter(p => !p.startsWith('Colour/') && !p.startsWith('Measurements/') && !p.startsWith('Typography/') && !p.startsWith('Section/')),
    'Section patterns': patterns.filter(p => p.startsWith('Section/'))
  };
  
  Object.entries(patternCategories).forEach(([category, categoryPatterns]) => {
    console.log(`${category}: ${categoryPatterns.length} patterns`);
  });
  
  console.log('\n✅ Mapping validation complete\n');
  
  return { duplicates: duplicates.length, conflicts: conflicts.length };
}

/**
 * Process variables.json and generate CSS
 */
function transformTokens(validateOnly = false) {
  // Read the variables.json file
  const variablesPath = path.join(__dirname, 'variables.json');
  if (!fs.existsSync(variablesPath)) {
    console.error('Error: variables.json not found');
    console.log('Please ensure variables.json is in the same directory as this script');
    return;
  }
  
  const data = JSON.parse(fs.readFileSync(variablesPath, 'utf8'));
  
  // Group tokens by category
  const primitiveTokens = [];
  const semanticTokens = [];
  const componentTokens = [];
  const responsiveTokens = {};
  
  // Collision detection
  const cssNameRegistry = new Map();
  
  // First, collect all variables for alias resolution
  const allVariables = [];
  data.collections.forEach(collection => {
    collection.modes.forEach(mode => {
      allVariables.push(...mode.variables);
    });
  });
  
  // Process all collections and modes
  data.collections.forEach(collection => {
    collection.modes.forEach(mode => {
      mode.variables.forEach(variable => {
        const cssName = transformTokenName(variable.name);
        const cssValue = getCSSValue(variable, allVariables);
        const token = `--${cssName}: ${cssValue};`;
        
        // Categorize tokens first
        const nameLower = variable.name.toLowerCase();
        
        // Check for collisions (only warn for unexpected ones)
        if (cssNameRegistry.has(cssName)) {
          const existing = cssNameRegistry.get(cssName);
          if (existing.value !== cssValue) {
            // Only warn if this isn't expected responsive typography
            const isResponsiveTypo = nameLower.includes('typography') && 
              (nameLower.includes('font-size') || nameLower.includes('line-height'));
            const isResponsiveSection = nameLower.includes('section/section-');
            
            if (!isResponsiveTypo && !isResponsiveSection) {
              console.warn(`⚠️  UNEXPECTED TOKEN COLLISION:`);
              console.warn(`   CSS name: --${cssName}`);
              console.warn(`   Figma 1: "${existing.figma}" → ${existing.value}`);
              console.warn(`   Figma 2: "${variable.name}" → ${cssValue}`);
              console.warn(`   Using: ${cssValue} (latest wins)\n`);
            }
          }
        }
        
        // Store in registry
        cssNameRegistry.set(cssName, {
          figma: variable.name,
          css: cssName,
          value: cssValue
        });
        
        // Store original mapping for reference (not used but kept for future debugging)
        if (nameLower.includes('typography') && nameLower.includes('font-size')) {
          // Group responsive typography by breakpoint
          const breakpoint = mode.name.toLowerCase().replace('mode ', '').replace(' ', '-');
          if (!responsiveTokens[breakpoint]) {
            responsiveTokens[breakpoint] = [];
          }
          responsiveTokens[breakpoint].push(token);
        } else if (
          nameLower.includes('button/') ||
          nameLower.includes('card/') ||
          nameLower.includes('form/') ||
          nameLower.includes('divider/')
        ) {
          componentTokens.push(token);
        } else if (
          nameLower.includes('body/') ||
          nameLower.includes('text/')
        ) {
          semanticTokens.push(token);
        } else {
          primitiveTokens.push(token);
        }
      });
    });
  });
  
  // Generate CSS output
  let css = `/* 
 * Auto-generated from Figma variables.json
 * Generated: ${new Date().toISOString()}
 * Source: variables.json
 * 
 * DO NOT EDIT THIS FILE DIRECTLY
 * To update tokens:
 * 1. Export variables.json from Figma
 * 2. Run: node figma-token-transformer.js
 */

@layer tokens {
  :root {
    /* ============================================
       PRIMITIVE TOKENS - Raw Values
       ============================================ */
    
${primitiveTokens.map(t => '    ' + t).join('\n')}

    /* ============================================
       SEMANTIC TOKENS - Context-Aware
       ============================================ */
    
${semanticTokens.map(t => '    ' + t).join('\n')}

    /* ============================================
       COMPONENT TOKENS - Component-Specific
       ============================================ */
    
${componentTokens.map(t => '    ' + t).join('\n')}
  }`;

  // Add responsive tokens
  Object.entries(responsiveTokens).forEach(([breakpoint, tokens]) => {
    if (breakpoint !== 'mode-1' && tokens.length > 0) {
      // Map Figma mode names to CSS breakpoints
      const breakpointMap = {
        'small-tablet': '768px',
        'tablet': '1024px',
        'desktop': '1366px'
      };
      
      const mediaQuery = breakpointMap[breakpoint];
      if (mediaQuery) {
        css += `

  @media (width >= ${mediaQuery}) {
    :root {
${tokens.map(t => '      ' + t).join('\n')}
    }
  }`;
      }
    }
  });

  css += '\n}\n';
  
  // Write the generated CSS file
  const outputPath = path.join(__dirname, 'figma-tokens-generated.css');
  fs.writeFileSync(outputPath, css);
  
  // Mapping documentation is now built into the script - no separate file needed
  
  console.log('✅ Token transformation complete!');
  console.log(`   Generated: ${outputPath}`);
  console.log('\nTo use the generated tokens:');
  console.log('1. Review figma-tokens-generated.css');
  console.log('2. Update globals.css to import the generated file');
}

// Parse command line arguments
const args = process.argv.slice(2);
const validateOnly = args.includes('--validate-only') || args.includes('-v');

// Main execution
function main() {
  console.log('🎨 Figma Token Transformer & Validator\n');
  
  if (validateOnly) {
    console.log('Running validation only...\n');
    const results = validateMappings();
    
    if (results.duplicates > 0) {
      console.log('❌ Critical issues found. Please fix duplicate mappings.');
      process.exit(1);
    } else {
      console.log('✅ All critical validations passed!');
      if (results.conflicts > 0) {
        console.log('ℹ️  Pattern conflicts detected but may be intentional.');
      }
    }
  } else {
    // Run validation first
    console.log('Step 1: Validating token mappings...');
    const validationResults = validateMappings();
    
    // Then run transformation
    console.log('Step 2: Transforming tokens...');
    transformTokens();
    
    // Final summary
    console.log('\n📊 TRANSFORMATION SUMMARY');
    console.log('=========================');
    console.log('✅ Token transformation complete!');
    console.log('✅ CSS file generated: figma-tokens-generated.css');
    
    if (validationResults.duplicates > 0 || validationResults.conflicts > 0) {
      console.log('⚠️  Some mapping conflicts detected (review above)');
    }
    
    console.log('\nNext steps:');
    console.log('1. Review figma-tokens-generated.css');
    console.log('2. Update figma-tokens.css with any new tokens');
    console.log('3. Test your application build');
  }
}

// Run the main function
main();