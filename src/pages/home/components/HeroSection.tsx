import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { heroContent } from "@/mocks/home";

export default function HeroSection() {
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
      { threshold: 0.1 }
    );
    const animatedElements = section.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#1a1a1a] text-[#f4f3ee]">
      {/* Background image with Ace mood overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=80"
          alt="Ace Hotel Library Mood"
          className="w-full h-full object-cover object-center filter brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/60 to-[#1a1a1a]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pt-36 pb-24 md:pt-48 md:pb-32 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out mb-8">
            <span className="inline-block border-b border-[#f4f3ee]/40 text-[#f4f3ee]/80 text-xs font-bold tracking-widest uppercase pb-1 font-sans">
              QUESTIONITY — EYES & EDITORIAL READINGS
            </span>
          </div>

          <h1 className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out font-serif font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#f4f3ee] leading-[1.05] mb-8 tracking-tight" style={{ transitionDelay: "0.2s" }}>
            책으로 이어지는<br />
            <span className="italic font-normal text-[#e8e6df]">특별한 사람들.</span>
          </h1>

          <p className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out text-[#f4f3ee]/80 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl font-sans tracking-tightest" style={{ transitionDelay: "0.3s" }}>
            경기도 성남시 분당태성빌딩 B1 오마드랩스를 거점으로,<br className="hidden sm:block" />
            2,000+ 명의 독서 멤버와 5,000+ 건의 지적 대화가 만들어내는 프리미엄 커뮤니티.
          </p>

          <div className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out flex flex-col sm:flex-row items-stretch sm:items-center gap-5" style={{ transitionDelay: "0.4s" }}>
            <a
              href="#clubs"
              className="bg-[#8C2318] text-[#f4f3ee] font-bold text-xs md:text-sm px-10 py-5 text-center transition-all duration-700 ease-out-ace hover:-translate-y-1.5 hover:shadow-2xl hover:bg-white hover:text-[#1a1a1a] uppercase tracking-widest"
            >
              모임 둘러보기
            </a>
            <a
              href="#how-it-works"
              className="border border-[#f4f3ee]/40 text-[#f4f3ee] font-bold text-xs md:text-sm px-10 py-5 text-center transition-all duration-700 ease-out-ace hover:-translate-y-1.5 hover:border-[#f4f3ee] hover:bg-[#f4f3ee]/10 uppercase tracking-widest"
            >
              시작하는 방법
            </a>
          </div>
        </div>
      </div>

      {/* Bottom info tag */}
      <div className="absolute bottom-10 right-10 hidden md:block z-10 text-right">
        <span className="font-mono text-[10px] text-[#f4f3ee]/50 uppercase tracking-widest block">
          LOCATION: BUNDANG TAESEONG BLDG B1
        </span>
        <span className="font-serif italic text-xs text-[#f4f3ee]/70 block mt-1">
          Ace Hotel Editorial Architecture
        </span>
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