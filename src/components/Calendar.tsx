import { useState } from 'react'

// 날짜별 일기 데이터 타입
export interface DiaryEntry {
  score: number
}

interface CalendarProps {
  year: number        // 오늘의 연도
  month: number       // 오늘의 월 (1~12)
  today: number       // 오늘 날짜
  entries: Record<number, DiaryEntry> // 이번 달 일기 데이터
}

// 해당 월의 1일이 무슨 요일인지 반환 (월요일 시작 기준: 월=0 ... 일=6)
function getStartDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month - 1, 1).getDay()
  return day === 0 ? 6 : day - 1
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

const WEEK_DAYS = ['월', '화', '수', '목', '금', '토', '일']

export default function Calendar({ year, month, today, entries }: CalendarProps) {
  const [curYear, setCurYear] = useState(year)
  const [curMonth, setCurMonth] = useState(month)

  function goPrev() {
    if (curMonth === 1) { setCurYear(y => y - 1); setCurMonth(12) }
    else setCurMonth(m => m - 1)
  }

  function goNext() {
    if (curMonth === 12) { setCurYear(y => y + 1); setCurMonth(1) }
    else setCurMonth(m => m + 1)
  }

  function goToday() {
    setCurYear(year)
    setCurMonth(month)
  }

  // 현재 보고 있는 달이 "오늘의 달"일 때만 entries/today 표시
  const isCurrentMonth = curYear === year && curMonth === month
  const activeEntries = isCurrentMonth ? entries : {}
  const activeToday = isCurrentMonth ? today : -1

  const startDay = getStartDayOfMonth(curYear, curMonth)
  const totalDays = getDaysInMonth(curYear, curMonth)

  const cells: (number | null)[] = [
    ...Array(startDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]

  function getDayStatus(date: number) {
    const entry = activeEntries[date]
    if (date === activeToday) return 'today'
    if (!entry) return 'empty'
    return entry.score >= 90 ? 'complete' : 'retry'
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <span className="calendar-title">{curYear}년 {curMonth}월</span>
        <div className="calendar-nav">
          <button className="calendar-nav-btn" onClick={goPrev}>‹</button>
          <button className="calendar-nav-btn" onClick={goNext}>›</button>
          <button className="calendar-today-btn" onClick={goToday}>오늘</button>
        </div>
      </div>

      <div className="calendar-grid">
        {WEEK_DAYS.map((d) => (
          <div key={d} className="calendar-weekday">{d}</div>
        ))}

        {cells.map((date, i) => {
          if (date === null) return <div key={`empty-${i}`} />

          const status = getDayStatus(date)
          const score = activeEntries[date]?.score

          return (
            <div key={date} className="calendar-cell">
              <div className={`calendar-day ${status}`}>
                {status === 'complete' || status === 'retry' ? score : date}
              </div>
              {(status === 'complete' || status === 'retry') && (
                <span className="calendar-date-label">{date}</span>
              )}
            </div>
          )
        })}
      </div>

      <div className="calendar-legend">
        <span className="legend-item complete">● 완료 (90점 이상)</span>
        <span className="legend-item retry">● 진행중 / 재도전</span>
        <span className="legend-item empty">● 미작성</span>
      </div>
    </div>
  )
}
