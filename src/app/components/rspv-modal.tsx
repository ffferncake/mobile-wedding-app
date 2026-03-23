export function RSVPModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="mt-20 bg-white w-full max-w-md rounded-2xl px-6 py-7 relative shadow-lg">
        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* title */}
        <h3 className="text-lg font-semibold text-center">참석 의사 전달</h3>

        <p className="text-center text-sm text-gray-400 mt-2 leading-relaxed">
          원활한 예식 진행을 위해 참석 정보를
          <br />
          미리 알려주시면 감사하겠습니다.
        </p>

        {/* 참석 여부 */}
        <div className="flex gap-3 mt-7">
          <button className="flex-1 py-3 rounded-xl border border-[#c48a8a] text-[#c48a8a] bg-[#fff5f5] typo-crayon-font">
            ✔ 가능
          </button>
          <button className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-400 typo-crayon-font">
            불가
          </button>
        </div>

        {/* 이름 */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-1">성함</p>
          <input
            className="w-full border-b border-gray-200 py-2 outline-none placeholder-gray-300"
            placeholder="성함을 입력해 주세요."
          />
        </div>

        {/* 연락처 */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-1">연락처</p>
          <input
            className="w-full border-b border-gray-200 py-2 outline-none placeholder-gray-300"
            placeholder="참석자 대표 연락처를 입력해 주세요."
          />
        </div>

        {/* 추가 인원 */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-gray-500">추가인원</span>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 border border-gray-200 rounded-full text-gray-400">
              −
            </button>
            <span className="text-sm">0</span>
            <button className="w-8 h-8 border border-gray-200 rounded-full text-gray-400">
              +
            </button>
          </div>
        </div>

        {/* 식사 여부 */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">식사여부</p>
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl border border-[#c48a8a] bg-[#fff5f5] text-[#c48a8a] typo-crayon-font">
              ✔ 식사함
            </button>
            <button className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-400 typo-crayon-font">
              식사안함
            </button>
          </div>
        </div>

        {/* 버스 여부 */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">버스 탑승 여부</p>
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl border border-[#c48a8a] bg-[#fff5f5] text-[#c48a8a] typo-crayon-font">
              ✔ 탑승함
            </button>
            <button className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-400 typo-crayon-font">
              탑승안함
            </button>
          </div>
        </div>

        {/* textarea */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-1">전달사항</p>
          <textarea
            className="w-full border-b border-gray-200 py-2 outline-none placeholder-gray-300"
            placeholder="전달하실 내용을 입력해 주세요. (최대 30자)"
          />
        </div>

        {/* submit */}
        <button className="w-full mt-7 py-3 rounded-full border border-[#e5caca] text-[#c48a8a] typo-crayon-font hover:bg-[#fff5f5] transition">
          참석의사 전달하기
        </button>
      </div>
    </div>
  );
}
