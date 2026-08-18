import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-8xl font-bold text-muted-foreground/20 select-none">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">페이지를 찾을 수 없습니다</h1>
      <p className="mt-2 text-muted-foreground">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Button asChild className="mt-8 gap-2">
        <Link href="/">
          <ArrowLeft className="size-4" />
          홈으로 돌아가기
        </Link>
      </Button>
    </div>
  )
}
