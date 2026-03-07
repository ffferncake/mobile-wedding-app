"use client";
import { useState, useEffect, useRef } from "react";
// import styles from "./WeddingInvitation.module.css";
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
import BusSection from "./components/sections/BusSection";
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

      <div className="w-full h-screen bg-[rgba(153,153,153,0.05)] justify-center">
        <div
          className="bg-white text-[#333] text-center leading-relaxed max-w-[420px] mx-auto relative overflow-y-auto h-screen no-scrollbar"
          ref={contentRef}
        >
          <CoverSection />

          <ScrollSection>
            <div
              id="date"
              className="bg-white shadow-md max-w-[400px] mx-auto mt-[-20px] mb-10 p-5 rounded-xl text-sm relative"
            >
              <p>2026.09.13 2:00PM</p>
              <p>JK아트컨벤션 4층 엠버루체홀</p>
              <strong>
                <p>은상 💍 펀</p>
              </strong>
            </div>
          </ScrollSection>

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
            <BusSection />
          </ScrollSection>

          {/* 주차안내 */}
          <ScrollSection>
            <ParkingSection />
          </ScrollSection>

          {/* 참석 여부 / 공유하기 */}
          <ScrollSection>
            <ShareSection />
          </ScrollSection>
          <footer className="mt-5 mb-[110px] text-xs text-[#aaa]">
            © DEVELOPED By Fern Nichanun
          </footer>
        </div>
      </div>
    </>
  );
}
