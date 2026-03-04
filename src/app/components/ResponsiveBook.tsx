"use client";

import { useEffect, useState } from "react";
import HTMLFlipBookOrig from "react-pageflip";
const HTMLFlipBook: any = HTMLFlipBookOrig;

export default function ResponsiveBook({ children }: any) {
  const [size, setSize] = useState({ width: 420, height: 650 });

  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const width = Math.min(screenWidth * 0.9, 420);
      const height = screenHeight * 0.95;

      setSize({ width, height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <HTMLFlipBook
      width={size.width}
      height={size.height}
      showCover={true}
      mobileScrollSupport={true}
    >
      {children}
    </HTMLFlipBook>
  );
}