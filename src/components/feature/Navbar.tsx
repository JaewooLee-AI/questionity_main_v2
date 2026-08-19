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
          ? "bg-white/95 backdrop-blur-md border-b border-black/10 shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 shrink-0">
            <span
              className={`font-sans font-normal text-sm tracking-normal uppercase transition-colors duration-500 ${
                scrolled ? "text-black" : "text-white"
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
                className={`text-xs font-bold uppercase tracking-normal transition-all duration-300 hover:opacity-100 whitespace-nowrap ${
                  scrolled
                    ? "text-black/80 hover:text-black"
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
                  className={`flex items-center gap-3 transition-colors uppercase tracking-normal text-xs font-bold whitespace-nowrap ${
                    scrolled
                      ? "text-black hover:text-black"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  <div className="w-8 h-8 rounded-none bg-black text-white flex items-center justify-center shrink-0 font-sans font-bold">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 object-cover" />
                    ) : (
                      <span>{user.name.charAt(0)}</span>
                    )}
                  </div>
                  <span>{user.name}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-black shadow-2xl py-3 z-50">
                    <div className="px-5 py-3 border-b border-black/10">
                      <p className="text-sm font-sans font-bold text-black truncate">{user.name}</p>
                      <p className="text-xs font-sans text-black/60 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/mypage"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 text-xs uppercase tracking-normal text-black hover:bg-gray-100 transition-colors"
                    >
                      마이페이지
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-xs uppercase tracking-normal text-black hover:bg-gray-100 transition-colors text-left"
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
                  className={`text-xs font-bold uppercase tracking-normal transition-colors whitespace-nowrap ${
                    scrolled ? "text-black hover:text-black" : "text-white hover:text-white/80"
                  }`}
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="bg-black text-white text-xs font-bold uppercase tracking-normal px-6 py-3 transition-all duration-300 hover:bg-gray-900 shadow-lg whitespace-nowrap"
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
        <div className="md:hidden bg-white border-t border-black/20 px-6 py-8 shadow-2xl">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-black font-sans text-xl font-bold uppercase tracking-normal py-1 hover:text-gray-700 transition-colors"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.href);
                }}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-black/10 pt-6 flex flex-col gap-4">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-sans text-lg font-bold">
                      <span>{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-base font-sans font-bold text-black">{user.name}</p>
                      <p className="text-xs text-black/60">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/mypage"
                    className="text-black text-sm uppercase tracking-normal py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    마이페이지
                  </Link>
                  <button
                    onClick={() => { logout(); navigate("/"); setMobileMenuOpen(false); }}
                    className="text-black text-sm uppercase tracking-normal py-2 text-left"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-black text-sm uppercase tracking-normal py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    로그인
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-black text-white text-center text-sm font-bold uppercase tracking-normal px-6 py-3 hover:bg-gray-900 transition-colors"
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