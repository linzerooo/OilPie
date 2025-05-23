import type { statuses } from "../../shared/constants/statuses";

export type StatusValue = typeof statuses[number]['value'];

export interface Well {
  id: number;
  name: string;
  field: string;
  status: StatusValue;
  lastReportDate: string;
}
