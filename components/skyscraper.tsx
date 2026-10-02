'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { FACETS } from '@/lib/facets'
import { FacetPanel } from '@/components/facet-panel'

// The 3x3 grid renders facets 0–8; the penthouse (index 9) crowns the tower.
const GRID_COUNT = 9
const PENTHOUSE_INDEX = 9
// Which windows glow on first paint — a scattered pattern reads as "alive".
// Index 9 is the penthouse (DJ) — lit by default.
const INITIAL_LIT = [true, false, true, false, true, true, false, true, false, true]
// Staggered flicker timing so the lit windows never pulse in unison.
const FLICKER_DELAYS = ['0s', '1.4s', '2.9s', '0.7s', '3.6s', '2.1s', '4.3s', '1.1s', '3.2s', '1.9s']
// Scrolling lights the tower floor by floor from the street up, finishing at the penthouse.
const SCROLL_ORDER = [7, 6, 8, 4, 3, 5, 1, 0, 2, PENTHOUSE_INDEX]
// Portion of the scroll track over which the windows switch on.
const SCROLL_START = 0.04
const SCROLL_END = 0.9

function useScrollLitCount(total: number) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      // Measure against the tower's own scroll track so sections below it don't stretch the timing.
      const track = document.getElementById('tower-track')
      const start = track ? track.offsetTop : 0
      const length = track ? track.offsetHeight : document.documentElement.scrollHeight
      const max = length - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, (window.scrollY - start) / max)) : 0
      const t = (progress - SCROLL_START) / (SCROLL_END - SCROLL_START)
      const next = Math.max(0, Math.min(total, Math.floor(t * total + 0.0001) + (t > 0 ? 1 : 0)))
      setCount((prev) => (prev === next ? prev : next))
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
  }, [total])

  return count
}

