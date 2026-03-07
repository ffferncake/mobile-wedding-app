"use client";

import { useState } from "react";

import HeartsBackground from "./components/hearts-background";

import CoverSection from "./components/sections/cover-section";
import InvitationSection from "./components/sections/invitation-section";
import WeddingInfoSection from "./components/sections/wedding-info-section";
import IntroductionSection from "./components/sections/introduction-section";
import GallerySection from "./components/sections/gallery-section";
import AccountSection from "./components/sections/account-section";
import LocationSection from "./components/sections/location-section";
import SubwaySection from "./components/sections/subway-section";
import BusSection from "./components/sections/bus-section";
import ParkingSection from "./components/sections/parking-section";
import ShareSection from "./components/sections/share-section";

import {
  Heart,
  Mail,
  Calendar,
  Users,
  Image as ImageIcon,
  Gift,
  MapPin,
  Bus,
  Share2,
} from "lucide-react";

/* ---------- transport combined page ---------- */

function TransportSection() {
  return (
    <div className="space-y-6 pb-20">
      <SubwaySection />
      <BusSection />
      <ParkingSection />
    </div>
  );
}

/* ---------- main component ---------- */

export default function WeddingInvitation() {
  const [pageIndex, setPageIndex] = useState(0);

  const pages = [
    <CoverSection key="cover" />,
    <InvitationSection key="invite" />,
    <WeddingInfoSection key="info" />,
    <IntroductionSection key="intro" />,
    <GallerySection key="gallery" />,
    <AccountSection key="account" />,
    <LocationSection key="location" />,
    <TransportSection key="transport" />,
    <ShareSection key="share" />,
  ];

  const icons = [
    Heart,
    Mail,
    Calendar,
    Users,
    ImageIcon,
    Gift,
    MapPin,
    Bus,
    Share2,
  ];

  return (
    <>
      <HeartsBackground />

      <div className="w-full h-screen flex justify-center bg-[rgba(153,153,153,0.05)]">
        {/* invitation container */}
        <div className="relative w-full max-w-[420px] bg-white h-screen overflow-y-auto text-[#333] text-center leading-relaxed">
          {/* page content */}
          <div
            className={`transition-all duration-500 ease-out ${
              pageIndex === 0 ? "" : "px-4 pt-6 pb-24"
            }`}
          >
            <div key={pageIndex} className="animate-pageFade">
              {pages[pageIndex]}
            </div>
          </div>

          {/* bottom navigation */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 backdrop-blur-xl bg-white/60 border border-white/30 px-2 py-2 rounded-full shadow-lg">
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
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
