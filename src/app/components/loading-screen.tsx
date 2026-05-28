"use client";

type Props = {
  lang: "ko" | "th";
  progress: number;
  isReady: boolean;
};

export default function LoadingScreen({ lang, progress, isReady }: Props) {
  const isTH = lang === "th";
  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";

  return (
    <div
      className={`fixed inset-0 z-[2000] flex items-center justify-center bg-[#fdfaf6] transition-opacity duration-700 ${
        isReady ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={isReady}
    >
      <div className={`w-full max-w-[320px] px-8 text-center ${fontClass}`}>
        <div className="mx-auto mb-5 h-14 w-14 animate-pulse rounded-full bg-[url('/images/icon/flowers.png')] bg-contain bg-center bg-no-repeat" />

        <p className="text-[20px] text-[#444]">
          {isTH ? "กำลังเตรียมการ์ดเชิญ" : "초대장을 준비하고 있어요"}
        </p>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#eadedf]">
          <div
            className="h-full rounded-full bg-[#e9b8bd] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-[13px] text-[#9a8f93]">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
