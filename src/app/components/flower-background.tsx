"use client";

import { useEffect, useRef } from "react";

const flowerImages = Array.from(
  { length: 10 },
  (_, i) => `images/flowers/flower-${i + 1}.png`,
);

export default function FlowerBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createFlower = () => {
      const flower = document.createElement("img");

      // random flower image
      const randomFlower =
        flowerImages[Math.floor(Math.random() * flowerImages.length)];

      flower.src = randomFlower;
      flower.className = "floating-flower";

      const size = Math.random() * 6 + 32;

      flower.style.left = `${Math.random() * 100}%`;
      flower.style.width = `${size}px`;
      flower.style.height = `${size}px`;
      flower.style.position = "absolute";
      flower.style.bottom = "-40px";
      flower.style.pointerEvents = "none";

      // animation speed
      flower.style.animationDuration = `${Math.random() * 4 + 4}s`;

      // slight crayon rotation feeling
      flower.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;

      container.appendChild(flower);

      setTimeout(() => {
        flower.remove();
      }, 7000);
    };

    const interval = setInterval(createFlower, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-[999]"
    />
  );
}
