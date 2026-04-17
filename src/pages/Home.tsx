import Layout from '../layouts/Layout'
import Calendar from '../components/Calendar'
import type { DiaryEntry } from '../components/Calendar'
import './Home.css'

// 임시 mock 데이터 (나중에 Firestore로 교체)
const MOCK_ENTRIES: Record<number, DiaryEntry> = {
  3: { score: 92 },
  4: { score: 88 },
  5: { score: 72 },
  7: { score: 95 },
  9: { score: 84 },
}

const TODAY = 17
const YEAR = 2026
const MONTH = 4

export default function Home() {
  const writtenThisWeek = 3
  const totalDaysInWeek = 7
  const avgScore = 87
  const progressPercent = (writtenThisWeek / totalDaysInWeek) * 100

  return (
    <Layout activeTab="홈">
      <div className="home">

        {/* ── 상단 ── */}
        <div className="home-top">
          <h1>안녕하세요, Jun님!</h1>
          <p>꾸준한 기록이 실력을 만듭니다.</p>
        </div>

        {/* ── 왼쪽 ── */}
        <div className="home-left">
          <Calendar
            year={YEAR}
            month={MONTH}
            today={TODAY}
            entries={MOCK_ENTRIES}
          />
        </div>

        {/* ── 오른쪽 ── */}
        <div className="home-right">

          {/* 오늘 일기 카드 */}
          <div className="today-card">
            <span className="today-card-label">{MONTH}월 {TODAY}일 일기</span>
            <p className="today-card-text">
              오늘의 기록이<br />영어 실력을 만듭니다!
            </p>
            <button className="btn-write-today">일기 쓰기</button>
          </div>

          {/* 이번 주 통계 카드 */}
          <div className="stats-card">
            <span className="stats-card-title">이번 주 통계</span>
            <div className="stats-row">
              <span className="stats-written">
                <strong>{writtenThisWeek}</strong> / {totalDaysInWeek}일 작성
              </span>
            </div>
            <div className="stats-progress-bar">
              <div
                className="stats-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="stats-score-row">
              <span className="stats-score-label">평균 점수</span>
              <span className="stats-score-value">{avgScore}점</span>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}
