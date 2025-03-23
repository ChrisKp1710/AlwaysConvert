import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Toaster } from "../components/ui/toaster";
import { ThemeProvider } from "../components/theme-provider";
import GA from "../components/GA";
import Script from "next/script";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlwaysConvert",
  description: "sito ceh ti permette di convertire viari tipi di file in altri formati, come pdf, doc, jpg, ecc.",
  icons: {
    icon: "/img/favicon.ico",           
    shortcut: "/img/favicon-16x16.png",
    apple: "/img/apple-touch-icon.png",
  },
  creator: "Christian Koscielniak Pinto",
  keywords: ["AlwaysConvert", "convertitore", "image converter", "video converter", "audio converter", "unlimiterd inmage converter", "unlimited video converter", "file", "pdf", "doc", "jpg", "png", "gif", "mp4", "mp3", "wav", "ogg", "flac", "webm", "avi", "mov", "mkv", "zip", "rar", "7z", "tar", "tar.gz", "tar.bz2", "tar.xz", "tar.zst", "tar.lz", "tar.lz4", "tar.lz5", "tar.lzma", "tar.lzo", "tar.lzop", "tar.lzst", "tar.lzx", "tar.sz", "tar.z", "tar.zstd", "tar.zstd", "tar.zst"],
  verification: {
    google: "f4r8dmpfSAirCNiGuvPhyG8V7uss_gyPaJ7KDiZJTe4",
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} suppressHydrationWarning className="h-full">
      <GA GA_MEASUREMENT_ID="G-3GB5LRJ43M" />

      {/* CookieYes Script */}
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
          
          {/* NAVBAR + TOASTER */}
          <Navbar />
          <Toaster />
          
          {/* MAIN: flex-grow spinge il footer in basso quando i contenuti sono pochi */}
          <main className="container flex-grow mx-auto px-4 pt-32 lg:pt-36 2xl:pt-44 max-w-4xl lg:max-w-6xl 2xl:max-w-7xl">
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
          </main>

          {/* FOOTER SEMPRE IN FONDO */}
          <Footer />
        
        </ThemeProvider>
      </body>
    </html>
  );
}
