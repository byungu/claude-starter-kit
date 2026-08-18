import type { Metadata } from 'next'
import { FormClient } from './form-client'

export const metadata: Metadata = {
  title: '폼 유효성 검사 예제',
  description: 'react-hook-form + zod를 사용한 폼 검증 예제',
}

export default function FormExamplePage() {
  return <FormClient />
}
