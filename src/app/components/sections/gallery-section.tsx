"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      "/images/gallery/gallery_12.JPG",
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
  ] as const;

  const [tab, setTab] = useState<"winter" | "summer">("summer");
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const images = gallery[tab];

  useEffect(() => {
    setIndex(0);
  }, [tab]);

  const changeImage = (next: number) => {
    if (animating) return;

    setAnimating(true);

    setTimeout(() => {
      setIndex(next);
      setAnimating(false);
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
              width: "50%",
              left: tab === "winter" ? "0%" : "50%",
            }}
          />
        </div>
      </div>

      {/* slider */}
      <div className="relative w-full max-w-[420px] mx-auto my-6">
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl">
          <Image
            key={index}
            src={images[index]}
            alt={`${tab}-${index}`}
            fill
            quality={75}
            className={`object-cover transition-all duration-300 ${
              animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
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
