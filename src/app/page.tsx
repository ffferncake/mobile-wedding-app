"use client";

import { useState } from "react";

import HeartsBackground from "./components/hearts-background";
import FlowerBackground from "./components/flower-background";

import CoverSection from "./components/sections/cover-section";
import InvitationSection from "./components/sections/invitation-section";
import WeddingInfoSection from "./components/sections/wedding-info-section";
import GallerySection from "./components/sections/gallery-section";
import AccountSection from "./components/sections/account-section";
import LocationSection from "./components/sections/location-section";
import SubwaySection from "./components/sections/subway-section";
import BusSection from "./components/sections/bus-section";
import ParkingSection from "./components/sections/parking-section";
import ShareSection from "./components/sections/share-section";
import RSVPSection from "./components/sections/rspv-section";
import { useAudio } from "./hooks/useAudio";

import {
  Heart,
  Mail,
  Calendar,
  Image as ImageIcon,
  Gift,
  MapPin,
  Bus,
  Music4,
  VolumeOff,
} from "lucide-react";

const navItems = [
  { icon: Heart, label: "소개" },
  { icon: Mail, label: "초대장" },
  { icon: Calendar, label: "일정" },
  { icon: ImageIcon, label: "갤러리" },
  { icon: Gift, label: "마음전하기" },
  { icon: MapPin, label: "오시는길" },
  { icon: Bus, label: "교통안내" },
];

/* ---------- transport combined page ---------- */
function TransportSection() {
  return (
    <div className="space-y-6 pb-20">
      <SubwaySection />
      <BusSection />
      <ParkingSection />
      <ShareSection />
    </div>
  );
}

function GiftSection() {
  return (
    <div className="space-y-4 pb-6">
      <AccountSection />
      <RSVPSection />
    </div>
  );
}

/* ---------- main component ---------- */
export default function WeddingInvitation() {
  const [pageIndex, setPageIndex] = useState(0);
  const { isMuted, toggleMute } = useAudio("/songs/until-i-found-you.mp3");

  const pages = [
    <CoverSection key="cover" />,
    <InvitationSection key="invite" />,
    <WeddingInfoSection key="info" />,
    <GallerySection key="gallery" />,
    <GiftSection key="gift" />,
    <LocationSection key="location" />,
    <TransportSection key="transport" />,
  ];

  const icons = [Heart, Mail, Calendar, ImageIcon, Gift, MapPin, Bus];

  return (
    <>
      <FlowerBackground />

      <div className="w-full h-screen flex justify-center bg-[rgba(153,153,153,0.05)]">
        {/* invitation container */}
        <div className="relative w-full max-w-[420px] h-screen overflow-y-auto scrollbar-hide text-[#333] text-center leading-relaxed">
          {" "}
          {/* page content */}
          <div
            className={`transition-all duration-500 ease-out ${
              pageIndex === 0 ? "" : "px-4 pt-4 pb-24"
            }`}
          >
            <div key={pageIndex} className="animate-pageFade">
              {pages[pageIndex]}
            </div>
          </div>
          {/* music control */}
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={toggleMute}
              className="flex items-center gap-2 px-2 py-1.5 rounded-full backdrop-blur-xl bg-white/60 border border-white/30 shadow-md text-sm hover:bg-white transition"
            >
              {!isMuted ? <Music4 size={16} /> : <VolumeOff size={16} />}
            </button>
          </div>
          {/* bottom navigation */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[410px] z-50">
            <div className="relative flex items-center backdrop-blur-xl bg-white/70 border border-white/30 rounded-full px-2 shadow-lg">
              {/* ✅ sliding circle (완벽 중앙) */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-[48px] bg-white rounded-full shadow-md transition-all duration-300"
                style={{
                  width: `calc((100% - 16px) / ${navItems.length})`,
                  left: `calc(${pageIndex} * ((100% - 16px) / ${navItems.length}) + 8px)`,
                }}
              />

              {/* buttons */}
              {navItems.map(({ icon: Icon, label }, index) => {
                const isActive = pageIndex === index;

                return (
                  <button
                    key={index}
                    onClick={() => setPageIndex(index)}
                    className="relative z-10 flex flex-col items-center justify-center flex-1 h-[56px] gap-1 transition-all duration-300"
                  >
                    <Icon
                      size={18}
                      className={`transition-all duration-300 ${
                        isActive ? "text-black scale-105" : "text-gray-400"
                      }`}
                    />

                    <span
                      className={`text-[8px] leading-none mt-[2px] transition-all duration-300 ${
                        isActive ? "text-black font-medium" : "text-gray-400"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
