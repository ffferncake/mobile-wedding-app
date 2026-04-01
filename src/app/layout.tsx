import "./globals.css";
import { ReactNode } from "react";
import Script from "next/script";

export const metadata = {
  title: "은상 ♥ 펀 결혼합니다!",
  description:
    "2026년 09월 13일 일요일 오후 2시, JK아트컨벤션 4층 엠버루체홀 만나요.",
  openGraph: {
    title: "은상 ♥ 펀 결혼합니다!",
    description:
      "2026년 09월 13일 일요일 오후 2시, JK아트컨벤션 4층 엠버루체홀 만나요.",
    url: "https://fern-eunsang.vercel.app/",
    siteName: "은상 ♥ 펀 모바일 청첩장",
    images: [
      {
        url: "https://github.com/ffferncake/mobile-wedding-app/blob/main/public/images/gallery/gallery_5.JPG",
        width: 800,
        height: 600,
        alt: "은상 ♥ 펀 웨딩 사진",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="shortcut icon" href="/images/icon/flowers.png" />
        <meta property="og:title" content="은상 ♥ 펀 결혼합니다!" />
        <meta
          property="og:description"
          content="2026년 09월 13일 일요일 오후 2시, JK아트컨벤션 4층 엠버루체홀 만나요."
        />
        <meta
          property="og:image"
          content="https://fern-eunsang.vercel.app/images/gallery/gallery_5.JPG"
        />
        <meta property="og:url" content="https://fern-eunsang.vercel.app/" />
        <meta property="og:type" content="website" />
      </head>
      <body className="typo-crayon-font" suppressHydrationWarning={true}>
        {children}
        {/* ✅ Kakao Map SDK */}
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
          strategy="beforeInteractive" // ⭐ MUST CHANGE
        />
      </body>
    </html>
  );
}
