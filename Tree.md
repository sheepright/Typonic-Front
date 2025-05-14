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

app/
├── Typing/
│ ├── TypingArea.tsx # 타자할 단어 표시
│ ├── InputArea.tsx # 실제 입력 필드
│ ├── Timer.tsx # 시간 표시기
│ └── TypingStats.tsx # 실시간 통계 (WPM, Accuracy)
├── UI Component/
│ ├── MenuBar # 각 모드마다 표시될 메뉴바
│ ├── ThemeSwitcher.tsx # 테마 토글
│ ├── Modal.tsx # 모달 컴포넌트
├── Result/
│ ├── ResultSummary.tsx # 결과 요약
│ ├── AccuracyChart.tsx # 정확도 그래프
│ └── TypingGraph.tsx # 시간별 WPM 그래프
├── Settings/
│ ├── ThemeSettings.tsx
│ ├── SoundSettings.tsx
│ └── TypingSettings.tsx
