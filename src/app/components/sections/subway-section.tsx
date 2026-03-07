"use client";

import Image from "next/image";

export default function SubwaySection() {
  return (
    <div id="location-subway" className="section">
      <p className="title-en">SUBWAY</p>
      <h3 className="highlight">지하철 이용시</h3>

      <div className="flex flex-row justify-center gap-5">
        <div className="flex items-center gap-[5px]">
          <Image
            src="/images/icon/ellipse_green.svg"
            alt="line2"
            width={19}
            height={19}
          />
          <p>2호선 문래역</p>
        </div>
      </div>

      <p>셔틀버스 : 4번출구(뒷쪽) 셔틀버스 운행</p>
      <p>도보이용 : 5번출구에서 전방 직진 300M</p>
    </div>
  );
}
