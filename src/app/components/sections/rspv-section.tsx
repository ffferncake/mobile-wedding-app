"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

type Props = {
  lang: "ko" | "th";
};

export default function RSVPSection({ lang }: Props) {
  const [attend, setAttend] = useState<"yes" | "no" | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const isTH = lang === "th";

  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";
  const sectionSize = isTH ? "text-[20px]" : "text-[13px]";
  const titleSize = isTH ? "text-[22px]" : "text-[16px]";
  const highlightSize = isTH ? "text-[24px]" : "text-[18px]";
  const subTextSize = isTH ? "text-[18px]" : "text-[14px]";

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

    setLoading(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxq5u4TXvYFs3xGc2MvGeJ10UeXL4ddOQ-_eHeDpO9ra81Ylu6kKuXf9YpgIajgwOkL/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            name: name,
            attend:
              attend === "yes"
                ? lang === "ko"
                  ? "참석"
                  : "เข้าร่วม"
                : lang === "ko"
                  ? "불참"
                  : "ไม่เข้าร่วม",
          }),
        },
      );

      alert(lang === "ko" ? "전송 완료 🎉" : "ส่งเรียบร้อย 🎉");

      setName("");
      setAttend(null);
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
        className={`mt-3 text-gray-600 ${fontClass} ${subTextSize} leading-relaxed`}
      >
        {lang === "ko"
          ? "참석 여부를 선택 후 전달해 주세요."
          : "กรุณาเลือกและส่งสถานะการเข้าร่วม"}
      </p>

      {/* 참석 여부 */}
      <div className={`flex gap-2 mt-3 ${subTextSize} justify-center`}>
        <button
          onClick={() => setAttend("yes")}
          disabled={loading}
          className={`px-4 py-1.5 rounded-full border ${fontClass} transition flex items-center gap-1 ${
            attend === "yes"
              ? "border-[#c48a8a] bg-[#fff5f5] text-[#c48a8a]"
              : "border-gray-200 text-gray-400"
          }`}
        >
          🙌🏼 {lang === "ko" ? "참석" : "เข้าร่วม"}
        </button>

        <button
          onClick={() => setAttend("no")}
          disabled={loading}
          className={`px-4 py-1.5 rounded-full border ${fontClass} transition flex items-center gap-1 ${
            attend === "no"
              ? "border-[#c48a8a] bg-[#fff5f5] text-[#c48a8a]"
              : "border-gray-200 text-gray-400"
          }`}
        >
          🙏 {lang === "ko" ? "불참" : "ไม่เข้าร่วม"}
        </button>
      </div>

      {/* 이름 */}
      <div className="mt-3 flex flex-col items-center gap-3">
        <div className="w-[260px] max-w-[80%]">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className={`w-full border-b border-gray-300 py-2 outline-none text-center text-gray-800 ${fontClass} placeholder-gray-400 bg-transparent ${subTextSize}`}
            placeholder={
              lang === "ko" ? "성함을 입력해 주세요" : "กรุณากรอกชื่อ"
            }
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className={`w-full mt-3 py-2.5 rounded-full border border-[#e5caca] text-[#c48a8a] ${fontClass} hover:bg-[#fff5f5] transition ${subTextSize} disabled:opacity-50 flex items-center justify-center gap-2`}
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
