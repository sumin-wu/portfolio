import type { CSSProperties } from 'react'
import { FileText } from 'lucide-react'

const tags = ['First-Gen Immigrant', 'Based in New York', '5 languages, 3 cities']

const bio =
  "Born in China, raised in NYC, studying in California. Early-stage founder studying the intersection of ML, Data Science, and Business at the University of Southern California's Marshall and Viterbi."

const passionLead = 'Passionate about empowering human-centered technology for all. Interested in'
const interests = ['wearables', 'climate-tech', 'fashion-tech']

const TAG_STEP = 140
const WORD_STEP = 28
const BIO_START = tags.length * TAG_STEP + 150

const bioWords = bio.split(' ')
const passionWords = passionLead.split(' ')
const PASSION_START = BIO_START + bioWords.length * WORD_STEP + 150
const INTEREST_START = PASSION_START + passionWords.length * WORD_STEP
const BUTTON_DELAY = INTEREST_START + interests.length * 160 + 250

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

function Words({ text, start }: { text: string[]; start: number }) {
  return text.map((word, i) => (
    <span key={i}>
      <span aria-hidden="true" className="intro-rise" style={delay(start + i * WORD_STEP)}>
        {word}
      </span>{' '}
    </span>
  ))
}

export function IntroPanel() {
  return (
    <section
      aria-label="About Sumin"
      className="absolute left-6 right-6 top-20 z-20 flex max-w-md flex-col gap-4 break-words sm:left-10 md:right-[calc(50%+9rem)] md:top-1/2 md:-translate-y-1/2 lg:left-14"
    >
      <ul className="flex flex-col gap-1 font-mono text-2xl font-bold uppercase leading-tight tracking-wide text-amber-200/90 sm:text-3xl">
        {tags.map((tag, i) => (
          <li key={tag} className="intro-rise" style={delay(i * TAG_STEP)}>
            {tag}
          </li>
        ))}
      </ul>

      <p className="text-pretty text-sm leading-relaxed text-slate-300">
        <span className="sr-only">{bio}</span>
        <Words text={bioWords} start={BIO_START} />
      </p>

      <p className="text-pretty text-sm leading-relaxed text-slate-400">
        <span className="sr-only">{`${passionLead} ${interests.join(', ')}.`}</span>
        <Words text={passionWords} start={PASSION_START} />
        {interests.map((interest, i) => {
          const start = INTEREST_START + i * 160
          const suffix = i === interests.length - 1 ? '.' : i === interests.length - 2 ? ', and' : ','
          return (
            <span key={interest} aria-hidden="true">
              <span className="intro-rise" style={delay(start)}>
                <span
                  className="intro-keyword"
                  style={{ '--u': `${start + 350}ms` } as CSSProperties}
                >
                  {interest}
                </span>
                {suffix}
              </span>{' '}
            </span>
          )
        })}
      </p>

      <div className="intro-rise mt-1" style={delay(BUTTON_DELAY)}>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-56 items-center justify-center gap-2 rounded-full border border-amber-200/40 px-4 py-2 text-sm text-amber-100 transition-colors hover:border-amber-200 hover:bg-amber-200/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
        >
          <FileText className="size-4" aria-hidden="true" />
          Resume
        </a>
      </div>
    </section>
  )
}
