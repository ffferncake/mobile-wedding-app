"use client";


export default function BusSection() {
  return (
    <div id="location-bus" className="section">
      <p className="title-en">BUS</p>
      <h3 className="highlight">버스 이용시</h3>

      <div className="mt-[10px] flex flex-col gap-[15px] px-[10px]">
        {/* 문래역 정류장 */}
        <div className="flex flex-col">
          <p className="text-[13px] font-medium text-[#222]">
            ○ 문래역 정류장 하차
          </p>

          <div className="flex flex-wrap justify-between gap-2 mt-[6px]">
            <div className="flex items-center gap-[6px]">
              <span className="text-[11px] font-semibold text-white px-[4px] py-[4px] rounded-[3px] min-w-[50px] text-center bg-[#4aa52c]">
                지선버스
              </span>
              <span className="text-[13px] text-[#333]">6211, 6625</span>
            </div>

            <div className="flex items-center gap-[6px]">
              <span className="text-[11px] font-semibold text-white px-[4px] py-[4px] rounded-[3px] min-w-[50px] text-center bg-[#3b56c4]">
                간선버스
              </span>
              <span className="text-[13px] text-[#333]">641</span>
            </div>

            <div className="flex items-center gap-[6px]">
              <span className="text-[11px] font-semibold text-white px-[4px] py-[4px] rounded-[3px] min-w-[50px] text-center bg-[#4aa52c]">
                마을버스
              </span>
              <span className="text-[13px] text-[#333]">영등포12</span>
            </div>
          </div>
        </div>

        {/* 문래주민센터 */}
        <div className="flex flex-col">
          <p className="text-[13px] font-medium text-[#222]">
            ○ 문래주민센터 / 영일시장, 롯스 정류장 하차
          </p>

          <div className="flex items-center gap-[6px] mt-[6px]">
            <span className="text-[11px] font-semibold text-white px-[4px] py-[4px] rounded-[3px] min-w-[50px] text-center bg-[#4aa52c]">
              마을버스
            </span>
            <span className="text-[13px] text-[#333]">영등포05</span>
          </div>
        </div>

        {/* 벽산메가트리움 */}
        <div className="flex flex-col">
          <p className="text-[13px] font-medium text-[#222]">
            ○ 벽산메가트리움APT 정류장 하차
          </p>

          <div className="flex items-center gap-[6px] mt-[6px]">
            <span className="text-[11px] font-semibold text-white px-[4px] py-[4px] rounded-[3px] min-w-[50px] text-center bg-[#4aa52c]">
              지선버스
            </span>
            <span className="text-[13px] text-[#333]">6516</span>
          </div>
        </div>
      </div>
    </div>
  );
}
