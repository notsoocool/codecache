"use client";
import { useState } from "react";
import {
  ChevronDown,
  Code2,
  Search,
  Share2,
  Palette,
  Zap,
  Mail,
  Users,
  CreditCard,
  Shield,
  HelpCircle,
  Lock,
  DollarSign,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: string;
}

interface NavLink {
  label: string;
  category: string;
  icon: React.ReactNode;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("general");

  const navLinks: NavLink[] = [
    {
      label: "General",
      category: "general",
      icon: <Users className="h-4 w-4" />,
    },
    {
      label: "Pricing",
      category: "pricing",
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      label: "Security",
      category: "security",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      label: "Integration",
      category: "integration",
      icon: <Code2 className="h-4 w-4" />,
    },
  ];

  const allFaqs: FAQItem[] = [
    // General FAQs
    {
      question: "What makes CodeCache different?",
      answer:
        "CodeCache stands out with its lightning-fast search, AI-powered suggestions, and seamless integration across multiple IDEs. Our unique tagging system and smart categorization make finding the right snippet instant.",
      icon: <Zap className="h-5 w-5" />,
      category: "general",
    },
    {
      question: "Which programming languages are supported?",
      answer:
        "CodeCache supports all major programming languages including JavaScript, Python, Ruby, Go, Java, and many more. Each language gets syntax highlighting and language-specific features.",
      icon: <Code2 className="h-5 w-5" />,
      category: "general",
    },
    {
      question: "How do I search for code snippets?",
      answer:
        "Use the advanced search feature to quickly find snippets based on keywords, tags, or categories. You can also filter results by language or project.",
      icon: <Search className="h-5 w-5" />,
      category: "general",
    },
    {
      question: "Can I customize the platform?",
      answer:
        "Yes, CodeCache allows you to personalize your dashboard, adjust themes, and set your preferred coding languages for faster access to relevant snippets.",
      icon: <Palette className="h-5 w-5" />,
      category: "general",
    },
    // Pricing FAQs
    {
      question: "What pricing plans are available?",
      answer:
        "We offer flexible pricing plans including Free, Pro ($9/month), and Team ($29/month). Each plan comes with different features and storage limits to suit your needs.",
      icon: <CreditCard className="h-5 w-5" />,
      category: "pricing",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes! We offer a 14-day free trial of our Pro plan features. No credit card required to start.",
      icon: <DollarSign className="h-5 w-5" />,
      category: "pricing",
    },
    {
      question: "Do you offer discounts for students?",
      answer:
        "Yes! We provide a 50% discount for students and educational institutions. Contact us for details on how to apply.",
      icon: <HelpCircle className="h-5 w-5" />,
      category: "pricing",
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer:
        "Yes, you can change your plan at any time. Upgrading or downgrading is instant, and you will only be billed for the time spent on each plan.",
      icon: <CreditCard className="h-5 w-5" />,
      category: "pricing",
    },
    // Security FAQs
    {
      question: "How secure is my code?",
      answer:
        "We use industry-standard encryption and secure authentication methods. Your code is stored with end-to-end encryption and regular security audits ensure data protection.",
      icon: <Shield className="h-5 w-5" />,
      category: "security",
    },
    {
      question: "What about team access control?",
      answer:
        "CodeCache provides granular access controls. Set permissions at the team, library, or individual snippet level to ensure secure collaboration.",
      icon: <Users className="h-5 w-5" />,
      category: "security",
    },
    {
      question: "Is my data backed up?",
      answer:
        "Yes, we perform regular backups of all user data to ensure that your code is safe in the event of an unexpected issue or server downtime.",
      icon: <Lock className="h-5 w-5" />,
      category: "security",
    },
    {
      question: "Can I recover deleted snippets?",
      answer:
        "Deleted snippets are kept in a trash bin for 30 days. You can recover them within this time, after which they are permanently deleted.",
      icon: <HelpCircle className="h-5 w-5" />,
      category: "security",
    },
    // Integration FAQs
    {
      question: "Which IDEs are supported?",
      answer:
        "CodeCache integrates with VS Code, IntelliJ, Sublime Text, and more through our plugins. Our API allows for custom integrations with other tools.",
      icon: <Code2 className="h-5 w-5" />,
      category: "integration",
    },
    {
      question: "Can I integrate with my existing tools?",
      answer:
        "Yes! Our REST API and webhooks make it easy to integrate CodeCache with your existing development workflow and tools.",
      icon: <Share2 className="h-5 w-5" />,
      category: "integration",
    },
    {
      question: "How do I set up integrations?",
      answer:
        "You can set up integrations through the dashboard by navigating to the 'Integrations' tab. From there, follow the step-by-step guide to connect CodeCache with your preferred tools.",
      icon: <Code2 className="h-5 w-5" />,
      category: "integration",
    },
    {
      question: "Is there an API for advanced users?",
      answer:
        "Yes, CodeCache offers a fully-documented REST API. This allows developers to automate and integrate CodeCache into their custom workflows and tools.",
      icon: <Zap className="h-5 w-5" />,
      category: "integration",
    },
  ];

  const filteredFaqs = allFaqs.filter((faq) => faq.category === activeCategory);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-center text-4xl font-semibold pb-10">
        Frequently Asked Questions{" "}
      </h2>
      {/* Category Navigation */}
      <nav className="flex items-center justify-center gap-4 md:gap-8 mb-12 overflow-x-auto pb-4">
        {navLinks.map((link) => (
          <button
            key={link.category}
            onClick={() => {
              setActiveCategory(link.category);
              setActiveIndex(null);
            }}
            className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm transition-all duration-200 whitespace-nowrap ${
              activeCategory === link.category
                ? "bg-primary/5 text-primary font-medium"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <span>{link.label}</span>
          </button>
        ))}
      </nav>

      {/* FAQ Items */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className="border border-border/5 rounded-lg overflow-hidden"
          >
            <button
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              className="w-full p-4 md:p-6 flex items-center justify-between group hover:bg-primary/[0.02] transition-colors"
            >
              <div className="flex items-center gap-4 text-left">
                <span className="text-primary/40 group-hover:text-primary/60 transition-colors">
                  {faq.icon}
                </span>
                <span className="text-base md:text-lg font-light group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-primary/40 group-hover:text-primary/60 transition-all duration-200 flex-shrink-0 ml-4 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-200 ease-in-out ${
                activeIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 pt-2 text-sm text-muted-foreground/80">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-16 pt-8 border-t border-border/5 text-center">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Still have questions? We're here to help.
          </p>
          <a
            href="mailto:support@codecache.dev"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
          >
            <Mail className="h-4 w-4" />
            <span>Contact Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}
