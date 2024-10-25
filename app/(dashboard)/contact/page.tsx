"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Mail, User, MessageSquare, Loader2 } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Handle form submission logic here
    console.log("Form submitted:", { name, email, message });
    setIsLoading(false);
    // Reset form fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8">
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-between h-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono mb-4">
              Get in Touch with <span className="font-bold">CodeCache!</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions or suggestions? We&apos;d love to hear from you.
              Reach out to us using the form below.
            </p>
          </div>
          <div className="w-full max-w-md mx-auto">
            <Image
              src="/contact.svg"
              className="dark:invert"
              width={400}
              height={300}
              alt="Contact illustration"
              layout="responsive"
            />
          </div>
        </motion.div>
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="pl-10 bg-transparent border-2 rounded-lg transition-all duration-300 focus:border-primary"
                disabled={isLoading}
              />
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
            </div>
            <div className="relative">
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 bg-transparent border-2 rounded-lg transition-all duration-300 focus:border-primary"
                disabled={isLoading}
              />
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
            </div>
            <div className="relative">
              <Textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="pl-10 bg-transparent border-2 rounded-lg h-32 transition-all duration-300 focus:border-primary"
                disabled={isLoading}
              />
              <MessageSquare
                className="absolute left-3 top-4 text-muted-foreground"
                size={18}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 ease-in-out hover:translate-y-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
