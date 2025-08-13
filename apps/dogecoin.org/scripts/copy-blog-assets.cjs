#!/usr/bin/env node
/*
 Copies assets from content/blog/<slug>/ to public/assets/blog/<slug>/
 - Copies all non-markdown files (and non-hidden) preserving folders
 - If a frontmatter image refers to a filename, Next will serve from /assets/blog/<slug>/<file>
*/
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

// Resolve relative to the app's directory regardless of current working directory
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const PUBLIC_DIR = path.join(ROOT, 'public', 'assets', 'blog');

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
      await fsp.copyFile(from, to);
    }
  }
}

async function main() {
  const exists = fs.existsSync(CONTENT_DIR);
  if (!exists) return;
  await ensureDir(PUBLIC_DIR);
  const entries = await fsp.readdir(CONTENT_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const src = path.join(CONTENT_DIR, slug);
    const dest = path.join(PUBLIC_DIR, slug);
    await copyDir(src, dest);
  }
}

main().catch((err) => {
  console.error('[copy-blog-assets] failed:', err);
  process.exitCode = 1;
});


