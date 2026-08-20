import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { heroContent } from "@/mocks/home";

const HERO_SLIDES = [
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=474&h=646&fit=crop",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=474&h=646&fit=crop",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=474&h=646&fit=crop",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=474&h=646&fit=crop",
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
    <section ref={sectionRef} className="relative min-h-[58vh] md:min-h-[62vh] pt-14 md:pt-16 flex items-center justify-center overflow-hidden bg-black text-white">
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

        {/* Ace Hotel Style Black & White Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70 z-20" />
        <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] z-20" />
      </div>

      {/* Top Ticker Marquee Bar */}
      <div className="absolute top-10 md:top-12 left-0 right-0 z-30 bg-black text-white py-1.5 overflow-hidden border-b border-white/20 font-mono text-[9px] font-bold tracking-normal uppercase">
        <div className="whitespace-nowrap animate-marquee flex gap-12">
          <span>WELCOME TO QUESTIONITY • EDITORIAL BOOK SALON & CULTURE LOUNGE • CHANGGYEONGGUNG-RO 270 SEOUL • EST. 2026</span>
          <span>WELCOME TO QUESTIONITY • EDITORIAL BOOK SALON & CULTURE LOUNGE • CHANGGYEONGGUNG-RO 270 SEOUL • EST. 2026</span>
          <span>WELCOME TO QUESTIONITY • EDITORIAL BOOK SALON & CULTURE LOUNGE • CHANGGYEONGGUNG-RO 270 SEOUL • EST. 2026</span>
        </div>
      </div>

      {/* Centered Ace Hotel Hero Composition */}
      <div className="relative z-30 w-full px-6 md:px-12 lg:px-20 pt-20 pb-12 md:pt-24 md:pb-14 max-w-3xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Tag Badge */}
        <div className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out mb-4">
          <span className="inline-block border border-white/40 bg-black/70 backdrop-blur-md px-4 py-1 text-white text-[11px] font-mono font-bold tracking-normal uppercase">
            ROOM NO. 101 — WELCOME TO QUESTIONITY
          </span>
        </div>

        {/* Ace Hotel Style Signature Typography (Italic Script + Heavy Serif) */}
        <h1
          className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out text-white leading-[0.95] mb-5 tracking-tight text-center select-none"
          style={{
            fontSize: "clamp(48px, 7vw, 96px)",
            transitionDelay: "0.2s"
          }}
        >
          <span className="font-instrument italic font-normal text-white/90 block mb-1 text-[0.88em]">
            Welcome to
          </span>
          <span className="font-serif font-black uppercase tracking-tighter block text-white">
            Questionity
          </span>
        </h1>

        {/* Subtitles */}
        <p
          className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out text-white/90 font-sans text-sm md:text-base leading-relaxed mb-1.5 max-w-xl"
          style={{ transitionDelay: "0.3s" }}
        >
          An Editorial Book Salon & Culture Lounge in Seoul
        </p>

        <p
          className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out text-white/70 font-sans text-[11px] md:text-xs tracking-normal uppercase mb-6 max-w-lg"
          style={{ transitionDelay: "0.35s" }}
        >
          서울특별시 종로구 창경궁로 270 (혜화역 4번 출구) • 2,000+ 멤버의 지적 독서 커뮤니티
        </p>

        {/* Action Buttons Centered */}
        <div
          className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
          style={{ transitionDelay: "0.4s" }}
        >
          <a
            href="#clubs"
            className="w-full sm:w-auto bg-white text-black border border-white font-bold text-xs md:text-sm px-8 py-4 text-center transition-all duration-300 hover:bg-transparent hover:text-white uppercase tracking-normal"
          >
            EXPLORE CLUBS
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto border border-white/40 bg-black/50 backdrop-blur-sm text-white font-bold text-xs md:text-sm px-8 py-4 text-center transition-all duration-300 hover:bg-white hover:text-black uppercase tracking-normal"
          >
            HOW IT WORKS
          </a>
        </div>
      </div>

      {/* Bottom Slide Indicators & Location Stamp */}
      <div className="absolute bottom-8 left-0 right-0 z-30 px-8 flex items-center justify-between font-mono text-[10px]">
        <div className="flex gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 transition-all duration-500 ${
                idx === currentSlide ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
        <span className="text-white/70 uppercase tracking-normal bg-black/80 backdrop-blur border border-white/20 px-4 py-1.5 inline-block">
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