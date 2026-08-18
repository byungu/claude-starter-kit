'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  useCounter,
  useToggle,
  useCopyToClipboard,
  useDebounceValue,
  useLocalStorage,
} from 'usehooks-ts'
import { ArrowLeft, Copy, Check, Plus, Minus, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

/* ──────────────── useCounter ──────────────── */
function CounterDemo() {
  const { count, increment, decrement, reset, setCount } = useCounter(0)
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">useCounter</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">카운터 상태를 관리하는 훅</p>
        </div>
        <Badge variant="outline" className="text-xs">usehooks-ts</Badge>
      </div>
      <div className="mt-5 flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={decrement}>
          <Minus className="size-4" />
        </Button>
        <span className="w-16 text-center text-4xl font-bold tabular-nums">{count}</span>
        <Button variant="outline" size="icon" onClick={increment}>
          <Plus className="size-4" />
        </Button>
      </div>
      <div className="mt-4 flex gap-2">
        <Button variant="ghost" size="sm" onClick={reset}>
          <RotateCcw className="mr-1.5 size-3" />
          초기화
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setCount(100)}>
          100으로 설정
        </Button>
      </div>
    </Card>
  )
}

/* ──────────────── useToggle ──────────────── */
function ToggleDemo() {
  const [isOn, toggle] = useToggle(false)
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">useToggle</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">불리언 토글을 간단하게 관리</p>
        </div>
        <Badge variant="outline" className="text-xs">usehooks-ts</Badge>
      </div>
      <div className="mt-5 flex items-center gap-4">
        <div
          className={`relative h-7 w-12 cursor-pointer rounded-full transition-colors ${isOn ? 'bg-primary' : 'bg-muted'}`}
          onClick={toggle}
          role="switch"
          aria-checked={isOn}
        >
          <div
            className={`absolute top-1 size-5 rounded-full bg-white shadow transition-transform ${isOn ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </div>
        <span className="text-sm font-medium">{isOn ? '켜짐' : '꺼짐'}</span>
      </div>
      <Button variant="outline" size="sm" className="mt-4" onClick={toggle}>
        토글
      </Button>
    </Card>
  )
}

/* ──────────────── useCopyToClipboard ──────────────── */
function ClipboardDemo() {
  const [copiedText, copy] = useCopyToClipboard()
  const [copied, setCopied] = useState(false)
  const code = 'npm install usehooks-ts'

  const handleCopy = async () => {
    const ok = await copy(code)
    if (ok) {
      setCopied(true)
      toast.success('클립보드에 복사되었습니다!')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">useCopyToClipboard</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">클립보드 복사 기능</p>
        </div>
        <Badge variant="outline" className="text-xs">usehooks-ts</Badge>
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
        <code className="flex-1 text-sm">{code}</code>
        <Button variant="ghost" size="icon" className="size-7 shrink-0" onClick={handleCopy}>
          {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
        </Button>
      </div>
      {copiedText && (
        <p className="mt-2 text-xs text-muted-foreground">
          마지막 복사: <code className="font-mono">{copiedText}</code>
        </p>
      )}
    </Card>
  )
}

/* ──────────────── useDebounce ──────────────── */
function DebounceDemo() {
  const [input, setInput] = useState('')
  const [debouncedInput] = useDebounceValue(input, 500)

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">useDebounce</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">입력값을 500ms 지연 후 업데이트</p>
        </div>
        <Badge variant="outline" className="text-xs">usehooks-ts</Badge>
      </div>
      <div className="mt-5 space-y-3">
        <Input
          placeholder="텍스트를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
          <span className="text-muted-foreground">디바운스된 값: </span>
          <span className="font-medium">{debouncedInput || '(없음)'}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          API 호출, 검색 요청 등 연속 입력 시 불필요한 처리를 방지합니다.
        </p>
      </div>
    </Card>
  )
}

/* ──────────────── useLocalStorage ──────────────── */
function LocalStorageDemo() {
  const [memo, setMemo] = useLocalStorage('example-memo', '')

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">useLocalStorage</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">localStorage와 동기화된 상태 관리</p>
        </div>
        <Badge variant="outline" className="text-xs">usehooks-ts</Badge>
      </div>
      <div className="mt-5 space-y-3">
        <textarea
          className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          rows={3}
          placeholder="여기에 메모를 입력하세요. 새로고침 후에도 저장됩니다."
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            키: <code className="font-mono">example-memo</code>
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setMemo(''); toast.info('메모가 초기화되었습니다.') }}
          >
            초기화
          </Button>
        </div>
      </div>
    </Card>
  )
}

/* ──────────────── Page ──────────────── */
export default function HooksExamplePage() {
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
        <h1 className="mt-4 text-3xl font-bold">유틸리티 훅</h1>
        <p className="mt-2 text-muted-foreground">
          usehooks-ts의 검증된 훅들을 인터랙티브하게 체험해보세요.
          주간 4.5M+ 다운로드의 실무 검증 라이브러리입니다.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="outline">useCounter</Badge>
          <Badge variant="outline">useToggle</Badge>
          <Badge variant="outline">useCopyToClipboard</Badge>
          <Badge variant="outline">useDebounceValue</Badge>
          <Badge variant="outline">useLocalStorage</Badge>
        </div>
        <Separator className="mt-6" />
      </div>

      <div className="space-y-4">
        <CounterDemo />
        <ToggleDemo />
        <ClipboardDemo />
        <DebounceDemo />
        <LocalStorageDemo />
      </div>
    </div>
  )
}
