import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Sparkles, Users } from "lucide-react"; // aggiunto Users

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-12 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-between">

        {/* Left: Copyright + Privacy */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <span>© {currentYear} AlwaysConvert. All rights reserved.</span>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <Link
              href="/privacy-policy"
              className="hover:underline hover:text-gray-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="ml-1 text-gray-300">v1.0.0</span>
          </div>
        </div>

        {/* Center: Badge Sitemap + Robots.txt */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
            <Image
              src="https://img.shields.io/badge/Sitemap-Auto--Generated-4ade80?style=for-the-badge&logo=google&logoColor=white"
              alt="Sitemap Badge"
              width={130}
              height={28}
              className="h-5 w-auto"
            />
          </a>
          <a href="/robots.txt" target="_blank" rel="noopener noreferrer">
            <Image
              src="https://img.shields.io/badge/robots.txt-SEO%20Friendly-blue?style=for-the-badge&logo=google&logoColor=white"
              alt="Robots.txt Badge"
              width={130}
              height={28}
              className="h-5 w-auto"
            />
          </a>
        </div>

        {/* Right: Frase + Autore + Icona Team */}
        <div className="flex flex-col md:self-end text-center md:text-right gap-1">
          <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 italic leading-snug">
            <Sparkles className="w-4 h-4 text-pink-500" />
            Developed with passion under the stars
          </p>

          <p className="flex items-center gap-2">
            <span>By</span>
            <Link
              href="https://kodechris.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:underline"
            >
              <Image
                src="https://kodechris.dev/favicon.ico"
                alt="Christian's site"
                width={20}
                height={20}
                className="rounded-full"
              />
              <span>Christian Koscielniak Pinto</span>
            </Link>

            {/* 👥 Icona Team */}
            <Link
              href="/humans.txt"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Meet the team"
              className="ml-2 inline-flex items-center justify-center w-8 h-8 rounded-xl border border-pink-500 hover:scale-110 hover:rotate-2 transition-transform duration-300 shadow-sm bg-white/30 dark:bg-white/10"
            >
              <Users className="w-4 h-4 text-pink-500" />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
