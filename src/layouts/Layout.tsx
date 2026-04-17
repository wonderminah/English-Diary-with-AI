import Header from './Header'
import './Layout.css'

interface LayoutProps {
  activeTab?: '홈' | '복습' | '통계'
  children: React.ReactNode
}

export default function Layout({ activeTab, children }: LayoutProps) {
  return (
    <div className="layout">
      <Header activeTab={activeTab} />
      <main className="layout-main">
        <div className="layout-inner">
          {children}
        </div>
      </main>
    </div>
  )
}
