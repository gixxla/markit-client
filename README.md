# Mark-it

> React Native + Expo로 만든 크로스 플랫폼 모바일 북마크 관리 앱

게스트 사용자와 이메일 인증을 통한 등록 사용자를 모두 지원하며, 북마크를 카테고리와 태그로 분류하여 정리할 수 있습니다. 또한 오프라인 모드를 지원하며, AI 검색 시스템을 적용하여 편리한 사용자 경험을 제공합니다.

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.x 이상
- npm 11.7.0 이상
- Expo CLI (`npm install -g expo-cli`)
- **Android 개발:**
  - Android Studio
  - Android SDK
  - Android 에뮬레이터 또는 실제 디바이스
- **iOS 개발 (macOS만):**
  - Xcode
  - CocoaPods
  - iOS 시뮬레이터 또는 실제 디바이스

### 설치 및 실행

```bash
# 저장소 클론
git clone <repository-url>
cd markit-client

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 API URL을 본인의 환경에 맞게 수정

# 개발 서버 시작
npm start

# 플랫폼별 실행
npm run android  # Android 에뮬레이터
npm run ios      # iOS 시뮬레이터 (macOS만)
npm run web      # 웹 브라우저
```

### 환경 설정

#### 환경 변수

프로젝트는 Expo의 네이티브 환경 변수 시스템을 사용합니다.

1. **초기 설정:**

   ```bash
   cp .env.example .env
   ```

2. **환경 변수 파일 구조:**
   - `.env` - 실제 환경 변수 (gitignore에 포함, 커밋 안됨)
   - `.env.example` - 템플릿 파일 (git에 커밋됨)

3. **주요 환경 변수:**

   ```env
   # iOS 시뮬레이터용 (기본값)
   EXPO_PUBLIC_API_URL=http://192.168.219.107:3000/api

   # Android 에뮬레이터용 (필요 시 주석 해제)
   # EXPO_PUBLIC_API_URL=http://10.0.2.2:3000/api
   ```

4. **플랫폼별 설정:**

   **Android 에뮬레이터:**
   ```env
   EXPO_PUBLIC_API_URL=http://10.0.2.2:3000/api
   ```

   **iOS 시뮬레이터:**
   - `.env` 파일의 `EXPO_PUBLIC_API_URL`을 본인의 로컬 네트워크 IP로 변경
   - Windows: `ipconfig`로 IP 확인
   - Mac/Linux: `ifconfig`로 IP 확인
   - 예: `EXPO_PUBLIC_API_URL=http://192.168.219.107:3000/api`

5. **환경 변수 변경 후:**
   ```bash
   # Metro 캐시 삭제 후 재시작
   npm start -- --clear
   ```

#### 백엔드 서버

API 호출이 작동하려면 백엔드 서버가 포트 3000에서 실행되어야 합니다.

## 📦 기술 스택

- **언어:** TypeScript 5.9.2
- **React Native:** 0.81.5
- **프레임워크:** Expo 54.0.25
- **라우팅:** Expo Router 6.0.15
- **상태 관리:** Zustand 5.0.9
- **스타일링:** NativeWind 4.2.1 + Tailwind CSS 3.4.18
- **HTTP 클라이언트:** Axios 1.13.2
- **보안 저장소:** Expo SecureStore 15.0.7
- **패키지 매니저:** npm 11.7.0

## 📁 프로젝트 구조

```
app/              # Expo Router 화면 (파일 기반 라우팅)
api/              # API 통신 레이어
├── client.ts       # 인터셉터가 있는 Axios 인스턴스
└── user.ts         # 사용자/인증 엔드포인트
store/            # Zustand 전역 상태
components/       # 재사용 가능한 UI 컴포넌트
types/            # TypeScript 타입 정의
constants/        # 앱 상수 (폰트, 컬러 등)
hooks/            # 커스텀 React 훅
libs/             # 유틸리티 라이브러리
assets/           # 이미지, 폰트, SVG 아이콘
.env              # 환경 변수 (gitignore에 포함)
.env.example      # 환경 변수 템플릿
```

## 🛠️ 개발 스크립트

**앱 실행:**

```bash
npm start              # Expo 개발 서버 시작
npm run android        # Android 에뮬레이터에서 실행
npm run ios            # iOS 시뮬레이터에서 실행
npm run web            # 웹 버전 실행
```

**코드 품질:**

