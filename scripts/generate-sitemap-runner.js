// scripts/generate-sitemap-runner.js

import { register } from 'ts-node/esm';
import { pathToFileURL } from 'url';

// Registra ts-node per gestire file .mts in ambienti moderni (Node 20+)
await register();

// Percorso del file TypeScript da eseguire
const filePath = pathToFileURL('./scripts/generate-sitemap.mts');

// Importa ed esegue il file TypeScript
await import(filePath);
