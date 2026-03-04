"use client";

import React, { useEffect, useMemo, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import styles from "../WeddingInvitation.module.css";

type BookFlipProps = {
  pages: React.ReactNode[];
  onPageChange?: (pageIndex: number) => void;
};

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export default function BookFlip({ pages, onPageChange }: BookFlipProps) {
  const isMobile = useIsMobile(768);

  const [viewportWidth, setViewportWidth] = useState(420);
  const [viewportHeight, setViewportHeight] = useState(650);

  useEffect(() => {
    const updateSize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // 📱 Mobile = full width
  // 💻 Desktop = fixed page width
  const pageWidth = isMobile ? viewportWidth : 420;

  // 📱 Mobile = 1 page
  // 💻 Desktop = 2 pages
  const bookWidth = isMobile ? viewportWidth : pageWidth * 2;

  const bookProps = useMemo(
    () => ({
      width: pageWidth,
      height: viewportHeight,
      size: "fixed" as const,
      minWidth: 280,
      maxWidth: pageWidth,
      minHeight: 300,
      maxHeight: viewportHeight,
      showCover: true,
      mobileScrollSupport: true,
      maxShadowOpacity: 0.25,
      flippingTime: 650,
      useMouseEvents: true,
      startPage: 0,
      drawShadow: true,
      disableFlipByClick: false,
    }),
    [pageWidth, viewportHeight],
  );

  return (
    <div
      className={styles.bookStage}
      style={{
        width: bookWidth,
        height: viewportHeight,
      }}
    >
      <HTMLFlipBook
        {...(bookProps as any)}
        className={styles.flipBook}
        onFlip={(e: any) => onPageChange?.(e?.data ?? 0)}
      >
        {pages.map((node, idx) => (
          <div key={idx} className={styles.flipPage}>
            <div className={styles.pageInner}>{node}</div>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}
