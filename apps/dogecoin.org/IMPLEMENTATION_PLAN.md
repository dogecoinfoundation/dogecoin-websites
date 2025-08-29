# Implementation Plan: Projects and Activities Sections

## Overview
This plan outlines the implementation of two new content sections (Projects and Activities) that will mirror the blog's content management system while having their own unique presentation styles. The implementation will prioritize code reusability and maintainability.

## Current Blog Architecture Analysis

### Content Structure
- Content stored in `/content/blog/[slug]/` folders
- Each folder contains:
  - Language-specific markdown files (`en.md`, `es.md`, etc.)
  - Associated images/assets
- Frontmatter metadata: title, date, type, image, excerpt, author

### Code Components
1. **`lib/blog.ts`**: Core content loading logic
   - `getAllBlogSlugs()`: Gets all blog post slugs
   - `getAllBlogPosts()`: Retrieves all posts with metadata
   - `getBlogPostBySlug()`: Gets single post with HTML content
   - Markdown preprocessing for custom components
   - Multi-language support with fallback to English

2. **Blog Pages**:
   - `/app/[locale]/blog/page.tsx`: Index page with year-grouped cards
   - `/app/[locale]/blog/[slug]/page.tsx`: Individual post pages

3. **Styling**: Custom CSS in `globals.css` for blog-specific components

## Implementation Architecture

### Phase 1: Unified Content System

#### 1.1 Create Generic Content Loader (`lib/content/index.ts`)
```typescript
interface ContentMeta {
  slug: string;
  title: string;
  date: string;
  type?: string;
  image: string;
  excerpt?: string;
  [key: string]: any; // Allow custom fields
}

interface ContentConfig {
  contentType: 'blog' | 'projects' | 'activities';
  contentDir: string;
  defaultImage: string;
  customFields?: string[];
}
```

#### 1.2 Refactor Existing Blog Code
- Extract common content loading logic
- Maintain backward compatibility
- Keep blog-specific preprocessing

### Phase 2: Content Type Definitions

#### 2.1 Projects Content Structure (`lib/content/projects.ts`)
```typescript
interface ProjectMeta extends ContentMeta {
  technologies?: string[];
  status: 'active' | 'completed' | 'planned';
  github?: string;
  demo?: string;
  featured?: boolean;
}
```

#### 2.2 Activities Content Structure (`lib/content/activities.ts`)
```typescript
interface ActivityMeta extends ContentMeta {
  category: 'community' | 'development' | 'education' | 'event';
  location?: string;
  participants?: number;
  featured?: boolean;
}
```

### Phase 3: Shared Components

#### 3.1 Create Reusable Card Grid Component
- `components/content/ContentGrid.tsx`
- Props: items, renderCard, searchQuery
- Built-in search filtering capability

#### 3.2 Create Search Bar Component
- `components/content/SearchBar.tsx`
- Styled prominently for Projects/Activities
- Initially non-functional (as requested)

#### 3.3 Create Unified Card Component
- `components/content/ContentCard.tsx`
- Flexible design accepting custom badge colors/types
- Responsive grid layout

### Phase 4: Page Implementation

#### 4.1 Projects Page (`/app/[locale]/projects/page.tsx`)
- Search bar at top
- Dynamic grid of project cards
- Card design: 
  - Featured image
  - Title
  - Tech stack badges
  - Status indicator
  - Brief description
  - Links to GitHub/Demo

#### 4.2 Activities Page (`/app/[locale]/activities/page.tsx`)
- Search bar at top
- Dynamic grid of activity cards
- Card design:
  - Featured image
  - Title
  - Category badge
  - Date/Location
  - Participant count
  - Brief description

#### 4.3 Individual Pages
- `/app/[locale]/projects/[slug]/page.tsx`
- `/app/[locale]/activities/[slug]/page.tsx`
- Reuse blog's markdown rendering logic

### Phase 5: Navigation Update

Update `components/layout/Nav.tsx`:
```typescript
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/activities', label: 'Activities' },
  { href: '/blog', label: 'Blog' },
];
```

### Phase 6: Content Structure

#### Directory Structure:
```
content/
├── blog/           (existing)
├── projects/
│   ├── dogecoin-core/
│   │   ├── en.md
│   │   └── hero.jpg
│   └── libdogecoin/
│       ├── en.md
│       └── logo.png
└── activities/
    ├── community-meetup-2025/
    │   ├── en.md
    │   └── event.jpg
    └── hackathon-2025/
        ├── en.md
        └── banner.jpg
```

### Phase 7: Asset Management

#### 7.1 Update Copy Script
- Extend `scripts/copy-blog-assets.cjs` to handle all content types
- Rename to `copy-content-assets.cjs`

#### 7.2 Public Assets Structure
```
public/assets/
├── blog/         (existing)
├── projects/
└── activities/
```

## Implementation Steps

1. **Create unified content system** (lib/content/)
2. **Refactor blog.ts to use new system**
3. **Create type definitions for projects and activities**
4. **Build reusable components** (SearchBar, ContentGrid, ContentCard)
5. **Implement Projects section** (pages, styles)
6. **Implement Activities section** (pages, styles)
7. **Update navigation bar**
8. **Create sample content for testing**
9. **Update asset copying scripts**
10. **Test multi-language support**

## Key Design Decisions

1. **Code Reusability**: Single content loading system for all types
2. **Type Safety**: Strong TypeScript interfaces for each content type
3. **Consistent UX**: Similar navigation and layout patterns
4. **Progressive Enhancement**: Search bar ready for future functionality
5. **Maintainability**: Shared components reduce duplication
6. **Scalability**: Easy to add new content types in future

## CSS Approach

- Create modular CSS classes
- Prefix with content type (e.g., `.project-card`, `.activity-card`)
- Share common grid and layout styles
- Use CSS variables for theme consistency

## Testing Strategy

1. Create sample content for each type
2. Test multi-language fallback
3. Verify responsive design
4. Test navigation active states
5. Validate build process with new content

## Future Enhancements (Not in current scope)

- Functional search/filtering
- Tags and categories
- Related content suggestions
- RSS feeds for each content type
- Content analytics