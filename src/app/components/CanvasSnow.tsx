"use client";

import { useEffect, useRef } from "react";
import styles from "./CanvasSnow.module.css";

interface Flake {
  x: number;
  y: number;
  r: number;
  speed: number;
  wind: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  blur: number;
}

export default function CanvasSnow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let animationId = 0;
    let flakes: Flake[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    const makeFlake = (randomY = false): Flake => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -(Math.random() * 100),
      r: Math.random() * 2.8 + 0.6,
      speed: Math.random() * 1.2 + 0.4,
      wind: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.55 + 0.25,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.018 + 0.004,
      blur: Math.random() < 0.3 ? Math.random() * 1.5 : 0,
    });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const init = () => {
      resize();
      const flakeCount = reducedMotion ? 35 : 140;
      flakes = Array.from({ length: flakeCount }, () => makeFlake(true));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (const flake of flakes) {
        if (!reducedMotion) {
          flake.wobble += flake.wobbleSpeed;
          flake.x += Math.sin(flake.wobble) * 0.6 + flake.wind;
          flake.y += flake.speed;

          if (flake.y > height + flake.r) {
            Object.assign(flake, makeFlake(false));
          }
          if (flake.x > width + flake.r) flake.x = -flake.r;
          if (flake.x < -flake.r) flake.x = width + flake.r;
        }

        context.save();
        context.filter = flake.blur > 0 ? `blur(${flake.blur}px)` : "none";
        context.beginPath();
        context.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        context.fill();
        context.restore();
      }

      animationId = window.requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
      flakes = Array.from({ length: reducedMotion ? 35 : 140 }, () =>
        makeFlake(true),
      );
    };

    init();
    draw();

    window.addEventListener("resize", handleResize);
    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.snowCanvas} aria-hidden />;
}
