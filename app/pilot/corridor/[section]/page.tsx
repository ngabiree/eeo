import { notFound, redirect } from "next/navigation";

const corridorSectionRedirects = {
  "historical-record": "/pilot/corridor?expand=historical-record",
  "evidence-gaps": "/pilot/corridor?expand=evidence-gaps",
  "shared-inquiry-field": "/pilot/corridor?expand=shared-inquiry-field",
  "ecology-system": "/pilot/corridor?expand=ecology-system",
  "water-system": "/pilot/corridor?expand=water-system",
  "human-governance-system": "/pilot/corridor?expand=human-governance-system",
  "restoration-pathway": "/pilot/corridor?expand=restoration-pathway",
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
