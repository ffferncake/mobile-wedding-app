"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LanguagePopup({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const handleSelect = (lang: "th" | "ko") => {
    // ✅ 언어 선택 저장 (핵심🔥)
    localStorage.setItem("langSelected", "true");
    localStorage.setItem("lang", lang);

    onClose();

    setTimeout(() => {
      if (lang === "th") {
        router.push("/th");
      } else {
        router.push("/");
      }
    }, 100);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-[85%] max-w-[320px] text-center shadow-xl animate-fadeIn">
        <h2 className="text-xl text-gray-500 font-semibold mb-2">
          <span className="pg-bathbomb">language / ภาษา</span>
        </h2>

        <div className="flex gap-3">
          <button
            onClick={() => handleSelect("ko")}
            className="flex-1 py-3 text-gray-500 rounded-xl bg-gray-100 hover:bg-gray-200 transition typo-crayon-font"
          >
            🇰🇷 한국어
          </button>

          <button
            onClick={() => handleSelect("th")}
            className="flex-1 py-3 text-gray-500 rounded-xl bg-gray-100 hover:bg-gray-200 transition pg-bathbomb"
          >
            🇹🇭 ไทย
          </button>
        </div>
      </div>
    </div>
  );
}
