export interface CareerProject {
  name: string;
  description: string;
}

export interface CareerEntry {
  company: string;
  period: string;
  role: string;
  projects: CareerProject[];
}

// 최신순(위 -> 아래)으로 직접 정렬해서 관리한다.
export const CAREER_TIMELINE: CareerEntry[] = [
  {
    company: '현대자동차 (셔클)',
    period: '2025.01 - 재직중',
    role: 'Frontend Engineer',
    projects: [
      {
        name: '셔클 서포트센터',
        description: '운영사 문의 접수·관리 업무 효율화를 위한 서포트센터 개발',
      },
      {
        name: '셔클 디자인시스템',
        description: 'Figma → CSS/JS 디자인 토큰 자동화 파이프라인 구축 및 테스트 도입',
      },
      {
        name: '셔클 관제시스템',
        description: '실시간 운행 데이터 기반 관제 시스템 개발, 빌드 시간 13분 → 4분으로 단축',
      },
      {
        name: '셔클 키오스크',
        description: '벽오지 셔틀 호출 키오스크 서비스 리팩토링 및 e2e/단위 테스트 도입',
      },
    ],
  },
  {
    company: 'Querypie',
    period: '2023.06 - 2024.12',
    role: 'Frontend Engineer',
    projects: [
      {
        name: 'Querypie Design System',
        description: '모노레포 기반 디자인 시스템 구축 및 changeset 배포 자동화 (리드 개발자)',
      },
      {
        name: 'Querypie 서비스 개발',
        description: '신규 기능 개발 및 공통 레이아웃/UI 리팩토링',
      },
      {
        name: 'CDPP (MVP)',
        description: 'Swagger → TypeScript 타입 자동 생성 라이브러리 개발로 FE/BE 협업 비용 절감',
      },
    ],
  },
  {
    company: '카카오',
    period: '2020.02 - 2023.06',
    role: 'Frontend Engineer',
    projects: [
      {
        name: '카카오톡 예약하기',
        description: '카카오톡 내 레저·숙박 예약 서비스 개발, 프론트엔드 리드',
      },
      {
        name: '채널스토어',
        description: '카카오톡 기반 채널스토어 서비스 초기 구축, 세미 리드',
      },
      {
        name: '톡 체크아웃',
        description: '비회원 간편결제 서비스, 클레임 기능 및 체크아웃 SDK 개발',
      },
    ],
  },
  {
    company: '사이냅소프트',
    period: '2016.01 - 2020.02',
    role: 'Frontend Engineer',
    projects: [
      {
        name: '사이냅에디터',
        description: '웹 기반 문서 편집기 개발, 편집 모델 및 크로스 브라우징 클립보드 기능 담당',
      },
      {
        name: '네이버 오피스 6단계',
        description: '네이버 오피스 공동 편집 버전 개발 지원, 렌더링/도형 이동 성능 40% 개선',
      },
    ],
  },
];
