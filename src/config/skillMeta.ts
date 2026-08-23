export type TimeSavings = 'Low' | 'Medium' | 'High';

export interface SkillMeta {
  stage: string;
  order: number;
  impact: TimeSavings;
}

export const STAGE_ORDER = [
  'Intake',
  'Team onboarding',
  'Scheduling prep',
  'Scheduling',
  'Planning',
  'Cadence',
];

export function formatStage(stage: string): string {
  const number = String(STAGE_ORDER.indexOf(stage) + 1).padStart(2, '0');
  return `${number} ${stage}`;
}

// Skills omitted here (e.g. pmo-kickoff-overview) are excluded from the table.
export const skillMeta: Record<string, SkillMeta> = {
  'pmo-project-overview': {
    stage: 'Intake',
    order: 1,
    impact: 'High',
  },
  'pmo-project-registry': {
    stage: 'Intake',
    order: 2,
    impact: 'Low',
  },
  'pmo-team-member-intake': {
    stage: 'Team onboarding',
    order: 3,
    impact: 'Medium',
  },
  'pmo-step-schedule': {
    stage: 'Scheduling prep',
    order: 4,
    impact: 'High',
  },
  'pmo-kickoff-scheduler': {
    stage: 'Scheduling',
    order: 5,
    impact: 'Low',
  },
  'pmo-planning-synthesis': {
    stage: 'Planning',
    order: 6,
    impact: 'High',
  },
  'pmo-meeting-recap': {
    stage: 'Cadence',
    order: 7,
    impact: 'High',
  },
  'pmo-slack-notion-sync': {
    stage: 'Cadence',
    order: 8,
    impact: 'Medium',
  },
  'pmo-link-harvest': {
    stage: 'Cadence',
    order: 9,
    impact: 'Medium',
  },
};
