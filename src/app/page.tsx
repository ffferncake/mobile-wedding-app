"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./WeddingInvitation.module.css";
import Image from "next/image";
import ScrollSection from "../app/components/ScrollSection"; // Client Component
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { style } from "framer-motion/client";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZmVybmNha2UiLCJhIjoiY2txajcyaWwwMDh2bjMwbngwM2hnaGdjZSJ9.w6HwEX8hDJzyYKOC7X7WHg";

export default function WeddingInvitation() {
  const allImages = [
    "/images/photo1.png",
    "/images/photo1.png",
    "/images/photo1.png",
    "/images/photo1.png",
    "/images/photo1.png",
    "/images/photo1.png",
    "/images/photo1.png",
    "/images/photo1.png",
    "/images/photo1.png",
    "/images/photo1.png",
    "/images/photo1.png"
  ];

  const [showAll, setShowAll] = useState(false);
  const visibleImages = showAll ? allImages : allImages.slice(0, 9);

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (mapContainerRef.current && !mapRef.current) {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [126.8779692, 37.508535],
          zoom: 15
        });

        new mapboxgl.Marker().setLngLat([126.8779692, 37.508535]).addTo(map);

        mapRef.current = map;
      }
    }, 500); // Slight delay

    return () => {
      clearTimeout(timeout);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.tabNav}>
          <a href="#date">날짜</a>
          <a href="#quote">연가</a>
          <a href="#message">초대글</a>
          <a href="#location">오시는길</a>
          <a href="#gallery">갤러리</a>
          <a href="#rsvp">참석</a>
        </nav>
        <h1 className={styles.coverHeader}>결혼일보</h1>
        <section className={styles.cover}>
          <div className={styles.coverTitle}>
            유은상{" "}
            <Image
              src="/images/heart_icon_white.png"
              alt="heart ico white"
              width={32}
              height={32}
            />
            펀
          </div>
          <p className={styles.coverSubtitle}>저희 결혼합니다</p>
          <p className={styles.coverDetail}>2027.04.10 토요일 오후 12.00</p>
          <p className={styles.coverDetail}>
            웨딩시티 신도림 테크노마트 8층 스타티스홀
          </p>
        </section>

        <ScrollSection>
          <div id="date" className={styles.card}>
            <p>2027.04.10 12:00PM</p>
            <p>신도림 웨딩시티 8층 스타티스홀</p>
            <strong>
              <p>은상 | 펀</p>
            </strong>
          </div>
        </ScrollSection>

        {/* <ScrollSection>
          <div id="quote" className={styles.quote}>
            <p>
              예쁜 연가에 들떴다.
              <br />
              우리는 언제나 손을 잡고 있게 될 것이다.
            </p>
            <p style={{ fontSize: "12px", marginTop: "5px" }}>
              《연인》, 이예체
            </p>
          </div>
        </ScrollSection> */}
        <ScrollSection>
          <div id="message" className={styles.inviteMessage}>
            <p className={styles.highlight}>소중한 분들을 초대합니다.</p>
            <p>작은 인연으로 만나 연인이 된 저희가</p>
            <p>이제는 더욱 단단한 인연을 맺고자</p>
            <p>저희 두 사람 결혼합니다.</p>
            <p style={{ marginTop: "10px" }}>
              귀한 걸음으로 축하해 주시면
              <br />더 없는 기쁨으로 간직하겠습니다.
            </p>

            {/* 부모님 소개 섹션 */}
            <div className={styles.parentInfo}>
              <div className={styles.parentColumn}>
                <p className={styles.parentName}>유영운 · 신혜원의 아들</p>
                <p className={styles.parentName}>
                  Chelermchai · Monruedee의 딸
                </p>
                <p className={styles.parentNickname}>(Nhong · Kagh의 딸)</p>
              </div>
              <div className={styles.ourName}>
                <div className={styles.ourNameIcon}>
                  <p>유은상</p>
                  <a href="tel:01033883415" className={styles.phoneIcon}>
                    📞
                  </a>
                </div>
                <div className={styles.ourNameIcon}>
                  <p>펀</p>
                  <a href="tel:010-5334-9912" className={styles.phoneIcon}>
                    📞
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>

        <ScrollSection>
          <div id="location" className={styles.inviteMessage}>
            <h3 className={styles.highlight}>오시는 길</h3>
            <div className={styles.locationInfo}>
              <p>
                웨딩시티 신도림 테크노마트 <a href="tel:0221120000">📞</a>
              </p>
              <p>8층 스타티스홀</p>
              <p>서울 구로구 새말로 97 신도림테크노마트</p>
            </div>
            <div ref={mapContainerRef} className={styles.mapContainer} />

            <div className={styles.navLinks}>
              <a
                href="https://map.kakao.com/?q=%EC%9B%A8%EB%94%A9%EC%8B%9C%ED%8B%B0%20%EC%8B%A0%EB%8F%84%EB%A6%BC"
                target="_blank"
              >
                카카오내비
              </a>
              <a
                href="https://map.naver.com/p/search/%ED%85%8C%ED%81%AC%EB%85%B8%EB%A7%88%ED%8A%B8%20%EC%9B%A8%EB%94%A9%EC%8B%9C%ED%8B%B0/place/12867934?c=15.00,0,0,0,dh&isCorrectAnswer=true&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202506222339&locale=ko&svcName=map_pcv5&searchText=%ED%85%8C%ED%81%AC%EB%85%B8%EB%A7%88%ED%8A%B8%20%EC%9B%A8%EB%94%A9%EC%8B%9C%ED%8B%B0"
                target="_blank"
              >
                네이버지도
              </a>
            </div>
          </div>
        </ScrollSection>

        <ScrollSection>
          <div id="gallery" className={styles.inviteMessage}>
            <h3>갤러리</h3>
          </div>

          <div className={styles.gallery}>
            {visibleImages.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`gallery-${index + 1}`}
                width={120}
                height={160}
              />
            ))}
          </div>

          {allImages.length > 9 && (
            <div className={styles.showMoreWrapper}>
              <div
                onClick={() => setShowAll(!showAll)}
                className={styles.showMoreButton}
              >
                {showAll ? "접기 ▲" : "더 보기 ▼"}
              </div>
            </div>
          )}
        </ScrollSection>

        <ScrollSection>
          <div id="rsvp" className={styles.inviteMessage}>
            <h3>참석 여부</h3>
            <a href="https://forms.gle/your-form-url" target="_blank">
              RSVP 하기
            </a>
            {/* ✅ 카카오 공유 버튼 추가 */}
            <div>
              <button className={styles.shareButton}>
                💛 카카오톡으로 공유하기
              </button>
            </div>
          </div>
        </ScrollSection>

        <footer className={styles.footer}>
          © 2025 Eunsang & Fern Wedding Invitation
        </footer>
      </div>
    </>
  );
}
