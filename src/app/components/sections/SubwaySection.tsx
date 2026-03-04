"use client";

import Image from "next/image";
import styles from "../../WeddingInvitation.module.css";

export default function SubwaySection() {
  return (
    <div id="location-subway" className={styles.inviteMessage}>
      <p className={styles.title_en}>SUBWAY</p>
      <h3 className={styles.highlight}>지하철 이용시</h3>

      <div className={styles.subwayInfo}>
        <div className={styles.subwaylineInfo}>
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