"use client";

import { useMedia } from "react-use";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { NavButton } from "./nav-button";
import { auth } from "@clerk/nextjs/server";

const routes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/snippets",
    label: "Snippets",
  },
  {
    href: "/addsnippets",
    label: "Add Snippet",
  },
//   {
//     href: "/docs",
//     label: "Documentation",
//   },
];

export const Navigation = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State for admin status
  const [isUser, setIsUser] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const response = await fetch("/api/getCurrentUser");

      const data = await response.json(); // Convert the response to JSON
      const userId = data.id; // Access the `id` from the response JSON

	 if(userId) {
		setIsUser(true);
	 } 

      const adminIds = process.env.ADMIN_USER_IDS?.split(",") || [];

      if (userId && adminIds.includes(userId)) {
        setIsAdmin(true); // Set to true if user is admin
      }
    };

    checkAdminStatus();
  }, []);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpened(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpened} onOpenChange={setIsOpened}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="font-normal bg-foreground/10 hover:bg-foreground/20 hover:text-foreground border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-foreground focus:bg-foreground/30 transition"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.href === pathname ? "secondary" : "ghost"}
                onClick={() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.label}
              </Button>
            ))}

            {isUser && (
              <Button
                variant={pathname === "/bookmarks" ? "secondary" : "ghost"}
                onClick={() => onClick("/bookmarks")}
                className="w-full justify-start"
              >
                Bookmarks
              </Button>
            )}

            {isAdmin && (
              <Button
                variant={pathname === "/root" ? "secondary" : "ghost"}
                onClick={() => onClick("/root")}
                className="w-full justify-start"
              >
                Admin
              </Button>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <nav className=" hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
	  {isUser && (
        <NavButton
          href="/bookmarks"
          label="Bookmarks"
          isActive={pathname === "/bookmarks"}
        />
      )}
      {isAdmin && (
        <NavButton href="/root" label="Admin" isActive={pathname === "/root"} />
      )}
    </nav>
  );
};
