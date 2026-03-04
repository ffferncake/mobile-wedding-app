"use client";

import { useState } from "react";
import styles from "./WeddingInvitation.module.css";
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
import BookFlip from "./components/BookFlip";

export default function WeddingInvitation() {
  const { isMuted, toggleMute } = useAudio("/songs/until-i-found-you.mp3");
  const [showHeader, setShowHeader] = useState(false);

  const pages = [
    <CoverSection key="cover" />,
    <InvitationSection key="inv" />,
    <WeddingInfoSection key="info" />,
    <IntroductionSection key="intro" />,
    <GallerySection key="gallery" />,
    <AccountSection key="account" />,
    <LocationSection key="location" />,
    <SubwaySection key="subway" />,
    <ParkingSection key="parking" />,
    <ShareSection key="share" />,
    <div key="footer" className={styles.footerPage}>
      <footer className={styles.footer}>© DEVELOPED By Fern Nichanun</footer>
    </div>,
  ];

  return (
    <>
      <HeartsBackground />
      {/* <Header
        showHeader={showHeader}
        isMuted={isMuted}
        toggleMute={toggleMute}
      /> */}

      <div className={styles.container}>
        <BookFlip
          pages={pages}
          onPageChange={(pageIndex) => {
            // show header after leaving cover (tweak if you want)
            setShowHeader(pageIndex > 0);
          }}
        />
      </div>
    </>
  );
}
