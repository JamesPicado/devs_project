"use client";
import { useEffect, useState } from "react";

export default function TypingTitle() {
  // Cadena final con sus clases para aplicar colores/estilos (hero typing effect).
  const fullText = [
    { text: "Java and React/Next.js ", className: "text-white" },
    { text: "developer", className: "text-blue-500" },
    { text: " |", className: "text-blue-400" },
  ];

  const [display, setDisplay] = useState("");

  // Efecto de tipeo: recorre toda la cadena y la va mostrando con velocidad variable.
  useEffect(() => {
    const combined = fullText.map((t) => t.text).join("");
    let index = 0;

    const type = () => {
      setDisplay(combined.slice(0, index));
      index++;

      // velocidad variable = transición más suave
      const baseSpeed = 35;
      const slowdown = Math.min(index * 1.4, 200); // suaviza final

      if (index <= combined.length) {
        setTimeout(() => requestAnimationFrame(type), baseSpeed + slowdown);
      }
    };

    requestAnimationFrame(type);
  }, []);

  // Fragmenta el texto que se está mostrando en segmentos con estilos correspondientes.
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
