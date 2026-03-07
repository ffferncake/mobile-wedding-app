"use client";

import Image from "next/image";
import { Copy } from "lucide-react";

export default function AccountSection() {
  const copyAccount = () => {
    navigator.clipboard.writeText("1001-5731-0736");
    alert("계좌번호가 복사되었습니다.");
  };

  return (
    <div id="accountnumber" className="section">
      {" "}
      <p className="title-en">ACCOUNT</p>
      <h3 className="text-[#3b417b] font-bold text-[16px]">마음 전하실 곳</h3>
      <p>
        소중한 축하를 보내주셔서 감사드리며,
        <br />
        따뜻한 마음에 깊이 감사드립니다.
      </p>
      <div className="flex flex-col items-center mt-[10px] gap-[10px] bg-[#f8f8f8] rounded-lg shadow-sm transition-colors p-[10px_14px]">
        <div className="flex items-center justify-between gap-[7px] font-medium text-[#333] no-underline w-full">
          <Image
            src="/images/toss.png"
            alt="toss icon"
            width={32}
            height={32}
            className="rounded"
          />

          <span>토스뱅크 1001-5731-0736</span>

          <button
            onClick={copyAccount}
            className="bg-white border border-gray-300 px-[10px] py-[6px] text-[13px] rounded-md cursor-pointer transition-all duration-200 text-[#333] flex items-center gap-[10px] hover:bg-gray-200"
          >
            복사
            <Copy className="w-[14px] h-[14px]" />
          </button>
        </div>

        <span>TRAKULPHUDPHONG NICHANUN (커플통장)</span>
      </div>
    </div>
  );
}
