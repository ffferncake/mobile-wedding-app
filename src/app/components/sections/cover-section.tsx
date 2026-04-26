"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function CoverSection() {
  const images = ["/images/bg_updated_1.webp", "/images/bg_updated_2.webp"];

  const [current, setCurrent] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const nextIndex = (current + 1) % images.length;

  const fullText = "We're getting married";
  const [typedText, setTypedText] = useState("");

  // 🔥 preload next image
  useEffect(() => {
    const nextIndex = (current + 1) % images.length;
    const img = new window.Image();
    img.src = images[nextIndex];
  }, [current]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let index = 0;
    let typing: NodeJS.Timeout;

    setTypedText(""); // reset immediately

    typing = setInterval(() => {
      index++;
      setTypedText(fullText.slice(0, index));

      if (index >= fullText.length) {
        clearInterval(typing);
      }
    }, 60);

    return () => clearInterval(typing);
  }, [current]);
  return (
    <section className="relative h-screen overflow-hidden">
      {/* 🟢 current image */}
      {images.map((img, index) => (
        <Image
          key={img}
          src={img}
          alt="bg"
          fill
          priority={index === 0}
          className={`
      object-cover
      absolute inset-0
      transition-opacity duration-[1500ms] ease-in-out
      ${index === current ? "opacity-100 z-0" : "opacity-0 z-0"}
    `}
        />
      ))}

      {/* 🔵 next image */}
      {/* <Image
        src={images[nextIndex]}
        alt="Next"
        fill
        className={`object-cover transition-opacity duration-[1200ms] ease-in-out ${
          isFading ? "opacity-100" : "opacity-0"
        }`}
      /> */}

      {/* ✨ overlay (slightly brighter so black text works) */}
      <div className="absolute inset-0 bg-white/20 z-10" />

      {/* 📝 typing text */}
      <p
        className="absolute top-[19%] left-1/2 -translate-x-1/2 -translate-y-1/2
        z-20
        text-[22px] sm:text-[30px]
        font-medium
        tracking-[0.05em]
        text-black
        text-center
        font-[BrittanySignature]
        min-w-[90vw]"
      >
        {typedText}
        <span className="ml-1 animate-blink"></span>
      </p>

      {/* 💍 couple name */}
      <p
        className="absolute top-[27%] left-1/2 -translate-x-1/2 -translate-y-1/2
        z-20
        text-[40px] sm:text-[45px]
        font-[BODAR]
        tracking-[0.06em]
        text-black
        text-center
        opacity-0
        whitespace-nowrap
        animate-fadeIn"
        style={{ animationDelay: "1.5s" }}
      >
        EUNSANG & FERN
      </p>

      {/* 📅 date */}
      <p
        className="absolute top-[33%] left-1/2 -translate-x-1/2 -translate-y-1/2
        z-20
        text-[18px] sm:text-[20px]
        font-[BODAR]
        tracking-[0.08em]
        text-black
        text-center
        opacity-0
        animate-fadeIn"
        style={{ animationDelay: "1.7s" }}
      >
        2026.09.13&nbsp;&nbsp;2PM
      </p>
    </section>
  );
}
