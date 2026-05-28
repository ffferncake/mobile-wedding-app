"use client";

import { useEffect, useMemo, useState } from "react";
import { galleryImages } from "../data/gallery";

const baseImageSources = [
  "/images/bg_updated_1.webp",
  "/images/bg_updated_2.webp",
  "/images/hall_1.jpg",
  "/images/hall_2.jpg",
  "/images/hall_3.jpg",
  "/images/mellow_1.jpg",
  "/images/mellow_2.jpg",
  "/images/mellow_3.jpg",
  "/images/mellow_4.jpg",
  "/images/gallery/hori_1.JPG",
  "/images/gallery/hori_2.JPG",
  "/images/oppa_kids_ver.png",
  "/images/me_kids_ver.png",
  "/images/jk_map.jpg",
  "/images/icon/flowers.png",
];

function loadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function useInvitationReady() {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const imageSources = useMemo(
    () => [
      ...baseImageSources,
      ...galleryImages.studio.slice(0, 4),
      ...Array.from(
        { length: 10 },
        (_, index) => `/images/flowers/flower-${index + 1}.png`,
      ),
    ],
    [],
  );

  useEffect(() => {
    let active = true;
    let readyCount = 0;

    const markLoaded = () => {
      readyCount += 1;
      if (active) setLoadedCount(readyCount);
    };

    const timeout = window.setTimeout(() => {
      if (active) setIsReady(true);
    }, 8000);

    const waitForWindowLoad = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
        return;
      }

      window.addEventListener("load", () => resolve(), { once: true });
    });

    const waitForFonts =
      "fonts" in document ? document.fonts.ready.then(() => undefined) : undefined;

    Promise.all([
      waitForWindowLoad,
      waitForFonts,
      Promise.all(
        imageSources.map((src) =>
          loadImage(src).then(() => {
            markLoaded();
          }),
        ),
      ),
      new Promise((resolve) => window.setTimeout(resolve, 700)),
    ]).then(() => {
      if (!active) return;
      window.clearTimeout(timeout);
      setIsReady(true);
    });

    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, [imageSources]);

  const progress = isReady
    ? 100
    : Math.min(98, (loadedCount / imageSources.length) * 100);

  return { isReady, progress };
}
