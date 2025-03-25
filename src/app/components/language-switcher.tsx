'use client';

import React, { useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import FlagsSelect from 'react-flags-select';

const localeMap: Record<string, string> = {
  it: 'IT',
  en: 'GB',
  fr: 'FR',
};

const flagToLocale = Object.fromEntries(
  Object.entries(localeMap).map(([locale, code]) => [code, locale])
);

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSelect = (countryCode: string) => {
    const newLocale = flagToLocale[countryCode];
    if (!newLocale || newLocale === locale) return;

    const segments = pathname.split('/');
    segments[1] = newLocale;

    startTransition(() => {
      router.replace(segments.join('/'));
    });
  };

  return (
    <div className="flex justify-center mt-4">
      <FlagsSelect
        selected={localeMap[locale]}
        countries={Object.values(localeMap)}
        customLabels={{
          IT: '🇮🇹',
          GB: '🇬🇧',
          FR: '🇫🇷',
        }}
        onSelect={handleSelect}
        showSelectedLabel={false}
        showOptionLabel={false}
        className="border-none outline-none"
      />
    </div>
  );
}
