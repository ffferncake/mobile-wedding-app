"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import WeddingCalendar from "../wedding-calendar";

type Props = {
  lang: "ko" | "th";
  selectedVenue?: VenueMode;
  onSelectVenue?: (venue: VenueMode) => void;
};

type VenueMode = "KOREA" | "THAILAND";
type TimeLeft = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const hallImages = [
  "/images/hall_1.jpg",
  "/images/hall_2.jpg",
  "/images/hall_3.jpg",
];

const mellowImages = [
  "/images/mellow_1.jpg",
  "/images/mellow_2.jpg",
  "/images/mellow_3.jpg",
  "/images/mellow_4.jpg",
];

const emptyTimeLeft: TimeLeft = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

const countdownTargets = {
  KOREA: new Date("2026-09-13T14:00:00+09:00"),
  THAILAND: new Date("2026-12-26T18:00:00+07:00"),
};

export default function WeddingInfoSection({
  lang,
  selectedVenue: controlledSelectedVenue,
  onSelectVenue,
}: Props) {
  const isTH = lang === "th";

  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";
  const sectionSize = isTH ? "text-[20px]" : "text-[13px]";
  const titleSize = isTH ? "text-[22px]" : "text-[16px]";
  const highlightSize = isTH ? "text-[24px]" : "text-[18px]";

  const hallNameSize = isTH ? "text-[23px]" : "text-[18px]";
  const subTextSize = isTH ? "text-[18px]" : "text-[14px]";
  const countNumberSize = isTH ? "text-[18px]" : "text-[16px]";
  const countLabelSize = isTH ? "text-[13px]" : "text-[11px]";

  const [internalSelectedVenue, setInternalSelectedVenue] =
    useState<VenueMode>("KOREA");
  const selectedVenue = controlledSelectedVenue ?? internalSelectedVenue;
  const setSelectedVenue = (venue: VenueMode) => {
    setInternalSelectedVenue(venue);
    onSelectVenue?.(venue);
  };
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  const [countdowns, setCountdowns] = useState<Record<VenueMode, TimeLeft>>({
    KOREA: emptyTimeLeft,
    THAILAND: emptyTimeLeft,
  });

  const previewImages = selectedVenue === "KOREA" ? hallImages : mellowImages;
  const selectedInfo =
    selectedVenue === "KOREA"
      ? {
          label: lang === "ko" ? "한국 결혼식" : "พิธีแต่งงานที่เกาหลี",
          name:
            lang === "ko"
              ? "JK Art Convention (JK아트컨벤션)"
              : "JK Art Convention",
          address:
            lang === "ko"
              ? "4층 Amberluce Hall (엠버루체홀)"
              : "ชั้น 4 Amberluce Hall",
          detail:
            lang === "ko"
              ? "서울특별시 영등포구 문래로 164"
              : "164 Mullae-ro, Yeongdeungpo-gu, Seoul",
          link: "http://www.jkart.co.kr/wedding/amberluce/",
        }
      : {
          label:
            lang === "ko"
              ? "태국 축하 파티 & After Party"
              : "งานฉลองที่ไทย & After Party",
          name: "Mellow Garden Wine & Dine Restaurant",
          address:
            lang === "ko"
              ? "10/895 Prasert-Manukitch Rd, Soi 33"
              : "10/895 ถนนประเสริฐมนูญกิจ ซอย 33",
          detail:
            lang === "ko"
              ? "Nuanchan, Bueng Kum, Bangkok 10230"
              : "แขวงนวลจันทร์ เขตบึงกุ่ม กรุงเทพฯ 10230",
          link: "https://www.facebook.com/MellowGardenWineDineRestaurant",
        };

  // slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPreviewIndex((prev) => (prev + 1) % previewImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [previewImages.length]);

  useEffect(() => {
    setCurrentPreviewIndex(0);
  }, [selectedVenue]);

  // countdown
  useEffect(() => {
    const getTimeLeft = (target: Date): TimeLeft => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        return emptyTimeLeft;
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

      return { days, hours, minutes, seconds };
    };

    const update = () => {
      setCountdowns({
        KOREA: getTimeLeft(countdownTargets.KOREA),
        THAILAND: getTimeLeft(countdownTargets.THAILAND),
      });
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdownCards = [
    {
      venue: "KOREA" as const,
      title: lang === "ko" ? "🇰🇷 Korea" : "🇰🇷 Korea",
      time: countdowns.KOREA,
    },
    {
      venue: "THAILAND" as const,
      title: lang === "ko" ? "🇹🇭 Thailand" : "🇹🇭 Thailand",
      time: countdowns.THAILAND,
    },
  ];

  const renderCountdown = (item: (typeof countdownCards)[number]) => {
    const isSelected = selectedVenue === item.venue;
    const values = [
      { value: item.time.days, label: lang === "ko" ? "일" : "วัน" },
      { value: item.time.hours, label: lang === "ko" ? "시간" : "ชม." },
      { value: item.time.minutes, label: lang === "ko" ? "분" : "นาที" },
      { value: item.time.seconds, label: lang === "ko" ? "초" : "วิ" },
    ];

    return (
      <button
        key={item.venue}
        onClick={() => setSelectedVenue(item.venue)}
        className={`${fontClass} rounded-lg border px-2 py-3 transition ${
          isSelected
            ? "border-[#f4c5c5] bg-white shadow-md ring-2 ring-[#f4c5c5]/40"
            : "border-[#eadedf] bg-white/70"
        }`}
      >
        <p className={`${fontClass} ${subTextSize} font-semibold text-[#444]`}>
          {item.title}
        </p>
        <div className="mt-2 grid grid-cols-4 gap-1">
          {values.map((value) => (
            <div key={value.label} className={`${fontClass} text-center`}>
              <div
                className={`${fontClass} rounded-md bg-[#f3f3f3] px-1 py-1 font-bold shadow-sm ${countNumberSize}`}
              >
                {value.value}
              </div>
              <div
                className={`${fontClass} mt-1 text-[#444] font-medium ${countLabelSize}`}
              >
                {value.label}
              </div>
            </div>
          ))}
        </div>
      </button>
    );
  };

  return (
    <div id="weddinginfo" className={`section ${fontClass} ${sectionSize}`}>
      <p className={`title-en ${fontClass} ${titleSize}`}>WEDDING HALL</p>

      <h3 className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "ko" ? "예식 안내" : "รายละเอียดสถานที่จัดงาน"}
      </h3>

      <div className="flex justify-center gap-2 mb-4 mt-4">
        <button
          onClick={() => setSelectedVenue("KOREA")}
          className={`px-[14px] py-[6px] rounded-full border ${subTextSize} transition ${fontClass} ${
            selectedVenue === "KOREA"
              ? "bg-[#111] text-white"
              : "bg-white text-black border-[#ddd]"
          }`}
        >
          {lang === "ko" ? "한국 결혼식" : "งานแต่งที่เกาหลี"}
        </button>

        <button
          onClick={() => setSelectedVenue("THAILAND")}
          className={`px-[14px] py-[6px] rounded-full border ${subTextSize} transition ${fontClass} ${
            selectedVenue === "THAILAND"
              ? "bg-[#111] text-white"
              : "bg-white text-black border-[#ddd]"
          }`}
        >
          {lang === "ko"
            ? "태국 축하 파티 & After Party"
            : "งานฉลองที่ไทย & After Party"}
        </button>
      </div>

      <div className="text-center text-[13px] leading-[1.8] mb-[10px]">
        <p className={`text-[#8DBEE1] ${subTextSize}`}>
          {selectedInfo.label}
        </p>
        <p className={`font-semibold ${hallNameSize}`}>
          {selectedInfo.name}
        </p>

        <p className={`text-[#888] ${subTextSize}`}>{selectedInfo.address}</p>
        <p className={`text-[#888] ${subTextSize}`}>{selectedInfo.detail}</p>
      </div>

      {/* slideshow */}
      <div className="relative w-full h-[220px] overflow-hidden rounded-lg cursor-pointer">
        {previewImages.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt={selectedInfo.name}
            fill
            className={`absolute inset-0 object-cover transition-opacity duration-[1600ms] ${
              idx === currentPreviewIndex ? "opacity-100" : "opacity-0"
            }`}
            onClick={() =>
              window.open(selectedInfo.link, "_blank", "noopener,noreferrer")
            }
          />
        ))}
      </div>

      <WeddingCalendar
        lang={lang}
        selectedVenue={selectedVenue}
        onSelectVenue={setSelectedVenue}
      />

      {/* countdown */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {countdownCards.map(renderCountdown)}
      </div>
    </div>
  );
}
