import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { heroContent } from "@/mocks/home";

const HERO_SLIDES = [
  {
    type: "video",
    url: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-an-open-book-in-a-library-42848-large.mp4",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=80",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&q=80",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
  },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance hero media slides every 5 seconds for Ace Hotel moving image feel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
    <section ref={sectionRef} className="relative min-h-[85vh] md:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#1a1a1a] text-[#f4f3ee]">
      {/* Ace Hotel Style Animated Moving Media Crossfade Slider */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.url}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {slide.type === "video" ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter brightness-[0.5] contrast-110 scale-105 animate-ace-kenburns"
              >
                <source src={slide.url} type="video/mp4" />
              </video>
            ) : (
              <img
                src={slide.url}
                alt="Ace Hotel Inspired Architectural Mood"
                className="w-full h-full object-cover filter brightness-[0.5] contrast-110 scale-105 animate-ace-kenburns"
              />
            )}
          </div>
        ))}

        {/* Ambient Film Grain & Vintage Texture Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-[#1a1a1a]/70 z-20" />
        <div className="absolute inset-0 opacity-15 mix-blend-overlay bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] z-20" />
      </div>

      {/* Top Ticker Marquee Bar */}
      <div className="absolute top-20 md:top-24 left-0 right-0 z-30 bg-[#8C2318] text-[#f4f3ee] py-2 overflow-hidden border-b border-[#f4f3ee]/20 font-mono text-[10px] font-bold tracking-widest uppercase">
        <div className="whitespace-nowrap animate-marquee flex gap-12">
          <span>WELCOME TO QUESTIONITY • EDITORIAL BOOK SALON & CULTURE LOUNGE • CHANGGYEONGGUNG-RO 270 SEOUL • EST. 2026</span>
          <span>WELCOME TO QUESTIONITY • EDITORIAL BOOK SALON & CULTURE LOUNGE • CHANGGYEONGGUNG-RO 270 SEOUL • EST. 2026</span>
          <span>WELCOME TO QUESTIONITY • EDITORIAL BOOK SALON & CULTURE LOUNGE • CHANGGYEONGGUNG-RO 270 SEOUL • EST. 2026</span>
        </div>
      </div>

      {/* Centered Ace Hotel Hero Composition */}
      <div className="relative z-30 w-full px-6 md:px-12 lg:px-20 pt-36 pb-20 md:pt-44 md:pb-24 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Tag Badge */}
        <div className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out mb-6">
          <span className="inline-block border border-[#f4f3ee]/40 bg-[#1a1a1a]/70 backdrop-blur-md px-5 py-1.5 text-[#f4f3ee] text-xs font-mono font-bold tracking-widest uppercase">
            ROOM NO. 101 — WELCOME TO QUESTIONITY
          </span>
        </div>

        {/* Balanced Refined Headline (Ace Hotel Style) */}
        <h1
          className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out font-serif font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#f4f3ee] leading-[1.05] mb-6 tracking-tight uppercase"
          style={{ transitionDelay: "0.2s" }}
        >
          WELCOME TO<br />
          <span className="italic font-normal text-[#e8e6df]">QUESTIONITY</span>
        </h1>

        {/* Subtitles (English Primary + Korean Secondary) */}
        <p
          className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out text-[#f4f3ee]/90 font-serif italic text-base md:text-xl leading-relaxed mb-2 max-w-2xl"
          style={{ transitionDelay: "0.3s" }}
        >
          An Editorial Book Salon & Culture Lounge in Seoul
        </p>

        <p
          className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out text-[#f4f3ee]/70 font-sans text-xs md:text-sm tracking-widest uppercase mb-10 max-w-xl"
          style={{ transitionDelay: "0.35s" }}
        >
          서울특별시 종로구 창경궁로 270 (혜화역 4번 출구) • 2,000+ 멤버의 지적 독서 커뮤니티
        </p>

        {/* Action Buttons Centered */}
        <div
          className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          style={{ transitionDelay: "0.4s" }}
        >
          <a
            href="#clubs"
            className="w-full sm:w-auto bg-[#8C2318] text-[#f4f3ee] border border-[#8C2318] font-bold text-xs md:text-sm px-8 py-4 text-center transition-all duration-700 ease-out-ace hover:-translate-y-1 hover:shadow-[5px_5px_0px_#f4f3ee] hover:bg-white hover:text-[#1a1a1a] uppercase tracking-widest"
          >
            EXPLORE CLUBS ↗
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto border border-[#f4f3ee]/40 bg-[#1a1a1a]/50 backdrop-blur-sm text-[#f4f3ee] font-bold text-xs md:text-sm px-8 py-4 text-center transition-all duration-700 ease-out-ace hover:-translate-y-1 hover:border-[#f4f3ee] hover:bg-[#f4f3ee]/10 uppercase tracking-widest"
          >
            HOW IT WORKS
          </a>
        </div>
      </div>

      {/* Bottom Slide Indicators & Editorial Stamp */}
      <div className="absolute bottom-8 left-0 right-0 z-30 px-8 flex items-center justify-between font-mono text-[10px]">
        <div className="flex gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 transition-all duration-500 ${
                idx === currentSlide ? "w-8 bg-[#8C2318]" : "w-3 bg-[#f4f3ee]/40 hover:bg-[#f4f3ee]"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
        <span className="text-[#f4f3ee]/70 uppercase tracking-widest bg-[#1a1a1a]/80 backdrop-blur border border-[#f4f3ee]/20 px-4 py-1.5 inline-block">
          SEOUL • CHANGGYEONGGUNG-RO 270 • EST. 2026
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