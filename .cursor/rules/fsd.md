# Feature-Sliced Design (FSD) 적용 가이드라인

## :book: 개요

**Feature-Sliced Design (FSD)**는 프론트엔드 애플리케이션의 코드를 구조화하기 위한 아키텍처 방법론입니다.
이 방법론의 목적은 **요구사항이 바뀌어도 코드 구조가 무너지지 않고, 새 기능을 쉽게 추가할 수 있는 프로젝트를 만드는 것**입니다.

> 참고: [Feature-Sliced Design 공식 문서](https://feature-sliced.github.io/documentation/kr/docs/get-started/overview)

## :dart: FSD의 핵심 개념

FSD는 코드를 **얼마나 많은 책임을 가지는지**와 **다른 모듈에 얼마나 의존하는지**에 따라 계층화합니다.

### 3단계 계층 구조

```
Layer (레이어)
  └── Slice (슬라이스)
      └── Segment (세그먼트)
```

## :file_folder: Layer (레이어)

Layer는 모든 FSD 프로젝트의 표준 최상위 폴더입니다. 각 Layer는 명확한 역할을 담당하며, **상위 Layer는 하위 Layer를 참조할 수 있지만, 하위 Layer가 상위 Layer를 참조하는 것은 금지**됩니다.

### Layer 목록 (상위 → 하위)

1. **App** - Routing, Entrypoint, Global Styles, Provider 등 앱을 실행하는 모든 요소
2. **Pages** - Route 기준으로 구성된 주요 화면 단위
3. **Widgets** - 크고 독립적으로 동작하는 UI 구성 단위, 일반적으로 하나의 완결된 화면 기능(use case)을 제공
4. **Features** - 사용자에게 비즈니스 가치를 제공하는 액션을 구현한 재사용 가능한 제품 기능 단위
5. **Entities** - 프로젝트가 다루는 비즈니스 Entity
6. **Shared** - 모든 Layer에서 재사용되는 코드(라이브러리, 유틸리티 등)

### 의존성 규칙

```
App → Pages → Widgets → Features → Entities → Shared
```

- :white_check_mark: 상위 Layer는 하위 Layer를 참조 가능
- :x: 하위 Layer는 상위 Layer를 참조 불가
- :x: 같은 Layer 내 다른 Slice 간 참조 불가

## :cake: Slice (슬라이스)

Slice는 Layer 내부를 **비즈니스 도메인별**로 나눕니다.

- 이름/개수에 제한이 없음
- 같은 Layer 내 다른 Slice를 참조할 수 없음
- 이 규칙이 높은 응집도와 낮은 결합도를 보장

### 예시

```
pages/
  ├── home/          # 홈 페이지
  ├── order-list/    # 주문 목록 페이지
  └── user-detail/   # 사용자 상세 페이지

entities/
  ├── user/          # 사용자 Entity
  ├── order/         # 주문 Entity
  └── zone/          # 구역 Entity
```

## :package: Segment (세그먼트)

Slice와 App/Shared Layer는 Segment로 세분화되어, 코드의 역할에 따라 코드를 그룹화합니다.

### 표준 Segment

- **`ui`** - UI components, date formatter, styles 등 UI 표현과 직접 관련된 코드
- **`api`** - request functions, data types, mappers 등 백엔드 통신 및 데이터 로직
- **`model`** - schema, interfaces, store, business logic 등 애플리케이션 도메인 모델
- **`lib`** - 해당 Slice에서 여러 모듈이 함께 사용하는 공통 library code
- **`config`** - configuration files, feature flags 등 환경/기능 설정

### Segment 구조 예시

```
entities/user/
  ├── ui/           # UserCard, UserAvatar 등 UI 컴포넌트
  ├── api/          # getUser, updateUser 등 API 함수
  ├── model/        # User 타입, userStore 등
  └── lib/          # user 유틸리티 함수들
```

## :rocket: 현재 프로젝트에 FSD 적용하기

### 현재 구조 분석

현재 프로젝트는 다음과 같은 구조를 가지고 있습니다:

```
src/
  ├── components/     # 다양한 컴포넌트들
  ├── pages/         # 페이지 컴포넌트들
  ├── hooks/         # 커스텀 훅들
  ├── services/      # 서비스 로직
  ├── utils/         # 유틸리티 함수들
  ├── constants/     # 상수들
  └── typings/       # 타입 정의들
```

### 점진적 마이그레이션 전략

FSD는 **점진적으로 도입**하는 것이 중요합니다. 한 번에 모든 코드를 이동하지 말고, 단계적으로 진행하세요.

#### 1단계: 기반 구조 설정

**목표**: `app`과 `shared` Layer를 먼저 정리하며 기반을 다집니다.

```
src/
  ├── app/                    # 새로 생성
  │   ├── index.tsx          # App.tsx 이동
  │   ├── providers/          # Provider 컴포넌트들
  │   └── router/             # 라우팅 설정
  └── shared/                 # 새로 생성
      ├── ui/                 # 공통 UI 컴포넌트
      ├── lib/                # 공통 유틸리티
      ├── api/                # 공통 API 설정
      └── config/             # 공통 설정
```

**작업 내용**:

- `src/App.tsx` → `src/app/index.tsx`
- `src/routes/` → `src/app/router/`
- `src/components/common/` → `src/shared/ui/` (재사용 가능한 컴포넌트)
- `src/utils/` → `src/shared/lib/` (공통 유틸리티)
- `src/constants/` → `src/shared/config/` (공통 상수)
- `src/services/grpc-client.tsx` → `src/shared/api/`

#### 2단계: Pages Layer 구성

**목표**: 기존 UI를 `pages` Layer로 분배합니다. 이 과정에서 FSD 규칙을 위반해도 괜찮습니다.

```
src/
  └── pages/
      ├── home/              # 홈 페이지
      ├── order-list/         # 주문 목록
      ├── user-detail/        # 사용자 상세
      ├── drt/                # DRT 관련 페이지들
      ├── platform/           # 플랫폼 관련 페이지들
      ├── taxi/               # 택시 관련 페이지들
      └── user/               # 사용자 관련 페이지들
```

**작업 내용**:

- `src/pages/drt/` → `src/pages/drt/` (이미 적절한 구조)
- 각 페이지를 독립적인 Slice로 구성
- 각 Slice 내부에 `ui/` Segment 생성

#### 3단계: Entities Layer 구성

**목표**: 비즈니스 Entity를 분리합니다.

```
src/
  └── entities/
      ├── user/
      │   ├── ui/            # UserCard, UserAvatar 등
      │   ├── api/            # user 관련 API
      │   ├── model/          # User 타입, userStore
      │   └── lib/            # user 유틸리티
      ├── order/
      ├── zone/
      ├── driver/
      ├── supply/
      └── ...
```

**작업 내용**:

- `src/typings/`의 타입들을 해당 Entity의 `model/`로 이동
- `src/utils/`의 도메인별 유틸리티를 해당 Entity의 `lib/`로 이동
- `src/components/lists/`, `src/components/services/` 등을 Entity별로 분류

#### 4단계: Features Layer 구성

**목표**: 사용자 액션을 구현한 재사용 가능한 기능을 분리합니다.

```
src/
  └── features/
      ├── create-order/       # 주문 생성 기능
      ├── edit-user/          # 사용자 수정 기능
      ├── filter-orders/      # 주문 필터링 기능
      └── ...
```

**작업 내용**:

- `src/components/forms/` → `src/features/` (폼 관련 기능들)
- `src/components/modal/` → `src/features/` (모달 관련 기능들)
- `src/components/dialogs/` → `src/features/` (다이얼로그 관련 기능들)

#### 5단계: Widgets Layer 구성

**목표**: 크고 독립적으로 동작하는 UI 구성 단위를 분리합니다.

```
src/
  └── widgets/
      ├── order-list/         # 주문 목록 위젯
      ├── user-profile/       # 사용자 프로필 위젯
      └── ...
```

**작업 내용**:

- 복합적인 UI 구성 요소들을 Widget으로 분리
- Pages에서 사용되는 큰 단위의 컴포넌트들을 Widget으로 이동

#### 6단계: Import 위반 해결

**목표**: Import 위반을 하나씩 해결하면서, 코드에서 로직을 분리합니다.

**주의사항**:

- 하위 Layer가 상위 Layer를 참조하는 경우를 찾아 수정
- 같은 Layer 내 다른 Slice를 참조하는 경우를 찾아 수정
- 필요한 경우 코드를 적절한 Layer로 이동

## :clipboard: 마이그레이션 체크리스트

### Phase 1: 기반 구조

- [ ] `src/app/` 디렉토리 생성 및 App.tsx 이동
- [ ] `src/shared/` 디렉토리 생성
- [ ] 공통 컴포넌트를 `shared/ui/`로 이동
- [ ] 공통 유틸리티를 `shared/lib/`로 이동
- [ ] 공통 상수를 `shared/config/`로 이동
- [ ] 공통 API 설정을 `shared/api/`로 이동

### Phase 2: Pages

- [ ] 각 페이지를 독립적인 Slice로 구성
- [ ] 페이지별 `ui/` Segment 생성

### Phase 3: Entities

- [ ] 주요 Entity 식별 (user, order, zone, driver, supply 등)
- [ ] 각 Entity에 `ui/`, `api/`, `model/`, `lib/` Segment 생성
- [ ] 타입 정의를 Entity의 `model/`로 이동
- [ ] 도메인별 유틸리티를 Entity의 `lib/`로 이동

### Phase 4: Features

- [ ] 사용자 액션 기능 식별
- [ ] Forms, Modals, Dialogs를 Features로 이동
- [ ] 각 Feature에 적절한 Segment 구성

### Phase 5: Widgets

- [ ] 복합적인 UI 구성 요소 식별
- [ ] Widget으로 분리

### Phase 6: 정리

- [ ] Import 위반 검사 및 수정
- [ ] 불필요한 파일 정리
- [ ] 문서 업데이트

## :mag: FSD 규칙 검증

### 의존성 규칙 검사

다음과 같은 Import는 **금지**됩니다:

```typescript
// :x: 하위 Layer가 상위 Layer를 참조
// entities/user/model.ts
import { HomePage } from '@/pages/home';

// :x: 같은 Layer 내 다른 Slice 참조
// pages/home/ui/index.tsx
import { OrderList } from '@/pages/order-list';

// :white_check_mark: 상위 Layer가 하위 Layer를 참조 (허용)
// pages/home/ui/index.tsx
import { UserCard } from '@/entities/user';
import { CreateOrder } from '@/features/create-order';
```

### Public API 원칙

각 Slice는 `index.ts`를 통해 Public API를 제공해야 합니다:

```typescript
// entities/user/index.ts
export { UserCard } from './ui/user-card';
export { useUser } from './model/use-user';
export type { User } from './model/types';
```

## :hammer_and_wrench: 도구 및 리소스

### FSD 도구

- **Steiger** - 프로젝트 구조가 FSD 기준에 맞는지 검사
- **Awesome FSD** - FSD 예제와 도구 모음
- **예제 모음** - 다양한 프로젝트에서 사용된 폴더 구조 예시

### 참고 자료

- [FSD 공식 문서 (한국어)](https://feature-sliced.github.io/documentation/kr/docs/get-started/overview)
- [FSD Migration 가이드](https://feature-sliced.github.io/documentation/kr/docs/guides/migration)
- [FSD 예제 모음](https://feature-sliced.github.io/documentation/kr/docs/guides/examples)

## :warning: 주의사항

1. **점진적 도입**: 한 번에 모든 코드를 이동하지 말고, 단계적으로 진행하세요.
2. **파일럿 프로젝트**: 도입 전에는 파일럿 프로젝트로 먼저 검증해보는 것을 추천합니다.
3. **규칙 위반 허용**: 마이그레이션 초기 단계에서는 FSD 규칙을 위반해도 괜찮습니다. 점진적으로 해결하세요.
4. **새 기능 추가 제한**: 도입 단계에서는 새로운 대규모 Entity나 복잡한 기능을 추가하지 않는 것이 좋습니다.
5. **구조 안정화 우선**: 구조를 안정적으로 정리하는 데 집중하는 것이 우선입니다.

## :memo: 예시: 현재 프로젝트 구조 변환

### Before (현재 구조)

```
src/components/forms/operation-type-policy-form/
  ├── index.tsx
  ├── movement-type.tsx
  ├── lib/
  │   └── constants.ts
  └── ui/
      ├── index.ts
      └── styled.tsx
```

### After (FSD 구조)

```
src/features/operation-type-policy-form/
  ├── index.ts                    # Public API
  ├── ui/
  │   ├── index.ts
  │   ├── operation-type-policy-form.tsx
  │   ├── movement-type.tsx
  │   └── styled.tsx
  └── lib/
      └── constants.ts
```

## :dart: 장점

FSD 구조를 사용하면 다음과 같은 장점을 얻을 수 있습니다:

1. **일관성**: 구조가 표준화되어 팀 간 협업과 신규 멤버 온보딩이 쉬워집니다.
2. **격리성**: Layer와 Slice 간 의존성을 제한하여, 특정 모듈만 안전하게 수정할 수 있습니다.
3. **재사용 범위 제어**: 재사용 가능한 코드를 필요한 범위에서만 활용할 수 있어, **DRY** 원칙과 실용성을 균형 있게 유지합니다.
4. **도메인 중심 구조**: 비즈니스 용어 기반의 구조로 되어 있어, 전체 코드를 몰라도 특정 기능을 독립적으로 구현할 수 있습니다.

## :books: 다음 단계

1. [Tutorial](https://feature-sliced.github.io/documentation/kr/docs/get-started/tutorial)을 통해 FSD 방식의 사고를 익혀보세요.
2. [다양한 예제](https://feature-sliced.github.io/documentation/kr/docs/guides/examples)를 통해 실제 프로젝트 구조를 살펴보세요.
3. [Telegram 커뮤니티](https://t.me/feature_sliced_design)에서 궁금한 점을 질문해보세요.

---

**작성일**: 2025-01-27
**참고 문서**: [Feature-Sliced Design 공식 문서](https://feature-sliced.github.io/documentation/kr/docs/get-started/overview)

# Feature-Sliced Design (FSD) 적용 가이드라인

## :book: 개요

**Feature-Sliced Design (FSD)**는 프론트엔드 애플리케이션의 코드를 구조화하기 위한 아키텍처 방법론입니다.
이 방법론의 목적은 **요구사항이 바뀌어도 코드 구조가 무너지지 않고, 새 기능을 쉽게 추가할 수 있는 프로젝트를 만드는 것**입니다.

> 참고: [Feature-Sliced Design 공식 문서](https://feature-sliced.github.io/documentation/kr/docs/get-started/overview)

## :dart: FSD의 핵심 개념

FSD는 코드를 **얼마나 많은 책임을 가지는지**와 **다른 모듈에 얼마나 의존하는지**에 따라 계층화합니다.

### 3단계 계층 구조

```
Layer (레이어)
  └── Slice (슬라이스)
      └── Segment (세그먼트)
```

## :file_folder: Layer (레이어)

Layer는 모든 FSD 프로젝트의 표준 최상위 폴더입니다. 각 Layer는 명확한 역할을 담당하며, **상위 Layer는 하위 Layer를 참조할 수 있지만, 하위 Layer가 상위 Layer를 참조하는 것은 금지**됩니다.

### Layer 목록 (상위 → 하위)

1. **App** - Routing, Entrypoint, Global Styles, Provider 등 앱을 실행하는 모든 요소
2. **Pages** - Route 기준으로 구성된 주요 화면 단위
3. **Widgets** - 크고 독립적으로 동작하는 UI 구성 단위, 일반적으로 하나의 완결된 화면 기능(use case)을 제공
4. **Features** - 사용자에게 비즈니스 가치를 제공하는 액션을 구현한 재사용 가능한 제품 기능 단위
5. **Entities** - 프로젝트가 다루는 비즈니스 Entity
6. **Shared** - 모든 Layer에서 재사용되는 코드(라이브러리, 유틸리티 등)

### 의존성 규칙

```
App → Pages → Widgets → Features → Entities → Shared
```

- :white_check_mark: 상위 Layer는 하위 Layer를 참조 가능
- :x: 하위 Layer는 상위 Layer를 참조 불가
- :x: 같은 Layer 내 다른 Slice 간 참조 불가

## :cake: Slice (슬라이스)

Slice는 Layer 내부를 **비즈니스 도메인별**로 나눕니다.

- 이름/개수에 제한이 없음
- 같은 Layer 내 다른 Slice를 참조할 수 없음
- 이 규칙이 높은 응집도와 낮은 결합도를 보장

### 예시

```
pages/
  ├── home/          # 홈 페이지
  ├── order-list/    # 주문 목록 페이지
  └── user-detail/   # 사용자 상세 페이지

entities/
  ├── user/          # 사용자 Entity
  ├── order/         # 주문 Entity
  └── zone/          # 구역 Entity
```

## :package: Segment (세그먼트)

Slice와 App/Shared Layer는 Segment로 세분화되어, 코드의 역할에 따라 코드를 그룹화합니다.

### 표준 Segment

- **`ui`** - UI components, date formatter, styles 등 UI 표현과 직접 관련된 코드
- **`api`** - request functions, data types, mappers 등 백엔드 통신 및 데이터 로직
- **`model`** - schema, interfaces, store, business logic 등 애플리케이션 도메인 모델
- **`lib`** - 해당 Slice에서 여러 모듈이 함께 사용하는 공통 library code
- **`config`** - configuration files, feature flags 등 환경/기능 설정

### Segment 구조 예시

```
entities/user/
  ├── ui/           # UserCard, UserAvatar 등 UI 컴포넌트
  ├── api/          # getUser, updateUser 등 API 함수
  ├── model/        # User 타입, userStore 등
  └── lib/          # user 유틸리티 함수들
```

## :rocket: 현재 프로젝트에 FSD 적용하기

### 현재 구조 분석

현재 프로젝트는 다음과 같은 구조를 가지고 있습니다:

```
src/
  ├── components/     # 다양한 컴포넌트들
  ├── pages/         # 페이지 컴포넌트들
  ├── hooks/         # 커스텀 훅들
  ├── services/      # 서비스 로직
  ├── utils/         # 유틸리티 함수들
  ├── constants/     # 상수들
  └── typings/       # 타입 정의들
```

### 점진적 마이그레이션 전략

FSD는 **점진적으로 도입**하는 것이 중요합니다. 한 번에 모든 코드를 이동하지 말고, 단계적으로 진행하세요.

#### 1단계: 기반 구조 설정

**목표**: `app`과 `shared` Layer를 먼저 정리하며 기반을 다집니다.

```
src/
  ├── app/                    # 새로 생성
  │   ├── index.tsx          # App.tsx 이동
  │   ├── providers/          # Provider 컴포넌트들
  │   └── router/             # 라우팅 설정
  └── shared/                 # 새로 생성
      ├── ui/                 # 공통 UI 컴포넌트
      ├── lib/                # 공통 유틸리티
      ├── api/                # 공통 API 설정
      └── config/             # 공통 설정
```

**작업 내용**:

- `src/App.tsx` → `src/app/index.tsx`
- `src/routes/` → `src/app/router/`
- `src/components/common/` → `src/shared/ui/` (재사용 가능한 컴포넌트)
- `src/utils/` → `src/shared/lib/` (공통 유틸리티)
- `src/constants/` → `src/shared/config/` (공통 상수)
- `src/services/grpc-client.tsx` → `src/shared/api/`

#### 2단계: Pages Layer 구성

**목표**: 기존 UI를 `pages` Layer로 분배합니다. 이 과정에서 FSD 규칙을 위반해도 괜찮습니다.

```
src/
  └── pages/
      ├── home/              # 홈 페이지
      ├── order-list/         # 주문 목록
      ├── user-detail/        # 사용자 상세
      ├── drt/                # DRT 관련 페이지들
      ├── platform/           # 플랫폼 관련 페이지들
      ├── taxi/               # 택시 관련 페이지들
      └── user/               # 사용자 관련 페이지들
```

**작업 내용**:

- `src/pages/drt/` → `src/pages/drt/` (이미 적절한 구조)
- 각 페이지를 독립적인 Slice로 구성
- 각 Slice 내부에 `ui/` Segment 생성

#### 3단계: Entities Layer 구성

**목표**: 비즈니스 Entity를 분리합니다.

```
src/
  └── entities/
      ├── user/
      │   ├── ui/            # UserCard, UserAvatar 등
      │   ├── api/            # user 관련 API
      │   ├── model/          # User 타입, userStore
      │   └── lib/            # user 유틸리티
      ├── order/
      ├── zone/
      ├── driver/
      ├── supply/
      └── ...
```

**작업 내용**:

- `src/typings/`의 타입들을 해당 Entity의 `model/`로 이동
- `src/utils/`의 도메인별 유틸리티를 해당 Entity의 `lib/`로 이동
- `src/components/lists/`, `src/components/services/` 등을 Entity별로 분류

#### 4단계: Features Layer 구성

**목표**: 사용자 액션을 구현한 재사용 가능한 기능을 분리합니다.

```
src/
  └── features/
      ├── create-order/       # 주문 생성 기능
      ├── edit-user/          # 사용자 수정 기능
      ├── filter-orders/      # 주문 필터링 기능
      └── ...
```

**작업 내용**:

- `src/components/forms/` → `src/features/` (폼 관련 기능들)
- `src/components/modal/` → `src/features/` (모달 관련 기능들)
- `src/components/dialogs/` → `src/features/` (다이얼로그 관련 기능들)

#### 5단계: Widgets Layer 구성

**목표**: 크고 독립적으로 동작하는 UI 구성 단위를 분리합니다.

```
src/
  └── widgets/
      ├── order-list/         # 주문 목록 위젯
      ├── user-profile/       # 사용자 프로필 위젯
      └── ...
```

**작업 내용**:

- 복합적인 UI 구성 요소들을 Widget으로 분리
- Pages에서 사용되는 큰 단위의 컴포넌트들을 Widget으로 이동

#### 6단계: Import 위반 해결

**목표**: Import 위반을 하나씩 해결하면서, 코드에서 로직을 분리합니다.

**주의사항**:

- 하위 Layer가 상위 Layer를 참조하는 경우를 찾아 수정
- 같은 Layer 내 다른 Slice를 참조하는 경우를 찾아 수정
- 필요한 경우 코드를 적절한 Layer로 이동

## :clipboard: 마이그레이션 체크리스트

### Phase 1: 기반 구조

- [ ] `src/app/` 디렉토리 생성 및 App.tsx 이동
- [ ] `src/shared/` 디렉토리 생성
- [ ] 공통 컴포넌트를 `shared/ui/`로 이동
- [ ] 공통 유틸리티를 `shared/lib/`로 이동
- [ ] 공통 상수를 `shared/config/`로 이동
- [ ] 공통 API 설정을 `shared/api/`로 이동

### Phase 2: Pages

- [ ] 각 페이지를 독립적인 Slice로 구성
- [ ] 페이지별 `ui/` Segment 생성

### Phase 3: Entities

- [ ] 주요 Entity 식별 (user, order, zone, driver, supply 등)
- [ ] 각 Entity에 `ui/`, `api/`, `model/`, `lib/` Segment 생성
- [ ] 타입 정의를 Entity의 `model/`로 이동
- [ ] 도메인별 유틸리티를 Entity의 `lib/`로 이동

### Phase 4: Features

- [ ] 사용자 액션 기능 식별
- [ ] Forms, Modals, Dialogs를 Features로 이동
- [ ] 각 Feature에 적절한 Segment 구성

### Phase 5: Widgets

- [ ] 복합적인 UI 구성 요소 식별
- [ ] Widget으로 분리

### Phase 6: 정리

- [ ] Import 위반 검사 및 수정
- [ ] 불필요한 파일 정리
- [ ] 문서 업데이트

## :mag: FSD 규칙 검증

### 의존성 규칙 검사

다음과 같은 Import는 **금지**됩니다:

```typescript
// :x: 하위 Layer가 상위 Layer를 참조
// entities/user/model.ts
import { HomePage } from '@/pages/home';

// :x: 같은 Layer 내 다른 Slice 참조
// pages/home/ui/index.tsx
import { OrderList } from '@/pages/order-list';

// :white_check_mark: 상위 Layer가 하위 Layer를 참조 (허용)
// pages/home/ui/index.tsx
import { UserCard } from '@/entities/user';
import { CreateOrder } from '@/features/create-order';
```

### Public API 원칙

각 Slice는 `index.ts`를 통해 Public API를 제공해야 합니다:

```typescript
// entities/user/index.ts
export { UserCard } from './ui/user-card';
export { useUser } from './model/use-user';
export type { User } from './model/types';
```

## :hammer_and_wrench: 도구 및 리소스

### FSD 도구

- **Steiger** - 프로젝트 구조가 FSD 기준에 맞는지 검사
- **Awesome FSD** - FSD 예제와 도구 모음
- **예제 모음** - 다양한 프로젝트에서 사용된 폴더 구조 예시

### 참고 자료

- [FSD 공식 문서 (한국어)](https://feature-sliced.github.io/documentation/kr/docs/get-started/overview)
- [FSD Migration 가이드](https://feature-sliced.github.io/documentation/kr/docs/guides/migration)
- [FSD 예제 모음](https://feature-sliced.github.io/documentation/kr/docs/guides/examples)

## :warning: 주의사항

1. **점진적 도입**: 한 번에 모든 코드를 이동하지 말고, 단계적으로 진행하세요.
2. **파일럿 프로젝트**: 도입 전에는 파일럿 프로젝트로 먼저 검증해보는 것을 추천합니다.
3. **규칙 위반 허용**: 마이그레이션 초기 단계에서는 FSD 규칙을 위반해도 괜찮습니다. 점진적으로 해결하세요.
4. **새 기능 추가 제한**: 도입 단계에서는 새로운 대규모 Entity나 복잡한 기능을 추가하지 않는 것이 좋습니다.
5. **구조 안정화 우선**: 구조를 안정적으로 정리하는 데 집중하는 것이 우선입니다.

## :memo: 예시: 현재 프로젝트 구조 변환

### Before (현재 구조)

```
src/components/forms/operation-type-policy-form/
  ├── index.tsx
  ├── movement-type.tsx
  ├── lib/
  │   └── constants.ts
  └── ui/
      ├── index.ts
      └── styled.tsx
```

### After (FSD 구조)

```
src/features/operation-type-policy-form/
  ├── index.ts                    # Public API
  ├── ui/
  │   ├── index.ts
  │   ├── operation-type-policy-form.tsx
  │   ├── movement-type.tsx
  │   └── styled.tsx
  └── lib/
      └── constants.ts
```

## :dart: 장점

FSD 구조를 사용하면 다음과 같은 장점을 얻을 수 있습니다:

1. **일관성**: 구조가 표준화되어 팀 간 협업과 신규 멤버 온보딩이 쉬워집니다.
2. **격리성**: Layer와 Slice 간 의존성을 제한하여, 특정 모듈만 안전하게 수정할 수 있습니다.
3. **재사용 범위 제어**: 재사용 가능한 코드를 필요한 범위에서만 활용할 수 있어, **DRY** 원칙과 실용성을 균형 있게 유지합니다.
4. **도메인 중심 구조**: 비즈니스 용어 기반의 구조로 되어 있어, 전체 코드를 몰라도 특정 기능을 독립적으로 구현할 수 있습니다.

## :books: 다음 단계

1. [Tutorial](https://feature-sliced.github.io/documentation/kr/docs/get-started/tutorial)을 통해 FSD 방식의 사고를 익혀보세요.
2. [다양한 예제](https://feature-sliced.github.io/documentation/kr/docs/guides/examples)를 통해 실제 프로젝트 구조를 살펴보세요.
3. [Telegram 커뮤니티](https://t.me/feature_sliced_design)에서 궁금한 점을 질문해보세요.

---

**작성일**: 2025-01-27
**참고 문서**: [Feature-Sliced Design 공식 문서](https://feature-sliced.github.io/documentation/kr/docs/get-started/overview)
