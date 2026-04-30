"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

type Props = {
  lang: "ko" | "th";
};

export default function GallerySection({ lang }: Props) {
  const isTH = lang === "th";

  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";
  const sectionSize = isTH ? "text-[20px]" : "text-[13px]";
  const titleSize = isTH ? "text-[22px]" : "text-[16px]";
  const highlightSize = isTH ? "text-[24px]" : "text-[18px]";
  const subTextSize = isTH ? "text-[18px]" : "text-[14px]";

  const gallery = {
    winter: [
      "/images/gallery/gallery_1.JPG",
      "/images/gallery/gallery_2.JPG",
      "/images/gallery/gallery_3.JPG",
      "/images/gallery/gallery_4.JPG",
      "/images/gallery/gallery_5.JPG",
      "/images/gallery/gallery_6.JPG",
    ],
    summer: [
      "/images/gallery/gallery_7.JPG",
      "/images/gallery/gallery_8.JPG",
      "/images/gallery/gallery_9.JPG",
      "/images/gallery/gallery_10.JPG",
      "/images/gallery/gallery_11.JPG",
    ],
    studio: [
      "/images/gallery/gallery_12.JPG",
      "/images/gallery/gallery_13.JPG",
      "/images/gallery/gallery_14.JPG",
      "/images/gallery/gallery_15.JPG",
      "/images/gallery/gallery_16.JPG",
      "/images/gallery/gallery_17.JPG",
      "/images/gallery/gallery_18.JPG",
      "/images/gallery/gallery_19.JPG",
    ],
  };

  const tabs = [
    {
      key: "winter",
      label: lang === "ko" ? "겨울" : "winter set",
    },
    {
      key: "summer",
      label: lang === "ko" ? "여름" : "summer set",
    },
    {
      key: "studio",
      label: lang === "ko" ? "스튜디오" : "studio set",
    },
  ] as const;

  const [tab, setTab] = useState<"winter" | "summer" | "studio">("summer");
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const loadedImagesRef = useRef<Set<string>>(new Set());

  const images = gallery[tab];
  const currentImage = images[index];

  useEffect(() => {
    setIndex(0);
    setImageLoading(true);
  }, [tab]);

  useEffect(() => {
    if (loadedImagesRef.current.has(currentImage)) {
      setImageLoading(false);
      setAnimating(false);
      return;
    }

    let active = true;
    setImageLoading(true);

    const img = new window.Image();
    img.onload = () => {
      if (!active) return;
      loadedImagesRef.current.add(currentImage);
      setImageLoading(false);
      setAnimating(false);
    };
    img.onerror = () => {
      if (!active) return;
      setImageLoading(false);
      setAnimating(false);
    };
    img.src = currentImage;

    return () => {
      active = false;
    };
  }, [currentImage]);

  const changeImage = (next: number) => {
    if (animating || next === index) return;

    setAnimating(true);
    setImageLoading(true);

    setTimeout(() => {
      setIndex(next);
    }, 150);
  };

  const next = () => {
    changeImage((index + 1) % images.length);
  };

  const prev = () => {
    changeImage((index - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* title */}
      <div id="gallery" className={`section ${fontClass} ${sectionSize}`}>
        <p className={`title-en ${fontClass} ${titleSize}`}>GALLERY</p>
        <h3 className={`highlight ${fontClass} ${highlightSize}`}>
          {lang === "ko" ? "웨딩 갤러리" : "แกลเลอรี่"}
        </h3>
      </div>

      {/* tab */}
      <div className="w-full max-w-[420px] mx-auto mt-2">
        <div className="relative flex border-b border-gray-200">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 font-medium transition ${fontClass} ${subTextSize} ${
                tab === t.key
                  ? "text-[#004483]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t.label}
            </button>
          ))}

          <div
            className={`absolute bottom-0 h-[2px] bg-[#004483] transition-all duration-300 ${fontClass} ${subTextSize}`}
            style={{
              width: `${100 / tabs.length}%`,
              left: `${tabs.findIndex((t) => t.key === tab) * (100 / tabs.length)}%`,
            }}
          />
        </div>
      </div>

      {/* slider */}
      <div className="relative w-full max-w-[420px] mx-auto my-6">
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
          {imageLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/45 backdrop-blur-[1px]">
              <Loader2 className="h-8 w-8 animate-spin text-[#004483]" />
            </div>
          )}

          <Image
            key={currentImage}
            src={currentImage}
            alt={`${tab}-${index}`}
            fill
            quality={75}
            unoptimized
            onLoad={() => {
              loadedImagesRef.current.add(currentImage);
              setImageLoading(false);
              setAnimating(false);
            }}
            onError={() => {
              setImageLoading(false);
              setAnimating(false);
            }}
            className={`object-cover transition-all duration-300 ${
              animating || imageLoading
                ? "opacity-0 scale-95"
                : "opacity-100 scale-100"
            }`}
          />
        </div>

        {/* prev */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur"
        >
          <ChevronLeft size={28} />
        </button>

        {/* next */}
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur"
        >
          <ChevronRight size={28} />
        </button>

        {/* counter */}
        <p
          className={`text-center mt-3 text-gray-500 ${fontClass} ${subTextSize}`}
        >
          {index + 1} / {images.length}
        </p>
      </div>
    </>
  );
}
