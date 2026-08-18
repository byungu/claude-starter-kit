import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-16 text-center sm:px-16">
          {/* 배경 장식 */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary-foreground/5"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 size-64 rounded-full bg-primary-foreground/5"
          />

          <h2 className="relative text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            지금 바로 시작하세요
          </h2>
          <p className="relative mt-4 text-primary-foreground/80 sm:text-lg">
            클론 한 번으로 모든 설정이 완료됩니다.
            <br />
            핵심 기능 개발에만 집중하세요.
          </p>

          <div className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href="/dashboard">
                대시보드 살펴보기
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/about">프로젝트 소개</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
