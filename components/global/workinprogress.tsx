"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Github, Twitter, Linkedin, Loader } from "lucide-react";

export default function WorkInProgress() {
	const [progress, setProgress] = useState(0);
	const [timeLeft, setTimeLeft] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => (prev < 100 ? prev + 3 : 0));
		}, 150);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const targetDate = new Date("2024-10-01T00:00:00");

		const updateCountdown = () => {
			const now = new Date();
			const difference = targetDate.getTime() - now.getTime();

			const days = Math.floor(difference / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor(
				(difference % (1000 * 60 * 60)) / (1000 * 60)
			);
			const seconds = Math.floor((difference % (1000 * 60)) / 1000);

			setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
		};

		const countdownInterval = setInterval(updateCountdown, 1000);
		updateCountdown();

		return () => clearInterval(countdownInterval);
	}, []);

	return (
		<div className=" flex flex-col items-center justify-center p-4">
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ type: "spring", stiffness: 260, damping: 20 }}
				className="bg-muted-foreground/10 rounded-lg shadow-xl p-8 max-w-md w-full space-y-6"
			>
				<div className="text-center">
					<motion.h1
						className="text-4xl font-bold text-primary/85 mb-2"
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						Work in Progress
					</motion.h1>
					<motion.p
						className="text-muted-foreground/60"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
					>
						We're building something awesome!
					</motion.p>
				</div>

				<motion.div
					className="relative h-40"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
				>
					<motion.div
						className="absolute inset-0"
						style={{
							backgroundImage:
								"url('/placeholder.svg?height=160&width=384')",
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					>
						<motion.div
							className="absolute flex justify-center items-center w-full h-full"
							animate={{ y: [0, -10, 0] }}
							transition={{
								repeat: Infinity,
								duration: 1.5,
								ease: "easeInOut",
							}}
						>
							<Loader className="w-16 h-16 text-purple-600 animate-spin" />
						</motion.div>
					</motion.div>
				</motion.div>

				<div className="space-y-2">
					<div className="flex justify-between text-sm font-medium text-gray-600">
						<span>Progress</span>
						<span>{progress}%</span>
					</div>
					<Progress value={progress} className="w-full" />
				</div>

				<div className="text-center">
					<p className="text-sm text-gray-600 mb-1">
						Estimated time until completion
					</p>
					<p className="text-2xl font-bold text-purple-600">
						{timeLeft}
					</p>
				</div>

				<form className="space-y-2">
					<Input
						type="email"
						placeholder="Enter your email for updates"
					/>
					<Button className="w-full">
						<Mail className="mr-2 h-4 w-4" /> Subscribe
					</Button>
				</form>

				<div className="flex justify-center space-x-4">
					<a href="#" className="text-gray-400 hover:text-gray-600">
						<Github className="h-6 w-6" />
					</a>
					<a href="#" className="text-gray-400 hover:text-gray-600">
						<Twitter className="h-6 w-6" />
					</a>
					<a href="#" className="text-gray-400 hover:text-gray-600">
						<Linkedin className="h-6 w-6" />
					</a>
				</div>
			</motion.div>
		</div>
	);
}
