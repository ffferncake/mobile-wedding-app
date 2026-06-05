"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

type Props = {
  lang: "ko" | "th";
  compact?: boolean;
};

export default function RSVPSection({ lang, compact = false }: Props) {
  const [attend, setAttend] = useState<"yes" | "no" | null>(null);
  const [eventLocation, setEventLocation] = useState<
    "korea" | "thailand" | "both" | null
  >(null);
  const [guestSide, setGuestSide] = useState<"bride" | "groom" | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const isTH = lang === "th";

  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";
  const sectionSize = compact
    ? isTH
      ? "text-[16px]"
      : "text-[11px]"
    : isTH
      ? "text-[20px]"
      : "text-[13px]";
  const titleSize = compact
    ? isTH
      ? "text-[17px]"
      : "text-[13px]"
    : isTH
      ? "text-[22px]"
      : "text-[16px]";
  const highlightSize = compact
    ? isTH
      ? "text-[19px]"
      : "text-[15px]"
    : isTH
      ? "text-[24px]"
      : "text-[18px]";
  const subTextSize = compact
    ? isTH
      ? "text-[15px]"
      : "text-[12px]"
    : isTH
      ? "text-[18px]"
      : "text-[14px]";
  const blockGap = compact ? "mt-2" : "mt-3";
  const labelGap = compact ? "mb-1" : "mb-2";
  const buttonPadding = compact ? "px-3 py-1" : "px-4 py-1.5";
  const smallButtonPadding = compact ? "px-2.5 py-1" : "px-3 py-1.5";
  const buttonGap = compact ? "gap-1.5" : "gap-2";

  const handleSend = async () => {
    if (!attend) {
      alert(
        lang === "ko"
          ? "참석 여부를 선택해주세요"
          : "กรุณาเลือกว่าจะเข้าร่วมหรือไม่",
      );
      return;
    }

    if (!name) {
      alert(lang === "ko" ? "이름을 입력해주세요" : "กรุณากรอกชื่อ");
      return;
    }

    if (!guestSide) {
      alert(
        lang === "ko"
          ? "신부측/신랑측을 선택해주세요"
          : "กรุณาเลือกฝั่งเจ้าสาวหรือเจ้าบ่าว",
      );
      return;
    }

    if (attend === "yes" && !eventLocation) {
      alert(
        lang === "ko"
          ? "참석하실 장소를 선택해주세요"
          : "กรุณาเลือกสถานที่ที่จะเข้าร่วม",
      );
      return;
    }

    setLoading(true);

    const attendText =
      attend === "yes"
        ? lang === "ko"
          ? "참석"
          : "เข้าร่วม"
        : lang === "ko"
          ? "불참"
          : "ไม่เข้าร่วม";

    const locationText =
      attend === "yes" && eventLocation
        ? eventLocation === "korea"
          ? lang === "ko"
            ? "한국"
            : "Korea"
          : eventLocation === "thailand"
            ? lang === "ko"
              ? "태국"
              : "Thailand"
            : lang === "ko"
              ? "한국 + 태국"
              : "Korea + Thailand"
        : "-";

    const sideText =
      guestSide === "bride"
        ? lang === "ko"
          ? "신부측"
          : "Bride side"
        : lang === "ko"
          ? "신랑측"
          : "Groom side";

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbykQ8_mNhxJ_pFiq5v9ZdKiSbpejpE5fX6LMlAPOSijDgP5zfH9Jxr8sfVX9nft7h7X/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            name: name,
            attend: attendText,
            location: locationText,
            side: sideText,
          }),
        },
      );

      alert(lang === "ko" ? "전송 완료 🎉" : "ส่งเรียบร้อย 🎉");

      setName("");
      setAttend(null);
      setEventLocation(null);
      setGuestSide(null);
    } catch (error) {
      console.error(error);
      alert(lang === "ko" ? "전송 실패 😢" : "ส่งไม่สำเร็จ 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`section text-center ${fontClass} ${sectionSize}`}>
      <p className={`title-en ${fontClass} ${titleSize}`}>R.S.V.P.</p>

      <h3 className={`highlight ${fontClass} text-[#c48a8a] ${highlightSize}`}>
        {lang === "ko" ? "참석 의사 전달" : "ยืนยันการเข้าร่วม"}
      </h3>

      <p
        className={`${blockGap} text-gray-600 ${fontClass} ${subTextSize} leading-relaxed`}
      >
        {lang === "ko"
          ? "참석 여부를 선택 후 전달해 주세요."
          : "กรุณาเลือกและส่งสถานะการเข้าร่วม"}
      </p>

      {/* 참석 여부 */}
      <div className={`flex ${buttonGap} ${blockGap} ${subTextSize} justify-center`}>
        <button
          onClick={() => setAttend("yes")}
          disabled={loading}
          className={`${buttonPadding} rounded-full border ${fontClass} transition flex items-center gap-1 ${
            attend === "yes"
              ? "border-[#c48a8a] bg-[#fff5f5] text-[#c48a8a]"
              : "border-gray-200 text-gray-400"
          }`}
        >
          🙌🏼 {lang === "ko" ? "참석" : "เข้าร่วม"}
        </button>

        <button
          onClick={() => {
            setAttend("no");
            setEventLocation(null);
          }}
          disabled={loading}
          className={`${buttonPadding} rounded-full border ${fontClass} transition flex items-center gap-1 ${
            attend === "no"
              ? "border-[#c48a8a] bg-[#fff5f5] text-[#c48a8a]"
              : "border-gray-200 text-gray-400"
          }`}
        >
          🙏 {lang === "ko" ? "불참" : "ไม่เข้าร่วม"}
        </button>
      </div>

      {/* 신부측 / 신랑측 */}
      <div className={`${blockGap} ${subTextSize}`}>
        <p className={`${fontClass} ${labelGap} text-[#666]`}>
          {lang === "ko" ? "어느 쪽 하객이신가요?" : "ฝั่งเจ้าสาวหรือเจ้าบ่าว"}
        </p>

        <div className={`flex flex-wrap justify-center ${buttonGap}`}>
          {[
            {
              value: "bride" as const,
              label: lang === "ko" ? "👰 신부측" : "👰 เจ้าสาว",
            },
            {
              value: "groom" as const,
              label: lang === "ko" ? "🤵 신랑측" : "🤵 เจ้าบ่าว",
            },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setGuestSide(item.value)}
              disabled={loading}
              className={`${smallButtonPadding} rounded-full border ${fontClass} transition ${
                guestSide === item.value
                  ? "border-[#c48a8a] bg-[#fff5f5] text-[#c48a8a]"
                  : "border-gray-200 text-gray-400"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 참석 장소 */}
      <div className={`${blockGap} ${subTextSize}`}>
        <p className={`${fontClass} ${labelGap} text-[#666]`}>
          {lang === "ko"
            ? "참석하실 장소"
            : "สถานที่ที่จะเข้าร่วม"}
        </p>

        <div className={`flex flex-wrap justify-center ${buttonGap}`}>
          {[
            {
              value: "korea" as const,
              label: lang === "ko" ? "🇰🇷 한국" : "🇰🇷 Korea",
            },
            {
              value: "thailand" as const,
              label: lang === "ko" ? "🇹🇭 태국" : "🇹🇭 Thailand",
            },
            {
              value: "both" as const,
              label: lang === "ko" ? "🇰🇷+🇹🇭 둘 다" : "🇰🇷+🇹🇭 Both",
            },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setEventLocation(item.value)}
              disabled={loading || attend === "no"}
              className={`${smallButtonPadding} rounded-full border ${fontClass} transition ${
                eventLocation === item.value
                  ? "border-[#c48a8a] bg-[#fff5f5] text-[#c48a8a]"
                  : "border-gray-200 text-gray-400"
              } ${attend === "no" ? "opacity-40" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 이름 */}
      <div className={`${blockGap} flex flex-col items-center ${compact ? "gap-2" : "gap-3"}`}>
        <div className="w-[260px] max-w-[80%]">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className={`w-full border-b border-gray-300 ${compact ? "py-1.5" : "py-2"} outline-none text-center text-gray-800 ${fontClass} placeholder-gray-400 bg-transparent ${subTextSize}`}
            placeholder={
              lang === "ko" ? "성함을 입력해 주세요" : "กรุณากรอกชื่อ"
            }
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className={`w-full ${blockGap} ${compact ? "py-2" : "py-2.5"} rounded-full border border-[#e5caca] text-[#c48a8a] ${fontClass} hover:bg-[#fff5f5] transition ${subTextSize} disabled:opacity-50 flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {lang === "ko" ? "전송 중..." : "กำลังส่ง..."}
              </>
            ) : lang === "ko" ? (
              "보내기"
            ) : (
              "ส่ง"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
