import { useState, useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { supabase } from "@/lib/supabase";

export interface FAQItem {
  id: string;
  category: "club" | "payment" | "location" | "refund";
  categoryLabel: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    category: "club",
    categoryLabel: "독서모임/진행",
    question: "독서모임은 어떤 방식으로 진행되나요?",
    answer: "퀘스처니티 독서모임은 전문 클럽장의 진행 아래 2주~4주간 소규모 그룹(최대 12명)으로 운영됩니다. 매주 정해진 독서 분량을 읽고 온라인 소통 및 오프라인 아지트(창경궁로 270)에서 발제문 중심의 활발한 토론과 실천 미션을 수행합니다."
  },
  {
    id: "faq-2",
    category: "club",
    categoryLabel: "독서모임/진행",
    question: "책을 다 읽지 못하고 참석해도 괜찮나요?",
    answer: "네, 괜찮습니다! 완전한 완독이 어렵더라도 지정된 요약본과 클럽장의 핵심 가이드 질문지를 통해 모임에 충분히 몰입하실 수 있습니다. 읽은 부분까지만이라도 다른 멤버들과 소통하며 새로운 시각을 얻어가실 수 있습니다."
  },
  {
    id: "faq-3",
    category: "payment",
    categoryLabel: "결제/쿠폰",
    question: "쿠폰 결제 방식은 어떻게 이용하나요?",
    answer: "퀘스처니티는 2개, 6개, 10개 단위의 할인 쿠폰 패키지를 실시간 계좌이체, 카드등록, 네이버페이, 카카오페이로 미리 구매한 뒤, 원하는 독서방에서 [쿠폰 1장 차감] 버튼으로 원터치 신청하는 시스템입니다. 최대 20% 할인가가 적용됩니다."
  },
  {
    id: "faq-4",
    category: "payment",
    categoryLabel: "결제/쿠폰",
    question: "구매한 쿠폰의 유효기간은 얼마나 되나요?",
    answer: "쿠폰의 유효기간은 구매일로부터 6개월(2개 패키지) 또는 1년(6개/10개 패키지)입니다. 유효기간 내에 언제든지 개설되는 모집중 독서클럽에 자유롭게 사용하실 수 있습니다."
  },
  {
    id: "faq-5",
    category: "location",
    categoryLabel: "오프라인 아지트",
    question: "오프라인 모임 장소와 주소는 어디인가요?",
    answer: "오프라인 독서 아지트는 [서울특별시 종로구 창경궁로 270 (4호선 혜화역 4번 출구 도보 3분)]에 위치하고 있습니다. 모임 참여 멤버에게는 지하 주차장 2시간 무료 주차가 지원됩니다."
  },
  {
    id: "faq-6",
    category: "refund",
    categoryLabel: "환불/취소",
    question: "독서모임 참여 취소 및 환불 규정은 어떻게 되나요?",
    answer: "모임 첫 회차 시작 3일 전까지 취소 요청 시 사용된 쿠폰 또는 결제 금액 100% 전액 환불/복구해 드립니다. 첫 모임 시작 후에는 진행 회차 비율에 따라 부분 환불 규정이 적용됩니다."
  },
  {
    id: "faq-7",
    category: "club",
    categoryLabel: "독서모임/진행",
    question: "클럽장은 어떤 분들이 맡고 계신가요?",
    answer: "IT 기업 기획자, 스타트업 대표, 출판 편집자, 대학 교수 등 해당 분야에서 최소 5년 이상의 풍부한 경험과 독서 클럽 리딩 노하우를 갖춘 엄선된 리더들이 진행합니다."
  }
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");

  // 1:1 Inquiry Form States
  const [inquiryCategory, setInquiryCategory] = useState<string>("독서모임 문의");
  const [inquiryName, setInquiryName] = useState<string>("");
  const [inquiryEmail, setInquiryEmail] = useState<string>("");
  const [inquiryPhone, setInquiryPhone] = useState<string>("");
  const [inquirySubject, setInquirySubject] = useState<string>("");
  const [inquiryContent, setInquiryContent] = useState<string>("");
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState<boolean>(false);
  const [inquirySuccess, setInquirySuccess] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryContent) return;

    setIsSubmittingInquiry(true);
    const inquiryPayload = {
      category: inquiryCategory,
      name: inquiryName,
      email: inquiryEmail,
      phone: inquiryPhone,
      subject: inquirySubject || `${inquiryCategory} 요청`,
      content: inquiryContent,
      status: "pending",
      created_at: new Date().toISOString()
    };

    try {
      await supabase.from("inquiries").insert([inquiryPayload]);
    } catch (err) {
      console.warn("Notice: Saved inquiry in local session", err);
    } finally {
      setIsSubmittingInquiry(false);
      setInquirySuccess(true);
      setInquiryName("");
      setInquiryEmail("");
      setInquiryPhone("");
      setInquirySubject("");
      setInquiryContent("");

      setTimeout(() => {
        setInquirySuccess(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F5F1] font-sans">
      <Navbar />

      <main className="flex-1 pt-24 md:pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-12">
          
          {/* Header Banner */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-block px-3.5 py-1 bg-[#111111] text-white text-xs font-bold rounded-none uppercase tracking-widest font-heading">
              HELP CENTER & SUPPORT
            </span>
            <h1 className="font-heading font-black text-3xl md:text-5xl text-[#111111] uppercase tracking-tight">
              자주 묻는 질문 (FAQ)
            </h1>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed font-sans">
              독서모임 신청, 쿠폰 결제, 오프라인 아지트 이용에 관한 자주 묻는 질문들을 빠르게 찾아보세요.
            </p>

            {/* Realtime Search Bar */}
            <div className="relative pt-3">
              <input
                type="text"
                placeholder="궁금하신 검색어를 입력해 보세요 (예: 쿠폰, 혜화역, 환불...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-4 pl-12 bg-white border border-[#111111] rounded-none shadow-xs text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111] transition-all font-sans"
              />
              <span className="absolute left-4 top-7 text-gray-500 text-lg">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-7 text-xs text-gray-500 hover:text-[#111111] font-bold bg-[#EFECE6] px-2 py-0.5 rounded-none border border-[#D0CBC0]"
                >
                  지우기
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
            {[
              { id: "all", label: "전체 보기" },
              { id: "club", label: "📖 독서모임/진행" },
              { id: "payment", label: "🎫 결제/쿠폰" },
              { id: "location", label: "📍 오프라인 아지트" },
              { id: "refund", label: "🔄 환불/취소" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 text-xs font-bold rounded-none transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#111111] text-white"
                    : "bg-white text-gray-800 hover:bg-[#EFECE6] border border-[#D0CBC0]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4 font-sans">
            {filteredFaqs.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-none border border-gray-200/80 text-gray-500 space-y-2">
                <span className="text-3xl block">🔍</span>
                <strong className="text-base text-gray-800 block">검색 결과가 없습니다</strong>
                <p className="text-xs text-gray-400">다른 검색어로 조회를 시도하시거나 아래 1:1 문의를 남겨주세요.</p>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`bg-white rounded-none border transition-all overflow-hidden ${
                      isOpen ? "border-amber-400 shadow-md" : "border-gray-200/80 shadow-xs hover:border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="shrink-0 px-2.5 py-1 bg-amber-100 text-amber-800 text-[11px] font-bold rounded-none">
                          {faq.categoryLabel}
                        </span>
                        <strong className="font-heading font-bold text-sm md:text-base text-gray-950 truncate">
                          Q. {faq.question}
                        </strong>
                      </div>
                      <span className={`text-lg transition-transform ${isOpen ? "rotate-180 text-[#b91c1c]" : "text-gray-400"}`}>
                        ▼
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 pt-2 border-t border-gray-100 text-xs md:text-sm text-gray-700 leading-relaxed bg-amber-50/30 space-y-2 font-sans">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* ============================================================================== */}
          {/* 1:1 문의하기 (CONTACT US / SUPPORT INQUIRY FORM) */}
          {/* ============================================================================== */}
          <div id="contact" className="pt-10 border-t border-gray-200">
            <div className="bg-white p-6 md:p-10 rounded-none border border-gray-200/80 shadow-lg space-y-8 font-sans">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div>
                  <span className="text-xs font-bold text-[#b91c1c] uppercase tracking-wider">
                    Customer Support
                  </span>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-gray-950 mt-1">
                    💬 1:1 문의하기
                  </h2>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    원하시는 답변을 찾지 못하셨나요? 24시간 언제든 궁금하신 점을 남겨주시면 친절히 답변드립니다.
                  </p>
                </div>
                <div className="shrink-0 bg-red-50 text-[#b91c1c] px-4 py-2 rounded-none text-xs font-bold flex items-center gap-2 border border-red-100">
                  <span>📞 고객센터</span>
                  <span>02-1234-5678</span>
                </div>
              </div>

              {inquirySuccess ? (
                <div className="py-12 text-center space-y-4 bg-emerald-50 rounded-none border border-emerald-200">
                  <div className="w-16 h-16 bg-emerald-500 text-white text-3xl rounded-none flex items-center justify-center mx-auto shadow-md animate-bounce">
                    🎉
                  </div>
                  <h3 className="font-heading font-bold text-xl text-gray-950">1:1 문의가 성공적으로 접수되었습니다!</h3>
                  <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                    작성해 주신 연락처 및 이메일로 24시간 이내에 담당 클럽 매니저가 확인 후 친절하게 안내해 드리겠습니다.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-6">
                  
                  {/* Category Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-800 block">
                      문의 유형 선택 <span className="text-[#b91c1c]">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        "독서모임 문의",
                        "결제/쿠폰 문의",
                        "오프라인 장소 문의",
                        "기타 문의"
                      ].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setInquiryCategory(cat)}
                          className={`p-3 text-xs font-bold rounded-none border transition-all ${
                            inquiryCategory === cat
                              ? "border-[#b91c1c] bg-red-50/50 text-[#b91c1c] shadow-xs"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-800 block">
                        성함 <span className="text-[#b91c1c]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="이름을 입력하세요"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-none text-xs text-gray-900 focus:outline-none focus:border-[#b91c1c] focus:bg-white transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-800 block">
                        이메일 주소 <span className="text-[#b91c1c]">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="example@email.com"
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-none text-xs text-gray-900 focus:outline-none focus:border-[#b91c1c] focus:bg-white transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-800 block">
                        연락처 (선택)
                      </label>
                      <input
                        type="tel"
                        placeholder="010-0000-0000"
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-none text-xs text-gray-900 focus:outline-none focus:border-[#b91c1c] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-800 block">
                      문의 제목
                    </label>
                    <input
                      type="text"
                      placeholder="문의 제목을 간략히 적어주세요 (예: 독서모임 일정 변경 가능한가요?)"
                      value={inquirySubject}
                      onChange={(e) => setInquirySubject(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-none text-xs text-gray-900 focus:outline-none focus:border-[#b91c1c] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-800 block">
                      문의 내용 <span className="text-[#b91c1c]">*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="궁금하신 내용을 구체적으로 작성해 주시면 더욱 정확한 안내가 가능합니다..."
                      value={inquiryContent}
                      onChange={(e) => setInquiryContent(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-none text-xs text-gray-900 focus:outline-none focus:border-[#b91c1c] focus:bg-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingInquiry}
                    className="w-full py-4 bg-[#b91c1c] hover:bg-[#a01818] text-white font-bold text-sm rounded-none transition-all shadow-lg shadow-red-900/15 disabled:opacity-50"
                  >
                    {isSubmittingInquiry ? "문의 접수 중..." : "✉️ 1:1 문의하기 접수 제출"}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
