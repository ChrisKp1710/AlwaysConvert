import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Toaster } from "../components/ui/toaster";
import { ThemeProvider } from "../components/theme-provider";
import GA from "../components/GA";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // evita FOIT (flash of invisible text)
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: "AlwaysConvert – Converti file online gratis",
    description: "Converti PDF, DOC, JPG, MP4 e molti altri formati gratuitamente. Nessuna registrazione. Nessun limite.",
    alternates: {
      canonical: `https://alwaysconvert.app/${params.locale}`,
      languages: {
        en: "https://alwaysconvert.app/en",
        it: "https://alwaysconvert.app/it",
        fr: "https://alwaysconvert.app/fr",
        ar: "https://alwaysconvert.app/ar",
      },
    },
    icons: {
      icon: "/img/favicon.ico",
      shortcut: "/img/favicon-16x16.png",
      apple: "/img/apple-touch-icon.png",
    },
    creator: "Christian Koscielniak Pinto",
    keywords: [
      "AlwaysConvert", "convertitore file", "convertitore gratuito", "file converter", "image converter", "video converter",
      "audio converter", "unlimited file converter", "pdf", "doc", "jpg", "png", "gif", "mp4", "mp3", "wav", "ogg", "flac",
      "webm", "avi", "mov", "mkv", "zip", "rar", "7z", "tar", "tar.gz", "tar.bz2", "tar.xz", "tar.zst", "tar.lz",
      "tar.lz4", "tar.lz5", "tar.lzma", "tar.lzo", "tar.lzop", "tar.lzst", "tar.lzx", "tar.sz", "tar.z", "tar.zstd"
    ],
    verification: {
      google: "f4r8dmpfSAirCNiGuvPhyG8V7uss_gyPaJ7KDiZJTe4",
    },
    openGraph: {
      title: "AlwaysConvert – Converti file gratis e senza limiti",
      description: "Converti qualsiasi file in PDF, JPG, MP4 e altro – 100% gratuito, nessuna registrazione richiesta.",
      url: `https://alwaysconvert.app/${params.locale}`,
      siteName: "AlwaysConvert",
      images: [
        {
          url: "https://alwaysconvert.app/img/alwaysconvert-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "AlwaysConvert - Converti qualsiasi file online",
        },
      ],
      locale: params.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "AlwaysConvert – Converti file gratis",
      description: "Converti qualsiasi file online senza limiti: PDF, DOC, MP3, MP4 e altri formati.",
      images: ["https://alwaysconvert.app/img/alwaysconvert-og-image.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className="h-full">
      <head>
        <link rel="canonical" href={`https://alwaysconvert.app/${locale}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>

      <GA GA_MEASUREMENT_ID="G-3GB5LRJ43M" />

      <Script
        id="cookieyes"
        src="https://cdn-cookieyes.com/client_data/0b5d208db4ac32d4ba9b503b/script.js"
        strategy="afterInteractive"
      />

      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased
          flex
          flex-col
          min-h-screen
        `}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem themes={["light", "dark"]}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            <Toaster />
            <main className="container flex-grow mx-auto px-4 pt-32 lg:pt-36 2xl:pt-44 max-w-4xl lg:max-w-6xl 2xl:max-w-7xl">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}