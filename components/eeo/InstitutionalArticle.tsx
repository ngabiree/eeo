import type { ReactNode } from "react";

export default function InstitutionalArticle({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col py-10 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] md:py-14">
      <article className="eeo-page-gutter-x mx-auto w-full max-w-3xl space-y-6 text-[color:var(--eeo-text)]">
        {eyebrow ? (
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--eeo-muted)]">{eyebrow}</p>
        ) : null}
        <h1 className="font-serif text-[clamp(1.5rem,4.5vw+0.5rem,1.875rem)] font-semibold tracking-tight text-[color:var(--eeo-ink)]">
          {title}
        </h1>
        <div className="space-y-4 text-sm leading-relaxed">{children}</div>
      </article>
    </main>
  );
}
