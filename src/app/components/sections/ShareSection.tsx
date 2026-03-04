"use client";

import styles from "../../WeddingInvitation.module.css";

export default function ShareSection() {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("초대장 링크가 복사되었습니다 💌");
  };

  return (
    <div id="rsvp" className={styles.inviteMessage}>
      <p className={styles.title_en}>SHARE INVITATION</p>
      <h3 className={styles.highlight}>초대장 공유</h3>

      <div className={styles.shareSection}>
        <button className={styles.copyLinkButton} onClick={copyLink}>
          🔗 모바일 청첩장 링크 복사하기
        </button>
      </div>
    </div>
  );
}