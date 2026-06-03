import Image from "next/image";

export type EeoLogoVariant = "transparent" | "card";

const VARIANT_SRC: Record<EeoLogoVariant, string> = {
  transparent: "/brand/eeo-logo-transparent.png",
  card: "/brand/eeo-logo-card.png",
};

type EeoLogoProps = {
  variant?: EeoLogoVariant;
  /** Visual size tokens; default reads well in shells and pilot nav */
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  className?: string;
  /** When the surrounding control already exposes the Observatory name (e.g. aria-label). */
  decorative?: boolean;
};

const sizeClasses: Record<NonNullable<EeoLogoProps["size"]>, string> = {
  sm: "h-10 w-10 md:h-11 md:w-11",
  md: "h-12 w-12 md:h-14 md:w-14",
  lg: "h-14 w-14 md:h-16 md:w-16",
};

const logoFrameClass =
  "overflow-hidden rounded-xl border border-[color:var(--eeo-border)] bg-[linear-gradient(135deg,var(--eeo-green-soft)_0%,rgba(255,255,255,0.92)_54%,var(--eeo-sky)_100%)] shadow-[0_1px_0_rgba(19,66,74,0.06),0_8px_20px_rgba(19,66,74,0.08)] ring-1 ring-white/70";

export default function EeoLogo({
  variant = "transparent",
  priority = false,
  size = "md",
  className = "",
  decorative = false,
}: EeoLogoProps) {
  const alt = decorative ? "" : "Earth Endowment Observatory";
  return (
    <span className={`inline-flex ${sizeClasses[size]} shrink-0 items-center justify-center ${logoFrameClass} ${className}`.trim()}>
      <Image
        src={VARIANT_SRC[variant]}
        alt={alt}
        width={1254}
        height={1254}
        className="h-[82%] w-[82%] object-contain"
        sizes="56px"
        priority={priority}
        {...(decorative ? ({ "aria-hidden": true } as const) : {})}
      />
    </span>
  );
}