```bash
npm run lint           # ESLint 실행 (자동 수정)
npm run format         # Prettier 실행
npm run lint:fix       # ESLint + Prettier 모두 실행
```

## 🧪 테스팅

### 테스트 실행

```bash
# 전체 테스트 실행
npm test

# 특정 파일 테스트
npm test UserProfile.test.tsx

# Watch 모드로 실행
npm test -- --watch

# 커버리지 확인
npm test -- --coverage
```

### 테스트 작성 가이드

테스트 작성 규칙 및 예시는 [CLAUDE.md](./CLAUDE.md#4-테스팅-전략)를 참고하세요.

## 🚢 배포

### 개발 빌드

```bash
# Android 개발 빌드
eas build --profile development --platform android

# iOS 개발 빌드
eas build --profile development --platform ios
```

### 프로덕션 빌드

```bash
# Android 프로덕션 빌드
eas build --profile production --platform android

# iOS 프로덕션 빌드
eas build --profile production --platform ios
```

### 배포 환경

- **개발 (Development):** 개발자 테스트용
- **스테이징 (Staging):** QA 및 내부 테스트
- **프로덕션 (Production):** 실제 사용자 배포

## 🛠️ 트러블슈팅

### Metro 캐시 문제

**증상:** 환경 변수 변경이 반영되지 않음, 빌드 오류

**해결:**
```bash
# Metro 캐시 삭제
npm start -- --clear

# 또는
npx expo start -c

# 완전 초기화
rm -rf node_modules
npm install
```

### 네이티브 모듈 빌드 실패

**Android:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**iOS:**
```bash
cd ios
pod deinstall
pod install
cd ..
npm run ios
```

### 환경 변수 미적용

**체크리스트:**
1. 환경 변수명이 `EXPO_PUBLIC_` 접두사로 시작하는가?
2. `.env` 파일이 프로젝트 루트에 있는가?
3. Metro 캐시를 삭제했는가?
4. 개발 서버를 재시작했는가?

## 📚 참고 자료

**공식 문서:**

- [Expo 공식 문서](https://docs.expo.dev/)
- [React Native 공식 문서](https://reactnative.dev/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
- [Zustand 공식 문서](https://zustand-demo.pmnd.rs/)

**프로젝트 관련:**

- 백엔드 API 문서: (추가 예정)
- 디자인 시스템: (추가 예정)
- 내부 위키: (추가 예정)

## 🤝 기여하기

### Git 워크플로우

**브랜치 전략:**

- `main`: 프로덕션 배포 브랜치 (보호됨)
- `develop`: 개발 통합 브랜치
- `feature/*`: 새로운 기능 개발
- `bugfix/*`: 버그 수정
- `hotfix/*`: 긴급 수정

**커밋 메시지 규칙 (Conventional Commits):**

```
<타입>(<범위>): <제목>

<본문>

<푸터>
```

**타입:**
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드, 패키지 매니저 설정

**예시:**
```
feat(auth): 이메일 로그인 기능 추가

- 이메일/비밀번호 검증 로직 구현
- JWT 토큰 저장 및 갱신 처리
- 로그인 에러 핸들링

Closes #123
```

**PR 규칙:**

- 제목: `[타입] 간결한 설명` (예: `[Feat] 북마크 삭제 기능`)
- 설명: 변경 사항, 테스트 방법, 스크린샷 포함
- 리뷰어: 최소 1명 승인 필요
- CI 통과 후 머지

### 개발 규칙

프로젝트의 개발 규칙, 아키텍처, 코딩 가이드는 [CLAUDE.md](./CLAUDE.md)를 참고하세요.

## 📝 현재 개발 상태

**활성 브랜치:** `main`

**구현 완료:**

- 이메일 회원가입 플로우 (인증 포함)
- 이메일 로그인 플로우
- 게스트 모드 등록
- 앱 실행 시 세션 갱신
- 401 에러 시 자동 로그아웃
- 환경 변수 관리 시스템 (Expo 네이티브)

**진행 중:**

- 북마크 CRUD 작업

**미구현:**

- home/categories 화면
- 설정 (계정 및 기기 관리)
- 태그/카테고리 관리
- 기기 간 동기화
- 오프라인 북마크 기능 (UI 및 개발자 도구만 구현됨)
- 소셜 인증 (Apple/Google - UI만 구현됨)

## 📄 라이선스

0BSD
