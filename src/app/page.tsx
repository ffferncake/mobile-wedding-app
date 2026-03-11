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

/* ---------- main component ---------- */
export default function WeddingInvitation() {
  const [pageIndex, setPageIndex] = useState(0);
  const { isMuted, toggleMute } = useAudio("/songs/until-i-found-you.mp3");

  const pages = [
    <CoverSection key="cover" />,
    <InvitationSection key="invite" />,
    <WeddingInfoSection key="info" />,
    <GallerySection key="gallery" />,
    <AccountSection key="account" />,
    <LocationSection key="location" />,
    <TransportSection key="transport" />,
  ];

  const icons = [
    Heart,
    Mail,
    Calendar,
    ImageIcon,
    Gift,
    MapPin,
    Bus,
  ];

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
          <div className="fixed bottom-3 left-1/2 -translate-x-1/2 flex gap-1 backdrop-blur-xl bg-white/60 border border-white/30 px-2 py-2 rounded-full shadow-lg">
            {icons.map((Icon, index) => (
              <button
                key={index}
                onClick={() => setPageIndex(index)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  pageIndex === index
                    ? "bg-black text-white scale-110 shadow-md"
                    : "text-gray-600 hover:bg-white/60 hover:scale-105"
                }`}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
