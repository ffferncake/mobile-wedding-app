"use client";

import Image from "next/image";
import { Copy } from "lucide-react";

type Account = {
  bank: string;
  bankIcon: string;
  number: string;
  name: string;
};

export default function AccountSection() {
  const accounts: Account[] = [
    {
      bank: "토스뱅크",
      bankIcon: "/images/toss.png",
      number: "1001-5731-0736",
      name: "신랑 · 신부",
    },
    {
      bank: "국민은행",
      bankIcon: "/images/kb.png",
      number: "247901-04-336806",
      name: "신랑 아버지 · 유영운",
    },
    {
      bank: "국민은행",
      bankIcon: "/images/kb.png",
      number: "24721-0737-580",
      name: "신랑 어머니 · 신혜원",
    },
  ];

  const copyAccount = (number: string) => {
    navigator.clipboard.writeText(number);
    alert("계좌번호가 복사되었습니다.");
  };

  return (
    <div id="accountnumber" className="section">
      <p className="title-en">ACCOUNT</p>

      <h3 className="text-[#3b417b] font-bold text-[16px]">마음 전하실 곳</h3>

      <p>
        소중한 축하를 보내주셔서 감사드리며,
        <br />
        따뜻한 마음에 깊이 감사드립니다.
      </p>

      <div className="flex flex-col gap-3 mt-3">
        {accounts.map((acc, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-[#f8f8f8] rounded-lg shadow-sm p-[10px_14px]"
          >
            <div className="flex items-center justify-between gap-[7px] font-medium text-[#333] w-full">
              <Image
                src={acc.bankIcon}
                alt={acc.bank}
                width={32}
                height={32}
                className="rounded"
              />

              <span>
                {acc.bank} {acc.number}
              </span>

              <button
                onClick={() => copyAccount(acc.number)}
                className="bg-white border border-gray-300 px-[10px] py-[6px] text-[13px] rounded-md cursor-pointer flex items-center gap-[6px] hover:bg-gray-200"
              >
                복사
                <Copy className="w-[14px] h-[14px]" />
              </button>
            </div>

            <span className="text-sm mt-1">{acc.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
