"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./WeddingInvitation.module.css";
import Image from "next/image";
import ScrollSection from "../app/components/ScrollSection";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import HeartsBackground from "./components/HeartsBackground";
import WeddingCalendar from "./components/WeddingCalendar";
import { X, ChevronLeft, ChevronRight, Copy } from "lucide-react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX!;

export default function WeddingInvitation() {
  const allImages = [
    "/images/gallery/gallery_1.JPG",
    "/images/gallery/gallery_2.JPG",
    "/images/gallery/gallery_3.JPG",
    "/images/gallery/gallery_4.JPG",
    "/images/gallery/gallery_5.JPG",
    "/images/gallery/gallery_6.JPG",
    "/images/gallery/gallery_7.JPG",
    "/images/gallery/gallery_8.JPG",
    "/images/gallery/gallery_9.JPG",
    "/images/gallery/gallery_10.JPG",
    "/images/gallery/gallery_11.JPG",
    "/images/gallery/gallery_12.JPG",
    "/images/gallery/gallery_13.JPG",
    "/images/gallery/gallery_14.JPG",
    "/images/gallery/gallery_15.JPG",
    "/images/gallery/gallery_16.JPG",
  ];

  const [showAll, setShowAll] = useState(false);
  const visibleImages = showAll ? allImages : allImages.slice(0, 10);

  // 👇 Add these for full-screen image modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const images = [
    "/images/hall_1.jpg",
    "/images/hall_2.jpg",
    "/images/hall_3.jpg",
  ];
  const [currentHallIndex, setCurrentHallIndex] = useState(0);
  const [showHeader, setShowHeader] = useState(false);
  const [mapViewMode, setMapViewMode] = useState<"MAP" | "IMAGE">("MAP");

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowHeader(container.scrollTop > 100);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHallIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500); // 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isModalOpen]);

  const mapInitializedRef = useRef(false);

  useEffect(() => {
    // Only run when MAP tab is active
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

    // Marker
    new mapboxgl.Marker().setLngLat([126.8779692, 37.508535]).addTo(map);

    // Popup
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

    // ✅ CLEANUP
    return () => {
      map.remove();
      mapRef.current = null;
      mapInitializedRef.current = false;
    };
  }, [mapViewMode]);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const target = new Date("2026-09-13T02:00:00+09:00");

    const update = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
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
    audio.volume = 0.6;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.pause();
    } else {
      audio.muted = false;
      audio.play().catch(() => {});
    }
  }, [isMuted]);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setShowScrollBtn(contentRef.current.scrollTop > 200);
      }
    };
    const container = contentRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000); // ✅ every 5 secs

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <HeartsBackground />
      <div
        className={`${styles.tabNavContainer} ${
          showHeader ? styles.visible : styles.hidden
        }`}
      >
        <header className={styles.headerNav}>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={styles.menuBtn}
          >
            <Image
              src="/images/icon/hamburger_icon.svg"
              alt="menu"
              width={24}
              height={24}
            />
          </button>

          <div className={styles.titleCenter}>
            은상<span className={styles.heart}>💍</span>펀
          </div>

          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className={styles.muteBtn}
          >
            <Image
              src={
                isMuted
                  ? "/images/icon/volume_off.svg"
                  : "/images/icon/volume_on.svg"
              }
              alt="audio control"
              width={20}
              height={20}
            />
          </button>
        </header>
      </div>
      {/* Hamburger Side Menu */}
      {isMenuOpen && (
        <div className={styles.hamburgerMenuWrapper}>
          <div className={styles.hamburgerMenu}>
            <a
              href="#message"
              onClick={(e) => {
                e.preventDefault(); // Stop default jump
                document
                  .querySelector("#message")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsMenuOpen(false); // Close menu after scrolling
              }}
            >
              초대글
            </a>

            <a
              href="#weddinginfo"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#weddinginfo")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsMenuOpen(false);
              }}
            >
              예식안내
            </a>

            <a
              href="#accountnumber"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#accountnumber")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsMenuOpen(false);
              }}
            >
              마음 전하실 곳
            </a>

            <a
              href="#location"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#location")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsMenuOpen(false);
              }}
            >
              오시는길
            </a>

            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#gallery")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsMenuOpen(false);
              }}
            >
              웨딩 갤러리
            </a>
          </div>
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.contentContainer} ref={contentRef}>
          <section className={styles.cover}>
            <p className={styles.coverText}>
              {"We're getting married".split("").map((char, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.06}s` }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </p>
            <p className={styles.coverSubText}>EUNSANG & FERN</p>
            <p className={styles.coverDate}>2027.09.13 2PM</p>
            <div
              className={`${styles.coverBg} ${
                bgIndex === 0 ? styles.active : ""
              }`}
              style={{ backgroundImage: 'url("/images/bg_updated_1.png")' }}
            />
            <div
              className={`${styles.coverBg} ${
                bgIndex === 1 ? styles.active : ""
              }`}
              style={{ backgroundImage: 'url("/images/bg_updated_2.png")' }}
            />
          </section>

          <ScrollSection>
            <div id="date" className={styles.card}>
              <p>2026.09.13 2:00PM</p>
              <p>JK아트컨벤션 4층 엠버루체홀</p>
              <strong>
                <p>은상 💍 펀</p>
              </strong>
            </div>
          </ScrollSection>
          <ScrollSection>
            <div id="message" className={styles.inviteMessage}>
              <p className={styles.title_en}>INVITATION</p>
              <p className={styles.highlight}>소중한 분들을 초대합니다.</p>
              <p style={{ marginTop: "10px" }}>
                작은 인연으로 만나 연인이 된 저희가
              </p>
              <p>이제는 더욱 단단한 인연을 맺고자</p>
              <p>저희 두 사람 결혼합니다.</p>
              <p style={{ marginTop: "10px" }}>
                귀한 걸음으로 축하해 주시면
                <br />더 없는 기쁨으로 간직하겠습니다.
              </p>

              {/* 부모님 소개 섹션 */}
              <div className={styles.parentInfo}>
                <div className={styles.parentColumn}>
                  <div className={styles.parentName}>
                    <p className={styles.dadName}>유영운</p>
                    <p>·</p>
                    <p className={styles.momName}>신혜원</p>
                    <p>의 아들 🤵🏻</p>
                  </div>
                  <div className={styles.parentName}>
                    <p className={styles.dadName}>Nhong</p>
                    <p>·</p>
                    <p className={styles.momName}>Kagh</p>
                    <p>의 딸 👰🏻‍♀️</p>
                  </div>
                </div>
              </div>
              <div className={styles.kidsImg}>
                <div className={styles.ourName}>
                  {/* <Image
                    src="/images/oppa_kids_ver2.png"
                    alt="oppa img"
                    width={55}
                    height={150}
                  />{" "} */}
                  <Image
                    src="/images/oppa_kids_ver.png"
                    alt="oppa img"
                    width={100}
                    height={100}
                  />
                  <div className={styles.ourNameIcon}>
                    <p>유은상</p>
                    <a href="tel:01033883415" className={styles.phoneIcon}>
                      📞
                    </a>
                  </div>
                </div>
                <div className={styles.ourName}>
                  {/* <Image
                    src="/images/me_kids_ver2.PNG"
                    alt="my img"
                    width={60}
                    height={150}
                  />{" "} */}
                  <Image
                    src="/images/me_kids_ver.png"
                    alt="my img"
                    width={100}
                    height={100}
                  />
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
          {/* 예식 안내 */}
          <ScrollSection>
            <div id="weddinginfo" className={styles.inviteMessage}>
              <p className={styles.title_en}>WEDDING HALL</p>
              <h3 className={styles.highlight}>예식 안내</h3>
              <div className={styles.locationInfo}>
                <p className={styles.locationName}>
                  JK Art Convention (JK아트컨벤션)
                </p>
                <p className={styles.locationFloor}>
                  4층 Amberluce Hall (엠버루체홀)
                </p>
              </div>
              <div className={styles.weddingImgWrapper}>
                {images.map((src, idx) => (
                  <Image
                    key={src}
                    src={src}
                    alt="wedding hall"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className={`${styles.weddingImg} ${
                      idx === currentHallIndex ? styles.active : ""
                    }`}
                    onClick={() =>
                      window.open(
                        "http://www.jkart.co.kr/wedding/amberluce/",
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  />
                ))}
              </div>

              {/* 🗓 Add Calendar */}
              <WeddingCalendar />
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
          {/* 신랑 & 신부 소개합니다 */}
          <ScrollSection>
            <div id="gallery" className={styles.inviteMessage}>
              <p className={styles.title_en}>INTRODUCTION</p>
              <h3 className={styles.highlight}>신랑 & 신부 소개합니다</h3>
            </div>
            <div className={styles.kidsImg}>
              <div className={styles.oppaPart}>
                <Image
                  src="/images/oppa_kids_ver.png"
                  alt="oppa img"
                  width={150}
                  height={150}
                />
                <h3>유은상</h3>
                <p>92년산 🍾🐒✨</p>
                <p>건축공학 엔지니어</p>
              </div>
              <div className={styles.oppaPart}>
                <Image
                  src="/images/me_kids_ver.png"
                  alt="my img"
                  width={150}
                  height={150}
                />
                <h3>펀 | FERN</h3>
                <p>99년산 🍼🐰💖</p>
                <p>프론트엔드 개발자</p>
              </div>
            </div>
          </ScrollSection>
          {/* 갤러리 */}
          <ScrollSection>
            <div id="gallery" className={styles.inviteMessage}>
              <p className={styles.title_en}>GALLERY</p>
              <h3 className={styles.highlight}>웨딩 갤러리</h3>
            </div>

            <div className={styles.gallery}>
              {visibleImages.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`gallery-${index + 1}`}
                  width={140}
                  height={200}
                  onClick={() => openModal(index)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>

            {/* Modal Fullscreen Gallery */}
            {isModalOpen && (
              <div className={styles.modalOverlay} onClick={closeModal}>
                <div
                  className={styles.modalContent}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={allImages[currentIndex]}
                    alt={`modal-${currentIndex}`}
                    width={420}
                    height={500}
                    className={styles.modalImage}
                  />
                  <button className={styles.modalClose} onClick={closeModal}>
                    <X size={28} />
                  </button>

                  <button className={styles.modalPrev} onClick={showPrev}>
                    <ChevronLeft size={36} />
                  </button>

                  <button className={styles.modalNext} onClick={showNext}>
                    <ChevronRight size={36} />
                  </button>

                  <p className={styles.imageCounter}>
                    {currentIndex + 1} / {allImages.length}
                  </p>
                </div>
              </div>
            )}

            {allImages.length > 10 && (
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
              <p className={styles.title_en}>ACCOUNT</p>
              <h3 className={styles.highlight}>마음 전하실 곳 </h3>
              <p>
                소중한 축하를 보내주셔서 감사드리며,
                <br />
                따뜻한 마음에 깊이 감사드립니다.
              </p>

              <div className={styles.accountWrapper}>
                <div className={styles.account}>
                  <Image
                    src="/images/toss.png"
                    alt="toss icon"
                    width={32}
                    height={32}
                  />
                  <span>토스뱅크 1001-5731-0736</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("1001-5731-0736");
                      alert("계좌번호가 복사되었습니다.");
                    }}
                    className={styles.copyButton}
                  >
                    복사
                    <Copy className={styles.copyButtonIcon} />
                  </button>
                </div>
                <span>TRAKULPHUDPHONG NICHANUN (커플통장)</span>
              </div>
            </div>
          </ScrollSection>
          {/* 오시는길 */}
          <ScrollSection>
            <div id="location" className={styles.inviteMessage}>
              <p className={styles.title_en}>LOCATION</p>
              <h3 className={styles.highlight}>오시는 길</h3>
              <div className={styles.locationInfo}>
                <p>JK 아트컨벤션 4층 엠버루체홀</p>
                <p>
                  서울특별시 영등포구 문래로 164 (문래동3가 55-16번지)
                  SK리더스뷰
                </p>
              </div>
              {/* --- Map / Image Tabs --- */}
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

              {/* --- Content --- */}
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
          </ScrollSection>
          {/* 지하철 이용시 */}
          <ScrollSection>
            <div id="location-subway" className={styles.inviteMessage}>
              <p className={styles.title_en}>SUBWAY</p>
              <h3 className={styles.highlight}>지하철 이용시</h3>
              <div className={styles.subwayInfo}>
                <div className={styles.subwaylineInfo}>
                  <Image
                    src="/images/icon/ellipse_green.svg"
                    alt="ellipse green"
                    width={19}
                    height={19}
                  />
                  <p>2호선 문래역역</p>
                </div>
              </div>
              <p>셔틀버스 : 4번출구(뒷쪽) 셔틀버스 운행</p>
              <p>도보이용 : 5번출구에서 전방 직진 300M</p>
            </div>
          </ScrollSection>

          {/* 버스 이용시 */}
          <ScrollSection>
            <div id="location-bus" className={styles.inviteMessage}>
              <p className={styles.title_en}>BUS</p>
              <h3 className={styles.highlight}>버스 이용시</h3>

              <div className={styles.busSection}>
                {/* 문래역 정류장 */}

                <div className={styles.busBlock}>
                  <p className={styles.busStopTitle}>○ 문래역 정류장 하차</p>

                  <div className={styles.busRowInline}>
                    <div className={styles.busRow}>
                      <span className={`${styles.busTag} ${styles.busGreen}`}>
                        지선버스
                      </span>
                      <span className={styles.busNumber}>6211, 6625</span>
                    </div>

                    <div className={styles.busRow}>
                      <span className={`${styles.busTag} ${styles.busBlue}`}>
                        간선버스
                      </span>
                      <span className={styles.busNumber}>641</span>
                    </div>

                    <div className={styles.busRow}>
                      <span className={`${styles.busTag} ${styles.busGreen}`}>
                        마을버스
                      </span>
                      <span className={styles.busNumber}>영등포12</span>
                    </div>
                  </div>
                </div>
                {/* 문래주민센터 */}
                <div className={styles.busBlock}>
                  <p className={styles.busStopTitle}>
                    ○ 문래주민센터 / 영일시장, 롯스 정류장 하차
                  </p>

                  <div className={styles.busRow}>
                    <span className={`${styles.busTag} ${styles.busGreen}`}>
                      마을버스
                    </span>
                    <span className={styles.busNumber}>영등포05</span>
                  </div>
                </div>
                {/* 벽산메가트리움 */}
                <div className={styles.busBlock}>
                  <p className={styles.busStopTitle}>
                    ○ 벽산메가트리움APT 정류장 하차
                  </p>

                  <div className={styles.busRow}>
                    <span className={`${styles.busTag} ${styles.busGreen}`}>
                      지선버스
                    </span>
                    <span className={styles.busNumber}>6516</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollSection>

          {/* 주차안내 */}
          <ScrollSection>
            <div id="location-parking" className={styles.inviteMessage}>
              <p className={styles.title_en}>PARKING</p>
              <h3 className={styles.highlight}>주차안내</h3>
              <p>네비게이션 : "JK아트컨벤션" 또는 "문래동 SK리더스뷰" 입력</p>
              <p>동시 1,000여대 주차 가능, 주차요원의 안내를 받으세요.</p>
            </div>
          </ScrollSection>
          {/* 참석 여부 */}
          {/* 참석 여부 / 공유하기 */}
          <ScrollSection>
            <div id="rsvp" className={styles.inviteMessage}>
              <p className={styles.title_en}>SHARE INVITATION</p>
              <h3 className={styles.highlight}>초대장 공유</h3>
              {/* Share Buttons */}
              <div className={styles.shareSection}>
                <button
                  className={styles.copyLinkButton}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("초대장 링크가 복사되었습니다 💌");
                  }}
                >
                  🔗 모바일 청첩장 링크 복사하기
                </button>
              </div>
            </div>
          </ScrollSection>

          <footer className={styles.footer}>
            © DEVELOPED BY Fern Nichanun
          </footer>
        </div>
      </div>
    </>
  );
}
