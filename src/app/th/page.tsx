"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import FlowerBackground from "../components/flower-background";
import LanguagePopup from "../components/language-popup";

import CoverSection from "../components/sections/cover-section";
import InvitationSection from "../components/sections/invitation-section";
import WeddingInfoSection from "../components/sections/wedding-info-section";
import GallerySection from "../components/sections/gallery-section";
import AccountSection from "../components/sections/account-section";
import LocationSection from "../components/sections/location-section";
import SubwaySection from "../components/sections/subway-section";
import BusSection from "../components/sections/bus-section";
import ParkingSection from "../components/sections/parking-section";
import ShareSection from "../components/sections/share-section";
import RSVPSection from "../components/sections/rspv-section";
import { useAudio } from "../hooks/useAudio";

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
import BottomNav from "../components/bottom-nav";

/* ---------- nav items ---------- */
const navItems = [
  { icon: Heart, label: "About" }, // 소개
  { icon: Mail, label: "Invitation" }, // 초대장
  { icon: Calendar, label: "Schedule" }, // 일정
  { icon: ImageIcon, label: "Gallery" }, // 갤러리
  { icon: Gift, label: "Gift" }, // 💡 어색해서 영어 유지
  { icon: MapPin, label: "Location" }, // 오시는길
  { icon: Bus, label: "Transport" }, // 교통안내
];

type VenueMode = "KOREA" | "THAILAND";

/* ---------- combined sections ---------- */
function TransportSection() {
  return (
    <div className="space-y-4 pb-6">
      <SubwaySection lang="th" />
      <BusSection lang="th" />
      <ParkingSection lang="th" />
      <ShareSection lang="th" />
    </div>
  );
}

function GiftSection() {
  return (
    <div className="space-y-4">
      <AccountSection lang="th" />
      <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-lg shadow-sm">
        <Image
          src="/images/gallery/hori_1.JPG"
          alt="wedding gallery horizontal"
          width={1200}
          height={800}
          className="h-auto w-full object-cover"
          sizes="(max-width: 420px) 100vw, 420px"
        />
      </div>
      <RSVPSection lang="th" />
    </div>
  );
}

/* ---------- main component ---------- */
export default function WeddingInvitation() {
  const { isMuted, toggleMute } = useAudio("/songs/until-i-found-you.mp3");

  const [activeIndex, setActiveIndex] = useState(0);
  const [showLangPopup, setShowLangPopup] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<VenueMode>("KOREA");
  const visibleNavItems =
    selectedVenue === "THAILAND" ? navItems.slice(0, 6) : navItems;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  /* ---------- show language popup ---------- */
  // useEffect(() => {
  //   setShowLangPopup(true);
  // }, []);

  /* ---------- scroll to section ---------- */
  const handleScrollTo = (index: number) => {
    sectionRefs[index].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* ---------- detect active section ---------- */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const offsets = sectionRefs.map((ref) => {
        if (!ref.current) return Number.POSITIVE_INFINITY;
        const rect = ref.current.getBoundingClientRect();
        return Math.abs(rect.top);
      });

      const minIndex = offsets.indexOf(Math.min(...offsets));
      setActiveIndex(minIndex);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <FlowerBackground />

      <div className="w-full h-screen flex justify-center bg-[rgba(153,153,153,0.05)]">
        <div
          ref={containerRef}
          className="relative w-full max-w-[420px] h-screen overflow-y-auto scrollbar-hide text-[#333] text-center leading-relaxed"
        >
          {/* Cover */}
          <div ref={sectionRefs[0]} className="min-h-screen">
            <CoverSection />
          </div>

          {/* Other sections */}
          <div className="px-4 pt-4 pb-32 space-y-10">
            <div ref={sectionRefs[1]}>
              <InvitationSection lang="th" />
            </div>

            <div ref={sectionRefs[2]}>
              <WeddingInfoSection
                lang="th"
                selectedVenue={selectedVenue}
                onSelectVenue={setSelectedVenue}
              />
            </div>

            <div ref={sectionRefs[3]}>
              <GallerySection lang="th" />
            </div>

            <div ref={sectionRefs[4]}>
              <GiftSection />
            </div>

            <div className="-mt-7 mx-auto w-full max-w-[420px] overflow-hidden rounded-lg shadow-sm">
              <Image
                src="/images/gallery/hori_2.JPG"
                alt="wedding gallery horizontal"
                width={1200}
                height={800}
                className="h-auto w-full object-cover"
                sizes="(max-width: 420px) 100vw, 420px"
              />
            </div>

            <div ref={sectionRefs[5]}>
              <LocationSection
                lang="th"
                selectedVenue={selectedVenue}
                onSelectVenue={setSelectedVenue}
              />
            </div>

            {selectedVenue !== "THAILAND" && (
              <div ref={sectionRefs[6]}>
                <TransportSection />
              </div>
            )}

            <footer className="pg-bathbomb pb-2 text-center text-[14px] text-gray-400">
              © Copyright Fern Nichanun
            </footer>
          </div>

          {/* music button */}
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={toggleMute}
              className="flex items-center gap-2 px-2 py-1.5 rounded-full backdrop-blur-xl bg-white/60 border border-white/30 shadow-md text-sm hover:bg-white transition"
            >
              {!isMuted ? <Music4 size={16} /> : <VolumeOff size={16} />}
            </button>
          </div>

          {/* bottom nav */}
          <BottomNav
            navItems={visibleNavItems}
            activeIndex={activeIndex}
            onClick={handleScrollTo}
          />
        </div>
      </div>
    </>
  );
}
