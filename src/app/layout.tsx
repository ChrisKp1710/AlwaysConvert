import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./components/theme-provider";

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
  description: "sito che ti permette di convertire vari tipi di file in altri formati, come pdf, doc, jpg, ecc.",
  icons: {
    icon: "/img/favicon.ico",            
    shortcut: "/img/favicon-16x16.png",
    apple: "/img/apple-touch-icon.png",
  },
  creator: "Christian Koscielniak Pinto",
  keywords: [/* ... */],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      {/* 
        className="h-full" qui non è strettamente necessario, 
        ma aiuta se vuoi che <html> occupi sempre il 100% in altezza.
      */}
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
            {children}
          </main>

          {/* FOOTER SEMPRE IN FONDO */}
          <Footer />
        
        </ThemeProvider>
      </body>
    </html>
  );
}
