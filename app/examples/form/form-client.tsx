'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { ArrowLeft, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

const signUpSchema = z
  .object({
    name: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
    email: z.string().email('올바른 이메일 주소를 입력하세요.'),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .regex(/[A-Z]/, '영문 대문자를 포함해야 합니다.')
      .regex(/[0-9]/, '숫자를 포함해야 합니다.'),
    confirmPassword: z.string(),
    terms: z.boolean().refine((v) => v === true, '이용약관에 동의해야 합니다.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

type SignUpForm = z.infer<typeof signUpSchema>

function PasswordStrength({ password }: { password: string }) {
  const rules = [
    { label: '8자 이상', ok: password.length >= 8 },
    { label: '영문 대문자', ok: /[A-Z]/.test(password) },
    { label: '숫자 포함', ok: /[0-9]/.test(password) },
  ]
  if (!password) return null
  return (
    <div className="mt-1.5 flex gap-3">
      {rules.map((r) => (
        <span
          key={r.label}
          className={`flex items-center gap-1 text-xs ${r.ok ? 'text-emerald-500' : 'text-muted-foreground'}`}
        >
          <CheckCircle2 className="size-3" />
          {r.label}
        </span>
      ))}
    </div>
  )
}

export function FormClient() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { terms: false },
  })

  const passwordValue = watch('password', '')

  const onSubmit = async (data: SignUpForm) => {
    await new Promise((r) => setTimeout(r, 1200))
    toast.success('회원가입 완료!', { description: `${data.name}님, 환영합니다!` })
    reset()
  }

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
        <h1 className="mt-4 text-3xl font-bold">폼 유효성 검사</h1>
        <p className="mt-2 text-muted-foreground">
          react-hook-form + zod로 타입 안전한 폼 검증을 구현합니다.
          실시간 에러 표시, 비밀번호 강도 표시, 제출 로딩 상태를 포함합니다.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="outline">react-hook-form</Badge>
          <Badge variant="outline">zod</Badge>
          <Badge variant="outline">@hookform/resolvers</Badge>
        </div>
        <Separator className="mt-6" />
      </div>

      {/* 폼 카드 */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold">회원가입 폼</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          모든 필드를 입력하고 제출해보세요. 검증 실패 시 에러 메시지가 표시됩니다.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          {/* 이름 */}
          <div className="space-y-1.5">
            <Label htmlFor="name">이름</Label>
            <Input id="name" placeholder="홍길동" {...register('name')} />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* 이메일 */}
          <div className="space-y-1.5">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="space-y-1.5">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="8자 이상, 대문자·숫자 포함"
                {...register('password')}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword((v) => !v)}
                aria-label="비밀번호 보기 토글"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            <PasswordStrength password={passwordValue} />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호 재입력"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* 이용약관 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="terms" className="cursor-pointer text-sm font-normal">
                이용약관에 동의합니다
              </Label>
            </div>
            {errors.terms && (
              <p className="text-xs text-destructive">{errors.terms.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? '처리 중...' : '회원가입'}
          </Button>
        </form>
      </Card>

      {/* 코드 힌트 */}
      <Card className="mt-4 p-6">
        <h3 className="font-semibold text-sm">핵심 패턴</h3>
        <pre className="mt-3 overflow-x-auto rounded-md bg-muted p-4 text-xs leading-relaxed">
          <code>{`const schema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요.'),
  password: z.string().min(8, '8자 이상'),
})

const { register, handleSubmit, formState: { errors } } =
  useForm({ resolver: zodResolver(schema) })`}</code>
        </pre>
      </Card>
    </div>
  )
}
