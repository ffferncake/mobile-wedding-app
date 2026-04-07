"use client";

type Props = {
  lang: "ko" | "th";
};

export default function BusSection({ lang }: Props) {
  const isTH = lang === "th";

  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";
  const sectionSize = isTH ? "text-[20px]" : "text-[13px]";
  const titleSize = isTH ? "text-[22px]" : "text-[16px]";
  const highlightSize = isTH ? "text-[24px]" : "text-[18px]";
  const subTextSize = isTH ? "text-[18px]" : "text-[14px]";

  const busNumberSize = isTH ? "text-[12px]" : "text-[13px]";
  const busLabelSize = isTH ? "text-[10px]" : "text-[11px]";

  return (
    <div id="location-bus" className={`section ${fontClass} ${sectionSize}`}>
      <p className={`title-en ${fontClass} ${titleSize}`}>BUS</p>

      <h3 className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "ko" ? "버스 이용시" : "การเดินทางด้วยรถบัส"}
      </h3>

      <div className="mt-[10px] flex flex-col gap-[15px]">
        {/* 문래역 */}
        <div className="flex flex-col">
          <p className={`${subTextSize} font-medium text-[#222]`}>
            {lang === "ko"
              ? "○ 문래역 정류장 하차"
              : "○ ลงที่ป้าย Mullae Station"}
          </p>

          <div className="flex flex-wrap gap-2 mt-[6px]">
            <div className="flex items-center gap-[6px]">
              <span className={`${busLabelSize} font-semibold text-white px-[4px] py-[4px] rounded-[3px] min-w-[50px] text-center bg-[#4aa52c]`}>
                {lang === "ko" ? "지선버스" : "รถบัสสายรอง"}
              </span>
              <span className={`${busNumberSize} text-[#333]`}>
                6211, 6625
              </span>
            </div>

            <div className="flex items-center gap-[6px]">
              <span className={`${busLabelSize} font-semibold text-white px-[4px] py-[4px] rounded-[3px] min-w-[50px] text-center bg-[#3b56c4]`}>
                {lang === "ko" ? "간선버스" : "รถบัสสายหลัก"}
              </span>
              <span className={`${busNumberSize} text-[#333]`}>641</span>
            </div>

            <div className="flex items-center gap-[6px]">
              <span className={`${busLabelSize} font-semibold text-white px-[4px] py-[4px] rounded-[3px] min-w-[50px] text-center bg-[#4aa52c]`}>
                {lang === "ko" ? "마을버스" : "รถบัสชุมชน"}
              </span>
              <span className={`${busNumberSize} text-[#333]`}>
                {lang === "ko" ? "영등포12" : "Yeongdeungpo 12"}
              </span>
            </div>
          </div>
        </div>

        {/* 주민센터 */}
        <div className="flex flex-col">
          <p className={`${subTextSize} font-medium text-[#222]`}>
            {lang === "ko"
              ? "○ 문래주민센터 / 영일시장, 롯스 정류장 하차"
              : "○ ลงป้าย Mullae Community Center / ตลาด Yeongil / LOTS"}
          </p>

          <div className="flex items-center gap-[6px] mt-[6px]">
            <span
              className={`${busLabelSize} font-semibold text-white px-[4px] py-[4px] rounded-[3px] min-w-[50px] text-center bg-[#4aa52c]`}
            >
              {lang === "ko" ? "마을버스" : "รถบัสชุมชน"}
            </span>
            <span className={`${busNumberSize} text-[#333]`}>
              {lang === "ko" ? "영등포05" : "Yeongdeungpo 05"}
            </span>
          </div>
        </div>

        {/* 아파트 */}
        <div className="flex flex-col">
          <p className={`${subTextSize} font-medium text-[#222]`}>
            {lang === "ko"
              ? "○ 벽산메가트리움APT 정류장 하차"
              : "○ ลงป้าย Byuksan Megatrium APT"}
          </p>

          <div className="flex items-center gap-[6px] mt-[6px]">
            <span
              className={`${busLabelSize} font-semibold text-white px-[4px] py-[4px] rounded-[3px] min-w-[50px] text-center bg-[#4aa52c]`}
            >
              {lang === "ko" ? "지선버스" : "รถบัสสายรอง"}
            </span>
            <span className={`${busNumberSize} text-[#333]`}>6516</span>
          </div>
        </div>
      </div>
    </div>
  );
}
