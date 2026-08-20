import { useEffect, useRef, useState } from "react";

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCouponPackage, setSelectedCouponPackage] = useState<number>(6);

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

  return (
    <section id="how-it-works" ref={sectionRef} className="w-full px-6 md:px-12 lg:px-20 pt-12 pb-6 md:pt-16 md:pb-8 bg-[#e8e6df] border-t border-[#1a1a1a]/15 font-sans">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        
        {/* Section Title Header */}
        <div className="text-center">
          <span className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out inline-block text-[#8C2318] text-xs font-bold tracking-widest uppercase mb-3 font-sans">
            MEMBERSHIP PASS & STEP GUIDE
          </span>
          <h2 className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out font-gmarket font-bold text-3xl md:text-5xl text-[#1a1a1a] leading-tight mb-4" style={{ transitionDelay: "0.1s" }}>
            이렇게 시작해요
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out text-[#1a1a1a]/75 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans tracking-tight break-keep" style={{ transitionDelay: "0.2s" }}>
            원하는 수량의 패스(2장 &bull; 6장 &bull; 10장)를 충전한 뒤,<br className="hidden sm:inline" />
            독서클럽 신청 시 1장씩 간편하게 차감하는 에이스 방식입니다.
          </p>
        </div>

        {/* 1. ACE HOTEL TICKET FLOW DIAGRAM (3-Step Guide) */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out bg-[#e8e6df]/50 border border-[#1a1a1a] p-6 md:p-10 relative" style={{ transitionDelay: "0.3s" }}>
          <div className="flex items-center justify-between border-b border-[#1a1a1a]/15 pb-4 mb-6">
            <span className="font-mono text-xs font-bold text-[#8C2318] uppercase tracking-widest">
              PROTOCOL 01 — MEMBERSHIP PROCESS
            </span>
            <span className="font-mono text-[10px] text-[#1a1a1a]/60 font-bold uppercase tracking-widest hidden sm:inline">
              QUESTIONITY CLUB TICKET SYSTEM
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-[#f4f3ee] border border-[#1a1a1a] p-6 space-y-4 relative group hover:bg-white transition-all">
              <div className="flex items-center justify-between border-b border-[#1a1a1a]/10 pb-3">
                <span className="font-mono text-xs font-bold bg-[#1a1a1a] text-[#f4f3ee] px-2.5 py-1 uppercase tracking-widest">
                  STEP 01
                </span>
                <span className="font-mono text-xs text-[#8C2318] font-bold">PASS SELECT</span>
              </div>
              <h4 className="font-gmarket font-bold text-lg text-[#1a1a1a]">멤버십 패스권 선택</h4>
              <p className="text-xs text-[#1a1a1a]/70 leading-relaxed font-sans">
                2장, 6장, 10장 단위의 멤버십 패스권을 할인가에 선택해 충전합니다.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[10px]">
                <span className="border border-[#1a1a1a]/30 px-2 py-0.5 font-bold">2 PASSES</span>
                <span className="border border-[#1a1a1a]/30 px-2 py-0.5 font-bold">6 PASSES</span>
                <span className="border border-[#1a1a1a]/30 px-2 py-0.5 font-bold">10 PASSES</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#f4f3ee] border border-[#1a1a1a] p-6 space-y-4 relative group hover:bg-white transition-all">
              <div className="flex items-center justify-between border-b border-[#1a1a1a]/10 pb-3">
                <span className="font-mono text-xs font-bold bg-[#1a1a1a] text-[#f4f3ee] px-2.5 py-1 uppercase tracking-widest">
                  STEP 02
                </span>
                <span className="font-mono text-xs text-[#8C2318] font-bold">EASY PAY</span>
              </div>
              <h4 className="font-gmarket font-bold text-lg text-[#1a1a1a]">원클릭 간편 결제</h4>
              <p className="text-xs text-[#1a1a1a]/70 leading-relaxed font-sans">
                계좌이체, 카카오페이, 네이버페이, 신용카드로 즉시 충전됩니다.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[10px]">
                <span className="border border-[#1a1a1a]/30 px-2 py-0.5 font-bold">NAVER PAY</span>
                <span className="border border-[#1a1a1a]/30 px-2 py-0.5 font-bold">KAKAO PAY</span>
                <span className="border border-[#1a1a1a]/30 px-2 py-0.5 font-bold">CARD</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#f4f3ee] border border-[#1a1a1a] p-6 space-y-4 relative group hover:bg-white transition-all">
              <div className="flex items-center justify-between border-b border-[#1a1a1a]/10 pb-3">
                <span className="font-mono text-xs font-bold bg-[#8C2318] text-[#f4f3ee] px-2.5 py-1 uppercase tracking-widest">
                  STEP 03
                </span>
                <span className="font-mono text-xs text-[#8C2318] font-bold">BOOK ROOM</span>
              </div>
              <h4 className="font-gmarket font-bold text-lg text-[#1a1a1a]">모임 자동 차감 신청</h4>
              <p className="text-xs text-[#1a1a1a]/70 leading-relaxed font-sans">
                원하는 독서클럽 결제창에서 패스 1장으로 신청 및 참여가 완료됩니다.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[10px]">
                <span className="border border-[#1a1a1a]/30 px-2 py-0.5 font-bold">1 PASS / ROOM</span>
                <span className="border border-[#1a1a1a]/30 px-2 py-0.5 font-bold">AUTO CONFIRM</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. ACE HOTEL EDITORIAL PASS CARDS (2개 / 6개 / 10개) */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out space-y-6" style={{ transitionDelay: "0.4s" }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1a1a1a]/15 pb-4">
            <div>
              <h3 className="font-gmarket font-bold text-xl md:text-2xl text-[#1a1a1a]">
                MEMBERSHIP PASS SELECTION
              </h3>
              <p className="text-xs text-[#1a1a1a]/70 mt-1 font-sans">
                패스 묶음 결제 시 최대 20% 할인 혜택이 적용됩니다.
              </p>
            </div>
            <span className="font-mono text-xs font-bold text-[#8C2318] uppercase tracking-widest">
              VALIDITY: 365 DAYS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 2 Pass Ticket Card */}
            <div
              onClick={() => setSelectedCouponPackage(2)}
              className={`p-6 border transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
                selectedCouponPackage === 2
                  ? "border-[#1a1a1a] bg-white shadow-xl ring-2 ring-[#1a1a1a]/20"
                  : "border-[#1a1a1a]/30 bg-[#e8e6df]/40 hover:bg-white shadow-xs"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1a1a1a]/10 pb-3 font-mono text-xs font-bold">
                  <span className="bg-[#1a1a1a]/10 text-[#1a1a1a] px-2 py-0.5 uppercase">
                    ENTRY PASS
                  </span>
                  <span className="text-[#8C2318]">5% OFF</span>
                </div>
                <h4 className="font-bebas text-3xl tracking-wide text-[#1a1a1a]">2 PASSES TICKET</h4>
                <p className="text-xs text-[#1a1a1a]/70 leading-relaxed font-sans">
                  독서 클럽에 가볍게 참여해보고 싶은 멤버를 위한 입문 티켓
                </p>
                <div className="pt-2 border-t border-[#1a1a1a]/10">
                  <div className="flex items-baseline gap-1">
                    <span className="font-bebas text-4xl text-[#1a1a1a]">168,000</span>
                    <span className="text-sm font-bold text-[#1a1a1a]">원</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#1a1a1a]/60 block mt-0.5">
                    (회당 84,000원 상당)
                  </span>
                </div>
              </div>

              <ul className="space-y-2 border-t border-[#1a1a1a]/10 pt-4 text-xs font-sans text-[#1a1a1a]/80">
                <li className="flex items-center gap-2">
                  <span className="text-[#8C2318] font-bold">✓</span> 모든 독서클럽 자유 이용 (패스 2장)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8C2318] font-bold">✓</span> 유효기간 6개월
                </li>
              </ul>

              <button
                className={`w-full py-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  selectedCouponPackage === 2
                    ? "bg-[#1a1a1a] text-[#f4f3ee] shadow-md"
                    : "bg-[#e8e6df] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f4f3ee]"
                }`}
              >
                2 PASSES 선택하기
              </button>
            </div>

            {/* 6 Pass Ticket Card (Ace Hotel Signature Accent) */}
            <div
              onClick={() => setSelectedCouponPackage(6)}
              className={`p-6 border-2 transition-all cursor-pointer flex flex-col justify-between space-y-6 relative ${
                selectedCouponPackage === 6
                  ? "border-[#8C2318] bg-white shadow-2xl ring-2 ring-[#8C2318]/20"
                  : "border-[#8C2318]/60 bg-[#e8e6df]/70 hover:bg-white shadow-md"
              }`}
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#8C2318] text-[#f4f3ee] text-[11px] font-mono font-bold uppercase tracking-widest shadow-md">
                ★ MOST POPULAR (15% OFF)
              </div>

              <div className="space-y-4 pt-1">
                <div className="flex items-center justify-between border-b border-[#1a1a1a]/10 pb-3 font-mono text-xs font-bold">
                  <span className="bg-[#8C2318] text-[#f4f3ee] px-2 py-0.5 uppercase">
                    STANDARD PASS
                  </span>
                  <span className="text-[#8C2318]">BEST VALUE</span>
                </div>
                <h4 className="font-bebas text-3xl tracking-wide text-[#1a1a1a]">6 PASSES TICKET</h4>
                <p className="text-xs text-[#1a1a1a]/70 leading-relaxed font-sans">
                  꾸준한 독서 습관을 형성하고 다양한 모임을 경험할 추천 티켓
                </p>
                <div className="pt-2 border-t border-[#1a1a1a]/10">
                  <div className="flex items-baseline gap-1">
                    <span className="font-bebas text-4xl text-[#8C2318]">450,000</span>
                    <span className="text-sm font-bold text-[#1a1a1a]">원</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#8C2318] font-bold block mt-0.5">
                    (회당 75,000원 상당)
                  </span>
                </div>
              </div>

              <ul className="space-y-2 border-t border-[#1a1a1a]/10 pt-4 text-xs font-sans text-[#1a1a1a]">
                <li className="flex items-center gap-2">
                  <span className="text-[#8C2318] font-bold">✓</span> 모든 독서클럽 자유 이용 (패스 6장)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8C2318] font-bold">✓</span> 유효기간 1년 (365일)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8C2318] font-bold">✓</span> 독후감 에디토리얼 피드백 우선 제공
                </li>
              </ul>

              <button
                className={`w-full py-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  selectedCouponPackage === 6
                    ? "bg-[#8C2318] text-[#f4f3ee] shadow-lg"
                    : "bg-[#1a1a1a] text-[#f4f3ee] hover:bg-[#8C2318]"
                }`}
              >
                6 PASSES 선택하기
              </button>
            </div>

            {/* 10 Pass Ticket Card */}
            <div
              onClick={() => setSelectedCouponPackage(10)}
              className={`p-6 border transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
                selectedCouponPackage === 10
                  ? "border-[#1a1a1a] bg-white shadow-xl ring-2 ring-[#1a1a1a]/20"
                  : "border-[#1a1a1a]/30 bg-[#e8e6df]/40 hover:bg-white shadow-xs"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1a1a1a]/10 pb-3 font-mono text-xs font-bold">
                  <span className="bg-[#1a1a1a]/10 text-[#1a1a1a] px-2 py-0.5 uppercase">
                    VIP PASS
                  </span>
                  <span className="text-[#8C2318]">20% MAX OFF</span>
                </div>
                <h4 className="font-bebas text-3xl tracking-wide text-[#1a1a1a]">10 PASSES TICKET</h4>
                <p className="text-xs text-[#1a1a1a]/70 leading-relaxed font-sans">
                  1년 내내 깊이 있는 지적 성장을 도모하는 마니아 멤버 플랜
                </p>
                <div className="pt-2 border-t border-[#1a1a1a]/10">
                  <div className="flex items-baseline gap-1">
                    <span className="font-bebas text-4xl text-[#1a1a1a]">700,000</span>
                    <span className="text-sm font-bold text-[#1a1a1a]">원</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#8C2318] font-bold block mt-0.5">
                    (회당 70,000원 최저가)
                  </span>
                </div>
              </div>

              <ul className="space-y-2 border-t border-[#1a1a1a]/10 pt-4 text-xs font-sans text-[#1a1a1a]/80">
                <li className="flex items-center gap-2">
                  <span className="text-[#8C2318] font-bold">✓</span> 모든 독서클럽 자유 이용 (패스 10장)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8C2318] font-bold">✓</span> 유효기간 1년 (365일)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8C2318] font-bold">✓</span> 1:1 클럽장 세션 토론 혜택 1회
                </li>
              </ul>

              <button
                className={`w-full py-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  selectedCouponPackage === 10
                    ? "bg-[#1a1a1a] text-[#f4f3ee] shadow-md"
                    : "bg-[#e8e6df] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f4f3ee]"
                }`}
              >
                10 PASSES 선택하기
              </button>
            </div>
          </div>
        </div>

        {/* 3. SUPPORTED PAYMENT METHODS (Ace Hotel Boxed Grid) */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out bg-[#e8e6df]/50 border border-[#1a1a1a] p-6 md:p-8 space-y-4" style={{ transitionDelay: "0.5s" }}>
          <div className="flex items-center justify-between border-b border-[#1a1a1a]/15 pb-3">
            <h3 className="font-gmarket font-bold text-lg text-[#1a1a1a] flex items-center gap-2">
              <span>💳</span> 지원 결제 수단
            </h3>
            <span className="font-mono text-xs text-[#8C2318] font-bold uppercase tracking-widest">
              SECURE ACE PAY SYSTEM
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-[#f4f3ee] border border-[#1a1a1a]/30 flex items-center gap-3.5 hover:bg-white transition-colors">
              <div className="w-9 h-9 bg-[#1a1a1a] text-[#f4f3ee] font-mono font-bold flex items-center justify-center text-xs shrink-0">
                BANK
              </div>
              <div>
                <strong className="text-xs text-[#1a1a1a] block font-bold">실시간 계좌이체</strong>
                <span className="text-[11px] text-[#1a1a1a]/60">전 은행 즉시 간편 이체</span>
              </div>
            </div>

            <div className="p-4 bg-[#f4f3ee] border border-[#1a1a1a]/30 flex items-center gap-3.5 hover:bg-white transition-colors">
              <div className="w-9 h-9 bg-[#1a1a1a] text-[#f4f3ee] font-mono font-bold flex items-center justify-center text-xs shrink-0">
                CARD
              </div>
              <div>
                <strong className="text-xs text-[#1a1a1a] block font-bold">신용 / 체크카드</strong>
                <span className="text-[11px] text-[#1a1a1a]/60">국내외 카드 등록 결제</span>
              </div>
            </div>

            <div className="p-4 bg-[#f4f3ee] border border-[#8C2318]/40 flex items-center gap-3.5 hover:bg-white transition-colors">
              <div className="w-9 h-9 bg-[#8C2318] text-[#f4f3ee] font-mono font-bold flex items-center justify-center text-xs shrink-0">
                N-PAY
              </div>
              <div>
                <strong className="text-xs font-bold text-[#1a1a1a] block">네이버페이</strong>
                <span className="text-[11px] text-[#8C2318] font-bold">Naver Pay 포인트 적립</span>
              </div>
            </div>

            <div className="p-4 bg-[#f4f3ee] border border-[#1a1a1a]/30 flex items-center gap-3.5 hover:bg-white transition-colors">
              <div className="w-9 h-9 bg-[#FF6433] text-[#1a1a1a] font-mono font-bold flex items-center justify-center text-xs shrink-0">
                KAKAO
              </div>
              <div>
                <strong className="text-xs font-bold text-[#1a1a1a] block">카카오페이</strong>
                <span className="text-[11px] text-[#1a1a1a]/60">Kakao Pay 원클릭 결제</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}