import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactLenis } from "@/utils/lenis";

export default function Home() {
	return (
		<ReactLenis root>
			<main className="my-8 mx-5">
				<h1 className=" font-bold text-3xl">Introduction</h1>
				<p className="py-2 text-muted-foreground">
					A powerful tool for developers to store, manage, and
					organize code snippets efficiently. Boost productivity with
					CodeCache!
				</p>

				<p className=" py-4">
					Welcome to <strong>CodeCache</strong>, your go-to platform
					for managing code snippets effectively. CodeCache is
					designed to simplify how developers handle code snippets by
					offering a customizable, searchable, and easy-to-use
					interface. Whether you are building a small project or
					working on large-scale applications, CodeCache helps you
					stay organized and productive.
				</p>

				<h2 className="pt-4 pb-2 font-bold text-lg">
					What is CodeCache?
				</h2>

				<p className="pb-4">
					CodeCache is a tool that allows developers to store,
					categorize, and retrieve code snippets seamlessly. Unlike
					conventional note-taking tools, CodeCache provides a
					structured system for managing reusable code across
					projects.
				</p>

				<h2 className=" pt-4 pb-2 font-bold text-lg">Key Features:</h2>
				<ul className=" pl-2 pb-4 grid gap-2 ">
					<li>
						<strong>Snippet Management</strong>: Easily create,
						edit, and organize your code snippets by language, tags,
						or custom categories.
					</li>
					<li>
						<strong>Search Functionality</strong>: Quickly find the
						code you need with an advanced search feature.
					</li>
					<li>
						<strong>Customization</strong>: Tailor the code snippets
						with custom descriptions and tags, making them easy to
						reference.
					</li>
					<li>
						<strong>Multi-language Support</strong>: Store snippets
						in multiple programming languages, including JavaScript,
						Python, Go, and more.
					</li>
					<li>
						<strong>Sharing Options</strong>: Share your favorite
						snippets with your team or community effortlessly.
					</li>
				</ul>

				<p className=" py-4">
					<em>
						CodeCache aims to make developers more productive by
						giving them a streamlined way to manage their reusable
						code.
					</em>
				</p>
				<h2 className="pt-4 font-bold text-lg">FAQ</h2>
				<Accordion type="multiple" className=" py-4">
					<AccordionItem value="faq-1">
						<AccordionTrigger>
							What makes CodeCache different from other snippet
							managers?
						</AccordionTrigger>
						<AccordionContent>
							CodeCache is designed with simplicity and developer
							productivity in mind. While many tools are bloated
							with features, CodeCache focuses on giving you full
							control over how you store and organize your
							snippets without unnecessary complexity.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="faq-2">
						<AccordionTrigger>
							Is CodeCache free to use?
						</AccordionTrigger>
						<AccordionContent>
							Yes, CodeCache is completely free for personal and
							commercial use. You are welcome to use it in any
							project without any cost or attribution required.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="faq-3">
						<AccordionTrigger>
							Can I export my snippets?
						</AccordionTrigger>
						<AccordionContent>
							Yes, CodeCache provides an easy export feature,
							allowing you to back up your snippets or share them
							with others.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="faq-4">
						<AccordionTrigger>
							Which frameworks are supported by CodeCache?
						</AccordionTrigger>
						<AccordionContent>
							CodeCache works with all major frameworks. Whether
							you use React, Next.js, or vanilla JavaScript, you
							can integrate CodeCache into your workflow with
							ease.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</main>
		</ReactLenis>
	);
}
