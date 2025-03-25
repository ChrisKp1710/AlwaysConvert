// imports
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { ModeToggle } from "./mode-toggle";
import { LuMenu } from "react-icons/lu";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed z-50 flex items-center justify-between w-full h-24 px-4 py-10 backdrop-blur-md bg-background bg-opacity-30 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
      {/* Logo (Desktop + Mobile) */}
      <Link href="/" className="flex items-center space-x-2">
        <Image
          alt="AlwaysConvert"
          src="/img/logo.png"
          width={60}
          height={60}
          className="cursor-pointer dark:invert"
        />
        <h1 className="text-2xl font-bold text-slate-950 dark:text-slate-200">
          AlwaysConvert
        </h1>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden gap-1 md:gap-2 lg:gap-4 md:flex">
        <Button variant="ghost" className="font-semibold text-md">
          <Link href="/">Home</Link>
        </Button>
        <Link href="/about">
          <Button variant="ghost" className="font-semibold text-md">
            About
          </Button>
        </Link>
        <Link href="/privacy-policy">
          <Button variant="ghost" className="font-semibold text-md">
            Privacy Policy
          </Button>
        </Link>
      </div>

      {/* Desktop Right Actions */}
      <div className="items-center hidden gap-2 md:flex">
        <ModeToggle />
        <Link
          href="https://github.com/ChrisKp1710/AlwaysConvert"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <Button
            variant="default"
            className="items-center gap-2 bg-orange-600 rounded-full w-fit"
            size="lg"
          >
            <span>Github Repo</span>
            <span className="text-xl">
              <BsGithub />
            </span>
          </Button>
        </Link>
      </div>

      {/* MOBILE NAV */}
      <Sheet>
        <SheetTrigger className="block p-3 md:hidden">
          <span className="text-2xl text-slate-950 dark:text-slate-200">
            <LuMenu />
          </span>
        </SheetTrigger>

        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full justify-between py-4 px-3">
            {/* 👤 Logo + Nome + Slogan */}
            <div className="flex items-center gap-3 mb-4">
              <Image
                alt="AlwaysConvert"
                src="/img/logo.png"
                width={36}
                height={36}
                className="dark:invert"
              />
              <div className="flex flex-col">
                <span className="text-base font-semibold tracking-tight">
                  AlwaysConvert
                </span>
                <span className="text-xs text-muted-foreground">
                  Converti con stile ✨
                </span>
              </div>
            </div>

            {/* 📋 Link navigazione mobile */}
            <div className="flex flex-col gap-4 text-lg font-semibold">
              <SheetTrigger asChild>
                <Link href="/">
                  <Button variant="link" className="w-full justify-start">
                    Home
                  </Button>
                </Link>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Link href="/about">
                  <Button variant="link" className="w-full justify-start">
                    About
                  </Button>
                </Link>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Link href="/privacy-policy">
                  <Button variant="link" className="w-full justify-start">
                    Privacy Policy
                  </Button>
                </Link>
              </SheetTrigger>
            </div>

            {/* Divider visivo */}
            <hr className="my-6 border-gray-200 dark:border-gray-700" />

            {/* 🌙 Tema + GitHub */}
            <div className="space-y-4">
              {/* Toggle tema */}
              <div className="flex justify-center">
                <ModeToggle />
              </div>

              {/* Bottone GitHub */}
              <a
                href="https://github.com/ChrisKp1710/AlwaysConvert"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <Button
                  variant="default"
                  className="w-full gap-2 bg-orange-600 rounded-xl text-white hover:bg-orange-700 transition justify-between px-4 py-3 shadow-md"
                >
                  <span>Github Repo</span>
                  <BsGithub className="text-xl" />
                </Button>
              </a>
            </div>

            {/* Footer info opzionale */}
            <p className="text-xs text-muted-foreground text-center mt-6">
              Made with ❤️ in Italy
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
