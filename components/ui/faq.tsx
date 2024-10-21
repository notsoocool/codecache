'use client'
import { useState } from 'react';
import { ChevronDown, Code2, Search, Share2, Palette, Zap } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What makes CodeCache different?",
      answer: "CodeCache stands out with its lightning-fast search, AI-powered suggestions, and seamless integration across multiple IDEs. Our unique tagging system and smart categorization make finding the right snippet instant.",
      icon: <Zap className="h-6 w-6" />
    },
    {
      question: "Which programming languages are supported?",
      answer: "CodeCache supports all major programming languages including JavaScript, Python, Ruby, Go, Java, and many more. Each language gets syntax highlighting and language-specific features.",
      icon: <Code2 className="h-6 w-6" />
    },
    {
      question: "How does the search functionality work?",
      answer: "Our advanced search engine uses semantic understanding to find snippets based on functionality, not just exact matches. Search across tags, descriptions, and even code content instantly.",
      icon: <Search className="h-6 w-6" />
    },
    {
      question: "Can I share snippets with my team?",
      answer: "Absolutely! CodeCache offers seamless sharing options. Create private team libraries, share individual snippets, or make your collection public for the community.",
      icon: <Share2 className="h-6 w-6" />
    },
    {
      question: "How customizable is the interface?",
      answer: "Highly customizable! Choose between different themes, customize your snippet layout, and organize with custom categories and tags. Make CodeCache work exactly how you want it.",
      icon: <Palette className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-medium mb-20 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-border/10 last:border-0"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full py-8 flex items-center justify-between hover:text-primary transition-colors"
              >
                <div className="flex items-center gap-6">
                  <span className="text-primary/60">{faq.icon}</span>
                  <span className="text-xl font-medium">{faq.question}</span>
                </div>
                <ChevronDown 
                  className={`h-6 w-6 transition-transform duration-200 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  activeIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="pb-8 text-md text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}