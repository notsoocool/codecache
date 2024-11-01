"use client";
import { useEffect, useRef } from "react";
import styles from "./TrailingCursor.module.css"; // Import the CSS module

const TrailingCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = cursorRef.current;
      if (cursor) {
        // Position the main cursor
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        // Animate trailing dots with a negative effect
        dotRefs.current.forEach((dot, index) => {
          const delay = index * 50; // Adjust delay for trailing effect
          setTimeout(() => {
            if (dot) {
              dot.style.left = `${e.clientX}px`;
              dot.style.top = `${e.clientY}px`;
              dot.style.animation = `${styles.negativeTrail} 0.3s forwards`; // Apply negative trail animation
            }
          }, delay);
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={styles.mainCursor} // Use the CSS module class
      />

      {/* Trailing dots */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => (dotRefs.current[index] = el)}
          className={styles.trailDot} // Use the CSS module class
        />
      ))}
    </>
  );
};

export default TrailingCursor;
