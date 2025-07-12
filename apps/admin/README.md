# VYBZ

<table align="center">
  <tr>
    <td align="center">
       <img width="600" alt="스크린샷2" src="https://github.com/user-attachments/assets/c0191e9d-73dc-4866-813d-687da167fc63">
    </td>
  </tr>
</table>

> 🎤 팬과 버스커가 함께 만드는 무대, 실시간 소통 기반 팬 플랫폼 SNS
>
> 📅 개발 기간 : 2025년 5월 2일 ~ 2025년 7월 15일
>
> 🌐 배포 URL(Busker) : [VYBZ Busker](https://busker.vybz.kr/)

## 목차

1. [개발 환경](#1-개발-환경)
2. [포팅 매뉴얼](#2-포팅-매뉴얼)

## 1. 개발 환경

### 주요 의존성

| 이름         | 버전   | 설명                         |
| ------------ | ------ | ---------------------------- |
| Node.js      | >=18   | JavaScript 런타임            |
| Next.js      | 15.3.0 | React 기반 프레임워크        |
| React        | 19.1.0 | UI 라이브러리                |
| React DOM    | 19.1.0 | React DOM 렌더러             |
| TypeScript   | 5.8.2  | 타입 안정성 제공             |
| Tailwind CSS | 4.1.5  | 유틸리티 우선 CSS 프레임워크 |

### 개발 도구

| 이름 | 버전   | 설명          |
| ---- | ------ | ------------- |
| pnpm | 8.15.6 | 패키지 매니저 |

### 공유 패키지

| 이름                    | 설명                 |
| ----------------------- | -------------------- |
| @repo/ui                | 공통 UI 컴포넌트     |
| @repo/eslint-config     | ESLint 공통 설정     |
| @repo/tailwind-config   | Tailwind 공통 설정   |
| @repo/typescript-config | TypeScript 공통 설정 |

## 2. Vybz 프론트엔드 포팅 매뉴얼

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
