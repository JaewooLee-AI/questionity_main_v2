import { useEffect, useRef } from "react";

export default function AboutSection() {
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
      { threshold: 0.15 }
    );
    const elements = section.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full px-6 md:px-12 lg:px-20 pt-12 pb-6 md:pt-16 md:pb-8 bg-[#f4f3ee] border-t border-[#1a1a1a]/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* 3D Image Block */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out order-2 lg:order-1">
            <div className="group relative overflow-hidden aspect-[4/3] bg-[#e8e6df] border border-[#1a1a1a]/15 transition-all duration-700 ease-out-ace hover:-translate-y-2 hover:shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80"
                alt="혜화 독서 커뮤니티"
                className="w-full h-full object-cover transition-transform duration-700 ease-out-ace group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 bg-[#1a1a1a] text-[#f4f3ee] font-mono text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest">
                VENUE: CHANGGYEONGGUNG-RO 270
              </div>
            </div>
          </div>

          {/* Editorial Text */}
          <div className="order-1 lg:order-2">
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out" style={{ transitionDelay: "0.1s" }}>
              <span className="inline-block text-[#8C2318] text-xs font-bold tracking-widest uppercase mb-4 font-sans">
                ABOUT QUESTIONITY
              </span>
            </div>

            <h2 className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out font-serif font-bold text-3xl md:text-5xl text-[#1a1a1a] leading-tight mb-8" style={{ transitionDelay: "0.2s" }}>
              깊이 있는 질문을 던지고,<br />
              <span className="italic font-normal text-[#8C2318]">지적 커뮤니티를</span> 세웁니다.
            </h2>

            <p className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out text-[#1a1a1a]/80 leading-relaxed text-base md:text-lg mb-6 font-sans tracking-tightest" style={{ transitionDelay: "0.3s" }}>
              퀘스처니티(Questionity)는 서울특별시 종로구 창경궁로 270을 거점으로,
              온라인과 오프라인의 경계를 허무는 프리미엄 독서클럽 플랫폼입니다.
            </p>

            <p className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out text-[#1a1a1a]/70 leading-relaxed text-base md:text-lg mb-10 font-sans tracking-tightest" style={{ transitionDelay: "0.4s" }}>
              누적 2,000명 이상의 독서 멤버와 5,000건 이상의 지적 대화 데이터를 통해,
              단순한 도서 소모를 넘어 개인의 지적 스펙트럼과 깊이 있는 관계망을 형성합니다.
            </p>

            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out flex flex-wrap gap-4" style={{ transitionDelay: "0.5s" }}>
              <div className="px-5 py-3 border border-black bg-white font-sans text-xs font-bold uppercase tracking-normal text-black hover:bg-black hover:text-white transition-all hover:-translate-y-1 hover:shadow-lg">
                매월 엄선 도서 50선
              </div>
              <div className="px-5 py-3 border border-black bg-white font-sans text-xs font-bold uppercase tracking-normal text-black hover:bg-black hover:text-white transition-all hover:-translate-y-1 hover:shadow-lg">
                혜화 오프라인 코워킹 아지트
              </div>
              <div className="px-5 py-3 border border-black bg-black text-white font-sans text-xs font-bold uppercase tracking-normal hover:bg-white hover:text-black transition-all hover:-translate-y-1 hover:shadow-lg">
                2,000+ 누적 독서 멤버
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