// imports
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "./ui/sheet";
import { ModeToggle } from "./mode-toggle";
import { LuMenu } from "react-icons/lu";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed z-50 flex items-center justify-between w-full h-24 px-4 py-10 backdrop-blur-md bg-background bg-opacity-30 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
      {/* Logo */}
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
          <div className="flex flex-col h-full justify-between p-4">
            {/* 👤 HEADER CON LOGO + NOME */}
            <div className="flex items-center gap-3 mb-4">
              <Image
                alt="AlwaysConvert"
                src="/img/logo.png"
                width={32}
                height={32}
                className="dark:invert"
              />
              <span className="text-lg font-semibold tracking-tight">
                AlwaysConvert
              </span>
            </div>

            {/* 📋 MENU VOCI PRINCIPALI */}
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

            {/* 🌙 TOGGLE + GITHUB REPO */}
            <div className="mt-6 border-t pt-4 space-y-4">
              {/* Tema toggle */}
              <div className="flex justify-center">
                <ModeToggle />
              </div>

              {/* Bottone Github */}
              <a
                href="https://github.com/ChrisKp1710/AlwaysConvert"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <Button
                  variant="default"
                  className="w-full gap-2 bg-orange-600 rounded-full text-white hover:bg-orange-700 transition justify-between px-4 py-2"
                >
                  <span>Github Repo</span>
                  <BsGithub className="text-xl" />
                </Button>
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
