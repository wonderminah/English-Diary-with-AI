import { WEEK_DAYS } from '../constants/days'

interface EmptyDiaryModalProps {
  date: number
  year: number
  month: number
  onClose: () => void
  onWrite: (year: number, month: number, date: number) => void
}

export default function EmptyDiaryModal({ date, year, month, onClose, onWrite }: EmptyDiaryModalProps) {
  const dayLabel = WEEK_DAYS[new Date(year, month - 1, date).getDay()]

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal empty-modal" onClick={e => e.stopPropagation()}>

        {/* ── 헤더 ── */}
        <div className="modal-header">
          <div className="modal-date-wrap">
            <span className="modal-date-icon">📅</span>
            <span className="modal-date">{year}년 {month}월 {date}일 ({dayLabel})</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* ── 본문 ── */}
        <div className="empty-modal-body">
          <p className="empty-modal-title">새로운 하루를 기록해볼까요?</p>
          <p className="empty-modal-subtitle">
            {year}년 {month}월 {date}일의 일기를 작성합니다.
          </p>
        </div>

        {/* ── 안내 카드 ── */}
        <div className="empty-modal-info">
          <span className="empty-modal-info-icon">📌</span>
          <p className="empty-modal-info-text">
            한국어로 오늘 하루를 자유롭게 작성하고,<br />
            영어로 번역해 AI의 피드백을 받아보세요.
          </p>
        </div>

        {/* ── 버튼 ── */}
        <button className="modal-btn primary empty-modal-write-btn" onClick={() => onWrite(year, month, date)}>
          일기 작성하기
        </button>
        <button className="empty-modal-later" onClick={onClose}>
          나중에 할게요
        </button>

      </div>
    </div>
  )
}
