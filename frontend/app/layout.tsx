import './globals.css'
import type { Metadata, Viewport } from 'next'

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
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
