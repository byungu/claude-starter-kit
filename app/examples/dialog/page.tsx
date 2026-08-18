'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Trash2, Settings, Info } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

function BasicDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Info className="mr-2 size-4" />
          기본 다이얼로그
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>다이얼로그 제목</DialogTitle>
          <DialogDescription>
            ShadcnUI의 Dialog 컴포넌트를 사용한 기본 모달입니다.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          여기에 다이얼로그 본문 내용을 자유롭게 배치할 수 있습니다. 텍스트, 이미지,
          폼 등 어떤 컨텐츠도 가능합니다.
        </p>
        <DialogFooter>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DeleteConfirmDialog() {
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    toast.success('항목이 삭제되었습니다.')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 size-4" />
          삭제 확인
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>
            이 작업은 되돌릴 수 없습니다. 선택한 항목이 영구적으로 삭제됩니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function FormDialog() {
  const [open, setOpen] = useState(false)
  const [projectName, setProjectName] = useState('')

  const handleSave = () => {
    if (!projectName.trim()) {
      toast.error('프로젝트 이름을 입력해주세요.')
      return
    }
    toast.success(`"${projectName}" 프로젝트가 생성되었습니다.`)
    setProjectName('')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Settings className="mr-2 size-4" />
          폼 다이얼로그
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 프로젝트 생성</DialogTitle>
          <DialogDescription>
            프로젝트 이름을 입력하고 생성을 클릭하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="project-name">프로젝트 이름</Label>
            <Input
              id="project-name"
              placeholder="내 프로젝트"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button onClick={handleSave}>생성</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function DialogExamplePage() {
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
        <h1 className="mt-4 text-3xl font-bold">다이얼로그 & 모달</h1>
        <p className="mt-2 text-muted-foreground">
          ShadcnUI Dialog로 실무에서 자주 쓰는 모달 패턴을 구현합니다.
          제어형(controlled)과 비제어형(uncontrolled) 모달 모두 지원합니다.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="outline">ShadcnUI Dialog</Badge>
          <Badge variant="outline">Alert</Badge>
        </div>
        <Separator className="mt-6" />
      </div>

      <div className="space-y-6">
        {/* 다이얼로그 패턴 */}
        <Card className="p-6">
          <h2 className="font-semibold">다이얼로그 패턴</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            각 버튼을 클릭해 다양한 모달 패턴을 확인하세요.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <BasicDialog />
            <DeleteConfirmDialog />
            <FormDialog />
          </div>
        </Card>

        {/* Alert 컴포넌트 */}
        <Card className="p-6">
          <h2 className="font-semibold">Alert 컴포넌트</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            페이지 내 인라인 알림에는 Alert을 사용합니다.
          </p>
          <div className="mt-4 space-y-3">
            <Alert>
              <Info className="size-4" />
              <AlertTitle>정보 알림</AlertTitle>
              <AlertDescription>
                일반적인 정보나 안내를 전달하는 알림입니다.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <Trash2 className="size-4" />
              <AlertTitle>오류 알림</AlertTitle>
              <AlertDescription>
                오류나 위험 상황을 사용자에게 알리는 알림입니다.
              </AlertDescription>
            </Alert>
          </div>
        </Card>

        {/* 코드 힌트 */}
        <Card className="p-6">
          <h3 className="font-semibold text-sm">핵심 패턴 — 제어형 다이얼로그</h3>
          <pre className="mt-3 overflow-x-auto rounded-md bg-muted p-4 text-xs leading-relaxed">
            <code>{`const [open, setOpen] = useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>제목</DialogTitle>
    </DialogHeader>
    {/* 내용 */}
    <DialogFooter>
      <Button onClick={() => setOpen(false)}>닫기</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}
