import { Button, Table } from "antd";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../Entities/Report/store";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ReportModal } from "../../Features/Report/ReportModal";

export const ReportTable = () => {
  const { id } = useParams<{ id: string }>();
  const reports = useSelector((state: RootState) => state.reports[id || ""]) || [];

  const [modalOpen, setModalOpen] = useState(false);

  const columns = [
    { title: "Дата", dataIndex: "date", key: "0" },
    { title: "Инженер", dataIndex: "engineer", key: "1" },
    { title: "Глубина бурения (м)", dataIndex: "depth", key: "2" },
    { title: "Проблемы", dataIndex: "issues", key: "3" },
  ];

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(reports)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Отчёты')
   
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: "array"})
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(file, `Отчёт скважина №${id}.xlsx`)
  }

  return (
    <>
      <Button onClick={() => setModalOpen(true)} style={{ marginBottom: 16}}>
        Добавить отчет
      </Button>
      <Button onClick={exportToExcel}> 
        Экспорт в Excel
      </Button>
      <Table columns={columns} dataSource={reports} rowKey={(r) => r.date + r.engineer} />
      <ReportModal wellId={id || "-1"} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
