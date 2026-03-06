"use client";

import { useState, useEffect, useRef } from "react";
import styles from "../../WeddingInvitation.module.css";
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
      <div class="${styles.popupContent}">
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

      <div className={styles.locationInfo}>
        <p>JK 아트컨벤션 4층 엠버루체홀</p>
        <p>서울특별시 영등포구 문래로 164 (문래동3가 55-16번지) SK리더스뷰</p>
      </div>

      {/* Map Tabs */}
      <div className={styles.mapTabBar}>
        <button
          className={`${styles.mapTab} ${
            mapViewMode === "MAP" ? styles.activeTab : ""
          }`}
          onClick={() => setMapViewMode("MAP")}
        >
          지도 보기
        </button>

        <button
          className={`${styles.mapTab} ${
            mapViewMode === "IMAGE" ? styles.activeTab : ""
          }`}
          onClick={() => setMapViewMode("IMAGE")}
        >
          약도 보기
        </button>
      </div>

      {mapViewMode === "MAP" ? (
        <div ref={mapContainerRef} className={styles.mapContainer} />
      ) : (
        <div className={styles.mapImageWrapper}>
          <Image
            src="/images/jk_map.jpg"
            alt="JK Art Convention map"
            width={800}
            height={500}
            className={styles.mapImage}
            priority
          />
        </div>
      )}

      {/* Navigation links */}
      <div className={styles.mapLinks}>
        <div className={styles.navLinks}>
          <Image
            src="/images/kakao_navi.svg"
            alt="kakao icon"
            width={32}
            height={32}
          />
          <a href="https://kko.to/Kg-9yiU8OY" target="_blank">
            카카오내비
          </a>
        </div>

        <div className={styles.navLinks}>
          <Image
            src="/images/naver_map.png"
            alt="naver icon"
            width={32}
            height={32}
          />
          <a href="https://naver.me/Gn0yrSdR" target="_blank">
            네이버지도
          </a>
        </div>
      </div>
    </div>
  );
}
