import type { Metadata } from "next";
import "./styles/globals.css";
import { ThemeProvider } from "@/components/global/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

import { ReactLenis } from "@/utils/lenis";

export const metadata: Metadata = {
	title: "CodeCache",
	description: "CodeCache, a snippet manager for developers.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
                <ReactLenis root>
				<body>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</body>
                </ReactLenis>
			</html>
		</ClerkProvider>
	);
}
