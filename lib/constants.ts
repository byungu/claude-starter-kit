import { Zap, Moon, Shield, Layout, Bell, Sparkles } from 'lucide-react'

export const SITE_NAME = 'StarterKit'
export const SITE_DESCRIPTION = '빠르게 시작하는 Next.js 모던 웹 스타터킷'
export const SITE_URL = 'https://starterkit.dev'

export const NAV_LINKS = [
  { href: '/', label: '홈' },
  { href: '/about', label: '소개' },
  { href: '/dashboard', label: '대시보드' },
] as const

export const FEATURES = [
  {
    icon: Zap,
    title: '빠른 개발',
    description: 'ShadcnUI + Tailwind CSS v4로 즉시 시작. 반복 작업 없이 핵심 기능에 집중하세요.',
  },
  {
    icon: Moon,
    title: '다크모드',
    description: 'next-themes로 시스템 테마 자동 감지. 새로고침 후에도 상태가 유지됩니다.',
  },
  {
    icon: Shield,
    title: '타입 안전성',
    description: 'TypeScript + zod 스키마 검증으로 런타임 에러를 사전에 방지합니다.',
  },
  {
    icon: Layout,
    title: 'App Router',
    description: 'Next.js 16 Server Components 기본. 필요한 곳에만 Client Component를 사용합니다.',
  },
  {
    icon: Bell,
    title: '토스트 알림',
    description: 'sonner로 아름답고 간단한 알림 처리. 성공, 에러, 로딩 상태를 쉽게 표현합니다.',
  },
  {
    icon: Sparkles,
    title: '훅 유틸리티',
    description: 'usehooks-ts로 검증된 커스텀 훅 제공. useMediaQuery, useLocalStorage 등을 바로 사용합니다.',
  },
] as const

export const FOOTER_LINKS = [
  {
    label: '제품',
    links: [
      { href: '/', label: '홈' },
      { href: '/about', label: '소개' },
      { href: '/dashboard', label: '대시보드' },
    ],
  },
  {
    label: '리소스',
    links: [
      { href: 'https://nextjs.org/docs', label: 'Next.js 문서', external: true },
      { href: 'https://ui.shadcn.com', label: 'ShadcnUI', external: true },
      { href: 'https://tailwindcss.com', label: 'Tailwind CSS', external: true },
    ],
  },
] as const
