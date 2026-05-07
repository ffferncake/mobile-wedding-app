"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function CoverSection() {
  const images = ["/images/bg_updated_1.webp", "/images/bg_updated_2.webp"];

  const [current, setCurrent] = useState(0);

  // Keep the next cover image warm so the crossfade stays soft.
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

  return (
    <section className="relative h-screen overflow-hidden">
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

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/28 via-white/4 to-white/10" />
      <div className="absolute inset-x-0 top-0 z-10 h-[33%] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.38)_48%,rgba(255,255,255,0)_78%)]" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-[34%] bg-gradient-to-t from-white/74 via-white/22 to-white/0" />

      <div className="absolute left-1/2 top-[14.5%] z-20 w-full -translate-x-1/2 -translate-y-1/2 px-3 text-center">
        <p
          className="pg-bathbomb mx-auto mb-1 w-fit text-center text-[15px] font-normal uppercase leading-none tracking-[0.22em] text-black/72 opacity-0 drop-shadow-[0_1px_10px_rgba(255,255,255,0.95)] animate-fadeIn"
          style={{ animationDelay: "0.2s" }}
        >
          2026.09.13&nbsp;&nbsp;2PM
        </p>

        <h1
          className="font-[BODAR] text-[74px] font-normal uppercase leading-none tracking-[0.018em] text-black/90 opacity-0 drop-shadow-[0_2px_18px_rgba(255,255,255,0.88)] animate-fadeIn sm:text-[86px]"
          style={{ animationDelay: "0.35s" }}
        >
          WEDDING
        </h1>

        <p
          className="pg-bathbomb mx-auto -mt-1 max-w-[260px] text-[17px] leading-none tracking-[0.08em] text-black/74 opacity-0 drop-shadow-[0_1px_10px_rgba(255,255,255,0.95)] animate-fadeIn"
          style={{ animationDelay: "0.55s" }}
        >
          EUNSANG ♥ FERN
        </p>
      </div>
    </section>
  );
}
