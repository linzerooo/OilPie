export interface Report {
  date: string;
  engineer: string;
  depth: number;
  issues: string;
}

export type ReportsState = Record<string, Report[]>;