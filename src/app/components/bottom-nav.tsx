"use client";

import { LucideIcon, Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

type NavItem = {
  icon: LucideIcon;
  label: string;
};

type Props = {
  navItems: NavItem[];
  activeIndex: number;
  onClick: (index: number) => void;
};

export default function BottomNav({ navItems, activeIndex, onClick }: Props) {
  const pathname = usePathname();

  const lang: "ko" | "th" = pathname.startsWith("/th") ? "th" : "ko";

  const handleLangChange = (target: "ko" | "th") => {
    if (target === lang) return;

    localStorage.setItem("lang", target);

    window.location.href = target === "th" ? "/th" : "/";
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[410px] z-50 flex flex-col gap-2">
      {/* 🌐 language switch */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-xl bg-white/70 border border-white/30 shadow-md text-xs">
          <Globe size={14} className="text-gray-600" />

          <button
            onClick={() => handleLangChange("ko")}
            className={`px-2 py-[2px] rounded-full transition-all duration-200 ${
              lang === "ko"
                ? "bg-black text-white scale-105"
                : "text-gray-500 hover:bg-white"
            }`}
          >
            KR
          </button>

          <button
            onClick={() => handleLangChange("th")}
            className={`px-2 py-[2px] rounded-full transition ${
              lang === "th"
                ? "bg-black text-white"
                : "text-gray-500 hover:bg-white"
            }`}
          >
            TH
          </button>
        </div>
      </div>

      {/* bottom nav */}
      <div className="relative flex items-center backdrop-blur-xl bg-white/70 border border-white/30 rounded-full px-2 shadow-lg">
        {/* active indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[48px] bg-white rounded-full shadow-md transition-all duration-300"
          style={{
            width: `calc((100% - 16px) / ${navItems.length})`,
            left: `calc(${activeIndex} * ((100% - 16px) / ${navItems.length}) + 8px)`,
          }}
        />

        {navItems.map(({ icon: Icon, label }, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={index}
              onClick={() => onClick(index)}
              className="relative z-10 flex flex-col items-center justify-center flex-1 h-[56px] gap-1"
            >
              <Icon
                size={18}
                className={isActive ? "text-black scale-105" : "text-gray-400"}
              />

              <span
                className={
                  isActive
                    ? "text-[8px] text-black font-medium"
                    : "text-[8px] text-gray-400"
                }
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
