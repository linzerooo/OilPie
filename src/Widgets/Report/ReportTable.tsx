import { Button, message, Table } from "antd";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import type { RootState } from "@entities/report/store";
import * as XLSX from "xlsx";
import { ReportModal } from "@features/report/reportModal";

export const ReportTable = () => {
  const { id } = useParams<{ id: string }>();
  const reports =
    useSelector((state: RootState) => state.reports[id || ""]) || [];

  const [modalOpen, setModalOpen] = useState(false);

  const columns = useMemo(
    () => [
      { title: "Дата", dataIndex: "date", key: "0" },
      { title: "Инженер", dataIndex: "engineer", key: "1" },
      { title: "Глубина бурения (м)", dataIndex: "depth", key: "2" },
      { title: "Проблемы", dataIndex: "issues", key: "3" },
    ],
    []
  );

  const exportToExcel = () => {
    try {
      const data = [
        ["Дата", "Инженер", "Глубина бурения (м)", "Проблемы"], // Заголовки
        ...reports.map((report) => [
          report.date,
          report.engineer,
          report.depth,
          report.issues || "Нет данных",
        ]),
      ];

      // создание рабочего листа
      const worksheet = XLSX.utils.aoa_to_sheet(data);

      //  настройка ширины столбцов (опционально)
      worksheet["!cols"] = [
        { wch: 15 }, // Ширина для колонки "Дата"
        { wch: 25 }, // Ширина для колонки "Инженер"
        { wch: 20 }, // Ширина для колонки "Глубина"
        { wch: 40 }, // Ширина для колонки "Проблемы"
      ];

      // создание книги и сохранение
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Отчеты");

      // генерация имени файла
      const wellName = `Скважина_${id}`;
      XLSX.writeFile(
        workbook,
        `${wellName}_отчеты_${new Date().toISOString().slice(0, 10)}.xlsx`
      );

    } catch (error) {
      console.error("Ошибка при экспорте:", error);
      message.error("Не удалось экспортировать данные");
    }
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={reports}
        rowKey={(r) => r.date + r.engineer}
      />
      <ReportModal
        wellId={id || ""}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <Button
        onClick={() => setModalOpen(true)}
        style={{ marginTop: 26, marginRight: 25 }}
      >
        Добавить отчет
      </Button>
      <Button onClick={exportToExcel} disabled={reports.length === 0}>
        Экспорт в Excel
      </Button>
    </>
  );
};
