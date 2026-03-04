"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../WeddingInvitation.module.css";
import WeddingCalendar from "../WeddingCalendar";

export default function WeddingInfoSection() {
  const images = [
    "/images/hall_1.jpg",
    "/images/hall_2.jpg",
    "/images/hall_3.jpg",
  ];

  const [currentHallIndex, setCurrentHallIndex] = useState(0);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Hall slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHallIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const target = new Date("2026-09-13T02:00:00+09:00");

    const update = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = String(
        Math.floor(diff / (1000 * 60 * 60 * 24))
      ).padStart(2, "0");

      const hours = String(
        Math.floor((diff / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0");

      const minutes = String(
        Math.floor((diff / (1000 * 60)) % 60)
      ).padStart(2, "0");

      const seconds = String(
        Math.floor((diff / 1000) % 60)
      ).padStart(2, "0");

      setTimeLeft({ days, hours, minutes, seconds });
    };

    update();
    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div id="weddinginfo" className={styles.inviteMessage}>
      <p className={styles.title_en}>WEDDING HALL</p>
      <h3 className={styles.highlight}>예식 안내</h3>

      <div className={styles.locationInfo}>
        <p className={styles.locationName}>
          JK Art Convention (JK아트컨벤션)
        </p>

        <p className={styles.locationFloor}>
          4층 Amberluce Hall (엠버루체홀)
        </p>
      </div>

      {/* Hall slideshow */}
      <div className={styles.weddingImgWrapper}>
        {images.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt="wedding hall"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className={`${styles.weddingImg} ${
              idx === currentHallIndex ? styles.active : ""
            }`}
            onClick={() =>
              window.open(
                "http://www.jkart.co.kr/wedding/amberluce/",
                "_blank",
                "noopener,noreferrer"
              )
            }
          />
        ))}
      </div>

      {/* Calendar */}
      <WeddingCalendar />

      {/* Countdown */}
      <div className={styles.flipClock}>
        <div className={styles.flipUnit}>
          <div className={styles.flipCard}>
            <span>{timeLeft.days}</span>
          </div>
          <div className={styles.flipLabel}>DAYS</div>
        </div>

        <div className={styles.flipUnit}>
          <div className={styles.flipCard}>
            <span>{timeLeft.hours}</span>
          </div>
          <div className={styles.flipLabel}>HOURS</div>
        </div>

        <div className={styles.flipUnit}>
          <div className={styles.flipCard}>
            <span>{timeLeft.minutes}</span>
          </div>
          <div className={styles.flipLabel}>MINUTES</div>
        </div>

        <div className={styles.flipUnit}>
          <div className={styles.flipCard}>
            <span>{timeLeft.seconds}</span>
          </div>
          <div className={styles.flipLabel}>SECONDS</div>
        </div>
      </div>
    </div>
  );
}