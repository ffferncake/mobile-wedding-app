import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "은상 ♥ 펀 결혼합니다!",
  description:
    "2027년 04월 10일 토요일 오후 12시, 웨딩시티 신도림 테크노마트 8층 스타티스홀 만나요.",
  openGraph: {
    title: "은상 ♥ 펀 결혼합니다!",
    description:
      "2027년 04월 10일 토요일 오후 12시, 웨딩시티 신도림 테크노마트 8층 스타티스홀 만나요.",
    url: "https://fern-eunsang.vercel.app/",
    siteName: "은상 ♥ 펀 모바일 청첩장",
    images: [
      {
        url: "https://github.com/ffferncake/mobile-wedding-app/blob/main/public/photo1.png",
        width: 800,
        height: 600,
        alt: "은상 ♥ 펀 웨딩 사진"
      }
    ],
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="shortcut icon" href="/images/icon/heart_icon.png" />
        <meta property="og:title" content="은상 ♥ 펀 결혼합니다!" />
        <meta
          property="og:description"
          content="2027년 04월 10일 토요일 오후 12시, 웨딩시티 신도림 테크노마트 8층 스타티스홀 만나요."
        />
        <meta
          property="og:image"
          content="https://fern-eunsang.vercel.app/images/photo1.png"
        />
        <meta property="og:url" content="https://fern-eunsang.vercel.app/" />
        <meta property="og:type" content="website" />
      </head>
      <body className="nexon-font" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
