import { useState, useMemo } from "react";
import { categories } from "@/mocks/home";
import { CURATED_50_BOOKS, CuratedBook } from "@/mocks/books50";
import { proxyBookCover } from "@/lib/proxyBookCover";

// Book Cover component with robust error handling and multiple fallbacks
function BookCoverImage({ book, className }: { book: CuratedBook; className: string }) {
  const [imageError, setImageError] = useState(false);

  // If Aladin image, use server proxy; otherwise load directly from CDN
  const isAladin = book.cover?.includes("aladin.co.kr");
  const imageSrc = isAladin
    ? `/api/book-cover?url=${encodeURIComponent(book.cover)}`
    : book.cover;

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth < 10 || img.naturalHeight < 10) {
      setImageError(true);
    }
  };

  if (imageError || !book.cover) {
    const categoryStyles: Record<string, { gradient: string; emoji: string }> = {
      "경제경영": { gradient: "from-slate-800 to-blue-950", emoji: "💼" },
      "자기계발": { gradient: "from-slate-800 to-emerald-950", emoji: "📈" },
      "인문학": { gradient: "from-slate-800 to-purple-950", emoji: "🎓" },
      "IT/컴퓨터": { gradient: "from-slate-800 to-cyan-950", emoji: "💻" },
      "소설/시/희곡": { gradient: "from-slate-800 to-rose-950", emoji: "🖋" },
      "사회과학": { gradient: "from-slate-800 to-amber-950", emoji: "🤝" },
    };

    const style = categoryStyles[book.category] || {
      gradient: "from-neutral-800 to-neutral-950",
      emoji: "📚"
    };

    return (
      <div className={`${className} relative bg-gradient-to-br ${style.gradient} flex flex-col items-center justify-center p-2 text-white overflow-hidden select-none`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="text-xl mb-1">{style.emoji}</span>
          <span className="text-[9px] font-bold opacity-75 tracking-wider block mb-0.5">{book.category}</span>
          <span className="text-[8px] font-medium leading-tight line-clamp-2 px-1 opacity-90">{book.title}</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={book.title}
      onError={() => setImageError(true)}
      onLoad={handleLoad}
      className={className}
      loading="lazy"
    />
  );
}

const CATEGORY_IMAGES: Record<string, { bg: string; code: string }> = {
  경제경영: {
    bg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    code: "CAT. 001 — ECONOMICS",
  },
  자기계발: {
    bg: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80",
    code: "CAT. 002 — GROWTH",
  },
  인문학: {
    bg: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80",
    code: "CAT. 003 — HUMANITIES",
  },
  "IT/컴퓨터": {
    bg: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80",
    code: "CAT. 004 — AI & TECH",
  },
  "소설/시/희곡": {
    bg: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80",
    code: "CAT. 005 — LITERATURE",
  },
  사회과학: {
    bg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    code: "CAT. 006 — SOCIETY",
  },
};

// Fallback image for categories without images
const DEFAULT_CATEGORY_IMAGE = "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80";

export default function CategorySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [searchInput, setSearchInput] = useState<string>("");
  const [activeSearchKeyword, setActiveSearchKeyword] = useState<string>("");
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isListExpanded, setIsListExpanded] = useState<boolean>(false);
  const [hasCompletedApplication, setHasCompletedApplication] = useState<boolean>(false);
  
  // Random Seed for true infinite reshuffling
  const [shuffleVersion, setShuffleVersion] = useState<number>(0);

  const handleShuffle = () => {
    setShuffleVersion(Date.now() + Math.random());
    setIsListExpanded(true);
  };

  const handleSearchSubmit = () => {
    setActiveSearchKeyword(searchInput.trim());
    setShuffleVersion(Date.now() + Math.random());
    setIsListExpanded(true);
    setHasCompletedApplication(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setActiveSearchKeyword("");
    setShuffleVersion(Date.now() + Math.random());
  };

  // Filter books by selected category & active search keyword + TRUE dynamic shuffle
  const filteredBooks = useMemo(() => {
    const list = CURATED_50_BOOKS.filter((book) => {
      const matchCategory =
        selectedCategory === "전체" || book.category === selectedCategory;
      
      const q = activeSearchKeyword.toLowerCase();
      const matchSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.description.toLowerCase().includes(q) ||
        book.publisher.toLowerCase().includes(q) ||
        book.tags.some((t) => t.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });

    if (shuffleVersion === 0) return list;

    const arr = [...list];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [selectedCategory, activeSearchKeyword, shuffleVersion]);

  const categoryCounts = useMemo(() => {
    const q = activeSearchKeyword.toLowerCase();
    const map: Record<string, number> = { 전체: 0 };
    
    categories.forEach((c) => {
      map[c.name] = 0;
    });

    CURATED_50_BOOKS.forEach((book) => {
      const qMatch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.description.toLowerCase().includes(q) ||
        book.publisher.toLowerCase().includes(q) ||
        book.tags.some((t) => t.toLowerCase().includes(q));

      if (qMatch) {
        map["전체"]++;
        if (map[book.category] !== undefined) {
          map[book.category]++;
        }
      }
    });

    return map;
  }, [activeSearchKeyword]);

  const toggleBookSelection = (id: string) => {
    setSelectedBookIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedBooks = useMemo(() => {
    return CURATED_50_BOOKS.filter((b) => selectedBookIds.includes(b.id));
  }, [selectedBookIds]);

  const handleCategoryClick = (catName: string) => {
    setIsListExpanded(true);
    setHasCompletedApplication(false);
    setShuffleVersion(Date.now() + Math.random());
    if (selectedCategory === catName) {
      setSelectedCategory("전체");
    } else {
      setSelectedCategory(catName);
    }
  };

  const handleConfirmCompletion = () => {
    setIsSubmitModalOpen(false);
    setSelectedBookIds([]);
    handleClearSearch();
    setIsListExpanded(false);
    setHasCompletedApplication(true);
  };

  return (
    <section id="categories" className="w-full px-6 md:px-12 lg:px-20 pt-6 pb-16 md:pt-8 md:pb-20 bg-[#f4f3ee] border-t border-[#1a1a1a]/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title Header */}
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block text-[#8C2318] text-xs font-bold tracking-widest uppercase mb-3 font-sans">
            CURATED ALADIN 300 BOOKS & CATEGORIES (50 BOOKS EACH)
          </span>
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-[#1a1a1a] leading-tight mb-4">
            관심 주제로 독서 모임 도서를 탐색해보세요
          </h2>
          <p className="text-[#1a1a1a]/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans tracking-tightest">
            인문학, 비즈니스, 소설 등 6개 카테고리별 50권(총 300권)의 큐레이션 추천 도서 중<br className="hidden sm:inline" />
            원하는 책을 선택하고 나만의 독서 모임 개설을 신청해보세요.
          </p>
        </div>

        {/* Search Input Bar & Category Filter Directory Index (ABOVE PHOTO CARDS - BORDERLESS) */}
        <div className="bg-[#e8e6df]/40 p-6 mb-10">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Input & Buttons */}
            <div className="flex w-full lg:w-auto items-center gap-3 flex-1 max-w-xl">
              <div className="relative flex-1 pt-2">
                <input
                  type="text"
                  id="cat-search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-[#1a1a1a] py-2 text-sm text-[#1a1a1a] focus:outline-none focus:border-[#8C2318] transition-colors font-sans"
                />
                <label
                  htmlFor="cat-search"
                  className="absolute left-0 top-0 text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-placeholder-shown:font-normal peer-placeholder-shown:text-[#1a1a1a]/50 peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#8C2318]"
                >
                  도서명, 저자, 키워드 검색
                </label>
                {searchInput && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-0 bottom-2 text-[#1a1a1a]/60 hover:text-[#1a1a1a] text-sm"
                  >
                    <i className="ri-close-circle-fill" />
                  </button>
                )}
              </div>
              <button
                onClick={handleSearchSubmit}
                className="bg-[#1a1a1a] hover:bg-[#8C2318] text-[#f4f3ee] px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer shrink-0 flex items-center gap-1.5 hover:-translate-y-0.5 hover:shadow-md"
              >
                <i className="ri-search-line" />
                <span>검색</span>
              </button>
              <button
                onClick={handleShuffle}
                title="클릭할 때마다 무한히 다른 도서 추천받기"
                className="bg-[#e8e6df] hover:bg-white text-[#1a1a1a] px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer shrink-0 flex items-center gap-1.5 active:scale-95 hover:-translate-y-0.5 hover:shadow-md"
              >
                <i className="ri-refresh-line text-[#8C2318] font-bold" />
                <span className="hidden sm:inline">🎲 새로고침</span>
              </button>
            </div>

            {/* Category Filter Pills (Borderless Tag Style) */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-end w-full lg:w-auto font-mono text-xs">
              <button
                onClick={() => setSelectedCategory("전체")}
                className={`px-3.5 py-2 font-bold uppercase transition-all duration-300 ${
                  selectedCategory === "전체"
                    ? "bg-[#8C2318] text-[#f4f3ee] shadow-md"
                    : "bg-[#e8e6df] text-[#1a1a1a] hover:bg-white hover:-translate-y-0.5 hover:shadow-sm"
                }`}
              >
                전체 ({categoryCounts["전체"]})
              </button>
              {categories.map((cat) => {
                const count = categoryCounts[cat.name] || 0;
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-3 py-2 text-xs font-bold uppercase transition-all duration-300 ${
                      isSelected
                        ? "bg-[#8C2318] text-[#f4f3ee] shadow-md"
                        : "bg-[#e8e6df] text-[#1a1a1a] hover:bg-white hover:-translate-y-0.5 hover:shadow-sm"
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 6 Category Photo Cards Grid (BORDERLESS PHOTO CARDS BELOW) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 mb-12">
          {categories.map((cat, idx) => {
            const isSelected = selectedCategory === cat.name;
            const count = categoryCounts[cat.name] || 0;
            const meta = CATEGORY_IMAGES[cat.name] || {
              bg: DEFAULT_CATEGORY_IMAGE,
              code: `CAT. 00${idx + 1} — EDITORIAL`,
            };

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`group relative overflow-hidden text-left font-sans transition-all duration-700 ease-out-ace cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#1a1a1a] text-[#f4f3ee] -translate-y-1 z-10 shadow-lg"
                    : "bg-[#e8e6df]/60 hover:bg-white text-[#1a1a1a] hover:-translate-y-1 hover:shadow-md"
                }`}
              >
                {/* TOP: Photo Image Container (70% scaled height) */}
                <div className="relative w-full h-28 sm:h-32 md:h-36 overflow-hidden bg-[#1a1a1a] shrink-0">
                  <img
                    src={meta.bg}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out-ace group-hover:scale-108 filter brightness-95 contrast-105"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_CATEGORY_IMAGE;
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-[#1a1a1a] text-[#f4f3ee] px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase">
                    0{idx + 1}
                  </div>
                </div>

                {/* BOTTOM: Text Details Below Image */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <i className={`${cat.icon} text-xs text-[#8C2318]`} />
                      <span className="text-[9px] font-mono font-bold tracking-widest text-[#8C2318] uppercase">
                        {meta.code.split(" — ")[1]}
                      </span>
                    </div>
                    <h3 className={`font-serif font-bold text-sm md:text-base leading-tight mb-1 ${isSelected ? "text-[#f4f3ee]" : "text-[#1a1a1a]"}`}>
                      {cat.name} <span className="text-xs font-mono opacity-80 text-[#8C2318]">({count})</span>
                    </h3>
                  </div>
                  <p className={`font-sans text-[10px] leading-tight line-clamp-1 ${isSelected ? "text-[#f4f3ee]/80" : "text-[#1a1a1a]/70"}`}>
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Post-Application Clean Completion Banner */}
        {hasCompletedApplication && !isListExpanded && (
          <div className="bg-emerald-50 border border-emerald-200 p-6 text-center my-6 shadow-sm">
            <div className="w-12 h-12 bg-emerald-500 text-background-50 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
              <i className="ri-check-line" />
            </div>
            <h3 className="font-bold text-base text-emerald-950 mb-1">
              독서 모임 개설 신청이 정상적으로 완료되었습니다!
            </h3>
            <p className="text-xs text-emerald-700 mb-4">
              화면을 깨끗하게 정리했습니다. 다른 도서를 새로 둘러보시려면 아래 버튼을 눌러주세요.
            </p>
            <button
              onClick={() => setIsListExpanded(true)}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-background-50 px-4 py-2 text-xs font-bold transition-colors cursor-pointer"
            >
              <i className="ri-book-read-line" />
              <span>다른 도서 목록 다시 펼쳐보기</span>
            </button>
          </div>
        )}

        {/* Results Counter Header & Toggle List Collapse Button */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="text-sm font-semibold text-foreground-700 flex items-center gap-2">
            <i className="ri-book-3-line text-primary-500 text-lg" />
            <span>
              검색 도서 목록: <strong className="text-primary-600">{filteredBooks.length}</strong>권
              {selectedCategory !== "전체" && <span className="text-xs text-foreground-500 ml-1.5">[{selectedCategory} 카테고리]</span>}
              {activeSearchKeyword && <span className="text-xs font-bold text-accent-500 ml-1.5">&bull; 검색어: &quot;{activeSearchKeyword}&quot;</span>}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {selectedBookIds.length > 0 && (
              <div className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 border border-rose-200 flex items-center gap-1.5 animate-pulse">
                <i className="ri-checkbox-circle-fill text-rose-500" />
                <span>{selectedBookIds.length}권 선택됨</span>
              </div>
            )}

            <button
              onClick={() => setIsListExpanded(!isListExpanded)}
              className="text-xs font-bold text-foreground-600 hover:text-foreground-950 bg-background-50 px-3 py-1.5 border border-background-300 hover:border-foreground-400 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>{isListExpanded ? "목록 접기" : "목록 펼치기"}</span>
              <i className={isListExpanded ? "ri-arrow-up-s-line text-base" : "ri-arrow-down-s-line text-base"} />
            </button>
          </div>
        </div>

        {/* 50 Books Grid */}
        {isListExpanded && (
          <>
            {filteredBooks.length === 0 ? (
              <div className="bg-background-50 p-12 text-center border border-background-200 my-8">
                <i className="ri-search-eye-line text-4xl text-foreground-300 mb-3 inline-block" />
                <h3 className="text-lg font-bold text-foreground-800 mb-1">검색 결과가 없습니다</h3>
                <p className="text-xs text-foreground-500 mb-4">다른 검색어나 카테고리를 선택해 주세요.</p>
                <button
                  onClick={() => {
                    handleClearSearch();
                    setSelectedCategory("전체");
                  }}
                  className="text-xs text-primary-600 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <i className="ri-refresh-line" /> 전체 도서 목록 보기
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2.5 sm:gap-3 mb-16 animate-in fade-in duration-300">
                {filteredBooks.map((book) => {
                  const isChecked = selectedBookIds.includes(book.id);
                  return (
                    <div
                      key={book.id}
                      onClick={() => toggleBookSelection(book.id)}
                      className={`group relative overflow-hidden text-left font-sans transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                        isChecked
                          ? "bg-[#1a1a1a] text-[#f4f3ee] -translate-y-1 shadow-lg"
                          : "bg-[#e8e6df]/50 hover:bg-white text-[#1a1a1a] hover:-translate-y-1 hover:shadow-md"
                      }`}
                    >
                      {/* TOP: Book Cover Image */}
                      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#1a1a1a] shrink-0">
                        <BookCoverImage
                          book={book}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Minimal Checkbox Overlay Badge */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookSelection(book.id);
                          }}
                          className={`absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-tighter uppercase transition-colors ${
                            isChecked
                              ? "bg-[#8C2318] text-white"
                              : "bg-black/60 text-white/90 group-hover:bg-[#1a1a1a]"
                          }`}
                        >
                          {isChecked ? "선택됨" : "+ 신청"}
                        </div>
                      </div>

                      {/* BOTTOM: Text Details (Title & Author) */}
                      <div className="p-2.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4
                            className={`font-serif font-bold text-xs leading-tight line-clamp-2 mb-1 ${
                              isChecked ? "text-[#f4f3ee]" : "text-[#1a1a1a]"
                            }`}
                          >
                            {book.title}
                          </h4>
                          <p
                            className={`text-[10px] truncate font-sans ${
                              isChecked ? "text-[#f4f3ee]/70" : "text-[#1a1a1a]/60"
                            }`}
                          >
                            {book.author}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Bottom Sticky Action Bar (Ace Hotel Matte Black & Brick Red) */}
      {selectedBookIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-2xl bg-[#1a1a1a] text-[#f4f3ee] p-4 shadow-2xl flex items-center justify-between gap-4 animate-in slide-in-from-bottom-6 duration-300 font-sans">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-9 h-9 bg-[#8C2318] text-[#f4f3ee] font-mono text-sm font-bold flex items-center justify-center shrink-0 shadow-sm">
              {selectedBookIds.length}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-serif font-bold text-[#f4f3ee] truncate">
                {selectedBooks.map((b) => b.title).join(", ")}
              </p>
              <p className="text-[11px] font-sans text-[#f4f3ee]/70 mt-0.5">
                총 <strong className="text-[#f4f3ee] font-bold">{selectedBookIds.length}권</strong>의 도서가 선택되었습니다
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="bg-[#8C2318] hover:bg-[#a62b1e] text-[#f4f3ee] px-5 py-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 shrink-0 flex items-center gap-2 cursor-pointer shadow-md hover:-translate-y-0.5"
          >
            <span>독서 모임 개설 신청하기</span>
            <i className="ri-send-plane-fill text-sm" />
          </button>
        </div>
      )}

      {/* Submission Confirmation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#f4f3ee] text-[#1a1a1a] border border-[#1a1a1a]/20 w-full max-w-lg p-6 md:p-8 shadow-2xl relative font-sans">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-2xl" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-[#8C2318] text-[#f4f3ee] flex items-center justify-center mx-auto mb-3 text-2xl shadow-md">
                <i className="ri-checkbox-circle-fill" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#1a1a1a] mb-1">
                독서 모임 개설 신청 완료!
              </h3>
              <p className="text-xs text-[#1a1a1a]/70 font-sans">
                선택하신 도서로 퀘스처니티 독서 모임 개설 요청이 정상적으로 접수되었습니다.
              </p>
            </div>

            {/* Selected Books List in Modal */}
            <div className="max-h-48 overflow-y-auto bg-[#e8e6df]/70 p-3 mb-6 space-y-2">
              {selectedBooks.map((b) => (
                <div key={b.id} className="flex items-center gap-3 bg-white p-2 shadow-xs">
                  <BookCoverImage book={b} className="w-8 h-11 object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-serif font-bold text-[#1a1a1a] truncate">{b.title}</p>
                    <p className="text-[11px] font-sans text-[#1a1a1a]/60 truncate">{b.author} &bull; {b.category}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#e8e6df] p-3.5 text-xs text-[#1a1a1a]/80 mb-6 flex items-start gap-2">
              <i className="ri-information-fill text-[#8C2318] text-sm shrink-0 mt-0.5" />
              <span>
                희망하시는 도서 모임의 최소 참여 정원이 충족되면 담당 클럽 매니저가 개설 일정과 장소를 안내해 드립니다.
              </span>
            </div>

            <button
              onClick={handleConfirmCompletion}
              className="w-full bg-[#1a1a1a] hover:bg-[#8C2318] text-[#f4f3ee] py-3 text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-md"
            >
              확인 (신청 완료 및 화면 정리)
            </button>
          </div>
        </div>
      )}
    </section>
  );
}