"use client";

import Image from "next/image";

export default function InvitationSection() {
  return (
    <div id="message" className="section">
      <p className="title-en">INVITATION</p>
      <p className="highlight">소중한 분들을 초대합니다.</p>

      <p className="mt-2.5">서로를 만나</p>
      <p>웃음이 더 많아진 저희 두 사람이</p>
      <p>이제 평생의 짝이 되려 합니다.</p>

      <p className="mt-2.5">기쁜 날,</p>
      <p>소중한 분들과</p>
      <p>행복한 순간을 함께하고 싶습니다.</p>

      <p>따뜻한 마음으로</p>
      <p>축복해 주세요 🌷</p>

      {/* 부모님 소개 */}
      <div className="mt-6 text-center text-[16px] leading-[1.8] text-[#333] flex flex-row items-start justify-center">
        <div className="flex flex-col">
          <div className="flex items-center w-full">
            <p className="font-medium min-w-[70px]">유영운</p>
            <p className="mx-2">·</p>
            <p className="font-medium w-[100px]">신혜원</p>
            <p>의 아들 🤵🏻</p>
          </div>

          <div className="flex items-center w-full">
            <p className="font-medium min-w-[70px]">Nhong</p>
            <p className="mx-2">·</p>
            <p className="font-medium w-[100px]">Kagh</p>
            <p>의 딸 👰🏻‍♀️</p>
          </div>
        </div>
      </div>

      {/* 신랑 신부 */}
      <div className="mt-[20px] flex flex-row items-center justify-center gap-[30px]">
        {/* Groom */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/oppa_kids_ver.png"
            alt="oppa img"
            width={100}
            height={100}
          />

          <div className="flex flex-row items-center justify-center gap-[10px] mt-[10px]">
            <p className="font-bold text-[16px]">유은상</p>

            <a
              href="tel:01033883415"
              className="inline-block text-[22px] cursor-pointer animate-bounce"
            >
              📞
            </a>
          </div>

          <p className="text-sm mt-[4px]">92년산 🍾🐒✨</p>
          <p className="text-sm">건축공학 엔지니어</p>
        </div>

        {/* Bride */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/me_kids_ver.png"
            alt="my img"
            width={100}
            height={100}
          />

          <div className="flex flex-row items-center justify-center gap-[10px] mt-[10px]">
            <p className="font-bold text-[16px]">펀 | FERN</p>

            <a
              href="tel:01053349912"
              className="inline-block text-[22px] cursor-pointer animate-bounce"
            >
              📞
            </a>
          </div>

          <p className="text-sm mt-[4px]">99년산 🍼🐰💖</p>
          <p className="text-sm">프론트엔드 개발자</p>
        </div>
      </div>
    </div>
  );
}
