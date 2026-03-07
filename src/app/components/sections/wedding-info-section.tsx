"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../WeddingInvitation.module.css";
import WeddingCalendar from "../wedding-calendar";

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

      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0",
      );

      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0",
      );

      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
        2,
        "0",
      );

      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

      setTimeLeft({ days, hours, minutes, seconds });
    };

    update();
    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div id="weddinginfo" className="section">
      <p className="title-en">WEDDING HALL</p>
      <h3 className="text-[#3b417b] font-bold text-[16px]">예식 안내</h3>

      <div className="text-center text-[13px] leading-[1.8] mb-[10px]">
        <p className="font-semibold text-[18px] mt-[15px]">
          JK Art Convention (JK아트컨벤션)
        </p>
        <p className="text-[#888] text-[14px]">
          4층 Amberluce Hall (엠버루체홀)
        </p>
      </div>

      {/* Hall slideshow */}
      <div className="relative w-full h-[300px] overflow-hidden rounded-lg cursor-pointer">
        {images.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt="wedding hall"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className={`absolute inset-0 object-cover transition-opacity duration-[1600ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-opacity ${
              idx === currentHallIndex ? "opacity-100" : "opacity-0"
            }`}
            onClick={() =>
              window.open(
                "http://www.jkart.co.kr/wedding/amberluce/",
                "_blank",
                "noopener,noreferrer",
              )
            }
          />
        ))}
      </div>

      {/* Calendar */}
      <WeddingCalendar />

      {/* Countdown */}
      <div className="flex justify-center gap-[20px] mt-[20px] flex-wrap">
        <div className="text-center">
          <div className="px-[10px] py-[5px] bg-[#f3f3f3] rounded-md shadow-md text-[25px] font-bold flex justify-center items-center relative">
            <span className="relative z-[2]">{timeLeft.days}</span>
          </div>
          <div className="mt-[8px] text-[13px] text-[#444] font-medium">
            DAYS
          </div>
        </div>

        <div className="text-center">
          <div className="px-[10px] py-[5px] bg-[#f3f3f3] rounded-md shadow-md text-[25px] font-bold flex justify-center items-center relative">
            <span className="relative z-[2]">{timeLeft.hours}</span>
          </div>
          <div className="mt-[8px] text-[13px] text-[#444] font-medium">
            HOURS
          </div>
        </div>

        <div className="text-center">
          <div className="px-[10px] py-[5px] bg-[#f3f3f3] rounded-md shadow-md text-[25px] font-bold flex justify-center items-center relative">
            <span className="relative z-[2]">{timeLeft.minutes}</span>
          </div>
          <div className="mt-[8px] text-[13px] text-[#444] font-medium">
            MINUTES
          </div>
        </div>

        <div className="text-center">
          <div className="px-[10px] py-[5px] bg-[#f3f3f3] rounded-md shadow-md text-[25px] font-bold flex justify-center items-center relative">
            <span className="relative z-[2]">{timeLeft.seconds}</span>
          </div>
          <div className="mt-[8px] text-[13px] text-[#444] font-medium">
            SECONDS
          </div>
        </div>
      </div>
    </div>
  );
}
