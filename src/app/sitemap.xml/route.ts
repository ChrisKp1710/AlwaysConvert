// src/app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';

// Lingue supportate dal tuo sito (locales)
const locales = ['it', 'en', 'fr', 'ar'];

// Pagine principali del tuo sito da indicizzare
const pages = ['', '/about', '/privacy-policy'];

// URL base del tuo sito
const baseUrl = 'https://alwaysconvert.netlify.app';

export async function GET() {
  // Genera automaticamente tutte le combinazioni URL possibili
  const urls = locales.flatMap(locale =>
    pages.map(page => `
      <url>
        <loc>${baseUrl}/${locale}${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>${page === '' ? '1.0' : '0.8'}</priority>
      </url>
    `)
  );

  // Formato XML sitemap completo
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join('')}
    </urlset>
  `.trim();

  // Risposta HTTP XML
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

// Rigenera la sitemap ogni 24 ore (opzionale ma raccomandato)
export const revalidate = 86400;
