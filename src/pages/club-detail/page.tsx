import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { allClubs } from "@/mocks/clubs";
import type { Club } from "@/mocks/clubs";

function formatPrice(price: number) {
  return new Intl.NumberFormat("ko-KR").format(price);
}

function InfoItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-none bg-accent-100 shrink-0">
        <i className={`${icon} text-accent-500 text-lg`} />
      </div>
      <div>
        <p className="text-xs text-foreground-500 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-foreground-900">{value}</p>
      </div>
    </div>
  );
}

function SimilarClubCard({ club }: { club: Club }) {
  return (
    <Link
      to={`/clubs/${club.id}`}
      className="group block bg-background-50 rounded-none overflow-hidden border border-background-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={club.imageUrl}
          alt={club.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2">
          <span className="inline-block bg-background-50/90 backdrop-blur-sm text-foreground-800 text-xs font-semibold px-2 py-0.5 rounded-none border border-background-200">
            {club.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-sm text-foreground-900 mb-1 line-clamp-1 group-hover:text-accent-500 transition-colors">
          {club.name}
        </h4>
        <p className="text-xs text-foreground-500 mb-2">{club.leaderName}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-foreground-500">{club.region}</span>
          <span className="text-sm font-bold text-accent-500">{formatPrice(club.price)}원</span>
        </div>
      </div>
    </Link>
  );
}

export default function ClubDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const club = useMemo(() => {
    return allClubs.find((c) => c.id === id);
  }, [id]);

  const similarClubs = useMemo(() => {
    if (!club) return [];
    return allClubs.filter((c) => c.category === club.category && c.id !== club.id).slice(0, 3);
  }, [club]);

  if (!club) {
    return (
      <div className="min-h-screen flex flex-col bg-background-50 text-foreground-950 font-body">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-24">
          <div className="text-center bg-background-100 p-8 rounded-none border border-background-200 max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-none bg-background-200 flex items-center justify-center">
              <i className="ri-error-warning-line text-2xl text-foreground-400" />
            </div>
            <h1 className="text-xl font-bold text-foreground-900 mb-2">모임을 찾을 수 없습니다</h1>
            <p className="text-foreground-500 text-sm mb-6">요청하신 모임이 존재하지 않거나 삭제되었습니다</p>
            <button
              onClick={() => navigate("/clubs")}
              className="bg-primary-500 text-background-50 font-semibold text-sm px-6 py-2.5 rounded-none hover:bg-accent-500 transition-colors"
            >
              모임 목록으로 돌아가기
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isClosed = club.status === "closed";
  const isOngoing = club.status === "ongoing";
  const isFull = club.currentMembers >= club.capacity && club.status === "open";
  const canApply = club.status === "open" && !isFull;
  const progress = (club.currentMembers / club.capacity) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f3ee] text-[#1a1a1a] font-sans">
      <Navbar />

      <main className="flex-1 pt-20 md:pt-24">
        {/* Full-bleed Hero */}
        <div className="relative h-[380px] md:h-[480px] overflow-hidden bg-[#1a1a1a]">
          <img
            src={club.imageUrl}
            alt={club.name}
            className="w-full h-full object-cover object-center filter brightness-75 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 pb-10 md:pb-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-[#8C2318] text-[#f4f3ee] font-mono text-xs font-bold px-3 py-1 uppercase tracking-widest">
                  {club.category}
                </span>
                <span className="bg-[#f4f3ee]/20 text-[#f4f3ee] font-mono text-xs font-medium px-3 py-1 uppercase tracking-widest backdrop-blur-sm">
                  {club.subCategory}
                </span>
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 font-mono ${
                  isClosed ? "bg-gray-800 text-white" :
                  isOngoing ? "bg-[#4A5340] text-white" :
                  isFull ? "bg-black text-white" :
                  "bg-[#8C2318] text-white"
                }`}>
                  {isClosed ? "종료된 클럽" : isOngoing ? "진행 중" : isFull ? "마감" : "모집 중"}
                </span>
              </div>
              <h1 className="font-serif font-bold text-2xl md:text-4xl lg:text-6xl text-[#f4f3ee] leading-tight mb-3">
                {club.name}
              </h1>
              <p className="font-serif italic text-base md:text-xl text-[#f4f3ee]/80">
                📖 {club.bookTitle} — <span className="font-sans not-italic text-sm">{club.bookAuthor}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full px-4 md:px-8 lg:px-12 py-8 md:py-12 bg-background-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8 md:space-y-10">
                {/* Description */}
                <section>
                  <h2 className="font-heading font-bold text-lg md:text-xl text-foreground-900 mb-4">
                    모임 소개
                  </h2>
                  <p className="text-foreground-600 leading-relaxed text-base md:text-lg">
                    {club.description}
                  </p>
                </section>

                {/* Book Info */}
                <section className="bg-background-100 rounded-none p-5 md:p-6 border border-background-200">
                  <h2 className="font-heading font-bold text-lg md:text-xl text-foreground-900 mb-4">
                    이번 달의 책
                  </h2>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-28 md:w-24 md:h-32 bg-accent-100 rounded-none flex items-center justify-center shrink-0 border border-accent-200">
                      <i className="ri-book-2-line text-3xl md:text-4xl text-accent-500" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base md:text-lg text-foreground-900 mb-1">
                        {club.bookTitle}
                      </h3>
                      <p className="text-sm text-foreground-500 mb-3">{club.bookAuthor}</p>
                      <p className="text-sm text-foreground-600 leading-relaxed">
                        {club.category === "자기계발" && "이 책은 작은 변화가 어떻게 큰 성과를 만들어내는지 과학적으로 설명합니다. 함께 읽으며 자신만의 습관 시스템을 만들어봅시다."}
                        {club.category === "인문/철학" && "이 책은 철학적 사유를 현대적인 관점에서 풀어내며, 우리 삶에 대한 깊은 통찰을 제공합니다."}
                        {club.category === "경제/경영" && "이 책은 비즈니스 전략과 리더십에 관한 핵심 통찰을 담고 있어 창업가와 예비 창업가 모두에게 유용합니다."}
                        {club.category === "문학/예술" && "이 작품은 독자에게 감동과 울림을 전달하는 걸작입니다. 함께 문장의 아름다움과 깊은 메시지를 탐구합니다."}
                        {club.category === "사회/역사" && "이 책은 현대 사회의 구조와 역사적 흐름을 심도 있게 분석하며, 우리가 살아가는 세상에 대한 이해를 넓혀줍니다."}
                        {club.category === "과학/기술" && "이 책은 복잡한 과학 개념을 쉽고 흥미롭게 풀어내며, 우주와 자연에 대한 새로운 시각을 제공합니다."}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Leader Profile */}
                <section className="bg-background-100 rounded-none p-5 md:p-6 border border-background-200">
                  <h2 className="font-heading font-bold text-lg md:text-xl text-foreground-900 mb-5">
                    클럽장 소개
                  </h2>
                  <div className="flex items-start gap-4 md:gap-5">
                    <img
                      src={club.leaderImageUrl}
                      alt={club.leaderName}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-none object-cover shrink-0 border-2 border-accent-200"
                    />
                    <div>
                      <h3 className="font-heading font-bold text-base md:text-lg text-foreground-900 mb-0.5">
                        {club.leaderName}
                      </h3>
                      <p className="text-sm text-accent-500 font-medium mb-3">{club.leaderTitle}</p>
                      <p className="text-sm text-foreground-600 leading-relaxed">
                        {club.leaderBio}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Info Grid */}
                <section>
                  <h2 className="font-heading font-bold text-lg md:text-xl text-foreground-900 mb-5">
                    모임 정보
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoItem icon="ri-calendar-line" label="모임 일정" value={club.schedule} />
                    <InfoItem icon="ri-map-pin-line" label="모임 장소" value={club.location} />
                    <InfoItem icon="ri-time-line" label="프로그램 기간" value={`${club.sessions}주 프로그램`} />
                    <InfoItem icon="ri-group-line" label="정원" value={`${club.capacity}명`} />
                  </div>
                </section>

                {/* Members progress */}
                <section>
                  <h2 className="font-heading font-bold text-lg md:text-xl text-foreground-900 mb-4">
                    현재 신청 현황
                  </h2>
                  <div className="bg-background-100 rounded-none p-5 border border-background-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-foreground-600">
                        <span className="font-semibold text-foreground-900">{club.currentMembers}명</span> 신청 완료
                      </span>
                      <span className="text-sm text-foreground-500">
                        정원 {club.capacity}명
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-background-200 rounded-none overflow-hidden">
                      <div
                        className="h-full bg-accent-500 rounded-none transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    {isClosed && (
                      <p className="text-sm text-foreground-600 font-medium mt-3">
                        <i className="ri-checkbox-circle-line mr-1 text-foreground-500" />
                        이 모임은 일정이 완전히 종료되었습니다.
                      </p>
                    )}
                    {isOngoing && (
                      <p className="text-sm text-primary-600 font-medium mt-3">
                        <i className="ri-play-circle-line mr-1" />
                        현재 모임이 차수별로 활발히 진행 중입니다.
                      </p>
                    )}
                    {isFull && (
                      <p className="text-sm text-accent-500 font-semibold mt-3">
                        <i className="ri-error-warning-line mr-1" />
                        해당 모임은 정원이 마감되었습니다.
                      </p>
                    )}
                  </div>
                </section>
              </div>

              {/* Right Column - Sticky CTA */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 space-y-5">
                  {/* Price Card */}
                  <div className="bg-background-50 rounded-none p-5 md:p-6 border border-background-200 shadow-md">
                    <div className="mb-4">
                      <p className="text-xs text-foreground-500 mb-1">참여 비용</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl md:text-3xl font-bold text-accent-500">
                          {formatPrice(club.price)}
                        </span>
                        <span className="text-sm text-foreground-500">원</span>
                      </div>
                      <p className="text-xs text-foreground-400 mt-1">{club.sessions}주 프로그램 / 1인 기준</p>
                    </div>

                    <button
                      disabled={!canApply}
                      onClick={() => setShowPaymentModal(true)}
                      className={`w-full block text-center font-semibold text-sm md:text-base py-3.5 rounded-none transition-all duration-300 ${
                        !canApply
                          ? "bg-background-200 text-foreground-400 cursor-not-allowed"
                          : "bg-accent-500 text-background-50 hover:bg-primary-500 shadow-lg shadow-accent-500/20"
                      }`}
                    >
                      {isClosed ? "모임 종료" : isOngoing ? "진행 중인 모임" : isFull ? "정원 마감" : "참여 신청하기"}
                    </button>

                    {canApply && (
                      <p className="text-xs text-foreground-400 text-center mt-3">
                        신청 시 결제 안내 절차(카드/계좌이체)가 안내됩니다
                      </p>
                    )}
                  </div>

                  {/* Payment Info Box */}
                  <div className="bg-background-100 rounded-none p-5 border border-background-200">
                    <h3 className="font-semibold text-sm text-foreground-900 mb-3 flex items-center gap-1.5">
                      <i className="ri-secure-payment-line text-accent-500" />
                      결제 및 참가 안내
                    </h3>
                    <ul className="space-y-2 text-xs text-foreground-600 leading-relaxed">
                      <li className="flex items-start gap-1.5">
                        <span className="text-accent-500 font-bold">1.</span>
                        신청하기 클릭 후 간단한 회원 정보 확인
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-accent-500 font-bold">2.</span>
                        신용카드 결제 링크 또는 무통장 입금 계좌 안내
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-accent-500 font-bold">3.</span>
                        입금 확인 후 24시간 이내 카카오톡 모임방 초대
                      </li>
                    </ul>
                  </div>

                  {/* Quick Info */}
                  <div className="bg-background-100 rounded-none p-5 border border-background-200">
                    <h3 className="font-semibold text-sm text-foreground-900 mb-3">간편 정보</h3>
                    <ul className="space-y-2.5">
                      <li className="flex items-center gap-2 text-sm text-foreground-600">
                        <i className="ri-check-line text-accent-500" />
                        전문 클럽장 진행
                      </li>
                      <li className="flex items-center gap-2 text-sm text-foreground-600">
                        <i className="ri-check-line text-accent-500" />
                        {club.sessions}주 완성 프로그램
                      </li>
                      <li className="flex items-center gap-2 text-sm text-foreground-600">
                        <i className="ri-check-line text-accent-500" />
                        독후감 피드백 제공
                      </li>
                      <li className="flex items-center gap-2 text-sm text-foreground-600">
                        <i className="ri-check-line text-accent-500" />
                        소규모 그룹 토론
                      </li>
                      <li className="flex items-center gap-2 text-sm text-foreground-600">
                        <i className="ri-check-line text-accent-500" />
                        온라인 커뮤니티 참여
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Clubs */}
        {similarClubs.length > 0 && (
          <div className="w-full px-4 md:px-8 lg:px-12 py-10 md:py-14 bg-background-100 border-t border-background-200">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-heading font-bold text-lg md:text-xl text-foreground-900 mb-6">
                비슷한 주제의 모임
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {similarClubs.map((c) => (
                  <SimilarClubCard key={c.id} club={c} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}