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

export default function EeoLogo({
  variant = "transparent",
  priority = false,
  size = "md",
  className = "",
  decorative = false,
}: EeoLogoProps) {
  const alt = decorative ? "" : "Earth Endowment Observatory";
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${className}`.trim()}>
      <Image
        src={VARIANT_SRC[variant]}
        alt={alt}
        width={1254}
        height={1254}
        className={`${sizeClasses[size]} object-contain`}
        sizes="56px"
        priority={priority}
        {...(decorative ? ({ "aria-hidden": true } as const) : {})}
      />
    </span>
  );
}
