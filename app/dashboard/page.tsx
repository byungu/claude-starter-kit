import type { Metadata } from 'next'
import { DashboardClient } from './dashboard-client'

export const metadata: Metadata = {
  title: '대시보드',
  description: '스타터킷 대시보드 예시 페이지',
}

export default function DashboardPage() {
  return <DashboardClient />
}
