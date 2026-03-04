"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../WeddingInvitation.module.css";
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
    // "/images/gallery/gallery_11.JPG",
    // "/images/gallery/gallery_12.JPG",
    // "/images/gallery/gallery_13.JPG",
    // "/images/gallery/gallery_14.JPG",
    // "/images/gallery/gallery_15.JPG",
    // "/images/gallery/gallery_16.JPG",
  ];

  const [showAll, setShowAll] = useState(false);
  const visibleImages = showAll ? allImages : allImages.slice(0, 10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [isModalOpen]);

  return (
    <>
      <div id="gallery" className={styles.inviteMessage}>
        <p className={styles.title_en}>GALLERY</p>
        <h3 className={styles.highlight}>웨딩 갤러리</h3>
      </div>

      <div className={styles.gallery}>
        {visibleImages.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`gallery-${index + 1}`}
            width={140}
            height={200}
            onClick={() => openModal(index)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[currentIndex]}
              alt={`modal-${currentIndex}`}
              width={420}
              height={500}
              className={styles.modalImage}
            />

            <button className={styles.modalClose} onClick={closeModal}>
              <X size={28} />
            </button>

            <button className={styles.modalPrev} onClick={showPrev}>
              <ChevronLeft size={36} />
            </button>

            <button className={styles.modalNext} onClick={showNext}>
              <ChevronRight size={36} />
            </button>

            <p className={styles.imageCounter}>
              {currentIndex + 1} / {allImages.length}
            </p>
          </div>
        </div>
      )}

      {allImages.length > 10 && (
        <div className={styles.showMoreWrapper}>
          <div
            onClick={() => setShowAll(!showAll)}
            className={styles.showMoreButton}
          >
            {showAll ? "접기 ▲" : "더 보기 ▼"}
          </div>
        </div>
      )}
    </>
  );
}