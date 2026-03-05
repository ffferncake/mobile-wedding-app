"use client";

import styles from "../../WeddingInvitation.module.css";

export default function BusSection() {
  return (
    <div id="location-bus" className={styles.inviteMessage}>
      <p className={styles.title_en}>BUS</p>
      <h3 className={styles.highlight}>버스 이용시</h3>

      <div className={styles.busSection}>
        {/* 문래역 정류장 */}
        <div className={styles.busBlock}>
          <p className={styles.busStopTitle}>○ 문래역 정류장 하차</p>

          <div className={styles.busRowInline}>
            <div className={styles.busRow}>
              <span className={`${styles.busTag} ${styles.busGreen}`}>
                지선버스
              </span>
              <span className={styles.busNumber}>6211, 6625</span>
            </div>

            <div className={styles.busRow}>
              <span className={`${styles.busTag} ${styles.busBlue}`}>
                간선버스
              </span>
              <span className={styles.busNumber}>641</span>
            </div>

            <div className={styles.busRow}>
              <span className={`${styles.busTag} ${styles.busGreen}`}>
                마을버스
              </span>
              <span className={styles.busNumber}>영등포12</span>
            </div>
          </div>
        </div>

        {/* 문래주민센터 */}
        <div className={styles.busBlock}>
          <p className={styles.busStopTitle}>
            ○ 문래주민센터 / 영일시장, 롯스 정류장 하차
          </p>

          <div className={styles.busRow}>
            <span className={`${styles.busTag} ${styles.busGreen}`}>
              마을버스
            </span>
            <span className={styles.busNumber}>영등포05</span>
          </div>
        </div>

        {/* 벽산메가트리움 */}
        <div className={styles.busBlock}>
          <p className={styles.busStopTitle}>
            ○ 벽산메가트리움APT 정류장 하차
          </p>

          <div className={styles.busRow}>
            <span className={`${styles.busTag} ${styles.busGreen}`}>
              지선버스
            </span>
            <span className={styles.busNumber}>6516</span>
          </div>
        </div>
      </div>
    </div>
  );
}