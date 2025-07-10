## Turborepo 설정

### Turborepo

![turborepo](./public/turborepo.png)

- 모노레포 빌드 시스템
- 앱/패키지 간 의존성 효율적으로 관리
- 빌드 캐싱으로 속도를 높임

### 공통 설정 패키지

- ESLint/TypeScript/Tailwind Config 등 개발 규칙/설정 공유
- UI 라이브러리 공유해서 재사용성을 높임

### 협업과 품질 자동화

1. Husky

- `pnpm install` 시 자동으로 설치됨 (package.json의 "prepare" 스크립트)
- 커밋 전 린트와 타입 체크 자동 실행 (pre-commit hook)
- 변경된 파일만 타겟팅하여 `pnpm run check-before-commit` 실행
- Commitlint로 커밋 메시지 형식 검증 (commit-msg hook)
- 커밋 메시지 규칙은 `commitlint.config.js` 파일에 정의되어 있으며 반드시 확인 필요
  - 허용된 타입: feat, fix, docs, refactor, chore, design, hotfix, test, wip
  - 메시지 형식: `<타입>: <제목>` (예: `feat: 로그인 기능 구현`)
  - 최대 길이: 50자

![husky](./public/husky.png)

2. PNPM
- 빠르고 효율적인 패키지 매니저로 채택하여 워크스페이스 관리

3. Prettier
- 코드 스타일 컨벤션 자동 적용 (포매팅 일관성 유지)

4. ESLint
- 코드 품질 및 스타일 자동 검사 (문법/버그/스타일 이슈 사전 탐지)

5. Analyzer

- 빌드 성능 분석
- 빌드 시간 최적화를 위한 성능 분석

![analyzer](./public/analyzer.png)

### GitHub MCP

1. DeepSource AI
- 코드 분석 및 자동 리뷰
- AI 기반으로 버그, 취약점, 코드 품질 문제를 PR 단계에서 사전 감지

2. IMS
- 코드 분석 및 자동 리뷰
- AI 기반으로 시멘틱 태그 품질을 PR단계에서 검사

![mcp](./public/mcp.png)

## 트러블 슈팅

### 1️⃣ Turbo 명령어 에러 이슈

- **문제**: 윈도우에서 리눅스 Turbo 명령어 실행 시 Git 변경 사항을 제대로 감지하지 못하는 OS 간 호환성 문제 발생
- **해결**: package.json에 명령어를 정적으로 작성하여 해결. 예를 들어 `--filter=...[origin/dev]`와 같은 형태로 특정 브랜치 기준 변경사항 필터링 명령어를 정적으로 작성

### 2️⃣ Husky의 pnpm 인식 오류 이슈

- **문제**: pnpm에서 오류 발생 시 종료 코드 1을 반환하지만, Husky가 이를 0으로 인식하여 오류가 발생해도 커밋/푸시가 통과되는 문제 발생
- **해결**: 커스텀 Husky 스크립트(.husky/pre-commit, .husky/pre-push)를 작성하여 종료 코드를 명시적으로 검사하고 적절한 오류 메시지 표시
  - 커밋 전: `pnpm run check-before-commit`로 변경된 파일만 린트/타입체크 실행
  - 푸시 전: `pnpm run check-before-push`로 변경된 패키지만 빌드 검사

### 3️⃣ Tailwind JIT 이슈 해결

- **문제**: 모노레포에서 Tailwind JIT 기능으로 인해 컴포넌트 라이브러리의 클래스가 사용 전까지 출력되지 않는 문제 발생
- **해결**: Tailwind CSS 4의 새로운 기능을 활용하여 해결
  - `@source` 디렉티브: 특정 폴더/파일의 클래스를 포함하도록 명시적 지정
  - `@theme` 디렉티브: 테마 변수 정의 및 동적 테마 관리 지원

### 4️⃣ 실시간 반응성 향상을 위한 Optimistic UI 적용

- **문제**: 클릭 시 데이터 패칭 지연으로 인한 UX 저하 발생
- **해결**: `useOptimistic` 훅 사용하여 Optimistic UI 적용 → UI는 즉시 반영하고, 백그라운드에서 서버 동기화

## 최신 기술 적용

### Tailwind CSS 4.0 새로운 기능

#### 1. @source 디렉티브
```css
@source "../../../packages/ui/src/components/**/*.{ts,tsx}";
```
- **설명**: Tailwind CSS 4에서 도입된 기능으로, 특정 파일 또는 디렉토리의 코드를 패턴 매칭을 통해 정적 분석에 포함시킴
- **이점**: 
  - JIT 모드에서 사용되지 않는 클래스를 미리 포함시탐 수 있어 즉시 표시 가능
  - 이전 버전에서는 safelist 옵션을 통해 모든 클래스를 수동으로 명시해야 했지만, @source를 통해 파일 패턴만으로 간단하게 해결

#### 2. @theme 디렉티브
```css
@theme {
  --color-div-background: oklch(0.25 0.01 250);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* 추가 변수들... */
}
```
- **설명**: CSS 변수를 통해 테마를 정의하고 적용하는 더 강력한 방법
- **이점**:
  - CSS 네이티브 변수를 활용해 다크 모드 등 다양한 테마 적용 용이
  - `@custom-variant dark (&:is(.dark *))` 같은 구문을 통해 만강한 테마 변형 지원
  - 다양한 컴포넌트와 디자인 시스템을 일관된 방식으로 관리
## Vybz 프론트엔드 포팅 매뉴얼

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

### 트러블슈팅

1. **빌드 오류 발생 시**: 
   - 패키지가 올바른 순서로 빌드되었는지 확인하세요.
   - `pnpm clean && pnpm install && pnpm build`를 실행해 보세요.

2. **의존성 오류 발생 시**:
   - node_modules를 삭제하고 `pnpm install`을 다시 실행하세요.

3. **앱 실행 오류 발생 시**:
   - 필요한 환경 변수가 올바르게 설정되어 있는지 확인하세요.
   - 패키지의 dist 폴더가 생성되었는지 확인하세요.

### 더 자세한 정보

의존성 관계에 대한 시각적 이해가 필요하면 `pnpm graph` 명령어로 생성된 `graph.png` 파일을 참조하세요.
