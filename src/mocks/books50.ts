export interface CuratedBook {
  id: string;
  category: "경제경영" | "자기계발" | "인문학" | "IT/컴퓨터" | "소설/시/희곡" | "사회과학";
  title: string;
  author: string;
  publisher: string;
  cover: string;
  description: string;
  tags: string[];
}

export const CURATED_50_BOOKS: CuratedBook[] = [
  {
    "id": "b-101",
    "category": "경제경영",
    "title": "아토믹 해빗 (Atomic Habits)",
    "author": "제임스 클리어",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/39727/2/cover200/k042130706_1.jpg",
    "description": "매일 1%씩 변하면 1년 뒤 37배 성장한다. 습관 형성의 과학적 메커니즘.",
    "tags": [
      "베스트셀러",
      "습관",
      "자기관리"
    ]
  },
  {
    "id": "b-102",
    "category": "경제경영",
    "title": "제로 투 원 (Zero to One)",
    "author": "피터 틸",
    "publisher": "한국경제신문",
    "cover": "https://image.aladin.co.kr/product/32489/85/cover200/k942935503_1.jpg",
    "description": "새로운 것을 창조하는 수직적 진보와 독점 기업 구축의 법칙.",
    "tags": [
      "스타트업",
      "혁신",
      "비즈니스"
    ]
  },
  {
    "id": "b-103",
    "category": "경제경영",
    "title": "돈의 속성",
    "author": "김승호",
    "publisher": "스노우폭스북스",
    "cover": "https://image.aladin.co.kr/product/39443/32/cover200/k392139397_1.jpg",
    "description": "돈을 대하는 태도와 부의 법칙을 담은 한인 최초 글로벌 기업가의 자산 철학.",
    "tags": [
      "재테크",
      "부자",
      "자산관리"
    ]
  },
  {
    "id": "b-104",
    "category": "경제경영",
    "title": "원칙 (Principles)",
    "author": "레이 달리오",
    "publisher": "한빛비즈",
    "cover": "https://image.aladin.co.kr/product/39443/89/cover200/k232139499_1.jpg",
    "description": "세계 최대 헤지펀드 브릿지워터 창업자의 일과 삶의 원칙 체계.",
    "tags": [
      "리더십",
      "의사결정",
      "경영"
    ]
  },
  {
    "id": "b-105",
    "category": "경제경영",
    "title": "트렌드 코리아 2026",
    "author": "김난도 외",
    "publisher": "미래의창",
    "cover": "https://image.aladin.co.kr/product/39938/68/cover200/k722130220_1.jpg",
    "description": "대한민국 소비 트렌드의 흐름과 다가올 키워드 전격 분석.",
    "tags": [
      "트렌드",
      "소비자",
      "마케팅"
    ]
  },
  {
    "id": "b-106",
    "category": "경제경영",
    "title": "생각에 관한 생각",
    "author": "대니얼 카너먼",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/32782/31/cover200/k672936488_1.jpg",
    "description": "노벨 경제학상 수상자가 밝혀낸 인간 행동의 편향과 의사결정의 비밀.",
    "tags": [
      "행동경제학",
      "심리학",
      "판단력"
    ]
  },
  {
    "id": "b-107",
    "category": "경제경영",
    "title": "부의 대이동",
    "author": "오건영",
    "publisher": "페이지2",
    "cover": "https://image.aladin.co.kr/product/39931/83/cover200/k002130124_1.jpg",
    "description": "금리와 환율로 파악하는 세계 경제와 투자 자산의 미래 지도.",
    "tags": [
      "금리",
      "환율",
      "거시경제"
    ]
  },
  {
    "id": "b-108",
    "category": "경제경영",
    "title": "역행자",
    "author": "자청",
    "publisher": "웅진지식하우스",
    "cover": "https://image.aladin.co.kr/product/39410/64/cover200/k342139095_1.jpg",
    "description": "운명에 맞서 인생을 역전시키는 사고방식과 7단계 실행 전략.",
    "tags": [
      "자기계발",
      "성공",
      "사고방식"
    ]
  },
  {
    "id": "b-109",
    "category": "경제경영",
    "title": "부자 아빠 가난한 아빠",
    "author": "제임스 클리어 외",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/38331/50/cover200/k192034444_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "베스트셀러"
    ]
  },
  {
    "id": "b-110",
    "category": "경제경영",
    "title": "부의 시그널",
    "author": "피터 틸 외",
    "publisher": "한국경제신문",
    "cover": "https://image.aladin.co.kr/product/14013/55/cover200/8934981210_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "스타트업"
    ]
  },
  {
    "id": "b-111",
    "category": "경제경영",
    "title": "경영학 콘서트",
    "author": "김승호 외",
    "publisher": "스노우폭스북스",
    "cover": "https://image.aladin.co.kr/product/1990/58/cover200/s342534700_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "재테크"
    ]
  },
  {
    "id": "b-112",
    "category": "경제경영",
    "title": "화폐의 몰락",
    "author": "레이 달리오 외",
    "publisher": "한빛비즈",
    "cover": "https://image.aladin.co.kr/product/39905/69/cover200/k732130029_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "리더십"
    ]
  },
  {
    "id": "b-113",
    "category": "경제경영",
    "title": "자본주의",
    "author": "김난도 외 외",
    "publisher": "미래의창",
    "cover": "https://image.aladin.co.kr/product/39929/46/cover200/399294636_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "트렌드"
    ]
  },
  {
    "id": "b-114",
    "category": "경제경영",
    "title": "위대한 기업은 다 어디로 갔을까",
    "author": "대니얼 카너먼 외",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/39991/62/cover200/k072130930_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "행동경제학"
    ]
  },
  {
    "id": "b-115",
    "category": "경제경영",
    "title": "블루오션 전략",
    "author": "오건영 외",
    "publisher": "페이지2",
    "cover": "https://image.aladin.co.kr/product/32355/51/cover200/k962935460_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "금리"
    ]
  },
  {
    "id": "b-116",
    "category": "경제경영",
    "title": "좋은 기업을 넘어 위대한 기업으로",
    "author": "자청 외",
    "publisher": "웅진지식하우스",
    "cover": "https://image.aladin.co.kr/product/39727/2/cover200/k042130706_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "자기계발"
    ]
  },
  {
    "id": "b-117",
    "category": "경제경영",
    "title": "스몰 자이언츠",
    "author": "제임스 클리어 외",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/32489/85/cover200/k942935503_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "베스트셀러"
    ]
  },
  {
    "id": "b-118",
    "category": "경제경영",
    "title": "플랫폼 제국의 미래",
    "author": "피터 틸 외",
    "publisher": "한국경제신문",
    "cover": "https://image.aladin.co.kr/product/39443/32/cover200/k392139397_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "스타트업"
    ]
  },
  {
    "id": "b-119",
    "category": "경제경영",
    "title": "린 스타트업",
    "author": "김승호 외",
    "publisher": "스노우폭스북스",
    "cover": "https://image.aladin.co.kr/product/39443/89/cover200/k232139499_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "재테크"
    ]
  },
  {
    "id": "b-120",
    "category": "경제경영",
    "title": "하이아웃풋 매니지먼트",
    "author": "레이 달리오 외",
    "publisher": "한빛비즈",
    "cover": "https://image.aladin.co.kr/product/39938/68/cover200/k722130220_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "리더십"
    ]
  },
  {
    "id": "b-121",
    "category": "경제경영",
    "title": "하버드 비즈니스 리뷰 100선",
    "author": "김난도 외 외",
    "publisher": "미래의창",
    "cover": "https://image.aladin.co.kr/product/32782/31/cover200/k672936488_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "트렌드"
    ]
  },
  {
    "id": "b-122",
    "category": "경제경영",
    "title": "달러구트 꿈 백화점 경제학",
    "author": "대니얼 카너먼 외",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/39931/83/cover200/k002130124_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "행동경제학"
    ]
  },
  {
    "id": "b-123",
    "category": "경제경영",
    "title": "빅쇼트",
    "author": "오건영 외",
    "publisher": "페이지2",
    "cover": "https://image.aladin.co.kr/product/39410/64/cover200/k342139095_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "금리"
    ]
  },
  {
    "id": "b-124",
    "category": "경제경영",
    "title": "행동경제학의 재발견",
    "author": "자청 외",
    "publisher": "웅진지식하우스",
    "cover": "https://image.aladin.co.kr/product/38331/50/cover200/k192034444_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "자기계발"
    ]
  },
  {
    "id": "b-125",
    "category": "경제경영",
    "title": "투자 전쟁",
    "author": "제임스 클리어 외",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/14013/55/cover200/8934981210_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "베스트셀러"
    ]
  },
  {
    "id": "b-126",
    "category": "경제경영",
    "title": "워런 버핏의 주주 서한",
    "author": "피터 틸 외",
    "publisher": "한국경제신문",
    "cover": "https://image.aladin.co.kr/product/1990/58/cover200/s342534700_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "스타트업"
    ]
  },
  {
    "id": "b-127",
    "category": "경제경영",
    "title": "전설로 떠나는 월가의 영웅",
    "author": "김승호 외",
    "publisher": "스노우폭스북스",
    "cover": "https://image.aladin.co.kr/product/39905/69/cover200/k732130029_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "재테크"
    ]
  },
  {
    "id": "b-128",
    "category": "경제경영",
    "title": "피터 린치의 이기는 투자",
    "author": "레이 달리오 외",
    "publisher": "한빛비즈",
    "cover": "https://image.aladin.co.kr/product/39929/46/cover200/399294636_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "리더십"
    ]
  },
  {
    "id": "b-129",
    "category": "경제경영",
    "title": "마켓 5.0",
    "author": "김난도 외 외",
    "publisher": "미래의창",
    "cover": "https://image.aladin.co.kr/product/39991/62/cover200/k072130930_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "트렌드"
    ]
  },
  {
    "id": "b-130",
    "category": "경제경영",
    "title": "포지셔닝",
    "author": "대니얼 카너먼 외",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/32355/51/cover200/k962935460_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "행동경제학"
    ]
  },
  {
    "id": "b-131",
    "category": "경제경영",
    "title": "보라빛 소가 온다",
    "author": "오건영 외",
    "publisher": "페이지2",
    "cover": "https://image.aladin.co.kr/product/39727/2/cover200/k042130706_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "금리"
    ]
  },
  {
    "id": "b-132",
    "category": "경제경영",
    "title": "인플레이션에서 살아남기",
    "author": "자청 외",
    "publisher": "웅진지식하우스",
    "cover": "https://image.aladin.co.kr/product/32489/85/cover200/k942935503_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "자기계발"
    ]
  },
  {
    "id": "b-133",
    "category": "경제경영",
    "title": "마인드셋 비즈니스",
    "author": "제임스 클리어 외",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/39443/32/cover200/k392139397_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "베스트셀러"
    ]
  },
  {
    "id": "b-134",
    "category": "경제경영",
    "title": "경영의 신 이나모리 가즈오",
    "author": "피터 틸 외",
    "publisher": "한국경제신문",
    "cover": "https://image.aladin.co.kr/product/39443/89/cover200/k232139499_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "스타트업"
    ]
  },
  {
    "id": "b-135",
    "category": "경제경영",
    "title": "스티브 잡스 전기",
    "author": "김승호 외",
    "publisher": "스노우폭스북스",
    "cover": "https://image.aladin.co.kr/product/39938/68/cover200/k722130220_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "재테크"
    ]
  },
  {
    "id": "b-136",
    "category": "경제경영",
    "title": "일론 머스크 자서전",
    "author": "레이 달리오 외",
    "publisher": "한빛비즈",
    "cover": "https://image.aladin.co.kr/product/32782/31/cover200/k672936488_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "리더십"
    ]
  },
  {
    "id": "b-137",
    "category": "경제경영",
    "title": "슈독 (Shoe Dog)",
    "author": "김난도 외 외",
    "publisher": "미래의창",
    "cover": "https://image.aladin.co.kr/product/39931/83/cover200/k002130124_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "트렌드"
    ]
  },
  {
    "id": "b-138",
    "category": "경제경영",
    "title": "나이키의 탄생",
    "author": "대니얼 카너먼 외",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/39410/64/cover200/k342139095_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "행동경제학"
    ]
  },
  {
    "id": "b-139",
    "category": "경제경영",
    "title": "구글은 어떻게 일하는가",
    "author": "오건영 외",
    "publisher": "페이지2",
    "cover": "https://image.aladin.co.kr/product/38331/50/cover200/k192034444_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "금리"
    ]
  },
  {
    "id": "b-140",
    "category": "경제경영",
    "title": "넷플릭스 규칙 없음",
    "author": "자청 외",
    "publisher": "웅진지식하우스",
    "cover": "https://image.aladin.co.kr/product/14013/55/cover200/8934981210_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "자기계발"
    ]
  },
  {
    "id": "b-141",
    "category": "경제경영",
    "title": "아마존 비즈니스 방식",
    "author": "제임스 클리어 외",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/1990/58/cover200/s342534700_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "베스트셀러"
    ]
  },
  {
    "id": "b-142",
    "category": "경제경영",
    "title": "픽사 스토리텔링",
    "author": "피터 틸 외",
    "publisher": "한국경제신문",
    "cover": "https://image.aladin.co.kr/product/39905/69/cover200/k732130029_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "스타트업"
    ]
  },
  {
    "id": "b-143",
    "category": "경제경영",
    "title": "스타벅스 웨이",
    "author": "김승호 외",
    "publisher": "스노우폭스북스",
    "cover": "https://image.aladin.co.kr/product/39929/46/cover200/399294636_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "재테크"
    ]
  },
  {
    "id": "b-144",
    "category": "경제경영",
    "title": "돈의 양육법",
    "author": "레이 달리오 외",
    "publisher": "한빛비즈",
    "cover": "https://image.aladin.co.kr/product/39991/62/cover200/k072130930_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "리더십"
    ]
  },
  {
    "id": "b-145",
    "category": "경제경영",
    "title": "글로벌 마크로 경제학",
    "author": "김난도 외 외",
    "publisher": "미래의창",
    "cover": "https://image.aladin.co.kr/product/32355/51/cover200/k962935460_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "트렌드"
    ]
  },
  {
    "id": "b-146",
    "category": "경제경영",
    "title": "채권 투자 입문",
    "author": "대니얼 카너먼 외",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/39727/2/cover200/k042130706_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "행동경제학"
    ]
  },
  {
    "id": "b-147",
    "category": "경제경영",
    "title": "부동산 트렌드 2026",
    "author": "오건영 외",
    "publisher": "페이지2",
    "cover": "https://image.aladin.co.kr/product/32489/85/cover200/k942935503_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "금리"
    ]
  },
  {
    "id": "b-148",
    "category": "경제경영",
    "title": "주식 투자자의 시선",
    "author": "자청 외",
    "publisher": "웅진지식하우스",
    "cover": "https://image.aladin.co.kr/product/39443/32/cover200/k392139397_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "자기계발"
    ]
  },
  {
    "id": "b-149",
    "category": "경제경영",
    "title": "스타트업 마케팅 가이드",
    "author": "제임스 클리어 외",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/39443/89/cover200/k232139499_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "베스트셀러"
    ]
  },
  {
    "id": "b-150",
    "category": "경제경영",
    "title": "초기 창업자의 회계 노트",
    "author": "피터 틸 외",
    "publisher": "한국경제신문",
    "cover": "https://image.aladin.co.kr/product/39938/68/cover200/k722130220_1.jpg",
    "description": "경제경영 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "경제경영",
      "추천도서",
      "스타트업"
    ]
  },
  {
    "id": "b-201",
    "category": "자기계발",
    "title": "도둑맞은 집중력",
    "author": "요한 하리",
    "publisher": "어크로스",
    "cover": "https://image.aladin.co.kr/product/39656/35/cover200/k292130198_3.jpg",
    "description": "스마트폰과 디지탈 시대, 우리의 주의력을 빼앗아간 시스템에 대한 충격적 고찰.",
    "tags": [
      "집중력",
      "디지털독소",
      "뇌과학"
    ]
  },
  {
    "id": "b-202",
    "category": "자기계발",
    "title": "그릿 (Grit)",
    "author": "앤절라 덕워스",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/39895/66/cover200/k092130825_1.jpg",
    "description": "IQ나 천재성이 아닌 열정과 집념이 어떻게 성공을 결정짓는지 밝힌다.",
    "tags": [
      "열정",
      "끈기",
      "성공학"
    ]
  },
  {
    "id": "b-203",
    "category": "자기계발",
    "title": "세이노의 가르침",
    "author": "세이노",
    "publisher": "데이원",
    "cover": "https://image.aladin.co.kr/product/39872/77/cover200/k742130313_1.jpg",
    "description": "피와 땀으로 일군 피보다 진한 인생의 조언과 돈, 삶에 대한 통찰.",
    "tags": [
      "인생조언",
      "자수성가",
      "멘토링"
    ]
  },
  {
    "id": "b-204",
    "category": "자기계발",
    "title": "미라클 모닝",
    "author": "할 엘로드",
    "publisher": "한빛비즈",
    "cover": "https://image.aladin.co.kr/product/39782/23/cover200/k192130202_1.jpg",
    "description": "아침 6분의 기적이 바꾸는 하루의 생산성과 라이프스타일 혁신.",
    "tags": [
      "아침루틴",
      "갓생",
      "자기관리"
    ]
  },
  {
    "id": "b-205",
    "category": "자기계발",
    "title": "더 마인드",
    "author": "하와이의호아",
    "publisher": "웅진지식하우스",
    "cover": "https://image.aladin.co.kr/product/38895/53/cover200/k602137608_1.jpg",
    "description": "무의식을 재설계하여 수많은 제약을 깨부수는 수확의 법칙.",
    "tags": [
      "무의식",
      "끌어당김",
      "멘탈"
    ]
  },
  {
    "id": "b-206",
    "category": "자기계발",
    "title": "원씽 (The One Thing)",
    "author": "게리 켈러",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/39608/96/cover200/k552130873_1.jpg",
    "description": "단 하나의 가장 중요한 일에 집중하여 단기간에 비약적 성과를 내는 법.",
    "tags": [
      "몰입",
      "우선순위",
      "생산성"
    ]
  },
  {
    "id": "b-207",
    "category": "자기계발",
    "title": "타이탄의 도구들",
    "author": "팀 페리스",
    "publisher": "토네이도",
    "cover": "https://image.aladin.co.kr/product/37944/74/cover200/k672033454_3.jpg",
    "description": "세계 최고 승리자 200명이 일상에서 매일 실천하는 습관과 루틴.",
    "tags": [
      "성공루틴",
      "타이탄",
      "자기계발"
    ]
  },
  {
    "id": "b-208",
    "category": "자기계발",
    "title": "데일 카네기 인간관계론",
    "author": "데일 카네기",
    "publisher": "현대지성",
    "cover": "https://image.aladin.co.kr/product/37298/6/cover200/k292031545_1.jpg",
    "description": "사람의 마음을 얻고 호감을 사며 경청과 대화로 승리하는 불후의 고전.",
    "tags": [
      "인간관계",
      "대화법",
      "소통"
    ]
  },
  {
    "id": "b-209",
    "category": "자기계발",
    "title": "기분의 태도가 되지 않게",
    "author": "레몬심리",
    "publisher": "갤러리북스",
    "cover": "https://image.aladin.co.kr/product/39790/29/cover200/k842130304_1.jpg",
    "description": "감정에 조종당하지 않고 마음의 평정심과 자신감을 유지하는 심리 기술.",
    "tags": [
      "감정조절",
      "멘탈케어",
      "심리"
    ]
  },
  {
    "id": "b-210",
    "category": "자기계발",
    "title": "신경 끄기의 기술",
    "author": "요한 하리 외",
    "publisher": "어크로스",
    "cover": "https://image.aladin.co.kr/product/39929/59/cover200/k802130129_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "집중력"
    ]
  },
  {
    "id": "b-211",
    "category": "자기계발",
    "title": "마인드셋",
    "author": "앤절라 덕워스 외",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/38537/5/cover200/k732135332_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "열정"
    ]
  },
  {
    "id": "b-212",
    "category": "자기계발",
    "title": "초집중",
    "author": "세이노 외",
    "publisher": "데이원",
    "cover": "https://image.aladin.co.kr/product/38816/95/cover200/k382137182_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "인생조언"
    ]
  },
  {
    "id": "b-213",
    "category": "자기계발",
    "title": "콰이어트",
    "author": "할 엘로드 외",
    "publisher": "한빛비즈",
    "cover": "https://image.aladin.co.kr/product/39945/12/cover200/8901300311_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "아침루틴"
    ]
  },
  {
    "id": "b-214",
    "category": "자기계발",
    "title": "회복탄력성",
    "author": "하와이의호아 외",
    "publisher": "웅진지식하우스",
    "cover": "https://image.aladin.co.kr/product/37480/92/cover200/k252032010_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "무의식"
    ]
  },
  {
    "id": "b-215",
    "category": "자기계발",
    "title": "설득의 심리학",
    "author": "게리 켈러 외",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/39991/62/cover200/k072130930_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "몰입"
    ]
  },
  {
    "id": "b-216",
    "category": "자기계발",
    "title": "설득의 프레임",
    "author": "팀 페리스 외",
    "publisher": "토네이도",
    "cover": "https://image.aladin.co.kr/product/39656/35/cover200/k292130198_3.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "성공루틴"
    ]
  },
  {
    "id": "b-217",
    "category": "자기계발",
    "title": "타인의 시선에서 자유로워지는 법",
    "author": "데일 카네기 외",
    "publisher": "현대지성",
    "cover": "https://image.aladin.co.kr/product/39895/66/cover200/k092130825_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "인간관계"
    ]
  },
  {
    "id": "b-218",
    "category": "자기계발",
    "title": "네 안에 잠든 거인을 깨워라",
    "author": "레몬심리 외",
    "publisher": "갤러리북스",
    "cover": "https://image.aladin.co.kr/product/39872/77/cover200/k742130313_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "감정조절"
    ]
  },
  {
    "id": "b-219",
    "category": "자기계발",
    "title": "지금 당신의 습관을 바꾸라",
    "author": "요한 하리 외",
    "publisher": "어크로스",
    "cover": "https://image.aladin.co.kr/product/39782/23/cover200/k192130202_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "집중력"
    ]
  },
  {
    "id": "b-220",
    "category": "자기계발",
    "title": "포커스",
    "author": "앤절라 덕워스 외",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/38895/53/cover200/k602137608_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "열정"
    ]
  },
  {
    "id": "b-221",
    "category": "자기계발",
    "title": "생각이 너무 많은 사람들을 위한 책",
    "author": "세이노 외",
    "publisher": "데이원",
    "cover": "https://image.aladin.co.kr/product/39608/96/cover200/k552130873_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "인생조언"
    ]
  },
  {
    "id": "b-222",
    "category": "자기계발",
    "title": "자존감 수업",
    "author": "할 엘로드 외",
    "publisher": "한빛비즈",
    "cover": "https://image.aladin.co.kr/product/37944/74/cover200/k672033454_3.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "아침루틴"
    ]
  },
  {
    "id": "b-223",
    "category": "자기계발",
    "title": "마음의 힘",
    "author": "하와이의호아 외",
    "publisher": "웅진지식하우스",
    "cover": "https://image.aladin.co.kr/product/37298/6/cover200/k292031545_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "무의식"
    ]
  },
  {
    "id": "b-224",
    "category": "자기계발",
    "title": "감정 수업",
    "author": "게리 켈러 외",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/39790/29/cover200/k842130304_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "몰입"
    ]
  },
  {
    "id": "b-225",
    "category": "자기계발",
    "title": "어떻게 살 것인가",
    "author": "팀 페리스 외",
    "publisher": "토네이도",
    "cover": "https://image.aladin.co.kr/product/39929/59/cover200/k802130129_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "성공루틴"
    ]
  },
  {
    "id": "b-226",
    "category": "자기계발",
    "title": "나를 만드는 일상의 기술",
    "author": "데일 카네기 외",
    "publisher": "현대지성",
    "cover": "https://image.aladin.co.kr/product/38537/5/cover200/k732135332_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "인간관계"
    ]
  },
  {
    "id": "b-227",
    "category": "자기계발",
    "title": "성공하는 사람들의 7가지 습관",
    "author": "레몬심리 외",
    "publisher": "갤러리북스",
    "cover": "https://image.aladin.co.kr/product/38816/95/cover200/k382137182_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "감정조절"
    ]
  },
  {
    "id": "b-228",
    "category": "자기계발",
    "title": "초효율성",
    "author": "요한 하리 외",
    "publisher": "어크로스",
    "cover": "https://image.aladin.co.kr/product/39945/12/cover200/8901300311_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "집중력"
    ]
  },
  {
    "id": "b-229",
    "category": "자기계발",
    "title": "의지력의 재발견",
    "author": "앤절라 덕워스 외",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/37480/92/cover200/k252032010_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "열정"
    ]
  },
  {
    "id": "b-230",
    "category": "자기계발",
    "title": "몰입 (Flow)",
    "author": "세이노 외",
    "publisher": "데이원",
    "cover": "https://image.aladin.co.kr/product/39991/62/cover200/k072130930_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "인생조언"
    ]
  },
  {
    "id": "b-231",
    "category": "자기계발",
    "title": "시간 관리의 기술",
    "author": "할 엘로드 외",
    "publisher": "한빛비즈",
    "cover": "https://image.aladin.co.kr/product/39656/35/cover200/k292130198_3.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "아침루틴"
    ]
  },
  {
    "id": "b-232",
    "category": "자기계발",
    "title": "인생의 바닥에서 올라오는 법",
    "author": "하와이의호아 외",
    "publisher": "웅진지식하우스",
    "cover": "https://image.aladin.co.kr/product/39895/66/cover200/k092130825_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "무의식"
    ]
  },
  {
    "id": "b-233",
    "category": "자기계발",
    "title": "나를 바로잡는 생각 습관",
    "author": "게리 켈러 외",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/39872/77/cover200/k742130313_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "몰입"
    ]
  },
  {
    "id": "b-234",
    "category": "자기계발",
    "title": "긍정의 에너지",
    "author": "팀 페리스 외",
    "publisher": "토네이도",
    "cover": "https://image.aladin.co.kr/product/39782/23/cover200/k192130202_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "성공루틴"
    ]
  },
  {
    "id": "b-235",
    "category": "자기계발",
    "title": "미니멀 라이프",
    "author": "데일 카네기 외",
    "publisher": "현대지성",
    "cover": "https://image.aladin.co.kr/product/38895/53/cover200/k602137608_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "인간관계"
    ]
  },
  {
    "id": "b-236",
    "category": "자기계발",
    "title": "언어의 온도",
    "author": "레몬심리 외",
    "publisher": "갤러리북스",
    "cover": "https://image.aladin.co.kr/product/39608/96/cover200/k552130873_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "감정조절"
    ]
  },
  {
    "id": "b-237",
    "category": "자기계발",
    "title": "말의 품격",
    "author": "요한 하리 외",
    "publisher": "어크로스",
    "cover": "https://image.aladin.co.kr/product/37944/74/cover200/k672033454_3.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "집중력"
    ]
  },
  {
    "id": "b-238",
    "category": "자기계발",
    "title": "대화의 기술",
    "author": "앤절라 덕워스 외",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/37298/6/cover200/k292031545_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "열정"
    ]
  },
  {
    "id": "b-239",
    "category": "자기계발",
    "title": "경청의 힘",
    "author": "세이노 외",
    "publisher": "데이원",
    "cover": "https://image.aladin.co.kr/product/39790/29/cover200/k842130304_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "인생조언"
    ]
  },
  {
    "id": "b-240",
    "category": "자기계발",
    "title": "감정의 연금술",
    "author": "할 엘로드 외",
    "publisher": "한빛비즈",
    "cover": "https://image.aladin.co.kr/product/39929/59/cover200/k802130129_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "아침루틴"
    ]
  },
  {
    "id": "b-241",
    "category": "자기계발",
    "title": "나는 당신이 타인의 눈치를 보지 않고 살았으면 좋겠습니다",
    "author": "하와이의호아 외",
    "publisher": "웅진지식하우스",
    "cover": "https://image.aladin.co.kr/product/38537/5/cover200/k732135332_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "무의식"
    ]
  },
  {
    "id": "b-242",
    "category": "자기계발",
    "title": "내면의 평화",
    "author": "게리 켈러 외",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/38816/95/cover200/k382137182_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "몰입"
    ]
  },
  {
    "id": "b-243",
    "category": "자기계발",
    "title": "매일 매일 성장하기",
    "author": "팀 페리스 외",
    "publisher": "토네이도",
    "cover": "https://image.aladin.co.kr/product/39945/12/cover200/8901300311_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "성공루틴"
    ]
  },
  {
    "id": "b-244",
    "category": "자기계발",
    "title": "감사 일기의 기적",
    "author": "데일 카네기 외",
    "publisher": "현대지성",
    "cover": "https://image.aladin.co.kr/product/37480/92/cover200/k252032010_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "인간관계"
    ]
  },
  {
    "id": "b-245",
    "category": "자기계발",
    "title": "목표 달성의 기술",
    "author": "레몬심리 외",
    "publisher": "갤러리북스",
    "cover": "https://image.aladin.co.kr/product/39991/62/cover200/k072130930_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "감정조절"
    ]
  },
  {
    "id": "b-246",
    "category": "자기계발",
    "title": "스트레스 조절법",
    "author": "요한 하리 외",
    "publisher": "어크로스",
    "cover": "https://image.aladin.co.kr/product/39656/35/cover200/k292130198_3.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "집중력"
    ]
  },
  {
    "id": "b-247",
    "category": "자기계발",
    "title": "번아웃 극복법",
    "author": "앤절라 덕워스 외",
    "publisher": "비즈니스북스",
    "cover": "https://image.aladin.co.kr/product/39895/66/cover200/k092130825_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "열정"
    ]
  },
  {
    "id": "b-248",
    "category": "자기계발",
    "title": "멘탈 관리 마스터 클래스",
    "author": "세이노 외",
    "publisher": "데이원",
    "cover": "https://image.aladin.co.kr/product/39872/77/cover200/k742130313_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "인생조언"
    ]
  },
  {
    "id": "b-249",
    "category": "자기계발",
    "title": "시간의 부자 되기",
    "author": "할 엘로드 외",
    "publisher": "한빛비즈",
    "cover": "https://image.aladin.co.kr/product/39782/23/cover200/k192130202_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "아침루틴"
    ]
  },
  {
    "id": "b-250",
    "category": "자기계발",
    "title": "신경 끄기의 기술",
    "author": "하와이의호아 외",
    "publisher": "웅진지식하우스",
    "cover": "https://image.aladin.co.kr/product/38895/53/cover200/k602137608_1.jpg",
    "description": "자기계발 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "자기계발",
      "추천도서",
      "무의식"
    ]
  },
  {
    "id": "b-301",
    "category": "인문학",
    "title": "사피엔스 (Sapiens)",
    "author": "유발 하라리",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/39640/49/cover200/k872130175_1.jpg",
    "description": "유인원에서 사이보그까지, 인류 역사를 일구어낸 상상력과 인지혁명의 서사시.",
    "tags": [
      "인류학",
      "역사",
      "문명"
    ]
  },
  {
    "id": "b-302",
    "category": "인문학",
    "title": "총 균 쇠 (Guns, Germs, and Steel)",
    "author": "재레드 다이아몬드",
    "publisher": "문학사상",
    "cover": "https://image.aladin.co.kr/product/39940/12/cover200/8932476462_2.jpg",
    "description": "무기, 병균, 금속이 문명의 성패와 불평등한 대륙의 destiny를 갈랐다.",
    "tags": [
      "인류문명",
      "지리학",
      "역사"
    ]
  },
  {
    "id": "b-303",
    "category": "인문학",
    "title": "니체의 말",
    "author": "프리드리히 니체 / 시라토리 하루히코",
    "publisher": "삼호미디어",
    "cover": "https://image.aladin.co.kr/product/36239/0/cover200/k062038716_2.jpg",
    "description": "인생의 위기와 방황 앞에서 자아를 일깨우는 철학자의 뜨거운 언어.",
    "tags": [
      "철학",
      "니체",
      "자아"
    ]
  },
  {
    "id": "b-304",
    "category": "인문학",
    "title": "소크라테스의 변명",
    "author": "플라톤",
    "publisher": "돋을볕",
    "cover": "https://image.aladin.co.kr/product/68/68/cover200/s262036392_1.jpg",
    "description": "진리와 정의, 철학적 삶에 대한 성찰을 담은 서양 고전 서양철학의 뼈대.",
    "tags": [
      "고전",
      "서양철학",
      "소크라테스"
    ]
  },
  {
    "id": "b-305",
    "category": "인문학",
    "title": "군주론",
    "author": "니콜로 마키아벨리",
    "publisher": "까치",
    "cover": "https://image.aladin.co.kr/product/37539/55/cover200/k392032120_1.jpg",
    "description": "권력의 속성과 냉혹한 정치적 현실주의를 직시한 르네상스의 사상적 명저.",
    "tags": [
      "정치철학",
      "마키아벨리",
      "권력"
    ]
  },
  {
    "id": "b-306",
    "category": "인문학",
    "title": "에디슨의 수첩",
    "author": "토머스 에디슨",
    "publisher": "더숲",
    "cover": "https://image.aladin.co.kr/product/32444/10/cover200/k052935299_3.jpg",
    "description": "위대한 발명가의 기록 속에서 엿보는 영감과 통찰의 인문학적 노트.",
    "tags": [
      "아이디어",
      "창의성",
      "노트"
    ]
  },
  {
    "id": "b-307",
    "category": "인문학",
    "title": "장자 (莊子)",
    "author": "장자",
    "publisher": "전통문화연구회",
    "cover": "https://image.aladin.co.kr/product/39790/34/cover200/k072130305_1.jpg",
    "description": "자연의 이치와 절대 자유를 노래한 동양 철학의 경이로운 우화 모음.",
    "tags": [
      "동양철학",
      "장자",
      "자연"
    ]
  },
  {
    "id": "b-308",
    "category": "인문학",
    "title": "국가 (Republic)",
    "author": "플라톤",
    "publisher": "아카넷",
    "cover": "https://image.aladin.co.kr/product/39876/18/cover200/k752130413_2.jpg",
    "description": "이상국가와 정의의 본질, 동굴의 비유를 다룬 인류 철학의 정수.",
    "tags": [
      "플라톤",
      "정의론",
      "철학고전"
    ]
  },
  {
    "id": "b-309",
    "category": "인문학",
    "title": "코스모스",
    "author": "유발 하라리 외",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/39656/35/cover200/k292130198_3.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "인류학"
    ]
  },
  {
    "id": "b-310",
    "category": "인문학",
    "title": "이기적 유전자",
    "author": "재레드 다이아몬드 외",
    "publisher": "문학사상",
    "cover": "https://image.aladin.co.kr/product/39895/66/cover200/k092130825_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "인류문명"
    ]
  },
  {
    "id": "b-311",
    "category": "인문학",
    "title": "자유론",
    "author": "프리드리히 니체 / 시라토리 하루히코 외",
    "publisher": "삼호미디어",
    "cover": "https://image.aladin.co.kr/product/39715/59/cover200/8965138310_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "철학"
    ]
  },
  {
    "id": "b-312",
    "category": "인문학",
    "title": "성찰",
    "author": "플라톤 외",
    "publisher": "돋을볕",
    "cover": "https://image.aladin.co.kr/product/39872/77/cover200/k742130313_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "고전"
    ]
  },
  {
    "id": "b-313",
    "category": "인문학",
    "title": "순수이성비판",
    "author": "니콜로 마키아벨리 외",
    "publisher": "까치",
    "cover": "https://image.aladin.co.kr/product/36244/35/cover200/k852038210_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "정치철학"
    ]
  },
  {
    "id": "b-314",
    "category": "인문학",
    "title": "실천이성비판",
    "author": "토머스 에디슨 외",
    "publisher": "더숲",
    "cover": "https://image.aladin.co.kr/product/39834/86/cover200/k162130339_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "아이디어"
    ]
  },
  {
    "id": "b-315",
    "category": "인문학",
    "title": "방법서설",
    "author": "장자 외",
    "publisher": "전통문화연구회",
    "cover": "https://image.aladin.co.kr/product/39832/27/cover200/k822130810_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "동양철학"
    ]
  },
  {
    "id": "b-316",
    "category": "인문학",
    "title": "존재와 시간",
    "author": "플라톤 외",
    "publisher": "아카넷",
    "cover": "https://image.aladin.co.kr/product/39640/49/cover200/k872130175_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "플라톤"
    ]
  },
  {
    "id": "b-317",
    "category": "인문학",
    "title": "에티카",
    "author": "유발 하라리 외",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/39940/12/cover200/8932476462_2.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "인류학"
    ]
  },
  {
    "id": "b-318",
    "category": "인문학",
    "title": "정신현상학",
    "author": "재레드 다이아몬드 외",
    "publisher": "문학사상",
    "cover": "https://image.aladin.co.kr/product/36239/0/cover200/k062038716_2.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "인류문명"
    ]
  },
  {
    "id": "b-319",
    "category": "인문학",
    "title": "에밀",
    "author": "프리드리히 니체 / 시라토리 하루히코 외",
    "publisher": "삼호미디어",
    "cover": "https://image.aladin.co.kr/product/68/68/cover200/s262036392_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "철학"
    ]
  },
  {
    "id": "b-320",
    "category": "인문학",
    "title": "사회계약론",
    "author": "플라톤 외",
    "publisher": "돋을볕",
    "cover": "https://image.aladin.co.kr/product/37539/55/cover200/k392032120_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "고전"
    ]
  },
  {
    "id": "b-321",
    "category": "인문학",
    "title": "감시와 처벌",
    "author": "니콜로 마키아벨리 외",
    "publisher": "까치",
    "cover": "https://image.aladin.co.kr/product/32444/10/cover200/k052935299_3.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "정치철학"
    ]
  },
  {
    "id": "b-322",
    "category": "인문학",
    "title": "성서와 인문학",
    "author": "토머스 에디슨 외",
    "publisher": "더숲",
    "cover": "https://image.aladin.co.kr/product/39790/34/cover200/k072130305_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "아이디어"
    ]
  },
  {
    "id": "b-323",
    "category": "인문학",
    "title": "동양철학 에세이",
    "author": "장자 외",
    "publisher": "전통문화연구회",
    "cover": "https://image.aladin.co.kr/product/39876/18/cover200/k752130413_2.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "동양철학"
    ]
  },
  {
    "id": "b-324",
    "category": "인문학",
    "title": "명심보감 성찰",
    "author": "플라톤 외",
    "publisher": "아카넷",
    "cover": "https://image.aladin.co.kr/product/39656/35/cover200/k292130198_3.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "플라톤"
    ]
  },
  {
    "id": "b-325",
    "category": "인문학",
    "title": "논어강의",
    "author": "유발 하라리 외",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/39895/66/cover200/k092130825_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "인류학"
    ]
  },
  {
    "id": "b-326",
    "category": "인문학",
    "title": "맹자 읽기",
    "author": "재레드 다이아몬드 외",
    "publisher": "문학사상",
    "cover": "https://image.aladin.co.kr/product/39715/59/cover200/8965138310_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "인류문명"
    ]
  },
  {
    "id": "b-327",
    "category": "인문학",
    "title": "도덕경 깊이 읽기",
    "author": "프리드리히 니체 / 시라토리 하루히코 외",
    "publisher": "삼호미디어",
    "cover": "https://image.aladin.co.kr/product/39872/77/cover200/k742130313_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "철학"
    ]
  },
  {
    "id": "b-328",
    "category": "인문학",
    "title": "한비자 권력학",
    "author": "플라톤 외",
    "publisher": "돋을볕",
    "cover": "https://image.aladin.co.kr/product/36244/35/cover200/k852038210_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "고전"
    ]
  },
  {
    "id": "b-329",
    "category": "인문학",
    "title": "그리스 로마 신화 인문학",
    "author": "니콜로 마키아벨리 외",
    "publisher": "까치",
    "cover": "https://image.aladin.co.kr/product/39834/86/cover200/k162130339_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "정치철학"
    ]
  },
  {
    "id": "b-330",
    "category": "인문학",
    "title": "일리아스",
    "author": "토머스 에디슨 외",
    "publisher": "더숲",
    "cover": "https://image.aladin.co.kr/product/39832/27/cover200/k822130810_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "아이디어"
    ]
  },
  {
    "id": "b-331",
    "category": "인문학",
    "title": "오디세이아",
    "author": "장자 외",
    "publisher": "전통문화연구회",
    "cover": "https://image.aladin.co.kr/product/39640/49/cover200/k872130175_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "동양철학"
    ]
  },
  {
    "id": "b-332",
    "category": "인문학",
    "title": "변신이야기",
    "author": "플라톤 외",
    "publisher": "아카넷",
    "cover": "https://image.aladin.co.kr/product/39940/12/cover200/8932476462_2.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "플라톤"
    ]
  },
  {
    "id": "b-333",
    "category": "인문학",
    "title": "신곡",
    "author": "유발 하라리 외",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/36239/0/cover200/k062038716_2.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "인류학"
    ]
  },
  {
    "id": "b-334",
    "category": "인문학",
    "title": "돈키호테 철학",
    "author": "재레드 다이아몬드 외",
    "publisher": "문학사상",
    "cover": "https://image.aladin.co.kr/product/68/68/cover200/s262036392_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "인류문명"
    ]
  },
  {
    "id": "b-335",
    "category": "인문학",
    "title": "햄릿과 인류학",
    "author": "프리드리히 니체 / 시라토리 하루히코 외",
    "publisher": "삼호미디어",
    "cover": "https://image.aladin.co.kr/product/37539/55/cover200/k392032120_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "철학"
    ]
  },
  {
    "id": "b-336",
    "category": "인문학",
    "title": "파우스트 성찰",
    "author": "플라톤 외",
    "publisher": "돋을볕",
    "cover": "https://image.aladin.co.kr/product/32444/10/cover200/k052935299_3.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "고전"
    ]
  },
  {
    "id": "b-337",
    "category": "인문학",
    "title": "데카메론 이야기",
    "author": "니콜로 마키아벨리 외",
    "publisher": "까치",
    "cover": "https://image.aladin.co.kr/product/39790/34/cover200/k072130305_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "정치철학"
    ]
  },
  {
    "id": "b-338",
    "category": "인문학",
    "title": "인문학으로 읽는 미술",
    "author": "토머스 에디슨 외",
    "publisher": "더숲",
    "cover": "https://image.aladin.co.kr/product/39876/18/cover200/k752130413_2.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "아이디어"
    ]
  },
  {
    "id": "b-339",
    "category": "인문학",
    "title": "세계 역사 인문 탐구",
    "author": "장자 외",
    "publisher": "전통문화연구회",
    "cover": "https://image.aladin.co.kr/product/39656/35/cover200/k292130198_3.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "동양철학"
    ]
  },
  {
    "id": "b-340",
    "category": "인문학",
    "title": "서양 미술사 인문학",
    "author": "플라톤 외",
    "publisher": "아카넷",
    "cover": "https://image.aladin.co.kr/product/39895/66/cover200/k092130825_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "플라톤"
    ]
  },
  {
    "id": "b-341",
    "category": "인문학",
    "title": "음악의 인문학",
    "author": "유발 하라리 외",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/39715/59/cover200/8965138310_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "인류학"
    ]
  },
  {
    "id": "b-342",
    "category": "인문학",
    "title": "건축의 철학",
    "author": "재레드 다이아몬드 외",
    "publisher": "문학사상",
    "cover": "https://image.aladin.co.kr/product/39872/77/cover200/k742130313_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "인류문명"
    ]
  },
  {
    "id": "b-343",
    "category": "인문학",
    "title": "지도의 인문학",
    "author": "프리드리히 니체 / 시라토리 하루히코 외",
    "publisher": "삼호미디어",
    "cover": "https://image.aladin.co.kr/product/36244/35/cover200/k852038210_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "철학"
    ]
  },
  {
    "id": "b-344",
    "category": "인문학",
    "title": "언어와 문명의 역사",
    "author": "플라톤 외",
    "publisher": "돋을볕",
    "cover": "https://image.aladin.co.kr/product/39834/86/cover200/k162130339_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "고전"
    ]
  },
  {
    "id": "b-345",
    "category": "인문학",
    "title": "기호학이란 무엇인가",
    "author": "니콜로 마키아벨리 외",
    "publisher": "까치",
    "cover": "https://image.aladin.co.kr/product/39832/27/cover200/k822130810_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "정치철학"
    ]
  },
  {
    "id": "b-346",
    "category": "인문학",
    "title": "신화의 힘",
    "author": "토머스 에디슨 외",
    "publisher": "더숲",
    "cover": "https://image.aladin.co.kr/product/39640/49/cover200/k872130175_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "아이디어"
    ]
  },
  {
    "id": "b-347",
    "category": "인문학",
    "title": "비교종교학 에세이",
    "author": "장자 외",
    "publisher": "전통문화연구회",
    "cover": "https://image.aladin.co.kr/product/39940/12/cover200/8932476462_2.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "동양철학"
    ]
  },
  {
    "id": "b-348",
    "category": "인문학",
    "title": "문명의 충돌",
    "author": "플라톤 외",
    "publisher": "아카넷",
    "cover": "https://image.aladin.co.kr/product/36239/0/cover200/k062038716_2.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "플라톤"
    ]
  },
  {
    "id": "b-349",
    "category": "인문학",
    "title": "역사란 무엇인가",
    "author": "유발 하라리 외",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/68/68/cover200/s262036392_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "인류학"
    ]
  },
  {
    "id": "b-350",
    "category": "인문학",
    "title": "인간의 조건",
    "author": "재레드 다이아몬드 외",
    "publisher": "문학사상",
    "cover": "https://image.aladin.co.kr/product/37539/55/cover200/k392032120_1.jpg",
    "description": "인문학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "인문학",
      "추천도서",
      "인류문명"
    ]
  },
  {
    "id": "b-401",
    "category": "IT/컴퓨터",
    "title": "클린 코드 (Clean Code)",
    "author": "로버트 C. 마틴",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/39703/87/cover200/k172130496_1.jpg",
    "description": "애자일 소프트웨어 혁명가 Uncle Bob이 전하는 가독성 높은 우수한 코드 작성법.",
    "tags": [
      "클린코드",
      "소프트웨어",
      "프로그래밍"
    ]
  },
  {
    "id": "b-402",
    "category": "IT/컴퓨터",
    "title": "파이썬 코딩의 기술 (Effective Python)",
    "author": "브렛 슬랫킨",
    "publisher": "길벗",
    "cover": "https://image.aladin.co.kr/product/39243/86/cover200/k182138105_1.jpg",
    "description": "파이썬답게 프로그래밍하는 90가지 핵심 모범 사례와 디자인 패턴.",
    "tags": [
      "파이썬",
      "코딩기술",
      "개발자"
    ]
  },
  {
    "id": "b-403",
    "category": "IT/컴퓨터",
    "title": "생성형 AI 시대의 파이썬 딥러닝",
    "author": "프랑수아 숄레",
    "publisher": "한빛미디어",
    "cover": "https://image.aladin.co.kr/product/39929/3/cover200/k992130128_1.jpg",
    "description": "Keras 창시자가 직접 집필한 딥러닝과 인공지능 실전 가이드북.",
    "tags": [
      "생성형AI",
      "딥러닝",
      "인공지능"
    ]
  },
  {
    "id": "b-404",
    "category": "IT/컴퓨터",
    "title": "리팩터링 2판 (Refactoring)",
    "author": "마틴 파울러",
    "publisher": "한빛미디어",
    "cover": "https://image.aladin.co.kr/product/37926/0/cover200/k902033034_3.jpg",
    "description": "코드 구조를 안전하게 개선하여 유지보수성과 품질을 바꾸는 필수 전략.",
    "tags": [
      "리팩터링",
      "코드개선",
      "아키텍처"
    ]
  },
  {
    "id": "b-405",
    "category": "IT/컴퓨터",
    "title": "디자인 패턴 (GoF Design Patterns)",
    "author": "에릭 감마 외",
    "publisher": "텍스트북스",
    "cover": "https://image.aladin.co.kr/product/38808/31/cover200/k552137982_1.jpg",
    "description": "객체지향 소프트웨어 설계의 거장들이 전하는 23가지 검증된 구조 패턴.",
    "tags": [
      "디자인패턴",
      "객체지향",
      "SW설계"
    ]
  },
  {
    "id": "b-406",
    "category": "IT/컴퓨터",
    "title": "가상 면접 사례로 배우는 대규모 시스템 설계 기초",
    "author": "알렉스 쉬",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/38933/28/cover200/k632137911_1.jpg",
    "description": "분산 시스템, 분산 캐시, 메시지 큐 등 대용량 트래픽 설계 패러다임.",
    "tags": [
      "시스템설계",
      "대규모트래픽",
      "아키텍처"
    ]
  },
  {
    "id": "b-407",
    "category": "IT/컴퓨터",
    "title": "프론트엔드 성능 최적화 가이드",
    "author": "유동균",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/28819/83/cover200/s292938843_1.jpg",
    "description": "웹 렌더링, 로딩 속도, 코어 웹 바이탈(CWV) 개선을 위한 실전 테크닉.",
    "tags": [
      "프론트엔드",
      "성능최적화",
      "웹개발"
    ]
  },
  {
    "id": "b-408",
    "category": "IT/컴퓨터",
    "title": "DO IT! 점프 투 파이썬",
    "author": "박응용",
    "publisher": "이지스퍼블리싱",
    "cover": "https://image.aladin.co.kr/product/39164/91/cover200/k982138963_3.jpg",
    "description": "대한민국 수백만 입문자가 선택한 파이썬 프로그래밍 베스트셀러 입문서.",
    "tags": [
      "파이썬입문",
      "코딩기초",
      "프로그래밍"
    ]
  },
  {
    "id": "b-409",
    "category": "IT/컴퓨터",
    "title": "인공지능의 미래",
    "author": "로버트 C. 마틴 외",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/39938/49/cover200/k382130220_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "클린코드"
    ]
  },
  {
    "id": "b-410",
    "category": "IT/컴퓨터",
    "title": "알고리즘 문제 해결 전략",
    "author": "브렛 슬랫킨 외",
    "publisher": "길벗",
    "cover": "https://image.aladin.co.kr/product/39607/82/cover200/k212130871_2.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "파이썬"
    ]
  },
  {
    "id": "b-411",
    "category": "IT/컴퓨터",
    "title": "컴퓨터 구조 및 설계",
    "author": "프랑수아 숄레 외",
    "publisher": "한빛미디어",
    "cover": "https://image.aladin.co.kr/product/39904/96/cover200/k802130926_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "생성형AI"
    ]
  },
  {
    "id": "b-412",
    "category": "IT/컴퓨터",
    "title": "운영체제 아주 쉬운 세 가지 이야기",
    "author": "마틴 파울러 외",
    "publisher": "한빛미디어",
    "cover": "https://image.aladin.co.kr/product/39875/18/cover200/k412130410_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "리팩터링"
    ]
  },
  {
    "id": "b-413",
    "category": "IT/컴퓨터",
    "title": "데이터베이스 개론",
    "author": "에릭 감마 외 외",
    "publisher": "텍스트북스",
    "cover": "https://image.aladin.co.kr/product/39872/39/cover200/k772130312_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "디자인패턴"
    ]
  },
  {
    "id": "b-414",
    "category": "IT/컴퓨터",
    "title": "클린 아키텍처",
    "author": "알렉스 쉬 외",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/38931/87/cover200/k032137816_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "시스템설계"
    ]
  },
  {
    "id": "b-415",
    "category": "IT/컴퓨터",
    "title": "도메인 주도 설계 (DDD)",
    "author": "유동균 외",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/39929/51/cover200/8962627205_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "프론트엔드"
    ]
  },
  {
    "id": "b-416",
    "category": "IT/컴퓨터",
    "title": "테스트 주도 개발 (TDD)",
    "author": "박응용 외",
    "publisher": "이지스퍼블리싱",
    "cover": "https://image.aladin.co.kr/product/39703/87/cover200/k172130496_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "파이썬입문"
    ]
  },
  {
    "id": "b-417",
    "category": "IT/컴퓨터",
    "title": "Pragmatic Programmer",
    "author": "로버트 C. 마틴 외",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/39243/86/cover200/k182138105_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "클린코드"
    ]
  },
  {
    "id": "b-418",
    "category": "IT/컴퓨터",
    "title": "코드 리딩",
    "author": "브렛 슬랫킨 외",
    "publisher": "길벗",
    "cover": "https://image.aladin.co.kr/product/39929/3/cover200/k992130128_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "파이썬"
    ]
  },
  {
    "id": "b-419",
    "category": "IT/컴퓨터",
    "title": "Do it! HTML+CSS+자바스크립트",
    "author": "프랑수아 숄레 외",
    "publisher": "한빛미디어",
    "cover": "https://image.aladin.co.kr/product/37926/0/cover200/k902033034_3.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "생성형AI"
    ]
  },
  {
    "id": "b-420",
    "category": "IT/컴퓨터",
    "title": "모던 자바스크립트 Deep Dive",
    "author": "마틴 파울러 외",
    "publisher": "한빛미디어",
    "cover": "https://image.aladin.co.kr/product/38808/31/cover200/k552137982_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "리팩터링"
    ]
  },
  {
    "id": "b-421",
    "category": "IT/컴퓨터",
    "title": "리액트 리액트 19 가이드",
    "author": "에릭 감마 외 외",
    "publisher": "텍스트북스",
    "cover": "https://image.aladin.co.kr/product/38933/28/cover200/k632137911_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "디자인패턴"
    ]
  },
  {
    "id": "b-422",
    "category": "IT/컴퓨터",
    "title": "Next.js 완벽 가이드",
    "author": "알렉스 쉬 외",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/28819/83/cover200/s292938843_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "시스템설계"
    ]
  },
  {
    "id": "b-423",
    "category": "IT/컴퓨터",
    "title": "타입스크립트 교과서",
    "author": "유동균 외",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/39164/91/cover200/k982138963_3.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "프론트엔드"
    ]
  },
  {
    "id": "b-424",
    "category": "IT/컴퓨터",
    "title": "Node.js 백엔드 프로그래밍",
    "author": "박응용 외",
    "publisher": "이지스퍼블리싱",
    "cover": "https://image.aladin.co.kr/product/39938/49/cover200/k382130220_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "파이썬입문"
    ]
  },
  {
    "id": "b-425",
    "category": "IT/컴퓨터",
    "title": "스프링 부트 실전 가이드",
    "author": "로버트 C. 마틴 외",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/39607/82/cover200/k212130871_2.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "클린코드"
    ]
  },
  {
    "id": "b-426",
    "category": "IT/컴퓨터",
    "title": "쿠버네티스 입문",
    "author": "브렛 슬랫킨 외",
    "publisher": "길벗",
    "cover": "https://image.aladin.co.kr/product/39904/96/cover200/k802130926_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "파이썬"
    ]
  },
  {
    "id": "b-427",
    "category": "IT/컴퓨터",
    "title": "도커 실전 프로젝트",
    "author": "프랑수아 숄레 외",
    "publisher": "한빛미디어",
    "cover": "https://image.aladin.co.kr/product/39875/18/cover200/k412130410_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "생성형AI"
    ]
  },
  {
    "id": "b-428",
    "category": "IT/컴퓨터",
    "title": "AWS 클라우드 아키텍처",
    "author": "마틴 파울러 외",
    "publisher": "한빛미디어",
    "cover": "https://image.aladin.co.kr/product/39872/39/cover200/k772130312_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "리팩터링"
    ]
  },
  {
    "id": "b-429",
    "category": "IT/컴퓨터",
    "title": "사이버 보안 입문",
    "author": "에릭 감마 외 외",
    "publisher": "텍스트북스",
    "cover": "https://image.aladin.co.kr/product/38931/87/cover200/k032137816_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "디자인패턴"
    ]
  },
  {
    "id": "b-430",
    "category": "IT/컴퓨터",
    "title": "네트워크 하향식 접근",
    "author": "알렉스 쉬 외",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/39929/51/cover200/8962627205_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "시스템설계"
    ]
  },
  {
    "id": "b-431",
    "category": "IT/컴퓨터",
    "title": "컴퓨터 비전과 OpenCV",
    "author": "유동균 외",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/39703/87/cover200/k172130496_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "프론트엔드"
    ]
  },
  {
    "id": "b-432",
    "category": "IT/컴퓨터",
    "title": "자연어 처리 (NLP) 서바이벌",
    "author": "박응용 외",
    "publisher": "이지스퍼블리싱",
    "cover": "https://image.aladin.co.kr/product/39243/86/cover200/k182138105_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "파이썬입문"
    ]
  },
  {
    "id": "b-433",
    "category": "IT/컴퓨터",
    "title": "LLM 엔지니어링",
    "author": "로버트 C. 마틴 외",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/39929/3/cover200/k992130128_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "클린코드"
    ]
  },
  {
    "id": "b-434",
    "category": "IT/컴퓨터",
    "title": "프롬프트 엔지니어링 가이드",
    "author": "브렛 슬랫킨 외",
    "publisher": "길벗",
    "cover": "https://image.aladin.co.kr/product/37926/0/cover200/k902033034_3.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "파이썬"
    ]
  },
  {
    "id": "b-435",
    "category": "IT/컴퓨터",
    "title": "LangChain과 AI 앱 개발",
    "author": "프랑수아 숄레 외",
    "publisher": "한빛미디어",
    "cover": "https://image.aladin.co.kr/product/38808/31/cover200/k552137982_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "생성형AI"
    ]
  },
  {
    "id": "b-436",
    "category": "IT/컴퓨터",
    "title": "RAG 아키텍처 실전",
    "author": "마틴 파울러 외",
    "publisher": "한빛미디어",
    "cover": "https://image.aladin.co.kr/product/38933/28/cover200/k632137911_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "리팩터링"
    ]
  },
  {
    "id": "b-437",
    "category": "IT/컴퓨터",
    "title": "퀀텀 컴퓨팅의 미래",
    "author": "에릭 감마 외 외",
    "publisher": "텍스트북스",
    "cover": "https://image.aladin.co.kr/product/28819/83/cover200/s292938843_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "디자인패턴"
    ]
  },
  {
    "id": "b-438",
    "category": "IT/컴퓨터",
    "title": "블록체인 구조와 원리",
    "author": "알렉스 쉬 외",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/39164/91/cover200/k982138963_3.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "시스템설계"
    ]
  },
  {
    "id": "b-439",
    "category": "IT/컴퓨터",
    "title": "러스트 프로그래밍 입문",
    "author": "유동균 외",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/39938/49/cover200/k382130220_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "프론트엔드"
    ]
  },
  {
    "id": "b-440",
    "category": "IT/컴퓨터",
    "title": "Go 언어 프로그래밍",
    "author": "박응용 외",
    "publisher": "이지스퍼블리싱",
    "cover": "https://image.aladin.co.kr/product/39607/82/cover200/k212130871_2.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "파이썬입문"
    ]
  },
  {
    "id": "b-441",
    "category": "IT/컴퓨터",
    "title": "Kotlin 인 액션",
    "author": "로버트 C. 마틴 외",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/39904/96/cover200/k802130926_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "클린코드"
    ]
  },
  {
    "id": "b-442",
    "category": "IT/컴퓨터",
    "title": "SwiftUI 앱 개발",
    "author": "브렛 슬랫킨 외",
    "publisher": "길벗",
    "cover": "https://image.aladin.co.kr/product/39875/18/cover200/k412130410_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "파이썬"
    ]
  },
  {
    "id": "b-443",
    "category": "IT/컴퓨터",
    "title": "Flutter 모바일 앱 개발",
    "author": "프랑수아 숄레 외",
    "publisher": "한빛미디어",
    "cover": "https://image.aladin.co.kr/product/39872/39/cover200/k772130312_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "생성형AI"
    ]
  },
  {
    "id": "b-444",
    "category": "IT/컴퓨터",
    "title": "게임 엔진과 유니티",
    "author": "마틴 파울러 외",
    "publisher": "한빛미디어",
    "cover": "https://image.aladin.co.kr/product/38931/87/cover200/k032137816_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "리팩터링"
    ]
  },
  {
    "id": "b-445",
    "category": "IT/컴퓨터",
    "title": "언리얼 엔진 5 그래픽스",
    "author": "에릭 감마 외 외",
    "publisher": "텍스트북스",
    "cover": "https://image.aladin.co.kr/product/39929/51/cover200/8962627205_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "디자인패턴"
    ]
  },
  {
    "id": "b-446",
    "category": "IT/컴퓨터",
    "title": "웹 3.0 개발 입문",
    "author": "알렉스 쉬 외",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/39703/87/cover200/k172130496_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "시스템설계"
    ]
  },
  {
    "id": "b-447",
    "category": "IT/컴퓨터",
    "title": "데이터 엔지니어링 실무",
    "author": "유동균 외",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/39243/86/cover200/k182138105_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "프론트엔드"
    ]
  },
  {
    "id": "b-448",
    "category": "IT/컴퓨터",
    "title": "MLOps 파이프라인 구축",
    "author": "박응용 외",
    "publisher": "이지스퍼블리싱",
    "cover": "https://image.aladin.co.kr/product/39929/3/cover200/k992130128_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "파이썬입문"
    ]
  },
  {
    "id": "b-449",
    "category": "IT/컴퓨터",
    "title": "빅데이터 분석과 스파크",
    "author": "로버트 C. 마틴 외",
    "publisher": "인사이트",
    "cover": "https://image.aladin.co.kr/product/37926/0/cover200/k902033034_3.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "클린코드"
    ]
  },
  {
    "id": "b-450",
    "category": "IT/컴퓨터",
    "title": "SQL 첫걸음",
    "author": "브렛 슬랫킨 외",
    "publisher": "길벗",
    "cover": "https://image.aladin.co.kr/product/38808/31/cover200/k552137982_1.jpg",
    "description": "IT/컴퓨터 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "IT/컴퓨터",
      "추천도서",
      "파이썬"
    ]
  },
  {
    "id": "b-501",
    "category": "소설/시/희곡",
    "title": "작별하지 않는다",
    "author": "한강",
    "publisher": "문학동네",
    "cover": "https://image.aladin.co.kr/product/32/95/cover200/s062934786_1.jpg",
    "description": "2024 노벨문학상 수상자 한강의 벼려진 슬픔과 끈질긴 지극한 사랑의 기억.",
    "tags": [
      "노벨문학상",
      "한강",
      "한국소설"
    ]
  },
  {
    "id": "b-502",
    "category": "소설/시/희곡",
    "title": "구의 증명",
    "author": "최진영",
    "publisher": "은행나무",
    "cover": "https://image.aladin.co.kr/product/40013/75/cover200/8936439995_1.jpg",
    "description": "상실과 애도, 상처 속에서도 끝내 서로를 놓지 못하는 지독하고 아름다운 사랑 이야기.",
    "tags": [
      "베스트셀러",
      "감성소설",
      "연애"
    ]
  },
  {
    "id": "b-503",
    "category": "소설/시/희곡",
    "title": "불편한 편의점",
    "author": "김호연",
    "publisher": "나무옆의의자",
    "cover": "https://image.aladin.co.kr/product/39802/11/cover200/k082130602_3.jpg",
    "description": "청파동 골목길 편의점에서 지친 이들의 마음을 다스리는 따스한 힐링 드라마.",
    "tags": [
      "힐링소설",
      "일상문학",
      "휴머니즘"
    ]
  },
  {
    "id": "b-504",
    "category": "소설/시/희곡",
    "title": "모순 (Contradiction)",
    "author": "양귀자",
    "publisher": "쓰다",
    "cover": "https://image.aladin.co.kr/product/39679/83/cover200/8925568640_1.jpg",
    "description": "인생은 탐구하는 것이 아니라 걸어가는 것이다. 인간 심리의 정교한 포착.",
    "tags": [
      "인생문학",
      "양귀자",
      "스테디셀러"
    ]
  },
  {
    "id": "b-505",
    "category": "소설/시/희곡",
    "title": "달러구트 꿈 백화점",
    "author": "이미예",
    "publisher": "팩토리나인",
    "cover": "https://image.aladin.co.kr/product/39987/24/cover200/k512130727_3.jpg",
    "description": "잠들어야만 입장이 가능한 신비로운 꿈 백화점에서 일어나는 환상적 힐링 서사.",
    "tags": [
      "판타지",
      "꿈백화점",
      "힐링"
    ]
  },
  {
    "id": "b-506",
    "category": "소설/시/희곡",
    "title": "이방인 (L'Étranger)",
    "author": "알베르 카뮈",
    "publisher": "민음사",
    "cover": "https://image.aladin.co.kr/product/33081/18/cover200/k582937507_1.jpg",
    "description": "햇빛 때문에 살인을 저지른 뫼르소. 부조리한 세상을 향한 서늘하고 명징한 선언.",
    "tags": [
      "부조리",
      "카뮈",
      "세계문학"
    ]
  },
  {
    "id": "b-507",
    "category": "소설/시/희곡",
    "title": "1984 (Nineteen Eighty-Four)",
    "author": "조지 오웰",
    "publisher": "민음사",
    "cover": "https://image.aladin.co.kr/product/39872/66/cover200/k242130313_1.jpg",
    "description": "빅브라더의 감시와 언어 통제 속에서 자유를 꿈꾸는 인간 실존의 디스토피아.",
    "tags": [
      "디스토피아",
      "조지오웰",
      "고전명작"
    ]
  },
  {
    "id": "b-508",
    "category": "소설/시/희곡",
    "title": "데미안 (Demian)",
    "author": "헤르만 헤세",
    "publisher": "민음사",
    "cover": "https://image.aladin.co.kr/product/39639/79/cover200/k992130174_2.jpg",
    "description": "새는 알에서 나오기 위해 투쟁한다. 자기 자신에게로 이르는 청춘의 성장 소설.",
    "tags": [
      "성장소설",
      "헤르만헤세",
      "청춘"
    ]
  },
  {
    "id": "b-509",
    "category": "소설/시/희곡",
    "title": "어린 왕자 (Le Petit Prince)",
    "author": "앙투안 드 생텍쥐페리",
    "publisher": "열린책들",
    "cover": "https://image.aladin.co.kr/product/68/68/cover200/s262036392_1.jpg",
    "description": "가장 중요한 것은 눈에 보이지 않아. 사막에서 만난 소년이 전하는 영원한 진리.",
    "tags": [
      "동화소설",
      "생텍쥐페리",
      "영원한명작"
    ]
  },
  {
    "id": "b-510",
    "category": "소설/시/희곡",
    "title": "채식주의자",
    "author": "한강 외",
    "publisher": "문학동네",
    "cover": "https://image.aladin.co.kr/product/39984/93/cover200/k362130735_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "노벨문학상"
    ]
  },
  {
    "id": "b-511",
    "category": "소설/시/희곡",
    "title": "소년이 온다",
    "author": "최진영 외",
    "publisher": "은행나무",
    "cover": "https://image.aladin.co.kr/product/215/66/cover200/s252137206_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "베스트셀러"
    ]
  },
  {
    "id": "b-512",
    "category": "소설/시/희곡",
    "title": "흰",
    "author": "김호연 외",
    "publisher": "나무옆의의자",
    "cover": "https://image.aladin.co.kr/product/2584/37/cover200/8998441012_3.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "힐링소설"
    ]
  },
  {
    "id": "b-513",
    "category": "소설/시/희곡",
    "title": "희생양",
    "author": "양귀자 외",
    "publisher": "쓰다",
    "cover": "https://image.aladin.co.kr/product/26/0/cover200/s452139198_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "인생문학"
    ]
  },
  {
    "id": "b-514",
    "category": "소설/시/희곡",
    "title": "아몬드",
    "author": "이미예 외",
    "publisher": "팩토리나인",
    "cover": "https://image.aladin.co.kr/product/39790/34/cover200/k072130305_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "판타지"
    ]
  },
  {
    "id": "b-515",
    "category": "소설/시/희곡",
    "title": "아가미",
    "author": "알베르 카뮈 외",
    "publisher": "민음사",
    "cover": "https://image.aladin.co.kr/product/39679/84/cover200/8925568683_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "부조리"
    ]
  },
  {
    "id": "b-516",
    "category": "소설/시/희곡",
    "title": "해가 지는 곳으로",
    "author": "조지 오웰 외",
    "publisher": "민음사",
    "cover": "https://image.aladin.co.kr/product/32/95/cover200/s062934786_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "디스토피아"
    ]
  },
  {
    "id": "b-517",
    "category": "소설/시/희곡",
    "title": "시선으로부터,",
    "author": "헤르만 헤세 외",
    "publisher": "민음사",
    "cover": "https://image.aladin.co.kr/product/40013/75/cover200/8936439995_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "성장소설"
    ]
  },
  {
    "id": "b-518",
    "category": "소설/시/희곡",
    "title": "천 개의 파랑",
    "author": "앙투안 드 생텍쥐페리 외",
    "publisher": "열린책들",
    "cover": "https://image.aladin.co.kr/product/39802/11/cover200/k082130602_3.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "동화소설"
    ]
  },
  {
    "id": "b-519",
    "category": "소설/시/희곡",
    "title": "지구 끝의 온실",
    "author": "한강 외",
    "publisher": "문학동네",
    "cover": "https://image.aladin.co.kr/product/39679/83/cover200/8925568640_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "노벨문학상"
    ]
  },
  {
    "id": "b-520",
    "category": "소설/시/희곡",
    "title": "우리가 빛의 속도로 갈 수 없다면",
    "author": "최진영 외",
    "publisher": "은행나무",
    "cover": "https://image.aladin.co.kr/product/39987/24/cover200/k512130727_3.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "베스트셀러"
    ]
  },
  {
    "id": "b-521",
    "category": "소설/시/희곡",
    "title": "방구석 미술관 문학편",
    "author": "김호연 외",
    "publisher": "나무옆의의자",
    "cover": "https://image.aladin.co.kr/product/33081/18/cover200/k582937507_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "힐링소설"
    ]
  },
  {
    "id": "b-522",
    "category": "소설/시/희곡",
    "title": "노인과 바다",
    "author": "양귀자 외",
    "publisher": "쓰다",
    "cover": "https://image.aladin.co.kr/product/39872/66/cover200/k242130313_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "인생문학"
    ]
  },
  {
    "id": "b-523",
    "category": "소설/시/희곡",
    "title": "위대한 개츠비",
    "author": "이미예 외",
    "publisher": "팩토리나인",
    "cover": "https://image.aladin.co.kr/product/39639/79/cover200/k992130174_2.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "판타지"
    ]
  },
  {
    "id": "b-524",
    "category": "소설/시/희곡",
    "title": "오만과 편견",
    "author": "알베르 카뮈 외",
    "publisher": "민음사",
    "cover": "https://image.aladin.co.kr/product/68/68/cover200/s262036392_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "부조리"
    ]
  },
  {
    "id": "b-525",
    "category": "소설/시/희곡",
    "title": "제인 에어",
    "author": "조지 오웰 외",
    "publisher": "민음사",
    "cover": "https://image.aladin.co.kr/product/39984/93/cover200/k362130735_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "디스토피아"
    ]
  },
  {
    "id": "b-526",
    "category": "소설/시/희곡",
    "title": "호밀밭의 파수꾼",
    "author": "헤르만 헤세 외",
    "publisher": "민음사",
    "cover": "https://image.aladin.co.kr/product/215/66/cover200/s252137206_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "성장소설"
    ]
  },
  {
    "id": "b-527",
    "category": "소설/시/희곡",
    "title": "변신 (카프카)",
    "author": "앙투안 드 생텍쥐페리 외",
    "publisher": "열린책들",
    "cover": "https://image.aladin.co.kr/product/2584/37/cover200/8998441012_3.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "동화소설"
    ]
  },
  {
    "id": "b-528",
    "category": "소설/시/희곡",
    "title": "성 (카프카)",
    "author": "한강 외",
    "publisher": "문학동네",
    "cover": "https://image.aladin.co.kr/product/26/0/cover200/s452139198_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "노벨문학상"
    ]
  },
  {
    "id": "b-529",
    "category": "소설/시/희곡",
    "title": "죄와 벌",
    "author": "최진영 외",
    "publisher": "은행나무",
    "cover": "https://image.aladin.co.kr/product/39790/34/cover200/k072130305_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "베스트셀러"
    ]
  },
  {
    "id": "b-530",
    "category": "소설/시/희곡",
    "title": "카라마조프 가의 형제들",
    "author": "김호연 외",
    "publisher": "나무옆의의자",
    "cover": "https://image.aladin.co.kr/product/39679/84/cover200/8925568683_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "힐링소설"
    ]
  },
  {
    "id": "b-531",
    "category": "소설/시/희곡",
    "title": "안나 카레니나",
    "author": "양귀자 외",
    "publisher": "쓰다",
    "cover": "https://image.aladin.co.kr/product/32/95/cover200/s062934786_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "인생문학"
    ]
  },
  {
    "id": "b-532",
    "category": "소설/시/희곡",
    "title": "전쟁과 평화",
    "author": "이미예 외",
    "publisher": "팩토리나인",
    "cover": "https://image.aladin.co.kr/product/40013/75/cover200/8936439995_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "판타지"
    ]
  },
  {
    "id": "b-533",
    "category": "소설/시/희곡",
    "title": "부활",
    "author": "알베르 카뮈 외",
    "publisher": "민음사",
    "cover": "https://image.aladin.co.kr/product/39802/11/cover200/k082130602_3.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "부조리"
    ]
  },
  {
    "id": "b-534",
    "category": "소설/시/희곡",
    "title": "참을 수 없는 존재의 가벼움",
    "author": "조지 오웰 외",
    "publisher": "민음사",
    "cover": "https://image.aladin.co.kr/product/39679/83/cover200/8925568640_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "디스토피아"
    ]
  },
  {
    "id": "b-535",
    "category": "소설/시/희곡",
    "title": "농담",
    "author": "헤르만 헤세 외",
    "publisher": "민음사",
    "cover": "https://image.aladin.co.kr/product/39987/24/cover200/k512130727_3.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "성장소설"
    ]
  },
  {
    "id": "b-536",
    "category": "소설/시/희곡",
    "title": "1Q84",
    "author": "앙투안 드 생텍쥐페리 외",
    "publisher": "열린책들",
    "cover": "https://image.aladin.co.kr/product/33081/18/cover200/k582937507_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "동화소설"
    ]
  },
  {
    "id": "b-537",
    "category": "소설/시/희곡",
    "title": "해변의 카프카",
    "author": "한강 외",
    "publisher": "문학동네",
    "cover": "https://image.aladin.co.kr/product/39872/66/cover200/k242130313_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "노벨문학상"
    ]
  },
  {
    "id": "b-538",
    "category": "소설/시/희곡",
    "title": "노르웨이의 숲",
    "author": "최진영 외",
    "publisher": "은행나무",
    "cover": "https://image.aladin.co.kr/product/39639/79/cover200/k992130174_2.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "베스트셀러"
    ]
  },
  {
    "id": "b-539",
    "category": "소설/시/희곡",
    "title": "상실의 시대",
    "author": "김호연 외",
    "publisher": "나무옆의의자",
    "cover": "https://image.aladin.co.kr/product/68/68/cover200/s262036392_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "힐링소설"
    ]
  },
  {
    "id": "b-540",
    "category": "소설/시/희곡",
    "title": "기사와 사장님",
    "author": "양귀자 외",
    "publisher": "쓰다",
    "cover": "https://image.aladin.co.kr/product/39984/93/cover200/k362130735_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "인생문학"
    ]
  },
  {
    "id": "b-541",
    "category": "소설/시/희곡",
    "title": "달과 6펜스",
    "author": "이미예 외",
    "publisher": "팩토리나인",
    "cover": "https://image.aladin.co.kr/product/215/66/cover200/s252137206_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "판타지"
    ]
  },
  {
    "id": "b-542",
    "category": "소설/시/희곡",
    "title": "호텔 바그다드",
    "author": "알베르 카뮈 외",
    "publisher": "민음사",
    "cover": "https://image.aladin.co.kr/product/2584/37/cover200/8998441012_3.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "부조리"
    ]
  },
  {
    "id": "b-543",
    "category": "소설/시/희곡",
    "title": "바람과 함께 사라지다",
    "author": "조지 오웰 외",
    "publisher": "민음사",
    "cover": "https://image.aladin.co.kr/product/26/0/cover200/s452139198_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "디스토피아"
    ]
  },
  {
    "id": "b-544",
    "category": "소설/시/희곡",
    "title": "레 미제라블",
    "author": "헤르만 헤세 외",
    "publisher": "민음사",
    "cover": "https://image.aladin.co.kr/product/39790/34/cover200/k072130305_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "성장소설"
    ]
  },
  {
    "id": "b-545",
    "category": "소설/시/희곡",
    "title": "몬테크리스토 백작",
    "author": "앙투안 드 생텍쥐페리 외",
    "publisher": "열린책들",
    "cover": "https://image.aladin.co.kr/product/39679/84/cover200/8925568683_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "동화소설"
    ]
  },
  {
    "id": "b-546",
    "category": "소설/시/희곡",
    "title": "파우스트 소설",
    "author": "한강 외",
    "publisher": "문학동네",
    "cover": "https://image.aladin.co.kr/product/32/95/cover200/s062934786_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "노벨문학상"
    ]
  },
  {
    "id": "b-547",
    "category": "소설/시/희곡",
    "title": "서부 전선 이상 없다",
    "author": "최진영 외",
    "publisher": "은행나무",
    "cover": "https://image.aladin.co.kr/product/40013/75/cover200/8936439995_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "베스트셀러"
    ]
  },
  {
    "id": "b-548",
    "category": "소설/시/희곡",
    "title": "자기만의 방",
    "author": "김호연 외",
    "publisher": "나무옆의의자",
    "cover": "https://image.aladin.co.kr/product/39802/11/cover200/k082130602_3.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "힐링소설"
    ]
  },
  {
    "id": "b-549",
    "category": "소설/시/희곡",
    "title": "댈러웨이 부인",
    "author": "양귀자 외",
    "publisher": "쓰다",
    "cover": "https://image.aladin.co.kr/product/39679/83/cover200/8925568640_1.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "인생문학"
    ]
  },
  {
    "id": "b-550",
    "category": "소설/시/희곡",
    "title": "시인의 산문",
    "author": "이미예 외",
    "publisher": "팩토리나인",
    "cover": "https://image.aladin.co.kr/product/39987/24/cover200/k512130727_3.jpg",
    "description": "소설/시/희곡 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "소설/시/희곡",
      "추천도서",
      "판타지"
    ]
  },
  {
    "id": "b-601",
    "category": "사회과학",
    "title": "도시의 법칙 (The Geography of Nowhere)",
    "author": "유현준",
    "publisher": "을유문화사",
    "cover": "https://image.aladin.co.kr/product/40024/84/cover200/k732130439_1.jpg",
    "description": "건축과 도시가 인류의 역사, 문화, 심리에 미친 기묘하고 흥미로운 연결고리.",
    "tags": [
      "건축",
      "인류학",
      "도시"
    ]
  },
  {
    "id": "b-602",
    "category": "사회과학",
    "title": "공정하다는 착각",
    "author": "마이클 샌델",
    "publisher": "와이즈베리",
    "cover": "https://image.aladin.co.kr/product/39828/81/cover200/8925568497_1.jpg",
    "description": "능력주의가 어떻게 승자에게 오만을, 패자에게 모욕감을 주며 사회를 분열시키는가.",
    "tags": [
      "능력주의",
      "사회비판",
      "공정"
    ]
  },
  {
    "id": "b-603",
    "category": "사회과학",
    "title": "침묵의 봄 (Silent Spring)",
    "author": "레이첼 카슨",
    "publisher": "에코리브르",
    "cover": "https://image.aladin.co.kr/product/39401/98/cover200/k322139973_1.jpg",
    "description": "환경 운동의 출발점이 된 화학 물질과 생태계 파괴에 관한 결정적 보고서.",
    "tags": [
      "환경",
      "생태학",
      "고전"
    ]
  },
  {
    "id": "b-604",
    "category": "사회과학",
    "title": "피로사회",
    "author": "한병철",
    "publisher": "문학과지성사",
    "cover": "https://image.aladin.co.kr/product/39608/96/cover200/k552130873_1.jpg",
    "description": "규율 사회를 넘어 '할 수 있다'는 과잉 긍정이 초래한 현대인들의 영혼적 피로.",
    "tags": [
      "철학적사회학",
      "현대사회",
      "피로"
    ]
  },
  {
    "id": "b-605",
    "category": "사회과학",
    "title": "국가는 왜 실패하는가",
    "author": "대론 아세모글루",
    "publisher": "시공사",
    "cover": "https://image.aladin.co.kr/product/40025/92/cover200/k062130434_1.jpg",
    "description": "권력과 제도, 포용적 기구가 국가의 부와 가난을 가르는 근본 원인이다.",
    "tags": [
      "정치경제",
      "제도",
      "국가론"
    ]
  },
  {
    "id": "b-606",
    "category": "사회과학",
    "title": "소유냐 존재냐",
    "author": "에리히 프롬",
    "publisher": "까치",
    "cover": "https://image.aladin.co.kr/product/40000/88/cover200/k062130036_1.jpg",
    "description": "물질 소유 양식에서 벗어나 실존적 존재 양식으로 전환하는 사회적 길 제시.",
    "tags": [
      "실존철학",
      "에리히프롬",
      "사회학"
    ]
  },
  {
    "id": "b-607",
    "category": "사회과학",
    "title": "팩트풀니스 (Factfulness)",
    "author": "한스 로슬링",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/39953/33/cover200/k502130427_1.jpg",
    "description": "10가지 인간 본능이 만드는 세계에 대한 왜곡된 시선을 데이터로 바로잡는다.",
    "tags": [
      "데이터",
      "글로벌",
      "팩트체크"
    ]
  },
  {
    "id": "b-608",
    "category": "사회과학",
    "title": "21세기 자본",
    "author": "토마 피케티",
    "publisher": "글항아리",
    "cover": "https://image.aladin.co.kr/product/31424/4/cover200/k482832219_1.jpg",
    "description": "300년에 걸친 자본 수익률과 불평등의 수치적 증명 및 사회 정책 제언.",
    "tags": [
      "불평등",
      "피케티",
      "자본주의"
    ]
  },
  {
    "id": "b-609",
    "category": "사회과학",
    "title": "정의란 무엇인가",
    "author": "유현준 외",
    "publisher": "을유문화사",
    "cover": "https://image.aladin.co.kr/product/39581/99/cover200/8901300095_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "건축"
    ]
  },
  {
    "id": "b-610",
    "category": "사회과학",
    "title": "선량한 차별주의자",
    "author": "마이클 샌델 외",
    "publisher": "와이즈베리",
    "cover": "https://image.aladin.co.kr/product/39061/33/cover200/k852137647_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "능력주의"
    ]
  },
  {
    "id": "b-611",
    "category": "사회과학",
    "title": "세습 중산층 사회",
    "author": "레이첼 카슨 외",
    "publisher": "에코리브르",
    "cover": "https://image.aladin.co.kr/product/39931/50/cover200/k652130123_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "환경"
    ]
  },
  {
    "id": "b-612",
    "category": "사회과학",
    "title": "불평등의 대가",
    "author": "한병철 외",
    "publisher": "문학과지성사",
    "cover": "https://image.aladin.co.kr/product/31629/43/cover200/8934942460_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "철학적사회학"
    ]
  },
  {
    "id": "b-613",
    "category": "사회과학",
    "title": "미디어의 이해",
    "author": "대론 아세모글루 외",
    "publisher": "시공사",
    "cover": "https://image.aladin.co.kr/product/34372/90/cover200/8901285894_2.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "정치경제"
    ]
  },
  {
    "id": "b-614",
    "category": "사회과학",
    "title": "프로테스탄티즘의 윤리와 자본주의 정신",
    "author": "에리히 프롬 외",
    "publisher": "까치",
    "cover": "https://image.aladin.co.kr/product/39582/46/cover200/k542139341_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "실존철학"
    ]
  },
  {
    "id": "b-615",
    "category": "사회과학",
    "title": "자본론 입문",
    "author": "한스 로슬링 외",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/39820/95/cover200/k142130606_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "데이터"
    ]
  },
  {
    "id": "b-616",
    "category": "사회과학",
    "title": "격차사회",
    "author": "토마 피케티 외",
    "publisher": "글항아리",
    "cover": "https://image.aladin.co.kr/product/40024/84/cover200/k732130439_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "불평등"
    ]
  },
  {
    "id": "b-617",
    "category": "사회과학",
    "title": "타인의 고통",
    "author": "유현준 외",
    "publisher": "을유문화사",
    "cover": "https://image.aladin.co.kr/product/39828/81/cover200/8925568497_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "건축"
    ]
  },
  {
    "id": "b-618",
    "category": "사회과학",
    "title": "굴레를 벗어던진 여성들",
    "author": "마이클 샌델 외",
    "publisher": "와이즈베리",
    "cover": "https://image.aladin.co.kr/product/39401/98/cover200/k322139973_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "능력주의"
    ]
  },
  {
    "id": "b-619",
    "category": "사회과학",
    "title": "젠더와 사회",
    "author": "레이첼 카슨 외",
    "publisher": "에코리브르",
    "cover": "https://image.aladin.co.kr/product/39608/96/cover200/k552130873_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "환경"
    ]
  },
  {
    "id": "b-620",
    "category": "사회과학",
    "title": "인구 절벽 2026",
    "author": "한병철 외",
    "publisher": "문학과지성사",
    "cover": "https://image.aladin.co.kr/product/40025/92/cover200/k062130434_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "철학적사회학"
    ]
  },
  {
    "id": "b-621",
    "category": "사회과학",
    "title": "고령화 사회의 미래",
    "author": "대론 아세모글루 외",
    "publisher": "시공사",
    "cover": "https://image.aladin.co.kr/product/40000/88/cover200/k062130036_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "정치경제"
    ]
  },
  {
    "id": "b-622",
    "category": "사회과학",
    "title": "AI와 노동의 미래",
    "author": "에리히 프롬 외",
    "publisher": "까치",
    "cover": "https://image.aladin.co.kr/product/39953/33/cover200/k502130427_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "실존철학"
    ]
  },
  {
    "id": "b-623",
    "category": "사회과학",
    "title": "기후위기 사회학",
    "author": "한스 로슬링 외",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/31424/4/cover200/k482832219_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "데이터"
    ]
  },
  {
    "id": "b-624",
    "category": "사회과학",
    "title": "사피엔스의 미래",
    "author": "토마 피케티 외",
    "publisher": "글항아리",
    "cover": "https://image.aladin.co.kr/product/39581/99/cover200/8901300095_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "불평등"
    ]
  },
  {
    "id": "b-625",
    "category": "사회과학",
    "title": "식량 지형학",
    "author": "유현준 외",
    "publisher": "을유문화사",
    "cover": "https://image.aladin.co.kr/product/39061/33/cover200/k852137647_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "건축"
    ]
  },
  {
    "id": "b-626",
    "category": "사회과학",
    "title": "석유의 지정학",
    "author": "마이클 샌델 외",
    "publisher": "와이즈베리",
    "cover": "https://image.aladin.co.kr/product/39931/50/cover200/k652130123_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "능력주의"
    ]
  },
  {
    "id": "b-627",
    "category": "사회과학",
    "title": "반지성주의",
    "author": "레이첼 카슨 외",
    "publisher": "에코리브르",
    "cover": "https://image.aladin.co.kr/product/31629/43/cover200/8934942460_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "환경"
    ]
  },
  {
    "id": "b-628",
    "category": "사회과학",
    "title": "감정 노동의 사회학",
    "author": "한병철 외",
    "publisher": "문학과지성사",
    "cover": "https://image.aladin.co.kr/product/34372/90/cover200/8901285894_2.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "철학적사회학"
    ]
  },
  {
    "id": "b-629",
    "category": "사회과학",
    "title": "소셜 미디어와 대중 심리",
    "author": "대론 아세모글루 외",
    "publisher": "시공사",
    "cover": "https://image.aladin.co.kr/product/39582/46/cover200/k542139341_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "정치경제"
    ]
  },
  {
    "id": "b-630",
    "category": "사회과학",
    "title": "가짜 뉴스의 사회학",
    "author": "에리히 프롬 외",
    "publisher": "까치",
    "cover": "https://image.aladin.co.kr/product/39820/95/cover200/k142130606_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "실존철학"
    ]
  },
  {
    "id": "b-631",
    "category": "사회과학",
    "title": "공론장의 변용",
    "author": "한스 로슬링 외",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/40024/84/cover200/k732130439_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "데이터"
    ]
  },
  {
    "id": "b-632",
    "category": "사회과학",
    "title": "사회적 가치란 무엇인가",
    "author": "토마 피케티 외",
    "publisher": "글항아리",
    "cover": "https://image.aladin.co.kr/product/39828/81/cover200/8925568497_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "불평등"
    ]
  },
  {
    "id": "b-633",
    "category": "사회과학",
    "title": "돌봄 사회학",
    "author": "유현준 외",
    "publisher": "을유문화사",
    "cover": "https://image.aladin.co.kr/product/39401/98/cover200/k322139973_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "건축"
    ]
  },
  {
    "id": "b-634",
    "category": "사회과학",
    "title": "외로움의 세기",
    "author": "마이클 샌델 외",
    "publisher": "와이즈베리",
    "cover": "https://image.aladin.co.kr/product/39608/96/cover200/k552130873_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "능력주의"
    ]
  },
  {
    "id": "b-635",
    "category": "사회과학",
    "title": "플랫폼 노동자의 현실",
    "author": "레이첼 카슨 외",
    "publisher": "에코리브르",
    "cover": "https://image.aladin.co.kr/product/40025/92/cover200/k062130434_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "환경"
    ]
  },
  {
    "id": "b-636",
    "category": "사회과학",
    "title": "기본소득이란 무엇인가",
    "author": "한병철 외",
    "publisher": "문학과지성사",
    "cover": "https://image.aladin.co.kr/product/40000/88/cover200/k062130036_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "철학적사회학"
    ]
  },
  {
    "id": "b-637",
    "category": "사회과학",
    "title": "도시 재개발과 젠트리피케이션",
    "author": "대론 아세모글루 외",
    "publisher": "시공사",
    "cover": "https://image.aladin.co.kr/product/39953/33/cover200/k502130427_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "정치경제"
    ]
  },
  {
    "id": "b-638",
    "category": "사회과학",
    "title": "지방 소멸 대책",
    "author": "에리히 프롬 외",
    "publisher": "까치",
    "cover": "https://image.aladin.co.kr/product/31424/4/cover200/k482832219_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "실존철학"
    ]
  },
  {
    "id": "b-639",
    "category": "사회과학",
    "title": "교육 격차의 현실",
    "author": "한스 로슬링 외",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/39581/99/cover200/8901300095_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "데이터"
    ]
  },
  {
    "id": "b-640",
    "category": "사회과학",
    "title": "학벌 사회의 비판",
    "author": "토마 피케티 외",
    "publisher": "글항아리",
    "cover": "https://image.aladin.co.kr/product/39061/33/cover200/k852137647_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "불평등"
    ]
  },
  {
    "id": "b-641",
    "category": "사회과학",
    "title": "청년 빈곤 보고서",
    "author": "유현준 외",
    "publisher": "을유문화사",
    "cover": "https://image.aladin.co.kr/product/39931/50/cover200/k652130123_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "건축"
    ]
  },
  {
    "id": "b-642",
    "category": "사회과학",
    "title": "주거권 사회학",
    "author": "마이클 샌델 외",
    "publisher": "와이즈베리",
    "cover": "https://image.aladin.co.kr/product/31629/43/cover200/8934942460_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "능력주의"
    ]
  },
  {
    "id": "b-643",
    "category": "사회과학",
    "title": "복지 국가의 선택",
    "author": "레이첼 카슨 외",
    "publisher": "에코리브르",
    "cover": "https://image.aladin.co.kr/product/34372/90/cover200/8901285894_2.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "환경"
    ]
  },
  {
    "id": "b-644",
    "category": "사회과학",
    "title": "글로벌 민주주의의 위기",
    "author": "한병철 외",
    "publisher": "문학과지성사",
    "cover": "https://image.aladin.co.kr/product/39582/46/cover200/k542139341_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "철학적사회학"
    ]
  },
  {
    "id": "b-645",
    "category": "사회과학",
    "title": "포퓰리즘의 지형도",
    "author": "대론 아세모글루 외",
    "publisher": "시공사",
    "cover": "https://image.aladin.co.kr/product/39820/95/cover200/k142130606_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "정치경제"
    ]
  },
  {
    "id": "b-646",
    "category": "사회과학",
    "title": "권력의 불평등",
    "author": "에리히 프롬 외",
    "publisher": "까치",
    "cover": "https://image.aladin.co.kr/product/40024/84/cover200/k732130439_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "실존철학"
    ]
  },
  {
    "id": "b-647",
    "category": "사회과학",
    "title": "국제 정치 지형도",
    "author": "한스 로슬링 외",
    "publisher": "김영사",
    "cover": "https://image.aladin.co.kr/product/39828/81/cover200/8925568497_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "데이터"
    ]
  },
  {
    "id": "b-648",
    "category": "사회과학",
    "title": "전쟁과 평화 사회학",
    "author": "토마 피케티 외",
    "publisher": "글항아리",
    "cover": "https://image.aladin.co.kr/product/39401/98/cover200/k322139973_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "불평등"
    ]
  },
  {
    "id": "b-649",
    "category": "사회과학",
    "title": "정의란 무엇인가",
    "author": "유현준 외",
    "publisher": "을유문화사",
    "cover": "https://image.aladin.co.kr/product/39608/96/cover200/k552130873_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "건축"
    ]
  },
  {
    "id": "b-650",
    "category": "사회과학",
    "title": "선량한 차별주의자",
    "author": "마이클 샌델 외",
    "publisher": "와이즈베리",
    "cover": "https://image.aladin.co.kr/product/40025/92/cover200/k062130434_1.jpg",
    "description": "사회과학 분야의 필수 필독서. 깊이 있는 통찰과 사회적 가치를 함께 논의해보세요.",
    "tags": [
      "사회과학",
      "추천도서",
      "능력주의"
    ]
  }
];
