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
              좋은 질문으로 시작하는<br />
              <span className="italic font-normal text-[#8C2318]">새로운 독서 문화의</span> 첫걸음.
            </h2>

            <p className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out text-[#1a1a1a]/80 leading-relaxed text-base md:text-lg mb-6 font-sans tracking-tightest" style={{ transitionDelay: "0.3s" }}>
              퀘스처니티(Questionity)는 서울 혜화(창경궁로 270)의 아늑한 공간에서 출발한 신생 독서 커뮤니티입니다.
              과장된 수치보다는, 한 권의 좋은 책과 진솔한 대화가 주는 힘을 믿는 이들이 차근차근 함께 만들어가고 있습니다.
            </p>

            <p className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out text-[#1a1a1a]/70 leading-relaxed text-base md:text-lg mb-10 font-sans tracking-tightest" style={{ transitionDelay: "0.4s" }}>
              매월 분야별로 엄선하는 50선 도서 큐레이션부터 소수 정예 오프라인 독서 모임까지,
              나만의 질문을 발견하고 깊이 있는 지적 교류를 함께 시작할 첫 기수 멤버를 기다립니다.
            </p>

            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out flex flex-wrap gap-4" style={{ transitionDelay: "0.5s" }}>
              <div className="px-5 py-3 border border-black bg-white font-sans text-xs font-bold uppercase tracking-normal text-black hover:bg-black hover:text-white transition-all hover:-translate-y-1 hover:shadow-lg">
                매월 엄선 도서 50선
              </div>
              <div className="px-5 py-3 border border-black bg-white font-sans text-xs font-bold uppercase tracking-normal text-black hover:bg-black hover:text-white transition-all hover:-translate-y-1 hover:shadow-lg">
                혜화 오프라인 독서 아지트
              </div>
              <div className="px-5 py-3 border border-black bg-black text-white font-sans text-xs font-bold uppercase tracking-normal hover:bg-white hover:text-black transition-all hover:-translate-y-1 hover:shadow-lg">
                1st Season 멤버 모집 중
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