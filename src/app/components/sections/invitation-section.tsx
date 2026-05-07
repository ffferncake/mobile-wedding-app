"use client";

import Image from "next/image";

type Props = {
  lang: "ko" | "th";
};

export default function InvitationSection({ lang }: Props) {
  const isTH = lang === "th";

  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";
  const sectionSize = isTH ? "text-[20px]" : "text-[13px]";
  const titleSize = isTH ? "text-[22px]" : "text-[16px]";
  const contentSize = isTH ? "text-[16px]" : "text-[16px]";
  const highlightSize = isTH ? "text-[24px]" : "text-[18px]";
  const subTextSize = isTH ? "text-[18px]" : "text-[14px]";

  return (
    <div
      id="message"
      className={`section text-center ${fontClass} ${sectionSize}`}
    >
      <p className={`title-en ${fontClass} ${titleSize}`}>INVITATION</p>

      <p className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "ko"
          ? "소중한 분들을 초대합니다."
          : "ขอเรียนเชิญทุกท่านมาร่วมเป็นเกียรติ"}
      </p>

      {lang === "ko" ? (
        <>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>서로를 만나</p>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            웃음이 더 많아진 저희 두 사람이
          </p>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            이제 평생의 짝이 되려 합니다.
          </p>

          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>기쁜 날,</p>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>소중한 분들과</p>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            행복한 순간을 함께하고 싶습니다.
          </p>

          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            따뜻한 마음으로
          </p>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            축복해 주세요 🌷
          </p>
        </>
      ) : (
        <>
          <p></p>
          <p></p>
          <p></p>

          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>ในวันสำคัญนี้</p>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            เราขอเชิญทุกท่าน
          </p>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            มาร่วมแบ่งปันช่วงเวลาแห่งความสุขกับเรา
          </p>

          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            ด้วยความยินดีจากใจ
          </p>
          <p className={`mt-2.5 ${fontClass} ${subTextSize}`}>
            ขอให้ทุกท่านร่วมอวยพรให้กับเรา 🌷
          </p>
        </>
      )}

      {/* 부모님 소개 */}
      <div
        className={`mt-6 text-center ${contentSize} leading-[1.8] text-[#333] flex flex-row items-start justify-center`}
      >
        <div className="flex flex-col">
          {/* Groom side */}
          <div className="flex items-center w-full justify-center">
            {lang === "ko" ? (
              <>
                <p className="font-medium min-w-[100px]">유영운</p>
                <p className="mx-2">·</p>
                <p className="font-medium w-[100px]">신혜원</p>
                <p>의 아들 🤵🏻</p>
              </>
            ) : (
              <>
                <p>🤵🏻</p>
                <p className="mx-1">บุตรชายของ</p>

                <p className="font-medium mx-1">พ่อยูยองอุน</p>

                <p className="mx-1">·</p>

                <p className="font-medium">แม่ชินฮเยวอน</p>
              </>
            )}
          </div>

          {/* Bride side */}
          <div className="flex flex-col items-center w-full">
            {lang === "ko" ? (
              <div className="flex items-center">
                <p className="font-medium min-w-[85px]">Nhong</p>
                <p className="mx-2">·</p>
                <p className="font-medium w-[100px]">Kagh</p>
                <p>의 딸 👰🏻‍♀️</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center">
                  <p>👰🏻‍♀️</p>
                  <p className="mx-1">บุตรสาวของ</p>
                  <p className="font-medium mx-1">พ่อเฉลิมชัย</p>
                  <p className="mx-1">·</p>
                  <p className="font-medium">แม่มลฤดี</p>
                </div>

                <div className="flex items-center justify-center text-[#555]">
                  <p className="font-medium mx-1">(พ่อโหน่ง</p>
                  <p className="mx-1">·</p>
                  <p className="font-medium">แม่แขก)</p>
                </div>
              </>
            )}
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
            priority
            quality={75}
            className="rounded-full object-cover"
          />

          <div className="flex flex-row items-center justify-center gap-[10px] mt-[10px]">
            <p className={`font-bold ${contentSize}`}>
              {lang === "ko" ? "유은상" : <>ยูอึนซัง</>}
            </p>

            <a
              href="tel:01033883415"
              className="inline-block text-[22px] cursor-pointer animate-bounce"
            >
              📞
            </a>
          </div>

          <p className={`${subTextSize} mt-[4px]`}>
            {lang === "ko" ? "92년산 🍾🐒✨" : "Born in 1992 🍾🐒✨"}
          </p>
          <p className={`${subTextSize}`}>
            {lang === "ko" ? "건축공학 엔지니어" : "Architectural Engineer"}
          </p>
        </div>

        {/* Bride */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/me_kids_ver.png"
            alt="my img"
            width={100}
            height={100}
            priority
            quality={75}
            className="rounded-full object-cover"
          />

          <div className="flex flex-row items-center justify-center gap-[10px] mt-[10px]">
            <p className={`font-bold ${contentSize}`}>
              {lang === "ko" ? "펀 | FERN" : <>เฟิร์น</>}
            </p>

            <a
              href="tel:01053349912"
              className="inline-block text-[22px] cursor-pointer animate-bounce"
            >
              📞
            </a>
          </div>

          <p className={`${subTextSize} mt-[4px]`}>
            {lang === "ko" ? "99년산 🍼🐰💖" : "Born in 1999 🍼🐰💖"}
          </p>
          <p className={`${subTextSize}`}>
            {lang === "ko" ? "프론트엔드 개발자" : "Frontend Developer"}
          </p>
        </div>
      </div>
    </div>
  );
}
