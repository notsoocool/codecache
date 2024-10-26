"use client";
import { useEffect, useRef } from "react";

const TrailingCursor = () => {
  const cursorRef = useRef(null);
  const dotRefs = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursor = cursorRef.current;
      if (cursor) {
        // Use clientX and clientY for viewport-based positioning
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        // Animate trailing dots with slight delay
        dotRefs.current.forEach((dot, index) => {
          const delay = index * 50; // Adjust delay for trailing effect
          setTimeout(() => {
            if (dot) {
              dot.style.left = `${e.clientX}px`;
              dot.style.top = `${e.clientY}px`;
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
        style={{
          position: "fixed", // Keeps it fixed to the viewport
          width: "20px",
          height: "20px",
          backgroundColor: "white",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "transform 0.1s ease",
          willChange: "transform",
        }}
      />

      {/* Trailing dots */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => (dotRefs.current[index] = el)}
          style={{
            position: "fixed", // Keeps each dot fixed to the viewport
            width: "10px",
            height: "10px",
            backgroundColor: "white",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 9998,
            transition: "transform 0.1s ease",
            willChange: "transform",
          }}
        />
      ))}
    </>
  );
};

export default TrailingCursor;
