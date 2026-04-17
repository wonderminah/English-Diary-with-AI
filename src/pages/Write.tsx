import { useState } from 'react'
import Layout from '../layouts/Layout'
import './Write.css'

type Step = 1 | 2 | 3

const MOCK_DATE = '2026년 4월 17일 (오늘)'

// Step 2에서 쓸 mock AI 점수/힌트 (나중에 실제 API로 교체)
const MOCK_SCORE = 82
const MOCK_HINT = '시제가 조금 어색해요. 과거에 일어난 일을 나타내보세요!'

// Step 3에서 쓸 mock AI 추천 (나중에 실제 API로 교체)
const MOCK_CORRECTIONS = [
  { original: 'go', corrected: 'went', explanation: '과거형' },
  { original: 'drink → beverage', corrected: '더 자연스러운 표현', explanation: '더 자연스러운 표현' },
  { original: 'and it was really good', corrected: 'and it was delicious', explanation: '더 적절한 형용사' },
  { original: 'I came home and', corrected: 'Then I came home and', explanation: '순서 표현 추가' },
]

// ── 스텝 인디케이터 ──────────────────────────────────
function StepIndicator({ step }: { step: Step }) {
  const steps = [
    { num: 1, label: '한국어 입력' },
    { num: 2, label: '영어 번역' },
    { num: 3, label: '결과 확인' },
  ]

  return (
    <div className="step-indicator">
      {steps.map((s, i) => (
        <>
          <div key={s.num} className={`step-item ${step === s.num ? 'active' : step > s.num ? 'done' : ''}`}>
            <div className="step-circle">
              {step > s.num ? '✓' : s.num}
            </div>
            <span className="step-label">{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div key={`line-${i}`} className={`step-line ${step > s.num ? 'done' : ''}`} />
          )}
        </>
      ))}
    </div>
  )
}

// ── 날짜 셀렉터 ──────────────────────────────────────
function DateSelector() {
  return (
    <div className="date-selector-wrap">
      <button className="date-selector">
        <span className="date-selector-icon">📅</span>
        <span>{MOCK_DATE}</span>
        <span className="date-selector-arrow">∨</span>
      </button>
      <p className="date-selector-hint">날짜를 클릭하면 다른 날짜로 변경할 수 있어요.</p>
    </div>
  )
}

// ── Step 1: 한국어 입력 ──────────────────────────────
function Step1({ onNext }: { onNext: (text: string) => void }) {
  const [text, setText] = useState('')
  const MAX = 1000

  return (
    <div className="write-step">
      <DateSelector />

      <div className="write-card">
        <div className="write-card-header">
          <span className="write-card-title">한국어로 작성</span>
          <button className="btn-autosave">⏱ 임시저장</button>
        </div>
        <textarea
          className="write-textarea"
          placeholder="오늘 하루를 한국어로 자유롭게 적어보세요."
          value={text}
          onChange={e => setText(e.target.value)}
          maxLength={MAX}
        />
        <div className="write-charcount">{text.length} / {MAX}</div>
      </div>

      <div className="write-actions">
        <button
          className="btn-next"
          disabled={text.trim().length === 0}
          onClick={() => onNext(text)}
        >
          다음: 영어 번역하기 →
        </button>
      </div>
    </div>
  )
}

