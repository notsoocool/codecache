// components/ProgressBar.js
"use client";
import { useEffect, useState } from "react";

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Throttle function
  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;

    return function (...args) {
      if (!lastRan) {
        func.apply(this, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(
          () => {
            if (Date.now() - lastRan >= limit) {
              func.apply(this, args);
              lastRan = Date.now();
            }
          },
          limit - (Date.now() - lastRan),
        );
      }
    };
  };

  const handleScroll = () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progress = (scrollPosition / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 100); // Adjust the limit as needed (in milliseconds)
    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);

  return (
    <div
      style={{
        width: `${scrollProgress}%`,
        height: "5px",
        backgroundColor: "#808080", // Solid grey color
        position: "fixed",
        top: 0,
        left: 0,
        transition: "width 0.1s ease-in-out",
        zIndex: 1000,
      }}
    />
  );
};

export default ProgressBar;
