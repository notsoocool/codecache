"use client";

import { useMedia } from "react-use";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { NavButton } from "./nav-button";

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
	{
		href: "/docs",
		label: "Documentation",
	},
];

export const Navigation = () => {
	const [isOpened, setIsOpened] = useState(false);

	const router = useRouter();
	const pathname = usePathname();
	const isMobile = useMedia("(max-width: 1024px)", false);

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
								variant={
									route.href === pathname
										? "secondary"
										: "ghost"
								}
								onClick={() => onClick(route.href)}
								className="w-full justify-start"
							>
								{route.label}
							</Button>
						))}
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
		</nav>
	);
};
