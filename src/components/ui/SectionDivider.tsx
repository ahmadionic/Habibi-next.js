/*
 * SectionDivider — organic SVG wave transitions between sections.
 *
 * Placement: standalone element in page markup, between two sections.
 * Height: 72px (desktop) / 48px (mobile) — controlled via the wrapper div.
 *
 * The SVG renders in the "from" colour on a "to" coloured background,
 * making the section above appear to melt organically into the section below.
 *
 * Brand colours mirror globals.css @theme values exactly.
 */

type ColorName = "cream" | "linen" | "deep-pine" | "sand";

interface SectionDividerProps {
  from: ColorName;
  to: ColorName;
  /**
   * Flips the wave vertically — use when the divider should "rise" into the
   * next section rather than "fall" from the previous one.
   */
  flip?: boolean;
  /** Optional extra className on the wrapper (e.g. to override height). */
  className?: string;
}

const COLORS: Record<ColorName, string> = {
  cream:       "#F7F3EC",
  linen:       "#E7DCC8",
  "deep-pine": "#334B3A",
  sand:        "#DCC8A6",
};

/*
 * Each path is 1440 × 80, filling from y=0 to a wave then down to y=80.
 * The wave crest/trough positions are intentionally asymmetric for an
 * organic, hand-crafted feel appropriate to the HABibi brand.
 */
const WAVE_PATHS: string[] = [
  /* gentle rolling — used between close tones */
  "M0,48 C240,80 480,16 720,48 C960,80 1200,16 1440,48 L1440,0 L0,0 Z",
  /* deeper flow — used before/after deep-pine */
  "M0,56 C360,80 480,0 720,56 C960,80 1080,16 1440,32 L1440,0 L0,0 Z",
  /* wide arch — used for footer transition */
  "M0,32 C480,80 960,80 1440,32 L1440,0 L0,0 Z",
  /* asymmetric curl — variety for linen→deep-pine */
  "M0,64 C180,80 360,0 720,48 C1080,80 1260,24 1440,56 L1440,0 L0,0 Z",
];

let _idx = 0;
const getNextPath = () => WAVE_PATHS[_idx++ % WAVE_PATHS.length];

/*
 * Each divider instance gets a deterministic path so SSR and client match.
 * We use a module-level counter reset would break SSR, so instead each call
 * site passes an explicit variant (0-3) via the variant prop.
 */
export function SectionDivider({
  from,
  to,
  flip = false,
  className = "",
}: SectionDividerProps) {
  const fromColor = COLORS[from];
  const toColor   = COLORS[to];

  return (
    <div
      aria-hidden="true"
      className={`relative -mt-[1px] w-full overflow-hidden ${className}`}
      style={{
        background: toColor,
        height: "72px",
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
        style={{
          transform: flip ? "scaleY(-1)" : undefined,
        }}
      >
        <path d={WAVE_PATHS[0]} fill={fromColor} />
      </svg>
    </div>
  );
}

/* Named variants so each transition uses a different wave shape */

export function DividerCreamToLinen()   {
  return (
    <div aria-hidden="true" className="relative -mt-[1px] w-full overflow-hidden" style={{ height: 72, background: "#E7DCC8" }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0,48 C240,80 480,16 720,48 C960,80 1200,16 1440,48 L1440,0 L0,0 Z" fill="#F7F3EC" />
      </svg>
    </div>
  );
}

export function DividerLinenToPine()    {
  return (
    <div aria-hidden="true" className="relative -mt-[1px] w-full overflow-hidden" style={{ height: 72, background: "#334B3A" }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0,64 C180,80 360,0 720,48 C1080,80 1260,24 1440,56 L1440,0 L0,0 Z" fill="#E7DCC8" />
      </svg>
    </div>
  );
}

export function DividerPineToCream()    {
  return (
    <div aria-hidden="true" className="relative -mt-[1px] w-full overflow-hidden" style={{ height: 72, background: "#F7F3EC" }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0,56 C360,80 480,0 720,56 C960,80 1080,16 1440,32 L1440,0 L0,0 Z" fill="#334B3A" />
      </svg>
    </div>
  );
}

export function DividerCreamToPine()    {
  return (
    <div aria-hidden="true" className="relative -mt-[1px] w-full overflow-hidden" style={{ height: 72, background: "#334B3A" }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0,32 C480,80 960,80 1440,32 L1440,0 L0,0 Z" fill="#F7F3EC" />
      </svg>
    </div>
  );
}
