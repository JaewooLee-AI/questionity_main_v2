import { useState, useEffect, useRef, useMemo } from "react";
import { reviews as fallbackReviews, ReviewItem } from "@/mocks/home";
import { CURATED_50_BOOKS } from "@/mocks/books50";
import { supabase } from "@/lib/supabase";
import { proxyBookCover } from "@/lib/proxyBookCover";

// Book Cover via server-side proxy
function ReviewBookCover({ item, className }: { item: ReviewItem; className: string }) {
  const [imageError, setImageError] = useState(false);
  const proxiedSrc = proxyBookCover(item.bookImageUrl);

  if (imageError || !proxiedSrc) {
    return (
      <div className={`${className} bg-[#8C2318] text-[#f4f3ee] flex items-center justify-center p-2 font-serif`}>
        <span className="text-[10px] font-bold leading-tight text-center line-clamp-3">{item.bookTitle}</span>
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

  // Fetch reviews from Supabase DB or use fallback 20 items
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

            // Extract [Title - Author] from bodyText if book_title is null
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

            // Build direct Aladin book search link
            const targetAladinUrl = r.aladin_url && r.aladin_url !== "https://www.aladin.co.kr"
              ? r.aladin_url.replace("http://", "https://")
              : `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&SearchWord=${encodeURIComponent(title)}`;

            // Match title with CURATED_50_BOOKS to get guaranteed working cover
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
          setReviewList(mapped);
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

  // Clean up title by removing long Aladin subtitles and bracket notes
  const getBaseBookTitle = (title: string): string => {
    if (!title) return "";
    let base = title.split("-")[0].split(":")[0].split("(")[0].split("[")[0].trim();
    if (base.includes("오뒷세이아") || base.includes("오디세이아")) return "오디세이아";
    if (base.includes("세네카")) return "세네카";
    return base;
  };

  // Ensure unique reviews by base book title (no duplicate editions like Seneca/Odyssey)
  const uniqueReviews = useMemo(() => {
    const seen = new Set<string>();
    return reviewList
      .map((item) => {
        const cleanT = getBaseBookTitle(item.bookTitle);
        return {
          ...item,
          displayTitle: cleanT || item.bookTitle,
        };
      })
      .filter((item) => {
        const key = item.displayTitle;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }, [reviewList]);

  const marqueeItems = uniqueReviews;

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className={`
        w-full py-24 md:py-32 border-t border-[#1a1a1a]/10 overflow-hidden font-sans
        transition-colors duration-700 ease-out-ace
        ${hoveredReviewId !== null ? "bg-[#e8e6df]" : "bg-[#f4f3ee]"}
      `}
    >
      {/* Section Header */}
      <div className="text-center mb-16 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <span className="inline-block text-[#8C2318] text-xs font-bold tracking-widest uppercase mb-3 font-sans">
          MEMBER TESTIMONIALS & EDITORIAL REVIEWS
        </span>
        <h2 className="font-serif font-bold text-3xl md:text-5xl text-[#1a1a1a] leading-tight mb-4">
          2,000+ 멤버들의 생생한 독서 후기
        </h2>
        <p className="text-[#1a1a1a]/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-sans tracking-tightest">
          카드를 클릭하면 상세 도서 정보와 독서클럽 스케줄을 확인하실 수 있습니다.
        </p>
      </div>

      {/* Marquee Track Container */}
      <div className="relative w-full overflow-hidden group">
        <div className="flex w-max gap-6 md:gap-8 animate-marquee group-hover:[animation-play-state:paused] py-6 px-4">
          {marqueeItems.map((item, index) => {
            const currentLikes = getLikes(item);
            const isHovered = hoveredReviewId === `${item.id}-${index}`;
            const isDimmed = hoveredReviewId !== null && !isHovered;

            return (
              <div
                key={`${item.id}-${index}`}
                onClick={() => setSelectedReview(item)}
                onMouseEnter={() => setHoveredReviewId(`${item.id}-${index}`)}
                onMouseLeave={() => setHoveredReviewId(null)}
                className={`
                  w-[340px] md:w-[400px] shrink-0 bg-[#f4f3ee] p-6 md:p-8 border border-[#1a1a1a] flex flex-col justify-between cursor-pointer
                  transition-all duration-700 ease-out-ace
                  ${isHovered ? "-translate-y-3 shadow-[10px_10px_0px_#1a1a1a] bg-white z-10 scale-[1.02]" : "translate-y-0 shadow-none"}
                  ${isDimmed ? "opacity-60 grayscale-[30%]" : "opacity-100 grayscale-0"}
                `}
              >
                <div>
                  {/* Rating & Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#8C2318] uppercase border-b border-[#8C2318]">
                      REVIEW NO. {String(index + 1).padStart(3, '0')}
                    </span>
                    <div className="flex items-center gap-1 text-[#8C2318] text-xs">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i
                          key={i}
                          className={`ri-star-${i < item.rating ? "fill" : "line"}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Book Image Thumbnail & Title */}
                  <div className="flex items-center gap-3 mb-4 bg-[#e8e6df]/50 p-3 border border-[#1a1a1a]/10">
                    <ReviewBookCover
                      item={item}
                      className="w-10 h-14 object-cover border border-[#1a1a1a]/20 shrink-0 shadow-xs"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-serif font-bold text-[#1a1a1a] truncate">
                        {(item as any).displayTitle || item.bookTitle}
                      </div>
                      <div className="text-[11px] text-[#1a1a1a]/60 truncate mt-0.5">
                        {item.bookAuthor}
                      </div>
                    </div>
                  </div>

                  {/* Excerpt Content */}
                  <p className="font-serif text-sm text-[#1a1a1a]/90 leading-relaxed mb-6 line-clamp-3 italic">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                {/* Footer: Author, Role, Like Count */}
                <div className="pt-4 border-t border-[#1a1a1a]/10 flex items-center justify-between font-sans">
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-serif font-bold text-[#1a1a1a] truncate">{item.name}</span>
                    <span className="text-[10px] text-[#1a1a1a]/60 truncate">{item.role}</span>
                  </div>
                  <button
                    onClick={(e) => handleLike(item.id, e)}
                    className="flex items-center gap-1.5 text-xs text-[#8C2318] hover:text-[#1a1a1a] font-mono transition-colors shrink-0"
                  >
                    <i className="ri-heart-3-fill" />
                    <span className="font-bold">{currentLikes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Detail Card Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-background-50 border border-background-200 w-full max-w-lg p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 text-foreground-400 hover:text-foreground-900 transition-colors"
            >
              <i className="ri-close-line text-2xl" />
            </button>

            {/* AI Badge */}
            <div className="mb-4">
              <span className="inline-block text-xs font-semibold text-accent-500 bg-accent-50 px-2.5 py-1 border border-accent-200">
                ✨ AI 추천 생생 후기
              </span>
            </div>

            {/* Book Info Header */}
            <div className="flex gap-4 items-start mb-6 bg-background-100 p-4 border border-background-200">
              <ReviewBookCover
                item={selectedReview}
                className="w-20 h-28 object-cover border border-background-300 shadow-sm shrink-0"
              />
              <div className="flex flex-col justify-between h-28 py-0.5">
                <div>
                  <h3 className="font-heading font-bold text-base md:text-lg text-foreground-950 leading-snug line-clamp-2">
                    {selectedReview.bookTitle}
                  </h3>
                  <p className="text-xs text-foreground-500 mt-1">{selectedReview.bookAuthor}</p>
                </div>

                {/* Aladin Button */}
                <a
                  href={selectedReview.aladinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-accent-500 hover:underline"
                >
                  <i className="ri-external-link-line" />
                  알라딘에서 도서 정보 보기
                </a>
              </div>
            </div>

            {/* Full Review Content */}
            <div className="mb-6">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i
                    key={i}
                    className={`ri-star-${i < selectedReview.rating ? "fill" : "line"} text-amber-400 text-sm`}
                  />
                ))}
                <span className="text-xs font-bold text-foreground-700 ml-1">
                  {selectedReview.rating}.0 / 5.0
                </span>
              </div>
              <p className="text-sm text-foreground-800 leading-relaxed italic bg-background-50 p-4 border border-background-200/70">
                &ldquo;{selectedReview.content}&rdquo;
              </p>
            </div>

            {/* Author & Like Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-background-200">
              <div>
                <p className="text-sm font-bold text-foreground-900">{selectedReview.name}</p>
                <p className="text-xs text-foreground-500">{selectedReview.role} &bull; {selectedReview.clubName}</p>
              </div>

              <button
                onClick={(e) => handleLike(selectedReview.id, e)}
                className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 font-semibold text-xs transition-colors"
              >
                <i className="ri-heart-3-fill text-rose-500 text-sm" />
                <span>좋아요 {getLikes(selectedReview)}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 90s linear infinite;
        }
      `}</style>
    </section>
  );
}