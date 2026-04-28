"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX!;

type Props = {
  lang: "ko" | "th";
};

export default function LocationSection({ lang }: Props) {
  const isTH = lang === "th";

  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";
  const sectionSize = isTH ? "text-[20px]" : "text-[13px]";
  const titleSize = isTH ? "text-[22px]" : "text-[16px]";
  const highlightSize = isTH ? "text-[24px]" : "text-[18px]";
  const subTextSize = isTH ? "text-[18px]" : "text-[14px]";

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapInitializedRef = useRef(false);

  const [mapViewMode, setMapViewMode] = useState<"MAP" | "IMAGE">("MAP");

  useEffect(() => {
    if (mapViewMode !== "MAP") return;
    if (!mapContainerRef.current) return;
    if (mapInitializedRef.current) return;

    mapInitializedRef.current = true;

    const center: [number, number] = [126.8779692, 37.508535];

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center,
      zoom: 19.5,
      pitch: 60,
      bearing: -17.6,
      antialias: true,
      preserveDrawingBuffer: true,
      config: {
        basemap: { lightPreset: "dusk", show3dObjects: true },
      },
    });

    mapRef.current = map;

    // 👉 wait until map is fully loaded
    map.on("load", () => {
      // =========================
      // 🎯 Custom Marker
      // =========================
      const el = document.createElement("div");
      el.className = "custom-marker";

      el.style.backgroundImage = "url(/images/kids_map_icon.png)";
      el.style.width = "65px";
      el.style.height = "65px";
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";
      el.style.cursor = "pointer";

      // optional: center alignment tweak
      el.style.transform = "translate(-50%, -100%)";

      // =========================
      // 🎯 Popup (building name)
      // =========================
      const popupNode = document.createElement("div");
      popupNode.innerHTML = `
      <div class="flex gap-[6px] ${fontClass}">
        <p>💒 ${lang === "ko" ? "JK 아트컨벤션" : "JK Art Convention"}</p>
      </div>
    `;

      const popup = new mapboxgl.Popup({
        closeOnClick: false,
        offset: [0, -30], // adjust based on icon height
      }).setDOMContent(popupNode);

      // =========================
      // 🎯 Marker + Popup 연결
      // =========================
      const marker = new mapboxgl.Marker(el)
        .setLngLat(center)
        .setPopup(popup)
        .addTo(map);

      // 👉 keep popup always visible
      popup.addTo(map);
    });

    // =========================
    // 🧹 Cleanup
    // =========================
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      mapInitializedRef.current = false;
    };
  }, [mapViewMode, lang, fontClass]);

  return (
    <div id="location" className={`section ${fontClass} ${sectionSize}`}>
      <p className={`title-en ${fontClass} ${titleSize}`}>LOCATION</p>

      <h3 className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "ko" ? "오시는 길" : "การเดินทาง"}
      </h3>

      <div className={`text-center leading-[1.8] ${subTextSize}`}>
        <p>
          {lang === "ko"
            ? "JK 아트컨벤션 4층 엠버루체홀"
            : "JK Art Convention ชั้น 4 Amberluce Hall"}
        </p>

        <p>
          {lang === "ko"
            ? "서울특별시 영등포구 문래로 164 (문래동3가 55-16번지)"
            : "164 Mullae-ro, Yeongdeungpo-gu, Seoul"}
        </p>

        <p>{lang === "ko" ? "SK리더스뷰" : "SK Leaders View"}</p>
      </div>

      {/* tabs */}
      <div className="flex justify-center gap-2 mb-4 mt-4">
        <button
          onClick={() => setMapViewMode("MAP")}
          className={`px-[14px] py-[6px] rounded-full border ${subTextSize} transition ${fontClass} ${
            mapViewMode === "MAP"
              ? "bg-[#111] text-white"
              : "bg-white text-black border-[#ddd]"
          }`}
        >
          {lang === "ko" ? "지도 보기" : "แผนที่"}
        </button>

        <button
          onClick={() => setMapViewMode("IMAGE")}
          className={`px-[14px] py-[6px] rounded-full border ${subTextSize} transition ${fontClass} ${
            mapViewMode === "IMAGE"
              ? "bg-[#111] text-white"
              : "bg-white text-black border-[#ddd]"
          }`}
        >
          {lang === "ko" ? "약도 보기" : "แผนที่ภาพ"}
        </button>
      </div>

      {/* map / image */}
      {mapViewMode === "MAP" ? (
        <div
          ref={mapContainerRef}
          className="w-full max-w-[420px] h-[350px] mx-auto rounded-[10px] overflow-hidden shadow-md"
        />
      ) : (
        <div className="flex justify-center">
          <Image
            src="/images/jk_map.jpg"
            alt="map"
            width={800}
            height={500}
            className="w-full max-w-[420px] rounded-xl"
          />
        </div>
      )}

      {/* navigation buttons */}
      <div
        className={`flex justify-center gap-3 mt-[15px] ${subTextSize} ${fontClass}`}
      >
        <a
          href="https://kko.to/Kg-9yiU8OY"
          target="_blank"
          className="flex items-center gap-[7px] bg-[#f8f8f8] px-4 py-[10px] rounded-lg shadow-sm hover:bg-[#eee]"
        >
          <Image
            src="/images/kakao_navi.svg"
            alt="kakao"
            width={32}
            height={32}
          />
          {lang === "ko" ? "카카오내비" : "Kakao Map"}
        </a>

        <a
          href="https://naver.me/Gn0yrSdR"
          target="_blank"
          className="flex items-center gap-[7px] bg-[#f8f8f8] px-4 py-[10px] rounded-lg shadow-sm hover:bg-[#eee]"
        >
          <Image
            src="/images/naver_map.png"
            alt="naver"
            width={32}
            height={32}
          />
          {lang === "ko" ? "네이버지도" : "Naver Map"}
        </a>
      </div>
    </div>
  );
}
