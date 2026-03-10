"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GallerySection() {
  const images = [
    "/images/gallery/gallery_1.JPG",
    "/images/gallery/gallery_2.JPG",
    "/images/gallery/gallery_3.JPG",
    "/images/gallery/gallery_4.JPG",
    "/images/gallery/gallery_5.JPG",
    "/images/gallery/gallery_6.JPG",
    "/images/gallery/gallery_7.JPG",
    "/images/gallery/gallery_8.JPG",
    "/images/gallery/gallery_9.JPG",
    "/images/gallery/gallery_10.JPG",
  ];

  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

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
      <div id="gallery" className="section">
        <p className="title-en">GALLERY</p>
        <h3 className="highlight">웨딩 갤러리</h3>
      </div>

      {/* slider */}
      <div className="relative w-full max-w-[420px] mx-auto my-6">

        {/* image */}
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl">
          <Image
            key={index}
            src={images[index]}
            alt={`gallery-${index}`}
            fill
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
        <p className="text-center mt-3 text-sm text-gray-500">
          {index + 1} / {images.length}
        </p>
      </div>
    </>
  );
}