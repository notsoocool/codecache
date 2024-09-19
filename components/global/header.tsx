"use client";

import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

import { Loader2 } from "lucide-react";
import { Navigation } from "./navigation";
import { HeaderLogo } from "./header-logo";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";

export const Header = () => {
	const { setTheme } = useTheme();
	return (
		<>
			<header className="bg-gradient-to-b px-4 py-4 lg:px-14">
				<div className="max-w-screen-2xl mx-auto from">
					<div className="w-full flex items-center justify-between">
						<div className=" flex items-center lg:gap-x-16">
							<HeaderLogo />
							<Navigation />
						</div>
						<div className=" flex justify-center">
							<div className="relative w-full max-w-2xl">
								{/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
								<Input
									type="text"
									placeholder="Search snippets..."
									className="pl-6 pr-4 py-2 w-full"
									// value={searchTerm}
									// onChange={(e) =>
									// 	setSearchTerm(e.target.value)
									// }
								/>
							</div>
						</div>
						<div className="flex flex-row-reverse gap-6 items-center">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="icon">
										<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
										<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
										<span className="sr-only">
											Toggle theme
										</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem
										onClick={() => setTheme("light")}
									>
										Light
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => setTheme("dark")}
									>
										Dark
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => setTheme("system")}
									>
										System
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<ClerkLoaded>
								<UserButton />
							</ClerkLoaded>
							<ClerkLoading>
								<Loader2 className="size-8 animate-spin text-slate-400" />
							</ClerkLoading>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};
