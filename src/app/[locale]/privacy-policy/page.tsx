import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
  const t = useTranslations('privacyPolicy');

  const sections = t.raw('sections');

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="space-y-8 text-md md:text-lg text-muted-foreground pb-8">
      <p className="text-sm">{t('effectiveDate', { date: formattedDate })}</p>
      <p>{t('intro')}</p>

      {sections.map((section:{ title: string; content: string}, index: number) => (
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
