"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="py-8 px-10">
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <p className="text-center text-sm leading-loose text-muted-foreground sm:text-left">
            Join us in building CodeCache with{" "}
            <a
              href="https://yajushvyas.in"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              notsoocool
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
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
            >
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            {/* <Link
							href="https://twitter.com/"
							target="_blank"
							rel="noreferrer"
						>
							<Button variant="ghost" size="icon">
								<Twitter className="h-5 w-5" />
								<span className="sr-only">Twitter</span>
							</Button>
						</Link> */}
          </div>
        </div>
      </div>

      <div className="pb-7 px-10">
        <div className="flex justify-between sm:flex-row sm:items-center">
          <div className="space-y-4">
            <p className="font-semibold text-muted-foreground">Quick Links</p>
            <div className="flex space-x-4 justify-center sm:justify-start text-muted-foreground">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/snippets" className="hover:underline">
                Snippets
              </Link>
              <Link href="/addsnippets" className="hover:underline">
                Add Snippets
              </Link>
              <Link href="/contributor" className="hover:underline">
                Contributors
              </Link>
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
      </div>
    </footer>
  );
};
