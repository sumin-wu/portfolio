import Link from 'next/link'
import { cn } from '@/lib/utils'

const CONTACT_EMAIL = 'suminwu@usc.edu'
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`

const INSTAGRAM_URL = 'https://www.instagram.com/suminwu'

const PILL =
  'inline-flex items-center gap-2 rounded-full border border-building-edge bg-night/50 px-3.5 py-1.5 text-sm text-slate-300 backdrop-blur-sm outline-none transition-colors hover:border-window-lit/60 hover:text-window-lit focus-visible:ring-2 focus-visible:ring-window-lit'

const PAGES = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
] as const

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sumin-wu-bxn',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
  {
    label: 'Substack',
    href: 'https://substack.com/@suminwu?r=2q967b&utm_medium=ios&utm_source=profile&shareImageVariant=blur',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M22 4.5H2v2.7h20V4.5ZM2 10.2V22l10-4.9L22 22V10.2H2Z" />
      </svg>
    ),
  },
]

type TopNavProps = {
  current: '/' | '/about'
}

export function TopNav({ current }: TopNavProps) {
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5">
      <Link
        href="/"
        className="rounded-sm text-xs font-medium uppercase tracking-[0.35em] text-window-lit/90 outline-none transition-colors hover:text-window-lit focus-visible:ring-2 focus-visible:ring-window-lit"
      >
        Sumin Wu
      </Link>

      <nav aria-label="Primary" className="flex flex-wrap items-center justify-end gap-2">
        {PAGES.map((page) => {
          const isCurrent = page.href === current
          return (
            <Link
              key={page.href}
              href={page.href}
              aria-current={isCurrent ? 'page' : undefined}
              className={cn(PILL, isCurrent && 'border-window-lit/60 text-window-lit')}
            >
              {page.label}
            </Link>
          )
        })}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={cn(PILL, 'px-2')}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
            <circle cx="12" cy="12" r="4.25" />
            <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
          </svg>
        </a>
        {SOCIALS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={PILL}
          >
            {link.icon}
            <span className="sr-only sm:not-sr-only">{link.label}</span>
          </a>
        ))}
        <a
          href={GMAIL_COMPOSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            PILL,
            'border-window-lit/70 bg-window-lit text-night hover:bg-window-lit/90 hover:text-night',
          )}
        >
          Contact
        </a>
      </nav>
    </header>
  )
}
