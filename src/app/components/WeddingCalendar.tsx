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
    day
  ).padStart(2, "0")}`;
  const formattedTime = "일요일 오후 2시";

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.dateHeader}>
        <h3 className={styles.date}>{formattedDate}</h3>
        <p className={styles.time}>{formattedTime}</p>
      </div>

      <div className={styles.calendarBox}>
        <div className={styles.weekdays}>
          <span className={styles.sun}>일</span>
          <span>월</span>
          <span>화</span>
          <span>수</span>
          <span>목</span>
          <span>금</span>
          <span className={styles.sat}>토</span>
        </div>

        <div className={styles.days}>
          {days.map((d, i) => {
            const isSunday = i % 7 === 0;
            const isSaturday = i % 7 === 6;
            const isSelected = d === day;

            return (
              <span
                key={i}
                className={`${styles.day} 
                  ${isSunday ? styles.sun : ""} 
                  ${isSaturday ? styles.sat : ""} 
                  ${isSelected ? styles.selected : ""}`}
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
