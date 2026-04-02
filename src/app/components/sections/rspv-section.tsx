"use client";

import { useState } from "react";

export default function RSVPSection() {
  const [attend, setAttend] = useState<"yes" | "no" | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

const handleSend = async () => {
  if (!attend) {
    alert("참석 여부를 선택해주세요");
    return;
  }

  if (!name) {
    alert("이름을 입력해주세요");
    return;
  }

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbxq5u4TXvYFs3xGc2MvGeJ10UeXL4ddOQ-_eHeDpO9ra81Ylu6kKuXf9YpgIajgwOkL/exec",
      {
        method: "POST",
        mode: "no-cors", // ✅ 핵심
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // ✅ 핵심
        },
        body: new URLSearchParams({
          name: name,
          attend: attend === "yes" ? "참석" : "불참",
        }),
      }
    );

    alert("전송 완료 🎉");

    setName("");
    setAttend(null);
  } catch (error) {
    console.error(error);
    alert("전송 실패 😢");
  }
};

  return (
    <div className="section text-center">
      <p className="title-en">R.S.V.P.</p>

      <h3 className="highlight text-[#c48a8a]">참석 의사 전달</h3>

      <p className="mt-3 text-gray-600 leading-relaxed">
        참석 여부를 선택 후 전달해 주세요.
      </p>

      {/* 참석 여부 */}
      <div className="flex gap-3 mt-3 text-sm">
        <button
          onClick={() => setAttend("yes")}
          className={`flex-1 py-2 rounded-xl border typo-crayon-font transition ${
            attend === "yes"
              ? "border-[#c48a8a] bg-[#fff5f5] text-[#c48a8a]"
              : "border-gray-200 text-gray-400"
          }`}
        >
          ✔ 참석
        </button>

        <button
          onClick={() => setAttend("no")}
          className={`flex-1 py-2 rounded-xl border typo-crayon-font transition ${
            attend === "no"
              ? "border-[#c48a8a] bg-[#fff5f5] text-[#c48a8a]"
              : "border-gray-200 text-gray-400"
          }`}
        >
          불참
        </button>
      </div>

      {/* 이름 */}
      <div className="mt-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-b border-gray-300 py-2 outline-none text-center text-gray-800 placeholder-gray-400 bg-transparent text-sm"
          placeholder="성함을 입력해 주세요"
        />
      </div>

      {/* 보내기 */}
      <button
        onClick={handleSend}
        disabled={loading}
        className="w-full mt-3 py-3 rounded-full border border-[#e5caca] text-[#c48a8a] typo-crayon-font hover:bg-[#fff5f5] transition text-sm disabled:opacity-50"
      >
        {loading ? "전송 중..." : "보내기"}
      </button>
    </div>
  );
}
