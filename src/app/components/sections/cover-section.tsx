"use client";

import { useEffect, useState } from "react";

export default function CoverSection() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const textColorClass = bgIndex === 1 ? "text-white" : "text-black";

  return (
    <section className="relative h-screen overflow-hidden">
      <p
        className={`absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-[30px] font-medium tracking-[0.08em] whitespace-nowrap drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] font-[BrittanySignature] ${textColorClass}`}
        key={bgIndex}
      >
        {"We're getting married".split("").map((char, i) => (
          <span
            key={i}
            className="inline-block opacity-0 -translate-x-3 animate-revealChar will-change-transform"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>

      <p
        className={`absolute top-[27%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-[40px] tracking-[0.08em] whitespace-nowrap font-[BODAR] opacity-0 animate-fadeIn ${textColorClass}`}
        style={{ animationDelay: "1s" }}
      >
        EUNSANG & FERN
      </p>

      <p
        className={`absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-[20px] tracking-[0.08em] whitespace-nowrap font-[BODAR] opacity-0 animate-fadeIn ${textColorClass}`}
        style={{ animationDelay: "1.2s" }}
      >
        2026.09.13 2PM
      </p>

      {/* Background Images */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] will-change-opacity ${
          bgIndex === 0 ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: 'url("/images/bg_updated_1.JPG")' }}
      />

      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ${
          bgIndex === 1 ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: 'url("/images/bg_updated_2.JPG")' }}
      />
    </section>
  );
}
