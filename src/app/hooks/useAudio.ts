"use client";

import { useEffect, useRef, useState } from "react";

export function useAudio(src: string, shouldAutoPlay = false) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.6;

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.pause();
    } else {
      audio.muted = false;
      audio.play().catch(() => {
        setIsMuted(true);
      });
    }
  }, [isMuted]);

  useEffect(() => {
    if (!shouldAutoPlay) return;

    setIsMuted(false);
  }, [shouldAutoPlay]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return {
    isMuted,
    toggleMute,
  };
}
