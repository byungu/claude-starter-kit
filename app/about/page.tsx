import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export const metadata: Metadata = {
  title: '소개',
  description: 'Next.js 모던 웹 스타터킷 소개 페이지',
}

const TECH_STACK = [
  { name: 'Next.js 16', description: 'App Router, Server Components, Streaming' },
  { name: 'React 19', description: '최신 React 기능, useTransition, use()' },
  { name: 'TypeScript 5', description: '완전한 타입 안전성, 엄격 모드' },
  { name: 'Tailwind CSS v4', description: 'oklch 색상, CSS-first 설정' },
  { name: 'ShadcnUI', description: 'radix-nova 스타일, 접근성 준수' },
  { name: 'usehooks-ts', description: 'useMediaQuery, useIsClient, useLocalStorage' },
  { name: 'next-themes', description: 'SSR 플래시 없는 다크모드' },
  { name: 'react-hook-form', description: '성능 최적화된 폼 관리' },
  { name: 'zod', description: 'TypeScript 스키마 검증' },
  { name: 'sonner', description: '아름다운 토스트 알림' },
]

const TEAM = [
  { name: '개발자', role: 'Full Stack Developer', initials: 'DEV' },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* 헤더 */}
      <div className="text-center sm:text-left">
        <Badge variant="secondary" className="mb-4">프로젝트 소개</Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          모던 웹 스타터킷
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          반복적인 초기 설정 없이 바로 개발을 시작할 수 있도록 구성된
          프로덕션 준비 완료 Next.js 스타터킷입니다.
        </p>
      </div>

      <Separator className="my-10" />

      {/* 기술 스택 */}
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">기술 스택</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          검증되고 활발하게 유지보수되는 라이브러리만 엄선했습니다.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {TECH_STACK.map((tech) => (
            <Card key={tech.name} className="flex items-start gap-3 p-4">
              <Badge variant="outline" className="mt-0.5 shrink-0 text-xs">
                {tech.name}
              </Badge>
              <p className="text-sm text-muted-foreground">{tech.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-10" />

      {/* 프로젝트 특징 */}
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">설계 원칙</h2>
        <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
          {PRINCIPLES.map((principle) => (
            <li key={principle.title} className="flex gap-3">
              <span className="mt-0.5 text-primary">✦</span>
              <div>
                <span className="font-medium text-foreground">{principle.title}</span>
                {' — '}
                {principle.description}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Separator className="my-10" />

      {/* 팀 */}
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">만든 사람</h2>
        <div className="mt-6 flex flex-wrap gap-4">
          {TEAM.map((member) => (
            <div key={member.name} className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const PRINCIPLES = [
  {
    title: '바퀴를 재발명하지 않는다',
    description: '검증된 라이브러리를 적극 활용하여 유지보수 부담을 줄입니다.',
  },
  {
    title: 'Server Component 우선',
    description: 'Client Component는 꼭 필요한 경우에만 사용하여 번들 크기를 최소화합니다.',
  },
  {
    title: '타입 안전성',
    description: 'TypeScript 엄격 모드와 zod 스키마로 런타임 에러를 사전에 방지합니다.',
  },
  {
    title: '접근성',
    description: 'ShadcnUI + Radix UI 기반으로 키보드 탐색과 스크린 리더를 기본 지원합니다.',
  },
]
