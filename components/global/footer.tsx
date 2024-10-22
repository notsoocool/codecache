"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="py-10 px-8 sm:px-16 lg:px-32 xl:px-40">
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <p className="text-center text-sm leading-loose text-muted-foreground sm:text-left">
            Join us in building CodeCache with{" "}
            <a
              href="https://yajushvyas.in"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary underline underline-offset-4 transition duration-300"
            >
              notsoocool
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/notsoocool"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary underline underline-offset-4 transition duration-300"
            >
              GitHub
            </a>
            .
          </p>

          <div className="flex items-center justify-center space-x-4 sm:ml-auto sm:justify-end">
            <Link
              href="https://github.com/notsoocool"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground"
            >
              <Button variant="ghost" size="icon">
                Github
              </Button>
            </Link>
            <Link
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground"
            >
              <Button variant="ghost" size="icon">
                Twitter
              </Button>
            </Link>
            <Link
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground"
            >
              <Button variant="ghost" size="icon">
                LinkedIn
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between text-center text-sm text-muted-foreground">
          <div className="space-y-4">
            <p className="font-semibold">Quick Links</p>
            <div className="flex space-x-4 justify-center sm:justify-start">
              <Link
                href="/"
                className="hover:underline hover:text-primary transition duration-300"
              >
                Home
              </Link>
              <Link
                href="/snippets"
                className="hover:underline hover:text-primary transition duration-300"
              >
                Snippets
              </Link>
              <Link
                href="/contributor"
                className="hover:underline hover:text-primary transition duration-300"
              >
                Contributors
              </Link>
              <Link
                href="/addsnippets"
                className="hover:underline hover:text-primary transition duration-300"
              >
                Add Snippet
              </Link>
            </div>
          </div>

          <div className="space-y-4 mt-6 sm:mt-0">
            <p className="font-semibold">Legal</p>
            <div className="flex space-x-4 justify-center sm:justify-end">
              <Link
                href="/privacy"
                className="hover:underline hover:text-primary transition duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:underline hover:text-primary transition duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-between items-center">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © {new Date().getFullYear()} CodeCache. All Rights Reserved.
          </p>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-white transition duration-300"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="sr-only">Back to Top</span>↑
          </Button>
        </div>
      </div>
    </footer>
  );
};
