import Link from "next/link";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Instagram } from "lucide-react";
import { Facebook } from "lucide-react";
export const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="py-8 px-10">
        <div className="flex flex-col justify-between sm:flex-row sm:items-center mb-8">
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
              href="https://www.linkedin.com/in/vyasyajush/"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">Linkedin</span>
              </Button>
            </Link>
            <Link href="https://facebook.com/" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
            </Link>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
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
        {/* Copyright Statement */}

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CodeCache. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
