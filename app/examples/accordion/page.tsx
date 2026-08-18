'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FAQ_ITEMS = [
  {
    value: 'faq-1',
    question: 'Next.js에서 서버 컴포넌트와 클라이언트 컴포넌트의 차이는?',
    answer:
      '서버 컴포넌트(Server Component)는 서버에서만 렌더링되어 번들 크기를 줄이고 데이터를 직접 접근할 수 있습니다. 클라이언트 컴포넌트는 "use client" 지시어를 사용하며 useState, useEffect, 이벤트 핸들러 등 브라우저 API가 필요한 경우에 사용합니다.',
  },
  {
    value: 'faq-2',
    question: 'react-hook-form을 zod와 함께 사용하는 이유는?',
    answer:
      'react-hook-form은 비제어 방식으로 불필요한 리렌더링을 최소화하며 폼 상태를 관리합니다. zod는 TypeScript와 완벽하게 통합된 스키마 검증 라이브러리로, 하나의 스키마로 타입 추론과 런타임 검증을 모두 처리합니다. @hookform/resolvers/zod로 두 라이브러리를 연결합니다.',
  },
  {
    value: 'faq-3',
    question: 'Tailwind CSS v4의 주요 변경사항은?',
    answer:
      'v4에서는 별도의 tailwind.config.js 파일 없이 CSS 파일에서 직접 설정합니다. @import "tailwindcss"로 임포트하고, @theme 블록에서 커스텀 토큰을 정의합니다. 성능도 크게 개선되어 빌드 속도가 훨씬 빠릅니다.',
  },
  {
    value: 'faq-4',
    question: 'usehooks-ts를 사용하는 이점은?',
    answer:
      '주간 4.5M+ 다운로드의 커뮤니티 검증 훅 모음입니다. useMediaQuery, useLocalStorage, useDebounce, useCopyToClipboard 등 실무에서 자주 쓰는 패턴을 직접 구현하지 않고 바로 사용할 수 있습니다. TypeScript 완벽 지원, SSR 안전, 테스트 완료 상태입니다.',
  },
  {
    value: 'faq-5',
    question: 'ShadcnUI와 다른 UI 라이브러리의 차이점은?',
    answer:
      'ShadcnUI는 npm 패키지가 아니라 소스 코드를 직접 프로젝트에 복사하는 방식입니다. 덕분에 컴포넌트를 완전히 수정할 수 있고, 불필요한 번들 크기 증가 없이 필요한 것만 사용할 수 있습니다. Radix UI 프리미티브 위에 Tailwind 스타일링을 적용한 접근성 친화적 컴포넌트입니다.',
  },
  {
    value: 'faq-6',
    question: 'next-themes로 다크모드를 구현할 때 SSR 플래시를 방지하는 방법은?',
    answer:
      'ThemeProvider의 attribute="class"로 HTML 클래스를 변경하고, suppressHydrationWarning을 html 태그에 추가합니다. ThemeToggle 컴포넌트에서는 usehooks-ts의 useIsClient 훅을 사용해 클라이언트에서만 토글 버튼을 렌더링하면 하이드레이션 불일치를 방지할 수 있습니다.',
  },
]

const SETTINGS_ITEMS = [
  {
    value: 'settings-1',
    question: '일반 설정',
    answer: '언어, 시간대, 날짜 형식 등 기본적인 앱 설정을 구성할 수 있습니다.',
  },
  {
    value: 'settings-2',
    question: '알림 설정',
    answer: '이메일 알림, 푸시 알림, 주간 리포트 등 알림 수신 방식을 커스터마이즈하세요.',
  },
  {
    value: 'settings-3',
    question: '보안 설정',
    answer: '비밀번호 변경, 2단계 인증, 로그인 세션 관리 등 계정 보안을 강화하세요.',
  },
]

export default function AccordionExamplePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      {/* 헤더 */}
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 size-4" />
            대시보드로
          </Button>
        </Link>
        <h1 className="mt-4 text-3xl font-bold">아코디언 / FAQ</h1>
        <p className="mt-2 text-muted-foreground">
          ShadcnUI Accordion 컴포넌트로 FAQ, 설정 패널, 콘텐츠 토글 등을 구현합니다.
          단일 열기 모드와 다중 열기 모드를 모두 지원합니다.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="outline">ShadcnUI Accordion</Badge>
          <Badge variant="outline">Radix UI</Badge>
        </div>
        <Separator className="mt-6" />
      </div>

      <div className="space-y-6">
        {/* FAQ 스타일 — 단일 열기 */}
        <Card className="p-6">
          <h2 className="font-semibold">FAQ — 단일 열기 모드</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            한 번에 하나의 항목만 펼쳐집니다. (type="single")
          </p>
          <Accordion type="single" collapsible className="mt-4">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* 설정 패널 스타일 — 다중 열기 */}
        <Card className="p-6">
          <h2 className="font-semibold">설정 패널 — 다중 열기 모드</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            여러 항목을 동시에 펼칠 수 있습니다. (type="multiple")
          </p>
          <Accordion type="multiple" className="mt-4">
            {SETTINGS_ITEMS.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="text-sm font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* 코드 힌트 */}
        <Card className="p-6">
          <h3 className="font-semibold text-sm">핵심 패턴</h3>
          <pre className="mt-3 overflow-x-auto rounded-md bg-muted p-4 text-xs leading-relaxed">
            <code>{`// 단일 열기 (collapsible로 모두 닫기 가능)
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>질문</AccordionTrigger>
    <AccordionContent>답변</AccordionContent>
  </AccordionItem>
</Accordion>

// 다중 열기
<Accordion type="multiple">
  ...
</Accordion>`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}
