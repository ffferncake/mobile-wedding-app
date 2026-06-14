"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  Image as ImageIcon,
  Loader2,
  X,
} from "lucide-react";
import { behindSceneImages, galleryImages } from "../../data/gallery";

type Props = {
  lang: "ko" | "th";
};

type GalleryTab = "winter" | "summer" | "studio";

export default function GallerySection({ lang }: Props) {
  const isTH = lang === "th";

  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";
  const sectionSize = isTH ? "text-[20px]" : "text-[13px]";
  const titleSize = isTH ? "text-[22px]" : "text-[16px]";
  const highlightSize = isTH ? "text-[24px]" : "text-[18px]";
  const subTextSize = isTH ? "text-[18px]" : "text-[14px]";

  const tabs = [
    {
      key: "studio",
      label: lang === "ko" ? "스튜디오" : "สตูดิโอ",
    },
    {
      key: "summer",
      label: lang === "ko" ? "여름" : "summer set",
    },
    {
      key: "winter",
      label: lang === "ko" ? "겨울" : "winter set",
    },
  ] as const;

  const [tab, setTab] = useState<GalleryTab>("studio");
  const [viewMode, setViewMode] = useState<"single" | "grid">("grid");
  const [startIndex, setStartIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [behindIndex, setBehindIndex] = useState(0);
  const [behindLightboxIndex, setBehindLightboxIndex] = useState<number | null>(
    null,
  );
  const [animating, setAnimating] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const loadedImagesRef = useRef<Set<string>>(new Set());

  const behindImages: readonly string[] = behindSceneImages;
  const behindVisibleCount = Math.min(3, behindImages.length);
  const behindLastIndex = Math.max(behindImages.length - behindVisibleCount, 0);
  const pageSize = viewMode === "single" ? 1 : 4;
  const images: readonly string[] = galleryImages[tab];
  const lastPageStart = Math.floor((images.length - 1) / pageSize) * pageSize;
  const currentImages = images.slice(startIndex, startIndex + pageSize);
  const pageKey = currentImages.join("|");
  const visibleEnd = Math.min(startIndex + currentImages.length, images.length);
  const lightboxImages =
    behindLightboxIndex === null ? images : behindImages;
  const activeLightboxIndex =
    behindLightboxIndex === null ? lightboxIndex : behindLightboxIndex;
  const lightboxImage =
    activeLightboxIndex === null
      ? null
      : lightboxImages[activeLightboxIndex] ?? null;

  useEffect(() => {
    setStartIndex(0);
    setImageLoading(true);
  }, [tab]);

  useEffect(() => {
    if (behindLastIndex === 0 || behindLightboxIndex !== null) return;

    const intervalId = window.setInterval(() => {
      setBehindIndex((currentIndex) =>
        currentIndex + 1 > behindLastIndex ? 0 : currentIndex + 1,
      );
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [behindLastIndex, behindLightboxIndex]);

  useEffect(() => {
    if (
      currentImages.length === 0 ||
      currentImages.every((img) => loadedImagesRef.current.has(img))
    ) {
      setImageLoading(false);
      setAnimating(false);
      return;
    }

    setImageLoading(true);
  }, [pageKey]);

  const changePage = (next: number) => {
    if (animating || next === startIndex) return;

    setAnimating(true);
    setImageLoading(true);

    setTimeout(() => {
      setStartIndex(next);
    }, 150);
  };

  const changeViewMode = (nextMode: "single" | "grid") => {
    if (nextMode === viewMode) return;

    const nextPageSize = nextMode === "single" ? 1 : 4;
    setViewMode(nextMode);
    setStartIndex(Math.floor(startIndex / nextPageSize) * nextPageSize);
    setImageLoading(true);
  };

  const next = () => {
    if (images.length === 0) return;

    const nextIndex = startIndex + pageSize;
    changePage(nextIndex >= images.length ? 0 : nextIndex);
  };

  const prev = () => {
    if (images.length === 0) return;

    changePage(startIndex - pageSize < 0 ? lastPageStart : startIndex - pageSize);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const openBehindLightbox = (index: number) => {
    setBehindLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setBehindLightboxIndex(null);
  };

  const showNextImage = () => {
    if (activeLightboxIndex === null || lightboxImages.length === 0) return;

    if (behindLightboxIndex === null) {
      setLightboxIndex((activeLightboxIndex + 1) % lightboxImages.length);
      return;
    }

    setBehindLightboxIndex((activeLightboxIndex + 1) % lightboxImages.length);
  };

  const showPrevImage = () => {
    if (activeLightboxIndex === null || lightboxImages.length === 0) return;

    const previousIndex =
      activeLightboxIndex - 1 < 0
        ? lightboxImages.length - 1
        : activeLightboxIndex - 1;

    if (behindLightboxIndex === null) {
      setLightboxIndex(previousIndex);
      return;
    }

    setBehindLightboxIndex(previousIndex);
  };

  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") showNextImage();
      if (event.key === "ArrowLeft") showPrevImage();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeLightboxIndex, lightboxImages.length]);

  return (
    <>
      <div id="gallery" className={`section ${fontClass} ${sectionSize}`}>
        <p className={`title-en ${fontClass} ${titleSize}`}>GALLERY</p>
        <h3 className={`highlight ${fontClass} ${highlightSize}`}>
          {lang === "ko" ? "웨딩 갤러리" : "แกลเลอรี่"}
        </h3>
      </div>

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

      <div className="mx-auto mt-3 flex w-full max-w-[420px] justify-center">
        <div className="flex rounded-full border border-gray-200 bg-white/75 p-1 shadow-sm">
          <button
            type="button"
            onClick={() => changeViewMode("single")}
            title={lang === "ko" ? "한 장씩 보기" : "ดูทีละรูป"}
            aria-label={lang === "ko" ? "한 장씩 보기" : "ดูทีละรูป"}
            className={`flex h-8 min-w-12 items-center justify-center gap-1 rounded-full px-3 transition ${
              viewMode === "single"
                ? "bg-[#004483] text-white shadow"
                : "text-gray-400"
            }`}
          >
            <ImageIcon size={16} />
            <span className={`text-[12px] ${fontClass}`}>1</span>
          </button>

          <button
            type="button"
            onClick={() => changeViewMode("grid")}
            title={lang === "ko" ? "네 장씩 보기" : "ดูทีละ 4 รูป"}
            aria-label={lang === "ko" ? "네 장씩 보기" : "ดูทีละ 4 รูป"}
            className={`flex h-8 min-w-12 items-center justify-center gap-1 rounded-full px-3 transition ${
              viewMode === "grid"
                ? "bg-[#004483] text-white shadow"
                : "text-gray-400"
            }`}
          >
            <Grid2X2 size={16} />
            <span className={`text-[12px] ${fontClass}`}>4</span>
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-[420px] mx-auto my-3">
        <div className="relative overflow-hidden rounded-xl bg-gray-100">
          {imageLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/45 backdrop-blur-[1px]">
              <Loader2 className="h-8 w-8 animate-spin text-[#004483]" />
            </div>
          )}

          <div
            className={`grid w-full ${
              viewMode === "single"
                ? "grid-cols-1 p-0"
                : "grid-cols-2 gap-2 p-2"
            }`}
          >
            {currentImages.map((image, imageIndex) => (
              <button
                type="button"
                key={image}
                onClick={() => openLightbox(startIndex + imageIndex)}
                aria-label={
                  lang === "ko" ? "갤러리 사진 크게 보기" : "ดูรูปภาพขนาดใหญ่"
                }
                className={`relative aspect-[3/4] overflow-hidden bg-white ${
                  viewMode === "single" ? "rounded-xl" : "rounded-lg"
                }`}
              >
                <Image
                  src={image}
                  alt={`${tab}-${startIndex + imageIndex}`}
                  fill
                  quality={65}
                  sizes={
                    viewMode === "single"
                      ? "(max-width: 420px) 100vw, 420px"
                      : "(max-width: 420px) 50vw, 210px"
                  }
                  onLoad={() => {
                    loadedImagesRef.current.add(image);
                    if (
                      currentImages.every((img) =>
                        loadedImagesRef.current.has(img),
                      )
                    ) {
                      setImageLoading(false);
                      setAnimating(false);
                    }
                  }}
                  onError={() => {
                    loadedImagesRef.current.add(image);
                    if (
                      currentImages.every((img) =>
                        loadedImagesRef.current.has(img),
                      )
                    ) {
                      setImageLoading(false);
                      setAnimating(false);
                    }
                  }}
                  loading="eager"
                  className={`object-cover transition-all duration-300 ${
                    animating || imageLoading
                      ? "opacity-0 scale-95"
                      : "opacity-100 scale-100 hover:scale-[1.03]"
                  }`}
                />
              </button>
            ))}
          </div>

          {images.length === 0 && (
            <div
              className={`flex min-h-[320px] items-center justify-center text-gray-400 ${fontClass} ${subTextSize}`}
            >
              {lang === "ko" ? "갤러리 로딩 중..." : "กำลังโหลดแกลเลอรี่..."}
            </div>
          )}
        </div>

        {images.length > pageSize && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur"
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}

        <p
          className={`text-center mt-3 text-gray-500 ${fontClass} ${subTextSize}`}
        >
          {images.length === 0
            ? `0 / 0`
            : viewMode === "single"
              ? `${startIndex + 1} / ${images.length}`
              : `${startIndex + 1}-${visibleEnd} / ${images.length}`}
        </p>
      </div>

      {behindImages.length > 0 && (
        <div className={`section ${fontClass} ${sectionSize}`}>
          <p className={`title-en ${fontClass} ${titleSize}`}>
            BEHIND THE SCENE
          </p>
          <h3 className={`highlight ${fontClass} ${highlightSize}`}>
            {lang === "ko" ? "비하인드 씬" : "เบื้องหลัง"}
          </h3>

          <div className="relative w-full max-w-[420px] mx-auto mt-4">
            <div className="relative overflow-hidden rounded-xl bg-gray-100 p-2">
              <div
                className="flex gap-2 transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateX(calc(-${behindIndex} * (((100% - 16px) / 3) + 8px)))`,
                }}
              >
                {behindImages.map((image, imageIndex) => (
                  <button
                    type="button"
                    key={image}
                    onClick={() => openBehindLightbox(imageIndex)}
                    aria-label={
                      lang === "ko"
                        ? "비하인드 사진 크게 보기"
                        : "ดูรูปภาพขนาดใหญ่"
                    }
                    className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white"
                    style={{ flex: "0 0 calc((100% - 16px) / 3)" }}
                  >
                    <Image
                      src={image}
                      alt={`behind-the-scene-${imageIndex + 1}`}
                      fill
                      quality={60}
                      sizes="(max-width: 420px) 33vw, 135px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <p
              className={`text-center mt-3 text-gray-500 ${fontClass} ${subTextSize}`}
            >
              {behindIndex + 1}-{Math.min(behindIndex + behindVisibleCount, behindImages.length)} / {behindImages.length}
            </p>
          </div>
        </div>
      )}

      {lightboxImage && activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/90"
          role="dialog"
          aria-modal="true"
          aria-label={lang === "ko" ? "갤러리 사진 보기" : "ดูรูปภาพแกลเลอรี่"}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label={lang === "ko" ? "닫기" : "ปิด"}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
          >
            <X size={24} />
          </button>

          {lightboxImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrevImage}
                aria-label={lang === "ko" ? "이전 사진" : "รูปก่อนหน้า"}
                className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
              >
                <ChevronLeft size={30} />
              </button>

              <button
                type="button"
                onClick={showNextImage}
                aria-label={lang === "ko" ? "다음 사진" : "รูปถัดไป"}
                className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
              >
                <ChevronRight size={30} />
              </button>
            </>
          )}

          <div className="relative h-[100dvh] w-screen max-w-[420px]">
            <Image
              src={lightboxImage}
              alt={
                behindLightboxIndex === null
                  ? `${tab}-${activeLightboxIndex + 1}`
                  : `behind-the-scene-${activeLightboxIndex + 1}`
              }
              fill
              quality={85}
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <p
            className={`absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-4 py-1.5 text-white backdrop-blur ${fontClass} ${subTextSize}`}
          >
            {activeLightboxIndex + 1} / {lightboxImages.length}
          </p>
        </div>
      )}
    </>
  );
}
