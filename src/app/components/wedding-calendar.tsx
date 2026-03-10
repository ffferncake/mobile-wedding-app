"use client";
import React from "react";
import styles from "./WeddingCalendar.module.css";

export default function WeddingCalendar() {
  // 📅 Target date
  const targetDate = new Date(2026, 8, 13); // months are 0-indexed → 3 = April
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const day = targetDate.getDate();

  // 🗓️ Month metadata
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0: Sun … 6: Sat

  // Build days array with blanks before the 1st
  const days = [
    ...Array(firstDayOfWeek).fill(""),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Format heading
  const formattedDate = `${year}.${String(month + 1).padStart(2, "0")}.${String(
    day,
  ).padStart(2, "0")}`;
  const formattedTime = "일요일 오후 2시";

  return (
    <div className="ibmplex-font text-center mt-6 text-[#555]">
      {" "}
      <div className="mb-[10px]">
        <h3 className="text-[22px] font-semibold text-[#444] mb-1">
          {formattedDate}
        </h3>
        <p className="text-sm text-gray-400">{formattedTime}</p>
      </div>
      <div className="max-w-[260px] mx-auto border-t border-b border-gray-200 py-[10px]">
        <div className="grid grid-cols-7 text-[13px] mb-[6px] text-gray-400">
          <span className="text-[#d69fa6]">일</span>
          <span>월</span>
          <span>화</span>
          <span>수</span>
          <span>목</span>
          <span>금</span>
          <span className="text-[#5569a6]">토</span>
        </div>

        <div className="grid grid-cols-7 gap-y-[6px] text-[13px]">
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
                  ? "bg-[#f4c5c5] text-white w-[22px] h-[22px] inline-flex items-center justify-center rounded-full mx-auto"
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
