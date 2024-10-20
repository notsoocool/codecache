import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactLenis } from "@/utils/lenis";
import Image from "next/image";
export default function Home() {
  return (
    <ReactLenis root>
      <main className="my-8 mx-5">
        <div className=" h-screen flex items-center -mt-20">
          <div>
            <h1 className=" md:w-4/6 md:text-[4rem] text-5xl md:leading-snug font-mono">
              Boost productivity with{" "}
              <span className="font-bold ">CodeCache!</span>
            </h1>
            <div className="md:w-3/4">
              <p className=" py-4">
                Welcome to <strong>CodeCache</strong>, your go-to platform for
                managing code snippets effectively. CodeCache is designed to
                simplify how developers handle code snippets by offering a
                customizable, searchable, and easy-to-use interface. Whether you
                are building a small project or working on large-scale
                applications, CodeCache helps you stay organized and productive.
              </p>
            </div>
            {/* <div className="mt-4">
							<button className="underline underline-offset-4 decoration-dotted">
								Know more
							</button>
						</div> */}
          </div>
          <div className=" w-3/4 opacity-80">
            <Image
              src="/code2.svg"
              className="dark:invert"
              width={600}
              height={100}
              alt="img"
            />
          </div>
        </div>
        {/* <h1 className=" font-bold text-3xl">Introduction</h1>
        <p className="py-2 text-muted-foreground">
          A powerful tool for developers to store, manage, and organize code
          snippets efficiently. 
        </p> */}

        <h2 className="pt-4 pb-2 font-bold text-lg">What is CodeCache?</h2>

        <p className="pb-4">
          CodeCache is a tool that allows developers to store, categorize, and
          retrieve code snippets seamlessly. Unlike conventional note-taking
          tools, CodeCache provides a structured system for managing reusable
          code across projects.
        </p>

        <div className="flex flex-col items-center gap-5">
          <h2 className="pt-4 pb-2 font-bold text-4xl">Key Features</h2>
          <div className="flex flex-wrap md:flex-nowrap gap-4">
            {[
              {
                title: "Snippet Management",
                description:
                  "Easily create, edit, and organize your code snippets by language, tags, or custom categories.",
              },
              {
                title: "Search Functionality",
                description:
                  "Quickly find the code you need with an advanced search feature.",
              },
              {
                title: "Customization",
                description:
                  "Tailor the code snippets with custom descriptions and tags, making them easy to reference.",
              },
              {
                title: "Multi-language Support",
                description:
                  "Store snippets in multiple programming languages, including JavaScript, Python, Go, and more.",
              },
              {
                title: "Sharing Options",
                description:
                  "Share your favorite snippets with your team or community effortlessly.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="border-2 p-8  gap-3 flex flex-col rounded-lg   w-full sm:w-1/2 lg:w-1/3 transition-transform duration-300 ease-in-out hover:translate-y-2 hover:bg-transparent shadow-inner dark:shadow-white/10 dark:bg-white/5 "
              >
                <p className="font-bold text-lg">{feature.title}</p>
                <p className="text-sm dark:text-slate-300 ">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className=" py-4">
          <em>
            CodeCache aims to make developers more productive by giving them a
            streamlined way to manage their reusable code.
          </em>
        </p>
        <h2 className="pt-4 font-bold text-lg">FAQ</h2>
        <Accordion type="multiple" className=" py-4">
          <AccordionItem value="faq-1">
            <AccordionTrigger>
              What makes CodeCache different from other snippet managers?
            </AccordionTrigger>
            <AccordionContent>
              CodeCache is designed with simplicity and developer productivity
              in mind. While many tools are bloated with features, CodeCache
              focuses on giving you full control over how you store and organize
              your snippets without unnecessary complexity.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-2">
            <AccordionTrigger>Is CodeCache free to use?</AccordionTrigger>
            <AccordionContent>
              Yes, CodeCache is completely free for personal and commercial use.
              You are welcome to use it in any project without any cost or
              attribution required.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-3">
            <AccordionTrigger>Can I export my snippets?</AccordionTrigger>
            <AccordionContent>
              Yes, CodeCache provides an easy export feature, allowing you to
              back up your snippets or share them with others.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-4">
            <AccordionTrigger>
              Which frameworks are supported by CodeCache?
            </AccordionTrigger>
            <AccordionContent>
              CodeCache works with all major frameworks. Whether you use React,
              Next.js, or vanilla JavaScript, you can integrate CodeCache into
              your workflow with ease.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </ReactLenis>
  );
}
