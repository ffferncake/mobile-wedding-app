"use client";

import Image from "next/image";
import styles from "../../WeddingInvitation.module.css";

export default function IntroductionSection() {
  return (
    <div className={styles.section}>
      <div id="introduction" className={styles.inviteMessage}>
        <p className={styles.title_en}>INTRODUCTION</p>
        <h3 className={styles.highlight}>신랑 & 신부 소개합니다</h3>
      </div>

      <div className={styles.kidsImg}>
        <div className={styles.oppaPart}>
          <Image
            src="/images/oppa_kids_ver.png"
            alt="groom img"
            width={150}
            height={150}
          />
          <h3>유은상</h3>
          <p>92년산 🍾🐒✨</p>
          <p>건축공학 엔지니어</p>
        </div>

        <div className={styles.oppaPart}>
          <Image
            src="/images/me_kids_ver.png"
            alt="bride img"
            width={150}
            height={150}
          />
          <h3>펀 | FERN</h3>
          <p>99년산 🍼🐰💖</p>
          <p>프론트엔드 개발자</p>
        </div>
      </div>
    </div>
  );
}
