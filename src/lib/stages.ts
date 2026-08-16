import type { CollectionEntry } from 'astro:content';

export function getOrderedStages(skills: CollectionEntry<'skills'>[]): string[] {
  const stages: string[] = [];
  for (const skill of skills) {
    if (!stages.includes(skill.data.stage)) {
      stages.push(skill.data.stage);
    }
  }
  return stages;
}
