"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink, MapPin } from "lucide-react";

type Props = {
  lang: "ko" | "th";
  selectedVenue?: VenueMode;
  onSelectVenue?: (venue: VenueMode) => void;
};

type VenueMode = "KOREA" | "THAILAND";

type EventSchedule = {
  title: string;
  place: string;
  dateText: string;
  timeText: string;
  date: Date;
  kakaoUrl?: string;
  mapUrl?: string;
  naverUrl?: string;
  websiteUrl?: string;
};

const kakaoMapUrl = "https://kko.to/Kg-9yiU8OY";
const naverMapUrl = "https://naver.me/Gn0yrSdR";
const googleMapsUrl = "https://maps.app.goo.gl/KmSegrZQkE7tfJri8";
const websiteUrl =
  "https://www.facebook.com/MellowGardenWineDineRestaurant";
const mellowImages = [
  "/images/mellow_1.jpg",
  "/images/mellow_2.jpg",
  "/images/mellow_3.jpg",
  "/images/mellow_4.jpg",
];
const hallImages = [
  "/images/hall_1.jpg",
  "/images/hall_2.jpg",
  "/images/hall_3.jpg",
];
const dressCodeColors = ["#EAC7C7", "#CDEDFC", "#FFF9CD", "#DEDAF4"];

