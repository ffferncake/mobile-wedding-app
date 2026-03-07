"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GallerySection() {
  const allImages = [
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

  const [showAll, setShowAll] = useState(false);
  const visibleImages = showAll ? allImages : allImages.slice(0, 10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const changeImage = (nextIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsAnimating(false);
    }, 150);
  };

  const showNext = () => {
    changeImage((currentIndex + 1) % allImages.length);
  };

  const showPrev = () => {
    changeImage((currentIndex - 1 + allImages.length) % allImages.length);
  };

  // keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isModalOpen, currentIndex]);

  return (
    <>
      <div id="gallery" className="section">
        <p className="title-en">GALLERY</p>
        <h3 className="highlight">웨딩 갤러리</h3>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-1 my-5 mx-auto max-w-[400px]">
        {visibleImages.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`gallery-${index + 1}`}
            width={400}
            height={500}
            onClick={() => openModal(index)}
            className="w-full aspect-[3/4] rounded-md object-cover cursor-pointer"
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-[420px] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative w-full flex items-center justify-center">
              <Image
                key={currentIndex}
                src={allImages[currentIndex]}
                alt={`modal-${currentIndex}`}
                width={800}
                height={1000}
                className={`max-h-[85vh] w-auto object-contain transition-all duration-300 ${
                  isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
              />
            </div>

            {/* Close */}
            <button
              onClick={closeModal}
              className="fixed top-6 right-6 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition"
            >
              <X size={28} />
            </button>

            {/* Prev */}
            <button
              onClick={showPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-3 rounded-full transition"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Next */}
            <button
              onClick={showNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-3 rounded-full transition"
            >
              <ChevronRight size={32} />
            </button>

            {/* Counter */}
            <p className="text-white text-sm mt-3">
              {currentIndex + 1} / {allImages.length}
            </p>
          </div>
        </div>
      )}

      {/* Show More */}
      {allImages.length > 10 && (
        <div className="text-center mt-4 text-[16px]">
          <button
            onClick={() => setShowAll(!showAll)}
            className="cursor-pointer"
          >
            {showAll ? "접기 ▲" : "더 보기 ▼"}
          </button>
        </div>
      )}
    </>
  );
}
