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
    const entryPath = path.join(dir, entry.name); // path assoluto
    const urlPath = `${currentPath}/${entry.name}`; // path relativo per la sitemap

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
// GENERAZIONE DELLA SITEMAP
// ======================

// Trova tutte le pagine dentro src/app/[locale]/...
const baseRoutes = scanPages(appDir);

// Costruisce i blocchi <url> per ogni lingua + pagina
const urls = locales.flatMap((locale) =>
  baseRoutes.map(({ route, filePath }) => {
    // Costruisce il path completo localizzato
    const fullPath = route === '' ? `/${locale}` : `/${locale}${route}`;

    // Ottiene la data dell'ultima modifica del file
    const stats = fs.statSync(filePath);
    const lastmod = stats.mtime.toISOString().split('T')[0]; // formato YYYY-MM-DD

    // Costruisce il blocco <url>
    return `
      <url>
        <loc>${baseUrl}${fullPath}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${route === '' ? '1.0' : '0.8'}</priority>
      </url>
    `;
  })
);

// ======================
// SCRITTURA FILE sitemap.xml
// ======================

// XML finale (formattato e valido per Google)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('\n')}
</urlset>
`.trim();

// Scrive il file nella cartella public
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log(`✅ Sitemap generata dinamicamente (${urls.length} URL)`);


// ======================
// GENERAZIONE DEL ROBOTS.TXT
// ======================

// Impostazioni standard SEO per i bot (Google, Bing, ecc.)
const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`.trim();

// Scrive anche il robots.txt
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
console.log('✅ robots.txt generato automaticamente');
