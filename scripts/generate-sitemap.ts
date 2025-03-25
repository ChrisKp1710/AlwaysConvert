import fs from 'fs';
import path from 'path';

const baseUrl = 'https://alwaysconvert.netlify.app';
const locales = ['it', 'en', 'fr', 'ar'];
const pages = ['', '/about', '/privacy-policy'];

const urls = locales.flatMap(locale =>
  pages.map(page => `
    <url>
      <loc>${baseUrl}/${locale}${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
  `)
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('')}
</urlset>
`.trim();

const filePath = path.resolve(process.cwd(), 'public/sitemap.xml');
fs.writeFileSync(filePath, sitemap);

console.log('✅ Sitemap statica generata in public/sitemap.xml');
