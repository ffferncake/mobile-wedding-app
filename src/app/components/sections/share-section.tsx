"use client";

export default function ShareSection() {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("초대장 링크가 복사되었습니다 💌");
  };

  return (
    <div id="rsvp" className="section">
      <p className="title-en">SHARE INVITATION</p>
      <h3 className="highlight">초대장 공유</h3>

      <div className="mt-[18px] flex justify-center gap-[10px] flex-wrap">
        <button
          onClick={copyLink}
          className="bg-[#f3f3f3] border border-[#ddd] px-[14px] py-[8px] rounded-full text-[13px] text-black transition-all duration-200 hover:bg-[#111] hover:text-white hover:border-[#111] hover:-translate-y-[1px] hover:shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
        >
          🔗 모바일 청첩장 링크 복사하기
        </button>
      </div>
    </div>
  );
}
