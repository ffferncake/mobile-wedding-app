"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "../WeddingInvitation.module.css";
import { cn } from "../lib/utils";

interface HeaderProps {
  showHeader: boolean;
  isMuted: boolean;
  toggleMute: () => void;
}

export default function Header({
  showHeader,
  isMuted,
  toggleMute,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ease-in-out",
          showHeader
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full",
        )}
      >
        <header className="pointer-events-auto flex items-center justify-between px-5 py-3 shadow-sm sticky top-0 z-[999] max-w-[420px] mx-auto bg-white">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="bg-transparent border-none cursor-pointer z-[1300]"
          >
            <Image
              src="/images/icon/hamburger_icon.svg"
              alt="menu"
              width={24}
              height={24}
            />
          </button>

          <div className="text-sm font-medium flex items-center gap-1.5 text-[#333]">
            은상<span className="text-base">💍</span>펀
          </div>

          <button
            onClick={toggleMute}
            className="bg-none border-none cursor-pointer p-0"
          >
            <Image
              src={
                isMuted
                  ? "/images/icon/volume_off.svg"
                  : "/images/icon/volume_on.svg"
              }
              alt="audio control"
              width={20}
              height={20}
            />
          </button>
        </header>
      </div>

      {/* Hamburger menu */}
      {isMenuOpen && (
        <div className="absolute top-[48px] left-0 w-full flex justify-center z-[998] bg-transparent">
          <div className="w-full max-w-[420px] bg-white flex flex-col p-[14px] shadow-lg">
            <a
              href="#message"
              className="text-[13px] text-[#333] no-underline p-2 hover:bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#message");
              }}
            >
              초대글
            </a>

            <a
              href="#weddinginfo"
              className="text-[13px] text-[#333] no-underline p-2 hover:bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#weddinginfo");
              }}
            >
              예식안내
            </a>

            <a
              href="#accountnumber"
              className="text-[13px] text-[#333] no-underline p-2 hover:bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#accountnumber");
              }}
            >
              마음 전하실 곳
            </a>

            <a
              href="#location"
              className="text-[13px] text-[#333] no-underline p-2 hover:bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#location");
              }}
            >
              오시는길
            </a>

            <a
              href="#gallery"
              className="text-[13px] text-[#333] no-underline p-2 hover:bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#gallery");
              }}
            >
              웨딩 갤러리
            </a>
          </div>
        </div>
      )}
    </>
  );
}
