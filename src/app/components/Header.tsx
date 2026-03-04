"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "../WeddingInvitation.module.css";

interface HeaderProps {
  showHeader: boolean;
  isMuted: boolean;
  toggleMute: () => void;
}

export default function Header({
  showHeader,
  isMuted,
  toggleMute,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <>
      <div
        className={`${styles.tabNavContainer} ${
          showHeader ? styles.visible : styles.hidden
        }`}
      >
        <header className={styles.headerNav}>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={styles.menuBtn}
          >
            <Image
              src="/images/icon/hamburger_icon.svg"
              alt="menu"
              width={24}
              height={24}
            />
          </button>

          <div className={styles.titleCenter}>
            은상<span className={styles.heart}>💍</span>펀
          </div>

          <button onClick={toggleMute} className={styles.muteBtn}>
            <Image
              src={
                isMuted
                  ? "/images/icon/volume_off.svg"
                  : "/images/icon/volume_on.svg"
              }
              alt="audio control"
              width={20}
              height={20}
            />
          </button>
        </header>
      </div>

      {/* Hamburger menu */}
      {isMenuOpen && (
        <div className={styles.hamburgerMenuWrapper}>
          <div className={styles.hamburgerMenu}>
            <a
              href="#message"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#message");
              }}
            >
              초대글
            </a>

            <a
              href="#weddinginfo"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#weddinginfo");
              }}
            >
              예식안내
            </a>

            <a
              href="#accountnumber"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#accountnumber");
              }}
            >
              마음 전하실 곳
            </a>

            <a
              href="#location"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#location");
              }}
            >
              오시는길
            </a>

            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#gallery");
              }}
            >
              웨딩 갤러리
            </a>
          </div>
        </div>
      )}
    </>
  );
}