// ── Step 2: 영어 번역 ────────────────────────────────
function Step2({
  koreanText,
  onNext,
  attempt,
  onRetry,
}: {
  koreanText: string
  onNext: (text: string) => void
  attempt: number
  onRetry: () => void
}) {
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const MAX = 1000
  const MAX_ATTEMPTS = 3

  function handleSubmit() {
    setSubmitted(true)
  }

  return (
    <div className="write-step">
      <DateSelector />

      <div className="step2-grid">
        {/* 왼쪽: 한국어 원문 */}
        <div className="write-card">
          <span className="write-card-title">한국어 원문</span>
          <p className="step2-original">{koreanText}</p>
        </div>

        {/* 오른쪽: 영어 번역 */}
        <div className="write-card">
          <div className="write-card-header">
            <span className="write-card-title">영어로 번역해보세요 ({attempt}번째 시도)</span>
            <span className="attempt-badge">{attempt} / {MAX_ATTEMPTS}</span>
          </div>
          <textarea
            className="write-textarea"
            placeholder="한국어 원문을 영어로 번역해보세요."
            value={text}
            onChange={e => { setText(e.target.value); setSubmitted(false) }}
            maxLength={MAX}
          />
          <div className="write-charcount">{text.length} / {MAX}</div>

          {submitted && (
            <div className="step2-feedback">
              <div className="step2-score">
                <span className="step2-score-label">점수</span>
                <strong className="step2-score-value">{MOCK_SCORE} <span>/100</span></strong>
              </div>
              <div className="step2-hint">
                <span className="step2-hint-icon">💡</span>
                <span className="step2-hint-label">힌트</span>
                <p>{MOCK_HINT}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="write-actions">
        {!submitted ? (
          <button
            className="btn-next"
            disabled={text.trim().length === 0}
            onClick={handleSubmit}
          >
            채점하기
          </button>
        ) : (
          <>
            {attempt < MAX_ATTEMPTS && (
              <button className="btn-secondary" onClick={onRetry}>
                다시 작성
              </button>
            )}
            <button className="btn-next" onClick={() => onNext(text)}>
              결과 확인하기 →
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ── Step 3: 결과 확인 ────────────────────────────────
function Step3({ userText, onGoHome }: { userText: string; onGoHome: () => void }) {
  const score = 93
  const aiText = `After school, I went to a cafe with my friend. I tried a new beverage, and it was delicious. Then I came home and studied English for a bit.`

  return (
    <div className="write-step">
      <DateSelector />

      <div className="result-header">
        <p className="result-congrats">🎉 축하합니다! 합격이에요!</p>
        <div className="result-score-row">
          <span className="result-score">{score}</span>
          <span className="result-score-denom">/ 100</span>
          <span className="result-grade">Good!</span>
        </div>
      </div>

      <div className="result-grid">
        {/* 내 문장 */}
        <div className="write-card">
          <span className="write-card-title">내 문장</span>
          <p className="result-text">{userText}</p>
        </div>

        {/* AI 추천 문장 */}
        <div className="write-card">
          <span className="write-card-title">AI 추천 문장</span>
          <p className="result-text">
            After school, I <span className="result-highlight">went</span> to a cafe
            with my friend. I <span className="result-highlight">tried a new beverage</span>,
            and it was delicious. <span className="result-highlight">Then</span> I came home
            and studied English <span className="result-highlight">for a bit</span>.
          </p>
        </div>
      </div>

      {/* 주요 차이점 */}
      <div className="write-card result-diff-card">
        <span className="write-card-title">주요 차이점</span>
        <ul className="result-diff-list">
          {MOCK_CORRECTIONS.map((c, i) => (
            <li key={i}>
              <span className="diff-arrow">•</span>
              <strong>{c.original}</strong> → <strong className="diff-corrected">{c.corrected}</strong>
              <span className="diff-explanation"> ({c.explanation})</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="write-actions">
        <button className="btn-secondary" onClick={onGoHome}>
          캘린더로 돌아가기
        </button>
        <button className="btn-next">
          이 일기 수정하기
        </button>
        <button className="btn-share">공유하기</button>
      </div>
    </div>
  )
}

// ── 메인 Write 페이지 ─────────────────────────────────
export default function Write() {
  const [step, setStep] = useState<Step>(1)
  const [koreanText, setKoreanText] = useState('')
  const [englishText, setEnglishText] = useState('')
  const [attempt, setAttempt] = useState(1)

  const pageTitle = step === 3 ? '학습 결과' : '일기 작성'

  return (
    <Layout activeTab="홈">
      <div className="write-page">
        <div className="write-top">
          <button className="write-back" onClick={() => step > 1 ? setStep(s => (s - 1) as Step) : undefined}>
            ‹ 홈으로
          </button>
          <h1 className="write-title">{pageTitle}</h1>
        </div>

        <StepIndicator step={step} />

        {step === 1 && (
          <Step1 onNext={(text) => { setKoreanText(text); setStep(2) }} />
        )}
        {step === 2 && (
          <Step2
            koreanText={koreanText}
            attempt={attempt}
            onNext={(text) => { setEnglishText(text); setStep(3) }}
            onRetry={() => setAttempt(a => a + 1)}
          />
        )}
        {step === 3 && (
          <Step3
            userText={englishText}
            onGoHome={() => setStep(1)}
          />
        )}
      </div>
    </Layout>
  )
}
