import { Link } from "react-router-dom";

export default function Footer() {
  const footerLinks = [
    {
      title: "NAVIGATION",
      links: [
        { label: "ABOUT QUESTIONITY", href: "/#about" },
        { label: "300 BOOKS & CATEGORIES", href: "/#categories" },
        { label: "EDITORIAL CLUBS", href: "/#clubs" },
        { label: "HOW IT WORKS", href: "/#how-it-works" },
      ],
    },
    {
      title: "SUPPORT & LEGAL",
      links: [
        { label: "SEOUL LOUNGE", href: "/#location" },
        { label: "MEMBER REVIEWS", href: "/#reviews" },
        { label: "FAQ / 1:1 INQUIRIES", href: "/faq" },
        { label: "TERMS OF SERVICE", href: "/terms" },
        { label: "PRIVACY POLICY", href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-[#f4f3ee] border-t border-[#1a1a1a]">
      <div className="w-full px-6 md:px-12 lg:px-20 py-8 md:py-10">
        
        {/* Top Header: Boxed Logo & Brand Subline (Compact 30% scale) */}
        <div className="border-b border-[#f4f3ee]/15 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Boxed Logo matching top Navbar */}
            <Link to="/" className="inline-block">
              <div className="border-[2px] border-[#f4f3ee] px-3 py-1 bg-transparent hover:bg-[#f4f3ee] hover:text-[#1a1a1a] transition-all">
                <span className="font-serif font-black text-sm md:text-base tracking-tighter uppercase leading-none block">
                  QUESTIONITY
                </span>
              </div>
            </Link>
            <span className="font-mono text-[11px] text-[#f4f3ee]/60 uppercase tracking-wider hidden md:inline">
              EDITORIAL BOOK SALON & CULTURE LOUNGE &bull; SEOUL &bull; EST. 2026
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-7 h-7 flex items-center justify-center border border-[#f4f3ee]/30 text-[#f4f3ee] hover:bg-[#8C2318] hover:border-[#8C2318] transition-colors"
              aria-label="Instagram"
            >
              <i className="ri-instagram-line text-sm" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-7 h-7 flex items-center justify-center border border-[#f4f3ee]/30 text-[#f4f3ee] hover:bg-[#8C2318] hover:border-[#8C2318] transition-colors"
              aria-label="YouTube"
            >
              <i className="ri-youtube-line text-sm" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-7 h-7 flex items-center justify-center border border-[#f4f3ee]/30 text-[#f4f3ee] hover:bg-[#8C2318] hover:border-[#8C2318] transition-colors"
              aria-label="LinkedIn"
            >
              <i className="ri-linkedin-line text-sm" />
            </a>
          </div>
        </div>

        {/* Compact Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-2">
            <p className="font-gmarket text-sm font-bold text-[#f4f3ee]/90 leading-snug">
              좋은 질문으로 시작하는 새로운 독서 문화의 첫걸음.
            </p>
            <p className="font-sans text-xs text-[#f4f3ee]/60 leading-relaxed">
              서울특별시 종로구 창경궁로 270 (혜화 독서 라운지 아지트)
              <br />
              매월 엄선 도서 300선 &bull; 혜화 독서 라운지 &bull; 1st Season 멤버 모집 중
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-2">
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C2318]">
                {group.title}
              </h4>
              <ul className="flex flex-col gap-1.5 font-sans text-xs">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[#f4f3ee]/75 hover:text-[#f4f3ee] transition-colors uppercase font-bold tracking-tight"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar (Compact 1-line) */}
        <div className="mt-6 pt-4 border-t border-[#f4f3ee]/10 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-[#f4f3ee]/40">
          <p>
            QUESTIONITY &bull; CHANGGYEONGGUNG-RO 270 SEOUL
          </p>
          <p>
            &copy; 2026 QUESTIONITY. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}