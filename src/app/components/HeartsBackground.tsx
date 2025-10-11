"use client";
import { useEffect, useRef } from "react";
import styles from "./HeartsBackground.module.css";

export default function HeartsBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.className = styles.heart;

      // Randomize color, size, and position
      const pastelColors = [
        "#FFD1DC", // pink
        "#9cdf9cff", // mint
        "#ece9d2ff", // lemon
        "#D1C4E9", // lavender
        "#78e1efff", // aqua
        "#9291b6ff", // peach
      ];
      const color =
        pastelColors[Math.floor(Math.random() * pastelColors.length)];
      heart.style.background = color;
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.width = `${Math.random() * 20 + 10}px`;
      heart.style.height = heart.style.width;
      heart.style.animationDuration = `${Math.random() * 3 + 3}s`;

      container.appendChild(heart);

      // Remove when done animating
      setTimeout(() => {
        heart.remove();
      }, 6000);
    };

    const interval = setInterval(createHeart, 300);
    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className={styles.heartContainer}></div>;
}
