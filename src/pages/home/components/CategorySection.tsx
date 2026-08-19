import { useState, useMemo } from "react";
import { categories } from "@/mocks/home";
import { CURATED_50_BOOKS, CuratedBook } from "@/mocks/books50";
import { proxyBookCover } from "@/lib/proxyBookCover";

// Book Cover via server-side proxy (same approach as admin's Streamlit st.image)
function BookCoverImage({ book, className }: { book: CuratedBook; className: string }) {
  const [imageError, setImageError] = useState(false);
  const proxiedSrc = proxyBookCover(book.cover);

  if (imageError) {
    // Fallback: show styled title card
    return (
      <div className={`${className} bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-1`}>
        <span className="text-[9px] text-white font-bold leading-tight text-center line-clamp-3">{book.title}</span>
      </div>
    );
  }

  return (
    <img
      src={proxiedSrc}
      alt={book.title}
      onError={() => setImageError(true)}
      className={className}
    />
  );
}

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
            CURATED ALADIN 50 BOOKS & CATEGORIES
          </span>
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-[#1a1a1a] leading-tight mb-4">
            관심 주제로 독서 모임 도서를 탐색해보세요
          </h2>
          <p className="text-[#1a1a1a]/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans tracking-tightest">
            인문학, 비즈니스, 소설 등 6개 에디토리얼 카테고리의 50권 추천 도서 중<br className="hidden sm:inline" />
            원하는 책을 선택하고 나만의 독서 모임 개설을 신청해보세요.
          </p>
        </div>

        {/* 6 Category Cards with 3D Hover Lift */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            const count = categoryCounts[cat.name] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`group relative p-6 text-center border font-sans transition-all duration-700 ease-out-ace cursor-pointer ${
                  isSelected
                    ? "bg-[#1a1a1a] text-[#f4f3ee] border-[#1a1a1a] -translate-y-2 shadow-[8px_8px_0px_#8C2318]"
                    : "bg-[#f4f3ee] hover:bg-white text-[#1a1a1a] border-[#1a1a1a] hover:-translate-y-2 hover:shadow-[8px_8px_0px_#1a1a1a]"
                }`}
              >
                  <div
                    className={`w-12 h-12 mx-auto mb-4 flex items-center justify-center transition-colors duration-500 border border-[#1a1a1a]/20 ${
                      isSelected
                        ? "bg-[#8C2318] text-[#f4f3ee]"
                        : "bg-[#e8e6df] text-[#1a1a1a] group-hover:bg-[#8C2318] group-hover:text-[#f4f3ee]"
                    }`}
                  >
                    <i className={`${cat.icon} text-2xl`} />
                  </div>
                  <h3 className="font-serif font-bold text-base mb-1">
                    {cat.name} <span className="text-xs font-mono opacity-70">({count})</span>
                  </h3>
                  <p className={`font-sans text-[11px] leading-tight line-clamp-1 ${isSelected ? "text-[#f4f3ee]/80" : "text-[#1a1a1a]/60"}`}>
                    {cat.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Search Input Bar & Category Filter Tabs */}
          <div className="bg-white p-6 border border-[#1a1a1a] shadow-none mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Input & Buttons */}
              <div className="flex w-full md:w-auto items-center gap-3 flex-1 max-w-xl">
                <div className="relative flex-1 pt-2">
                  <input
                    type="text"
                    id="cat-search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b-2 border-[#1a1a1a] py-2 text-sm text-[#1a1a1a] focus:outline-none focus:border-[#8C2318] transition-colors"
                  />
                  <label
                    htmlFor="cat-search"
                    className="absolute left-0 top-0 text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-placeholder-shown:font-normal peer-placeholder-shown:text-[#1a1a1a]/50 peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#8C2318]"
                  >
                    도서명, 저자, 키워드 검색 (예: 아토믹 해빗, 한강, AI)
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
                  className="bg-[#1a1a1a] hover:bg-[#8C2318] text-[#f4f3ee] px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer shrink-0 flex items-center gap-1 border border-[#1a1a1a]"
                >
                  <i className="ri-search-line" />
                  <span>검색</span>
                </button>
                <button
                  onClick={handleShuffle}
                  title="클릭할 때마다 무한히 다른 도서 추천받기"
                  className="bg-[#e8e6df] hover:bg-white text-[#1a1a1a] border border-[#1a1a1a] px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer shrink-0 flex items-center gap-1 active:scale-95"
                >
                  <i className="ri-refresh-line text-[#8C2318] font-bold" />
                  <span className="hidden sm:inline">🎲 새로고침</span>
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full md:w-auto font-mono text-xs">
                <button
                  onClick={() => setSelectedCategory("전체")}
                  className={`px-3.5 py-1.5 font-bold uppercase border transition-all ${
                    selectedCategory === "전체"
                      ? "bg-[#8C2318] text-[#f4f3ee] border-[#8C2318]"
                    : "bg-background-100 text-foreground-700 border-background-200 hover:border-foreground-400"
                }`}
              >
                전체 ({categoryCounts["전체"]})
              </button>
              {categories.map((cat) => {
                const count = categoryCounts[cat.name] || 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-3 py-1.5 text-xs font-semibold border transition-all ${
                      selectedCategory === cat.name
                        ? "bg-primary-500 text-background-50 border-primary-500"
                        : "bg-background-100 text-foreground-700 border-background-200 hover:border-primary-300"
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 mb-16 animate-in fade-in duration-300">
                {filteredBooks.map((book) => {
                  const isChecked = selectedBookIds.includes(book.id);
                  return (
                    <div
                      key={book.id}
                      onClick={() => toggleBookSelection(book.id)}
                      className={`group bg-background-50 p-4 border transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                        isChecked
                          ? "border-primary-500 ring-2 ring-primary-500/20 bg-primary-50/20 shadow-md"
                          : "border-background-200/80 hover:border-primary-300 hover:shadow-md"
                      }`}
                    >
                      {/* Top Checkbox Overlay */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 border border-primary-200">
                          {book.category}
                        </span>
                        <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-foreground-700">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleBookSelection(book.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 text-primary-600 border-background-300 focus:ring-primary-500 rounded-none cursor-pointer"
                          />
                          <span className={isChecked ? "text-primary-600 font-extrabold" : "text-foreground-500"}>
                            {isChecked ? "선택 완료" : "모임 신청"}
                          </span>
                        </label>
                      </div>

                      {/* Official Aladin Book Image & Details */}
                      <div className="flex gap-3.5 mb-3">
                        <BookCoverImage
                          book={book}
                          className="w-16 h-22 shrink-0 object-cover border border-background-300 shadow-xs group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5">
                          <div>
                            <h4 className="font-heading font-bold text-sm text-foreground-950 line-clamp-2 leading-snug group-hover:text-primary-600 transition-colors">
                              {book.title}
                            </h4>
                            <p className="text-xs text-foreground-500 mt-1 truncate">
                              {book.author} &bull; {book.publisher}
                            </p>
                          </div>

                          {/* Tag badges */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {book.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="text-[10px] text-foreground-500 bg-background-100 px-1.5 py-0.5">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Description Excerpt */}
                      <p className="text-xs text-foreground-600 leading-relaxed line-clamp-2 pt-2 border-t border-background-200/60">
                        {book.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Bottom Sticky Action Bar */}
      {selectedBookIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-xl bg-foreground-950 text-background-50 p-4 border border-foreground-800 shadow-2xl flex items-center justify-between gap-4 animate-in slide-in-from-bottom-6 duration-300">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-8 h-8 rounded-full bg-rose-500 text-background-50 text-xs font-black flex items-center justify-center shrink-0">
              {selectedBookIds.length}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-background-50 truncate">
                {selectedBooks.map((b) => b.title).join(", ")}
              </p>
              <p className="text-[11px] text-background-300">
                총 {selectedBookIds.length}권의 도서가 선택되었습니다
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="bg-primary-500 hover:bg-primary-600 text-background-50 px-5 py-2.5 text-xs md:text-sm font-bold tracking-wide transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>독서 모임 개설 신청하기</span>
            <i className="ri-send-plane-fill text-sm" />
          </button>
        </div>
      )}

      {/* Submission Confirmation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-background-50 border border-background-200 w-full max-w-lg p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 text-foreground-400 hover:text-foreground-900 transition-colors"
            >
              <i className="ri-close-line text-2xl" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                <i className="ri-checkbox-circle-fill" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground-950 mb-1">
                독서 모임 개설 신청 완료!
              </h3>
              <p className="text-xs text-foreground-500">
                선택하신 도서로 퀘스처니티 독서 모임 개설 요청이 정상적으로 접수되었습니다.
              </p>
            </div>

            {/* Selected Books List in Modal */}
            <div className="max-h-48 overflow-y-auto bg-background-100 p-3 border border-background-200 mb-6 space-y-2">
              {selectedBooks.map((b) => (
                <div key={b.id} className="flex items-center gap-3 bg-background-50 p-2 border border-background-200/80">
                  <BookCoverImage book={b} className="w-8 h-11 object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-foreground-950 truncate">{b.title}</p>
                    <p className="text-[11px] text-foreground-500 truncate">{b.author} &bull; {b.category}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-800 mb-6 flex items-start gap-2">
              <i className="ri-information-fill text-amber-600 text-sm shrink-0 mt-0.5" />
              <span>
                희망하시는 도서 모임의 최소 참여 정원이 충족되면 담당 클럽 매니저가 개설 일정과 장소를 안내해 드립니다.
              </span>
            </div>

            <button
              onClick={handleConfirmCompletion}
              className="w-full bg-foreground-950 hover:bg-foreground-900 text-background-50 py-3 text-xs md:text-sm font-bold tracking-wide transition-colors cursor-pointer"
            >
              확인 (신청 완료 및 화면 정리)
            </button>
          </div>
        </div>
      )}
    </section>
  );
}