import "./globals.css";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import Script from 'next/script'

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});


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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="shortcut icon" href="/carrot.png" />
        <meta property="og:title" content="은상❤️펀 결혼식에 초대합니다" />
        <meta property="og:description" content="2025년 10월 18일 토요일 오후 1시, 서울 라마다호텔 2층 그랜드홀에서 만나요." />
        <meta property="og:image" content="https://fern-eunsang.vercel.app/images/photo1.png" />
        <meta property="og:url" content="https://fern-eunsang.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="은상❤️펀 결혼식에 초대합니다" />
        <meta name="twitter:description" content="2025년 10월 18일 토요일 오후 1시, 서울 라마다호텔 2층 그랜드홀에서 만나요." />
        <meta name="twitter:image" content="https://fern-eunsang.vercel.app/images/photo1.png" />
      </head>
      <body className={poppins.className}>
        {/* ✅ SDK 스크립트 */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js"
          strategy="beforeInteractive"
          integrity="sha384-pnQ9vEt9kgh2pV8W9PhN0LtBkIga4ZHPf0qluMS2eyxg+ZLMipPQ57WZbf10B8ZQ"
          crossOrigin="anonymous"
        />
        {children}
      </body>
    </html>

  );
}