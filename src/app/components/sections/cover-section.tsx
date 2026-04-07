"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function CoverSection() {
  const images = ["/images/bg_updated_1.webp", "/images/bg_updated_2.webp"];

  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);

  const fullText = "We're getting married";
  const [typedText, setTypedText] = useState("");

  // 🔥 preload next image
  useEffect(() => {
    const img = new window.Image();
    img.src = images[next];
  }, [next]);

  // 🔥 background switching
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const newIndex = (prev + 1) % images.length;
        setNext((newIndex + 1) % images.length);
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 typing animation (이미지 바뀔 때마다 실행)
  useEffect(() => {
    let index = 0;

    const delay = setTimeout(() => {
      setTypedText(""); // 초기화

      const typing = setInterval(
        () => {
          setTypedText(fullText.slice(0, index + 1));
          index++;

          if (index === fullText.length) {
            clearInterval(typing);
          }
        },
        50 + Math.random() * 40,
      ); // 자연스러운 타이핑

      return () => clearInterval(typing);
    }, 300); // 살짝 delay

    return () => clearTimeout(delay);
  }, [current]);

  const textColorClass = current === 1 ? "text-white" : "text-black";

  return (
    <section className="relative h-screen overflow-hidden">
      {/* 🟢 current image */}
      <Image
        src={images[current]}
        alt="Wedding background"
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover transition-opacity duration-1000 opacity-100"
      />

      {/* 🔵 next image (crossfade용) */}
      <Image
        src={images[next]}
        alt="Next background"
        fill
        quality={75}
        sizes="100vw"
        className="object-cover transition-opacity duration-1000 opacity-0"
      />

      {/* ✨ overlay */}
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* 📝 typing text */}
      <p
        className={`absolute top-[19%] left-1/2 -translate-x-1/2 -translate-y-1/2
        z-20
        text-[22px] sm:text-[30px]
        font-medium
        tracking-[0.05em]
        whitespace-nowrap
        text-center
        font-[BrittanySignature]
        min-w-[90vw]
        ${textColorClass}`}
      >
        {typedText}
        <span className="ml-1 animate-blink"></span>
      </p>

      {/* 💍 couple name */}
      <p
        className={`absolute top-[27%] left-1/2 -translate-x-1/2 -translate-y-1/2
        z-20
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

      {/* 📅 date */}
      <p
        className={`absolute top-[33%] left-1/2 -translate-x-1/2 -translate-y-1/2
        z-20
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
    </section>
  );
}
