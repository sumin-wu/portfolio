'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ArrowUpRight, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import type { Facet } from '@/lib/facets'
import { cn } from '@/lib/utils'

type FacetPanelProps = {
  facet: Facet | null
  /** Viewport center of the clicked window; the bubble grows out of this point. */
  origin?: { x: number; y: number } | null
  onClose: () => void
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function FacetPanel({ facet, origin, onClose }: FacetPanelProps) {
  // `mounted` keeps the node in the DOM through the exit transition;
  // `show` drives the enter/exit CSS state one frame later.
  const [mounted, setMounted] = useState(false)
  const [show, setShow] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)
  const [slide, setSlide] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const isOpen = facet !== null
  const images = facet?.images ?? []

  // Reset the slideshow and collapse the story whenever a new facet opens.
  useEffect(() => {
    setSlide(0)
    setExpanded(false)
  }, [facet?.id])

  useEffect(() => {
    if (isOpen) {
      lastFocused.current = document.activeElement as HTMLElement | null
      setMounted(true)
      const raf = requestAnimationFrame(() => setShow(true))
      return () => cancelAnimationFrame(raf)
    }
    setShow(false)
    const timer = setTimeout(() => setMounted(false), 300)
    return () => clearTimeout(timer)
  }, [isOpen])

  // Move focus into the panel once it is mounted, restore it on close.
  useEffect(() => {
    if (mounted && isOpen) {
      const raf = requestAnimationFrame(() => {
        const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)
        first?.focus()
      })
      return () => cancelAnimationFrame(raf)
    }
    if (!mounted && lastFocused.current) {
      lastFocused.current.focus()
      lastFocused.current = null
    }
  }, [mounted, isOpen])

  // Lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [isOpen])

  // Escape to close + focus trap.
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!mounted) return null

  // Offset from screen center to the clicked window, so the closed bubble sits on the window.
  const dx = origin ? origin.x - window.innerWidth / 2 : 0
  const dy = origin ? origin.y - window.innerHeight / 2 : 0
  const bubbleStyle = {
    transform: show ? 'translate(0px, 0px) scale(1)' : `translate(${dx}px, ${dy}px) scale(0.06)`,
    transitionTimingFunction: show ? 'cubic-bezier(0.2, 0.9, 0.25, 1.08)' : 'cubic-bezier(0.4, 0, 1, 1)',
  }

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* backdrop / click-outside */}
      <button
        type="button"
        aria-label="Close panel"
        tabIndex={-1}
        onClick={onClose}
        className={cn(
          'absolute inset-0 cursor-default bg-night-deep/70 backdrop-blur-sm transition-opacity duration-300',
          show ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* centered bubble that grows out of the clicked window */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="facet-title"
          aria-describedby="facet-description"
          style={bubbleStyle}
          className={cn(
            'pointer-events-auto flex max-h-[88svh] w-full max-w-lg flex-col overflow-hidden border-2 border-window-lit/60 bg-building',
            'shadow-[0_0_0_8px_rgba(251,191,36,0.06),0_0_80px_-8px_rgba(251,191,36,0.4)]',
            'transition-[transform,opacity,border-radius] duration-500 motion-reduce:transition-none',
            show ? 'rounded-[2.25rem] opacity-100' : 'rounded-full opacity-0',
          )}
        >
          {/* header */}
          <div className="flex items-start justify-between gap-4 border-b border-building-edge/70 p-6 pb-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-window-lit/80">
                {facet?.role}
              </p>
              <h2
                id="facet-title"
                className="mt-2 text-balance text-xl font-light leading-tight text-slate-100"
              >
                {facet?.title}
              </h2>
              {facet?.tagline && (
                <p className="mt-1.5 text-pretty text-sm font-medium text-slate-300">
                  {facet.tagline}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={cn(
                'shrink-0 rounded-full border border-building-edge bg-night/60 p-2 text-slate-300 outline-none transition-colors',
                'hover:bg-window-lit hover:text-night focus-visible:ring-2 focus-visible:ring-window-lit focus-visible:ring-offset-2 focus-visible:ring-offset-building',
              )}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* body */}
          <div className="flex flex-col gap-5 overflow-y-auto p-6 pt-5">
            {images.length > 0 ? (
              <div className="flex flex-col gap-3">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-4 border-building-edge bg-night">
                  {/* window mullions + warm interior glow — peering into the room */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_40px_rgba(251,191,36,0.35)] [background:linear-gradient(90deg,transparent_calc(50%-1.5px),theme(colors.building-edge/80%)_calc(50%-1.5px),theme(colors.building-edge/80%)_calc(50%+1.5px),transparent_calc(50%+1.5px)),linear-gradient(0deg,transparent_calc(50%-1.5px),theme(colors.building-edge/80%)_calc(50%-1.5px),theme(colors.building-edge/80%)_calc(50%+1.5px),transparent_calc(50%+1.5px))]"
                  />
                  {images.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src || '/placeholder.svg'}
                      alt={`${facet?.title} — photo ${i + 1} of ${images.length}`}
                      className={cn(
                        'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
                        i === slide ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  ))}

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setSlide((s) => (s - 1 + images.length) % images.length)
                        }
                        aria-label="Previous photo"
                        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-building-edge bg-night/70 p-1.5 text-slate-200 outline-none transition-colors hover:bg-window-lit hover:text-night focus-visible:ring-2 focus-visible:ring-window-lit"
                      >
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSlide((s) => (s + 1) % images.length)}
                        aria-label="Next photo"
                        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-building-edge bg-night/70 p-1.5 text-slate-200 outline-none transition-colors hover:bg-window-lit hover:text-night focus-visible:ring-2 focus-visible:ring-window-lit"
                      >
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <span className="absolute bottom-2 right-2 z-20 rounded-full bg-night/70 px-2 py-0.5 text-xs tabular-nums text-slate-300">
                        {slide + 1} / {images.length}
                      </span>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    {images.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setSlide(i)}
                        aria-label={`Go to photo ${i + 1}`}
                        aria-current={i === slide}
                        className={cn(
                          'h-1.5 rounded-full outline-none transition-all focus-visible:ring-2 focus-visible:ring-window-lit',
                          i === slide
                            ? 'w-6 bg-window-lit'
                            : 'w-1.5 bg-window-unlit hover:bg-slate-500',
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : facet?.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={facet.imageUrl || '/placeholder.svg'}
                alt={facet.title}
                className="aspect-video w-full rounded-lg border border-building-edge object-cover"
              />
            ) : (
              // Amber "window view" stand-in when no image is provided yet.
              <div
                aria-hidden="true"
                className="grid aspect-video w-full place-items-center rounded-lg border border-building-edge bg-night [background:radial-gradient(120%_100%_at_50%_120%,rgba(251,191,36,0.16),transparent_60%)]"
              >
                <div className="grid grid-cols-3 gap-2 opacity-60">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        'h-3 w-3 rounded-[2px]',
                        [0, 2, 4, 5, 7].includes(i) ? 'bg-window-lit' : 'bg-window-unlit',
                      )}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <p id="facet-description" className="text-pretty leading-relaxed text-slate-300">
                {facet?.description}
              </p>

              {facet?.longDescription && (
                <>
                  <div
                    id="facet-story"
                    className={cn(
                      'grid transition-all duration-300 ease-out',
                      expanded
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="whitespace-pre-line text-pretty leading-relaxed text-slate-400">
                        {facet.longDescription}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    aria-expanded={expanded}
                    aria-controls="facet-story"
                    className={cn(
                      'inline-flex w-fit items-center gap-1 rounded-md text-sm font-medium text-window-lit outline-none transition-colors',
                      'hover:text-window-lit-core focus-visible:ring-2 focus-visible:ring-window-lit focus-visible:ring-offset-2 focus-visible:ring-offset-building',
                    )}
                  >
                    {expanded ? 'Read less' : 'Read the full story'}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        expanded && 'rotate-180',
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </>
              )}
            </div>

            {facet?.linkUrl && (
              <a
                href={facet.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'group inline-flex items-center justify-center gap-2 rounded-lg border border-window-lit/40 bg-window-lit/10 px-4 py-2.5 text-sm font-medium text-window-lit outline-none transition-colors',
                  'hover:bg-window-lit hover:text-night focus-visible:ring-2 focus-visible:ring-window-lit focus-visible:ring-offset-2 focus-visible:ring-offset-building',
                )}
              >
                {facet.linkLabel ?? 'Learn more'}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
