## MonkeyType 구조

monkeytype/
├── frontend/
│ ├── src/
│ │ ├── components/ # UI 컴포넌트
│ │ ├── pages/ # 라우팅 처리
│ │ ├── store/ # 상태관리 (Zustand 사용)
│ │ ├── logic/ # 타이핑 로직 및 통계 계산
│ │ └── util/
│ └── public/
├── backend/
│ ├── api/
│ ├── models/
│ ├── services/
│ └── database/

## Typonic 구조 예시도

app/
├── components/
│ ├── layout/ # 레이아웃 구성 요소
│ │ ├── Header.tsx
│ │ ├── Footer.tsx
│ │ ├── Gagebar.tsx
│ │ └── macOs.tsx # Mac Os 상단 바
│ ├── menubars/ # 메뉴바 전용 컴포넌트
│ │ ├── Code.tsx
│ │ ├── Custom.tsx
│ │ ├── Main.tsx
│ │ ├── Result.tsx
│ │ └── Word.tsx
│ ├── contents/ # 페이지별 콘텐츠 구성 요소
│ │ ├── Guide.tsx
│ │ ├── Ranking.tsx
│ │ └── Main.tsx # components/Code.tsx > components/contents/Main.tsx
│
├── features/ # 주요 기능 묶음 (기능 중심 모듈화)
│ ├── typing/
│ │ ├── TypingWords.tsx
│ │ ├── InputArea.tsx
│ │ └── TypingArea.tsx
│ ├── result/ # 결과 창 부분에 app 하위 폴더로 존재해야지 페이지 이동이 가능.
│ │ ├── Chart.tsx
│ │ ├── ResultSummary.tsx
│ │ └── ResultPage.tsx # 이름만 변경
│
├── page.tsx # 기존 Main.tsx 내용
├── layout.tsx # Next.js layout
├── globals.css
└── favicon.ico
