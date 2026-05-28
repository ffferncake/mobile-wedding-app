"use client";

import { type RefObject, useEffect, useState } from "react";

type Options = {
  containerRef: RefObject<HTMLDivElement | null>;
  enabled: boolean;
  lang: "ko" | "th";
};

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function useRsvpModalPrompt({ containerRef, enabled, lang }: Options) {
  const [isOpen, setIsOpen] = useState(false);
  const [doNotShowToday, setDoNotShowToday] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const storageKey = `rsvp-modal-dismissed-${lang}`;

  useEffect(() => {
    if (!enabled || hasTriggered) return;

    const container = containerRef.current;
    if (!container) return;

    if (localStorage.getItem(storageKey) === getTodayKey()) {
      setHasTriggered(true);
      return;
    }

    const handleScroll = () => {
      const passedCover = container.scrollTop > container.clientHeight * 0.72;

      if (!passedCover) return;

      setIsOpen(true);
      setHasTriggered(true);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, enabled, hasTriggered, storageKey]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, doNotShowToday]);

  const closeModal = () => {
    if (doNotShowToday) {
      localStorage.setItem(storageKey, getTodayKey());
    }

    setIsOpen(false);
  };

  return {
    closeModal,
    doNotShowToday,
    isOpen,
    setDoNotShowToday,
  };
}
