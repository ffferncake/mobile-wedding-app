"use client";

import Image from "next/image";
import styles from "../../WeddingInvitation.module.css";

export default function InvitationSection() {
  return (
    <div id="message" className="section">
      <p className="title-en">INVITATION</p>
      <p className="highlight">소중한 분들을 초대합니다.</p>

      <p className="mt-2.5">작은 인연으로 만나 연인이 된 저희가</p>
      <p>이제는 더욱 단단한 인연을 맺고자</p>
      <p>저희 두 사람 결혼합니다.</p>

      <p className="mt-2.5">
        귀한 걸음으로 축하해 주시면
        <br />더 없는 기쁨으로 간직하겠습니다.
      </p>

      {/* 부모님 소개 */}
      <div className="mt-[30px] text-center text-[16px] leading-[1.8] text-[#333] flex flex-row items-start justify-center">
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
      <div className="mt-[20px] flex flex-row items-center justify-center gap-[20px]">
        <div className="flex flex-col items-center">
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
              className="inline-block text-[24px] ml-[6px] cursor-pointer animate-bounce relative"
            >
              📞
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src="/images/me_kids_ver.png"
            alt="my img"
            width={100}
            height={100}
          />

          <div className="flex flex-row items-center justify-center gap-[10px] mt-[10px]">
            <p className="font-bold text-[16px]">펀</p>

            <a
              href="tel:01053349912"
              className="inline-block text-[24px] ml-[6px] cursor-pointer animate-bounce relative"
            >
              📞
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
