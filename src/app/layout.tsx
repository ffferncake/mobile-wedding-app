import "./globals.css";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

// export const metadata = {
//   title: "Fern Nichanun",
//   description: "Ferncake Web Portfolio",

//   icons: {
//     icon: "/carrot.png",
//     shortcut: "/carrot.png",
//     apple: "/carrot.png",
//     other: {
//       rel: "shortcut icon",
//       url: "/carrot.png"
//     }
//   }
// };

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
    <html lang="en">
      {/* <head>
        <link rel="shortcut icon" type="image/png" href="/carrot.png" />
      </head> */}
      <link rel="shortcut icon" type="image/png" href="/carrot.png" />
      <body className={poppins.className}>{children}</body>
    </html>
  );
}