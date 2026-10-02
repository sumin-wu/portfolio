'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

type Reference = {
  name: string
  affiliation?: string
  photo: string
  quote: string
  /** Desktop offset from the hub, in px-ish units scaled by viewport. */
  x: number
  y: number
  floatDuration: string
}

const REFERENCES: Reference[] = [
  {
    name: 'Kimon Drakopoulos',
    affiliation: 'Chief Data Scientist, Greece',
    photo: '/references/kimon-drakopoulos.png',
    quote:
      'Beyond her technical expertise and community leadership, Sumin possesses an outstanding work ethic. She approaches tasks with diligence, creativity, and an unwavering commitment to excellence. She is never content with the status quo and continually seeks opportunities for innovation and improvement. Her leadership skills are evident in her capacity to mentor peers, manage projects effectively, and take initiative in high-stakes environments.',
    x: -1,
    y: -0.1,
    floatDuration: '7s',
  },
  {
    name: 'Jimmy Forde',
    affiliation: 'Product Manager, eBay Live',
    photo: '/references/jimmy-forde.png',
    quote:
      "Sumin consistently thought big, pushing past the obvious solution to explore what a feature could really become. She was incredibly resourceful with AI tools, using them to accelerate prototyping and PRD writing in a way that sped up ideation and development. I really valued her curiosity and the energy she brought to the team, and I'm excited to see where she takes those skills next.",
    x: 1,
    y: -0.1,
    floatDuration: '8.5s',
  },
  {
    name: 'Loki Cheema',
    affiliation: 'Founder @Hemut (YC X25)',
    photo: '/placeholder-user.jpg',
    quote: 'Testimonial coming soon.',
    x: 0,
    y: 0.27,
    floatDuration: '7.8s',
  },
]

// Small sparks that burst out of the hub alongside the testimonies.
const SPARKS = [
  { angle: -20, dist: 210 },
  { angle: 35, dist: 170 },
  { angle: 100, dist: 230 },
  { angle: 150, dist: 190 },
  { angle: 205, dist: 240 },
  { angle: 260, dist: 180 },
  { angle: 300, dist: 250 },
]

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeOut = (v: number) => 1 - Math.pow(1 - v, 3)
const phase = (p: number, start: number, end: number) => easeOut(clamp01((p - start) / (end - start)))

export function ReferencesSection() {
  const trackRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0

    const update = () => {
      frame = 0
      const rect = track.getBoundingClientRect()
      const max = rect.height - window.innerHeight
      const p = reduced ? 1 : max > 0 ? clamp01(-rect.top / max) : 1
      track.style.setProperty('--hub', String(phase(p, 0, 0.15)))
      track.style.setProperty('--sparks', String(phase(p, 0.08, 0.45)))
      track.style.setProperty('--n0', String(phase(p, 0.15, 0.5)))
      track.style.setProperty('--n1', String(phase(p, 0.3, 0.65)))
      track.style.setProperty('--n2', String(phase(p, 0.45, 0.8)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      ref={trackRef}
      aria-labelledby="references-heading"
      className="relative h-[260svh] bg-night-deep lg:h-[300svh]"
      style={{ '--hub': 0, '--sparks': 0, '--n0': 0, '--n1': 0, '--n2': 0 } as CSSProperties}
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]">
        {/* soft warm glow behind the hub */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background:radial-gradient(40%_40%_at_50%_50%,rgba(251,191,36,0.08),transparent_70%)]"
        />

        {/* desktop: radial burst */}
        <div className="relative hidden h-full w-full lg:block">
          {REFERENCES.map((ref, i) => {
            const v = `var(--n${i})`
            const dx = `min(30vw, 360px) * ${ref.x}`
            const dy = `100svh * ${ref.y}`
            return (
              <div key={ref.name}>
                {/* connector line from the hub to the node */}
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                >
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${ref.x * 200}px)`}
                    y2={`${50 + ref.y * 100}%`}
                    className="stroke-amber-300/30"
                    strokeWidth={1}
                    strokeDasharray="4 6"
                    style={{ opacity: v }}
                  />
                </svg>
                <figure
                  className="absolute left-1/2 top-1/2 w-96"
                  style={{
                    opacity: v,
                    transform: `translate(-50%, -50%) translate(calc(${dx} * ${v}), calc(${dy} * ${v})) scale(calc(0.35 + 0.65 * ${v}))`,
                  }}
                >
                  <div
                    className="reference-float rounded-3xl border border-amber-200/15 bg-slate-900/80 p-6 shadow-[0_0_40px_-12px_rgba(251,191,36,0.35)] backdrop-blur-sm"
                    style={{ animationDuration: ref.floatDuration }}
                  >
                    <ReferenceBody reference={ref} />
                  </div>
                </figure>
              </div>
            )
          })}

          {SPARKS.map((s) => {
            const rad = (s.angle * Math.PI) / 180
            return (
              <span
                key={s.angle}
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 size-2 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.8)]"
                style={{
                  opacity: 'calc(var(--sparks) * 0.8)',
                  transform: `translate(-50%, -50%) translate(calc(${Math.cos(rad) * s.dist}px * var(--sparks)), calc(${Math.sin(rad) * s.dist}px * var(--sparks)))`,
                }}
              />
            )
          })}

          <Hub />
        </div>

        {/* mobile and tablet: hub on top, testimonies fan out below */}
        <div className="flex w-full max-w-md flex-col items-center gap-6 px-6 lg:hidden">
          <div className="relative size-32 shrink-0">
            <Hub />
          </div>
          {REFERENCES.map((ref, i) => {
            const v = `var(--n${i})`
            return (
              <figure
                key={ref.name}
                className="w-full"
                style={{
                  opacity: v,
                  transform: `translateY(calc((1 - ${v}) * -60px)) scale(calc(0.6 + 0.4 * ${v}))`,
                }}
              >
                <div
                  className="reference-float rounded-3xl border border-amber-200/15 bg-slate-900/80 p-5 shadow-[0_0_40px_-12px_rgba(251,191,36,0.35)]"
                  style={{ animationDuration: ref.floatDuration }}
                >
                  <ReferenceBody reference={ref} compact />
                </div>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Hub() {
  return (
    <div
      className="absolute left-1/2 top-1/2 flex size-32 flex-col items-center justify-center rounded-full border border-amber-200/40 bg-slate-950 text-center shadow-[0_0_60px_-6px_rgba(251,191,36,0.55)] lg:size-40"
      style={{ transform: 'translate(-50%, -50%) scale(calc(0.5 + 0.5 * var(--hub)))', opacity: 'calc(0.3 + 0.7 * var(--hub))' }}
    >
      <span className="reference-pulse absolute inset-0 rounded-full border border-amber-300/30" aria-hidden="true" />
      <h2 id="references-heading" className="text-lg font-light tracking-wide text-slate-100 lg:text-xl">
        References
  </h2>

    </div>
  )
}

function ReferenceBody({ reference, compact = false }: { reference: Reference; compact?: boolean }) {
  return (
    <>
      <blockquote className={`text-pretty leading-relaxed text-slate-300 ${compact ? 'text-sm' : 'text-sm'}`}>
        <p>{`\u201C${reference.quote}\u201D`}</p>
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <img
          src={reference.photo || '/placeholder.svg'}
          alt={reference.name}
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-full object-cover ring-2 ring-amber-300/50"
        />
        <span className="flex flex-col">
          <span className="text-sm font-medium text-slate-100">{reference.name}</span>
          {reference.affiliation ? <span className="text-xs text-slate-500">{reference.affiliation}</span> : null}
        </span>
      </figcaption>
    </>
  )
}
