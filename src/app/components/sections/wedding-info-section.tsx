"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import WeddingCalendar from "../wedding-calendar";

type Props = {
  lang: "ko" | "th";
};

export default function WeddingInfoSection({ lang }: Props) {
  const isTH = lang === "th";

  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";
  const sectionSize = isTH ? "text-[20px]" : "text-[13px]";
  const titleSize = isTH ? "text-[22px]" : "text-[16px]";
  const highlightSize = isTH ? "text-[24px]" : "text-[18px]";

  const hallNameSize = isTH ? "text-[23px]" : "text-[18px]";
  const subTextSize = isTH ? "text-[18px]" : "text-[14px]";
  const countNumberSize = isTH ? "text-[23px]" : "text-[20px]";
  const countLabelSize = isTH ? "text-[18px]" : "text-[13px]";

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

  // slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHallIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // countdown
  useEffect(() => {
    const target = new Date("2026-09-13T02:00:00+09:00");

    const update = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
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
    <div id="weddinginfo" className={`section ${fontClass} ${sectionSize}`}>
      <p className={`title-en ${fontClass} ${titleSize}`}>WEDDING HALL</p>

      <h3 className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "ko" ? "예식 안내" : "รายละเอียดสถานที่จัดงาน"}
      </h3>

      <div className="text-center text-[13px] leading-[1.8] mb-[10px]">
        <p className={`font-semibold ${hallNameSize}`}>
          {" "}
          {lang === "ko"
            ? " JK Art Convention (JK아트컨벤션)"
            : " JK Art Convention"}
        </p>

        <p className={`text-[#888] ${subTextSize}`}>
          {" "}
          {lang === "ko"
            ? "4층 Amberluce Hall (엠버루체홀)"
            : "ชั้น 4 Amberluce Hall"}
        </p>
      </div>

      {/* slideshow */}
      <div className="relative w-full h-[220px] overflow-hidden rounded-lg cursor-pointer">
        {images.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt="wedding hall"
            fill
            className={`absolute inset-0 object-cover transition-opacity duration-[1600ms] ${
              idx === currentHallIndex ? "opacity-100" : "opacity-0"
            }`}
            onClick={() =>
              window.open("http://www.jkart.co.kr/wedding/amberluce/", "_blank")
            }
          />
        ))}
      </div>

      <WeddingCalendar lang={lang} />

      {/* countdown */}
      <div className="flex justify-center gap-[20px] mt-[8px] flex-wrap">
        {[
          { value: timeLeft.days, label: lang === "ko" ? "일" : "วัน" },
          { value: timeLeft.hours, label: lang === "ko" ? "시간" : "ชั่วโมง" },
          { value: timeLeft.minutes, label: lang === "ko" ? "분" : "นาที" },
          { value: timeLeft.seconds, label: lang === "ko" ? "초" : "วินาที" },
        ].map((item, i) => (
          <div key={i} className="text-center">
            <div
              className={`px-[10px] py-[5px] bg-[#f3f3f3] rounded-md shadow-md font-bold ${countNumberSize}`}
            >
              {" "}
              {item.value}
            </div>

            <div
              className={`mt-[8px] text-[#444] font-medium ${countLabelSize}`}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
