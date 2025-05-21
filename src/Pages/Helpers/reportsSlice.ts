// features/reports/reportsSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { mockReports } from "../Reports/mockReports";

interface Report {
  date: string;
  engineer: string;
  depth: number;
  issues: string;
}

type ReportsState = Record<string, Report[]>;

const initialState: ReportsState = mockReports;

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    addReport(state, action: PayloadAction<{ wellId: string; report: Report }>) {
      const { wellId, report } = action.payload;
      if (!state[wellId]) {
        state[wellId] = [];
      }
      state[wellId].push(report);
    },
  },
});

export const { addReport } = reportsSlice.actions;
export default reportsSlice.reducer;
