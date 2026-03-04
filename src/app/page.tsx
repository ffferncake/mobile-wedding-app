"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./WeddingInvitation.module.css";
import ScrollSection from "../app/components/ScrollSection";
import HeartsBackground from "./components/HeartsBackground";
import CoverSection from "./components/sections/CoverSection";
import InvitationSection from "./components/sections/InvitationSection";
import WeddingInfoSection from "./components/sections/WeddingInfoSection";
import IntroductionSection from "./components/sections/IntroductionSection";
import GallerySection from "./components/sections/GallerySection";
import AccountSection from "./components/sections/AccountSection";
import LocationSection from "./components/sections/LocationSection";
import SubwaySection from "./components/sections/SubwaySection";
import ParkingSection from "./components/sections/ParkingSection";
import ShareSection from "./components/sections/ShareSection";
import Header from "./components/Header";
import { useAudio } from "./hooks/useAudio";

export default function WeddingInvitation() {
  const { isMuted, toggleMute } = useAudio("/songs/until-i-found-you.mp3");
  const [showHeader, setShowHeader] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowHeader(container.scrollTop > 100);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setShowScrollBtn(contentRef.current.scrollTop > 200);
      }
    };
    const container = contentRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <HeartsBackground />
      <Header
        showHeader={showHeader}
        isMuted={isMuted}
        toggleMute={toggleMute}
      />

      <div className={styles.container}>
        <div className={styles.contentContainer} ref={contentRef}>
          <CoverSection />

          {/* <ScrollSection>
            <div id="date" className={styles.card}>
              <p>2026.09.13 2:00PM</p>
              <p>JK아트컨벤션 4층 엠버루체홀</p>
              <strong>
                <p>은상 💍 펀</p>
              </strong>
            </div>
          </ScrollSection> */}

          <ScrollSection>
            <InvitationSection />
          </ScrollSection>

          {/* 예식 안내 */}
          <ScrollSection>
            <WeddingInfoSection />
          </ScrollSection>

          {/* 신랑 & 신부 소개합니다 */}
          <ScrollSection>
            <IntroductionSection />
          </ScrollSection>

          {/* 갤러리 */}
          <ScrollSection>
            <GallerySection />
          </ScrollSection>

          {/* 마음 전하실 곳 */}
          <ScrollSection>
            <AccountSection />
          </ScrollSection>

          {/* 오시는길 */}
          <ScrollSection>
            <LocationSection />
          </ScrollSection>

          {/* 지하철 이용시 */}
          <ScrollSection>
            <SubwaySection />
          </ScrollSection>

          {/* 버스 이용시 */}
          <ScrollSection>
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
          </ScrollSection>

          {/* 주차안내 */}
          <ScrollSection>
            <ParkingSection />
          </ScrollSection>

          {/* 참석 여부 / 공유하기 */}
          <ScrollSection>
            <ShareSection />
          </ScrollSection>
          <footer className={styles.footer}>
            © DEVELOPED By Fern Nichanun
          </footer>
        </div>
      </div>
    </>
  );
}
