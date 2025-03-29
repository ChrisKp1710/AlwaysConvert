'use client';

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

// Mappa locale → codice bandiera
const localeMap: Record<string, string> = {
  it: 'IT',
  en: 'GB',
  fr: 'FR',
};

// Bandiera → locale
const flagToLocale = Object.fromEntries(
  Object.entries(localeMap).map(([locale, code]) => [code, locale])
);

// Bandiera → label da mostrare
const labelMap: Record<string, string> = {
  IT: 'IT',
  GB: 'EN',
  FR: 'FR',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (countryCode: string) => {
    const newLocale = flagToLocale[countryCode];
    if (!newLocale || newLocale === locale) return;

    // ✅ Salva cookie per middleware
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/`;

    // ✅ Costruisci nuovo path sostituendo la lingua
    const segments = pathname.split('/');
    segments[1] = newLocale;

    // ✅ Navigazione fluida senza ricaricare
    startTransition(() => {
      router.replace(segments.join('/'));
    });

    setIsOpen(false);
  };

  const selectedCountry = localeMap[locale];
  const selectableCountries = Object.values(localeMap).filter(code => code !== selectedCountry);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-24 px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex items-center">
          <Image
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry}.svg`}
            alt={`${selectedCountry} flag`}
            width={20}
            height={20}
            className="w-5 h-5 mr-2"
          />
          <span className="text-sm">{labelMap[selectedCountry]}</span>
        </div>
        <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-24 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md shadow-lg z-50 overflow-hidden">
          {selectableCountries.map(country => (
            <div
              key={country}
              className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer transition-colors"
              onClick={() => handleSelect(country)}
            >
              <Image
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                alt={`${country} flag`}
                width={20}
                height={20}
                className="w-5 h-5 mr-2"
              />
              <span className="text-sm">{labelMap[country]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
