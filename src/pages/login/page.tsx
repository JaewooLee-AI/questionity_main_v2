import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isAuthenticated) {
    navigate("/", { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("이메일을 입력해주세요.");
      return;
    }
    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate("/", { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "로그인에 실패했습니다. 다시 시도해주세요.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f3ee] text-[#1a1a1a] font-sans">
      <Navbar />

      <main className="flex-1 flex flex-col lg:flex-row pt-24 md:pt-28 min-h-[calc(100vh-80px)]">
        {/* Left: Full-bleed Editorial Image & Quote */}
        <div className="lg:w-1/2 relative bg-[#1a1a1a] text-[#f4f3ee] min-h-[400px] lg:min-h-full flex items-end p-8 md:p-16 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
            alt="Questionity Ace Editorial Venue"
            className="absolute inset-0 w-full h-full object-cover filter brightness-60 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/40 to-transparent" />
          
          <div className="relative z-10 max-w-lg">
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#f4f3ee]/70 block mb-3 border-b border-[#f4f3ee]/30 pb-1 w-max">
              QUESTIONITY EDITORIAL ARCHITECTURE
            </span>
            <h1 className="font-serif font-bold text-3xl md:text-5xl text-[#f4f3ee] leading-tight mb-6">
              책으로 이어지는<br />
              <span className="italic font-normal text-[#e8e6df]">특별한 소모임.</span>
            </h1>
            <p className="font-sans text-sm text-[#f4f3ee]/80 leading-relaxed">
              서울특별시 종로구 창경궁로 270을 거점으로 2,000+ 멤버들이 활발히 토론하는 프리미엄 커뮤니티입니다.
            </p>
          </div>
        </div>

        {/* Right: Borderless Editorial Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-[#f4f3ee]">
          <div className="w-full max-w-md space-y-10">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#8C2318] block mb-2">
                WELCOME BACK
              </span>
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-[#1a1a1a] leading-tight mb-3">
                다시 만나서 반가워요!<br />
                <span className="text-xl md:text-2xl font-normal text-[#1a1a1a]/70">2,000+ 명이 함께 읽고 있어요</span>
              </h2>
              <p className="font-sans text-sm text-[#1a1a1a]/60">
                계정이 없으신가요?{" "}
                <Link to="/signup" className="text-[#8C2318] font-bold uppercase tracking-wider hover:underline">
                  회원가입
                </Link>
              </p>
            </div>

            {error && (
              <div className="p-4 bg-[#8C2318]/10 border-l-4 border-[#8C2318] text-[#8C2318] text-xs font-sans font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 font-sans">
              {/* Email Underline Input */}
              <div className="relative pt-4">
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  autoComplete="email"
                  className="peer w-full bg-transparent border-b-2 border-[#1a1a1a] py-2 text-base text-[#1a1a1a] focus:outline-none focus:border-[#8C2318] transition-colors"
                />
                <label
                  htmlFor="login-email"
                  className="absolute left-0 top-0 text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-[#1a1a1a]/50 peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#8C2318]"
                >
                  이메일 주소
                </label>
              </div>

              {/* Password Underline Input */}
              <div className="relative pt-4">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  autoComplete="current-password"
                  className="peer w-full bg-transparent border-b-2 border-[#1a1a1a] py-2 text-base text-[#1a1a1a] focus:outline-none focus:border-[#8C2318] transition-colors pr-10"
                />
                <label
                  htmlFor="login-password"
                  className="absolute left-0 top-0 text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-[#1a1a1a]/50 peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#8C2318]"
                >
                  비밀번호
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 bottom-2 text-[#1a1a1a]/60 hover:text-[#1a1a1a] text-sm"
                >
                  <i className={`ri-${showPassword ? "eye-off" : "eye"}-line`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs font-sans">
                <label className="flex items-center gap-2 cursor-pointer text-[#1a1a1a]/80 font-medium">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-none accent-[#8C2318] cursor-pointer"
                  />
                  <span>로그인 상태 유지</span>
                </label>
                <a href="#" className="text-[#8C2318] hover:underline uppercase tracking-wider font-bold">
                  비밀번호 찾기
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a1a1a] hover:bg-[#8C2318] text-[#f4f3ee] font-bold text-xs uppercase tracking-widest py-4 transition-all duration-700 ease-out-ace hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50 cursor-pointer"
              >
                {loading ? "로그인 진행 중..." : "로그인하기"}
              </button>
            </form>

            <div className="border-t border-[#1a1a1a]/15 pt-8 space-y-3 font-sans">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-[#1a1a1a] bg-white hover:bg-[#e8e6df] py-3.5 text-xs font-bold uppercase tracking-widest text-[#1a1a1a] transition-all"
              >
                <i className="ri-google-line text-lg" />
                Google 로 접속
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-[#1a1a1a] bg-[#FEE500] text-[#191919] hover:opacity-90 py-3.5 text-xs font-bold uppercase tracking-widest transition-all"
              >
                <i className="ri-kakao-talk-line text-lg" />
                카카오로 접속
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}