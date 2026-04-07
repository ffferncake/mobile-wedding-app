"use client";

import Image from "next/image";
import { Copy } from "lucide-react";

type Account = {
  bank: string;
  bankIcon: string;
  number: string;
  role: string;
  name?: string;
};

export default function AccountSection({
  lang = "ko",
}: {
  lang?: "ko" | "th";
}) {
  const accounts: Account[] =
    lang === "ko"
      ? [
          {
            bank: "토스뱅크",
            bankIcon: "/images/toss.png",
            number: "1001-5731-0736",
            role: "🤵🏻 신랑 · 신부 👰🏻‍♀️",
          },
          {
            bank: "국민은행",
            bankIcon: "/images/kb.png",
            number: "247901-04-336806",
            role: "🧑🏻 신랑 아버지",
            name: "유영운",
          },
          {
            bank: "국민은행",
            bankIcon: "/images/kb.png",
            number: "24721-0737-580",
            role: "👩🏻 신랑 어머니",
            name: "신혜원",
          },
        ]
      : [
          {
            bank: "KBank",
            bankIcon: "/images/kbank_logo.jpg",
            number: "067-8-92805-4",
            role: "🤵🏻 เจ้าบ่าว · เจ้าสาว 👰🏻‍♀️",
          },
        ];

  const copyAccount = (number: string) => {
    navigator.clipboard.writeText(number);
    alert(
      lang === "ko"
        ? "계좌번호가 복사되었습니다."
        : "คัดลอกเลขบัญชีเรียบร้อยแล้ว 💌",
    );
  };

  const isTH = lang === "th";

  const fontClass = isTH ? "pg-bathbomb" : "typo-crayon-font";
  const sectionSize = isTH ? "text-[20px]" : "text-[13px]";
  const titleSize = isTH ? "text-[22px]" : "text-[16px]";
  const highlightSize = isTH ? "text-[24px]" : "text-[18px]";
  const subTextSize = isTH ? "text-[18px]" : "text-[14px]";

  return (
    <div id="accountnumber" className="section">
      <p className={`title-en ${fontClass} ${titleSize}`}>ACCOUNT</p>

      <h3 className={`highlight ${fontClass} ${highlightSize}`}>
        {lang === "ko" ? "마음 전하실 곳" : "ช่องทางแสดงความยินดี"}
      </h3>

      <p className={`text-center ${fontClass} ${subTextSize}`}>
        {lang === "ko" ? (
          <>
            소중한 축하를 보내주셔서 감사드리며,
            <br />
            따뜻한 마음에 깊이 감사드립니다.
          </>
        ) : (
          <>
            ขอบพระคุณสำหรับคำอวยพร
            <br />
            และความยินดีจากทุกท่าน
          </>
        )}
      </p>

      <div className="flex flex-col gap-4 mt-3">
        {accounts.map((acc, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            <span
              className={`${subTextSize} font-semibold mb-1 text-[#555] ${fontClass}`}
            >
              {acc.role}
              {acc.name && <span> · {acc.name}</span>}
            </span>

            <div className="flex items-center justify-between gap-3 w-full bg-[#f8f8f8] rounded-lg shadow-sm px-4 py-3">
              <div className="flex items-center gap-2">
                <Image
                  src={acc.bankIcon}
                  alt={acc.bank}
                  width={28}
                  height={28}
                  className="rounded"
                />

                <span
                  className={`${subTextSize} font-medium text-[#333] ${fontClass}`}
                >
                  {acc.bank} {acc.number}
                </span>
              </div>

              <button
                onClick={() => copyAccount(acc.number)}
                className={`flex items-center gap-1 bg-white border border-gray-300 px-3 py-1.5 text-xs rounded-md hover:bg-gray-100 transition text-[#51698f] ${fontClass}`}
              >
                {lang === "ko" ? "복사" : "คัดลอก"}
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
