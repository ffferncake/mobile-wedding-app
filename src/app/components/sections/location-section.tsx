"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function LocationSection() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const mapInitializedRef = useRef(false);

  const [mapViewMode, setMapViewMode] = useState<"MAP" | "IMAGE">("MAP");

  useEffect(() => {
    if (mapViewMode !== "MAP") return;
    if (!mapContainerRef.current) return;
    if (mapInitializedRef.current) return;

    const initMap = () => {
      const kakao = window.kakao;

      if (!kakao || !kakao.maps) {
        console.error("❌ Kakao not loaded");
        return;
      }

      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(37.508535, 126.8779692);

        const map = new kakao.maps.Map(mapContainerRef.current, {
          center,
          level: 3,
        });

        mapRef.current = map;

        const marker = new kakao.maps.Marker({
          position: center,
        });
        marker.setMap(map);

        const infowindow = new kakao.maps.InfoWindow({
          content: `
          <div style="padding:8px 12px; font-size:14px;">
            💒 JK 아트컨벤션
          </div>
        `,
        });

        infowindow.open(map, marker);

        mapInitializedRef.current = true;
      });
    };

    // ✅ WAIT until kakao is ready
    const checkKakao = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        clearInterval(checkKakao);
        initMap();
      }
    }, 100);

    return () => {
      clearInterval(checkKakao);
    };
  }, [mapViewMode]);
  return (
    <div id="location" className="section">
      <p className="title-en">LOCATION</p>
      <h3 className="highlight">오시는 길</h3>

      <div>
        <p>JK 아트컨벤션 4층 엠버루체홀</p>
        <p>서울특별시 영등포구 문래로 164</p>
        <p>SK리더스뷰</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-4 mt-4">
        <button
          onClick={() => setMapViewMode("MAP")}
          className={`typo-crayon-font px-[14px] py-[6px] rounded-full border text-[14px] transition ${
            mapViewMode === "MAP"
              ? "bg-[#111] text-white border-[#111]"
              : "bg-white text-black border-[#ddd] hover:bg-gray-100"
          }`}
        >
          지도 보기
        </button>

        <button
          onClick={() => setMapViewMode("IMAGE")}
          className={`typo-crayon-font px-[14px] py-[6px] rounded-full border text-[14px] transition ${
            mapViewMode === "IMAGE"
              ? "bg-[#111] text-white border-[#111]"
              : "bg-white text-black border-[#ddd] hover:bg-gray-100"
          }`}
        >
          약도 보기
        </button>
      </div>

      {mapViewMode === "MAP" ? (
        <div
          ref={mapContainerRef}
          className="w-full max-w-[420px] h-[350px] mx-auto rounded-[10px]"
        />
      ) : (
        <Image src="/images/jk_map.jpg" alt="map" width={800} height={500} />
      )}
    </div>
  );
}
