"use client";

type Props = {
  lang: "ko" | "th";
};

export default function ParkingSection({ lang }: Props) {
  const fontClass = lang === "th" ? "pg-bathbomb" : "typo-crayon-font";

  return (
    <div id="location-parking" className={`section ${fontClass}`}>
      <p className={`title-en ${fontClass}`}>PARKING</p>

      <h3 className={`highlight ${fontClass}`}>{lang === "ko" ? "주차안내" : "ที่จอดรถ"}</h3>

      <p>
        {lang === "ko"
          ? '네비게이션 : "JK아트컨벤션" 또는 "문래동 SK리더스뷰" 입력'
          : 'นำทาง : ค้นหา "JK Art Convention" หรือ "SK Leaders View Mullae"'}
      </p>

      <p>
        {lang === "ko"
          ? "동시 1,000여대 주차 가능, 주차요원의 안내를 받으세요."
          : "สามารถจอดรถได้ประมาณ 1,000 คัน กรุณาปฏิบัติตามเจ้าหน้าที่"}
      </p>
    </div>
  );
}
