import type { Metadata } from "next";
import "./styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactLenis } from "@/utils/lenis";

export const metadata: Metadata = {
	title: "CodeCache - Snippet Manager for Developers", 
	description: "CodeCache is a powerful snippet manager designed to help developers organize, store, and access their code snippets efficiently.", 
	keywords: ["CodeCache", "Snippet Manager", "Code Storage", "Developer Tools", "Code Organization"], 
	openGraph: {
		title: "CodeCache - Snippet Manager for Developers", 
		description: "Organize, store, and access code snippets efficiently with CodeCache.", 
		url: "https://www.codecache.tech", 
		type: "website", 
		images: [
			{
				url: "https://www.codecache.tech/logo.svg", 
				width: 1200,
				height: 630,
				alt: "CodeCache Banner", 
			},
		],
	},
	robots: {
		index: true,
		follow: true, 
	}, 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        {/* <ReactLenis root> */}
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
        {/* </ReactLenis> */}
      </html>
    </ClerkProvider>
  );
}
