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
    <section id="how-it-works" ref={sectionRef} className="w-full px-4 md:px-8 lg:px-12 py-20 md:py-28 bg-[#EFECE6] border-t border-b border-[#D8D4CA] font-sans">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out inline-block px-3.5 py-1 bg-[#111111] text-white text-xs font-bold tracking-widest uppercase rounded-none font-heading">
            PAYMENT & COUPON GUIDE
          </span>
          <h2 className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out font-gmarket font-bold text-3xl md:text-4xl text-[#111111] tracking-tight leading-tight" style={{ transitionDelay: "0.1s" }}>
            이렇게 시작해요
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out text-gray-700 text-base md:text-lg max-w-2xl mx-auto font-sans break-keep" style={{ transitionDelay: "0.2s" }}>
            실시간 계좌이체, 카드등록, 네이버페이, 카카오페이로 <strong>쿠폰(2개 / 6개 / 10개)</strong>을 구매한 뒤, 각 독서방 결제 시 <strong>쿠폰 1장</strong>으로 간편하게 참여하는 방식입니다.
          </p>
        </div>

        {/* 1. VISUAL FLOW DIAGRAM (쿠폰 결제 프로세스 도식화) */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out bg-white p-6 md:p-8 rounded-none border border-gray-200/80 shadow-sm space-y-6" style={{ transitionDelay: "0.3s" }}>
          <h3 className="font-heading font-bold text-lg text-gray-950 flex items-center gap-2">
            <span>🔄</span> 쿠폰 결제 & 독서방 이용 흐름도
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-amber-50/60 p-5 rounded-none border border-amber-200/80 space-y-3 relative group hover:border-amber-400 transition-colors">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-none bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                  01
                </span>
                <span className="text-xl">🎟️</span>
              </div>
              <h4 className="font-heading font-bold text-base text-gray-950">쿠폰 패키지 구매</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                계좌이체, 카드등록, 네이버페이, 카카오페이로 <strong>2개 / 6개 / 10개 쿠폰</strong>을 할인가에 충전합니다.
              </p>
              <div className="pt-2 flex flex-wrap gap-1">
                <span className="text-[10px] font-bold bg-white text-amber-800 px-2 py-0.5 rounded-none border border-amber-200">2개 패키지</span>
                <span className="text-[10px] font-bold bg-white text-amber-800 px-2 py-0.5 rounded-none border border-amber-200">6개 패키지</span>
                <span className="text-[10px] font-bold bg-white text-amber-800 px-2 py-0.5 rounded-none border border-amber-200">10개 패키지</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-blue-50/60 p-5 rounded-none border border-blue-200/80 space-y-3 relative group hover:border-blue-400 transition-colors">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-none bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                  02
                </span>
                <span className="text-xl">💳</span>
              </div>
              <h4 className="font-heading font-bold text-base text-gray-950">마이 쿠폰함 자동 보관</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                구매한 쿠폰은 <strong>내 계정 쿠폰함</strong>에 안전하게 보관되며, 최장 1년간 넉넉하게 사용 가능합니다.
              </p>
              <div className="pt-2 flex flex-wrap gap-1">
                <span className="text-[10px] font-bold bg-white text-blue-800 px-2 py-0.5 rounded-none border border-blue-200">유효기간 1년</span>
                <span className="text-[10px] font-bold bg-white text-blue-800 px-2 py-0.5 rounded-none border border-blue-200">실시간 잔여 확인</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-emerald-50/60 p-5 rounded-none border border-emerald-200/80 space-y-3 relative group hover:border-emerald-400 transition-colors">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-none bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                  03
                </span>
                <span className="text-xl">📖</span>
              </div>
              <h4 className="font-heading font-bold text-base text-gray-950">독서방 원클릭 쿠폰 차감</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                원하는 독서방 결제창에서 <strong>[쿠폰 1장 사용]</strong>을 누르면 추가 입금 없이 즉시 모임 신청이 완료됩니다.
              </p>
              <div className="pt-2 flex flex-wrap gap-1">
                <span className="text-[10px] font-bold bg-white text-emerald-800 px-2 py-0.5 rounded-none border border-emerald-200">원터치 신청</span>
                <span className="text-[10px] font-bold bg-white text-emerald-800 px-2 py-0.5 rounded-none border border-emerald-200">자동 승인</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. COUPON PACKAGE SELECTION CARDS (결제 관련 화면 2개 / 6개 / 10개 쿠폰) */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out space-y-6" style={{ transitionDelay: "0.4s" }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-xl text-gray-950">
                🎫 결제 관련 화면 (2개 / 6개 / 10개 쿠폰)
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                쿠폰 묶음 구매 시 최대 20% 할인가가 적용됩니다. 원하는 패키지를 선택해 보세요.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 2개 쿠폰 패키지 */}
            <div
              onClick={() => setSelectedCouponPackage(2)}
              className={`p-6 rounded-none border transition-all cursor-pointer flex flex-col justify-between space-y-5 bg-white ${
                selectedCouponPackage === 2
                  ? "border-amber-500 shadow-xl ring-2 ring-amber-500/20"
                  : "border-gray-200 hover:border-gray-300 shadow-sm"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-none">
                    입문 패키지
                  </span>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-none">
                    5% 할인
                  </span>
                </div>
                <h4 className="font-heading font-bold text-2xl text-gray-950">2개 쿠폰</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  독서 모임에 가볍게 참여해보고 싶은 초보 독서가를 위한 플랜
                </p>
                <div className="pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-gray-950">168,000</span>
                    <span className="text-sm font-bold text-gray-700">원</span>
                  </div>
                  <span className="text-[11px] text-gray-400 block mt-0.5">
                    (회당 84,000원 상당)
                  </span>
                </div>
              </div>

              <ul className="space-y-2 border-t border-gray-100 pt-4 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-amber-500 font-bold">✓</span> 모든 독서방 자유 수강 (쿠폰 2장)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-500 font-bold">✓</span> 유효기간 6개월
                </li>
              </ul>

              <button
                className={`w-full py-3 text-xs font-bold rounded-none transition-all ${
                  selectedCouponPackage === 2
                    ? "bg-amber-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                2개 쿠폰 선택하기
              </button>
            </div>

            {/* 6개 쿠폰 패키지 (RECOMMENDED) */}
            <div
              onClick={() => setSelectedCouponPackage(6)}
              className={`p-6 rounded-none border transition-all cursor-pointer flex flex-col justify-between space-y-5 bg-white relative ${
                selectedCouponPackage === 6
                  ? "border-[#b91c1c] shadow-2xl ring-2 ring-red-500/20"
                  : "border-gray-200 hover:border-gray-300 shadow-sm"
              }`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#b91c1c] text-white text-[11px] font-bold rounded-none shadow-md">
                🔥 가장 인기 / 추천
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-red-100 text-[#b91c1c] text-xs font-bold rounded-none">
                    스탠다드 패키지
                  </span>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-none">
                    15% 할인
                  </span>
                </div>
                <h4 className="font-heading font-bold text-2xl text-gray-950">6개 쿠폰</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  꾸준한 독서 습관을 기르고 다양한 커뮤니티를 경험할 모임 러버용
                </p>
                <div className="pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-gray-950">450,000</span>
                    <span className="text-sm font-bold text-gray-700">원</span>
                  </div>
                  <span className="text-[11px] text-[#b91c1c] font-semibold block mt-0.5">
                    (회당 75,000원 상당)
                  </span>
                </div>
              </div>

              <ul className="space-y-2 border-t border-gray-100 pt-4 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-[#b91c1c] font-bold">✓</span> 모든 독서방 자유 수강 (쿠폰 6장)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#b91c1c] font-bold">✓</span> 유효기간 1년 (365일)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#b91c1c] font-bold">✓</span> 독후감 피드백 우선권 제공
                </li>
              </ul>

              <button
                className={`w-full py-3 text-xs font-bold rounded-none transition-all ${
                  selectedCouponPackage === 6
                    ? "bg-[#b91c1c] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                6개 쿠폰 선택하기
              </button>
            </div>

            {/* 10개 쿠폰 패키지 */}
            <div
              onClick={() => setSelectedCouponPackage(10)}
              className={`p-6 rounded-none border transition-all cursor-pointer flex flex-col justify-between space-y-5 bg-white ${
                selectedCouponPackage === 10
                  ? "border-amber-500 shadow-xl ring-2 ring-amber-500/20"
                  : "border-gray-200 hover:border-gray-300 shadow-sm"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-none">
                    VIP 매니아
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-none">
                    20% 최대 할인
                  </span>
                </div>
                <h4 className="font-heading font-bold text-2xl text-gray-950">10개 쿠폰</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  1년 내내 깊이 있는 독서와 성장을 도모하는 독서 마니아 추천
                </p>
                <div className="pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-gray-950">700,000</span>
                    <span className="text-sm font-bold text-gray-700">원</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
                    (회당 70,000원 최저가)
                  </span>
                </div>
              </div>

              <ul className="space-y-2 border-t border-gray-100 pt-4 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-amber-500 font-bold">✓</span> 모든 독서방 자유 수강 (쿠폰 10장)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-500 font-bold">✓</span> 유효기간 1년 (365일)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-500 font-bold">✓</span> 1:1 클럽장 스페셜 토론 1회
                </li>
              </ul>

              <button
                className={`w-full py-3 text-xs font-bold rounded-none transition-all ${
                  selectedCouponPackage === 10
                    ? "bg-amber-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                10개 쿠폰 선택하기
              </button>
            </div>
          </div>
        </div>

        {/* 3. SUPPORTED PAYMENT METHODS (실시간 계좌이체 / 카드등록 / 네이버페이 / 카카오페이) */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out bg-white p-6 md:p-8 rounded-none border border-gray-200/80 shadow-sm space-y-4" style={{ transitionDelay: "0.5s" }}>
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-gray-950 flex items-center gap-2">
              <span>💳</span> 지원 결제 수단
            </h3>
            <span className="text-xs text-gray-400 font-medium">안전 간편 결제 시스템</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-none border border-gray-200/80 flex items-center gap-3.5 hover:bg-gray-100/80 transition-colors">
              <div className="w-10 h-10 rounded-none bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg shrink-0">
                🏦
              </div>
              <div>
                <strong className="text-xs text-gray-900 block font-bold">실시간 계좌이체</strong>
                <span className="text-[11px] text-gray-500">모든 은행 간편이체</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-none border border-gray-200/80 flex items-center gap-3.5 hover:bg-gray-100/80 transition-colors">
              <div className="w-10 h-10 rounded-none bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-lg shrink-0">
                💳
              </div>
              <div>
                <strong className="text-xs text-gray-900 block font-bold">카드등록 결제</strong>
                <span className="text-[11px] text-gray-500">국내외 신용/체크카드</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/70 rounded-none border border-emerald-200/80 flex items-center gap-3.5 hover:bg-emerald-100/70 transition-colors">
              <div className="w-10 h-10 rounded-none bg-emerald-500 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                N Pay
              </div>
              <div>
                <strong className="text-xs font-bold text-emerald-950 block">네이버페이</strong>
                <span className="text-[11px] text-emerald-700">Naver Pay 포인트 적립</span>
              </div>
            </div>

            <div className="p-4 bg-amber-50/70 rounded-none border border-amber-200/80 flex items-center gap-3.5 hover:bg-amber-100/70 transition-colors">
              <div className="w-10 h-10 rounded-none bg-amber-400 text-amber-950 font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                Kakao
              </div>
              <div>
                <strong className="text-xs font-bold text-amber-950 block">카카오페이</strong>
                <span className="text-[11px] text-amber-800">Kakao Pay 원클릭 결제</span>
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