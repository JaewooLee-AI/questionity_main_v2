import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { proxyBookCover } from "@/lib/proxyBookCover";

export interface ClubLeader {
  name: string;
  title: string;
  bio: string;
  image_url: string;
}

export interface RoomItem {
  id: string;
  title: string;
  book_title: string;
  book_author: string;
  book_description: string;
  book_image_url: string;
  aladin_url: string;
  target_audience: string;
  status: "recruiting" | "in_progress" | "completed";
  program_duration: string;
  recruitment_period: string;
  schedule_text: string;
  location: string;
  max_capacity: number;
  price_text: string;
  leader: ClubLeader;
  weeks: Record<string, string>;
}

// Helper to deduplicate rooms by clean book title / title
function deduplicateRooms(items: RoomItem[]): RoomItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = (item.book_title || item.title || "").toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default function ClubsSection() {
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "recruiting" | "in_progress" | "completed">("all");
  const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(null);

  // Payment Demo Popup State (Only for recruiting rooms)
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayMethod, setSelectedPayMethod] = useState<"card" | "kakao" | "toss" | "vbank">("card");
  const [applicantName, setApplicantName] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessingPay, setIsProcessingPay] = useState(false);

  // Modal Room Reviews State
  const [roomReviews, setRoomReviews] = useState<any[]>([]);
  const [newRating, setNewRating] = useState<number>(5);
  const [newAuthorName, setNewAuthorName] = useState("");
  const [newAuthorRole, setNewAuthorRole] = useState("");
  const [newReviewContent, setNewReviewContent] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const reviewFormRef = useRef<HTMLDivElement>(null);

  // Carousel Row Refs for horizontal scrolling
  const recruitingRowRef = useRef<HTMLDivElement>(null);
  const inProgressRowRef = useRef<HTMLDivElement>(null);
  const completedRowRef = useRef<HTMLDivElement>(null);

  // Fetch rooms strictly from Supabase DB with Realtime sync
  useEffect(() => {
    async function fetchDbRooms() {
      try {
        const { data, error } = await supabase
          .from("rooms")
          .select("*")
          .order("created_at", { ascending: false });

        if (data && !error) {
          const parsed: RoomItem[] = data.map((r) => {
            const cur = r.curriculum_json || {};
            const leader = cur.leader || {
              name: "김민정",
              title: "스타트업 대표 / 前 컨설턴트",
              bio: "10년간 다양한 스타트업을 경험하며 깨달은 것, 작은 습관의 힘입니다. 아토믹 해빗, 그릿, 심플 등 자기계발 분야의 책을 수십 권 읽었고, 이제는 제 경험을 나누며 함께 성장하고 싶습니다.",
              image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300"
            };

            const bookT = r.book_title || r.title || "도서 제목";
            const cleanTitle = (bookT || "").replace(/<[^>]*>/g, "").replace(/\[[^\]]*\]/g, "").replace(/\([^)]*\)/g, "").split("-")[0].split(":")[0].trim();
            const aladinUrl = r.aladin_url || cur.aladin_url || `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&SearchWord=${encodeURIComponent(cleanTitle || bookT)}`;

            return {
              id: r.id,
              title: r.title || bookT || "독서 모임",
              book_title: bookT,
              book_author: r.book_author || "저자 미상",
              book_description: r.book_description || "도서 요약 정보가 없습니다.",
              book_image_url: r.book_image_url || "https://image.aladin.co.kr/product/37944/74/cover200/k672033454_3.jpg",
              aladin_url: aladinUrl,
              target_audience: r.target_audience || "독서를 통한 성장을 열망하는 누구나",
              status: (r.status as "recruiting" | "in_progress" | "completed") || "recruiting",
              program_duration: cur.program_duration || "4주 프로그램",
              recruitment_period: cur.recruitment_period || "모집 중",
              schedule_text: cur.schedule_text || r.schedule_text || "매주 화요일 19:30",
              location: cur.location || r.location || "서울 강남구 테헤란로",
              max_capacity: cur.max_capacity || r.max_capacity || 12,
              price_text: cur.price_text || r.price_text || "89,000원",
              leader,
              weeks: cur.weeks || cur
            };
          });

          setRooms(parsed);
        }
      } catch (err) {
        console.error("Failed to fetch rooms from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDbRooms();

    const channel = supabase
      .channel("rooms-realtime-channel-v5")
      .on("postgres_changes", { event: "*", schema: "public", table: "rooms" }, () => {
        fetchDbRooms();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Fetch Reviews when Selected Room Changes
  useEffect(() => {
    if (!selectedRoom) return;

    async function fetchReviewsForRoom() {
      try {
        const { data } = await supabase
          .from("reviews")
          .select("*")
          .or(`room_id.eq.${selectedRoom.id},book_title.eq.${selectedRoom.book_title}`)
          .order("created_at", { ascending: false });

        if (data) {
          setRoomReviews(data);
        }
      } catch (err) {
        console.error("Failed to fetch reviews for room:", err);
      }
    }

    fetchReviewsForRoom();
  }, [selectedRoom]);

  const uniqueRooms = deduplicateRooms(rooms);
  const recruitingRooms = uniqueRooms.filter((r) => r.status === "recruiting");
  const inProgressRooms = uniqueRooms.filter((r) => r.status === "in_progress");
  const completedRooms = uniqueRooms.filter((r) => r.status === "completed");

  const scrollRow = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (!ref.current) return;
    const amount = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth"
    });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) return;
    setIsProcessingPay(true);
    setTimeout(() => {
      setIsProcessingPay(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setShowPaymentModal(false);
        setSelectedRoom(null);
        setApplicantName("");
        setApplicantPhone("");
      }, 2500);
    }, 800);
  };

  // Submit Review Handler
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom || !newReviewContent.trim()) return;

    setIsSubmittingReview(true);
    const newRevObj = {
      room_id: selectedRoom.id,
      book_title: selectedRoom.book_title,
      book_author: selectedRoom.book_author,
      book_image_url: selectedRoom.book_image_url,
      author_name: newAuthorName || "익명 독자",
      author_role: newAuthorRole || "모임 멤버",
      rating: newRating,
      content: newReviewContent,
      like_count: 0
    };

    try {
      await supabase.from("reviews").insert([newRevObj]);
      setRoomReviews((prev) => [newRevObj, ...prev]);
      setReviewSubmitSuccess(true);
      setNewReviewContent("");
      setNewAuthorName("");
      setNewAuthorRole("");

      setTimeout(() => {
        setReviewSubmitSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to insert review:", err);
      setRoomReviews((prev) => [newRevObj, ...prev]);
      setReviewSubmitSuccess(true);
      setNewReviewContent("");
      setTimeout(() => setReviewSubmitSuccess(false), 3000);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const renderStatusBadge = (status: RoomItem["status"]) => {
    if (status === "recruiting") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#8C2318] text-[#f4f3ee] font-mono text-[10px] font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          RECRUITING / 모집중
        </span>
      );
    }
    if (status === "in_progress") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] text-[#f4f3ee] font-mono text-[10px] font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
          IN PROGRESS / 진행중
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a]/60 text-[#f4f3ee] font-mono text-[10px] font-bold uppercase tracking-wider">
        COMPLETED / 종료
      </span>
    );
  };

  // Hover state for Ace Hotel contextual dimming
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null);

  // Render individual room card (ACE HOTEL OFFERS CONCEPT UI)
  const renderRoomCard = (room: RoomItem, index?: number) => {
    const isHovered = hoveredRoomId === room.id;
    const isDimmed = hoveredRoomId !== null && !isHovered;
    const isRecruiting = room.status === "recruiting";

    return (
      <div
        key={room.id}
        onMouseEnter={() => setHoveredRoomId(room.id)}
        onMouseLeave={() => setHoveredRoomId(null)}
        className={`
          group relative bg-[#e8e6df]/40 hover:bg-white text-[#1a1a1a] transition-all duration-500
          flex flex-col justify-between overflow-hidden cursor-pointer
          ${isHovered ? "-translate-y-1 z-10 shadow-lg" : "translate-y-0 shadow-xs"}
          ${isDimmed ? "opacity-75" : "opacity-100"}
        `}
      >
        <div>
          {/* TOP: Book Cover Image Banner (Ace Hotel OFFERS Landscape Banner Aspect 16/10) */}
          <div
            onClick={() => {
              setSelectedRoom(room);
              setShowPaymentModal(false);
            }}
            className="relative w-full aspect-[16/10] bg-gray-200 overflow-hidden cursor-pointer"
          >
            <img
              src={room.book_image_url ? proxyBookCover(room.book_image_url) : "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400"}
              alt={room.book_title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out-ace group-hover:scale-105 filter brightness-95"
            />
            {/* Top Overlay Badges */}
            <div className="absolute top-3 left-3">
              {renderStatusBadge(room.status)}
            </div>
            <div className="absolute top-3 right-3 bg-black/80 text-[#f4f3ee] text-[9px] font-mono font-bold px-2 py-0.5 tracking-wider uppercase">
              ROOM {index !== undefined ? String(index + 1).padStart(3, "0") : "001"} &bull; {room.max_capacity}명
            </div>
          </div>

          {/* MIDDLE: Text Details (Title, Description, Meta) */}
          <div className="p-5 font-sans">
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#8C2318] uppercase block mb-1">
              {room.location} &bull; {room.program_duration}
            </span>

            {/* Club Title (Ace Hotel Bold Serif Condensed Header) */}
            <h3
              onClick={() => {
                setSelectedRoom(room);
                setShowPaymentModal(false);
              }}
              className="font-serif font-bold text-lg md:text-xl uppercase leading-snug tracking-tight text-[#1a1a1a] group-hover:text-[#8C2318] transition-colors duration-300 line-clamp-1 mb-1"
            >
              {room.title}
            </h3>

            <p className="text-xs font-serif font-semibold text-[#8C2318] truncate mb-2">
              📖 {room.book_title} <span className="text-[#1a1a1a]/60 font-sans text-[11px]">({room.book_author})</span>
            </p>

            {/* Description Excerpt */}
            <p className="text-xs text-[#1a1a1a]/75 leading-relaxed line-clamp-2 mb-4 font-sans">
              {room.book_description}
            </p>

            {/* Info Badges (Schedule & Price) */}
            <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-[#1a1a1a]/10 text-[#1a1a1a]/70">
              <span>📅 {room.schedule_text}</span>
              <span className="font-bold text-[#8C2318] text-xs font-serif">{room.price_text}</span>
            </div>
          </div>
        </div>

        {/* BOTTOM: ACE HOTEL OFFERS BUTTONS (BOOK NOW / VIEW OFFER) */}
        <div className="p-5 pt-0">
          {isRecruiting ? (
            /* Recruiting: 2 Buttons (BOOK NOW + VIEW OFFER) */
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRoom(room);
                  setShowPaymentModal(true);
                }}
                className="bg-[#1a1a1a] hover:bg-[#8C2318] text-[#f4f3ee] text-xs font-mono font-bold tracking-widest uppercase py-2.5 px-3 flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer hover:-translate-y-0.5"
              >
                BOOK NOW
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRoom(room);
                  setShowPaymentModal(false);
                }}
                className="border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f4f3ee] text-[#1a1a1a] text-xs font-mono font-bold tracking-widest uppercase py-2.5 px-3 flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                VIEW OFFER
              </button>
            </div>
          ) : (
            /* In-Progress or Completed: 1 Button ONLY (VIEW OFFER) */
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedRoom(room);
                setShowPaymentModal(false);
              }}
              className="w-full border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f4f3ee] text-[#1a1a1a] text-xs font-mono font-bold tracking-widest uppercase py-2.5 px-3 flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              VIEW OFFER
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      id="clubs"
      ref={sectionRef}
      className={`
        w-full px-6 md:px-12 lg:px-20 pt-6 pb-24 md:pt-8 md:pb-32 border-t border-[#1a1a1a]/10
        transition-colors duration-700 ease-out-ace
        ${hoveredRoomId !== null ? "bg-[#e8e6df]" : "bg-[#f4f3ee]"}
      `}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-[#8C2318] text-xs font-bold tracking-widest uppercase mb-3 font-sans">
              FEATURED EDITORIAL CLUBS
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl text-[#1a1a1a] leading-tight tracking-tight">
              이번 달 독서모임 현황
            </h2>
            <p className="text-sm text-[#1a1a1a]/70 mt-3 font-sans max-w-xl">
              클럽장이 직접 이끄는 3개 트랙(모집중 · 진행중 · 완료)의 프리미엄 독서클럽 라인업입니다.
            </p>
          </div>

          {/* Status Filter Tabs (Ace Hotel Borderless Tag Style) */}
          <div className="flex flex-wrap items-center gap-2 font-mono self-start md:self-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#8C2318] text-[#f4f3ee] shadow-md"
                  : "bg-[#e8e6df] text-[#1a1a1a] hover:bg-white hover:-translate-y-0.5 hover:shadow-sm"
              }`}
            >
              전체 ({rooms.length})
            </button>
            <button
              onClick={() => setActiveTab("recruiting")}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                activeTab === "recruiting"
                  ? "bg-[#8C2318] text-[#f4f3ee] shadow-md"
                  : "bg-[#e8e6df] text-[#1a1a1a] hover:bg-white hover:-translate-y-0.5 hover:shadow-sm"
              }`}
            >
              모집중 ({recruitingRooms.length})
            </button>
            <button
              onClick={() => setActiveTab("in_progress")}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                activeTab === "in_progress"
                  ? "bg-[#1a1a1a] text-[#f4f3ee] shadow-md"
                  : "bg-[#e8e6df] text-[#1a1a1a] hover:bg-white hover:-translate-y-0.5 hover:shadow-sm"
              }`}
            >
              진행중 ({inProgressRooms.length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                activeTab === "completed"
                  ? "bg-[#1a1a1a] text-[#f4f3ee] shadow-md"
                  : "bg-[#e8e6df] text-[#1a1a1a] hover:bg-white hover:-translate-y-0.5 hover:shadow-sm"
              }`}
            >
              종료 ({completedRooms.length})
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="py-20 text-center text-[#1a1a1a]/50 font-serif text-lg">
            독서모임 리스트를 불러오는 중...
          </div>
        )}

        {/* ROW 1: 🔥 모집중인 독서모임 */}
        {!loading && (activeTab === "all" || activeTab === "recruiting") && recruitingRooms.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#1a1a1a]/15 font-sans">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🔥</span>
                <h3 className="font-serif font-bold text-2xl text-[#1a1a1a]">
                  모집중인 독서모임
                </h3>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-[#8C2318] text-[#f4f3ee]">
                  {recruitingRooms.length} CLUBS RECRUITING
                </span>
              </div>
            </div>

            {/* Ace Hotel Floating Circular Arrow Navigation Carousel Wrapper */}
            <div className="relative group/carousel">
              {recruitingRooms.length > 1 && (
                <>
                  <button
                    onClick={() => scrollRow(recruitingRowRef, "left")}
                    className="absolute -left-3 sm:-left-6 top-[38%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-[#1a1a1a] shadow-xl border border-black/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                    aria-label="Previous"
                  >
                    <i className="ri-arrow-left-line text-xl font-bold" />
                  </button>
                  <button
                    onClick={() => scrollRow(recruitingRowRef, "right")}
                    className="absolute -right-3 sm:-right-6 top-[38%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-[#1a1a1a] shadow-xl border border-black/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                    aria-label="Next"
                  >
                    <i className="ri-arrow-right-line text-xl font-bold" />
                  </button>
                </>
              )}

              <div
                ref={recruitingRowRef}
                className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {recruitingRooms.map((room, idx) => (
                  <div key={room.id} className="w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0">
                    {renderRoomCard(room, idx)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ROW 2: ⚡ 진행중인 독서모임 */}
        {!loading && (activeTab === "all" || activeTab === "in_progress") && inProgressRooms.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#1a1a1a]/15 font-sans">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">⚡</span>
                <h3 className="font-serif font-bold text-2xl text-[#1a1a1a]">
                  진행중인 독서모임
                </h3>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-[#1a1a1a] text-[#f4f3ee]">
                  {inProgressRooms.length} CLUBS ACTIVE
                </span>
              </div>
            </div>

            {/* Ace Hotel Floating Circular Arrow Navigation Carousel Wrapper */}
            <div className="relative group/carousel">
              {inProgressRooms.length > 1 && (
                <>
                  <button
                    onClick={() => scrollRow(inProgressRowRef, "left")}
                    className="absolute -left-3 sm:-left-6 top-[38%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-[#1a1a1a] shadow-xl border border-black/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                    aria-label="Previous"
                  >
                    <i className="ri-arrow-left-line text-xl font-bold" />
                  </button>
                  <button
                    onClick={() => scrollRow(inProgressRowRef, "right")}
                    className="absolute -right-3 sm:-right-6 top-[38%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-[#1a1a1a] shadow-xl border border-black/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                    aria-label="Next"
                  >
                    <i className="ri-arrow-right-line text-xl font-bold" />
                  </button>
                </>
              )}

              <div
                ref={inProgressRowRef}
                className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {inProgressRooms.map((room, idx) => (
                  <div key={room.id} className="w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0">
                    {renderRoomCard(room, idx)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ROW 3: ✅ 종료된 독서모임 */}
        {!loading && (activeTab === "all" || activeTab === "completed") && completedRooms.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#1a1a1a]/15 font-sans">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">✅</span>
                <h3 className="font-serif font-bold text-2xl text-[#1a1a1a]">
                  종료된 독서모임
                </h3>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-[#1a1a1a]/60 text-[#f4f3ee]">
                  {completedRooms.length} CLUBS ARCHIVED
                </span>
              </div>
            </div>

            {/* Ace Hotel Floating Circular Arrow Navigation Carousel Wrapper */}
            <div className="relative group/carousel">
              {completedRooms.length > 1 && (
                <>
                  <button
                    onClick={() => scrollRow(completedRowRef, "left")}
                    className="absolute -left-3 sm:-left-6 top-[38%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-[#1a1a1a] shadow-xl border border-black/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                    aria-label="Previous"
                  >
                    <i className="ri-arrow-left-line text-xl font-bold" />
                  </button>
                  <button
                    onClick={() => scrollRow(completedRowRef, "right")}
                    className="absolute -right-3 sm:-right-6 top-[38%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-[#1a1a1a] shadow-xl border border-black/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                    aria-label="Next"
                  >
                    <i className="ri-arrow-right-line text-xl font-bold" />
                  </button>
                </>
              )}

              <div
                ref={completedRowRef}
                className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {completedRooms.map((room, idx) => (
                  <div key={room.id} className="w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0">
                    {renderRoomCard(room, idx)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================================== */}
      {/* 1. VIEW OFFER DETAIL MODAL (EDITORIAL DETAILS WITHOUT PAYMENT FORM) */}
      {/* ============================================================================== */}
      {selectedRoom && !showPaymentModal && (
        <div
          onClick={() => setSelectedRoom(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans cursor-pointer"
        >
          <div
            className="bg-[#f4f3ee] text-[#1a1a1a] w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-[#1a1a1a]/20 shadow-2xl relative cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Stamp Bar */}
            <div className="sticky top-0 bg-[#1a1a1a] text-[#f4f3ee] px-6 py-4 flex items-center justify-between z-20 font-mono text-xs">
              <div className="flex items-center gap-3">
                {renderStatusBadge(selectedRoom.status)}
                <span className="font-bold tracking-widest uppercase text-[#f4f3ee]/80">
                  {selectedRoom.program_duration} &bull; {selectedRoom.schedule_text}
                </span>
              </div>
              <button
                onClick={() => setSelectedRoom(null)}
                className="w-8 h-8 bg-[#8C2318] text-white flex items-center justify-center font-bold hover:bg-[#a62b1e] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 md:p-10 space-y-10">
              {/* Title & Introduction */}
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-[#8C2318] uppercase block mb-1">
                  EDITORIAL OFFER DETAILS
                </span>
                <h2 className="font-serif font-bold text-2xl md:text-4xl text-[#1a1a1a] mb-3 leading-tight uppercase">
                  {selectedRoom.title}
                </h2>
                <p className="text-sm text-[#1a1a1a]/80 leading-relaxed font-sans max-w-3xl">
                  {selectedRoom.book_description} 클럽장과 함께 커리큘럼을 실천하고 사유를 넓혀가는 프리미엄 독서 모임입니다.
                </p>
              </div>

              {/* Book Spotlight Box (With Aladin Link) */}
              <div className="bg-[#e8e6df] p-6 md:p-8 space-y-5 border border-[#1a1a1a]/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#1a1a1a]/15">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#8C2318] uppercase">
                    FEATURED CURATED BOOK / 이번 달의 책
                  </span>
                  <a
                    href={selectedRoom.aladin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1a1a1a] hover:bg-[#8C2318] text-[#f4f3ee] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
                  >
                    <span>VIEW ON ALADIN / 알라딘 바로가기</span>
                    <i className="ri-external-link-line" />
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <img
                    src={proxyBookCover(selectedRoom.book_image_url)}
                    alt={selectedRoom.book_title}
                    referrerPolicy="no-referrer"
                    className="w-32 md:w-36 h-auto object-contain bg-white p-2 border border-[#1a1a1a]/15 shadow-sm shrink-0"
                  />
                  <div className="space-y-3 flex-1">
                    <h3 className="font-serif font-bold text-xl md:text-2xl text-[#1a1a1a]">
                      {selectedRoom.book_title}
                    </h3>
                    <p className="text-xs font-bold text-[#8C2318] font-sans">
                      {selectedRoom.book_author}
                    </p>
                    <p className="text-xs text-[#1a1a1a]/80 leading-relaxed font-sans">
                      {selectedRoom.book_description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Club Leader Section */}
              <div className="bg-[#e8e6df]/70 p-6 md:p-8 space-y-4 border border-[#1a1a1a]/10">
                <span className="text-xs font-mono font-bold tracking-widest text-[#8C2318] uppercase block">
                  CLUB LEADER / 클럽장 소개
                </span>
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <img
                    src={selectedRoom.leader.image_url}
                    alt={selectedRoom.leader.name}
                    className="w-20 h-20 object-cover border border-[#1a1a1a] shrink-0"
                  />
                  <div className="space-y-2">
                    <h4 className="font-serif font-bold text-xl text-[#1a1a1a]">
                      클럽장 {selectedRoom.leader.name}
                    </h4>
                    <p className="text-xs font-bold text-[#8C2318] font-sans">
                      {selectedRoom.leader.title}
                    </p>
                    <p className="text-xs text-[#1a1a1a]/80 leading-relaxed font-sans">
                      {selectedRoom.leader.bio}
                    </p>
                  </div>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                <div className="bg-[#e8e6df]/50 p-4 border border-[#1a1a1a]/10">
                  <span className="text-[#1a1a1a]/60 block mb-1 text-[10px] uppercase">SCHEDULE</span>
                  <strong className="text-[#1a1a1a] font-bold block">{selectedRoom.schedule_text}</strong>
                </div>
                <div className="bg-[#e8e6df]/50 p-4 border border-[#1a1a1a]/10">
                  <span className="text-[#1a1a1a]/60 block mb-1 text-[10px] uppercase">LOCATION</span>
                  <strong className="text-[#1a1a1a] font-bold block truncate">{selectedRoom.location}</strong>
                </div>
                <div className="bg-[#e8e6df]/50 p-4 border border-[#1a1a1a]/10">
                  <span className="text-[#1a1a1a]/60 block mb-1 text-[10px] uppercase">DURATION</span>
                  <strong className="text-[#1a1a1a] font-bold block">{selectedRoom.program_duration}</strong>
                </div>
                <div className="bg-[#e8e6df]/50 p-4 border border-[#1a1a1a]/10">
                  <span className="text-[#1a1a1a]/60 block mb-1 text-[10px] uppercase">PRICE</span>
                  <strong className="text-[#8C2318] font-bold block">{selectedRoom.price_text}</strong>
                </div>
              </div>

              {/* Weekly Curriculum */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl text-[#1a1a1a] uppercase">
                  WEEKLY CURRICULUM / 주차별 커리큘럼
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(selectedRoom.weeks).map(([weekKey, weekContent]) => (
                    <div key={weekKey} className="p-4 bg-white border border-[#1a1a1a]/15 space-y-2">
                      <span className="text-xs font-mono font-bold text-[#8C2318] block uppercase">
                        {weekKey}
                      </span>
                      <div className="text-xs text-[#1a1a1a]/80 leading-relaxed font-sans">
                        {typeof weekContent === "string" ? (
                          <p>{weekContent}</p>
                        ) : typeof weekContent === "object" && weekContent !== null ? (
                          Object.entries(weekContent as Record<string, any>).map(([k, v]) => (
                            <div key={k} className="flex flex-col sm:flex-row sm:gap-2 text-xs">
                              <span className="font-bold text-[#8C2318] shrink-0">{k}:</span>
                              <span>{String(v)}</span>
                            </div>
                          ))
                        ) : (
                          <p>{String(weekContent || "")}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Member Reviews & Form */}
              <div ref={reviewFormRef} className="space-y-6 pt-6 border-t border-[#1a1a1a]/15">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-xl text-[#1a1a1a]">
                    MEMBER REVIEWS / 생생 모임 후기 ({roomReviews.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {roomReviews.map((rev, rIdx) => (
                    <div key={rev.id || rIdx} className="p-4 bg-[#e8e6df]/40 border border-[#1a1a1a]/10 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-[#1a1a1a]">
                          {rev.author_name || "모임 멤버"} ({rev.author_role || "회원"})
                        </span>
                        <span className="text-[#8C2318]">{"★".repeat(rev.rating || 5)}</span>
                      </div>
                      <p className="text-xs text-[#1a1a1a]/80 leading-relaxed font-sans whitespace-pre-line">
                        {rev.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Review Form */}
                <form onSubmit={handleReviewSubmit} className="bg-[#e8e6df] p-6 space-y-4 border border-[#1a1a1a]/15">
                  <h4 className="font-serif font-bold text-base text-[#1a1a1a]">
                    WRITE A REVIEW / 모임 후기 작성하기
                  </h4>
                  {reviewSubmitSuccess && (
                    <div className="p-3 bg-[#8C2318] text-[#f4f3ee] text-xs font-bold font-mono">
                      ✓ 후기가 성공적으로 등록되었습니다.
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                    <input
                      type="text"
                      placeholder="작성자 이름 (예: 김독자)"
                      value={newAuthorName}
                      onChange={(e) => setNewAuthorName(e.target.value)}
                      required
                      className="px-3.5 py-2.5 bg-white border border-[#1a1a1a]/20 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#8C2318]"
                    />
                    <input
                      type="text"
                      placeholder="소속/직함 (예: 1기 멤버)"
                      value={newAuthorRole}
                      onChange={(e) => setNewAuthorRole(e.target.value)}
                      className="px-3.5 py-2.5 bg-white border border-[#1a1a1a]/20 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#8C2318]"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="모임 참여 경험 및 솔직한 후기를 남겨주세요."
                    value={newReviewContent}
                    onChange={(e) => setNewReviewContent(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-[#1a1a1a]/20 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#8C2318]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#8C2318] text-[#f4f3ee] font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    {isSubmittingReview ? "등록 중..." : "SUBMIT REVIEW / 후기 등록"}
                  </button>
                </form>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-6 border-t border-[#1a1a1a]/20 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#8C2318]">
                  PRICE: {selectedRoom.price_text}
                </span>

                {selectedRoom.status === "recruiting" ? (
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="px-8 py-3.5 bg-[#8C2318] hover:bg-[#a62b1e] text-[#f4f3ee] font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer"
                  >
                    BOOK NOW / 참여 신청하기 ↗
                  </button>
                ) : (
                  <span className="font-mono text-xs font-bold text-[#1a1a1a]/60 uppercase">
                    {selectedRoom.status === "in_progress" ? "CURRENTLY ACTIVE / 진행 중인 모임" : "ARCHIVED OFFER / 종료된 모임"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================================== */}
      {/* 2. BOOK NOW PAYMENT MODAL (STRICTLY PAYMENT ONLY - ACE HOTEL UI) */}
      {/* ============================================================================== */}
      {showPaymentModal && selectedRoom && selectedRoom.status === "recruiting" && (
        <div
          onClick={() => {
            setShowPaymentModal(false);
            setSelectedRoom(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans cursor-pointer"
        >
          <div
            className="bg-[#f4f3ee] text-[#1a1a1a] w-full max-w-lg border border-[#1a1a1a]/20 shadow-2xl p-6 md:p-8 space-y-6 relative cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1a1a1a]/20">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#8C2318] uppercase block mb-1">
                  OFFER BOOKING & PAYMENT
                </span>
                <h3 className="font-serif font-bold text-2xl uppercase text-[#1a1a1a]">
                  BOOK NOW / 모임 참여 결제
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedRoom(null);
                }}
                className="w-8 h-8 bg-[#1a1a1a] text-[#f4f3ee] flex items-center justify-center font-bold hover:bg-[#8C2318] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {paymentSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-[#8C2318] text-[#f4f3ee] flex items-center justify-center text-3xl mx-auto shadow-md">
                  ✓
                </div>
                <h4 className="font-serif font-bold text-2xl text-[#1a1a1a]">PAYMENT SUCCESSFUL!</h4>
                <p className="text-xs text-[#1a1a1a]/80 leading-relaxed font-sans">
                  [{selectedRoom.title}] 독서 모임 참여 결제가 정상적으로 완료되었습니다.<br />
                  안내 카카오톡이 입력하신 번호({applicantPhone})로 발송됩니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-5">
                {/* Summary Box */}
                <div className="bg-[#e8e6df] p-4 space-y-2 border border-[#1a1a1a]/15">
                  <p className="font-serif font-bold text-base text-[#1a1a1a]">{selectedRoom.title}</p>
                  <p className="text-xs font-sans text-[#8C2318] font-bold">📖 {selectedRoom.book_title}</p>
                  <div className="flex items-center justify-between text-xs font-mono text-[#1a1a1a]/70 pt-2 border-t border-[#1a1a1a]/10">
                    <span>📅 {selectedRoom.schedule_text}</span>
                    <span className="font-bold text-base text-[#8C2318] font-serif">{selectedRoom.price_text}</span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-[#1a1a1a] uppercase block">
                    PAYMENT METHOD / 결제 수단 선택
                  </label>
                  <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedPayMethod("card")}
                      className={`p-3 font-bold border transition-all cursor-pointer ${
                        selectedPayMethod === "card"
                          ? "bg-[#1a1a1a] text-[#f4f3ee] border-[#1a1a1a] shadow-sm"
                          : "bg-white text-[#1a1a1a] border-[#1a1a1a]/20 hover:bg-[#e8e6df]"
                      }`}
                    >
                      💳 신용/체크카드
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPayMethod("kakao")}
                      className={`p-3 font-bold border transition-all cursor-pointer ${
                        selectedPayMethod === "kakao"
                          ? "bg-[#1a1a1a] text-[#f4f3ee] border-[#1a1a1a] shadow-sm"
                          : "bg-white text-[#1a1a1a] border-[#1a1a1a]/20 hover:bg-[#e8e6df]"
                      }`}
                    >
                      🟡 카카오페이
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPayMethod("toss")}
                      className={`p-3 font-bold border transition-all cursor-pointer ${
                        selectedPayMethod === "toss"
                          ? "bg-[#1a1a1a] text-[#f4f3ee] border-[#1a1a1a] shadow-sm"
                          : "bg-white text-[#1a1a1a] border-[#1a1a1a]/20 hover:bg-[#e8e6df]"
                      }`}
                    >
                      🔵 토스페이
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPayMethod("vbank")}
                      className={`p-3 font-bold border transition-all cursor-pointer ${
                        selectedPayMethod === "vbank"
                          ? "bg-[#1a1a1a] text-[#f4f3ee] border-[#1a1a1a] shadow-sm"
                          : "bg-white text-[#1a1a1a] border-[#1a1a1a]/20 hover:bg-[#e8e6df]"
                      }`}
                    >
                      🏦 무통장입금
                    </button>
                  </div>
                </div>

                {/* Applicant Info Inputs */}
                <div className="space-y-2 font-sans">
                  <label className="text-xs font-mono font-bold text-[#1a1a1a] uppercase block">
                    APPLICANT INFO / 신청자 정보
                  </label>
                  <input
                    type="text"
                    placeholder="신청자 성함"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-[#1a1a1a]/20 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#8C2318]"
                  />
                  <input
                    type="tel"
                    placeholder="휴대폰 번호 (010-0000-0000)"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-[#1a1a1a]/20 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#8C2318]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessingPay}
                  className="w-full py-4 bg-[#8C2318] hover:bg-[#a62b1e] text-[#f4f3ee] font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isProcessingPay ? "PROCESSING / 결제 처리 중..." : `PAY NOW (${selectedRoom.price_text}) / 결제 완료하기`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}