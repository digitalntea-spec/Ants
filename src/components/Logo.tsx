type LogoProps = {
  size?: number;
  showBadge?: boolean;
  className?: string;
};

const LETTER_COLORS = ["#C4B5FD", "#5EEAD4", "#C4B5FD", "#5EEAD4"]; // A N T S

export default function Logo({ size = 120, showBadge = true, className = "" }: LogoProps) {
  const letters = "ANTS".split("");

  const wordmark = (
    <div
      className={`relative inline-flex items-center font-graffiti select-none ${className}`}
      style={{
        fontSize: size * 0.32,
        letterSpacing: 1,
        transform: "rotate(-4deg)",
      }}
    >
      <span
        aria-hidden
        className="absolute rounded-full bg-ants-ink"
        style={{ width: size * 0.035, height: size * 0.035, top: -size * 0.06, left: size * 0.16 }}
      />
      <span
        aria-hidden
        className="absolute rounded-full bg-ants-ink"
        style={{ width: size * 0.035, height: size * 0.035, top: -size * 0.06, left: size * 0.26 }}
      />
      {letters.map((letter, i) => (
        <span
          key={`${letter}-${i}`}
          style={{
            color: LETTER_COLORS[i],
            WebkitTextStroke: `${Math.max(2, size * 0.02)}px #1A1A2E`,
            textShadow: [1, 2, 3, 4]
              .map((n) => `${n * 2}px ${n * 2}px 0 #1A1A2E`)
              .join(", "),
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );

  if (!showBadge) return wordmark;

  return (
    <div
      className="rounded-full bg-ants-amarillo flex flex-col items-center justify-center"
      style={{ width: size, height: size }}
    >
      {wordmark}
      <span
        className="font-graffiti text-ants-ink"
        style={{ fontSize: size * 0.065, letterSpacing: 2, transform: "rotate(-2deg)" }}
      >
        CAMINO DE HORMIGAS
      </span>
    </div>
  );
}
