import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { allClubs, clubCategories, clubRegions, clubStatuses } from "@/mocks/clubs";
import type { Club } from "@/mocks/clubs";

function formatPrice(price: number) {
  return new Intl.NumberFormat("ko-KR").format(price);
}

function ClubCard({
  club,
  isActive,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
}: {
  club: Club;
  isActive: boolean;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const isClosed = club.status === "closed";
  const isOngoing = club.status === "ongoing";
  const isFull = club.currentMembers >= club.capacity && club.status === "open";
  const isAlmostFull = club.currentMembers >= club.capacity - 2 && club.status === "open";

  return (
    <Link
      to={`/clubs/${club.id}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        group relative cursor-pointer bg-[#f4f3ee] border border-[#1a1a1a]/15 overflow-hidden flex flex-col justify-between
        transition-all duration-700 ease-out-ace
        ${isActive ? "-translate-y-3 shadow-2xl border-[#1a1a1a] bg-white z-10 scale-[1.02]" : "translate-y-0 shadow-none"}
        ${isDimmed ? "opacity-60 grayscale-[30%]" : "opacity-100 grayscale-0"}
      `}
    >
      <div>
        {/* Image */}
        <div className="relative aspect-[4/3] bg-[#e8e6df] overflow-hidden shrink-0">
          <img
            src={club.imageUrl}
            alt={club.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out-ace group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-block bg-[#1a1a1a] text-[#f4f3ee] font-mono text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase">
              {club.category}
            </span>
          </div>

          {/* Status Badges */}
          {isClosed && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
              <span className="bg-[#1a1a1a] text-[#f4f3ee] font-serif text-xs font-bold px-4 py-2 uppercase tracking-widest border border-[#f4f3ee]/30">
                종료된 클럽
              </span>
            </div>
          )}
          {isOngoing && !isClosed && (
            <div className="absolute bottom-3 right-3">
              <span className="inline-block bg-[#4A5340] text-[#f4f3ee] text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest font-mono">
                진행 중
              </span>
            </div>
          )}
          {isFull && !isClosed && !isOngoing && (
            <div className="absolute bottom-3 right-3">
              <span className="inline-block bg-[#1a1a1a] text-[#f4f3ee] text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest font-mono">
                마감
              </span>
            </div>
          )}
          {isAlmostFull && !isFull && !isClosed && !isOngoing && (
            <div className="absolute bottom-3 right-3">
              <span className="inline-block bg-[#8C2318] text-[#f4f3ee] text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest font-mono">
                마감 임박 ({club.currentMembers}/{club.capacity})
              </span>
            </div>
          )}
          {!isAlmostFull && !isFull && !isClosed && !isOngoing && (
            <div className="absolute bottom-3 right-3">
              <span className="inline-block bg-[#8C2318] text-[#f4f3ee] text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest font-mono">
                모집 중 {club.currentMembers}/{club.capacity}명
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 font-sans">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/60 block mb-1">
            {club.location} — {club.sessions}주 코스
          </span>
          <h3 className="font-serif font-bold text-xl text-[#1a1a1a] mb-2 line-clamp-1 group-hover:text-[#8C2318] transition-colors duration-300">
            {club.name}
          </h3>
          <p className="text-xs text-[#1a1a1a]/70 leading-relaxed mb-4 line-clamp-2">
            {club.description}
          </p>

          {/* Leader */}
          <div className="flex items-center gap-3 p-3 bg-[#e8e6df]/50 border border-[#1a1a1a]/10 mb-2">
            <img
              src={club.leaderImageUrl}
              alt={club.leaderName}
              className="w-8 h-8 object-cover border border-[#1a1a1a]/20 shrink-0"
            />
            <div className="flex flex-col min-w-0 font-sans">
              <span className="text-xs font-serif font-bold text-[#1a1a1a] truncate">{club.leaderName}</span>
              <span className="text-[10px] text-[#1a1a1a]/60 truncate">{club.leaderTitle}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="px-6 py-3.5 bg-[#e8e6df]/40 border-t border-[#1a1a1a]/10 flex items-center justify-between font-sans text-xs">
        <span className="text-[#1a1a1a]/70 font-medium">📅 {club.schedule}</span>
        <span className="font-serif font-bold text-[#8C2318]">{formatPrice(club.price)}원</span>
      </div>
    </Link>
  );
}

export default function Clubs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [hoveredClubId, setHoveredClubId] = useState<string | number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredClubs = useMemo(() => {
    return allClubs.filter((club) => {
      const matchesSearch =
        !searchQuery ||
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.leaderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.bookTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || club.category === selectedCategory;
      const matchesRegion = selectedRegion === "all" || club.region === selectedRegion;
      const matchesStatus =
        selectedStatus === "all" || club.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesRegion && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedRegion, selectedStatus]);

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
      { threshold: 0.05 }
    );
    const elements = section.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredClubs]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Page Header */}
      <div className="relative pt-20 md:pt-24 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Wide%20angle%20cozy%20library%20bookshelves%20with%20warm%20ambient%20lighting%2C%20rows%20of%20colorful%20books%20creating%20depth%2C%20soft%20golden%20light%2C%20abstract%20and%20artistic%2C%20editorial%20architectural%20photography%2C%20warm%20earth%20tones%2C%20cream%20and%20amber%20palette&width=1600&height=500&seq=clubs-hero&orientation=landscape"
            alt="독서모임 배너"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />
        </div>

        <div className="relative z-10 w-full px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-accent-500 text-xs font-semibold tracking-wide uppercase mb-4">
              Reading Clubs
            </span>
            <h1 className="font-heading font-bold text-2xl md:text-4xl lg:text-5xl text-background-50 leading-tight mb-4">
              모임 둘러보기
            </h1>
            <p className="text-background-100/80 text-base md:text-lg max-w-xl mx-auto">
              모집 중, 진행 중, 종료된 모임을 확인하고 관심 있는 주제의 독서클럽을 찾아보세요
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Status Tabs */}
      <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8 bg-background-100 border-b border-background-200/70">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-background-200/70">
            {clubStatuses.map((st) => (
              <button
                key={st.value}
                onClick={() => setSelectedStatus(st.value)}
                className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 -mb-[5px] ${
                  selectedStatus === st.value
                    ? "border-accent-500 text-accent-500 font-bold"
                    : "border-transparent text-foreground-600 hover:text-foreground-900"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Search & Category/Region filters */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <i className="ri-search-2-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400" />
              <input
                type="text"
                placeholder="모임 이름, 책 제목, 클럽장 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background-50 border border-background-200/70 rounded-none text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 bg-background-50 border border-background-200/70 rounded-none text-sm text-foreground-900 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent cursor-pointer"
            >
              {clubCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>

            {/* Region */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2.5 bg-background-50 border border-background-200/70 rounded-none text-sm text-foreground-900 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent cursor-pointer"
            >
              {clubRegions.map((reg) => (
                <option key={reg.value} value={reg.value}>{reg.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Section with Ace Hotel Contextual Background Transition */}
      <div
        ref={sectionRef}
        className={`
          flex-1 w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 border-t border-[#1a1a1a]/10
          transition-colors duration-700 ease-out-ace
          ${hoveredClubId !== null ? "bg-[#e8e6df]" : "bg-[#f4f3ee]"}
        `}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#1a1a1a]">
              전체 <span className="text-[#8C2318] font-mono">{filteredClubs.length}</span>개의 독서클럽
            </h2>
          </div>

          {filteredClubs.length === 0 ? (
            <div className="text-center py-24 font-serif">
              <p className="text-[#1a1a1a] text-xl font-bold mb-2">검색 결과가 없습니다</p>
              <p className="text-[#1a1a1a]/60 text-sm font-sans">다른 검색어나 필터를 선택해보세요</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filteredClubs.map((club) => (
                <ClubCard
                  key={club.id}
                  club={club}
                  isActive={hoveredClubId === club.id}
                  isDimmed={hoveredClubId !== null && hoveredClubId !== club.id}
                  onMouseEnter={() => setHoveredClubId(club.id)}
                  onMouseLeave={() => setHoveredClubId(null)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}