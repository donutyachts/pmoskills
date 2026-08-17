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

export function formatStage(stage: string, orderedStages: string[]): string {
  const number = String(orderedStages.indexOf(stage) + 1).padStart(2, '0');
  return `${number} ${stage}`;
}
