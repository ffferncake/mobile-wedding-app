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
    "/images/gallery_1.JPG",
    "/images/gallery_2.JPG",
    "/images/gallery_3.JPG",
    "/images/gallery_4.JPG",
    "/images/gallery_5.JPG",
    "/images/gallery_6.JPG",
    "/images/gallery_7.JPG",
    "/images/gallery_8.JPG",
    "/images/gallery_9.JPG",
    "/images/gallery_10.JPG",
    "/images/gallery_11.JPG",
    "/images/gallery_12.JPG",
    "/images/gallery_13.JPG",
    "/images/gallery_14.JPG",
    "/images/gallery_15.JPG",
  ];

  const [showAll, setShowAll] = useState(false);
  const visibleImages = showAll ? allImages : allImages.slice(0, 9);

  // 👇 Add these for full-screen image modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  const images = ["/images/hall_1.jpg", "/images/hall_2.jpg"];
  const [currentHallIndex, setCurrentHallIndex] = useState(0);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (mapContainerRef.current && !mapRef.current) {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [126.8779692, 37.508535],
          zoom: 15,
        });

        const marker = new mapboxgl.Marker()
          .setLngLat([126.8779692, 37.508535])
          .addTo(map);

        // Create popup DOM node
        const popupNode = document.createElement("div");
        popupNode.innerHTML = `
          <div class="${styles.popupContent}">
            <p>💒 웨딩시티 스타티스홀</p>
          </div>
        `;

        // Create and store popup
        const popup = new mapboxgl.Popup({
          closeOnClick: false,
          offset: 30,
        })
          .setDOMContent(popupNode)
          .setLngLat([126.8779692, 37.508535])
          .addTo(map);

        popupRef.current = popup;

        // Close button handler
        popupNode
          .querySelector("#closePopup")
          ?.addEventListener("click", () => {
            popup.remove();
          });

        // Show popup again when clicking marker
        marker.getElement().addEventListener("click", () => {
          if (!popupRef.current?.isOpen()) {
            popupRef.current?.addTo(map);
          }
        });

        mapRef.current = map;
      }
    }, 500);

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
    seconds: "00",
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

  return (
    <>
      <div className={styles.tabNavContainer}>
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
              갤러리
            </a>
          </div>
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.contentContainer} ref={contentRef}>
          <div
            className={styles.scrollToTopBtn}
            style={{ display: showScrollBtn ? "block" : "none" }}
            onClick={() => {
              contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Image
              src="/images/icon/scrollup.svg"
              alt="scroll to top"
              width={24}
              height={24}
            />
          </div>
          <section className={styles.cover}>
            {/* <div className={styles.coverTitle}>유은상 💍 펀</div>
            <p className={styles.coverSubtitle}>저희 결혼합니다</p>
            <p className={styles.coverDetail}>2027.04.10 토요일 오후 12.00</p>
            <p className={styles.coverDetail}>
              웨딩시티 신도림 테크노마트 8층 스타티스홀
            </p> */}
          </section>
          <ScrollSection>
            <div id="date" className={styles.card}>
              <p>2027.04.10 12:00PM</p>
              <p>신도림 웨딩시티 8층 스타티스홀</p>
              <strong>
                <p>은상 💍 펀</p>
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
                  <div className={styles.parentName}>
                    <p className={styles.dadName}>유영운</p>
                    <p>·</p>
                    <p className={styles.momName}>신혜원의 아들</p>
                    <p>🤵🏻</p>
                  </div>
                  <div className={styles.parentName}>
                    <p className={styles.dadName}>Nhong</p>
                    <p>·</p>
                    <p className={styles.momName}>Kagh의 딸</p>
                    <p>👰🏻‍♀️</p>
                  </div>
                </div>
              </div>
              <div className={styles.kidsImg}>
                <div className={styles.ourName}>
                  <Image
                    src="/images/oppa_kids_ver2.png"
                    alt="oppa img"
                    width={55}
                    height={150}
                  />{" "}
                  <div className={styles.ourNameIcon}>
                    <p>유은상</p>
                    <a href="tel:01033883415" className={styles.phoneIcon}>
                      📞
                    </a>
                  </div>
                </div>
                <div className={styles.ourName}>
                  <Image
                    src="/images/me_kids_ver2.PNG"
                    alt="my img"
                    width={60}
                    height={150}
                  />{" "}
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
              <h3 className={styles.highlight}>예식 안내</h3>
              <div className={styles.locationInfo}>
                <p>2027년 4월 10일 토요일 오후 12시 </p>
                <p>웨딩시티 신도림 테크노마트</p>
                <p>8층 스타티스홀</p>
              </div>
              <Image
                src={images[currentHallIndex]}
                alt="wedding hall"
                width={280}
                height={200}
                className={styles.weddingInfoImg}
                onClick={() =>
                  window.open(
                    "https://www.tmwedding.co.kr/8fhall1",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                style={{ cursor: "pointer" }}
              />

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
                <h3>펀</h3>
                <p>99년산 🍼🐰💖</p>
                <p>프론트엔드 개발자</p>
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
                  height={130}
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
                    width={600}
                    height={800}
                    className={styles.modalImage}
                  />
                  <button className={styles.modalClose} onClick={closeModal}>
                    ✕
                  </button>
                  <button className={styles.modalPrev} onClick={showPrev}>
                    ‹
                  </button>
                  <button className={styles.modalNext} onClick={showNext}>
                    ›
                  </button>
                  <p className={styles.imageCounter}>
                    {currentIndex + 1} / {allImages.length}
                  </p>
                </div>
              </div>
            )}

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
                  <Image
                    src="/images/icon/copy_icon.png"
                    alt="copy icon"
                    width={14}
                    height={14}
                  />
                </button>
              </div>
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
          {/* 지하철 이용시 */}
          <ScrollSection>
            <div id="location-subway" className={styles.inviteMessage}>
              <h3 className={styles.highlight}>지하철 이용시</h3>
              <div className={styles.subwayInfo}>
                <div className={styles.subwaylineInfo}>
                  <Image
                    src="/images/icon/ellipse_blue.svg"
                    alt="ellipse blue"
                    width={19}
                    height={19}
                  />
                  <p>1호선 신도림역</p>
                </div>
                <div className={styles.subwaylineInfo}>
                  <Image
                    src="/images/icon/ellipse_green.svg"
                    alt="ellipse green"
                    width={19}
                    height={19}
                  />
                  <p>2호선 신도림역</p>
                </div>
              </div>
              <p>신도림역 ③ 번출구 테크노마트</p>
              <p>판매동 지하1층과 직접 연결되어 있습니다</p>
            </div>
          </ScrollSection>
          {/* 주차안내 */}
          <ScrollSection>
            <div id="location-parking" className={styles.inviteMessage}>
              <h3 className={styles.highlight}>주차안내</h3>
              <p>테크노마트 지하주차장 이용(B3~B7)</p>
              <p>주차요원의 안내를 받으세요.</p>
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
            © Fern & Eunsang
            {/* <p>Eunsang & Fern Wedding Invitation</p> */}
          </footer>
        </div>
      </div>
    </>
  );
}
