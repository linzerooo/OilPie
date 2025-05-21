import * as XLSX from 'xlsx';
import { Report } from '/entities/report';

export function exportReportsToExcel(reports: Report[], wellName: string) {
  const worksheet = XLSX.utils.json_to_sheet(reports.map(({ engineer, depth, problems, date }) => ({
    Дата: date,
    Инженер: engineer,
    Глубина: depth,
    Проблемы: problems || '-',
  })));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Отчеты');
  XLSX.writeFile(workbook, `${wellName}-отчеты.xlsx`);
}
