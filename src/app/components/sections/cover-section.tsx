"use client";

import { useEffect, useState } from "react";

export default function CoverSection() {
  const [bgIndex, setBgIndex] = useState(0);
  const fullText = "We're getting married";
  const [typedText, setTypedText] = useState("");

  // Background switch
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Typing animation
  useEffect(() => {
    setTypedText(""); // reset when bg changes
    let index = 0;

    const typing = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;

      if (index === fullText.length) clearInterval(typing);
    }, 70); // typing speed

    return () => clearInterval(typing);
  }, [bgIndex]);

  const textColorClass = bgIndex === 1 ? "text-white" : "text-black";

  return (
    <section className="relative h-screen overflow-hidden">

      {/* Typing title */}
      <p
        className={`absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2
        z-10
        text-[22px] sm:text-[30px]
        font-medium
        tracking-[0.05em]
        whitespace-nowrap
        text-center
        drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]
        font-[BrittanySignature]
        ${textColorClass}`}
      >
        {typedText}
        <span className="animate-blink">|</span>
      </p>

      {/* Couple name */}
      <p
        className={`absolute top-[27%] left-1/2 -translate-x-1/2 -translate-y-1/2
        z-10
        text-[40px] sm:text-[45px]
        font-[BODAR]
        tracking-[0.06em]
        whitespace-nowrap
        text-center
        opacity-0
        animate-fadeIn
        drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]
        ${textColorClass}`}
        style={{ animationDelay: "1.5s" }}
      >
        EUNSANG & FERN
      </p>

      {/* Date */}
      <p
        className={`absolute top-[33%] left-1/2 -translate-x-1/2 -translate-y-1/2
        z-10
        text-[18px] sm:text-[20px]
        font-[BODAR]
        tracking-[0.08em]
        whitespace-nowrap
        text-center
        opacity-0
        animate-fadeIn
        drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)]
        ${textColorClass}`}
        style={{ animationDelay: "1.7s" }}
      >
        2026.09.13&nbsp;&nbsp;2PM
      </p>

      {/* Background Images */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ${
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
