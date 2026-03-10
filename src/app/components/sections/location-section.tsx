"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX!;

export default function LocationSection() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapInitializedRef = useRef(false);

  const [mapViewMode, setMapViewMode] = useState<"MAP" | "IMAGE">("MAP");

  useEffect(() => {
    if (mapViewMode !== "MAP") return;
    if (!mapContainerRef.current) return;
    if (mapInitializedRef.current) return;

    mapInitializedRef.current = true;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: [126.8779692, 37.508535],
      zoom: 17.5,
      pitch: 60,
      bearing: -17.6,
      antialias: true,
      preserveDrawingBuffer: true,
      config: {
        basemap: {
          lightPreset: "dusk",
          show3dObjects: true,
        },
      },
    });

    mapRef.current = map;

    new mapboxgl.Marker().setLngLat([126.8779692, 37.508535]).addTo(map);

    const popupNode = document.createElement("div");
    popupNode.innerHTML = `
      <div class="flex flex-row gap-[10px] typo-crayon-font">
        <p>💒 JK 아트컨벤션</p>
      </div>
    `;

    new mapboxgl.Popup({ closeOnClick: false, offset: 30 })
      .setDOMContent(popupNode)
      .setLngLat([126.8779692, 37.508535])
      .addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
      mapInitializedRef.current = false;
    };
  }, [mapViewMode]);

  return (
    <div id="location" className="section">
      <p className="title-en">LOCATION</p>
      <h3 className="highlight">오시는 길</h3>

      <div>
        <p>JK 아트컨벤션 4층 엠버루체홀</p>
        <p>서울특별시 영등포구 문래로 164 (문래동3가 55-16번지)</p>
        <p>SK리더스뷰</p>
      </div>

      {/* Map Tabs */}
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
          className="w-full max-w-[420px] h-[350px] mx-auto rounded-[10px] overflow-hidden shadow-md"
        />
      ) : (
        <div className="flex justify-center">
          <Image
            src="/images/jk_map.jpg"
            alt="JK Art Convention map"
            width={800}
            height={500}
            className="w-full max-w-[420px] h-auto rounded-xl"
            priority
          />
        </div>
      )}

      <div className="flex justify-center gap-3 mt-[15px]">
        <div className="flex items-center gap-[7px] bg-[#f8f8f8] px-4 py-[10px] rounded-lg font-medium text-[#333] shadow-sm hover:bg-[#eee] transition">
          <Image
            src="/images/kakao_navi.svg"
            alt="kakao icon"
            width={32}
            height={32}
            className="rounded"
          />
          <a href="https://kko.to/Kg-9yiU8OY" target="_blank">
            카카오내비
          </a>
        </div>

        <div className="flex items-center gap-[7px] bg-[#f8f8f8] px-4 py-[10px] rounded-lg font-medium text-[#333] shadow-sm hover:bg-[#eee] transition">
          <Image
            src="/images/naver_map.png"
            alt="naver icon"
            width={32}
            height={32}
            className="rounded"
          />
          <a href="https://naver.me/Gn0yrSdR" target="_blank">
            네이버지도
          </a>
        </div>
      </div>
    </div>
  );
}
