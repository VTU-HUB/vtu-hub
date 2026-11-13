/**
 * Everyone who has contributed to VTUHub, from git history at build time. Falls back to
 * the committed snapshot (npm run sync:contributors) on a shallow clone.
 */
import { contributorsFromGit, type Contributor } from "@/lib/contributors";
import snapshot from "./contributors.json";

export const contributors: Contributor[] = contributorsFromGit() ?? (snapshot as Contributor[]);

export function contributorPath(c: Pick<Contributor, "slug">) {
  return `/contributors/${c.slug}`;
}
