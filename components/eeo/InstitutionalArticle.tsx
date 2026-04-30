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
    <main className="flex flex-1 flex-col py-10 md:py-14">
      <article className="mx-auto w-full max-w-3xl space-y-6 px-4 text-[color:var(--eeo-text)] md:px-6">
        {eyebrow ? (
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--eeo-muted)]">{eyebrow}</p>
        ) : null}
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[color:var(--eeo-ink)]">{title}</h1>
        <div className="space-y-4 text-sm leading-relaxed">{children}</div>
      </article>
    </main>
  );
}
