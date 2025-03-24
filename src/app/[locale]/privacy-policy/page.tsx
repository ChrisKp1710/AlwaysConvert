import { useTranslations } from 'next-intl';

export default function PrivacyPolicy({ params }: { params: { locale: string } }) {
  const t = useTranslations('privacyPolicy');

  // Usa params.locale per ottenere il locale dal percorso dell'URL
  const locale = params.locale || 'en';  // Imposta 'en' come fallback se il locale non è definito

  // Ottieni il fuso orario del server
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Imposta la data con il formato dinamico in base alla lingua e al fuso orario dell'utente
  const formattedDate = new Date().toLocaleDateString(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: timeZone,  // Usa il fuso orario per la formattazione della data
  });

  const sections = t.raw('sections');

  return (
    <div className="space-y-8 text-md md:text-lg text-muted-foreground pb-8">
      <p className="text-sm">{t('effectiveDate', { date: formattedDate })}</p>
      <p>{t('intro')}</p>

      {sections.map((section: { title: string; content: string }, index: number) => (
        <section key={index} className="space-y-2">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            {index + 1}. {section.title}
          </h2>
          <p>{section.content}</p>
        </section>
      ))}

      <p className="border-t pt-4">{t('consent')}</p>
    </div>
  );
}
