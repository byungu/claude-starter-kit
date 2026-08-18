'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { ArrowLeft, Search, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type User = {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  joined: string
}

type SortKey = keyof Pick<User, 'name' | 'email' | 'role' | 'joined'>
type SortDir = 'asc' | 'desc' | null

const USERS: User[] = [
  { id: 1, name: '김민준', email: 'minjun@example.com', role: '관리자', status: 'active', joined: '2024-01-15' },
  { id: 2, name: '이서연', email: 'seoyeon@example.com', role: '편집자', status: 'active', joined: '2024-02-20' },
  { id: 3, name: '박도윤', email: 'doyun@example.com', role: '뷰어', status: 'inactive', joined: '2024-03-05' },
  { id: 4, name: '최아름', email: 'areum@example.com', role: '편집자', status: 'active', joined: '2024-03-18' },
  { id: 5, name: '정우진', email: 'woojin@example.com', role: '뷰어', status: 'active', joined: '2024-04-01' },
  { id: 6, name: '한소희', email: 'sohee@example.com', role: '관리자', status: 'active', joined: '2024-04-12' },
  { id: 7, name: '임현우', email: 'hyunwoo@example.com', role: '뷰어', status: 'inactive', joined: '2024-05-03' },
  { id: 8, name: '오지원', email: 'jiwon@example.com', role: '편집자', status: 'active', joined: '2024-05-20' },
  { id: 9, name: '신예진', email: 'yejin@example.com', role: '뷰어', status: 'active', joined: '2024-06-07' },
  { id: 10, name: '강태양', email: 'taeyang@example.com', role: '뷰어', status: 'inactive', joined: '2024-06-25' },
  { id: 11, name: '윤채원', email: 'chaewon@example.com', role: '편집자', status: 'active', joined: '2024-07-08' },
  { id: 12, name: '배주호', email: 'juho@example.com', role: '관리자', status: 'active', joined: '2024-07-19' },
]

const PAGE_SIZE = 5

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey | null; sortDir: SortDir }) {
  if (col !== sortKey) return <ChevronsUpDown className="ml-1 inline size-3 opacity-40" />
  if (sortDir === 'asc') return <ChevronUp className="ml-1 inline size-3" />
  return <ChevronDown className="ml-1 inline size-3" />
}

export default function DataTablePage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)
  const [page, setPage] = useState(1)

  const handleSort = (key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir('asc')
    } else if (sortDir === 'asc') {
      setSortDir('desc')
    } else {
      setSortKey(null)
      setSortDir(null)
    }
    setPage(1)
  }

  const filtered = useMemo(() => {
    let data = USERS.filter((u) => {
      const q = search.toLowerCase()
      return u.name.includes(q) || u.email.includes(q)
    })
    if (statusFilter !== 'all') {
      data = data.filter((u) => u.status === statusFilter)
    }
    if (sortKey && sortDir) {
      data = [...data].sort((a, b) => {
        const aVal = a[sortKey]
        const bVal = b[sortKey]
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      })
    }
    return data
  }, [search, statusFilter, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const sortableCols: { key: SortKey; label: string }[] = [
    { key: 'name', label: '이름' },
    { key: 'email', label: '이메일' },
    { key: 'role', label: '역할' },
    { key: 'joined', label: '가입일' },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* 헤더 */}
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 size-4" />
            대시보드로
          </Button>
        </Link>
        <h1 className="mt-4 text-3xl font-bold">데이터 테이블</h1>
        <p className="mt-2 text-muted-foreground">
          검색, 상태 필터, 컬럼 정렬, 페이지네이션이 가능한 인터랙티브 테이블입니다.
          useMemo로 필터·정렬 연산을 최적화합니다.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="outline">ShadcnUI Table</Badge>
          <Badge variant="outline">useState</Badge>
          <Badge variant="outline">useMemo</Badge>
        </div>
        <Separator className="mt-6" />
      </div>

      <Card className="p-6">
        {/* 필터 영역 */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="이름 또는 이메일 검색..."
              className="pl-9"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(v) => { setStatusFilter(v as typeof statusFilter); setPage(1) }}
          >
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 상태</SelectItem>
              <SelectItem value="active">활성</SelectItem>
              <SelectItem value="inactive">비활성</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 테이블 */}
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              {sortableCols.map((col) => (
                <TableHead
                  key={col.key}
                  className="cursor-pointer select-none whitespace-nowrap"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  <SortIcon col={col.key} sortKey={sortKey} sortDir={sortDir} />
                </TableHead>
              ))}
              <TableHead>상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status === 'active' ? '활성' : '비활성'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* 페이지네이션 */}
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            총 {filtered.length}명 중 {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–
            {Math.min(page * PAGE_SIZE, filtered.length)}명
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
            >
              이전
            </Button>
            <span className="px-2 font-medium text-foreground">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
            >
              다음
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
