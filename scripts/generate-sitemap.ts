import fs from 'fs';
import path from 'path';

// ======================
// CONFIGURAZIONE BASE
// ======================

// URL principale del sito (usato in <loc>)
const baseUrl = 'https://alwaysconvert.netlify.app';

// Lingue supportate (devono combaciare con quelle di next-intl)
const locales = ['en', 'it', 'fr', 'ar'];

// Percorso alla cartella che contiene le pagine localizzate ([locale])
const appDir = path.resolve(process.cwd(), 'src/app/[locale]');

// Percorso alla cartella "public" dove verranno salvati sitemap.xml e robots.txt
const publicDir = path.resolve(process.cwd(), 'public');


// ======================
// FUNZIONE: Ricorsivamente trova tutte le pagine
// ======================

// Restituisce un array di oggetti con:
// - route (es: /about)
// - filePath (per ottenere la data ultima modifica)
function scanPages(dir: string, currentPath = ''): { route: string; filePath: string }[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const pages: { route: string; filePath: string }[] = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    const urlPath = `${currentPath}/${entry.name}`;

    if (entry.isDirectory()) {
      // Ricorsione: entra nella sottocartella
      pages.push(...scanPages(entryPath, urlPath));
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
      // Se è una vera pagina Next.js, la aggiungiamo
      pages.push({
        route: currentPath || '',
        filePath: entryPath
      });
    }
  }

  return pages;
}


// ======================
// FUNZIONI DI SUPPORTO SEO
// ======================

// Calcola la profondità del path per assegnare <priority> dinamico
function getPriority(path: string): string {
  const segments = path.split('/').filter(Boolean).length;
  if (segments <= 1) return '1.0';
  if (segments === 2) return '0.8';
  return '0.6';
}

// Calcola <changefreq> in base alla tipologia di pagina
function getChangeFreq(route: string): string {
  if (route === '' || route === '/') return 'daily';
  if (route.includes('privacy-policy')) return 'yearly';
  if (route.includes('about')) return 'monthly';
  return 'weekly';
}


// ======================
// GENERAZIONE DELLA SITEMAP
// ======================

// Trova tutte le pagine dentro src/app/[locale]/...
const baseRoutes = scanPages(appDir);

// Costruisce i blocchi <url> per ogni lingua + pagina + hreflang
const urls = baseRoutes.flatMap(({ route, filePath }) => {
  // Data ultima modifica
  const stats = fs.statSync(filePath);
  const lastmod = stats.mtime.toISOString().split('T')[0];

  // SEO dynamic data
  const priority = getPriority(route);
  const changefreq = getChangeFreq(route);

  // Costruisce i tag hreflang per tutte le lingue
  const alternates = locales.map(locale => {
    const href = `${baseUrl}/${locale}${route}`;
    return `<xhtml:link rel="alternate" hreflang="${locale}" href="${href}" />`;
  }).join('\n        '); // indentato bene

  // Un blocco <url> per ogni lingua
  return locales.map(locale => {
    const loc = `${baseUrl}/${locale}${route}`;
    return `
      <url>
        <loc>${loc}</loc>
        ${alternates}
        <lastmod>${lastmod}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
      </url>
    `;
  });
});


// ======================
// SCRITTURA FILE sitemap.xml
// ======================

// XML finale con namespace hreflang incluso
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml">
  ${urls.join('\n')}
</urlset>
`.trim();

// Scrive il file nella cartella public
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log(`✅ Sitemap generata con ${urls.length} URL, completa di hreflang e dati SEO`);


// ======================
// GENERAZIONE DEL ROBOTS.TXT
// ======================

// Impostazioni standard SEO per i bot
const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`.trim();

// Scrive anche il robots.txt
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
console.log('✅ robots.txt generato automaticamente');
