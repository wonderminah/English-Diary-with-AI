import { useState } from 'react'
import { WEEK_DAYS } from '../constants/days'

// 날짜별 일기 데이터 타입
export interface Correction {
  original: string
  corrected: string
  explanation: string
}

export interface DiaryEntry {
  score: number
  koreanText: string
  englishText: string
  aiCorrectedText: string
  corrections: Correction[]
  createdTime: string   // "HH:MM" 형식
}

interface CalendarProps {
  year: number
  month: number
  today: number
  entries: Record<number, DiaryEntry>
  onDateClick: (date: number, year: number, month: number, entry: DiaryEntry | null) => void
  onMonthChange?: (year: number, month: number) => void
}

// 해당 월의 1일이 무슨 요일인지 반환 (일요일 시작 기준: 일=0 ... 토=6)
function getStartDayOfMonth(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay()
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}


export default function Calendar({ year, month, today, entries, onDateClick, onMonthChange }: CalendarProps) {
  const [curYear, setCurYear] = useState(year)
  const [curMonth, setCurMonth] = useState(month)

  function goPrev() {
    const newYear = curMonth === 1 ? curYear - 1 : curYear
    const newMonth = curMonth === 1 ? 12 : curMonth - 1
    setCurYear(newYear); setCurMonth(newMonth)
    onMonthChange?.(newYear, newMonth)
  }

  function goNext() {
    const newYear = curMonth === 12 ? curYear + 1 : curYear
    const newMonth = curMonth === 12 ? 1 : curMonth + 1
    setCurYear(newYear); setCurMonth(newMonth)
    onMonthChange?.(newYear, newMonth)
  }

  function goToday() {
    setCurYear(year)
    setCurMonth(month)
    onMonthChange?.(year, month)
  }

  const isCurrentMonth = curYear === year && curMonth === month
  const activeToday = isCurrentMonth ? today : -1

  const startDay = getStartDayOfMonth(curYear, curMonth)
  const totalDays = getDaysInMonth(curYear, curMonth)

  const cells: (number | null)[] = [
    ...Array(startDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]

  function getDayStatus(date: number) {
    const entry = entries[date]
    if (entry) return entry.score >= 90 ? 'complete' : 'retry'
    if (date === activeToday) return 'today'
    return 'empty'
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
          const score = entries[date]?.score

          return (
            <div key={date} className="calendar-cell" onClick={() => onDateClick(date, curYear, curMonth, entries[date] ?? null)}>
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
