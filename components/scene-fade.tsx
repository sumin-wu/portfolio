'use client'

import { useEffect, useRef } from 'react'

/**
 * Dims the pinned tower scene into the references section's background
 * as the scroll track ends, so the two sections blend instead of cutting.
 */
export function SceneFade({ trackId }: { trackId: string }) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = document.getElementById(trackId)
    const overlay = overlayRef.current
    if (!track || !overlay) return

    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      const { bottom } = track.getBoundingClientRect()
      // Start fading slightly before the scene unpins and finish as it leaves.
      const start = vh * 1.35
      const end = vh * 0.45
      const progress = Math.min(1, Math.max(0, (start - bottom) / (start - end)))
      overlay.style.opacity = String(progress * progress * (3 - 2 * progress))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [trackId])

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30 bg-night-deep opacity-0"
    />
  )
}
