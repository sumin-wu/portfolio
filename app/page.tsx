import { SkylineBackdrop } from '@/components/skyline-backdrop'
import { Skyscraper } from '@/components/skyscraper'
import { TopNav } from '@/components/top-nav'
import { IntroPanel } from '@/components/intro-panel'
import { ReferencesSection } from '@/components/references-section'
import { AboutMeSection } from '@/components/about-me-section'
import { SceneFade } from '@/components/scene-fade'

export default function Page() {
  return (
    // Tall scroll track; the scene stays pinned while scrolling lights the tower.
    <main className="relative bg-night text-slate-200">
      <div id="tower-track" className="relative h-[450svh]">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-end overflow-hidden">
        {/* ambient horizon glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_80%_at_50%_100%,rgba(251,191,36,0.10),transparent_55%),linear-gradient(to_bottom,var(--color-night-deep),var(--color-night)_60%)]"
        />
        {/* far starfield — dimmer, drifts slowest (parallax back layer) */}
        <div
          aria-hidden="true"
          className="star-drift-slow pointer-events-none absolute -inset-12 opacity-[0.22] [background:radial-gradient(1px_1px_at_12%_22%,#fff,transparent),radial-gradient(1px_1px_at_31%_9%,#fff,transparent),radial-gradient(1px_1px_at_45%_28%,#fff,transparent),radial-gradient(1px_1px_at_58%_16%,#fff,transparent),radial-gradient(1px_1px_at_73%_31%,#fff,transparent),radial-gradient(1px_1px_at_89%_14%,#fff,transparent),radial-gradient(1px_1px_at_5%_40%,#fff,transparent)]"
        />
        {/* near starfield — brighter, drifts a touch faster (parallax front layer) */}
        <div
          aria-hidden="true"
          className="star-drift pointer-events-none absolute -inset-12 opacity-[0.4] [background:radial-gradient(1px_1px_at_20%_18%,#fff,transparent),radial-gradient(1px_1px_at_67%_12%,#fff,transparent),radial-gradient(1.5px_1.5px_at_82%_25%,#fff,transparent),radial-gradient(1px_1px_at_38%_30%,#fff,transparent),radial-gradient(1.5px_1.5px_at_50%_8%,#fff,transparent)]"
        />

        <TopNav current="/" />

        <SkylineBackdrop />

        <IntroPanel />

        {/* invitation copy */}
        <div className="relative z-10 mb-10 flex flex-col items-center px-6 text-center sm:mb-14 md:absolute md:right-10 md:top-1/2 md:mb-0 md:max-w-xs md:-translate-y-1/2 md:items-end md:px-0 md:text-right lg:right-14">
          <h1 className="text-balance text-2xl font-light leading-tight text-slate-100 sm:text-3xl">
            Every window tells a story
          </h1>
          <p className="hint-pulse mt-3 text-pretty text-sm text-slate-400">
            <span className="block">Scroll to light up the tower</span>
            <span className="block">Then click a window</span>
          </p>
        </div>

        {/* the building sits on the skyline */}
        <div className="relative z-10 flex w-full origin-bottom scale-75 justify-center sm:scale-90 md:scale-100">
          <Skyscraper />
        </div>

        <SceneFade trackId="tower-track" />
      </div>
      </div>

      <ReferencesSection />

      <AboutMeSection />
    </main>
  )
}
