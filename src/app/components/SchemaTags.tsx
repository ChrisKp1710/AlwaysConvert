'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

type SupportedPaths = '/' | '/about' | '/privacy-policy';

const schemas: Record<SupportedPaths, {
  '@type': string;
  name: string;
  description: string;
}> = {
  '/': {
    '@type': 'WebSite',
    name: 'AlwaysConvert',
    description:
      'Converti qualsiasi file (PDF, DOC, MP4, JPG, e altro) online gratuitamente e senza limiti. Nessuna registrazione richiesta.',
  },
  '/about': {
    '@type': 'WebPage',
    name: 'Chi siamo – AlwaysConvert',
    description:
      'Scopri chi ha creato AlwaysConvert e perché è nato questo progetto open source.',
  },
  '/privacy-policy': {
    '@type': 'WebPage',
    name: 'Privacy Policy – AlwaysConvert',
    description:
      'Leggi l\'informativa sulla privacy di AlwaysConvert. Scopri come proteggiamo i tuoi dati.',
  },
};

export default function SchemaTags() {
  const pathname = usePathname();

  // Crea la chiave "normalizzata" senza locale
  const purePath = pathname.replace(/^\/(en|it|fr|ar)/, '') || '/';

  if (!['/', '/about', '/privacy-policy'].includes(purePath)) return null;

  const schema = schemas[purePath as SupportedPaths];

  const base = 'https://alwaysconvert.app';

  const fullSchema = {
    '@context': 'https://schema.org',
    ...schema,
    url: `${base}${pathname}`,
    inLanguage: pathname.startsWith('/en')
      ? 'en'
      : pathname.startsWith('/fr')
      ? 'fr'
      : pathname.startsWith('/ar')
      ? 'ar'
      : 'it',
  };

  return (
    <Script
      type="application/ld+json"
      id="json-ld-schema"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(fullSchema),
      }}
    />
  );
}
