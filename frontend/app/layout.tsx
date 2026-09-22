import './globals.css'
import type { Metadata, Viewport } from 'next'
import ThemeToggle from '../components/ThemeToggle'

export const metadata: Metadata = {
  title: '천기누설 | 프리미엄 자미두수 & 사주 심화 분석',
  description: '사주팔자와 자미두수를 결합한 디테일한 운세 심화 분석',
}

// 이게 없으면 모바일이 980px 기준으로 레이아웃한 뒤 축소해서 보여준다.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 깜빡임 방지 스크립트가 하이드레이션 전에 data-theme을 붙이므로 <html> 경고를 억제한다
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 첫 페인트 전에 테마를 확정해 깜빡임을 막는다. 저장된 선택이 없으면
            data-theme을 비워두고 prefers-color-scheme에 맡긴다. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t}}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeToggle />
        {children}
      </body>
    </html>
  )
}
