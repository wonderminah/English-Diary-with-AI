// 날짜별 일기 데이터 타입
export interface DiaryEntry {
  score: number
}

interface CalendarProps {
  year: number
  month: number // 1~12
  today: number
  entries: Record<number, DiaryEntry> // key = 날짜(1~31)
}

// 해당 월의 1일이 무슨 요일인지 반환 (0=일, 1=월 ... 6=토)
// 캘린더가 월~일 순서이므로 월요일 시작 기준으로 변환
function getStartDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month - 1, 1).getDay() // 0(일)~6(토)
  return day === 0 ? 6 : day - 1 // 월요일=0, ..., 일요일=6
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

const WEEK_DAYS = ['월', '화', '수', '목', '금', '토', '일']

export default function Calendar({ year, month, today, entries }: CalendarProps) {
  const startDay = getStartDayOfMonth(year, month)
  const totalDays = getDaysInMonth(year, month)

  // 달력 셀 배열: null은 빈 칸
  const cells: (number | null)[] = [
    ...Array(startDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]

  function getDayStatus(date: number) {
    const entry = entries[date]
    if (date === today) return 'today'
    if (!entry) return 'empty'
    return entry.score >= 90 ? 'complete' : 'retry'
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <span className="calendar-title">{year}년 {month}월</span>
        <div className="calendar-nav">
          <button className="calendar-nav-btn">‹</button>
          <button className="calendar-nav-btn">›</button>
          <button className="calendar-today-btn">오늘</button>
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
            <div key={date} className="calendar-cell">
              <div className={`calendar-day ${status}`}>
                {status === 'complete' || status === 'retry' ? score : date}
              </div>
              {/* 점수 있는 날은 날짜를 작게 위에 표시 */}
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
