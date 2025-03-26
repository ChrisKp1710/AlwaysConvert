import https from "https";

const BASE_URL = "https://alwaysconvert.app";
const PATHS = [
  "/sitemap.xml",
  "/sitemaps/sitemap.it.xml",
  "/sitemaps/sitemap.en.xml",
  "/sitemaps/sitemap.fr.xml",
  "/sitemaps/sitemap.ar.xml",
];

function fetchAndValidate(path) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}${path}`;
    https.get(url, (res) => {
      let data = "";

      // Status Code
      const status = res.statusCode ?? 0;
      const contentType = res.headers["content-type"];

      if (status !== 200) {
        return reject(`❌ ${path} → Status code ${status}`);
      }

      if (!contentType?.includes("application/xml")) {
        return reject(`❌ ${path} → Content-Type NON corretto: ${contentType}`);
      }

      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        if (!data.includes("<url>") && !data.includes("<sitemap>")) {
          return reject(`❌ ${path} → XML valido ma privo di <url> o <sitemap>`);
        }

        console.log(`✅ ${path} → OK (XML + Content-Type + Status 200)`);
        resolve();
      });
    }).on("error", (err) => {
      reject(`❌ ${path} → Errore di rete: ${err.message}`);
    });
  });
}

async function validateAll() {
  console.log("🔍 Validazione sitemap in corso...\n");

  for (const path of PATHS) {
    try {
      await fetchAndValidate(path);
    } catch (err) {
      console.error(err);
    }
  }

  console.log("\n🧪 Validazione completata.");
}

validateAll();
