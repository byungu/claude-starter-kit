import Link from 'next/link'
import { ArrowRight, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:py-32 lg:py-40">
      {/* 배경 그라디언트 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.08),transparent)]"
      />

      <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-xs font-medium">
        Next.js 16 · React 19 · Tailwind CSS v4
      </Badge>

      <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        빠르게 시작하는{' '}
        <span className="text-primary">모던 웹 스타터킷</span>
      </h1>

      <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
        ShadcnUI, Tailwind CSS v4, TypeScript, 검증된 라이브러리로 구성된 프로덕션 준비 완료 스타터킷.
        반복 작업 없이 바로 개발을 시작하세요.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <Button asChild size="lg" className="gap-2">
          <Link href="/dashboard">
            대시보드 보기
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="gap-2">
          <Link href="/about">
            <Code2 className="size-4" />
            프로젝트 소개
          </Link>
        </Button>
      </div>

      {/* 기술 스택 뱃지 */}
      <div className="mt-16 flex flex-wrap justify-center gap-2">
        {TECH_STACK.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  )
}

const TECH_STACK = [
  'Next.js 16',
  'React 19',
  'TypeScript 5',
  'Tailwind CSS v4',
  'ShadcnUI',
  'usehooks-ts',
  'next-themes',
  'react-hook-form',
  'zod',
  'sonner',
]
