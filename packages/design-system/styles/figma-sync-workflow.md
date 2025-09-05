# Figma Token Sync Workflow

## Overview
This workflow ensures seamless synchronization between Figma design tokens and your CSS implementation while maintaining optimized naming conventions.

## Token Architecture

```
Figma Export (variables.json)
       ↓
Token Transformer (figma-token-transformer.js)
       ↓
Generated CSS (figma-tokens-generated.css)
       ↓
Manual Optimizations (figma-tokens-v2.css)
```

## Files and Their Purpose

### 1. **variables.json** (Source of Truth)
- Direct export from Figma
- Uses Figma's naming convention (e.g., `Colour/brand/primary/primary-500`)
- Never manually edited

### 2. **figma-token-transformer.js** (Transformer & Validator)
- Validates token mappings for collisions and conflicts
- Transforms Figma names to optimized CSS names
- Maintains mapping between original and new names
- Handles inconsistencies in Figma naming
- Built-in collision detection and warnings

### 3. **figma-tokens-generated.css** (Auto-generated)
- Output from the transformer script
- Clean, optimized CSS variable names
- Automatically categorized (primitive, semantic, component)

### 4. **figma-tokens.css** (Production File)
- Based on generated CSS with manual enhancements
- Includes Tailwind v4 @theme configuration
- Additional semantic tokens and utilities

## Update Workflow

### When Figma Tokens Change:

1. **Export from Figma**
   ```bash
   # In Figma: Plugins → Tokens → Export → variables.json
   # Save to: packages/design-system/styles/variables.json
   ```

2. **Run Transformer**
   ```bash
   cd packages/design-system/styles
   node figma-token-transformer.js
   ```

3. **Review Changes**
   ```bash
   # Compare generated with current
   diff figma-tokens-generated.css figma-tokens.css
   ```

4. **Apply Updates**
   - Option A: Replace current with generated (if no custom tokens)
   - Option B: Manually merge changes (if custom tokens exist)

5. **Test**
   ```bash
   npm run build
   npm run lint
   ```

## Name Mapping Examples

| Figma Name | Generated CSS Name | Usage |
|------------|-------------------|--------|
| `Colour/brand/primary/primary-500` | `--brand-primary-500` | `bg-primary-500` |
| `Measurements/spacing/spacing-xl` | `--spacing-8` | `p-8`, `gap-8` |
| `Typography/heading/h1/font-size` | `--heading-1` | `.text-h1` |
| `Button/primary/background/button-primary` | `--button-primary-bg` | Button component |
| `Text/color/text-primary` | `--foreground-primary` | `text-primary` |

## Key Mapping Decisions

### Spacing Tokens
Figma uses descriptive names (4xs, 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl).
We map these to Tailwind's numeric scale for better utility class integration:

```javascript
'spacing-4xs' → 'spacing-0.5' // 2px
'spacing-3xs' → 'spacing-1'   // 4px
'spacing-2xs' → 'spacing-2'   // 8px
'spacing-xs'  → 'spacing-3'   // 12px
'spacing-sm'  → 'spacing-4'   // 16px
'spacing-md'  → 'spacing-5'   // 20px
'spacing-lg'  → 'spacing-6'   // 24px
'spacing-xl'  → 'spacing-8'   // 32px
'spacing-2xl' → 'spacing-12'  // 48px
'spacing-3xl' → 'spacing-16'  // 64px
'spacing-4xl' → 'spacing-20'  // 80px
'spacing-5xl' → 'spacing-32'  // 128px
```

### Color Tokens
Simplified by removing redundant prefixes:

```javascript
'Colour/brand/primary/primary-500' → 'brand-primary-500'
'Colour/neutral/neutral-800' → 'neutral-800'
```

### Component Tokens
Restructured for clarity:

```javascript
'Button/primary/background/button-primary' → 'button-primary-bg'
'Card/background/card' → 'card-bg'
'Form/input/border/input' → 'input-border'
```

## Adding Custom Tokens

If you need tokens not in Figma, add them to a separate section in `figma-tokens.css`:

```css
/* ============================================
   CUSTOM TOKENS - Not from Figma
   ============================================ */
:root {
  --custom-token: value;
}
```

## Automation Scripts

### Package.json Scripts
```json
{
  "scripts": {
    "tokens:sync": "node styles/figma-token-transformer.js",
    "tokens:validate": "node styles/figma-token-transformer.js --validate-only",
    "tokens:watch": "chokidar 'styles/variables.json' -c 'npm run tokens:sync'"
  }
}
```

### CI/CD Integration
```yaml
# .github/workflows/figma-sync.yml
name: Sync Figma Tokens
on:
  push:
    paths:
      - 'packages/design-system/styles/variables.json'
jobs:
  validate-and-sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run tokens:validate  # Validate mappings first
      - run: npm run tokens:sync      # Transform tokens
      - run: npm run build           # Test build
      - run: npm test               # Run tests
```

## Troubleshooting

### Common Issues

1. **Missing tokens after sync**
   - Check TOKEN_MAPPINGS in transformer.js
   - Ensure Figma export includes all collections

2. **Build errors with new tokens**
   - Verify @theme mappings are explicit (no wildcards)
   - Check for typos in variable references

3. **Inconsistent naming in Figma**
   - Update TOKEN_MAPPINGS to handle variations
   - Examples: "seconday" typo, "color-" prefix inconsistencies

### Validation Checklist

- [ ] All Figma tokens are mapped
- [ ] No duplicate CSS variable names
- [ ] Responsive tokens generate correctly
- [ ] Component tokens reference semantic tokens
- [ ] Build succeeds with new tokens
- [ ] Visual regression tests pass

## Best Practices

1. **Always preserve variables.json** - It's your source of truth
2. **Run transformer after every Figma export** - Ensures consistency
3. **Document custom tokens** - Mark sections not from Figma
4. **Test before committing** - Run build and visual tests
5. **Version control everything** - Track token evolution

## Future Enhancements

Consider these tools for more advanced workflows:

1. **Style Dictionary** - Multi-platform token transformation
2. **Figma Tokens Plugin** - Two-way sync with Git
3. **Token Studio** - Advanced token management
4. **Design Token Validator** - Automated testing

## Support

For questions about token mapping or workflow:
1. Check token-mapping.md for current mappings
2. Review transformer.js for logic
3. Test with small changes first