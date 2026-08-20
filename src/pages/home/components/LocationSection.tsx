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
      className="w-full px-6 md:px-12 lg:px-20 pt-6 pb-6 md:pt-8 md:pb-8 bg-[#f4f3ee] border-t border-[#1a1a1a]/10 font-sans"
    >
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
        {/* Header */}
        <div className="text-center">
          <span className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out inline-block text-[#8C2318] text-xs font-bold tracking-widest uppercase mb-2 font-sans">
            OFFLINE LOUNGE & ARCHITECTURE
          </span>
          <h2
            className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out font-gmarket font-bold text-3xl md:text-5xl text-[#1a1a1a] tracking-tight leading-tight mb-3"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT: Architectural Venue & Map Ticket Card (7 Cols) */}
          <div
            className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out lg:col-span-7 bg-[#1a1a1a] text-[#f4f3ee] border border-[#1a1a1a] flex flex-col justify-between relative overflow-hidden min-h-[380px] md:min-h-[440px]"
            style={{ transitionDelay: "0.3s" }}
          >
            {/* Top Bar Header */}
            <div className="bg-[#1a1a1a] px-5 py-3.5 flex items-center justify-between z-10 border-b border-[#f4f3ee]/15 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#8C2318] inline-block" />
                <span className="font-bold tracking-widest text-[#f4f3ee] uppercase">
                  ROOM 101 — CHANGGYEONGGUNG-RO 270
                </span>
              </div>
              <span className="text-[#f4f3ee]/60 text-[11px] font-bold uppercase tracking-wider hidden sm:inline">
                OPEN DAILY: 10:00 - 22:00
              </span>
            </div>

            {/* Architectural Photo Banner */}
            <div className="relative flex-1 bg-[#1a1a1a] overflow-hidden min-h-[260px] group">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
                alt="Questionity Seoul Lounge Venue"
                className="w-full h-full object-cover filter brightness-75 contrast-105 transition-transform duration-700 ease-out-ace group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/20 to-transparent" />

              {/* Ace Hotel Venue Address Pass Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#f4f3ee]/95 backdrop-blur p-4 border border-[#1a1a1a] shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans">
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#8C2318] uppercase tracking-widest block mb-0.5">
                    LOCATION ADDRESS
                  </span>
                  <p className="text-xs font-serif font-bold text-[#1a1a1a] leading-tight">
                    {addressText}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyAddress}
                    className="px-3.5 py-2 bg-[#1a1a1a] hover:bg-[#8C2318] text-[#f4f3ee] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {copied ? "COPIED!" : "COPY"}
                  </button>
                  <a
                    href={naverMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-[#8C2318] hover:bg-[#1a1a1a] text-[#f4f3ee] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    MAPS ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Ace Hotel Space Amenities Grid (5 Cols) */}
          <div
            className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out lg:col-span-5 bg-[#e8e6df]/60 p-6 md:p-8 border border-[#1a1a1a] flex flex-col justify-between space-y-6"
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="space-y-4">
              <div className="border-b border-[#1a1a1a]/15 pb-3">
                <span className="font-mono text-[10px] font-bold text-[#8C2318] uppercase tracking-widest block mb-1">
                  LOUNGE AMENITIES & FEATURES
                </span>
                <h3 className="font-gmarket font-bold text-xl md:text-2xl text-[#1a1a1a]">
                  혜화 독서 아지트 시설 안내
                </h3>
              </div>

              {/* 4 Feature Grid Items */}
              <div className="space-y-3 font-sans">
                <div className="bg-[#f4f3ee] p-3.5 border border-[#1a1a1a]/30 flex items-start gap-3">
                  <span className="font-mono text-xs font-bold bg-[#1a1a1a] text-[#f4f3ee] px-2 py-0.5 shrink-0">
                    01
                  </span>
                  <div>
                    <strong className="text-xs font-serif font-bold text-[#1a1a1a] block">ANALOG VINYL LOUNGE</strong>
                    <p className="text-[11px] text-[#1a1a1a]/70 leading-normal mt-0.5">LP 청음 장비 및 고음질 아날로그 오디오 시스템 보유</p>
                  </div>
                </div>

                <div className="bg-[#f4f3ee] p-3.5 border border-[#1a1a1a]/30 flex items-start gap-3">
                  <span className="font-mono text-xs font-bold bg-[#1a1a1a] text-[#f4f3ee] px-2 py-0.5 shrink-0">
                    02
                  </span>
                  <div>
                    <strong className="text-xs font-serif font-bold text-[#1a1a1a] block">SPECIALTY COFFEE BAR</strong>
                    <p className="text-[11px] text-[#1a1a1a]/70 leading-normal mt-0.5">핸드드립 스페셜티 원두 커피 및 블렌딩 티 무제한 제공</p>
                  </div>
                </div>

                <div className="bg-[#f4f3ee] p-3.5 border border-[#1a1a1a]/30 flex items-start gap-3">
                  <span className="font-mono text-xs font-bold bg-[#1a1a1a] text-[#f4f3ee] px-2 py-0.5 shrink-0">
                    03
                  </span>
                  <div>
                    <strong className="text-xs font-serif font-bold text-[#1a1a1a] block">SILENT READING TABLES</strong>
                    <p className="text-[11px] text-[#1a1a1a]/70 leading-normal mt-0.5">몰입 독서 및 소규모 오프라인 토론 전용 원목 롱테이블</p>
                  </div>
                </div>

                <div className="bg-[#f4f3ee] p-3.5 border border-[#1a1a1a]/30 flex items-start gap-3">
                  <span className="font-mono text-xs font-bold bg-[#8C2318] text-[#f4f3ee] px-2 py-0.5 shrink-0">
                    04
                  </span>
                  <div>
                    <strong className="text-xs font-serif font-bold text-[#1a1a1a] block">FREE PARKING PASS</strong>
                    <p className="text-[11px] text-[#1a1a1a]/70 leading-normal mt-0.5">건물 지하 주차장 2시간 무료 주차 쿠폰 지급</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#1a1a1a]/15 font-mono text-xs">
              <button
                onClick={handleCopyAddress}
                className="py-3 bg-[#f4f3ee] hover:bg-white text-[#1a1a1a] font-bold border border-[#1a1a1a] uppercase tracking-wider transition-all cursor-pointer"
              >
                {copied ? "COPIED!" : "COPY ADDRESS"}
              </button>
              <a
                href={naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 bg-[#1a1a1a] hover:bg-[#8C2318] text-[#f4f3ee] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
              >
                MAP ↗
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
