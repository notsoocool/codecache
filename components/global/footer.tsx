import Link from "next/link";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import { useState, useEffect } from 'react';
import './BackToTopButton.css'; // Import the CSS 

// Back to Top Button 
const BackToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	return (
		<button
			onClick={scrollToTop}
			className={back-to-top ${isVisible ? 'visible' : ''}} // Includes the 'visible' class if isVisible is true
		>
			Back to Top
		</button>
	);
};

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
						. © CodeCache. All Rights Reserved. Designed by Yajush Vyas.
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
			<BackToTopButton /> {/* Added BackToTopButton component here */}
		</footer>
	);
};