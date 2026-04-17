import Layout from '../layouts/Layout'
import heroPng from '../assets/hero.png'
import './Login.css'

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.5 30.2 0 24 0 14.7 0 6.7 5.4 2.7 13.3l7.9 6.1C12.5 13.1 17.8 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.1z" />
      <path fill="#FBBC05" d="M10.6 28.6A14.8 14.8 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.7 10.7l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.6-5.9c-2 1.4-4.6 2.2-7.6 2.2-6.2 0-11.5-3.6-13.4-9l-7.9 6.1C6.7 42.6 14.7 48 24 48z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.247h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

export default function Login() {
  return (
    <Layout>
      <div className="login">

        {/* ── 왼쪽: 브랜드 ── */}
        <div className="login-brand">
          <div className="login-brand-content">
            <p className="login-brand-tagline">매일 10분, 영어가 달라지는 기록 습관</p>
            <h1 className="login-brand-title">
              오늘의 한 줄이<br />
              <span className="login-brand-title-highlight">내일의 영어 실력</span>을<br />
              만듭니다.
            </h1>
            <p className="login-brand-sub">
              한국어로 쓰고, AI가 영어로 첨삭해주는 맞춤 학습!<br />
              기록하고, 교정받고, 성장하는 영어일기를 시작하세요.
            </p>

            <div className="login-features">
              <div className="login-feature">
                <span className="login-feature-icon">📝</span>
                <p className="login-feature-title">쉽고 꾸준한 기록</p>
                <p className="login-feature-desc">한국어로 자유롭게 쓰고<br />AI와 함께 영어로 완성</p>
              </div>
              <div className="login-feature">
                <span className="login-feature-icon">🤖</span>
                <p className="login-feature-title">첨삭 피드백</p>
                <p className="login-feature-desc">점수와 섬세한 첨삭으로<br />내 실력 정확히 파악</p>
              </div>
              <div className="login-feature">
                <span className="login-feature-icon">📈</span>
                <p className="login-feature-title">눈에 보이는 성장</p>
                <p className="login-feature-desc">매일의 기록이 쌓여<br />확실한 실력 향상</p>
              </div>
            </div>

            <div className="login-stats">
              <div className="login-stat">
                <strong>180+</strong>
                <span>가입 유저</span>
              </div>
              <div className="login-stat-divider" />
              <div className="login-stat">
                <strong>850,000+</strong>
                <span>완료된 일기</span>
              </div>
              <div className="login-stat-divider" />
              <div className="login-stat">
                <strong>93점</strong>
                <span>평균 점수</span>
              </div>
            </div>
          </div>

          {/* <img className="login-brand-image" src={heroPng} alt="hero" /> */}
        </div>

        {/* ── 오른쪽: 소셜 로그인 카드 ── */}
        <div className="login-card">
          <button className="social-btn apple">
            <AppleIcon />
            Apple로 로그인
          </button>

          <button className="social-btn google">
            <GoogleIcon />
            Google로 로그인
          </button>

          <button className="social-btn facebook">
            <FacebookIcon />
            Facebook으로 로그인
          </button>

          <button className="social-btn email">
            <EmailIcon />
            이메일로 로그인
          </button>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <button className="login-join">회원가입</button>
        </div>

      </div>
    </Layout>
  )
}
