//initial
// import {
// 	Accordion,
// 	AccordionContent,
// 	AccordionItem,
// 	AccordionTrigger,
// } from "@/components/ui/accordion";
// import { ReactLenis } from "@/utils/lenis";

// export default function Home() {
// 	return (

		
// 		<ReactLenis root>
// 			<main className="my-8 mx-5">
// 				  {/* Hero Section */}
// 				  <section className="relative h-96 flex items-center justify-center bg-cover bg-center"
//             style={{ backgroundImage: "url('\codecache\app\(dashboard)\Images\codecache.jpg')" }}>
//             <div className="text-center text-white">
//                 <h1 className="text-5xl font-bold">Welcome to CodeCache</h1>
// 						<p className="mt-4 text-lg">Efficiently manage, store, and organize code snippets! Boost productivity with
// 						CodeCache!</p>
						
//                 <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">Get Started</button>
//             </div>
//         </section>

				
//         {/* Introduction Section */}
//         <section className="mt-10">
//             <h1 className="font-bold text-3xl">Introduction</h1>
//             {/* <p className="py-2 text-muted-foreground">
//                 A powerful tool for developers to store, manage, and organize code snippets efficiently...
//             </p> */}
// 				</section>

// 				{/* here */}
// 				{/* <h1 className=" font-bold text-3xl">Introduction</h1> */}
// 				<p className="py-2 text-muted-foreground">
// 					A powerful tool for developers to store, manage, and
// 					organize code snippets efficiently. Boost productivity with
// 					CodeCache!
// 				</p>

// 				<p className=" py-4">
// 					Welcome to <strong>CodeCache</strong>, your go-to platform
// 					for managing code snippets effectively. CodeCache is
// 					designed to simplify how developers handle code snippets by
// 					offering a customizable, searchable, and easy-to-use
// 					interface. Whether you are building a small project or
// 					working on large-scale applications, CodeCache helps you
// 					stay organized and productive.
// 				</p>

// 				<h2 className="pt-4 pb-2 font-bold text-lg">
// 					What is CodeCache?
// 				</h2>

// 				<p className="pb-4">
// 					CodeCache is a tool that allows developers to store,
// 					categorize, and retrieve code snippets seamlessly. Unlike
// 					conventional note-taking tools, CodeCache provides a
// 					structured system for managing reusable code across
// 					projects.
// 				</p>

// 				<h2 className=" pt-4 pb-2 font-bold text-lg">Key Features:</h2>
// 				<ul className=" pl-2 pb-4 grid gap-2 ">
// 					<li>
// 						<strong>Snippet Management</strong>: Easily create,
// 						edit, and organize your code snippets by language, tags,
// 						or custom categories.
// 					</li>
// 					<li>
// 						<strong>Search Functionality</strong>: Quickly find the
// 						code you need with an advanced search feature.
// 					</li>
// 					<li>
// 						<strong>Customization</strong>: Tailor the code snippets
// 						with custom descriptions and tags, making them easy to
// 						reference.
// 					</li>
// 					<li>
// 						<strong>Multi-language Support</strong>: Store snippets
// 						in multiple programming languages, including JavaScript,
// 						Python, Go, and more.
// 					</li>
// 					<li>
// 						<strong>Sharing Options</strong>: Share your favorite
// 						snippets with your team or community effortlessly.
// 					</li>
// 				</ul>

// 				<p className=" py-4">
// 					<em>
// 						CodeCache aims to make developers more productive by
// 						giving them a streamlined way to manage their reusable
// 						code.
// 					</em>
// 				</p>
// 				<h2 className="pt-4 font-bold text-lg">FAQ</h2>
// 				<Accordion type="multiple" className=" py-4">
// 					<AccordionItem value="faq-1">
// 						<AccordionTrigger>
// 							What makes CodeCache different from other snippet
// 							managers?
// 						</AccordionTrigger>
// 						<AccordionContent>
// 							CodeCache is designed with simplicity and developer
// 							productivity in mind. While many tools are bloated
// 							with features, CodeCache focuses on giving you full
// 							control over how you store and organize your
// 							snippets without unnecessary complexity.
// 						</AccordionContent>
// 					</AccordionItem>

// 					<AccordionItem value="faq-2">
// 						<AccordionTrigger>
// 							Is CodeCache free to use?
// 						</AccordionTrigger>
// 						<AccordionContent>
// 							Yes, CodeCache is completely free for personal and
// 							commercial use. You are welcome to use it in any
// 							project without any cost or attribution required.
// 						</AccordionContent>
// 					</AccordionItem>

// 					<AccordionItem value="faq-3">
// 						<AccordionTrigger>
// 							Can I export my snippets?
// 						</AccordionTrigger>
// 						<AccordionContent>
// 							Yes, CodeCache provides an easy export feature,
// 							allowing you to back up your snippets or share them
// 							with others.
// 						</AccordionContent>
// 					</AccordionItem>

// 					<AccordionItem value="faq-4">
// 						<AccordionTrigger>
// 							Which frameworks are supported by CodeCache?
// 						</AccordionTrigger>
// 						<AccordionContent>
// 							CodeCache works with all major frameworks. Whether
// 							you use React, Next.js, or vanilla JavaScript, you
// 							can integrate CodeCache into your workflow with
// 							ease.
// 						</AccordionContent>
// 					</AccordionItem>
// 				</Accordion>
// 			</main>
// 		</ReactLenis>
// 	);
// }

