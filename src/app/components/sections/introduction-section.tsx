"use client";

import Image from "next/image";

export default function IntroductionSection() {
  return (
    <>
      <div id="introduction" className="section">
        <p className="title-en">INTRODUCTION</p>
        <h3 className="highlight">신랑 & 신부 소개합니다</h3>
      </div>

      <div className="mt-[20px] flex flex-row items-center justify-center gap-[20px]">
        <div className="flex flex-col items-center">
          <Image
            src="/images/oppa_kids_ver.png"
            alt="groom img"
            width={150}
            height={150}
          />
          <h3 className="text-[16px] font-bold mt-[10px]">유은상</h3>
          <p className="text-sm">92년산 🍾🐒✨</p>
          <p className="text-sm">건축공학 엔지니어</p>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src="/images/me_kids_ver.png"
            alt="bride img"
            width={150}
            height={150}
          />
          <h3 className="text-[16px] font-bold mt-[10px]">펀 | FERN</h3>
          <p className="text-sm">99년산 🍼🐰💖</p>
          <p className="text-sm">프론트엔드 개발자</p>
        </div>
      </div>
    </>
  );
}
