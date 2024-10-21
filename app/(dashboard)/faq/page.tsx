'use client'
import React from 'react';
import { motion } from 'framer-motion';
import FAQ from '@/components/ui/faq';
import FAQImage from '@/app/images/FAQ Image.png' 
import Image from 'next/image';

const Page = () => {

  return (
    <div className="min-h-screen">
      <section className="bg-background">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <motion.div 
            className="mr-auto place-self-center lg:col-span-7"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-5xl">
              Have questions buzzing in your mind?
            </h1>
            <p className="max-w-2xl mb-6 font-light text-muted-foreground lg:mb-8 md:text-lg lg:text-xl">
              Well, Here we are to solve all your problems.
            </p>
          </motion.div>
          <motion.div 
            className="hidden lg:mt-0 lg:col-span-5 lg:flex"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={FAQImage}
              alt="FAQ illustration"
              className="rounded-lg"
            />
          </motion.div>
        </div>
      </section>
      
      <FAQ />
    </div>
  );
}

export default Page;