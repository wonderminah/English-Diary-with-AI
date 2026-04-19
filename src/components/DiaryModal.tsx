import { useState } from 'react'
import type { DiaryEntry } from './Calendar'
import './DiaryModal.css'
import { WEEK_DAYS } from '../constants/days'

interface DiaryModalProps {
  date: number
  year: number
  month: number
  entry: DiaryEntry
  onClose: () => void
}

export default function DiaryModal({ date, year, month, entry, onClose }: DiaryModalProps) {
  // 텍스트 말줄임 (3줄 이상이면 접기)
  const [showFullKorean, setShowFullKorean] = useState(false)
  const [showFullMyEnglish, setShowFullMyEnglish] = useState(false)
  const [showFullAi, setShowFullAi] = useState(false)

  const dayLabel = WEEK_DAYS[new Date(year, month - 1, date).getDay()]
  const isGood = entry.score >= 90
  
  const KOREAN_LIMIT = 60
  const ENGLISH_LIMIT = 80
  const isKoreanLong = entry.koreanText.length > KOREAN_LIMIT
  const isMyEnglishLong = entry.englishText.length > ENGLISH_LIMIT
  const isAiLong = entry.aiCorrectedText.length > ENGLISH_LIMIT

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>

        {/* ── 헤더 ── */}
        <div className="modal-header">
          <div className="modal-date-wrap">
            <span className="modal-date-icon">📅</span>
            <span className="modal-date">{year}년 {month}월 {date}일 ({dayLabel})</span>
          </div>
          <div className="modal-header-actions">
            <button className="modal-delete-btn">삭제</button>
            <button className="modal-close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* ── 점수 카드 ── */}
        <div className="modal-score-card">
          <div className="modal-score-left">
            <span className="modal-score-label">최종 점수</span>
            <div className="modal-score-row">
              <span className="modal-score">{entry.score}</span>
              <span className="modal-score-denom">/ 100</span>
              <span className={`modal-grade ${isGood ? 'good' : 'retry'}`}>
                {isGood ? 'Good!' : 'Try again'}
              </span>
            </div>
          </div>
        </div>

        {/* ── 한국어 원문 ── */}
        <div className="modal-section">
          <div className="modal-section-header">
            <span className="modal-section-title">한국어 원문</span>
            {isKoreanLong && (
              <button className="modal-toggle" onClick={() => setShowFullKorean(v => !v)}>
                {showFullKorean ? '접기' : '전체 보기'}
              </button>
            )}
          </div>
          <p className="modal-text">
            {isKoreanLong && !showFullKorean
              ? entry.koreanText.slice(0, KOREAN_LIMIT) + '...'
              : entry.koreanText}
          </p>
        </div>

        {/* ── 내 영어 번역 ── */}
        <div className="modal-section">
          <div className="modal-section-header">
            <span className="modal-section-title">내 영어 번역 (최종 제출본)</span>
            {isMyEnglishLong && (
              <button className="modal-toggle" onClick={() => setShowFullMyEnglish(v => !v)}>
                {showFullMyEnglish ? '접기' : '전체 보기'}
              </button>
            )}
          </div>
          <p className="modal-text modal-english">
            {isMyEnglishLong && !showFullMyEnglish
              ? entry.englishText.slice(0, ENGLISH_LIMIT) + '...'
              : entry.englishText}
          </p>
        </div>

        {/* ── AI 영어 번역 ── */}
        <div className="modal-section">
          <div className="modal-section-header">
            <span className="modal-section-title">AI 영어 번역</span>
            {isAiLong && (
              <button className="modal-toggle" onClick={() => setShowFullAi(v => !v)}>
                {showFullAi ? '접기' : '전체 보기'}
              </button>
            )}
          </div>
          <p className="modal-text modal-english">
            {isAiLong && !showFullAi
              ? entry.aiCorrectedText.slice(0, ENGLISH_LIMIT) + '...'
              : entry.aiCorrectedText}
          </p>
          <div className="modal-score-badge">
            🏆 {entry.score}점
          </div>
        </div>

        {/* ── 하단 버튼 ── */}
        <div className="modal-actions">
          <button className="modal-btn secondary">🔄 재도전하기</button>
          <button className="modal-btn secondary">✏️ 수정하기</button>
          <button className="modal-btn primary">결과 보기 →</button>
        </div>

        <p className="modal-hint">
          💡 날짜를 클릭하여 다른 날짜의 일기를 볼 수 있어요.
        </p>

      </div>
    </div>
  )
}