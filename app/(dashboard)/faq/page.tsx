"use client";
import React from "react";
import { motion } from "framer-motion";
import FAQ from "@/components/ui/faq";
import Image from "next/image";

const Page = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div className="space-y-6" {...fadeIn}>
            <h1 className="text-3xl md:text-5xl font-light tracking-tight">
              Questions?
              <span className="block mt-2 text-muted-foreground">
                We have answers.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground/80 max-w-md">
              Browse our carefully curated FAQ section for quick solutions to
              common inquiries.
            </p>
          </motion.div>

          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src="/faq.svg"
                className="dark:invert opacity-90"
                fill
                priority
                alt="FAQ illustration"
                style={{ objectFit: "contain" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <FAQ />
      </motion.section>
    </div>
  );
};

export default Page;
