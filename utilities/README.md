# Utilities

Collection of utility scripts for the Dogecoin websites monorepo.

## Tag Analyzer

Analyzes metadata tags in specified directories and shows usage statistics.

### Usage

```bash
# From the monorepo root
node utilities/tag-analyzer.js <directory1> [directory2] [...]

# Examples:
node utilities/tag-analyzer.js apps/dogecoin.org/content/projects
node utilities/tag-analyzer.js apps/dogecoin.org/content/projects apps/dogecoin.org/content/activities

# Get help
node utilities/tag-analyzer.js --help

### Example Output

```
======================================================================
TAG ANALYSIS - DOGECOIN CONTENT
======================================================================
Total unique tags: 64

CONTENT SUMMARY:
• dogecoin.org/activities: 4/4 items with tags
• dogecoin.org/blog: 3/3 items with tags
• dogecoin.org/projects: 13/13 items with tags

Total items with tags: 20

TAG USAGE SUMMARY:
--------------------------------------------------
Tag                  Count  Used In
--------------------------------------------------
dogecoin                11  dogecoin.org/projects/balance-master, dogecoin.org/projects/chainfollower...
community                2  dogecoin.org/activities/community-meetup-2025, dogecoin.org/activities/kabosu-statue
...

INSIGHTS:
• Most used tag: "dogecoin" (11 items)
• Tags by content type:
  - dogecoin.org/projects: 43 unique tags
  - dogecoin.org/activities: 14 unique tags
  - dogecoin.org/blog: 8 unique tags
```