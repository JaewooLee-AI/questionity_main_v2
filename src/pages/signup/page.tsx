import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    navigate("/", { replace: true });
    return null;
  }

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = (): string | null => {
    if (!form.name.trim()) return "이름을 입력해주세요.";
    if (!form.email.trim()) return "이메일을 입력해주세요.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return "올바른 이메일 형식이 아닙니다.";
    return null;
  };

  const validateStep2 = (): string | null => {
    if (!form.password.trim()) return "비밀번호를 입력해주세요.";
    if (form.password.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
    if (form.password !== form.confirmPassword) return "비밀번호가 일치하지 않습니다.";
    if (!agreeTerms) return "이용약관에 동의해주세요.";
    if (!agreePrivacy) return "개인정보 처리방침에 동의해주세요.";
    return null;
  };

  const handleNext = () => {
    const err = validateStep1();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const err = validateStep2();
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);
    try {
      await signup(form.name.trim(), form.email.trim(), form.password);
      navigate("/", { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "회원가입에 실패했습니다. 다시 시도해주세요.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f3ee] text-[#1a1a1a] font-sans">
      <Navbar />

      <main className="flex-1 flex flex-col lg:flex-row pt-24 md:pt-28 min-h-[calc(100vh-80px)]">
        {/* Left: Full-bleed Photo & Quote */}
        <div className="lg:w-1/2 relative bg-[#1a1a1a] text-[#f4f3ee] min-h-[400px] lg:min-h-full flex items-end p-8 md:p-16 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80"
            alt="Questionity Ace Editorial Sign Up"
            className="absolute inset-0 w-full h-full object-cover filter brightness-60 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/40 to-transparent" />
          
          <div className="relative z-10 max-w-lg">
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#f4f3ee]/70 block mb-3 border-b border-[#f4f3ee]/30 pb-1 w-max">
              MEMBERSHIP REGISTRATION
            </span>
            <h1 className="font-serif font-bold text-3xl md:text-5xl text-[#f4f3ee] leading-tight mb-6">
              지적 호기심으로<br />
              <span className="italic font-normal text-[#e8e6df]">연결되는 곳.</span>
            </h1>
            <p className="font-sans text-sm text-[#f4f3ee]/80 leading-relaxed">
              서울특별시 종로구 창경궁로 270 오마드랩스에서 매월 진행되는 에디토리얼 독서클럽의 멤버로 함께하세요.
            </p>
          </div>
        </div>

        {/* Right: Borderless Editorial Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-[#f4f3ee]">
          <div className="w-full max-w-md space-y-10">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#8C2318] block mb-2">
                JOIN QUESTIONITY — STEP {step} OF 2
              </span>
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-[#1a1a1a] leading-tight mb-3">
                퀘스처니티 멤버 가입
              </h2>
              <p className="font-sans text-sm text-[#1a1a1a]/60">
                이미 계정이 있으신가요?{" "}
                <Link to="/login" className="text-[#8C2318] font-bold uppercase tracking-wider hover:underline">
                  로그인
                </Link>
              </p>
            </div>

            {error && (
              <div className="p-4 bg-[#8C2318]/10 border-l-4 border-[#8C2318] text-[#8C2318] text-xs font-sans font-semibold">
                {error}
              </div>
            )}

            {/* Step Progress Line */}
            <div className="w-full h-0.5 bg-[#1a1a1a]/10 overflow-hidden">
              <div className={`h-full bg-[#8C2318] transition-all duration-700 ease-out-ace ${step === 1 ? "w-1/2" : "w-full"}`} />
            </div>

            {step === 1 ? (
              /* Step 1: Basic Info */
              <div className="space-y-8 font-sans">
                {/* Name */}
                <div className="relative pt-4">
                  <input
                    id="signup-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder=" "
                    autoComplete="name"
                    className="peer w-full bg-transparent border-b-2 border-[#1a1a1a] py-2 text-base text-[#1a1a1a] focus:outline-none focus:border-[#8C2318] transition-colors"
                  />
                  <label
                    htmlFor="signup-name"
                    className="absolute left-0 top-0 text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-[#1a1a1a]/50 peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#8C2318]"
                  >
                    이름 (성함)
                  </label>
                </div>

                {/* Email */}
                <div className="relative pt-4">
                  <input
                    id="signup-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder=" "
                    autoComplete="email"
                    className="peer w-full bg-transparent border-b-2 border-[#1a1a1a] py-2 text-base text-[#1a1a1a] focus:outline-none focus:border-[#8C2318] transition-colors"
                  />
                  <label
                    htmlFor="signup-email"
                    className="absolute left-0 top-0 text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-[#1a1a1a]/50 peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#8C2318]"
                  >
                    이메일 주소
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-[#1a1a1a] hover:bg-[#8C2318] text-[#f4f3ee] font-bold text-xs uppercase tracking-widest py-4 transition-all duration-700 ease-out-ace hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
                >
                  다음 단계로 ↗
                </button>

                <div className="border-t border-[#1a1a1a]/15 pt-8 space-y-3">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 border border-[#1a1a1a] bg-white hover:bg-[#e8e6df] py-3.5 text-xs font-bold uppercase tracking-widest text-[#1a1a1a] transition-all"
                  >
                    <i className="ri-google-line text-lg" />
                    Google 로 간편 가입
                  </button>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 border border-[#1a1a1a] bg-[#FEE500] text-[#191919] hover:opacity-90 py-3.5 text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    <i className="ri-kakao-talk-line text-lg" />
                    카카오로 간편 가입
                  </button>
                </div>
              </div>
            ) : (
              /* Step 2: Password & Terms */
              <form onSubmit={handleSubmit} className="space-y-8 font-sans">
                {/* Password */}
                <div className="relative pt-4">
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder=" "
                    autoComplete="new-password"
                    className="peer w-full bg-transparent border-b-2 border-[#1a1a1a] py-2 text-base text-[#1a1a1a] focus:outline-none focus:border-[#8C2318] transition-colors pr-10"
                  />
                  <label
                    htmlFor="signup-password"
                    className="absolute left-0 top-0 text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-[#1a1a1a]/50 peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#8C2318]"
                  >
                    비밀번호 (8자 이상)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 bottom-2 text-[#1a1a1a]/60 hover:text-[#1a1a1a] text-sm"
                  >
                    <i className={`ri-${showPassword ? "eye-off" : "eye"}-line`} />
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative pt-4">
                  <input
                    id="signup-confirm-password"
                    type={showConfirm ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    placeholder=" "
                    autoComplete="new-password"
                    className="peer w-full bg-transparent border-b-2 border-[#1a1a1a] py-2 text-base text-[#1a1a1a] focus:outline-none focus:border-[#8C2318] transition-colors pr-10"
                  />
                  <label
                    htmlFor="signup-confirm-password"
                    className="absolute left-0 top-0 text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-[#1a1a1a]/50 peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#8C2318]"
                  >
                    비밀번호 확인
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-0 bottom-2 text-[#1a1a1a]/60 hover:text-[#1a1a1a] text-sm"
                  >
                    <i className={`ri-${showConfirm ? "eye-off" : "eye"}-line`} />
                  </button>
                </div>

                {/* Terms Checkboxes */}
                <div className="space-y-3 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-[#1a1a1a]/90 font-medium">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-4 h-4 rounded-none accent-[#8C2318] cursor-pointer"
                    />
                    <span>[필수] 이용약관 동의</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[#1a1a1a]/90 font-medium">
                    <input
                      type="checkbox"
                      checked={agreePrivacy}
                      onChange={(e) => setAgreePrivacy(e.target.checked)}
                      className="w-4 h-4 rounded-none accent-[#8C2318] cursor-pointer"
                    />
                    <span>[필수] 개인정보 처리방침 동의</span>
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 border border-[#1a1a1a] text-[#1a1a1a] font-bold text-xs uppercase tracking-widest py-4 transition-all hover:bg-[#e8e6df]"
                  >
                    이전
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-2/3 bg-[#8C2318] hover:bg-[#1a1a1a] text-[#f4f3ee] font-bold text-xs uppercase tracking-widest py-4 transition-all duration-700 ease-out-ace hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50"
                  >
                    {loading ? "가입 처리 중..." : "가입 완료하기"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}