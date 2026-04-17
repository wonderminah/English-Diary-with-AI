interface HeaderProps {
  activeTab?: '홈' | '복습' | '통계'
}

const tabs = ['홈', '복습', '통계'] as const

export default function Header({ activeTab = '홈' }: HeaderProps) {
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
            key={tab}
            className={`header-nav-item ${activeTab === tab ? 'active' : ''}`}
          >
            {tab}
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
