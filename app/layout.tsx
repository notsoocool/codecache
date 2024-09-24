import type { Metadata } from "next";
import "./styles/globals.css";
import { ThemeProvider } from "@/components/global/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

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
			</html>
		</ClerkProvider>
	);
}
