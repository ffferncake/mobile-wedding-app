"use client";

import { useEffect, useRef } from "react";

export default function HeartsBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pastelColors = [
      "#FFD1DC",
      "#B7F64A",
      "#F9EE9B",
      "#D1C4E9",
      "#78E1EF",
      "#9291B6",
    ];

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.className = "heart-shape";

      const color =
        pastelColors[Math.floor(Math.random() * pastelColors.length)];

      const size = Math.random() * 12 + 6;

      heart.style.background = color;
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.width = `${size}px`;
      heart.style.height = `${size}px`;
      heart.style.animationDuration = `${Math.random() * 3 + 3}s`;

      container.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 6000);
    };

    const interval = setInterval(createHeart, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-[999]"
    />
  );
}
