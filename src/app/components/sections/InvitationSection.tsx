"use client";

import Image from "next/image";
import styles from "../../WeddingInvitation.module.css";

export default function InvitationSection() {
  return (
    <div id="message" className={styles.inviteMessage}>
      <p className={styles.title_en}>INVITATION</p>
      <p className={styles.highlight}>소중한 분들을 초대합니다.</p>

      <p style={{ marginTop: "10px" }}>
        작은 인연으로 만나 연인이 된 저희가
      </p>
      <p>이제는 더욱 단단한 인연을 맺고자</p>
      <p>저희 두 사람 결혼합니다.</p>

      <p style={{ marginTop: "10px" }}>
        귀한 걸음으로 축하해 주시면
        <br />
        더 없는 기쁨으로 간직하겠습니다.
      </p>

      {/* 부모님 소개 */}
      <div className={styles.parentInfo}>
        <div className={styles.parentColumn}>
          <div className={styles.parentName}>
            <p className={styles.dadName}>유영운</p>
            <p>·</p>
            <p className={styles.momName}>신혜원</p>
            <p>의 아들 🤵🏻</p>
          </div>

          <div className={styles.parentName}>
            <p className={styles.dadName}>Nhong</p>
            <p>·</p>
            <p className={styles.momName}>Kagh</p>
            <p>의 딸 👰🏻‍♀️</p>
          </div>
        </div>
      </div>

      {/* 신랑 신부 */}
      <div className={styles.kidsImg}>
        <div className={styles.ourName}>
          <Image
            src="/images/oppa_kids_ver.png"
            alt="oppa img"
            width={100}
            height={100}
          />

          <div className={styles.ourNameIcon}>
            <p>유은상</p>

            <a href="tel:01033883415" className={styles.phoneIcon}>
              📞
            </a>
          </div>
        </div>

        <div className={styles.ourName}>
          <Image
            src="/images/me_kids_ver.png"
            alt="my img"
            width={100}
            height={100}
          />

          <div className={styles.ourNameIcon}>
            <p>펀</p>

            <a href="tel:010-5334-9912" className={styles.phoneIcon}>
              📞
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}