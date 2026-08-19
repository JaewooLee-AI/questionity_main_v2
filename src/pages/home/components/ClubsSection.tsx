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
      .channel("rooms-realtime-channel-v4")
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

        if (data && data.length > 0) {
          setRoomReviews(data);
        } else {
          // Default Sample Long Detailed Reviews for rich UI
          setRoomReviews([
            {
              id: "rev-sample-1",
              author_name: "김민재",
              author_role: "5년차 IT 서비스 기획자",
              rating: 5,
              content: `혼자 읽을 때는 그저 인상 깊은 구절에 밑줄만 긋고 넘어갔던 『${selectedRoom.book_title}』의 핵심 통찰을, 독서모임에 참여하면서 내 커리어와 일상에 어떻게 직접 적용할지 깊이 있게 고민하게 되었습니다.\n\n특히 2주차 토론에서 클럽장님과 동료 멤버들이 각자의 직무 현장에서 겪었던 실제 시행착오 사례를 들으며 '아, 이렇게 관점을 바꿀 수도 있구나' 하는 커다란 깨달음을 얻었습니다.\n\n매주 주어지는 실천 미션 덕분에 책 속 지식이 머리로만 남지 않고 삶의 실질적인 행동 변화로 이어졌어요. 직장 생활의 타성에 젖어있던 나에게 새로운 영감과 활력을 불어넣어 준 4주였습니다!`,
              created_at: "2026.08.10"
            },
            {
              id: "rev-sample-2",
              author_name: "박지영",
              author_role: "브랜드 마케팅 팀장 / 독서 3년차",
              rating: 5,
              content: `독서모임의 가장 큰 매력은 서로 다른 배경을 가진 분들의 다양한 시선을 통해 책의 스펙트럼을 넓히는 것이라는 점을 다시금 실감했습니다. 『${selectedRoom.book_title}』은 저에게 쉽지 않은 책이었지만, 소규모 그룹 토론과 클럽장님의 섬세한 피드백 덕분에 난해했던 개념들이 명쾌하게 다가왔습니다.\n\n격의 없이 솔직한 고민을 나누는 따뜻한 분위기 속에서 매주 일요일 모임 시간이 진심으로 기다려졌습니다. 제 생각의 지평을 넓혀준 퀘스처니티 독서클럽을 주변 지인들에게도 적극 추천하고 싶습니다.`,
              created_at: "2026.08.12"
            }
          ]);
        }
      } catch (e) {
        console.error("Failed to fetch room reviews:", e);
      }
    }

    fetchReviewsForRoom();
  }, [selectedRoom]);

  // Smooth Horizontal Scroll Helper
  const scrollRow = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (!ref.current) return;
    const scrollAmount = ref.current.clientWidth;
    ref.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth"
    });
  };

  // Group and Deduplicate rooms strictly from DB
  const recruitingRooms = deduplicateRooms(rooms.filter((r) => r.status === "recruiting"));
  const inProgressRooms = deduplicateRooms(rooms.filter((r) => r.status === "in_progress"));
  const completedRooms = deduplicateRooms(rooms.filter((r) => r.status === "completed"));

  // Payment Submission Handler (Mock Process)
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
      // Fallback local update
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
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 border border-amber-500/30 text-xs font-bold rounded-none">
          <span className="w-1.5 h-1.5 bg-amber-500 animate-pulse" />
          🔥 모집중
        </span>
      );
    }
    if (status === "in_progress") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 text-xs font-bold rounded-none">
          <span className="w-1.5 h-1.5 bg-emerald-500 animate-ping" />
          ⚡ 진행중
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-500/10 text-gray-500 border border-gray-500/30 text-xs font-semibold rounded-none">
        ✅ 종료
      </span>
    );
  };

  // Hover state for Ace Hotel contextual dimming & 3D box effect
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null);

  // Render individual room card with Ace Hotel 3D Box Hover effect & sibling dimming
  const renderRoomCard = (room: RoomItem, _index?: number) => {
    const isHovered = hoveredRoomId === room.id;
    const isDimmed = hoveredRoomId !== null && !isHovered;
    const aladinUrl = room.aladin_url || `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&SearchWord=${encodeURIComponent(room.book_title || room.title)}`;

    return (
      <div
        key={room.id}
        onClick={() => {
          setSelectedRoom(room);
        }}
        onMouseEnter={() => setHoveredRoomId(room.id)}
        onMouseLeave={() => setHoveredRoomId(null)}
        className={`
          group relative cursor-pointer bg-[#f4f3ee] border border-[#1a1a1a]/15 overflow-hidden flex flex-col justify-between
          transition-all duration-700 ease-out-ace
          ${isHovered ? "-translate-y-3 shadow-2xl border-[#1a1a1a] bg-white z-10 scale-[1.02]" : "translate-y-0 shadow-none"}
          ${isDimmed ? "opacity-60 grayscale-[30%]" : "opacity-100 grayscale-0"}
        `}
      >
        <div>
          {/* Card Image Banner */}
          <div className="relative w-full h-44 bg-[#e8e6df] overflow-hidden flex items-center justify-center p-3">
            <img
              src={room.book_image_url ? proxyBookCover(room.book_image_url) : "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400"}
              alt={room.book_title}
              referrerPolicy="no-referrer"
              className="h-36 w-auto object-contain transition-transform duration-700 ease-out-ace group-hover:scale-105"
            />
            <div className="absolute top-3 left-3">
              {renderStatusBadge(room.status)}
            </div>
            <div className="absolute bottom-3 right-3 bg-[#1a1a1a]/80 text-[#f4f3ee] text-[10px] font-bold px-2 py-1 tracking-widest uppercase font-mono">
              👥 {room.max_capacity}명 정원
            </div>
          </div>

          {/* Content */}
          <div className="p-5 font-sans">
            <span className="text-[10px] font-bold tracking-widest text-[#1a1a1a]/60 uppercase block mb-1">
              {room.location} — {room.program_duration}
            </span>
            <h3 className="font-serif font-bold text-lg md:text-xl text-[#1a1a1a] mb-2 line-clamp-1 group-hover:text-[#8C2318] transition-colors duration-300">
              {room.title}
            </h3>

            {/* Book Info */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <p className="text-xs font-semibold text-[#8C2318] truncate min-w-0 font-serif">
                📖 {room.book_title} <span className="text-[#1a1a1a]/60 font-sans">({room.book_author})</span>
              </p>
              <a
                href={aladinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 text-[10px] font-bold text-[#1a1a1a] uppercase tracking-wider hover:text-[#8C2318] border-b border-[#1a1a1a]/30 transition-colors"
              >
                알라딘 ↗
              </a>
            </div>

            <p className="text-xs text-[#1a1a1a]/70 leading-relaxed mb-4 line-clamp-2">
              {room.book_description}
            </p>

            {/* Leader Pill */}
            <div className="flex items-center gap-3 p-2.5 bg-[#e8e6df]/60 border border-[#1a1a1a]/10 mb-2">
              <img
                src={room.leader.image_url}
                alt={room.leader.name}
                className="w-8 h-8 object-cover border border-[#1a1a1a]/20 shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-serif font-bold text-[#1a1a1a] truncate">
                  클럽장 {room.leader.name}
                </span>
                <span className="text-[10px] text-[#1a1a1a]/60 truncate">
                  {room.leader.title}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="px-5 py-3 bg-[#e8e6df]/40 border-t border-[#1a1a1a]/10 flex items-center justify-between font-sans text-xs">
          <span className="text-[#1a1a1a]/70 font-medium">📅 {room.schedule_text}</span>
          <span className="font-serif font-bold text-[#8C2318]">{room.price_text}</span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="clubs"
      ref={sectionRef}
      className={`
        w-full px-6 md:px-12 lg:px-20 py-24 md:py-32 border-t border-[#1a1a1a]/10
        transition-colors duration-700 ease-out-ace
        ${hoveredRoomId !== null ? "bg-[#e8e6df]" : "bg-[#f4f3ee]"}
      `}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
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

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[#1a1a1a]/20 pb-2 self-start md:self-auto font-sans">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === "all"
                  ? "bg-[#1a1a1a] text-[#f4f3ee]"
                  : "text-[#1a1a1a]/60 hover:text-[#1a1a1a]"
              }`}
            >
              전체 ({rooms.length})
            </button>
            <button
              onClick={() => setActiveTab("recruiting")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === "recruiting"
                  ? "bg-[#8C2318] text-[#f4f3ee]"
                  : "text-[#1a1a1a]/60 hover:text-[#8C2318]"
              }`}
            >
              모집중 ({recruitingRooms.length})
            </button>
            <button
              onClick={() => setActiveTab("in_progress")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === "in_progress"
                  ? "bg-[#4A5340] text-[#f4f3ee]"
                  : "text-[#1a1a1a]/60 hover:text-[#4A5340]"
              }`}
            >
              진행중 ({inProgressRooms.length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === "completed"
                  ? "bg-[#1a1a1a]/80 text-[#f4f3ee]"
                  : "text-[#1a1a1a]/60 hover:text-[#1a1a1a]"
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
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🔥</span>
                <h3 className="font-heading font-bold text-xl text-gray-900">
                  모집중인 독서모임
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded-full">
                  {recruitingRooms.length}개 모임
                </span>
              </div>
              {recruitingRooms.length > 3 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollRow(recruitingRowRef, "left")}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={() => scrollRow(recruitingRowRef, "right")}
                    className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold hover:bg-primary-700 transition-colors shadow-sm text-sm"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </div>

            <div
              ref={recruitingRowRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {recruitingRooms.map((room, idx) => (
                <div key={room.id} className="w-full md:w-[calc(33.333%-16px)] shrink-0">
                  {renderRoomCard(room, idx)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROW 2: ⚡ 진행중인 독서모임 */}
        {!loading && (activeTab === "all" || activeTab === "in_progress") && inProgressRooms.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">⚡</span>
                <h3 className="font-heading font-bold text-xl text-gray-900">
                  진행중인 독서모임
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                  {inProgressRooms.length}개 모임
                </span>
              </div>
              {inProgressRooms.length > 3 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollRow(inProgressRowRef, "left")}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={() => scrollRow(inProgressRowRef, "right")}
                    className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold hover:bg-emerald-700 transition-colors shadow-sm text-sm"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </div>

            <div
              ref={inProgressRowRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {inProgressRooms.map((room, idx) => (
                <div key={room.id} className="w-full md:w-[calc(33.333%-16px)] shrink-0">
                  {renderRoomCard(room, idx)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROW 3: ✅ 종료된 독서모임 */}
        {!loading && (activeTab === "all" || activeTab === "completed") && completedRooms.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">✅</span>
                <h3 className="font-heading font-bold text-xl text-gray-900">
                  종료된 독서모임
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-gray-200 text-gray-700 rounded-full">
                  {completedRooms.length}개 모임
                </span>
              </div>
              {completedRooms.length > 3 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollRow(completedRowRef, "left")}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={() => scrollRow(completedRowRef, "right")}
                    className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold hover:bg-gray-800 transition-colors shadow-sm text-sm"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </div>

            <div
              ref={completedRowRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {completedRooms.map((room, idx) => (
                <div key={room.id} className="w-full md:w-[calc(33.333%-16px)] shrink-0">
                  {renderRoomCard(room, idx)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ============================================================================== */}
      {/* DETAILED ROOM CARD MODAL POPUP (STATUS BASED LAYOUT & ALADIN LINK) */}
      {/* ============================================================================== */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto font-sans">
          <div
            className="bg-white w-full max-w-5xl rounded-none shadow-2xl overflow-hidden my-6 border border-gray-200 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header Bar */}
            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-gray-100 px-6 py-4 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                {renderStatusBadge(selectedRoom.status)}
                <span className="text-xs font-semibold text-gray-500">
                  {selectedRoom.program_duration} / {selectedRoom.schedule_text}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedRoom(null);
                  setShowPaymentModal(false);
                }}
                className="w-8 h-8 rounded-none bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: 2-Column Layout */}
            <div className="p-6 md:p-8 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* LEFT COLUMN: Main Info Sections & Reviews */}
                <div className="lg:col-span-2 space-y-8">
                  {/* 1. 모임 소개 */}
                  <div className="space-y-3">
                    <h3 className="font-heading font-bold text-xl text-gray-950">모임 소개</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">
                      {selectedRoom.title}. {selectedRoom.book_description} 클럽장과 함께 실천 방법을 나누고 서로 독려하며 성장해요.
                    </p>
                  </div>

                  {/* 2. 이번 달의 책 (With Aladin Link) */}
                  <div style={{ backgroundColor: "#fdf8f5", border: "1px solid #f3e6de" }} className="p-6 rounded-none space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-bold text-lg text-gray-950">이번 달의 책</h4>
                      <a
                        href={selectedRoom.aladin_url || `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&SearchWord=${encodeURIComponent(selectedRoom.book_title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-none transition-colors shadow-xs"
                      >
                        📚 알라딘 도서 바로가기 ↗
                      </a>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      <img
                        src={proxyBookCover(selectedRoom.book_image_url)}
                        alt={selectedRoom.book_title}
                        referrerPolicy="no-referrer"
                        className="w-28 md:w-32 h-auto object-contain rounded-none shadow border border-gray-200/60 shrink-0 self-center sm:self-start"
                      />
                      <div className="space-y-2 flex-1">
                        <h4 className="font-heading font-bold text-lg text-gray-950">{selectedRoom.book_title}</h4>
                        <p className="text-xs text-gray-500 font-medium">{selectedRoom.book_author}</p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {selectedRoom.book_description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 3. 클럽장 소개 */}
                  <div style={{ backgroundColor: "#fdf8f5", border: "1px solid #f3e6de" }} className="p-6 rounded-2xl space-y-4">
                    <h4 className="font-bold text-lg text-gray-900">클럽장 소개</h4>
                    <div className="flex items-start gap-4">
                      <img
                        src={selectedRoom.leader.image_url}
                        alt={selectedRoom.leader.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-amber-200 shrink-0 shadow-sm"
                      />
                      <div className="space-y-1.5">
                        <h3 className="font-bold text-xl text-gray-900">{selectedRoom.leader.name}</h3>
                        <p className="text-xs font-semibold text-[#b91c1c]">
                          {selectedRoom.leader.title}
                        </p>
                        <p className="text-xs text-gray-600 leading-relaxed pt-1">
                          {selectedRoom.leader.bio}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 4. 모임 정보 */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-xl text-gray-900">모임 정보</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3.5 bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-red-50 text-[#b91c1c] flex items-center justify-center text-lg shrink-0">
                          📅
                        </div>
                        <div>
                          <span className="text-xs text-gray-400 block">모임 일정</span>
                          <strong className="text-sm text-gray-900">{selectedRoom.schedule_text}</strong>
                        </div>
                      </div>
                      <div className="flex items-center gap-3.5 bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-red-50 text-[#b91c1c] flex items-center justify-center text-lg shrink-0">
                          📍
                        </div>
                        <div>
                          <span className="text-xs text-gray-400 block">모임 장소</span>
                          <strong className="text-sm text-gray-900">{selectedRoom.location}</strong>
                        </div>
                      </div>
                      <div className="flex items-center gap-3.5 bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-red-50 text-[#b91c1c] flex items-center justify-center text-lg shrink-0">
                          🕒
                        </div>
                        <div>
                          <span className="text-xs text-gray-400 block">프로그램 기간</span>
                          <strong className="text-sm text-gray-900">{selectedRoom.program_duration}</strong>
                        </div>
                      </div>
                      <div className="flex items-center gap-3.5 bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-red-50 text-[#b91c1c] flex items-center justify-center text-lg shrink-0">
                          👥
                        </div>
                        <div>
                          <span className="text-xs text-gray-400 block">정원</span>
                          <strong className="text-sm text-gray-900">{selectedRoom.max_capacity}명</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5. 주차별 커리큘럼 */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-xl text-gray-900">주차별 커리큘럼</h3>
                    <div className="space-y-3">
                      {Object.entries(selectedRoom.weeks).map(([weekKey, weekContent]) => (
                        <div
                          key={weekKey}
                          className="p-4 bg-white rounded-xl border border-gray-200/80 space-y-1.5 shadow-sm"
                        >
                          <span className="text-xs font-bold text-[#b91c1c] block">
                            {weekKey}
                          </span>
                          <div className="text-xs text-gray-800 leading-relaxed font-medium space-y-1">
                            {typeof weekContent === "string" ? (
                              <p>{weekContent}</p>
                            ) : typeof weekContent === "object" && weekContent !== null ? (
                              Object.entries(weekContent as Record<string, any>).map(([k, v]) => (
                                <div key={k} className="flex flex-col sm:flex-row sm:gap-2 text-xs">
                                  <span className="font-bold text-[#b91c1c] shrink-0">{k}:</span>
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

                  {/* 6. ✍️ 모임 후기 목록 & 후기 작성 폼 */}
                  <div ref={reviewFormRef} id="write-review-section" className="space-y-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                        💬 생생 모임 후기 <span className="text-xs font-semibold px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full">{roomReviews.length}개</span>
                      </h3>
                      {selectedRoom.status !== "recruiting" && (
                        <span className="text-xs text-[#b91c1c] font-bold">
                          ✨ 진행 중/종료 모임 전용 후기 등록 가능
                        </span>
                      )}
                    </div>

                    {/* Existing Reviews List */}
                    <div className="space-y-4">
                      {roomReviews.map((rev, rIdx) => (
                        <div key={rev.id || rIdx} className="p-4 bg-gray-50/80 rounded-xl border border-gray-200/80 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                                {(rev.author_name || "독자")[0]}
                              </div>
                              <div>
                                <strong className="text-xs text-gray-900 block">{rev.author_name || "모임 멤버"}</strong>
                                <span className="text-[11px] text-gray-400">{rev.author_role || "독서 회원"}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-amber-500 text-xs">
                              {"⭐".repeat(rev.rating || 5)}
                              <span className="text-[11px] text-gray-400 ml-1">{rev.created_at ? String(rev.created_at).slice(0, 10) : "최근"}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-700 leading-relaxed font-normal pt-1 whitespace-pre-line">
                            {rev.content}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* WRITE REVIEW FORM */}
                    <div className="p-6 bg-[#fdf8f5] border border-[#f3e6de] rounded-2xl space-y-4 shadow-sm">
                      <h4 className="font-bold text-base text-gray-900 flex items-center gap-2">
                        ✍️ 생생한 독서모임 후기 남기기
                      </h4>
                      <p className="text-xs text-gray-500">
                        모임에 참여하며 깨달은 소중한 인사이트와 소감을 다른 분들과 공유해보세요!
                      </p>

                      {reviewSubmitSuccess ? (
                        <div className="p-4 bg-emerald-500/10 text-emerald-700 text-center font-bold text-xs rounded-xl border border-emerald-500/30">
                          🎉 후기가 성공적으로 등록되었습니다! 감사드립니다.
                        </div>
                      ) : (
                        <form onSubmit={handleReviewSubmit} className="space-y-3">
                          {/* Rating Star Picker */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-700">별점 평가:</span>
                            <div className="flex items-center gap-1 cursor-pointer">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setNewRating(star)}
                                  className={`text-lg transition-transform ${star <= newRating ? "text-amber-500 scale-110" : "text-gray-300"}`}
                                >
                                  ★
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="작성자 성함 (예: 홍길동)"
                              value={newAuthorName}
                              onChange={(e) => setNewAuthorName(e.target.value)}
                              required
                              className="px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#b91c1c]"
                            />
                            <input
                              type="text"
                              placeholder="직업/소속 (예: IT 개발자 / 독서 2년차)"
                              value={newAuthorRole}
                              onChange={(e) => setNewAuthorRole(e.target.value)}
                              className="px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#b91c1c]"
                            />
                          </div>

                          <textarea
                            rows={3}
                            placeholder="독서모임 참여 소감 및 책에서 얻은 솔직한 인사이트를 남겨주세요..."
                            value={newReviewContent}
                            onChange={(e) => setNewReviewContent(e.target.value)}
                            required
                            className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#b91c1c]"
                          />

                          <button
                            type="submit"
                            disabled={isSubmittingReview}
                            className="w-full py-3 bg-[#b91c1c] hover:bg-[#a01818] text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-red-900/10 disabled:opacity-50"
                          >
                            {isSubmittingReview ? "등록 중..." : "✍️ 독서모임 후기 작성 등록하기"}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Sticky Card (STATUS DEPENDENT) */}
                <div className="space-y-6 lg:sticky lg:top-20">
                  
                  {/* CASE 1: 🔥 모집중 (RECRUITING ROOM) -> Show Price & Participate Button */}
                  {selectedRoom.status === "recruiting" && (
                    <div className="bg-white border border-gray-200/90 shadow-xl rounded-2xl p-6 space-y-5">
                      <div>
                        <span className="text-xs text-gray-400 block mb-1">참여 비용</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            {selectedRoom.price_text.replace("원", "").trim()}
                          </span>
                          <span className="text-lg font-bold text-gray-900">원</span>
                        </div>
                        <span className="text-xs text-gray-400 block mt-1">
                          {selectedRoom.program_duration} / 1인 기준
                        </span>
                      </div>

                      <button
                        onClick={() => setShowPaymentModal(true)}
                        className="w-full py-4 bg-[#b91c1c] hover:bg-[#a01818] text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-red-900/20 active:scale-[0.98]"
                      >
                        참여 신청하기
                      </button>

                      <p className="text-[11px] text-gray-400 text-center leading-normal">
                        신청 후 24시간 이내에 결제 안내 메일이 발송됩니다
                      </p>
                    </div>
                  )}

                  {/* CASE 2: ⚡ 진행중 (IN PROGRESS ROOM) -> NO PAYMENT BUTTON! SHOW REVIEW CTA */}
                  {selectedRoom.status === "in_progress" && (
                    <div className="bg-emerald-50/80 border border-emerald-200 shadow-lg rounded-2xl p-6 space-y-5">
                      <div className="space-y-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          ⚡ 현재 진행 중인 모임 (신청 마감)
                        </span>
                        <h4 className="font-bold text-base text-gray-900 pt-1">
                          모집이 마감되어 활발히 진행 중입니다
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          본 모임은 현재 정원이 차서 활발하게 독서 토론이 진행되고 있습니다. 참여 중인 멤버는 생생한 모임 후기를 남겨주세요!
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          reviewFormRef.current?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-700/20 active:scale-[0.98]"
                      >
                        ✍️ 생생 후기 작성하러 가기
                      </button>
                    </div>
                  )}

                  {/* CASE 3: ✅ 종료 (COMPLETED ROOM) -> SHOW COMPLETED STATUS & REVIEWS CTA */}
                  {selectedRoom.status === "completed" && (
                    <div className="bg-gray-100 border border-gray-300 shadow-lg rounded-2xl p-6 space-y-5">
                      <div className="space-y-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-700 text-white text-xs font-semibold rounded-full">
                          ✅ 종료된 모임
                        </span>
                        <h4 className="font-bold text-base text-gray-900 pt-1">
                          성공적으로 마감된 모임입니다
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          참여 멤버들의 생생한 후기를 둘러보시고, 다음 시즌 독서방 개설 알림을 기다려보세요.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          reviewFormRef.current?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="w-full py-3.5 bg-gray-800 hover:bg-gray-900 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-[0.98]"
                      >
                        💬 후기 둘러보기 및 작성하기
                      </button>
                    </div>
                  )}

                  {/* 간편 정보 Card */}
                  <div style={{ backgroundColor: "#fdf8f5", border: "1px solid #f3e6de" }} className="p-6 rounded-2xl space-y-3">
                    <h4 className="font-bold text-sm text-gray-900 mb-2">간편 정보</h4>
                    <ul className="space-y-2.5 text-xs text-gray-700">
                      <li className="flex items-center gap-2">
                        <span className="text-[#b91c1c] font-bold">✓</span> 전문 클럽장 진행
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#b91c1c] font-bold">✓</span> {selectedRoom.program_duration} 완성 프로그램
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#b91c1c] font-bold">✓</span> 독후감 피드백 제공
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#b91c1c] font-bold">✓</span> 소규모 그룹 토론
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#b91c1c] font-bold">✓</span> 온라인 커뮤니티 참여
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOCK PAYMENT OVERLAY DIALOG (ONLY FOR RECRUITING ROOMS) */}
      {showPaymentModal && selectedRoom && selectedRoom.status === "recruiting" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-lg text-gray-900">💳 모임 참가비 결제 (Demo)</h3>
                <p className="text-xs text-gray-500">{selectedRoom.title}</p>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {paymentSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto animate-bounce">
                  🎉
                </div>
                <h4 className="font-bold text-xl text-gray-900">결제가 완료되었습니다!</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  [테스트 결제 완료] 모임 참여 확정 및 안내 카톡이 입력하신 번호로 발송됩니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="p-4 bg-red-50/60 rounded-xl border border-red-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">최종 결제 금액</span>
                  <span className="text-xl font-extrabold text-[#b91c1c]">{selectedRoom.price_text}</span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 block">결제 수단 선택</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPayMethod("card")}
                      className={`p-2.5 text-xs font-bold rounded-xl border transition-all ${
                        selectedPayMethod === "card"
                          ? "border-[#b91c1c] bg-red-50/40 text-[#b91c1c]"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      💳 신용/체크카드
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPayMethod("kakao")}
                      className={`p-2.5 text-xs font-bold rounded-xl border transition-all ${
                        selectedPayMethod === "kakao"
                          ? "border-amber-400 bg-amber-50 text-amber-800"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      🟡 카카오페이
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPayMethod("toss")}
                      className={`p-2.5 text-xs font-bold rounded-xl border transition-all ${
                        selectedPayMethod === "toss"
                          ? "border-blue-500 bg-blue-50 text-blue-800"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      🔵 토스페이
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPayMethod("vbank")}
                      className={`p-2.5 text-xs font-bold rounded-xl border transition-all ${
                        selectedPayMethod === "vbank"
                          ? "border-gray-800 bg-gray-800 text-white"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      🏦 무통장입금
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 block">신청자 정보</label>
                  <input
                    type="text"
                    placeholder="신청자 성함"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#b91c1c]"
                  />
                  <input
                    type="tel"
                    placeholder="휴대폰 번호 (010-0000-0000)"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#b91c1c]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessingPay}
                  className="w-full py-3.5 bg-[#b91c1c] hover:bg-[#a01818] text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-red-900/20 disabled:opacity-50"
                >
                  {isProcessingPay ? "결제 처리 중..." : `${selectedRoom.price_text} 테스트 결제 완료하기`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}