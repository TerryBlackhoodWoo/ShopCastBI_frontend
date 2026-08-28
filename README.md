# ShopCastBI — Frontend

공영홈쇼핑 편성 데이터를 보여주는 대시보드. Vite + React로 구성되어 있으며, [backend](../backend)의 `/api/broadcasts`, `/api/events`를 호출합니다.

## 실행

```bash
npm install
npm run dev
```

기본적으로 `http://localhost:4000`(backend)을 호출하도록 되어 있습니다 — `src/pages/BroadcastDashboard.jsx`의 `API_BASE_URL` 상수에 하드코딩되어 있으니, 배포 시에는 환경변수로 분리하는 게 좋습니다 (TODO).

## 현재 상태

| 화면 | 상태 |
|---|---|
| 홈쇼핑 탭 | ✅ 완료 — 썸네일/상품명/카테고리/방송시간/가격(할인 배지)/무료배송·무이자·품절 태그 |
| 라방 탭 | ⚠️ 기본 골격만 — 백엔드 API 자체가 아직 검증 중이라 UI도 임시(제목/방송시간/진행시간 2컬럼)로만 되어 있음 |
| 이벤트(`/api/events`) | ❌ 미연동 — 상품/편성과 연결되는 키가 없는 별도 리소스라 배너나 별도 섹션으로 붙일 예정 |

## 폴더 구조

```
src/
  pages/
    BroadcastDashboard.jsx   # 데이터 fetch + 상태 관리
  components/
    BroadcastTypeToggle.jsx  # 라이브/홈쇼핑 탭 전환
    BroadcastListTable.jsx   # 타입별로 다른 컬럼 렌더링 (홈쇼핑 4컬럼 / 라방 2컬럼)
  constants/
    broadcastType.js
    requestStatus.js
```

## TODO

- [ ] 라방 탭 전용 UI 디자인 (백엔드 검증 완료 후)
- [ ] `/api/events` 연동 — 배너 또는 별도 섹션
- [ ] `API_BASE_URL` 환경변수로 분리 (`import.meta.env.VITE_API_BASE_URL` 등)