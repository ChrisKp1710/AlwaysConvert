import fs from "fs";
import path from "path";

// ======================
// CONFIG
// ======================

const baseUrl = "https://alwaysconvert.app";
const locales = ["en", "it", "fr", "ar"];
const appDir = path.resolve(process.cwd(), "src/app/[locale]");
const publicDir = path.resolve(process.cwd(), "public");
const sitemapsDir = path.join(publicDir, "sitemaps");

// ======================
// Utility: Scan delle route da src/app/[locale]/
// ======================

function scanPages(dir: string, currentPath = ""): { route: string; filePath: string }[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const pages: { route: string; filePath: string }[] = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      pages.push(...scanPages(entryPath, `${currentPath}/${entry.name}`));
    } else if (entry.name === "page.tsx" || entry.name === "page.ts") {
      pages.push({ route: currentPath || "", filePath: entryPath });
    }
  }

  return pages;
}

function getPriority(route: string): string {
  const depth = route.split("/").filter(Boolean).length;
  if (depth <= 1) return "1.0";
  if (depth === 2) return "0.8";
  return "0.6";
}

function getChangeFreq(route: string): string {
  if (route === "" || route === "/") return "daily";
  if (route.includes("privacy-policy")) return "yearly";
  if (route.includes("about")) return "monthly";
  return "weekly";
}

// ======================
// Sitemap per lingua
// ======================

function generateSitemapByLang(lang: string, routes: { route: string; filePath: string }[]): string {
  const urls = routes.map(({ route, filePath }) => {
    const lastmod = fs.statSync(filePath).mtime.toISOString().split("T")[0];
    const loc = `${baseUrl}/${lang}${route}`;
    const priority = getPriority(route);
    const changefreq = getChangeFreq(route);

    const alternates = locales
      .map(
        (alt) =>
          `<xhtml:link rel="alternate" hreflang="${alt}" href="${baseUrl}/${alt}${route}" />`
      )
      .join("\n    ");

    return `  <url>
    <loc>${loc}</loc>
    ${alternates}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;
}

// ======================
// Sitemap Index
// ======================

function generateSitemapIndex(): string {
  const today = new Date().toISOString().split("T")[0];

  const sitemaps = locales
    .map(
      (lang) => `<sitemap>
  <loc>${baseUrl}/sitemaps/sitemap.${lang}.xml</loc>
  <lastmod>${today}</lastmod>
</sitemap>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;
}

// ======================
// robots.txt
// ======================

function generateRobotsTxt(): string {
  const now = new Date().toISOString().split("T")[0];

  return `# ===================================================
# robots.txt — AlwaysConvert by Christian Koscielniak Pinto
# ===================================================

# Project:       AlwaysConvert
# Site URL:      ${baseUrl}
# Sitemap:       Multilingual (sitemap index + per lingua)
# Author:        Christian Koscielniak Pinto (CKP)
# Tech Stack:    Next.js · TypeScript · Vite · Netlify
# Generated on:  ${now}
# Generated by:  generate-sitemap-multilang.ts
# Version:       SEO+ Custom Robots v2.1

# ========== 🤖 BOT ACCESS CONTROL ==========

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: *
Disallow: /api/
Disallow: /trpc/
Disallow: /_next/
Disallow: /_vercel/
Disallow: /*.json$
Disallow: /*.ico$
Disallow: /*.svg$
Disallow: /*.map$
Disallow: /server-sitemap.xml

# Blocca i .txt generici, ma consenti quelli etici/pubblici
Disallow: /*.txt$

# ✅ Eccezioni: Consenti file .txt importanti per la trasparenza
Allow: /humans.txt
Allow: /security.txt
Allow: /changelog.txt
Allow: /readme.txt
Allow: /license.txt

Allow: /

# ========== 🌐 XML SITEMAP INDEX ==========

Sitemap: ${baseUrl}/sitemap.xml

# 🔧 Powered by CKP`;
}

// ======================
// Netlify _headers
// ======================

function generateHeadersFile(): void {
  const lines: string[] = [];

  locales.forEach((lang) => {
    lines.push(`/sitemaps/sitemap.${lang}.xml`);
    lines.push(`  Content-Type: application/xml`);
    lines.push(""); // Spazio tra righe
  });

  fs.writeFileSync(path.join(publicDir, "_headers"), lines.join("\n"));
  console.log("✅ _headers generato per Netlify");
}

// ======================
// Scrittura File
// ======================

function writeAll() {
  const routes = scanPages(appDir);
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
  if (!fs.existsSync(sitemapsDir)) fs.mkdirSync(sitemapsDir);

  // Sitemap per lingua (in sitemaps/)
  locales.forEach((lang) => {
    const sitemap = generateSitemapByLang(lang, routes);
    fs.writeFileSync(path.join(sitemapsDir, `sitemap.${lang}.xml`), sitemap);
    console.log(`✅ sitemap.${lang}.xml generata`);
  });

  // Sitemap index
  const sitemapIndex = generateSitemapIndex();
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapIndex);
  console.log("✅ sitemap.xml (index) generata");

  // Robots.txt
  const robotsTxt = generateRobotsTxt();
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt);
  console.log("✅ robots.txt generato — Powered by CKP");

  // Headers per Netlify
  generateHeadersFile();

  // Log finale
  console.log(`🎉 Generazione completata con ${routes.length * locales.length} URL totali indicizzati.`);
}

writeAll();
