import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { label: "모임 둘러보기", href: "/#clubs" },
    { label: "후기", href: "/#reviews" },
    { label: "결제방법", href: "/#how-it-works" },
    { label: "오시는길", href: "/#location" },
    { label: "FAQ / 문의하기", href: "/faq" },
  ];

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.location.hash) {
        window.history.pushState(null, "", "/");
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (window.location.pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out-ace ${
        scrolled
          ? "bg-[#f4f3ee]/95 backdrop-blur-md border-b border-[#1a1a1a]/10 shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 shrink-0">
            <span
              className={`font-serif font-bold text-2xl md:text-3xl tracking-widest uppercase transition-colors duration-500 ${
                scrolled ? "text-[#1a1a1a]" : "text-white"
              }`}
            >
              QUESTIONITY
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:opacity-100 whitespace-nowrap ${
                  scrolled
                    ? "text-[#1a1a1a]/80 hover:text-[#8C2318]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA / User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {isLoading ? null : isAuthenticated && user ? (
              /* Logged in */
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center gap-3 transition-colors uppercase tracking-widest text-xs font-bold whitespace-nowrap ${
                    scrolled
                      ? "text-[#1a1a1a] hover:text-[#8C2318]"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  <div className="w-8 h-8 rounded-none bg-[#8C2318] text-[#f4f3ee] flex items-center justify-center shrink-0 font-serif font-bold">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 object-cover" />
                    ) : (
                      <span>{user.name.charAt(0)}</span>
                    )}
                  </div>
                  <span>{user.name}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#f4f3ee] border border-[#1a1a1a] shadow-2xl py-3 z-50">
                    <div className="px-5 py-3 border-b border-[#1a1a1a]/10">
                      <p className="text-sm font-serif font-bold text-[#1a1a1a] truncate">{user.name}</p>
                      <p className="text-xs font-sans text-[#1a1a1a]/60 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/mypage"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 text-xs uppercase tracking-widest text-[#1a1a1a] hover:bg-[#e8e6df] transition-colors"
                    >
                      마이페이지
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-xs uppercase tracking-widest text-[#8C2318] hover:bg-[#e8e6df] transition-colors text-left"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Not logged in */
              <>
                <Link
                  to="/login"
                  className={`text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                    scrolled ? "text-[#1a1a1a] hover:text-[#8C2318]" : "text-white hover:text-white/80"
                  }`}
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#8C2318] text-[#f4f3ee] text-xs font-bold uppercase tracking-widest px-6 py-3 transition-all duration-300 hover:bg-[#1a1a1a] shadow-lg whitespace-nowrap"
                >
                  시작하기
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden p-2 transition-colors ${
              scrolled ? "text-[#1a1a1a]" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            <i className={`ri-${mobileMenuOpen ? "close" : "menu"}-line text-2xl`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f4f3ee] border-t border-[#1a1a1a]/20 px-6 py-8 shadow-2xl">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#1a1a1a] font-serif text-xl font-bold uppercase tracking-wider py-1 hover:text-[#8C2318] transition-colors"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.href);
                }}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-[#1a1a1a]/10 pt-6 flex flex-col gap-4">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-10 h-10 bg-[#8C2318] text-[#f4f3ee] flex items-center justify-center font-serif text-lg font-bold">
                      <span>{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-base font-serif font-bold text-[#1a1a1a]">{user.name}</p>
                      <p className="text-xs text-[#1a1a1a]/60">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/mypage"
                    className="text-[#1a1a1a] text-sm uppercase tracking-widest py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    마이페이지
                  </Link>
                  <button
                    onClick={() => { logout(); navigate("/"); setMobileMenuOpen(false); }}
                    className="text-[#8C2318] text-sm uppercase tracking-widest py-2 text-left"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[#1a1a1a] text-sm uppercase tracking-widest py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    로그인
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#8C2318] text-[#f4f3ee] text-center text-sm font-bold uppercase tracking-widest px-6 py-3 hover:bg-[#1a1a1a] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    시작하기
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}