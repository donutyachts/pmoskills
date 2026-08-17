import { execFileSync } from 'node:child_process';

export function getLastUpdatedDate(relativePaths: string[]): Date | null {
  let isoDate: string;
  try {
    isoDate = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', ...relativePaths],
      { encoding: 'utf-8' }
    ).trim();
  } catch {
    return null;
  }
  return isoDate ? new Date(isoDate) : null;
}
