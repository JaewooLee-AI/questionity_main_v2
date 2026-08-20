# 퀘스처니티 (Questionity) 기술 문서

## 📋 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [시스템 아키텍처](#시스템-아키텍처)
3. [기술 스택](#기술-스택)
4. [프로젝트 구조](#프로젝트-구조)
5. [데이터베이스 스키마](#데이터베이스-스키마)
6. [API 문서](#api-문서)
7. [환경 설정](#환경-설정)
8. [배포 가이드](#배포-가이드)
9. [개발 가이드](#개발-가이드)

---

## 🎯 프로젝트 개요

### 프로젝트 정보
- **프로젝트명**: 퀘스처니티 (Questionity)
- **설명**: 프리미엄 독서 커뮤니티 및 오프라인 코워킹 스페이스 플랫폼
- **위치**: 서울특별시 종로구 창경궁로 270 (혜화역 4번 출구)
- **설립일**: 2026년
- **멤버십**: 2,000+ 누적 독서 멤버

### 핵심 비즈니스 모델
- **온라인 독서 클럽 플랫폼**: 책 기반 소그룹 토론 및 네트워킹
- **오프라인 코워킹 스페이스**: 독서 아지트 및 커뮤니티 라운지
- **도서 큐레이션**: 카테고리별 300선 도서 추천 시스템
- **멤버십 관리**: 1st Season 멤버 모집 및 관리

---

## 🏗️ 시스템 아키텍처

### 전체 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────────┐
│                        퀘스처니티 시스템                         │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
    ┌───▼───┐         ┌───▼───┐         ┌──▼───┐
    │  Frontend  │         │ Backend │         │ Third │
    │   Layer   │         │ Layer  │         │ Party │
    └───┬───┘         └───┬───┘         └──┬───┘
        │                 │                 │
   ┌───▼───┐         ┌───▼───┐         ┌▼───┐
   │ React │         │ Node.js│         │Supa │
   │  App  │         │ APIs  │         │base │
   └───┬───┘         └───┬───┘         └────┘
       │                 │
  ┌────┴────────┬─────────┴────┐
  │             │              │
┌─▼───────┐  ┌───▼────┐  ┌────▼────┐
│Supabase │  │ Firebase│  │  Stripe  │
│   DB    │  │   Auth  │  │ Payment │
└─────────┘  └────────┘  └─────────┘
```

### 프론트엔드 아키텍처

#### 컴포넌트 구조
```
src/
├── App.tsx                    # 루트 컴포넌트
├── main.tsx                   # 앱 진입점
├── router/                    # 라우팅 설정
│   ├── config.tsx             # 라우트 경로 정의
│   └── index.tsx             # 라우터 컴포넌트
├── components/                # 공통 컴포넌트
│   ├── common/               # 일반 컴포넌트
│   │   ├── ScrollToTop.tsx
│   │   ├── ImageBlock.tsx
│   │   └── EditorialCard.tsx
│   └── feature/             # 기능별 컴포넌트
│       ├── Navbar.tsx
│       └── Footer.tsx
├── pages/                     # 페이지 컴포넌트
│   ├── home/                 # 홈페이지
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── HeroSection.tsx
│   │       ├── AboutSection.tsx
│   │       ├── CategorySection.tsx
│   │       ├── ClubsSection.tsx
│   │       ├── HowItWorksSection.tsx
│   │       ├── LocationSection.tsx
│ │       └── ReviewsSection.tsx
│   ├── login/                # 로그인 페이지
│   ├── signup/               # 회원가입 페이지
│   └── ...                    # 기타 페이지
├── hooks/                     # 커스텀 훅
│   └── useAuth.tsx           # 인증 관련 훅
├── lib/                       # 유틸리티 라이브러리
│   ├── supabase.ts            # Supabase 클라이언트
│   ├── aladin.ts              # 알라딤 API 연동
│   └── proxyBookCover.ts     # 이미지 프록시
└── mocks/                     # 목업 데이터
    ├── home.ts
    ├── books50.ts
    └── clubs.ts
```

### 데이터 흐름도

#### 1. 사용자 인증 흐름
```
사용자 → Firebase 인증 → JWT 토큰 발급 → 
세션 저장 → Protected Routes 접근
```

#### 2. 독서 모임 참여 흐름
```
사용자 → 카테고리 탐색 → 도서 선택 →
신청서버 제출 → 결제 (Stripe) → 
모임 확정 → 알림 발송
```

#### 3. 실시간 데이터 동기화
```
Supabase Realtime → PostgreSQL Changes →
클라이언트 트리거 → UI 업데이트
```

---

## 🔧 기술 스택

### 프론트엔드 기술
- **프레임워크**: React 19.1.2
- **언어**: TypeScript 5.8.3
- **번들러**: Vite 8.0.1
- **라우팅**: React Router v7.6.3
- **상태관리**: React Hooks (useState, useEffect, useMemo)
- **스타일링**: Tailwind CSS 3.4.17

### 백엔드 및 인프라
- **데이터베이스**: Supabase (PostgreSQL 기반)
- **인증**: Firebase Authentication
- **결제**: Stripe Payment
- **호스팅**: Vercel (권장)
- **실시간**: Supabase Realtime

### UI/UX 라이브러리
- **디자인 시스템**: Tailwind CSS
- **아이콘**: Lucide React
- **차트**: Recharts 3.2.0
- **애니메이션**: CSS transitions + GPU 가속

### 개발 도구
- **패키지 매니저**: npm
- **코드 품리티**: ESLint + TypeScript
- **포맷터**: Prettier (내장)
- **빌드**: Vite HMR (Hot Module Replacement)

---

## 📁 프로젝트 구조

### 디렉토리 구조
```
questionity_main_v2/
├── docs/                      # 기술 문서 (🎯 작성 중)
├── public/                    # 정적 파일
├── src/                       # 소스 코드
├── eslint.config.ts           # ESLint 설정
├── package.json              # 의존성 관리
├── postcss.config.ts         # PostCSS 설정
├── tailwind.config.ts        # Tailwind 설정
├── tsconfig.json             # TypeScript 설정
└── vite.config.ts            # Vite 설정
```

### 핵심 설정 파일

#### tailwind.config.ts
```typescript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Playfair Display"', '"Pretendard Variable"'],
        body: ['"Pretendard Variable"', '"Pretendard"', '-apple-system'],
        sans: ['"Pretendard Variable"', '"Pretendard"', '-apple-system'],
      },
      colors: {
        ace: {
          base: '#f4f3ee',
          hover: '#e8e6df',
          main: '#1a1a1a',
          brick: '#8C2318',
        },
      },
      transitionDuration: {
        '700': '700ms',
      },
      transitionTimingFunction: {
        'out-ace': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
}
```

#### vite.config.ts
```typescript
export default defineConfig({
  plugins: [
    aladinCoverProxy(),  // 알라딤 이미지 프록시
    react(),
    AutoImport({ imports: [...] }),
  ],
  server: {
    port: 5173,
    host: "127.0.0.1",
  },
});
```

---

## 🗄️ 데이터베이스 스키마

### 주요 테이블 구조

#### 1. rooms 테이블 (독서 모임)
```sql
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  book_title VARCHAR(255),
  book_author VARCHAR(255),
  book_description TEXT,
  book_image_url TEXT,
  aladin_url TEXT,
  target_audience TEXT,
  status VARCHAR(50) DEFAULT 'recruiting',
  program_duration VARCHAR(100),
  recruitment_period VARCHAR(100),
  schedule_text TEXT,
  location TEXT,
  max_capacity INTEGER DEFAULT 12,
  price_text VARCHAR(100),
  curriculum_json JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. reviews 테이블 (모임 후기)
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID,
  book_title VARCHAR(255),
  book_author VARCHAR(255),
  book_image_url TEXT,
  author_name VARCHAR(100),
  author_role VARCHAR(100),
  rating INTEGER DEFAULT 5,
  content TEXT,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);
```

#### 3. users 테이블 (사용자 정보)
```sql
-- Firebase Authentication에서 관리
-- 추가 프로필 정보는 Supabase에 저장 가능
```

### 데이터베이스 관계
```
users (Firebase) ─────┐
                      │
rooms ───────────────┼───── reviews
                      │       │
            curriculum_json   room_id (FK)
```

---

## 🔌 API 문서

### 클라이언트 라이브러리

#### Supabase 클라이언트 (`src/lib/supabase.ts`)
```typescript
// Supabase 클라이언트 초기화
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

#### 주요 API 함수

**독서 모임 조회**
```typescript
async function getRooms(filters?: RoomFilters): Promise<RoomItem[]>
```

**후기 작성**
```typescript
async function createReview(review: ReviewInput): Promise<void>
```

**카테고리별 도서 필터링**
```typescript
async function getBooksByCategory(category: string): Promise<CuratedBook[]>
```

### 알라딤 연동

#### 알라딤 API 클라이언트 (`src/lib/aladin.ts`)
```typescript
// 알라딤 도서 검색
async function searchAladinBooks(keyword: string): Promise<AladinBook[]>

// 알라딤 상세 정보 조회
async function getAladinBookDetails(isbn: string): Promise<BookDetail>
```

### 이미지 프록시 엔드포인트

#### 알라딤 이미지 프록시
```
GET /api/book-cover?url={encoded_url}

Headers:
  Referer: https://www.aladin.co.kr/
  User-Agent: Mozilla/5.0...

Response:
  Content-Type: image/jpeg
  Cache-Control: public, max-age=86400
  Access-Control-Allow-Origin: *
```

---

## ⚙️ 환경 설정

### 환경 변수 (`.env`)
```bash
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key

# 기타
BASE_PATH=/  # 베이스 경로 (필요시)
```

### 로컬 개발 환경 설정
1. **의존성 설치**:
   ```bash
   npm install
   ```

2. **환경 변수 파일 생성**:
   ```bash
   cp .env.example .env
   ```

3. **개발 서버 시작**:
   ```bash
   npm run dev
   ```

4. **브라우저 접속**:
   - 개발 서버: `http://localhost:5173`

---

## 🚀 배포 가이드

### Vercel 배포

#### 1. 프로젝트 빌드
```bash
npm run build
```

#### 2. Vercel 배포
```bash
# Vercel CLI 설치 (미설치시)
npm i -g vercel

# Vercel 프로젝트 연결
vercel link

# 배포
vercel --prod
```

#### 3. 환경 변수 설정
Vercel 대시보드에서 `.env` 변수들을 설정:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_FIREBASE_API_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`

### 프리뷰 뷰 체크
- [ ] Supabase 프로젝트 생성 및 연결
- [ ] Firebase 프로젝트 생성 및 설정
- [ ] Stripe 계정 설정
- [ ] 도메인 연결 (선택사)

### CI/CD 파이프라인
현재 자동화된 CI/CD 파이프라인이 구현되어 있지 않습니다. 수동 배포를 권장합니다.

---

## 🛠️ 개발 가이드

### 로컬 개발 환경 설정

#### 필수 조건
- Node.js 18+ 
- npm 9+
- Git

#### 권장 설정
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드 테스트
npm run build

# 타입 체크
npm run type-check

# 린팅
npm run lint
```

### 브랜치 전략
- **main**: 안정화된 배포 브랜치
- **feature/**: 기능별 개발 브랜치
- **fix/**: 버그 수정 브랜치

### 코드 스타일 가이드
- **컴포넌트**: PascalCase (예: `HeroSection.tsx`)
- **유틸리티 함수**: camelCase (예: `proxyBookCover`)
- **타입 인터페이스**: PascalCase (예: `RoomItem`)
- **상수**: UPPER_SNAKE_CASE (예: `API_URL`)

### Git 커밋 규칙
```bash
# 커밋 메시지 형식
[타입] #이슈 #간단 설명

예시:
feat:clubs-section 🎨 카테고리 섹션 추가
fix:auth-bug 🐛 로그인 버그 수정
docs:readme 📖 README 문서 업데이트
style:navbar 💄 네비게이션 스타일 조정
```

---

## 🔐 보안 아키텍처

### 인증 보안
- Firebase Authentication을 통한 JWT 기반 인증
- 세션 타임아웃: 7일
- 비밀번호 해싱: Firebase 내장 함수

### 데이터 보안
- Supabase Row Level Security (RLS) 정책
- API 키 환경 변수로 관리
- HTTPS 필수 (프로덕션)

### CORS 정책
- 알라딤 이미지: 서버사이드 프록시로 우회
- Supabase: 도메인 화이트리스트 추가 필요

---

## 📊 모니터링 및 로깅

### 추천 도구
- **Sentry**: 에러 트래킹 (선택적)
- **Google Analytics**: 사용자 행동 분석 (선택적)
- **Supabase Dashboard**: DB 모니터링

### 성능 모니터링
- React DevTools Profiler
- Lighthouse 점수 확인
- Vite 빌드 성능 분석

---

## 🐛 문제 해결 가이드

### 일반적인 문제

#### 1. 이미지가 로딩되지 않을 때
**원인**: 알라딤 CORS 제약
**해결**: 
```typescript
// 프록시 URL 사용
const imageUrl = `/api/book-cover?url=${encodeURIComponent(book.cover)}`;
```

#### 2. Supabase 연결 오류
**원인**: 환경 변수 미설정
**해결**:
```bash
# .env 파일 확인
cat .env | grep SUPABASE
```

#### 3. Stripe 결제 오류
**원인**: API 키 만료 또는 설정 오류
**해결**: Stripe 대시보드에서 테스트 모드 확인

### 디버깅 팁

#### 로그 확인
```bash
# 개발 서버 로그
npm run dev

# 빌드 로그
npm run build
```

#### 브라우저 콘솔
```javascript
// 개발자 도구 콘솔
console.log('Debug:', data);

// Supabase 로그
supabase.from('rooms').on('*', console.log).subscribe()
```

---

## 📚 추가 리소스

### 관련 문서
- [React 공식 문서](https://react.dev/)
- [Supabase 문서](https://supabase.com/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Vite 문서](https://vitejs.dev/)

### 팀 커뮤니케이션
- **기술적 질문**: GitHub Issues
- **비즈니스 질문**: 슬랙 채널 또는 이메일

---

## 🔄 버전 관리

### 현재 버전: v1.0.0
- React 19 업그레이드 완료
- 에이스 호텔 스타일 UI 리디자인 완료
- 반응형 디자인 최적화 완료
- 300선 도서 큐레이션 시스템 구축 완료

### 향후 로드맵
- v1.1.0: 실시간 채팅 기능 추가
- v1.2.0: 모바일 앱 출시
- v2.0.0: 글로벌 확대 버전

---

*이 문서는 퀘스처니티 프로젝트의 기술 아키텍처와 개발 가이드를 포함하고 있습니다. 문서 최신 업데이트: 2026년 8월*
