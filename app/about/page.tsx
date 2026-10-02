import type { Metadata } from 'next'
import { TopNav } from '@/components/top-nav'
import { FACETS } from '@/lib/facets'

export const metadata: Metadata = {
  title: 'About — Sumin Wu',
  description:
    'About Sumin Wu: product manager, founder, writer, climber, and DJ studying at USC.',
}

export default function AboutPage() {
  return (
    <main className="relative min-h-svh bg-night text-slate-200">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_80%_at_50%_100%,rgba(251,191,36,0.08),transparent_55%),linear-gradient(to_bottom,var(--color-night-deep),var(--color-night)_60%)]"
      />

      <TopNav current="/about" />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col gap-12 px-6 pb-24 pt-32 sm:pt-40">
        <section className="flex flex-col gap-5">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-window-lit/80">
            About
          </p>
          <h1 className="text-balance text-3xl font-light leading-tight text-slate-100 sm:text-4xl">
            {"Hi, I'm Sumin."}
          </h1>
          <p className="text-pretty leading-relaxed text-slate-400">
            {
              "I'm a student at USC who builds products, starts companies, and writes about what I learn along the way. Each window in the tower is one part of that story — from product work at eBay Live and Verizon to co-founding Hemut, publishing on AI policy, and spending weekends on the wall or behind the decks."
            }
          </p>
        </section>

        <section aria-labelledby="windows-heading" className="flex flex-col gap-4">
          <h2
            id="windows-heading"
            className="text-xs font-medium uppercase tracking-[0.35em] text-slate-500"
          >
            Behind the windows
          </h2>
          <ul className="flex flex-col divide-y divide-building-edge border-y border-building-edge">
            {FACETS.map((facet) => (
              <li
                key={facet.title}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <span className="text-slate-200">{facet.title}</span>
                <span className="shrink-0 text-sm text-window-lit/80">
                  {facet.role}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
