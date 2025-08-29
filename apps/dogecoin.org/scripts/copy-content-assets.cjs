#!/usr/bin/env node
/*
 Copies assets from content/<type>/<slug>/ to public/assets/<type>/<slug>/
 - Copies all non-markdown files (and non-hidden) preserving folders
 - Supports blog, projects, and activities content types
 - If a frontmatter image refers to a filename, Next will serve from /assets/<type>/<slug>/<file>
*/
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

// Resolve relative to the app's directory regardless of current working directory
const ROOT = path.resolve(__dirname, '..');

const CONTENT_TYPES = ['blog', 'projects', 'activities'];

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true }).catch(() => {});
}

async function copyDir(src, dest) {
  await ensureDir(dest);
  const entries = await fsp.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(from, to);
    } else if (entry.isFile()) {
      if (entry.name.toLowerCase().endsWith('.md')) continue; // skip markdown
      await ensureDir(path.dirname(to));
      
      // Check if source file has content before copying
      const stats = await fsp.stat(from);
      if (stats.size === 0) {
        console.log(`[copy-content-assets] Skipping empty file: ${from}`);
        continue;
      }
      
      await fsp.copyFile(from, to);
    }
  }
}

async function copyContentAssets(contentType) {
  const CONTENT_DIR = path.join(ROOT, 'content', contentType);
  const PUBLIC_DIR = path.join(ROOT, 'public', 'assets', contentType);
  
  const exists = fs.existsSync(CONTENT_DIR);
  if (!exists) {
    console.log(`[copy-content-assets] No ${contentType} directory found, skipping`);
    return;
  }
  
  await ensureDir(PUBLIC_DIR);
  const entries = await fsp.readdir(CONTENT_DIR, { withFileTypes: true });
  let copiedCount = 0;
  
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const src = path.join(CONTENT_DIR, slug);
    const dest = path.join(PUBLIC_DIR, slug);
    await copyDir(src, dest);
    copiedCount++;
  }
  
  console.log(`[copy-content-assets] Copied assets for ${copiedCount} ${contentType} items`);
}

async function main() {
  console.log('[copy-content-assets] Starting asset copy for all content types...');
  
  for (const contentType of CONTENT_TYPES) {
    try {
      await copyContentAssets(contentType);
    } catch (err) {
      console.error(`[copy-content-assets] Failed to copy ${contentType} assets:`, err);
      process.exitCode = 1;
    }
  }
  
  console.log('[copy-content-assets] Asset copy completed');
}

main().catch((err) => {
  console.error('[copy-content-assets] Script failed:', err);
  process.exitCode = 1;
});


