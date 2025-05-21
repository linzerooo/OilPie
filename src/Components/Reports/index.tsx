import { Button, Table } from "antd";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AddReportModal } from "./ReportModal";
import type { RootState } from "../Helpers/store";

export const Reports = () => {
  const { id } = useParams<{ id: string }>();
  const reports = useSelector((state: RootState) => state.reports[id || ""]) || [];

  const [modalOpen, setModalOpen] = useState(false);

  const columns = [
    { title: "Дата", dataIndex: "date", key: "0" },
    { title: "Инженер", dataIndex: "engineer", key: "1" },
    { title: "Глубина бурения (м)", dataIndex: "depth", key: "2" },
    { title: "Проблемы", dataIndex: "issues", key: "3" },
  ];

  return (
    <>
      <Button onClick={() => setModalOpen(true)} style={{ marginBottom: 16}}>
        Добавить отчет
      </Button>
      <Table columns={columns} dataSource={reports} rowKey={(r) => r.date + r.engineer} />
      <AddReportModal wellId={id || "0"} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
