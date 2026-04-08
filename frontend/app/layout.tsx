import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '천기누설 | 프리미엄 자미두수 & 사주 심화 분석',
  description: '사주팔자와 자미두수를 결합한 디테일한 운세 심화 분석',
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
