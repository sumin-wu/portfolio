/**
 * Layered NYC skyline silhouette rendered as SVG.
 * Two depth layers (far + near) sit behind the foreground building
 * to create parallax-free but readable depth at night.
 */
export function SkylineBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 select-none"
    >
      {/* far layer */}
      <svg
        className="absolute bottom-0 h-[38vh] w-full text-skyline-far"
        viewBox="0 0 1440 360"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0 360V180h40v-40h34v40h40v-70h14v-26h10v26h14v70h48v-96h44v96h40v-52h34v52h56v-120h12v-30h10v30h12v120h52v-64h44v64h40v-150h30v150h60v-40h34v40h48v-90h44v90h52v-58h40v58h40V150h12v-34h10v34h12v210h56v-70h44v70h40v-44h34v44h52V360Z" />
      </svg>
      {/* near layer with faint distant windows */}
      <svg
        className="absolute bottom-0 h-[30vh] w-full text-skyline"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0 300V150h70v-40h60v40h50v-80h16v-30h12v30h16v80h70v-56h64v56h60V90h80v160h70v-70h60v70h56V120h18v-40h12v40h18v130h66v-58h64v58h60v-96h80v96h70v-46h64v46h60V300Z" />
      </svg>
      {/* scattered distant window dots on the near layer */}
      <div className="absolute bottom-0 h-[30vh] w-full opacity-[0.5]">
        <div className="absolute left-[14%] bottom-[9%] h-1 w-1 rounded-[1px] bg-window-lit/60" />
        <div className="absolute left-[15.5%] bottom-[13%] h-1 w-1 rounded-[1px] bg-window-lit/40" />
        {/* ambient glow cycles softly across a couple of distant lights */}
        <div className="city-glow absolute left-[27%] bottom-[7%] h-1 w-1 rounded-[1px] bg-window-lit shadow-[0_0_6px_1px_rgba(251,191,36,0.7)]" />
        <div className="absolute left-[41%] bottom-[16%] h-1 w-1 rounded-[1px] bg-window-lit/60" />
        <div className="absolute left-[42.5%] bottom-[11%] h-1 w-1 rounded-[1px] bg-window-lit/30" />
        <div
          className="city-glow absolute left-[63%] bottom-[10%] h-1 w-1 rounded-[1px] bg-window-lit shadow-[0_0_6px_1px_rgba(251,191,36,0.7)]"
          style={{ animationDelay: '2.5s' }}
        />
        <div className="absolute left-[76%] bottom-[14%] h-1 w-1 rounded-[1px] bg-window-lit/40" />
        <div className="absolute left-[88%] bottom-[8%] h-1 w-1 rounded-[1px] bg-window-lit/55" />
      </div>
    </div>
  )
}
