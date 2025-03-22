import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 flex flex-col items-center justify-between space-y-2 md:space-y-0 md:flex-row text-sm text-gray-500 dark:text-gray-400">
        
        {/* Copyright */}
        <p className="flex items-center gap-2">
          © {currentYear} AlwaysConvert. All rights reserved.
        </p>

        {/* Creato da / Link al tuo sito */}
        <p className="flex items-center gap-2">
          <span>By</span>
          <Link
            href="https://kodechris.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:underline"
          >
            {/* Se vuoi usare la favicon dal tuo sito remoto: */}
            <Image
              src="https://kodechris.dev/favicon.ico" // Caricata dal tuo dominio
              alt="Kodechris Logo"
              width={16}
              height={16}
            />
            <span>Christian Koscielniak Pinto</span>
          </Link>
        </p>

      </div>
    </footer>
  );
}
