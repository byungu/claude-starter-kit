import Link from 'next/link'
import { SITE_NAME, FOOTER_LINKS } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* 브랜드 */}
          <div className="lg:col-span-2">
            <p className="text-lg font-bold">{SITE_NAME}</p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Next.js 16 + ShadcnUI + Tailwind CSS v4로 구성된
              <br />
              프로덕션 준비 완료 모던 웹 스타터킷
            </p>
          </div>

          {/* 링크 그룹 */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.label}>
              <p className="text-sm font-semibold">{group.label}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={'external' in link && link.external ? '_blank' : undefined}
                      rel={'external' in link && link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {SITE_NAME}. MIT License.
        </div>
      </div>
    </footer>
  )
}
