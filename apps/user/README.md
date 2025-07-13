# VYBZ

<table align="center">
  <tr>
    <td align="center">
      <img width="200" alt="스크린샷1" src="https://github.com/user-attachments/assets/260c1396-290c-4f57-b6e0-7d5048efb193">
    </td>
  </tr>
</table>

> 🎤 팬과 버스커가 함께 만드는 무대, 실시간 소통 기반 팬 플랫폼 SNS
>
> 📅 개발 기간 : 2025년 5월 2일 ~ 2025년 7월 15일
>
> 🌐 배포 URL(User) : [VYBZ](https://vybz.kr/)

## 목차

1. [개발 환경](#1-개발-환경)
2. [기술 소개](#2-기술-소개)
3. [트러블 슈팅](#3-트러블-슈팅)
4. [포팅 매뉴얼](#4-포팅-매뉴얼)

## 1. 개발 환경

### 주요 의존성

| 이름                     | 버전    | 설명                                        |
| ------------------------ | ------- | ------------------------------------------- |
| Node.js                  | >=18    | JavaScript 런타임                           |
| Next.js                  | 15.3.0  | React 기반 프레임워크                       |
| React                    | 19.1.0  | UI 라이브러리                               |
| TypeScript               | 5.8.2   | 타입 안정성 제공                            |
| Tailwind CSS             | 4.1.5   | 유틸리티 우선 CSS 프레임워크                |
| Tanstack Query           | 5.80.7  | 서버 상태 관리                              |
| NextAuth.js              | 4.24.11 | 인증 솔루션                                 |
| Framer Motion            | 12.16.0 | 애니메이션 라이브러리                       |
| Swiper                   | 11.2.8  | 터치 슬라이더 라이브러리                    |
| Firebase                 | 11.9.1  | 백엔드 서비스 플랫폼                        |
| stomp/stompjs            | 7.1.1   | STOMP 프로토콜을 위한 JavaScript 클라이언트 |
| tosspayments/payment-sdk | 1.9.1   | TossPayments 결제 SDK                       |
| hls.js                   | 1.6.6   | HLS.js 라이브러리                           |
| next-pwa                 | 5.6.0   | Progressive Web App 지원                    |

### 개발 도구

| 이름                          | 버전   | 설명                  |
| ----------------------------- | ------ | --------------------- |
| pnpm                          | 8.15.6 | 패키지 매니저         |
| tanstack/react-query-devtools | 5.80.7 | React Query 개발 도구 |

### 공유 패키지

| 이름                    | 설명                 |
| ----------------------- | -------------------- |
| @repo/ui                | 공통 UI 컴포넌트     |
| @repo/eslint-config     | ESLint 공통 설정     |
| @repo/tailwind-config   | Tailwind 공통 설정   |
| @repo/typescript-config | TypeScript 공통 설정 |

## 2. 기술 소개

### 2-1. SEO 최적화

- **메타태그 관리 시스템**

  - Next.js의 Metadata API를 활용한 동적 메타 태그 관리
  - 소셜 미디어 공유 최적화 (OG 이미지, 설명 등)
  - 페이지별 구조화된 데이터 적용

  - 결과 : Google Search Console에서 정상적으로 인덱싱됨

  <img width="1043" height="1739" alt="seo" src="https://github.com/user-attachments/assets/fa6fcfa2-c741-4df6-9482-98ab4639080e" />


- **서버 사이드 렌더링 구현**
  - 검색 엔진 최적화를 위한 초기 페이지 로딩 성능 향상
  - 크롤링 가능한 콘텐츠 제공

### 2-2. TanStack Query를 활용한 상태 관리

- **클라이언트 캐싱 시스템**

  - 서버 데이터를 메모리에 캐싱하여 중복 요청 최소화
  - 자동 데이터 갱신 및 재요청 관리

- **React Query DevTools 적용**
  - 디버깅 모드에서 데이터 상태 실시간 모니터링
  - 캐싱된 데이터 관리 및 강제 갱신 기능 구현

### 2-3. AWS S3 직접 연결 Route API

- **클라이언트에서 서버로의 안전한 파일 업로드**
  - Route Handler를 통한 서버 사이드 경로로 구현하여 AWS 인증 키 보호
  - 사용자 이미지, 포스트 컨텐츠 업로드 기능 지원

### 2-4. NextAuth.js 기반 인증 시스템

- **다양한 소셜 로그인 제공**

  - Google, Kakao 로그인 통합
  - JWT 기반 세션 관리

- **미들웨어를 활용한 접근 통제**
  - 회원 권한별 페이지 접근 관리
  - 인증 상태 유지 및 자동 리디렉션 처리

### 2-5. Firebase Cloud Messaging 기반 알림 시스템

- **실시간 푸시 알림 기능**
  - 실시간 알림 수신 및 관리
  - Service Worker를 활용한 백그라운드 알림 처리

### 2-6. HLS.js를 활용한 라이브 스트리밍 시청 기능

- **HTTP Live Streaming (HLS) 표준 지원**
  - 적응형 비트레이트 스트리밍으로 네트워크 환경에 따른 품질 자동 조절
  - 스트리밍 버퍼링 및 오류 복구 기능 제공

### 2-7. Toss Payments SDK 연동 결제 시스템

- **토스페이먼츠 레이어 팝업 결제 기능**
  - 개발 및 운영 환경 설정 분리
  - 출금 요청 및 취소 기능 구현

### 2-8. 커스텀 Hook을 통한 기능 향상

- **useInfiniteScroll 커스텀 Hook**

  - TanStack Query의 useInfiniteQuery를 활용한 무한 스크롤 구현
  - 리일즈, 게시글 목록 등의 페이지네이션 처리 추상화

- **컴포넌트와 기능 분리 설계**

  - UI 컴포넌트와 로직 처리를 분리하여 재사용성 향상
  - 동적 데이터 연동을 위한 객체 지향적 컴포넌트 구조 설계

### 2-9. Next.js App Router 특수 페이지 활용

- **Template 사용으로 엔터리 애니메이션 구현**

  - Layout과 달리 페이지 이동시 매 내비게이션마다 렌더링되어 애니메이션 효과 적용 가능
  - Framer Motion과 결합하여 페이지 전환 시 슬라이드 효과 구현

  ```tsx
  // app/(main)/main/template.tsx
  export default function Template({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <motion.div
        initial={{ x: '-100vw', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.15 }}
      >
        {children}
      </motion.div>
    );
  }
  ```

- **not-found 페이지 커스터마이징**

  - 404 오류 페이지를 사용자 경험에 맞게 고도화
  - 인터렉티브한 FuzzyText 효과로 페이지 추가 기능 제공

### 2-10. Next.js 실험적 기능 활용

- **View Transitions API 적용**

  - 페이지 전환 시 매끈한 애니메이션 경험 제공
  - 프로필 및 게시물 페이지 전환 시 사용자 경험 향상

- **Progressive Web App (PWA) 적용**
  - 모바일 디바이스에서 앱 경험 제공
  - 오프라인 지원 및 홈 화면 추가 기능 제공

[🔝 목차로 돌아가기](#목차)

## 3. 트러블 슈팅

### 3-1. Next.js Image 최적화 도면 해결 문제

- **문제점**: Next.js의 Image 컴포넌트 사용 시 외부 이미지 URL에 대한 최적화 문제 발생. 카카오에서는 http로 시작하는 URL을 사용하기 때문에 Next.js의 Image 컴포넌트를 사용할 수 없음

- **해결 방법**: imageUtils 모듈을 통한 이미지 URL 처리 및 최적화 구현

  ```typescript
  // utils/imageUtils.ts
  export const getOptimizedImageUrl = (url: string) => {
    // 인증된 도메인인지 확인 및 처리
    if (!url || url.startsWith('data:')) return url;

    // 외부 이미지 URL 처리 로직
    if (url.startsWith('https://') || url.startsWith('http://')) {
      // 인증된 이미지 도메인으로 전달하여 최적화 처리
      return `/api/imageProxy?url=${encodeURIComponent(url)}`;
    }

    return url;
  };
  ```

### 3-2. 사파리 브라우저 비디오 호환성 문제

- **문제점**: 사파리 브라우저에서 일부 비디오 파일이 정상적으로 재생되지 않거나 화면이 틀어지는 현상 발생

- **해결 방법**: 브라우저 확인 및 사파리 호환 모드 적용 방어 코드 구현

  ```typescript
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  useEffect(() => {
    if (isSafari && videoRef.current) {
      // 사파리에서 호환성 문제 해결을 위한 추가 속성 적용
      videoRef.current.setAttribute('playsinline', 'true');
      videoRef.current.setAttribute('webkit-playsinline', 'true');
    }
  }, [videoRef.current]);
  ```

### 3-3. SwiperWrapper 무한 스크롤 동기화 문제

- **문제점**: 비동기적으로 데이터를 불러오면서 슬라이드 인덱스와 로드된 데이터 간의 불일치 발생

- **해결 방법**: 스와이퍼 활성 인덱스 추적 및 렌더링 트리거 메커니즘 구현

  ```typescript
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [renderTrigger, setRenderTrigger] = useState(0);

  const handleSlideChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.activeIndex);

    // 슬라이드가 마지막에 가까워지면 더 불러오기
    if (swiper.activeIndex >= swiper.slides.length - 3) {
      fetchNextPage();
    }
  };

  // 데이터 변화에 따른 렌더링 시점 조절
  useEffect(() => {
    if (data?.pages) {
      setRenderTrigger((prev) => prev + 1);
    }
  }, [data?.pages]);
  ```

### 3-4. 채팅방 SSE 메세지 렌더링 문제

- **문제점**: 채팅방에서 리스트로 이동했다가 다시 채팅방으로 돌아왔을 때 Server-Sent Events(SSE) 메세지의 최신 데이터가 정상적으로 업데이트되지 않는 현상

- **해결 방법**: 채팅 메세지를 로컬 저장소에 캡쳐하여 페이지 이동 간 상태 유지 구현

  ```typescript
  // 채팅 객체를 로컬에 저장하여 유지
  const saveChatMessagesToLocalStorage = (
    roomId: string,
    messages: ChatMessageType[]
  ) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`chat_${roomId}`, JSON.stringify(messages));
    }
  };

  // 페이지 이동 후 되돌아왔을 때 캡쳐된 데이터 불러오기
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat_${roomId}`);
    if (savedMessages) {
      setChatMessages(JSON.parse(savedMessages));
    }

    // SSE 연결 초기화
    connectToSSE();

    return () => {
      saveChatMessagesToLocalStorage(roomId, chatMessages);
    };
  }, [roomId]);
  ```

[🔝 목차로 돌아가기](#목차)

## 4. Vybz 프론트엔드 포팅 매뉴얼

### 시작하기 전에

이 프로젝트는 **pnpm**을 패키지 매니저로 사용합니다. npm이나 yarn을 사용할 경우 의존성 해결에 문제가 발생할 수 있습니다.

#### 필수 요구사항

- Node.js 버전 18 이상
- pnpm 버전 8.15.6 이상

### 설치 방법

1. 저장소를 클론합니다:

```sh
git clone [저장소 URL]
cd vybz
```

2. pnpm을 설치합니다 (아직 설치되지 않은 경우):

```sh
npm install -g pnpm
```

3. 의존성을 설치합니다:

```sh
pnpm install
```

### 빌드 순서

이 프로젝트는 모노레포 구조로 구성되어 있어 빌드 순서가 중요합니다. 특히 패키지 빌드가 먼저 이루어져야 앱이 제대로 작동합니다.

#### 빌드 순서 의존성

1. **패키지 빌드** (가장 먼저 빌드되어야 함):

   - @repo/typescript-config
   - @repo/eslint-config
   - @repo/tailwind-config
   - @repo/ui

2. **앱 빌드** (패키지 빌드 후 진행):
   - apps/admin
   - apps/busker
   - apps/user

> **중요**: 패키지에서 dist 폴더가 생성되지 않으면 앱들이 의존성을 해결하지 못합니다.

### 개발 명령어

```sh
# 전체 프로젝트 개발 모드 실행
pnpm dev

# 특정 앱만 개발 모드 실행
pnpm --filter "[앱이름]" dev
# 예: pnpm --filter "apps/user" dev

# 전체 프로젝트 빌드
pnpm build

# 의존성 그래프 생성 (graph.png 생성)
pnpm graph

# 타입 체크
pnpm check-types

# 린트 검사
pnpm lint


```

### 환경 변수

프로젝트는 환경 변수를 사용합니다:
각 앱의 루트 디렉토리에 `.env` 또는 `.env.local` 파일을 생성하여 필요한 환경 변수를 설정하세요.
환경 변수 목록은 각 앱의 루트 디렉토리의 README.md 파일을 참고하세요.

### 더 자세한 정보

의존성 관계에 대한 시각적 이해가 필요하면 `pnpm graph` 명령어로 생성된 `graph.png` 파일을 참조하세요.

[🔝 목차로 돌아가기](#목차)
