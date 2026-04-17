import { useNavigate } from 'react-router-dom'

const tabs = [
  { label: '홈', path: '/' },
  { label: '복습', path: '/review' },
  { label: '통계', path: '/stats' },
] as const

type Tab = typeof tabs[number]['label']

interface HeaderProps {
  activeTab?: Tab
}

export default function Header({ activeTab }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <span className="header-logo-icon">📖</span>
          <span className="header-logo-text">EngDiary</span>
        </div>

        <nav className="header-nav">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={`header-nav-item ${activeTab === tab.label ? 'active' : ''}`}
              onClick={() => navigate(tab.path)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="header-right">
          <span className="header-streak">🔥 5일 연속</span>
          <div className="header-avatar">JD</div>
        </div>
      </div>
    </header>
  )
}
