import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../layouts/Layout'
import Calendar from '../components/Calendar'
import DiaryModal from '../components/DiaryModal'
import EmptyDiaryModal from '../components/EmptyDiaryModal'
import type { DiaryEntry } from '../components/Calendar'
import './Home.css'

const MOCK_ENTRIES: Record<number, DiaryEntry> = {
  3:  { score: 92, koreanText: '오늘 학교 수업이 끝나고 친구랑 카페에 갔다. 새로운 음료를 마셨는데 맛있었다. 집에 돌아와서 영어 공부를 조금 했다.', englishText: 'After school end, I go cafe with friend. I drink new beverage, it was so delicious. I come back home and do English study little bit.', aiCorrectedText: 'After school, I went to a cafe with my friend. I tried a new beverage, and it was delicious. Then I came home and studied English for a bit.', corrections: [{ original: 'go', corrected: 'went', explanation: '과거형' }], createdTime: '21:30' },
  4:  { score: 88, koreanText: '오늘은 도서관에서 공부를 했다. 집중이 잘 됐고 많이 배웠다.', englishText: 'Today I study at library. My concentrate was very good and I learn many things.', aiCorrectedText: 'Today I studied at the library. I was able to focus well and learned a lot.', corrections: [{ original: 'focused well', corrected: 'able to focus well', explanation: '더 자연스러운 표현' }], createdTime: '20:15' },
  5:  { score: 72, koreanText: '오늘은 별로 한 게 없었다. 집에서 쉬었다.', englishText: 'Today I don\'t do anything special. I just take rest in my home.', aiCorrectedText: 'Today I did not do much. I just rested at home.', corrections: [{ original: 'rested', corrected: 'just rested', explanation: '강조 표현 추가' }], createdTime: '22:00' },
  7:  { score: 95, koreanText: '친구 생일 파티가 있었다. 정말 즐거운 하루였다.', englishText: 'Today is my friend\'s birthday party. It was very very fun day for me.', aiCorrectedText: 'I attended my friend\'s birthday party. It was a truly enjoyable day.', corrections: [{ original: 'really fun', corrected: 'truly enjoyable', explanation: '더 세련된 표현' }], createdTime: '23:10' },
  9:  { score: 84, koreanText: '오늘 운동을 했다. 힘들었지만 보람찼다.', englishText: 'I did exercise today. It was very hard but I feel good after that.', aiCorrectedText: 'I exercised today. It was tough but very rewarding.', corrections: [{ original: 'worked out', corrected: 'exercised', explanation: '더 격식체 표현' }], createdTime: '19:45' },
}

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
            entries={MOCK_ENTRIES}
            onDateClick={handleDateClick}
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