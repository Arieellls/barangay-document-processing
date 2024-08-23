import Link from "next/link";
import Image from "next/image";
import { PanelsTopLeft } from "lucide-react";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
        <div className="container h-14 flex items-center">
          <Link
            href="/"
            className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
          >
            <PanelsTopLeft className="w-6 h-6 mr-3" />
            <span className="font-bold">
              Barangay Document Processing System
            </span>
            <span className="sr-only">Barangay Document Processing System</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <ModeToggle />
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100vh-57px-97px)] flex-1">
        <div className="container relative pb-10">
          <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
            <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              Barangay Document Processing System
            </h1>
            <span className="max-w-[750px] text-center text-lg font-light text-foreground">
              A comprehensive and secure platform for managing barangay document
              requests, approvals, and issuance.
            </span>
            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
              <Button variant="default" asChild>
                <Link href="/admin/dashboard">
                  Login
                  <ArrowRightIcon className="ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </section>
          <div className="w-full flex justify-center relative">
            <Image
              src="/placeholder.png"
              width={540}
              height={304}
              alt="demo"
              priority
              className="border rounded-xl shadow-sm"
            />
          </div>
        </div>
      </main>
      <footer className="py-6 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            This is our Software Project for Human Computer Interaction Course
            Subject |{" "}
            <Link
              href="https://www.facebook.com/arielitomanorina"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Group 3
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
