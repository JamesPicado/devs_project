"use client";
import { useEffect, useState } from "react";

export default function TypingTitle() {
  // Final string with its classes to apply colors/styles (hero typing effect).
  const fullText = [
    { text: "Java and React/Next.js ", className: "text-white" },
    { text: "developer", className: "text-blue-500" },
    { text: " |", className: "text-blue-400" },
  ];

  const [display, setDisplay] = useState("");

  // Typing effect: iterates through the entire string and shows it with variable speed.
  useEffect(() => {
    const combined = fullText.map((t) => t.text).join("");
    let index = 0;

    const type = () => {
      setDisplay(combined.slice(0, index));
      index++;

      // variable speed = smoother transition
      const baseSpeed = 35;
      const slowdown = Math.min(index * 1.4, 200); // smooths end

      if (index <= combined.length) {
        setTimeout(() => requestAnimationFrame(type), baseSpeed + slowdown);
      }
    };

    requestAnimationFrame(type);
  }, []);

  // Fragments the text being displayed into segments with corresponding styles.
  const renderStyledText = () => {
    let remaining = display;
    const parts = [];

    for (const segment of fullText) {
      const slice = remaining.slice(0, segment.text.length);

      if (slice.length > 0) {
        parts.push(
          <span key={segment.text} className={segment.className}>
            {slice}
          </span>
        );
        remaining = remaining.slice(segment.text.length);
      }
    }

    return parts;
  };

  return (
    <h1 className="text-3xl md:text-5xl font-bold tracking-tight flex gap-1">
      {renderStyledText()}
    </h1>
  );
}
