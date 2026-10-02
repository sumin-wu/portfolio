'use client'

import { useEffect, useRef, useState } from 'react'

type Entry = {
  question: string
  answer?: string
  chips?: string[]
}

const ENTRIES: Entry[] = [
  { question: 'What\u2019s the most interesting story about you?' },
  {
    question: 'What languages do you speak?',
    chips: ['Mandarin', 'Cantonese', 'Spanish', 'Taishanese', 'English'],
  },
  {
    question: 'What are your hobbies?',
    chips: ['Professional DJ', 'Rock climbing', 'Pickleball', 'Hiking', 'Photography', 'Designing'],
  },
  { question: 'What\u2019s your 10-year vision of the future?' },
  {
    question: 'What are you working on right now?',
    answer: 'Hardware: a retro phone for the future.',
  },
]

export function AboutMeSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="about-me"
      aria-labelledby="about-me-heading"
      data-visible={visible}
      className="group relative px-6 [background:linear-gradient(to_bottom,var(--color-night-deep),var(--color-night)_40%)] py-24 sm:py-32"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <header className="flex flex-col gap-3 opacity-0 transition-all duration-700 ease-out translate-y-6 group-data-[visible=true]:translate-y-0 group-data-[visible=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-200/70">After hours</p>
          <h2 id="about-me-heading" className="text-balance text-3xl font-light text-slate-100 sm:text-4xl">
            About me
          </h2>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ENTRIES.map((entry, i) => {
            const answered = Boolean(entry.answer || entry.chips)
            return (
              <li
                key={entry.question}
                style={{ transitionDelay: visible ? `${150 + i * 120}ms` : '0ms' }}
                className={`flex flex-col gap-4 rounded-2xl border p-6 opacity-0 transition-all duration-700 ease-out translate-y-8 group-data-[visible=true]:translate-y-0 group-data-[visible=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
                  answered
                    ? 'border-amber-200/15 bg-slate-900/70 shadow-[0_0_40px_-16px_rgba(251,191,36,0.4)]'
                    : 'border-slate-800 bg-slate-950/60'
                } ${i === 0 ? 'lg:col-span-2' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={`mt-2 size-2 shrink-0 rounded-sm ${
                      answered ? 'bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.8)]' : 'bg-slate-700'
                    }`}
                  />
                  <h3 className="text-pretty text-base font-medium leading-snug text-slate-100">{entry.question}</h3>
                </div>

                {entry.chips ? (
                  <ul className="flex flex-wrap gap-2" aria-label={entry.question}>
                    {entry.chips.map((chip) => (
                      <li
                        key={chip}
                        className="rounded-full border border-amber-200/20 bg-amber-300/5 px-3 py-1 text-sm text-amber-100/90"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                ) : entry.answer ? (
                  <p className="text-pretty text-sm leading-relaxed text-slate-300">{entry.answer}</p>
                ) : (
                  <p className="text-sm italic leading-relaxed text-slate-500">Answer coming soon.</p>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
