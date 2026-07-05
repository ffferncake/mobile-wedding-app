"use client";

import { Share2 } from "lucide-react";

type Props = {
  lang: "ko" | "th";
};

export default function ShareSection({ lang }: Props) {
  const isTH = lang === "th";

  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";
  const subTextSize = isTH ? "text-[18px]" : "text-[14px]";
  const shareTitle = isTH ? "คำเชิญงานแต่งงาน" : "청첩장";
  const shareText = isTH
    ? "ขอเชิญร่วมแสดงความยินดีในวันแต่งงานของเรา"
    : "저희 결혼식에 초대합니다.";

  const copyLink = async () => {
    const url = window.location.href;

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    alert(
      lang === "ko"
        ? "초대장 링크가 복사되었습니다 💌"
        : "คัดลอกลิงก์คำเชิญเรียบร้อยแล้ว 💌",
    );
  };

  const shareInvitation = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    await copyLink();
  };

  return (
    <div className="mt-6 flex justify-center">
      <button
        onClick={shareInvitation}
        className={`flex items-center gap-2 bg-[#f3f3f3] border border-[#ddd] px-4 py-2 rounded-full text-sm text-black transition-all duration-200 hover:bg-black hover:text-white hover:border-black hover:-translate-y-[1px] hover:shadow-md ${fontClass} ${subTextSize}`}
      >
        <Share2 size={16} />

        {lang === "ko" ? "초대장 공유하기" : "แชร์คำเชิญ"}
      </button>
    </div>
  );
}
