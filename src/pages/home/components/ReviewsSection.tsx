import { useState, useEffect, useRef, useMemo } from "react";
import { reviews as fallbackReviews, ReviewItem } from "@/mocks/home";
import { CURATED_50_BOOKS } from "@/mocks/books50";
import { supabase } from "@/lib/supabase";
import { proxyBookCover } from "@/lib/proxyBookCover";

// Book Cover Poster Component for Ace Hotel Review Cards
function ReviewBookCover({ item, className }: { item: ReviewItem; className: string }) {
  const [imageError, setImageError] = useState(false);
  const proxiedSrc = proxyBookCover(item.bookImageUrl);

  if (imageError || !proxiedSrc) {
    return (
      <div className={`${className} bg-[#8C2318] text-[#f4f3ee] flex flex-col items-center justify-center p-4 font-serif text-center`}>
        <span className="font-mono text-xs uppercase tracking-widest block opacity-75 mb-1">QUESTIONITY</span>
        <span className="text-sm font-bold leading-tight line-clamp-3">{item.bookTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={proxiedSrc}
      alt={item.bookTitle}
      onError={() => setImageError(true)}
      className={className}
    />
  );
}

export default function ReviewsSection() {
  const [reviewList, setReviewList] = useState<ReviewItem[]>(fallbackReviews);
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);
  const [hoveredReviewId, setHoveredReviewId] = useState<string | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  // Fetch reviews from Supabase DB or use fallback items
  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .order("created_at", { ascending: false });

        if (data && data.length > 0 && !error) {
          const mapped: ReviewItem[] = data.map((r: any, idx: number) => {
            let bTitle = r.book_title;
            let bAuthor = r.book_author;
            let bodyText = r.content || "";

            if (!bTitle && bodyText.startsWith("[")) {
              const headerMatch = bodyText.match(/^\[(.*?) - (.*?)\]\s*\n\n/);
              if (headerMatch) {
                bTitle = headerMatch[1];
                bAuthor = headerMatch[2];
                bodyText = bodyText.replace(/^\[.*?\]\s*\n\n/, "");
              }
            }

            const title = bTitle || "추천 도서";
            const author = bAuthor || "알라딘 베스트셀러";
            const persona = r.author_name || r.fake_user_persona || "참여자";
            const name = persona.includes("(") ? persona.split("(")[0].trim() : persona;
            const role = r.author_role || (persona.includes("(") ? persona.split("(")[1].replace(")", "").trim() : "독서 멤버");

            const targetAladinUrl = r.aladin_url && r.aladin_url !== "https://www.aladin.co.kr"
              ? r.aladin_url.replace("http://", "https://")
              : `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&SearchWord=${encodeURIComponent(title)}`;

            const matched50Book = CURATED_50_BOOKS.find(
              b => title.includes(b.title.split(" ")[0]) || b.title.includes(title.split(" ")[0])
            );

            let rawCover = r.book_image_url ? r.book_image_url.replace("http://", "https://") : "";
            if (!rawCover && matched50Book) {
              rawCover = matched50Book.cover;
            }

            return {
              id: r.id,
              name,
              role,
              clubName: `${title} 모임`,
              content: bodyText,
              bookTitle: title,
              bookAuthor: author,
              bookImageUrl: rawCover,
              aladinUrl: targetAladinUrl,
              rating: r.rating || 5,
              likeCount: r.like_count || (15 + (idx * 7) % 40),
              isAiGenerated: r.is_ai_generated ?? true,
            };
          });
          // Combine Supabase data with fallbackReviews so all 20 AI items remain available
          const mergedMap = new Map<string, ReviewItem>();
          mapped.forEach(item => mergedMap.set(item.id, item));
          fallbackReviews.forEach(fb => {
            if (!mergedMap.has(fb.id)) {
              mergedMap.set(fb.id, fb);
            }
          });
          setReviewList(Array.from(mergedMap.values()));
        } else {
          setReviewList(fallbackReviews);
        }
      } catch (e) {
        setReviewList(fallbackReviews);
      }
    }

    fetchReviews();
  }, []);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const getLikes = (item: ReviewItem) => {
    return item.likeCount + (likesMap[item.id] || 0);
  };

  const uniqueReviews = useMemo(() => {
    return reviewList.map((item) => ({
      ...item,
      displayTitle: item.bookTitle,
    }));
  }, [reviewList]);

  // Smooth scroll carousel helper (Left / Right)
  const scrollRow = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const amount = rowRef.current.clientWidth * 0.8;
    rowRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth"
    });
  };

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className={`
        w-full pt-6 pb-6 md:pt-8 md:pb-8 border-t border-[#1a1a1a]/15 overflow-hidden font-sans
        transition-colors duration-700 ease-out-ace
        ${hoveredReviewId !== null ? "bg-[#dedcd4]" : "bg-[#e8e6df]"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block text-[#8C2318] text-xs font-bold tracking-widest uppercase mb-2 font-sans">
            MEMBER TESTIMONIALS & EDITORIAL REVIEWS
          </span>
          <h2 className="font-gmarket font-bold text-3xl md:text-5xl text-[#1a1a1a] leading-tight mb-3">
            멤버들의 솔직한 독서 후기
          </h2>
          <p className="text-[#1a1a1a]/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-sans tracking-tightest">
            READ MORE를 클릭하시면 멤버들의 생생한 독후감 풀스토리를 감상하실 수 있습니다.
          </p>
        </div>

        {/* Ace Hotel Floating Circular Arrow Carousel Wrapper (No Auto Scroll) */}
        <div className="relative group/carousel">
          {uniqueReviews.length > 1 && (
            <>
              <button
                onClick={() => scrollRow("left")}
                className="absolute -left-3 sm:-left-6 top-[40%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-[#1a1a1a] shadow-2xl border border-black/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                aria-label="Previous Review"
              >
                <i className="ri-arrow-left-line text-xl font-bold" />
              </button>
              <button
                onClick={() => scrollRow("right")}
                className="absolute -right-3 sm:-right-6 top-[40%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-[#1a1a1a] shadow-2xl border border-black/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                aria-label="Next Review"
              >
                <i className="ri-arrow-right-line text-xl font-bold" />
              </button>
            </>
          )}

          {/* Cards Carousel Container */}
          <div
            ref={rowRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {uniqueReviews.map((item, index) => {
              const currentLikes = getLikes(item);
              const isHovered = hoveredReviewId === `${item.id}-${index}`;
              const isDimmed = hoveredReviewId !== null && !isHovered;

              return (
                <div
                  key={`${item.id}-${index}`}
                  onMouseEnter={() => setHoveredReviewId(`${item.id}-${index}`)}
                  onMouseLeave={() => setHoveredReviewId(null)}
                  className={`
                    w-[82%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 bg-[#f4f3ee] border border-[#1a1a1a]
                    flex flex-col justify-between overflow-hidden transition-all duration-500 cursor-pointer group
                    ${isHovered ? "-translate-y-2 shadow-2xl bg-white border-[#8C2318]" : "translate-y-0 shadow-sm"}
                    ${isDimmed ? "opacity-75" : "opacity-100"}
                  `}
                >
                  <div>
                    {/* TOP: Book Cover Image Banner (65% Compact Height, Full Book Cover Visible with object-contain) */}
                    <div
                      onClick={() => setSelectedReview(item)}
                      className="relative w-full h-44 sm:h-52 bg-[#1a1a1a] p-3 overflow-hidden cursor-pointer flex items-center justify-center border-b border-[#1a1a1a]/15"
                    >
                      <ReviewBookCover
                        item={item}
                        className="max-h-full max-w-full object-contain shadow-md transition-transform duration-700 ease-out-ace group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 right-2.5 bg-black/85 text-[#f4f3ee] text-[9px] font-mono font-bold px-2 py-0.5 tracking-wider uppercase border border-white/10 shadow-sm">
                        REV NO. {String(index + 1).padStart(3, "0")}
                      </div>
                    </div>

                    {/* MIDDLE: Text Details (Headline, Author, Rating & Short Excerpt) */}
                    <div className="p-5 font-sans">
                      {/* Bold Uppercase Condensed Book Title Headline */}
                      <h3
                        onClick={() => setSelectedReview(item)}
                        className="font-serif font-bold text-lg md:text-xl uppercase leading-snug tracking-tight text-[#1a1a1a] group-hover:text-[#8C2318] transition-colors duration-300 line-clamp-2 mb-1.5"
                      >
                        {(item as any).displayTitle || item.bookTitle}
                      </h3>

                      {/* Meta Subline: Member Name & Rating */}
                      <div className="flex items-center justify-between text-xs text-[#1a1a1a]/70 font-sans mb-3">
                        <span className="font-bold text-[#8C2318] truncate">
                          {item.name} &bull; {item.role}
                        </span>
                        <div className="flex items-center gap-0.5 text-[#8C2318] shrink-0">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <i
                              key={i}
                              className={`ri-star-${i < item.rating ? "fill" : "line"} text-[11px]`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Short Review Excerpt (2-3 lines max) */}
                      <p className="text-xs text-[#1a1a1a]/80 leading-relaxed font-sans line-clamp-3 mb-4">
                        &ldquo;{item.content}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* BOTTOM: ACE HOTEL READ MORE BUTTON LINK */}
                  <div className="px-5 pb-5 pt-0 flex items-center justify-between font-mono text-xs border-t border-[#1a1a1a]/10 mt-auto">
                    <button
                      onClick={() => setSelectedReview(item)}
                      className="font-mono font-bold text-xs uppercase tracking-widest text-[#1a1a1a] group-hover:text-[#8C2318] underline underline-offset-4 decoration-1 hover:decoration-2 transition-all cursor-pointer pt-3"
                    >
                      READ MORE
                    </button>
                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className="flex items-center gap-1 text-xs text-[#8C2318] font-bold cursor-pointer hover:scale-110 transition-transform pt-3"
                      aria-label="Like"
                    >
                      <i className="ri-heart-3-fill text-xs" />
                      <span>{currentLikes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ace Hotel Editorial Review Detail Card Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#f4f3ee] text-[#1a1a1a] border border-[#1a1a1a] w-full max-w-lg p-6 md:p-8 shadow-2xl relative font-sans">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-2xl" />
            </button>

            {/* Ace Hotel Tag */}
            <div className="mb-4">
              <span className="font-mono text-[10px] font-bold text-[#8C2318] bg-[#e8e6df] px-3 py-1 uppercase tracking-widest border border-[#1a1a1a]/20">
                QUESTIONITY MEMBER TESTIMONIAL
              </span>
            </div>

            {/* Book Info Header */}
            <div className="flex gap-4 items-start mb-6 bg-[#e8e6df]/70 p-4 border border-[#1a1a1a]/15">
              <ReviewBookCover
                item={selectedReview}
                className="w-20 h-28 object-cover border border-[#1a1a1a] shadow-md shrink-0"
              />
              <div className="flex flex-col justify-between h-28 py-0.5 min-w-0">
                <div>
                  <h3 className="font-serif font-bold text-lg md:text-xl text-[#1a1a1a] leading-tight line-clamp-2 uppercase">
                    {selectedReview.bookTitle}
                  </h3>
                  <p className="text-xs text-[#1a1a1a]/70 font-sans mt-1">{selectedReview.bookAuthor}</p>
                </div>

                {/* Aladin Button */}
                <a
                  href={selectedReview.aladinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#8C2318] hover:text-[#1a1a1a] uppercase tracking-wider"
                >
                  <i className="ri-external-link-line" />
                  알라딘 도서 상세 보기 ↗
                </a>
              </div>
            </div>

            {/* Full Review Content */}
            <div className="mb-6">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i
                    key={i}
                    className={`ri-star-${i < selectedReview.rating ? "fill" : "line"} text-[#8C2318] text-sm`}
                  />
                ))}
                <span className="text-xs font-mono font-bold text-[#1a1a1a] ml-1">
                  {selectedReview.rating}.0 / 5.0
                </span>
              </div>
              <div className="text-xs sm:text-sm text-[#1a1a1a] leading-relaxed italic bg-white p-5 border border-[#1a1a1a]/20 max-h-60 overflow-y-auto">
                &ldquo;{selectedReview.content}&rdquo;
              </div>
            </div>

            {/* Author & Like Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a]/15 font-sans">
              <div>
                <p className="text-sm font-serif font-bold text-[#1a1a1a]">{selectedReview.name}</p>
                <p className="text-xs text-[#1a1a1a]/60">{selectedReview.role} &bull; {selectedReview.clubName}</p>
              </div>

              <button
                onClick={(e) => handleLike(selectedReview.id, e)}
                className="flex items-center gap-2 px-4 py-2 bg-[#8C2318] text-[#f4f3ee] hover:bg-[#1a1a1a] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                <i className="ri-heart-3-fill text-xs" />
                <span>LIKE {getLikes(selectedReview)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}