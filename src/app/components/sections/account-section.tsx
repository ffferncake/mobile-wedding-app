"use client";

import Image from "next/image";
import { Copy } from "lucide-react";

type Account = {
  bank: string;
  bankIcon: string;
  number: string;
  role: string;
  name: string;
};

export default function AccountSection() {
  const accounts: Account[] = [
    {
      bank: "토스뱅크",
      bankIcon: "/images/toss.png",
      number: "1001-5731-0736",
      role: "신랑 · 신부",
      name: "",
    },
    {
      bank: "국민은행",
      bankIcon: "/images/kb.png",
      number: "247901-04-336806",
      role: "신랑 아버지",
      name: "유영운",
    },
    {
      bank: "국민은행",
      bankIcon: "/images/kb.png",
      number: "24721-0737-580",
      role: "신랑 어머니",
      name: "신혜원",
    },
  ];

  const copyAccount = (number: string) => {
    navigator.clipboard.writeText(number);
    alert("계좌번호가 복사되었습니다.");
  };

  return (
    <div id="accountnumber" className="section">
      <p className="title-en">ACCOUNT</p>

      <h3 className="highlight">마음 전하실 곳</h3>

      <p className="text-center">
        소중한 축하를 보내주셔서 감사드리며,
        <br />
        따뜻한 마음에 깊이 감사드립니다.
      </p>

      <div className="flex flex-col gap-4 mt-5">
        {accounts.map((acc, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            {/* Name OUTSIDE the box */}
            <span className="text-sm font-semibold mb-1">
              {acc.name ? (
                <>
                  <span className="text-[#51698f]">{acc.role}</span>
                  <span className="text-[#555]"> · {acc.name}</span>
                </>
              ) : (
                <span className="text-[#555]">{acc.role}</span>
              )}
            </span>

            {/* Account box */}
            <div className="flex items-center justify-between gap-3 w-full bg-[#f8f8f8] rounded-lg shadow-sm px-4 py-3">
              <div className="flex items-center gap-2">
                <Image
                  src={acc.bankIcon}
                  alt={acc.bank}
                  width={28}
                  height={28}
                  className="rounded"
                />

                <span className="text-sm font-medium text-[#333]">
                  {acc.bank} {acc.number}
                </span>
              </div>

              <button
                onClick={() => copyAccount(acc.number)}
                className="flex items-center gap-1 bg-white border border-gray-300 px-3 py-1.5 text-xs rounded-md hover:bg-gray-100 transition text-[#51698f] typo-crayon-font"
              >
                복사
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
