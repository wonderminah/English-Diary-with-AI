import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../layouts/Layout'
import Calendar from '../components/Calendar'
import DiaryModal from '../components/DiaryModal'
import EmptyDiaryModal from '../components/EmptyDiaryModal'
import type { DiaryEntry } from '../components/Calendar'
import { db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import type { Timestamp } from 'firebase/firestore'
import './Home.css'

const _today = new Date()
const TODAY = _today.getDate()
const YEAR = _today.getFullYear()
const MONTH = _today.getMonth() + 1

interface ModalState {
  date: number
  year: number
  month: number
  entry: DiaryEntry | null
}

export default function Home() {
  const navigate = useNavigate()
  const [modal, setModal] = useState<ModalState | null>(null)
  const [entries, setEntries] = useState<Record<number, DiaryEntry>>({})
  const [viewYear, setViewYear] = useState(YEAR)
  const [viewMonth, setViewMonth] = useState(MONTH)

  useEffect(() => {
    const mm = String(viewMonth).padStart(2, '0')
    const from = `${viewYear}-${mm}-01`
    const to   = `${viewYear}-${mm}-31`

    getDocs(query(
      collection(db, 'diary'),
      where('diaryDate', '>=', from),
      where('diaryDate', '<=', to),
    )).then(snapshot => {
      const result: Record<number, DiaryEntry> = {}
      snapshot.forEach(doc => {
        const data = doc.data()
        const attempts: { num: number; englishText: string; score: number; correctedText: string; corrections: DiaryEntry['corrections']; createdAt: Timestamp }[] = data.translationAttempts ?? []
        const last = attempts.reduce((a, b) => a.createdAt.seconds >= b.createdAt.seconds ? a : b, attempts[0])
        if (!last) return

        const date = Number(data.diaryDate.split('-')[2])
        const ts: Timestamp = data.createdAt
        const d = ts.toDate()
        const createdTime = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`

        result[date] = {
          score: last.score,
          koreanText: data.koreanText,
          englishText: last.englishText,
          aiCorrectedText: last.correctedText,
          corrections: last.corrections ?? [],
          createdTime,
        }
      })
      setEntries(result)
    }).catch(err => console.error('diary fetch 실패:', err))
  }, [viewYear, viewMonth])

  const writtenThisWeek = 3
  const totalDaysInWeek = 7
  const avgScore = 87
  const progressPercent = (writtenThisWeek / totalDaysInWeek) * 100

  function handleDateClick(date: number, year: number, month: number, entry: DiaryEntry | null) {
    setModal({ date, year, month, entry })
  }

  return (
    <Layout activeTab="홈">
      <div className="home">

        <div className="home-top">
          <h1>안녕하세요, Jun님!</h1>
          <p>꾸준한 기록이 실력을 만듭니다.</p>
        </div>

        <div className="home-left">
          <Calendar
            year={YEAR}
            month={MONTH}
            today={TODAY}
            entries={entries}
            onDateClick={handleDateClick}
            onMonthChange={(y, m) => { setViewYear(y); setViewMonth(m) }}
          />
        </div>

        <div className="home-right">
          <div className="today-card">
            <span className="today-card-label">{MONTH}월 {TODAY}일 일기</span>
            <p className="today-card-text">
              오늘의 기록이<br />영어 실력을 만듭니다!
            </p>
            <button className="btn-write-today" onClick={() => navigate('/write')}>일기 쓰기</button>
          </div>

          <div className="stats-card">
            <span className="stats-card-title">이번 주 통계</span>
            <div className="stats-row">
              <span className="stats-written">
                <strong>{writtenThisWeek}</strong> / {totalDaysInWeek}일 작성
              </span>
            </div>
            <div className="stats-progress-bar">
              <div className="stats-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="stats-score-row">
              <span className="stats-score-label">평균 점수</span>
              <span className="stats-score-value">{avgScore}점</span>
            </div>
          </div>
        </div>

      </div>

      {modal && modal.entry && (
        <DiaryModal
          date={modal.date}
          year={modal.year}
          month={modal.month}
          entry={modal.entry}
          onClose={() => setModal(null)}
        />
      )}
      {modal && !modal.entry && (
        <EmptyDiaryModal
          date={modal.date}
          year={modal.year}
          month={modal.month}
          onClose={() => setModal(null)}
          onWrite={(y, m, d) => navigate(`/write?year=${y}&month=${m}&date=${d}`)}
        />
      )}
    </Layout>
  )
}