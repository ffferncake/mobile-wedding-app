"use client";

import Image from "next/image";
import { X } from "lucide-react";
import RSVPSection from "./sections/rspv-section";

type Props = {
  lang: "ko" | "th";
  isOpen: boolean;
  doNotShowToday: boolean;
  onDoNotShowTodayChange: (checked: boolean) => void;
  onClose: () => void;
};

export default function RsvpModal({
  lang,
  isOpen,
  doNotShowToday,
  onDoNotShowTodayChange,
  onClose,
}: Props) {
  const isTH = lang === "th";
  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1600] flex items-center justify-center bg-black/45 px-4 backdrop-blur-[3px]"
      role="dialog"
      aria-modal="true"
      aria-label={isTH ? "ยืนยันการเข้าร่วม" : "참석 의사 전달"}
    >
      <div className="relative w-full max-w-[340px]">
        <div className="relative z-[1] mx-auto max-h-[74dvh] w-[86%] overflow-hidden rounded-[22px] border-[2px] border-[#f2dce6] bg-[#fff3fb] shadow-[0_18px_45px_rgba(70,48,48,0.18)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px),radial-gradient(#00000005_1px,transparent_1px),linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,240,249,0.55))] bg-[length:5px_5px,7px_7px,100%_100%]" />

          <button
            type="button"
            onClick={onClose}
            aria-label={isTH ? "ปิด" : "닫기"}
            className="absolute right-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[#e8d5d6] bg-white/90 text-[#4f4444] shadow-md transition hover:bg-[#fff5f5]"
          >
            <X size={19} />
          </button>

          <div className="scrollbar-hide relative max-h-[74dvh] overflow-y-auto px-3 pb-5">
          <div className={`mx-auto mb-1 text-center ${fontClass}`}>
            <div className="mx-auto flex h-24 w-28 items-center justify-center">
              <Image
                src="/images/kids_map_icon.png"
                alt=""
                width={112}
                height={112}
                className="h-[104px] w-[104px] object-contain"
              />
            </div>
            <div className="mx-auto -mt-4 h-[1px] w-16 bg-[#d9aeb1]" />
          </div>

          <div className="[&_.title-en]:!text-[#8d7e82] [&_.highlight]:!text-[#b86f76] [&_p]:!text-[#4f4a4a] [&_button]:!text-[#6b6262] [&_input]:!text-[#3f3838] [&_input::placeholder]:!text-[#8d8588]">
            <RSVPSection lang={lang} compact />
          </div>

          <label
            className={`mt-3 flex items-center justify-center gap-1.5 text-[#5b5154] ${fontClass} ${
              isTH ? "text-[14px]" : "text-[11px]"
            }`}
          >
            <input
              type="checkbox"
              checked={doNotShowToday}
              onChange={(event) =>
                onDoNotShowTodayChange(event.target.checked)
              }
              className="grid h-4 w-4 appearance-none place-items-center rounded-[4px] border-2 border-[#8f8588] bg-transparent transition checked:border-[#4f4a4a] checked:bg-[#4f4a4a] checked:after:block checked:after:h-2 checked:after:w-1 checked:after:rotate-45 checked:after:border-b-2 checked:after:border-r-2 checked:after:border-white checked:after:content-['']"
            />
            {isTH ? "ไม่แสดงอีกวันนี้" : "오늘 그만 보기"}
          </label>
          </div>
        </div>
      </div>
    </div>
  );
}