export function Skyscraper() {
  const [clickLit, setClickLit] = useState<boolean[]>(INITIAL_LIT)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null)
  const scrollLitCount = useScrollLitCount(SCROLL_ORDER.length)

  const scrollLit = new Set(SCROLL_ORDER.slice(0, scrollLitCount))
  const lit = clickLit.map((v, i) => v || scrollLit.has(i))

  // Clicking a window lights that room and opens a preview bubble that grows out of it.
  const openWindow = (index: number, target: HTMLElement) => {
    const rect = target.getBoundingClientRect()
    setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    setClickLit((prev) => prev.map((v, i) => (i === index ? true : v)))
    setActiveIndex(index)
  }

  return (
    <div className="relative flex flex-col items-center">
      <div className="intro-rise relative mb-8 size-20 overflow-hidden rounded-full border-2 border-window-lit shadow-[0_0_28px_6px_rgba(251,191,36,0.3)] sm:mb-12 sm:size-24">
        <img
          src="/headshot.png"
          alt="Sumin Wu"
          className="size-full object-cover"
          width={96}
          height={96}
        />
      </div>

      {/* antenna / mast */}
      <div className="h-10 w-1 bg-building-edge sm:h-14" />
      <div className="-mt-1 h-3 w-3 rounded-full bg-window-lit shadow-[0_0_12px_4px_theme(colors.window-lit/45%)] window-flicker" />

      {/* crown */}
      <div className="mt-2 h-4 w-24 rounded-t-md bg-building-edge sm:w-32" />

      {/* tower body + window grid */}
      <div
        className={cn(
          'relative rounded-t-md border-x border-t border-building-edge bg-building',
          'px-3 pb-0 pt-4 shadow-[0_-8px_60px_-12px_rgba(251,191,36,0.15)]',
        )}
      >
        {/* subtle vertical facade seams */}
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:repeating-linear-gradient(90deg,transparent,transparent_calc(33.333%-1px),theme(colors.building-edge)_calc(33.333%-1px),theme(colors.building-edge)_33.333%)]" />

        {/* penthouse — a single crowning window (the DJ facet) */}
        <div className="relative mb-3 flex justify-center">
          <button
            type="button"
            onClick={(e) => openWindow(PENTHOUSE_INDEX, e.currentTarget)}
            aria-haspopup="dialog"
            aria-label={`${FACETS[PENTHOUSE_INDEX].title} — ${FACETS[PENTHOUSE_INDEX].role}`}
            style={{ animationDelay: FLICKER_DELAYS[PENTHOUSE_INDEX] }}
            className={cn(
              'group relative h-8 w-[7.5rem] rounded-[3px] outline-none transition-all duration-500 sm:h-9 sm:w-[9.25rem] md:h-10 md:w-[11.75rem]',
              'focus-visible:ring-2 focus-visible:ring-window-lit focus-visible:ring-offset-2 focus-visible:ring-offset-building',
              lit[PENTHOUSE_INDEX]
                ? 'window-flicker bg-window-lit shadow-[0_0_20px_3px_theme(colors.window-lit/50%),inset_0_0_12px_theme(colors.window-lit-core/60%)] hover:bg-window-lit-core hover:shadow-[0_0_30px_7px_theme(colors.window-lit/65%)]'
                : 'bg-window-unlit shadow-inner hover:bg-slate-600/70 hover:shadow-[0_0_10px_1px_rgba(148,163,184,0.35)]',
            )}
          >
            {/* horizontal mullions for a wide penthouse pane */}
            <span className="pointer-events-none absolute inset-0 rounded-[3px] [background:linear-gradient(theme(colors.night/25%),transparent_40%),linear-gradient(90deg,transparent,transparent_calc(33.333%-0.5px),theme(colors.night/35%)_calc(33.333%-0.5px),theme(colors.night/35%)_calc(33.333%+0.5px),transparent_calc(33.333%+0.5px)),linear-gradient(90deg,transparent,transparent_calc(66.666%-0.5px),theme(colors.night/35%)_calc(66.666%-0.5px),theme(colors.night/35%)_calc(66.666%+0.5px),transparent_calc(66.666%+0.5px))]" />
          </button>
        </div>

        <div
          className="grid grid-cols-3 gap-2.5 sm:gap-3"
          role="group"
          aria-label="Skyscraper windows — each opens a facet"
        >
          {Array.from({ length: GRID_COUNT }).map((_, i) => {
            const isLit = lit[i]
            return (
              <button
                key={i}
                type="button"
                onClick={(e) => openWindow(i, e.currentTarget)}
                aria-haspopup="dialog"
                aria-label={`${FACETS[i].title} — ${FACETS[i].role}`}
                style={{ animationDelay: FLICKER_DELAYS[i] }}
                className={cn(
                  'group relative h-14 w-14 rounded-[3px] outline-none transition-all duration-500 sm:h-16 sm:w-16 md:h-20 md:w-20',
                  'focus-visible:ring-2 focus-visible:ring-window-lit focus-visible:ring-offset-2 focus-visible:ring-offset-building',
                  isLit
                    ? 'window-flicker bg-window-lit shadow-[0_0_16px_2px_theme(colors.window-lit/45%),inset_0_0_10px_theme(colors.window-lit-core/60%)] hover:bg-window-lit-core hover:shadow-[0_0_26px_6px_theme(colors.window-lit/60%)]'
                    : 'bg-window-unlit shadow-inner hover:bg-slate-600/70 hover:shadow-[0_0_10px_1px_rgba(148,163,184,0.35)]',
                )}
              >
                {/* window mullions */}
                <span
                  className={cn(
                    'pointer-events-none absolute inset-0 rounded-[3px]',
                    '[background:linear-gradient(theme(colors.night/25%),transparent_35%),linear-gradient(90deg,transparent,transparent_calc(50%-0.5px),theme(colors.night/35%)_calc(50%-0.5px),theme(colors.night/35%)_calc(50%+0.5px),transparent_calc(50%+0.5px)),linear-gradient(0deg,transparent,transparent_calc(50%-0.5px),theme(colors.night/35%)_calc(50%-0.5px),theme(colors.night/35%)_calc(50%+0.5px),transparent_calc(50%+0.5px))]',
                  )}
                />
              </button>
            )
          })}
        </div>

        {/* base plinth widening into the street */}
        <div className="mt-4 h-6 w-[calc(100%+2.5rem)] -translate-x-[1.25rem] bg-building-edge/80 sm:h-8" />
      </div>

      <FacetPanel
        facet={activeIndex === null ? null : FACETS[activeIndex]}
        origin={origin}
        onClose={() => setActiveIndex(null)}
      />
    </div>
  )
}
