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
  const fontClass = lang === "th" ? "pg-bathbomb" : "typo-crayon-font";

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
      config: { basemap: { lightPreset: "dusk", show3dObjects: true } },
    });

    mapRef.current = map;

    new mapboxgl.Marker().setLngLat([126.8779692, 37.508535]).addTo(map);

    const popupNode = document.createElement("div");
    popupNode.innerHTML = `
      <div class="flex gap-[6px] ${fontClass}">
        <p>💒 ${lang === "ko" ? "JK 아트컨벤션" : "JK Art Convention"}</p>
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
  }, [mapViewMode, lang]);

  return (
    <div id="location" className={`section ${fontClass}`}>
      <p className={`title-en ${fontClass}`}>LOCATION</p>

      <h3 className={`highlight ${fontClass}`}>
        {lang === "ko" ? "오시는 길" : "การเดินทาง"}
      </h3>

      <div className="text-center leading-[1.8]">
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
          className={`px-[14px] py-[6px] rounded-full border text-[14px] transition ${fontClass} ${
            mapViewMode === "MAP"
              ? "bg-[#111] text-white"
              : "bg-white text-black border-[#ddd]"
          }`}
        >
          {lang === "ko" ? "지도 보기" : "แผนที่"}
        </button>

        <button
          onClick={() => setMapViewMode("IMAGE")}
          className={`px-[14px] py-[6px] rounded-full border text-[14px] transition ${fontClass} ${
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
      <div className="flex justify-center gap-3 mt-[15px]">
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
