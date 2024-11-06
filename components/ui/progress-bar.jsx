"use client";
import { useState, useEffect } from "react";

export default function ScrollProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    setScrollPercentage(scrollPercent);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleDarkModeChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleDarkModeChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-2 z-50 bg-white">
      <div
        className="h-full rounded-full transition-all duration-150"
        style={{
          width: `${scrollPercentage}%`,
          background: isDarkMode ? "#030712" : "white",
          height: "8px",
        }}
      />
    </div>
  );
}
