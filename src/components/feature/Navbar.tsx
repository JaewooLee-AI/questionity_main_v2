import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [locSelectOpen, setLocSelectOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState("Choose Location *");
  const [codeType, setCodeType] = useState("Select Code Type");
  const [lang, setLang] = useState("EN");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  // Close all dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setLocationsOpen(false);
        setLocSelectOpen(false);
        setCodeOpen(false);
        setLangOpen(false);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { label: "모임 둘러보기", href: "/#clubs" },
    { label: "카테고리 도서", href: "/#categories" },
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
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-[#e8e6df] border-b border-[#1a1a1a] shadow-sm font-sans select-none">
      {/* ACE HOTEL NAVBAR CONTAINER */}
      <div className="w-full h-14 md:h-16 flex items-center justify-between">
        
        {/* 1. ACE HOTEL LOGO BOX (LEFTMOST) */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="h-full px-4 md:px-7 flex items-center justify-center border-r border-[#1a1a1a] bg-[#e8e6df] hover:bg-[#dedcd4] transition-colors shrink-0"
        >
          <div className="border-[2.5px] border-[#1a1a1a] px-2.5 py-1 bg-transparent hover:bg-[#1a1a1a] hover:text-[#f4f3ee] transition-all">
            <span className="font-serif font-black text-sm md:text-base tracking-tighter uppercase leading-none block">
              QUESTIONITY
            </span>
          </div>
        </Link>

        {/* DESKTOP ACE HOTEL TOP BAR NAVIGATION GRID */}
        <div className="hidden lg:flex items-center h-full flex-1">
          
          {/* 2. LOCATIONS DROPDOWN & LANGUAGE SELECTOR */}
          <div className="relative h-full px-4 border-r border-[#1a1a1a] flex items-center justify-between gap-6 shrink-0 min-w-[170px]">
            {/* Locations Button */}
            <button
              onClick={() => {
                setLocationsOpen(!locationsOpen);
                setLocSelectOpen(false);
                setCodeOpen(false);
                setLangOpen(false);
              }}
              className="flex items-center gap-1.5 font-serif font-bold text-sm text-[#1a1a1a] hover:text-[#8C2318] transition-colors cursor-pointer"
            >
              <i className={`ri-arrow-down-s-line text-lg transition-transform ${locationsOpen ? "rotate-180" : ""}`} />
              <span>Locations</span>
            </button>

            {/* Language Selector */}
            <button
              onClick={() => {
                setLangOpen(!langOpen);
                setLocationsOpen(false);
                setLocSelectOpen(false);
                setCodeOpen(false);
              }}
              className="flex items-center gap-1 font-sans text-xs font-bold text-[#1a1a1a]/80 hover:text-[#1a1a1a] cursor-pointer"
            >
              <span>{lang}</span>
              <i className="ri-arrow-down-s-line text-xs" />
            </button>

            {/* Language Dropdown Menu */}
            {langOpen && (
              <div className="absolute top-full right-0 mt-0 w-28 bg-[#f4f3ee] border border-[#1a1a1a] shadow-xl py-1 z-50 font-mono text-xs">
                <button
                  onClick={() => { setLang("EN"); setLangOpen(false); }}
                  className="w-full px-3 py-2 text-left hover:bg-[#1a1a1a] hover:text-[#f4f3ee] font-bold"
                >
                  EN (English)
                </button>
                <button
                  onClick={() => { setLang("KO"); setLangOpen(false); }}
                  className="w-full px-3 py-2 text-left hover:bg-[#1a1a1a] hover:text-[#f4f3ee] font-bold"
                >
                  KO (한국어)
                </button>
              </div>
            )}

            {/* Locations Dropdown Panel */}
            {locationsOpen && (
              <div className="absolute top-full left-0 mt-0 w-72 bg-[#f4f3ee] border border-[#1a1a1a] shadow-2xl p-4 z-50 font-sans space-y-4">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#8C2318] uppercase block mb-2">
                    GLOBAL HOTELS & CLUBS
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-serif font-bold text-[#1a1a1a]">
                    <span className="hover:text-[#8C2318] cursor-pointer">Brooklyn</span>
                    <span className="hover:text-[#8C2318] cursor-pointer">Kyoto</span>
                    <span className="hover:text-[#8C2318] cursor-pointer">New York</span>
                    <span className="hover:text-[#8C2318] cursor-pointer">Sydney</span>
                    <span className="hover:text-[#8C2318] cursor-pointer">Toronto</span>
                    <span className="hover:text-[#8C2318] cursor-pointer font-bold text-[#8C2318]">Seoul (Questionity)</span>
                  </div>
                </div>

                <div className="border-t border-[#1a1a1a]/15 pt-3 space-y-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#1a1a1a]/60 uppercase block mb-1">
                    SITE NAVIGATION
                  </span>
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => {
                        setLocationsOpen(false);
                        handleNavClick(e, link.href);
                      }}
                      className="block text-xs font-bold text-[#1a1a1a] hover:text-[#8C2318] uppercase tracking-wider py-1"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. LOCATION CELL */}
          <div
            onClick={() => {
              setLocSelectOpen(!locSelectOpen);
              setLocationsOpen(false);
              setCodeOpen(false);
              setLangOpen(false);
            }}
            className="relative h-full px-4 border-r border-[#1a1a1a] flex flex-col justify-center flex-1 min-w-[140px] cursor-pointer hover:bg-[#dedcd4] transition-colors"
          >
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#1a1a1a]/70 uppercase block mb-0.5">
              LOCATION
            </span>
            <div className="flex items-center justify-between text-xs font-sans font-bold text-[#1a1a1a]">
              <span className="truncate">{selectedLocation}</span>
              <i className="ri-arrow-down-s-line text-sm text-[#1a1a1a]/70 ml-1" />
            </div>

            {/* Location Selector Dropdown */}
            {locSelectOpen && (
              <div className="absolute top-full left-0 mt-0 w-48 bg-[#f4f3ee] border border-[#1a1a1a] shadow-xl py-1 z-50 font-mono text-xs">
                {["Choose Location *", "서울 강남 클럽", "서울 성수 클럽", "서울 홍대 클럽", "온라인 클럽"].map((loc) => (
                  <button
                    key={loc}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLocation(loc);
                      setLocSelectOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left hover:bg-[#1a1a1a] hover:text-[#f4f3ee] font-bold ${
                      selectedLocation === loc ? "bg-[#1a1a1a] text-[#f4f3ee]" : ""
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. CHECK IN CELL */}
          <div className="relative h-full px-4 border-r border-[#1a1a1a] flex flex-col justify-center flex-1 min-w-[130px] cursor-pointer hover:bg-[#dedcd4] transition-colors">
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#1a1a1a]/70 uppercase block mb-0.5">
              CHECK IN
            </span>
            <span className="text-xs font-sans font-bold text-[#1a1a1a] truncate">
              August 19, 2026
            </span>
          </div>

          {/* 5. CHECK OUT CELL */}
          <div className="relative h-full px-4 border-r border-[#1a1a1a] flex flex-col justify-center flex-1 min-w-[130px] cursor-pointer hover:bg-[#dedcd4] transition-colors">
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#1a1a1a]/70 uppercase block mb-0.5">
              CHECK OUT
            </span>
            <span className="text-xs font-sans font-bold text-[#1a1a1a] truncate">
              August 20, 2026
            </span>
          </div>

          {/* 6. GUESTS CELL */}
          <div className="relative h-full px-4 border-r border-[#1a1a1a] flex flex-col justify-center flex-1 min-w-[140px] cursor-pointer hover:bg-[#dedcd4] transition-colors">
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#1a1a1a]/70 uppercase block mb-0.5">
              GUESTS
            </span>
            <span className="text-xs font-sans font-bold text-[#1a1a1a] truncate">
              1 Adult, 0 Children
            </span>
          </div>

          {/* 7. HAVE A CODE? CELL */}
          <div
            onClick={() => {
              setCodeOpen(!codeOpen);
              setLocationsOpen(false);
              setLocSelectOpen(false);
              setLangOpen(false);
            }}
            className="relative h-full px-4 border-r border-[#1a1a1a] flex flex-col justify-center flex-1 min-w-[140px] cursor-pointer hover:bg-[#dedcd4] transition-colors"
          >
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#1a1a1a]/70 uppercase block mb-0.5">
              HAVE A CODE?
            </span>
            <div className="flex items-center justify-between text-xs font-sans font-bold text-[#1a1a1a]">
              <span className="truncate">{codeType}</span>
              <i className="ri-arrow-down-s-line text-sm text-[#1a1a1a]/70 ml-1" />
            </div>

            {/* Code Type Dropdown */}
            {codeOpen && (
              <div className="absolute top-full left-0 mt-0 w-48 bg-[#f4f3ee] border border-[#1a1a1a] shadow-xl py-1 z-50 font-mono text-xs">
                {["Select Code Type", "PROMO CODE", "CORPORATE CODE", "GROUP CODE"].map((code) => (
                  <button
                    key={code}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCodeType(code);
                      setCodeOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left hover:bg-[#1a1a1a] hover:text-[#f4f3ee] font-bold ${
                      codeType === code ? "bg-[#1a1a1a] text-[#f4f3ee]" : ""
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* USER AUTH MENU (COMPACT INTEGRATED CELL) */}
          <div className="relative h-full px-3 border-r border-[#1a1a1a] flex items-center justify-center shrink-0">
            {!isLoading && isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-xs font-bold text-[#1a1a1a] hover:text-[#8C2318] cursor-pointer"
                >
                  <div className="w-6 h-6 bg-[#1a1a1a] text-[#f4f3ee] flex items-center justify-center font-bold text-[10px]">
                    {user.name.charAt(0)}
                  </div>
                  <span className="truncate max-w-[80px]">{user.name}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#f4f3ee] border border-[#1a1a1a] shadow-2xl py-2 z-50 text-xs font-mono">
                    <div className="px-3 py-1.5 border-b border-[#1a1a1a]/15 font-bold truncate">
                      {user.name}
                    </div>
                    <Link
                      to="/mypage"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-3 py-2 hover:bg-[#1a1a1a] hover:text-[#f4f3ee] font-bold"
                    >
                      마이페이지
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 hover:bg-[#1a1a1a] hover:text-[#f4f3ee] font-bold"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs font-mono font-bold uppercase tracking-wider text-[#1a1a1a] hover:text-[#8C2318] whitespace-nowrap"
              >
                LOGIN
              </Link>
            )}
          </div>

        </div>

        {/* 8. RIGHTMOST VIBRANT ORANGE "BOOK NOW" ACTION BUTTON */}
        <a
          href="#clubs"
          onClick={(e) => handleNavClick(e, "/#clubs")}
          className="h-full px-6 md:px-8 bg-[#FF6433] hover:bg-[#e05324] text-[#1a1a1a] font-serif font-black text-base md:text-lg tracking-widest uppercase flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm"
        >
          BOOK NOW
        </a>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden h-full px-4 border-l border-[#1a1a1a] flex items-center justify-center text-[#1a1a1a] hover:bg-[#dedcd4] cursor-pointer"
          aria-label="Toggle Menu"
        >
          <i className={`ri-${mobileMenuOpen ? "close" : "menu"}-line text-2xl`} />
        </button>

      </div>

      {/* MOBILE EXPANDED MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f4f3ee] border-t border-[#1a1a1a] p-6 space-y-5 shadow-2xl animate-fade-in">
          <div className="grid grid-cols-2 gap-3 text-xs font-mono font-bold">
            <div className="bg-[#e8e6df] p-3 border border-[#1a1a1a]/20">
              <span className="text-[9px] text-[#1a1a1a]/60 block mb-1">LOCATION</span>
              <span className="text-[#1a1a1a]">{selectedLocation}</span>
            </div>
            <div className="bg-[#e8e6df] p-3 border border-[#1a1a1a]/20">
              <span className="text-[9px] text-[#1a1a1a]/60 block mb-1">PROMO CODE</span>
              <span className="text-[#1a1a1a]">{codeType}</span>
            </div>
          </div>

          <div className="border-t border-[#1a1a1a]/15 pt-4 space-y-3 font-sans">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.href);
                }}
                className="block text-base font-serif font-bold text-[#1a1a1a] hover:text-[#8C2318] uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="border-t border-[#1a1a1a]/15 pt-4 flex items-center justify-between font-mono text-xs">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-[#1a1a1a]">{user.name}</span>
                <button onClick={handleLogout} className="text-[#8C2318] font-bold underline">
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="font-bold text-[#1a1a1a] underline uppercase"
              >
                LOGIN / SIGNUP
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}