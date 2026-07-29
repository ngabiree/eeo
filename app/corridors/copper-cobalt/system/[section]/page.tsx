import { notFound, redirect } from "next/navigation";

const corridorSectionRedirects = {
  "historical-record": "/corridors/copper-cobalt/system?expand=historical-record",
  "evidence-gaps": "/corridors/copper-cobalt/system?expand=evidence-gaps",
  "shared-inquiry-field": "/corridors/copper-cobalt/system?expand=shared-inquiry-field",
  "ecology-system": "/corridors/copper-cobalt/system?expand=ecology-system",
  "water-system": "/corridors/copper-cobalt/system?expand=water-system",
  "human-governance-system": "/corridors/copper-cobalt/system?expand=human-governance-system",
  "restoration-pathway": "/corridors/copper-cobalt/system?expand=restoration-pathway",
} as const;

type CorridorSection = keyof typeof corridorSectionRedirects;

type CorridorSectionPageProps = {
  params: Promise<{
    section: string;
  }>;
};

export function generateStaticParams() {
  return Object.keys(corridorSectionRedirects).map((section) => ({ section }));
}

export default async function CorridorSectionPage({ params }: CorridorSectionPageProps) {
  const { section } = await params;

  if (!isCorridorSection(section)) {
    notFound();
  }

  redirect(corridorSectionRedirects[section]);
}

function isCorridorSection(section: string): section is CorridorSection {
  return Object.hasOwn(corridorSectionRedirects, section);
}
