"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

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

    setLoading(true); // ✅ start loading

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxq5u4TXvYFs3xGc2MvGeJ10UeXL4ddOQ-_eHeDpO9ra81Ylu6kKuXf9YpgIajgwOkL/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            name: name,
            attend: attend === "yes" ? "참석" : "불참",
          }),
        },
      );

      alert("전송 완료 🎉");

      setName("");
      setAttend(null);
    } catch (error) {
      console.error(error);
      alert("전송 실패 😢");
    } finally {
      setLoading(false); // ✅ always stop loading
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
      <div className="flex gap-2 mt-3 text-sm justify-center">
        <button
          onClick={() => setAttend("yes")}
          disabled={loading}
          className={`px-4 py-1.5 rounded-full border typo-crayon-font transition flex items-center gap-1 ${
            attend === "yes"
              ? "border-[#c48a8a] bg-[#fff5f5] text-[#c48a8a]"
              : "border-gray-200 text-gray-400"
          }`}
        >
          🙌🏼 참석
        </button>

        <button
          onClick={() => setAttend("no")}
          disabled={loading}
          className={`px-4 py-1.5 rounded-full border typo-crayon-font transition flex items-center gap-1 ${
            attend === "no"
              ? "border-[#c48a8a] bg-[#fff5f5] text-[#c48a8a]"
              : "border-gray-200 text-gray-400"
          }`}
        >
          🙏 불참
        </button>
      </div>

      {/* 이름 */}
      <div className="mt-3 flex flex-col items-center gap-3">
        <div className="w-[260px] max-w-[80%]">
          {/* input */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="w-full border-b border-gray-300 py-2 outline-none text-center text-gray-800 placeholder-gray-400 bg-transparent text-sm"
            placeholder="성함을 입력해 주세요"
          />

          {/* send button */}
          <button
            onClick={handleSend}
            disabled={loading}
            className="w-full mt-3 py-2.5 rounded-full border border-[#e5caca] text-[#c48a8a] typo-crayon-font hover:bg-[#fff5f5] transition text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                전송 중...
              </>
            ) : (
              "보내기"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
