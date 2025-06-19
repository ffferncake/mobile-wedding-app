import styles from "./WeddingInvitation.module.css";
import Image from "next/image";
// import { useInView } from "react-intersection-observer";
// import { useEffect } from "react";
// import { motion, useAnimation } from "framer-motion";
import ScrollSection from "../app/components/ScrollSection"; // Client Component
import Head from "next/head";

export const metadata = {
  title: '지훈❤️수아 결혼식에 초대합니다',
  description: '2025년 10월 18일 토요일 오후 1시, 서울 라마다호텔 2층 그랜드홀에서 만나요.',
  openGraph: {
    title: '지훈❤️수아 결혼식에 초대합니다',
    description: '2025년 10월 18일 토요일 오후 1시, 서울 라마다호텔 2층 그랜드홀에서 만나요.',
    url: 'https://fern-eunsang.vercel.app/',
    siteName: '지훈❤️수아 모바일 청첩장',
    images: [
      {
        url: 'https://github.com/ffferncake/mobile-wedding-app/blob/main/public/photo1.PNG', // Replace with actual image URL
        width: 800,
        height: 600,
        alt: '지훈❤️수아 웨딩 사진',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '지훈❤️수아 결혼식에 초대합니다',
    description: '2025년 10월 18일 토요일 오후 1시, 서울 라마다호텔 2층 그랜드홀에서 만나요.',
    images: ['https://github.com/ffferncake/mobile-wedding-app/blob/main/public/photo1.PNG'],
  },
}

export default function WeddingInvitation() {
  return (
    <>
      <Head>
        <title>수산♡수이 결혼식에 초대합니다</title>
        <meta property="og:title" content="수산♡수이 결혼식에 초대합니다" />
        <meta
          property="og:description"
          content="2025년 6월 15일 일요일 12시 30분, 로얄파크컨벤션 3층 로얄홀에서 만나요."
        />
        <meta
          property="og:image"
          content="https://fern-eunsang.vercel.app/images/og-cover.png"
        />
        <meta property="og:url" content="https://fern-eunsang.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="수산♡수이 결혼식에 초대합니다" />
        <meta
          name="twitter:description"
          content="2025년 6월 15일 일요일 12시 30분, 로얄파크컨벤션 3층 로얄홀에서 만나요."
        />
        <meta
          name="twitter:image"
          content="https://fern-eunsang.vercel.app/images/photo1.png"
        />
      </Head>

      <div className={styles.container}>
        <section className={styles.cover}>
          <h1 className={styles.coverTitle}>은상 💝 펀</h1>
          <p className={styles.coverSubtitle}>저희 결혼합니다</p>
        </section>

        <ScrollSection>
          <div className={styles.card}>
            <p>2027.04.10</p>
            <p>SAT PM 12:00</p>
            <p>신도림 웨딩시티 8층 스타티스홀</p>
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>지훈 | 수아</p>
          </div>
        </ScrollSection>

        <ScrollSection>
          <div className={styles.quote}>
            <p>
              예쁜 연가에 들떴다.
              <br />
              우리는 언제나 손을 잡고 있게 될 것이다.
            </p>
            <p style={{ fontSize: "12px", marginTop: "5px" }}>
              《연인》, 이예체
            </p>
          </div>
        </ScrollSection>

        <ScrollSection>
          <div className={styles.inviteMessage}>
            <p className={styles.highlight}>소중한 분들을 초대합니다.</p>
            <p>작은 인연으로 만나 연인이 된 저희가</p>
            <p>이제는 더욱 단단한 인연을 맺고자</p>
            <p>저희 두 사람 결혼합니다.</p>
            <p style={{ marginTop: "10px" }}>
              귀한 걸음으로 축하해 주시면
              <br />더 없는 기쁨으로 간직하겠습니다.
            </p>
          </div>
        </ScrollSection>

        <ScrollSection>
          <div className={styles.inviteMessage}>
            <h3>오시는 길</h3>
            <a href="https://maps.google.com?q=라마다호텔 서울" target="_blank">
              구글지도 열기
            </a>
          </div>
        </ScrollSection>

        <ScrollSection>
          <div className={styles.inviteMessage}>
            <h3>우리 사진</h3>
          </div>
          <div className={styles.gallery}>
            <Image
              src="/images/photo1.png"
              alt="gallery-1"
              width={120}
              height={160}
            />
            <Image
              src="/images/photo1.png"
              alt="gallery-2"
              width={120}
              height={160}
            />
            <Image
              src="/images/photo1.png"
              alt="gallery-3"
              width={120}
              height={160}
            />
          </div>
        </ScrollSection>

        <ScrollSection>
          <div className={styles.inviteMessage}>
            <h3>참석 여부</h3>
            <a href="https://forms.gle/your-form-url" target="_blank">
              RSVP 하기
            </a>
          </div>
        </ScrollSection>

        <footer className={styles.footer}>
          © 2025 Eunsang & Fern Wedding Invitation
        </footer>
      </div>
    </>
  );
}
