"use client";

import Image from "next/image";
import styles from "../../WeddingInvitation.module.css";
import { Copy } from "lucide-react";

export default function AccountSection() {
  const copyAccount = () => {
    navigator.clipboard.writeText("1001-5731-0736");
    alert("계좌번호가 복사되었습니다.");
  };

  return (
    <div id="accountnumber" className={styles.inviteMessage}>
      <p className={styles.title_en}>ACCOUNT</p>
      <h3 className={styles.highlight}>마음 전하실 곳</h3>

      <p>
        소중한 축하를 보내주셔서 감사드리며,
        <br />
        따뜻한 마음에 깊이 감사드립니다.
      </p>

      <div className={styles.accountWrapper}>
        <div className={styles.account}>
          <Image
            src="/images/toss.png"
            alt="toss icon"
            width={32}
            height={32}
          />

          <span>토스뱅크 1001-5731-0736</span>

          <button onClick={copyAccount} className={styles.copyButton}>
            복사
            <Copy className={styles.copyButtonIcon} />
          </button>
        </div>

        <span>TRAKULPHUDPHONG NICHANUN (커플통장)</span>
      </div>
    </div>
  );
}
