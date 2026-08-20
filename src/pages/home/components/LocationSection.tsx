import { useState, useEffect, useRef } from "react";

export default function LocationSection() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const addressText = "서울특별시 종로구 창경궁로 270 (혜화역 4번 출구 도보 3분)";
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent("서울특별시 종로구 창경궁로 270")}`;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.15 }
    );
    const elements = section.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="location"
      ref={sectionRef}
      className="w-full px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-[#f4f3ee] border-t border-[#1a1a1a]/10 font-sans"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out inline-block border-b border-[#1a1a1a] text-[#1a1a1a] text-xs font-bold tracking-widest uppercase pb-1 font-sans">
            OFFLINE LOUNGE & ARCHITECTURE
          </span>
          <h2
            className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out font-gmarket font-bold text-3xl md:text-5xl text-[#1a1a1a] tracking-tight leading-tight"
            style={{ transitionDelay: "0.1s" }}
          >
            오시는 길
          </h2>
          <p
            className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out text-[#1a1a1a]/70 text-base md:text-lg max-w-2xl mx-auto font-sans tracking-tightest"
            style={{ transitionDelay: "0.2s" }}
          >
            혜화역 오프라인 독서 아지트에서 아날로그적 질감과 지적인 대화를 나누어보세요.
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT: Architectural Map Card (7 Cols) */}
          <div
            className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out lg:col-span-7 bg-[#1a1a1a] text-[#f4f3ee] overflow-hidden border border-[#1a1a1a] flex flex-col justify-between relative min-h-[420px] transition-transform duration-700 ease-out-ace hover:-translate-y-2 hover:shadow-2xl"
            style={{ transitionDelay: "0.3s" }}
          >
            {/* Map Header Bar */}
            <div className="bg-[#1a1a1a] px-6 py-4 flex items-center justify-between z-10 border-b border-[#f4f3ee]/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#8C2318] inline-block" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#f4f3ee]/80 uppercase">NAVER MAP LOCATION</span>
              </div>
              <a
                href={naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#8C2318] text-[#f4f3ee] font-bold text-xs uppercase tracking-widest transition-all hover:bg-white hover:text-[#1a1a1a]"
              >
                네이버 지도에서 보기 ↗
              </a>
            </div>

            {/* Map Graphic Preview Box */}
            <div className="relative flex-1 bg-[#e8e6df] p-8 flex flex-col items-center justify-center text-center overflow-hidden min-h-[300px]">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px]" />
              
              {/* Pin Marker Callout */}
              <div className="relative z-10 bg-[#f4f3ee] p-6 border-2 border-[#1a1a1a] space-y-3 max-w-sm shadow-2xl">
                <div className="w-12 h-12 bg-[#8C2318] text-[#f4f3ee] flex items-center justify-center text-xl mx-auto font-serif">
                  📍
                </div>
                <strong className="text-lg font-serif font-bold text-[#1a1a1a] block">
                  퀘스처니티
                </strong>
                <span className="text-xs text-[#1a1a1a]/80 font-sans block leading-relaxed">
                  {addressText}
                </span>
                <span className="text-[10px] font-mono font-bold text-[#8C2318] bg-[#e8e6df] px-3 py-1 uppercase tracking-widest inline-block">
                  혜화역 4번 출구 3분
                </span>
              </div>

              {/* Bottom Quick Bar inside map */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#f4f3ee]/95 backdrop-blur p-3 border border-[#1a1a1a]/20 flex items-center justify-between text-xs z-10 font-sans">
                <span className="font-semibold text-[#1a1a1a] truncate">
                  📍 {addressText}
                </span>
                <a
                  href={naverMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-[#8C2318] font-bold uppercase tracking-wider hover:underline ml-3"
                >
                  길찾기 ↗
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Detailed Information Card (5 Cols) */}
          <div
            className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out lg:col-span-5 bg-white p-8 md:p-10 border border-[#1a1a1a]/15 flex flex-col justify-between space-y-8 transition-transform duration-700 ease-out-ace hover:-translate-y-2 hover:shadow-2xl"
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="space-y-6">
              <div className="space-y-2 pb-6 border-b border-[#1a1a1a]/10">
                <span className="text-xs font-bold text-[#8C2318] uppercase tracking-widest block">OFFLINE ADDRESS</span>
                <h3 className="font-serif font-bold text-2xl text-[#1a1a1a]">종로구 창경궁로 270</h3>
                <p className="text-xs text-[#1a1a1a]/60">서울특별시 종로구 오프라인 독서 아지트</p>
              </div>

              {/* Transportation Details */}
              <div className="space-y-5 text-xs text-[#1a1a1a]/80 font-sans">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#e8e6df] text-[#1a1a1a] flex items-center justify-center text-base shrink-0 font-serif font-bold border border-[#1a1a1a]/20">
                    🏢
                  </div>
                  <div>
                    <strong className="text-[#1a1a1a] block font-bold text-sm mb-1 font-serif">오프라인 코워킹 라운지</strong>
                    <p className="text-[#1a1a1a]/70 leading-relaxed">
                      창경궁로 270 공간에서 독서 모임 및 작업 가능.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#e8e6df] text-[#1a1a1a] flex items-center justify-center text-base shrink-0 font-serif font-bold border border-[#1a1a1a]/20">
                    🅿️
                  </div>
                  <div>
                    <strong className="text-[#1a1a1a] block font-bold text-sm mb-1 font-serif">주차 지원</strong>
                    <p className="text-[#1a1a1a]/70 leading-relaxed">
                      지하 주차장 무료 2시간 지원.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-[#1a1a1a]/10">
              <button
                onClick={handleCopyAddress}
                className="w-full py-4 bg-[#f4f3ee] hover:bg-[#e8e6df] text-[#1a1a1a] font-bold text-xs uppercase tracking-widest border border-[#1a1a1a] transition-all"
              >
                {copied ? "✅ 주소가 복사되었습니다!" : "📋 주소 복사하기"}
              </button>
              <a
                href={naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#1a1a1a] hover:bg-[#8C2318] text-[#f4f3ee] font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                네이버 지도로 길찾기 열기 ↗
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
