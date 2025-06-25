"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./WeddingInvitation.module.css";
import Image from "next/image";
import ScrollSection from "../app/components/ScrollSection";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

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

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  useEffect(() => {
    const target = new Date("2027-04-10T12:00:00+09:00");

    const update = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00"
        });
        return;
      }

      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      );
      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0"
      );
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
        2,
        "0"
      );
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

      setTimeLeft({ days, hours, minutes, seconds });
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const audio = new Audio("/songs/until-i-found-you.mp3");
    audio.loop = true;
    audio.volume = 0.6; // Adjust volume
    audioRef.current = audio;

    if (!isMuted) {
      audio.play().catch((err) => console.error("Auto-play blocked:", err));
    }

    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((err) => console.error("Play error:", err));
      }
    }
  }, [isMuted]);
  return (
    <>
      <div className={styles.tabNavContainer}>
        <nav className={styles.tabNav}>
          <a href="#message">초대글</a>
          <a href="#weddinginfo">예식안내</a>
          <a href="#accountnumber">마음 전하실 곳</a>
          <a href="#location">오시는길</a>
          <a href="#gallery">갤러리</a>
           <button
            onClick={() => setIsMuted((prev) => !prev)}
            className={styles.muteBtn}
          >
            <Image
              src={isMuted ? "/images/volume_off.svg" : "/images/volume_on.svg"}
              alt="audio control"
              width={16}
              height={16}
            />
            </button>
        </nav>
        
      </div>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <h1 className={styles.coverHeader}>결혼일보</h1>
          <section className={styles.cover}>
            <div className={styles.coverTitle}>
              유은상{" "}
              <Image
                src="/images/heart_icon_white.png"
                alt="heart icon white"
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

              <div className={styles.kidsImg}>
                <Image
                  src="/images/oppa_kids_ver.png"
                  alt="oppa img"
                  width={100}
                  height={100}
                />{" "}
                <Image
                  src="/images/me_kids_ver.png"
                  alt="my img"
                  width={100}
                  height={100}
                />{" "}
              </div>
            </div>
          </ScrollSection>

          {/* 예식 안내 */}
          <ScrollSection>
            <div id="weddinginfo" className={styles.inviteMessage}>
              <h3 className={styles.highlight}>예식 안내</h3>
              <div className={styles.locationInfo}>
                <p>2027년 4월 10일 토요일 오후 12시 </p>
                <p>웨딩시티 신도림 테크노마트</p>
                <p>8층 스타티스홀</p>
              </div>
              <Image
                src="/images/weddinginfo_section.png"
                alt="wedding info section"
                width={250}
                height={250}
                className={styles.weddingInfoImg}
              />{" "}
              {/* ⏱ Countdown Timer */}
              <div className={styles.flipClock}>
                <div className={styles.flipUnit}>
                  <div className={styles.flipCard}>
                    <span>{timeLeft.days}</span>
                  </div>
                  <div className={styles.flipLabel}>DAYS</div>
                </div>
                <div className={styles.flipUnit}>
                  <div className={styles.flipCard}>
                    <span>{timeLeft.hours}</span>
                  </div>
                  <div className={styles.flipLabel}>HOURS</div>
                </div>
                <div className={styles.flipUnit}>
                  <div className={styles.flipCard}>
                    <span>{timeLeft.minutes}</span>
                  </div>
                  <div className={styles.flipLabel}>MINUTES</div>
                </div>
                <div className={styles.flipUnit}>
                  <div className={styles.flipCard}>
                    <span>{timeLeft.seconds}</span>
                  </div>
                  <div className={styles.flipLabel}>SECONDS</div>
                </div>
              </div>
            </div>
          </ScrollSection>

          {/* 갤러리 */}
          <ScrollSection>
            <div id="gallery" className={styles.inviteMessage}>
              <h3 className={styles.highlight}>갤러리</h3>
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

          {/* 마음 전하실 곳 */}
          <ScrollSection>
            <div id="accountnumber" className={styles.inviteMessage}>
              <h3 className={styles.highlight}>마음 전하실 곳 </h3>
              <p>
                소중한 축하를 보내주셔서 감사드리며, <br />
                따뜻한 마음에 깊이 감사드립니다.
              </p>
            </div>
          </ScrollSection>

          {/* 오시는길 */}
          <ScrollSection>
            <div id="location" className={styles.inviteMessage}>
              <h3 className={styles.highlight}>오시는 길</h3>
              <div className={styles.locationInfo}>
                <p>웨딩시티 신도림 테크노마트</p>
                <p>8층 스타티스홀</p>
                <p>서울 구로구 새말로 97 신도림테크노마트</p>
              </div>
              <div ref={mapContainerRef} className={styles.mapContainer} />

              <div className={styles.mapLinks}>
                <div className={styles.navLinks}>
                  <Image
                    src="/images/kakao_navi.svg"
                    alt="kakao icon"
                    width={32}
                    height={32}
                  />
                  <a
                    href="https://map.kakao.com/?q=%EC%9B%A8%EB%94%A9%EC%8B%9C%ED%8B%B0%20%EC%8B%A0%EB%8F%84%EB%A6%BC"
                    target="_blank"
                  >
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
                  <a
                    href="https://map.naver.com/p/search/%ED%85%8C%ED%81%AC%EB%85%B8%EB%A7%88%ED%8A%B8%20%EC%9B%A8%EB%94%A9%EC%8B%9C%ED%8B%B0/place/12867934?c=15.00,0,0,0,dh&isCorrectAnswer=true&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202506222339&locale=ko&svcName=map_pcv5&searchText=%ED%85%8C%ED%81%AC%EB%85%B8%EB%A7%88%ED%8A%B8%20%EC%9B%A8%EB%94%A9%EC%8B%9C%ED%8B%B0"
                    target="_blank"
                  >
                    네이버지도
                  </a>
                </div>
              </div>
            </div>
          </ScrollSection>

          {/* 참석 여부 */}
          {/* <ScrollSection>
          <div id="rsvp" className={styles.inviteMessage}>
            <h3>참석 여부</h3>
            <a href="https://forms.gle/your-form-url" target="_blank">
              RSVP 하기
            </a>
            <div>
              <button className={styles.shareButton}>
                💛 카카오톡으로 공유하기
              </button>
            </div>
          </div>
        </ScrollSection> */}

          <footer className={styles.footer}>
            © 2025 Eunsang & Fern Wedding Invitation
          </footer>
        </div>
      </div>
    </>
  );
}
