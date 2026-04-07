"use client";

type Props = {
  lang: "ko" | "th";
};

export default function ParkingSection({ lang }: Props) {
  const isTH = lang === "th";

  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";
  const sectionSize = isTH ? "text-[20px]" : "text-[13px]";
  const titleSize = isTH ? "text-[22px]" : "text-[16px]";
  const highlightSize = isTH ? "text-[24px]" : "text-[18px]";
  const subTextSize = isTH ? "text-[18px]" : "text-[14px]";

  return (
    <div
      id="location-parking"
      className={`section ${fontClass} ${sectionSize}`}
    >
      <p className={`title-en ${fontClass} ${titleSize}`}>PARKING</p>

      <h3 className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "ko" ? "주차안내" : "ที่จอดรถ"}
      </h3>

      <p className={`${subTextSize}`}>
        {lang === "ko"
          ? '네비게이션 : "JK아트컨벤션" 또는 "문래동 SK리더스뷰" 입력'
          : 'นำทาง : ค้นหา "JK Art Convention" หรือ "SK Leaders View Mullae"'}
      </p>

      <p className={`${subTextSize}`}>
        {lang === "ko"
          ? "동시 1,000여대 주차 가능, 주차요원의 안내를 받으세요."
          : "สามารถจอดรถได้ประมาณ 1,000 คัน กรุณาไปตามที่เจ้าหน้าที่แนะนำ"}
      </p>
    </div>
  );
}
