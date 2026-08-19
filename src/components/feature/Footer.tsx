import { Link } from "react-router-dom";

export default function Footer() {
  const footerLinks = [
    {
      title: "서비스",
      links: [
        { label: "독서모임", href: "/#clubs" },
        { label: "결제방법", href: "/#how-it-works" },
        { label: "오시는길", href: "/#location" },
      ],
    },
    {
      title: "회사",
      links: [
        { label: "퀘스처니티 소개", href: "/" },
        { label: "채용", href: "/" },
      ],
    },
    {
      title: "지원",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "1:1 문의하기", href: "/faq#contact" },
        { label: "이용약관", href: "/terms" },
        { label: "개인정보처리방침", href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-[#f4f3ee] border-t border-[#1a1a1a]">
      <div className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-24">
        {/* Massive Serif Title */}
        <div className="border-b border-[#f4f3ee]/20 pb-12 mb-16">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold tracking-widest uppercase text-[#f4f3ee]/90">
            QUESTIONITY
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#f4f3ee]/60 uppercase tracking-widest mt-4">
            Editorial Reading Community & Coworking Venue | Bundang Taeseong Bldg B1, Omad Labs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-serif text-lg text-[#f4f3ee]/80 leading-relaxed mb-6">
              책으로 이어지는 특별한 사람들의 프리미엄 에디토리얼 커뮤니티.
            </p>
            <p className="font-sans text-xs text-[#f4f3ee]/50 leading-relaxed mb-6">
              서울특별시 종로구 창경궁로 270 (혜화역 4번 출구 도보 3분)
              <br />
              누적 독서 멤버 2,000+ 명 | 5,000+ 건의 독후감 데이터
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-10 h-10 flex items-center justify-center border border-[#f4f3ee]/30 text-[#f4f3ee] hover:bg-[#8C2318] hover:border-[#8C2318] transition-colors"
                aria-label="Instagram"
              >
                <i className="ri-instagram-line text-lg" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-10 h-10 flex items-center justify-center border border-[#f4f3ee]/30 text-[#f4f3ee] hover:bg-[#8C2318] hover:border-[#8C2318] transition-colors"
                aria-label="YouTube"
              >
                <i className="ri-youtube-line text-lg" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-10 h-10 flex items-center justify-center border border-[#f4f3ee]/30 text-[#f4f3ee] hover:bg-[#8C2318] hover:border-[#8C2318] transition-colors"
                aria-label="LinkedIn"
              >
                <i className="ri-linkedin-line text-lg" />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-[#f4f3ee]/40 mb-6">
                {group.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-serif text-sm text-[#f4f3ee]/80 hover:text-[#8C2318] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#f4f3ee]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-[#f4f3ee]/40">
          <p>
            퀘스처니티 (Questionity) | 오마드랩스 (황윤철 대표) | 서울특별시 종로구 창경궁로 270
          </p>
          <p>
            &copy; 2026 QUESTIONITY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}