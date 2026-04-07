"use client";

import { Share2 } from "lucide-react";

type Props = {
  lang: "ko" | "th";
};

export default function ShareSection({ lang }: Props) {
  const fontClass = lang === "th" ? "pg-bathbomb" : "typo-crayon-font";

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);

    alert(
      lang === "ko"
        ? "초대장 링크가 복사되었습니다 💌"
        : "คัดลอกลิงก์คำเชิญเรียบร้อยแล้ว 💌",
    );
  };

  return (
    <div className="mt-6 flex justify-center">
      <button
        onClick={copyLink}
        className={`flex items-center gap-2 bg-[#f3f3f3] border border-[#ddd] px-4 py-2 rounded-full text-sm text-black transition-all duration-200 hover:bg-black hover:text-white hover:border-black hover:-translate-y-[1px] hover:shadow-md ${fontClass}`}
      >
        <Share2 size={16} />

        {lang === "ko" ? "초대장 링크 복사" : "คัดลอกลิงก์คำเชิญ"}
      </button>
    </div>
  );
}
