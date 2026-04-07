"use client";
import React from "react";

type Props = {
  lang: "ko" | "th";
};

export default function WeddingCalendar({ lang }: Props) {
  const isTH = lang === "th";

  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";

  const dateSize = isTH ? "text-[27px]" : "text-[22px]";
  const subTextSize = isTH ? "text-[18px]" : "text-[14px]";
  const weekSize = isTH ? "text-[18px]" : "text-[13px]";
  const daySize = isTH ? "text-[18px]" : "text-[13px]";
  const circleSize = isTH ? "w-[27px] h-[27px]" : "w-[22px] h-[22px]";

  const targetDate = new Date(2026, 8, 13);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const day = targetDate.getDate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const days = [
    ...Array(firstDayOfWeek).fill(""),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // 📅 날짜 포맷
  const formattedDate =
    lang === "ko"
      ? `${year}.${String(month + 1).padStart(2, "0")}.${String(day).padStart(
          2,
          "0",
        )}`
      : `${day}/${month + 1}/${year + 543}`; // 🔥 태국 불기년

  // ⏰ 시간
  const formattedTime =
    lang === "ko" ? "일요일 오후 2시" : "วันอาทิตย์ เวลา 14:00 น.";

  // 🗓️ 요일
  const weekDays =
    lang === "ko"
      ? ["일", "월", "화", "수", "목", "금", "토"]
      : ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

  return (
    <div
      className={`${fontClass} text-center mt-1 text-[#555] ${
        lang === "th" ? "leading-[1.9]" : ""
      }`}
    >
      <div className="mb-[5px]">
        <h3 className={`${dateSize} font-semibold text-[#444] mb-1`}>
          {formattedDate}
        </h3>
        <p className={`${subTextSize} text-gray-400`}>{formattedTime}</p>
      </div>

      <div className="max-w-[260px] mx-auto border-t border-b border-gray-200 py-[5px]">
        <div className={`grid grid-cols-7 ${weekSize} mb-[6px] text-gray-400`}>
          {" "}
          {weekDays.map((d, i) => (
            <span
              key={i}
              className={
                i === 0 ? "text-[#d69fa6]" : i === 6 ? "text-[#5569a6]" : ""
              }
            >
              {d}
            </span>
          ))}
        </div>

        <div className={`grid grid-cols-7 gap-y-[1px] ${daySize}`}>
          {" "}
          {days.map((d, i) => {
            const isSunday = i % 7 === 0;
            const isSaturday = i % 7 === 6;
            const isSelected = d === day;

            return (
              <span
                key={i}
                className={`text-[#555]
                ${isSunday ? "text-[#d69fa6]" : ""}
                ${isSaturday ? "text-[#5569a6]" : ""}
                ${
                  isSelected
                    ? `bg-[#f4c5c5] text-white ${circleSize} inline-flex items-center justify-center rounded-full mx-auto`
                    : ""
                }`}
              >
                {d}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
