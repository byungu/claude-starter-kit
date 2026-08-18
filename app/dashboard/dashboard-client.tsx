'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { useLocalStorage } from 'usehooks-ts'
import {
  TrendingUp, TrendingDown, Users, Eye, MousePointer, Clock,
  FileText, MessageSquare, Table2, Wrench, ChevronDown, ArrowRight,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

const STATS = [
  { label: '총 방문자', value: '12,543', change: '+12%', up: true, icon: Users },
  { label: '페이지 뷰', value: '89,231', change: '+8%', up: true, icon: Eye },
  { label: '전환율', value: '3.24%', change: '+0.5%', up: true, icon: MousePointer },
  { label: '평균 체류시간', value: '2분 45초', change: '-3%', up: false, icon: Clock },
]

const RECENT_ACTIVITY = [
  { page: '/home', views: 4523, bounce: '32%', avg: '3:12' },
  { page: '/about', views: 2341, bounce: '45%', avg: '1:54' },
  { page: '/dashboard', views: 1892, bounce: '28%', avg: '4:30' },
  { page: '/blog', views: 987, bounce: '61%', avg: '2:10' },
  { page: '/contact', views: 542, bounce: '55%', avg: '1:22' },
]

export function DashboardClient() {
  const [savedTab, setSavedTab] = useLocalStorage('dashboard-tab', 'overview')

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* 헤더 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            스타터킷 컴포넌트 예시 페이지입니다.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.info('데이터를 새로고침했습니다.', { description: '최신 데이터로 업데이트됨' })
            }
          >
            새로고침
          </Button>
          <Button
            size="sm"
            onClick={() =>
              toast.success('보고서가 저장되었습니다!', {
                description: '다운로드 폴더에서 확인하세요.',
              })
            }
          >
            보고서 저장
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      {/* 탭 */}
      <Tabs value={savedTab} onValueChange={setSavedTab}>
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="analytics">분석</TabsTrigger>
          <TabsTrigger value="components">컴포넌트</TabsTrigger>
          <TabsTrigger value="examples">기능 예제</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* 통계 카드 */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <Icon className="size-4 text-muted-foreground" />
                  </div>
                  <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                  <div className="mt-2 flex items-center gap-1">
                    {stat.up ? (
                      <TrendingUp className="size-3 text-emerald-500" />
                    ) : (
                      <TrendingDown className="size-3 text-red-500" />
                    )}
                    <span
                      className={`text-xs font-medium ${stat.up ? 'text-emerald-500' : 'text-red-500'}`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">지난달 대비</span>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* 페이지별 현황 */}
          <Card className="p-6">
            <h2 className="font-semibold">페이지별 방문 현황</h2>
            <p className="mt-1 text-sm text-muted-foreground">최근 30일 기준</p>
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>페이지</TableHead>
                  <TableHead className="text-right">방문수</TableHead>
                  <TableHead className="text-right">이탈률</TableHead>
                  <TableHead className="text-right">평균 체류</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_ACTIVITY.map((row) => (
                  <TableRow key={row.page}>
                    <TableCell className="font-medium">{row.page}</TableCell>
                    <TableCell className="text-right">{row.views.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{row.bounce}</TableCell>
                    <TableCell className="text-right">{row.avg}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* 분석 탭 */}
        <TabsContent value="analytics" className="mt-6">
          <Card className="p-6 space-y-6">
            <h2 className="font-semibold">트래픽 소스</h2>
            {TRAFFIC_SOURCES.map((source) => (
              <div key={source.label} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>{source.label}</span>
                  <span className="font-medium">{source.percent}%</span>
                </div>
                <Progress value={source.percent} className="h-2" />
              </div>
            ))}
          </Card>
        </TabsContent>

        {/* 컴포넌트 탭 — sonner 토스트 데모 */}
        <TabsContent value="components" className="mt-6">
          <Card className="p-6">
            <h2 className="font-semibold">Sonner 토스트 데모</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              버튼을 클릭하여 다양한 토스트 알림을 확인하세요.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => toast.success('성공적으로 처리되었습니다!')}>
                성공
              </Button>
              <Button
                variant="destructive"
                onClick={() => toast.error('오류가 발생했습니다.', { description: '잠시 후 다시 시도해주세요.' })}
              >
                오류
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.warning('주의가 필요합니다.')}
              >
                경고
              </Button>
              <Button
                variant="secondary"
                onClick={() => toast.info('알림 메시지입니다.', { description: '추가 정보를 확인하세요.' })}
              >
                정보
              </Button>
              <Button
                variant="ghost"
                onClick={() =>
                  toast.promise(new Promise((r) => setTimeout(r, 2000)), {
                    loading: '처리 중...',
                    success: '완료되었습니다!',
                    error: '실패했습니다.',
                  })
                }
              >
                로딩 (2초)
              </Button>
            </div>

            <Separator className="my-6" />

            <h3 className="font-semibold">Badge 변형</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>default</Badge>
              <Badge variant="secondary">secondary</Badge>
              <Badge variant="outline">outline</Badge>
              <Badge variant="destructive">destructive</Badge>
            </div>

            <Separator className="my-6" />

            <h3 className="font-semibold">useLocalStorage 데모</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              현재 탭 선택이 localStorage에 저장됩니다. 새로고침 후에도 유지됩니다.
            </p>
            <p className="mt-2 text-sm">
              저장된 탭:{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                {savedTab}
              </code>
            </p>
          </Card>
        </TabsContent>

        {/* 기능 예제 탭 */}
        <TabsContent value="examples" className="mt-6">
          <div className="mb-4">
            <h2 className="font-semibold">웹 개발 기능 예제</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              실무에서 자주 쓰는 패턴을 인터랙티브하게 체험해보세요.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_EXAMPLES.map((example) => {
              const Icon = example.icon
              return (
                <Card key={example.href} className="flex flex-col p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">{example.title}</h3>
                  </div>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">
                    {example.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {example.badges.map((badge) => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <Link href={example.href} className="mt-4">
                    <Button size="sm" className="w-full gap-2">
                      예제 보기
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const FEATURE_EXAMPLES = [
  {
    title: '폼 유효성 검사',
    description: 'react-hook-form + zod로 타입 안전한 폼 검증. 실시간 에러 메시지와 제출 상태를 구현합니다.',
    icon: FileText,
    href: '/examples/form',
    badges: ['react-hook-form', 'zod'],
  },
  {
    title: '다이얼로그 & 모달',
    description: '기본 다이얼로그, 삭제 확인, 폼 다이얼로그 등 실무 모달 패턴을 제공합니다.',
    icon: MessageSquare,
    href: '/examples/dialog',
    badges: ['ShadcnUI Dialog', 'Alert'],
  },
  {
    title: '데이터 테이블',
    description: '검색, 정렬, 페이지네이션이 가능한 인터랙티브 데이터 테이블입니다.',
    icon: Table2,
    href: '/examples/data-table',
    badges: ['ShadcnUI Table', 'useState'],
  },
  {
    title: '유틸리티 훅',
    description: 'usehooks-ts의 검증된 훅들을 인터랙티브하게 체험해보세요.',
    icon: Wrench,
    href: '/examples/hooks',
    badges: ['usehooks-ts', 'useCounter', 'useDebounceValue'],
  },
  {
    title: '아코디언 / FAQ',
    description: 'FAQ, 설정 패널 등에 활용할 수 있는 아코디언 패턴입니다.',
    icon: ChevronDown,
    href: '/examples/accordion',
    badges: ['ShadcnUI Accordion'],
  },
] as const

const TRAFFIC_SOURCES = [
  { label: '자연 검색 (SEO)', percent: 42 },
  { label: '직접 방문', percent: 28 },
  { label: '소셜 미디어', percent: 18 },
  { label: '레퍼럴', percent: 8 },
  { label: '이메일', percent: 4 },
]
