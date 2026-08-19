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
      {/* Ace Hotel Style Animated Motion & Looping Video Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* HTML5 Looping Ambient Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] contrast-110 scale-105 animate-ace-kenburns"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-holding-an-open-book-in-a-library-42848-large.mp4" type="video/mp4" />
        </video>

        {/* Ambient Film Grain & Vintage Texture Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/60 to-[#1a1a1a]/40" />
        <div className="absolute inset-0 opacity-15 mix-blend-overlay bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      {/* Top Ticker Marquee Bar */}
      <div className="absolute top-20 md:top-24 left-0 right-0 z-20 bg-[#8C2318] text-[#f4f3ee] py-2 overflow-hidden border-b border-[#f4f3ee]/20 font-mono text-[10px] font-bold tracking-widest uppercase">
        <div className="whitespace-nowrap animate-marquee flex gap-12">
          <span>ACE HOTEL EDITORIAL ARCHITECTURE • QUESTIONITY BOOK SALON • 혜화 오마드랩스 창경궁로 270 • EST. 2026</span>
          <span>ACE HOTEL EDITORIAL ARCHITECTURE • QUESTIONITY BOOK SALON • 혜화 오마드랩스 창경궁로 270 • EST. 2026</span>
          <span>ACE HOTEL EDITORIAL ARCHITECTURE • QUESTIONITY BOOK SALON • 혜화 오마드랩스 창경궁로 270 • EST. 2026</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pt-40 pb-24 md:pt-52 md:pb-32 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out mb-8">
            <span className="inline-block border border-[#f4f3ee]/40 bg-[#1a1a1a]/60 backdrop-blur-md px-4 py-1.5 text-[#f4f3ee] text-xs font-mono font-bold tracking-widest uppercase">
              ROOM NO. 101 — QUESTIONITY & OMAD LABS
            </span>
          </div>

          <h1 className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out font-serif font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#f4f3ee] leading-[1.05] mb-8 tracking-tight" style={{ transitionDelay: "0.2s" }}>
            책으로 이어지는<br />
            <span className="italic font-normal text-[#e8e6df]">특별한 사람들.</span>
          </h1>

          <p className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out text-[#f4f3ee]/85 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl font-sans tracking-tightest" style={{ transitionDelay: "0.3s" }}>
            서울특별시 종로구 창경궁로 270 (혜화역 4번 출구 도보 3분)을 거점으로,<br className="hidden sm:block" />
            2,000+ 명의 독서 멤버와 5,000+ 건의 지적 대화가 만들어내는 프리미엄 에디토리얼 커뮤니티.
          </p>

          <div className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out flex flex-col sm:flex-row items-stretch sm:items-center gap-5" style={{ transitionDelay: "0.4s" }}>
            <a
              href="#clubs"
              className="bg-[#8C2318] text-[#f4f3ee] border border-[#8C2318] font-bold text-xs md:text-sm px-10 py-5 text-center transition-all duration-700 ease-out-ace hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_#f4f3ee] hover:bg-white hover:text-[#1a1a1a] uppercase tracking-widest"
            >
              모임 둘러보기 ↗
            </a>
            <a
              href="#how-it-works"
              className="border border-[#f4f3ee]/40 bg-[#1a1a1a]/40 backdrop-blur-sm text-[#f4f3ee] font-bold text-xs md:text-sm px-10 py-5 text-center transition-all duration-700 ease-out-ace hover:-translate-y-1.5 hover:border-[#f4f3ee] hover:bg-[#f4f3ee]/10 uppercase tracking-widest"
            >
              시작하는 방법
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Stamp */}
      <div className="absolute bottom-10 right-10 hidden md:block z-10 text-right font-mono">
        <span className="text-[10px] text-[#f4f3ee]/60 uppercase tracking-widest block bg-[#1a1a1a]/80 backdrop-blur border border-[#f4f3ee]/20 px-3 py-1.5">
          VENUE: CHANGGYEONGGUNG-RO 270
        </span>
        <span className="font-serif italic text-xs text-[#f4f3ee]/80 block mt-2">
          Ace Hotel Inspired Editorial UI
        </span>
      </div>

      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          50% { transform: scale(1.08) translateY(-10px); }
          100% { transform: scale(1); }
        }
        .animate-ace-kenburns {
          animation: kenburns 25s infinite alternate ease-in-out;
        }
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}