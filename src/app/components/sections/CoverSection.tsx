"use client";

import { useEffect, useState } from "react";
import styles from "../../WeddingInvitation.module.css";

export default function CoverSection() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const textColorClass = bgIndex === 1 ? styles.textWhite : styles.textBlack;

  return (
    <section className={styles.cover}>
      <p className={`${styles.coverText} ${textColorClass}`} key={bgIndex}>
        {"We're getting married".split("").map((char, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.06}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>

      <p className={`${styles.coverSubText} ${textColorClass}`}>
        EUNSANG & FERN
      </p>

      <p className={`${styles.coverDate} ${textColorClass}`}>2026.09.13 2PM</p>

      {/* Background Images */}
      <div
        className={`${styles.coverBg} ${bgIndex === 0 ? styles.active : ""}`}
        style={{ backgroundImage: 'url("/images/bg_updated_1.JPG")' }}
      />

      <div
        className={`${styles.coverBg} ${bgIndex === 1 ? styles.active : ""}`}
        style={{ backgroundImage: 'url("/images/bg_updated_2.JPG")' }}
      />
    </section>
  );
}