"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactLenis } from "@/utils/lenis";
import { motion } from "framer-motion"; // for animations
import { useEffect } from "react";
import AOS from "aos"; // for scroll animations
import "aos/dist/aos.css"; // AOS styles
import styles from './Home.module.css'; // Importing custom styles

export default function Home() {
  // Initialize AOS on mount
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Variants for bouncing circles animation
  const bouncingAnimation = {
    bounce: {
      y: [0, -40, 0], // Up and down
      transition: {
        y: {
          repeat: Infinity, // Repeat forever
          repeatType: "reverse",
          duration: 3.0, // Duration of one bounce cycle
        },
      },
    },
  };

  return (
    <ReactLenis root>
      <main className="my-8 mx-5">
        {/* Hero Section */}
        <section
          className={`${styles.heroSection} relative h-screen flex items-center justify-center bg-cover bg-center overflow-hidden`}
          style={{ backgroundImage: "url('..app\\(dashboard)\\Images\\codecache.jpg')" }}
        >
          {/* Bouncing Colorful Circles */}
          <motion.div
            className="absolute top-10 left-10 w-16 h-16 rounded-full bg-blue-300"
            variants={bouncingAnimation}
            animate="bounce"
            style={{ opacity: 0.8 }}
          />
          <motion.div
            className="absolute top-20 right-20 w-24 h-24 rounded-full bg-blue-300"
            variants={bouncingAnimation}
            animate="bounce"
            style={{ opacity: 0.8 }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-20 h-20 rounded-full bg-blue-400"
            variants={bouncingAnimation}
            animate="bounce"
            style={{ opacity: 0.8 }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-12 h-12 rounded-full bg-blue-400"
            variants={bouncingAnimation}
            animate="bounce"
            style={{ opacity: 0.8 }}
          />
          <motion.div
            className="absolute top-32 left-1/2 w-16 h-16 rounded-full bg-blue-200"
            variants={bouncingAnimation}
            animate="bounce"
            style={{ opacity: 0.8 }}
          />

          {/* Welcome Text */}
          <div className="relative z-10 text-center text-white" data-aos="fade-up">
            <motion.h1
              className="text-6xl font-bold text-shadow-lg"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Welcome to CodeCache
            </motion.h1>
            <p className="mt-4 text-lg" data-aos="fade-up" data-aos-delay="200">
              Efficiently manage, store, and organize code snippets! Boost productivity with CodeCache!
            </p>
            <motion.button
              className="mt-6 px-8 py-3 bg-sky-300 text-gray-800 rounded-lg hover:bg-sky-400 transition-transform transform hover:scale-110 shadow-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Get Started
            </motion.button>
            <div className="mt-4">
              <span className="text-sm text-gray-200">your code snippets in one place</span>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="mt-10 bg-sky-200 text-gray-800 py-8 rounded-lg" data-aos="fade-up">
          <h1 className="font-bold text-3xl text-center">Introduction</h1>
          <motion.p
            className="py-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            A powerful tool for developers to store, manage, and organize code snippets efficiently...
          </motion.p>
        </section>

        {/* What is CodeCache? Section */}
        <section className="py-8 mt-6 bg-sky-300 text-gray-800 rounded-lg text-center" data-aos="fade-right">
          <p>
            Welcome to <strong>CodeCache</strong>, your go-to platform for managing code snippets effectively.
          </p>
          <motion.h2
            className="pt-4 pb-2 font-bold text-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            What is CodeCache?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
             CodeCache is a tool that allows developers to store, categorize, and retrieve code snippets seamlessly.
          </motion.p>
        </section>

        {/* Key Features Section */}
        <section className="py-8 mt-6 bg-sky-400 text-gray-800 rounded-lg text-center" data-aos="fade-left">
          <h2 className="font-bold text-lg mb-4">Key Features:</h2>
          <ul className="pl-2 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Snippet Management: Easily create, edit, and organize your code snippets.",
              "Search Functionality: Quickly find code with an advanced search feature.",
              "Customization: Tailor snippets with custom tags and descriptions.",
              "Multi-language Support: Store snippets in various programming languages.",
              "Sharing Options: Share snippets with your team or community.",
            ].map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 1 }}
              >
                <strong className="text-sky-600">{feature.split(":")[0]}</strong>: {feature.split(":")[1]}
              </motion.li>
            ))}
          </ul>
        </section>

			  
        {/* FAQ Section */}
        <h2 className="pt-4 font-bold text-lg text-center" data-aos="fade-up">FAQ</h2>
        <Accordion type="multiple" className="py-4">
          {[
            { question: "What makes CodeCache different?", answer: "CodeCache is designed with simplicity and developer productivity in mind." },
            { question: "Is CodeCache free to use?", answer: "Yes, CodeCache is completely free for personal and commercial use." },
            { question: "Can I export my snippets?", answer: "Yes, CodeCache provides an easy export feature." },
            { question: "Which frameworks are supported?", answer: "CodeCache works with all major frameworks, like React and Next.js." },
          ].map((item, index) => (
            <AccordionItem key={index} value={`faq-${index + 1}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </ReactLenis> 
  );
}
