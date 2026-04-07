"use client";

import Image from "next/image";

type Props = {
  lang: "ko" | "th";
};

export default function SubwaySection({ lang }: Props) {
 const isTH = lang === "th";

  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";
  const sectionSize = isTH ? "text-[20px]" : "text-[13px]";
  const titleSize = isTH ? "text-[22px]" : "text-[16px]";
  const highlightSize = isTH ? "text-[24px]" : "text-[18px]";
  const subTextSize = isTH ? "text-[18px]" : "text-[14px]";


  return (
    <div id="location-subway" className={`section ${fontClass} ${sectionSize}`}>
      <p className={`title-en ${fontClass} ${titleSize}`}>SUBWAY</p>

      <h3 className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "ko" ? "지하철 이용시" : "การเดินทางด้วยรถไฟฟ้า"}
      </h3>

      <div className={`flex flex-row justify-center gap-5 ${titleSize}`}>
        <div className="flex items-center gap-[5px]">
          <Image
            src="/images/icon/ellipse_green.svg"
            alt="line2"
            width={19}
            height={19}
          />
          <p>{lang === "ko" ? "2호선 문래역" : "รถไฟฟ้าสาย 2 สถานี Mullae"}</p>
        </div>
      </div>

      <p className={`mt-2 ${subTextSize}`}>
        {lang === "ko"
          ? "셔틀버스 : 4번출구(뒷쪽) 셔틀버스 운행"
          : "รถรับส่ง : ออกทางออก 4 (ด้านหลัง) มีรถรับส่ง"}
      </p>

      <p className={`mt-2 ${subTextSize}`}>
        {lang === "ko"
          ? "도보이용 : 5번출구에서 전방 직진 300M"
          : "เดินเท้า : ออกทางออก 5 เดินตรงประมาณ 300 เมตร"}
      </p>
    </div>
  );
}