export default function WeddingCalendar({
  lang,
  selectedVenue = "KOREA",
  onSelectVenue,
}: Props) {
  const isTH = lang === "th";

  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";

  const titleSize = isTH ? "text-[19px]" : "text-[15px]";
  const subTextSize = isTH ? "text-[15px]" : "text-[12px]";
  const weekSize = isTH ? "text-[13px]" : "text-[10px]";
  const daySize = isTH ? "text-[13px]" : "text-[10px]";
  const circleSize = isTH ? "w-[22px] h-[22px]" : "w-[18px] h-[18px]";
  const [mellowImageIndex, setMellowImageIndex] = useState(0);
  const [hallImageIndex, setHallImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMellowImageIndex((prev) => (prev + 1) % mellowImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHallImageIndex((prev) => (prev + 1) % hallImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const weekDays =
    lang === "ko"
      ? ["일", "월", "화", "수", "목", "금", "토"]
      : ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

  const events: EventSchedule[] =
    lang === "ko"
      ? [
          {
            title: "한국 결혼식",
            place: "JK 아트컨벤션",
            dateText: "2026.09.13",
            timeText: "일요일 오후 2시",
            date: new Date(2026, 8, 13),
            kakaoUrl: kakaoMapUrl,
            naverUrl: naverMapUrl,
          },
          {
            title: "태국 축하 파티 & After Party",
            place: "Mellow Garden",
            dateText: "2026.12.26",
            timeText: "토요일 18:00-23:00",
            date: new Date(2026, 11, 26),
            mapUrl: googleMapsUrl,
            websiteUrl,
          },
        ]
      : [
          {
            title: "พิธีแต่งงานที่เกาหลี",
            place: "JK Art Convention",
            dateText: "13/9/2569",
            timeText: "วันอาทิตย์ เวลา 14:00 น.",
            date: new Date(2026, 8, 13),
            kakaoUrl: kakaoMapUrl,
            naverUrl: naverMapUrl,
          },
          {
            title: "งานฉลองที่ไทย & After Party",
            place: "Mellow Garden",
            dateText: "26/12/2569",
            timeText: "วันเสาร์ 18:00-23:00 น.",
            date: new Date(2026, 11, 26),
            mapUrl: googleMapsUrl,
            websiteUrl,
          },
        ];

  const renderCalendar = (event: EventSchedule) => {
    const isThailandEvent = Boolean(event.mapUrl && event.websiteUrl);
    const venueMode: VenueMode = isThailandEvent ? "THAILAND" : "KOREA";
    const isSelected = selectedVenue === venueMode;
    const eventImages = isThailandEvent ? mellowImages : hallImages;
    const currentImageIndex = isThailandEvent ? mellowImageIndex : hallImageIndex;
    const year = event.date.getFullYear();
    const month = event.date.getMonth();
    const day = event.date.getDate();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const days = [
      ...Array(firstDayOfWeek).fill(""),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];

    return (
      <div
        key={event.title}
        role="button"
        tabIndex={0}
        onClick={() => onSelectVenue?.(venueMode)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onSelectVenue?.(venueMode);
          }
        }}
        className={`flex min-h-full cursor-pointer flex-col rounded-lg border px-2 py-3 shadow-sm transition ${
          isSelected
            ? "border-[#f4c5c5] bg-white shadow-md ring-2 ring-[#f4c5c5]/40"
            : "border-[#eadedf] bg-white/70 hover:border-[#f4c5c5]"
        }`}
      >
        <p className={`${titleSize} font-semibold text-[#444] leading-snug`}>
          {event.title}
        </p>
        <p className={`${subTextSize} mt-1 text-[#777] leading-snug`}>
          {event.place}
        </p>
        <p className={`${subTextSize} mt-2 text-[#444] font-semibold`}>
          {event.dateText}
        </p>
        <p className={`${subTextSize} text-gray-400 leading-snug`}>
          {event.timeText}
        </p>

        <div className="relative mt-3 h-[105px] w-full overflow-hidden rounded-md bg-[#f8f8f8]">
          {eventImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={isThailandEvent ? "Mellow Garden" : "JK Art Convention"}
              fill
              sizes="180px"
              className={`object-cover transition-opacity duration-[1400ms] ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {isThailandEvent ? (
          <>
            <div className="mt-3 rounded-md bg-[#fafafa] px-2 py-2">
              <p className={`${subTextSize} font-semibold text-[#555]`}>
                {lang === "ko" ? "Dress code: Pastel tone" : "Dress code: Pastel tone"}
              </p>
              <div className="mt-1 flex justify-center gap-1.5">
                {dressCodeColors.map((color) => (
                  <span
                    key={color}
                    className="h-[16px] w-[16px] rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="mt-2 text-[11px] leading-snug text-[#777]">
                {lang === "ko"
                  ? "파스텔 톤의 꽃 장식과 백드롭으로 세팅될 예정입니다."
                  : "จะตกแต่งด้วยดอกไม้โทนพาสเทลและ backdrop"}
              </p>
            </div>
          </>
        ) : (
          <div className="mt-3 rounded-md bg-[#fafafa] px-2 py-2">
            <p className={`${subTextSize} font-semibold text-[#555]`}>
              {lang === "ko" ? "Wedding hall" : "Wedding hall"}
            </p>
            <p className="mt-1 text-[11px] leading-snug text-[#777]">
              {lang === "ko"
                ? "4층 Amberluce Hall에서 예식이 진행됩니다."
                : "พิธีจัดที่ Amberluce Hall ชั้น 4"}
            </p>
          </div>
        )}

        <div className="mt-3 border-t border-b border-gray-200 py-[6px]">
          <div className={`grid grid-cols-7 ${weekSize} mb-[5px] text-gray-400`}>
            {weekDays.map((weekday, index) => (
              <span
                key={weekday}
                className={
                  index === 0
                    ? "text-[#d69fa6]"
                    : index === 6
                      ? "text-[#5569a6]"
                      : ""
                }
              >
                {weekday}
              </span>
            ))}
          </div>

          <div className={`grid grid-cols-7 gap-y-[2px] ${daySize}`}>
            {days.map((date, index) => {
              const isSunday = index % 7 === 0;
              const isSaturday = index % 7 === 6;
              const isSelected = date === day;

              return (
                <span
                  key={`${event.title}-${date}-${index}`}
                  className={`text-[#555] ${
                    isSunday ? "text-[#d69fa6]" : ""
                  } ${isSaturday ? "text-[#5569a6]" : ""} ${
                    isSelected
                      ? `bg-[#f4c5c5] text-white ${circleSize} inline-flex items-center justify-center rounded-full mx-auto`
                      : ""
                  }`}
                >
                  {date}
                </span>
              );
            })}
          </div>
        </div>

        {event.kakaoUrl && event.naverUrl && (
          <div className="mt-3 flex flex-col gap-2">
            <a
              href={event.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-1 rounded-full border border-[#ddd] bg-[#f8f8f8] px-2 py-1.5 text-[12px] text-[#333] shadow-sm transition hover:bg-[#eee]"
            >
              <Image
                src="/images/kakao_navi.svg"
                alt="kakao"
                width={16}
                height={16}
              />
              {lang === "ko" ? "카카오내비" : "Kakao Map"}
            </a>
            <a
              href={event.naverUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-1 rounded-full border border-[#ddd] bg-[#f8f8f8] px-2 py-1.5 text-[12px] text-[#333] shadow-sm transition hover:bg-[#eee]"
            >
              <Image
                src="/images/naver_map.png"
                alt="naver"
                width={16}
                height={16}
              />
              {lang === "ko" ? "네이버지도" : "Naver Map"}
            </a>
          </div>
        )}

        {event.mapUrl && event.websiteUrl && (
          <div className="mt-3 flex flex-col gap-2">
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-1 rounded-full border border-[#ddd] bg-[#f8f8f8] px-2 py-1.5 text-[12px] text-[#333] shadow-sm transition hover:bg-[#eee]"
            >
              <MapPin size={14} />
              Google Maps
            </a>
            <a
              href={event.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-1 rounded-full border border-[#ddd] bg-[#f8f8f8] px-2 py-1.5 text-[12px] text-[#333] shadow-sm transition hover:bg-[#eee]"
            >
              <ExternalLink size={14} />
              Facebook
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`${fontClass} text-center mt-3 text-[#555] ${
        lang === "th" ? "leading-[1.9]" : ""
      }`}
    >
      <div className="grid grid-cols-2 gap-2">{events.map(renderCalendar)}</div>
      <div className="mt-3 text-[12px] text-[#888]">
        {lang === "ko"
          ? "두 번의 소중한 날에 함께해 주세요."
          : "ขอเชิญมาร่วมทั้งสองวันสำคัญของเรา"}
      </div>
    </div>
  );
}
