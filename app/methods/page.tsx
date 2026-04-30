/** Legacy bookmark → `/pilot/methods-and-limits`. Doctrine: README + GOVERNANCE; map safety: `types/mapSafety.ts` + `docs/map-safety-protocol.md`; dossier contracts: `types/corridorDossier.ts`, `data/corridorDossier.ts`, `data/sourceMap.ts`. */
import { redirect } from "next/navigation";

export default function MethodsLegacyRoute() {
  redirect("/pilot/methods-and-limits");
}
