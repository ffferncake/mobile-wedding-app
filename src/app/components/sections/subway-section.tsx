"use client";

import Image from "next/image";

type Props = {
  lang: "ko" | "th";
};

export default function SubwaySection({ lang }: Props) {
  const fontClass = lang === "th" ? "pg-bathbomb" : "typo-crayon-font";

  return (
    <div id="location-subway" className={`section ${fontClass}`}>
      <p className={`title-en ${fontClass}`}>SUBWAY</p>

      <h3 className={`highlight ${fontClass}`}>
        {lang === "ko" ? "지하철 이용시" : "การเดินทางด้วยรถไฟฟ้า"}
      </h3>

      <div className="flex flex-row justify-center gap-5">
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

      <p className="mt-2">
        {lang === "ko"
          ? "셔틀버스 : 4번출구(뒷쪽) 셔틀버스 운행"
          : "รถรับส่ง : ออกทางออก 4 (ด้านหลัง) มีรถรับส่ง"}
      </p>

      <p>
        {lang === "ko"
          ? "도보이용 : 5번출구에서 전방 직진 300M"
          : "เดินเท้า : ออกทางออก 5 เดินตรงประมาณ 300 เมตร"}
      </p>
    </div>
  );
}
