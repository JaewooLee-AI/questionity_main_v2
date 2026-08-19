import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.2 }
    );
    const elements = section.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#1a1a1a] text-[#f4f3ee]">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&q=80"
          alt="Ace Hotel Library Editorial"
          className="w-full h-full object-cover object-center filter brightness-50"
        />
        <div className="absolute inset-0 bg-[#1a1a1a]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-24 md:py-36 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <span className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out inline-block border-b border-[#f4f3ee]/40 text-[#f4f3ee]/80 text-xs font-bold tracking-widest uppercase pb-1 mb-6 font-sans">
            JOIN QUESTIONITY COMMUNITY
          </span>
          
          <h2 className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out font-serif font-bold text-4xl md:text-6xl text-[#f4f3ee] leading-tight mb-6" style={{ transitionDelay: "0.1s" }}>
            지금 바로 독서 클럽에<br />
            <span className="italic font-normal text-[#e8e6df]">참여하세요.</span>
          </h2>
          
          <p className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out text-[#f4f3ee]/80 text-base md:text-xl leading-relaxed mb-12 max-w-xl mx-auto font-sans tracking-tightest" style={{ transitionDelay: "0.2s" }}>
            책 한 권으로 연결되는 깊이 있는 대화와 특별한 조우.<br />
            서울특별시 종로구 창경궁로 270 오마드랩스에서 매월 새로운 책을 만나보세요.
          </p>

          <div className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out flex flex-col sm:flex-row items-center justify-center gap-5" style={{ transitionDelay: "0.3s" }}>
            <a
              href="#clubs"
              className="bg-[#8C2318] text-[#f4f3ee] font-bold text-xs md:text-sm px-10 py-5 transition-all duration-700 ease-out-ace hover:-translate-y-1.5 hover:shadow-2xl hover:bg-white hover:text-[#1a1a1a] uppercase tracking-widest"
            >
              모임 둘러보기
            </a>
            <Link
              to="/signup"
              className="border border-[#f4f3ee]/40 text-[#f4f3ee] font-bold text-xs md:text-sm px-10 py-5 transition-all duration-700 ease-out-ace hover:-translate-y-1.5 hover:border-[#f4f3ee] hover:bg-[#f4f3ee]/10 uppercase tracking-widest"
            >
              무료 회원가입
            </Link>
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