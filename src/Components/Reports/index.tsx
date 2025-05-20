import { type TableColumnsType, Table } from "antd";
import { useParams } from "react-router-dom";

interface Report {
  date: string;
  engineer: string;
  depth: number; // Изменено на number, так как это числовое значение
  issues: string;
}

const reportsData: Record<string, Report[]> = {
  1: [
    {
      date: "2024-04-15",
      engineer: "Иванов И.И.",
      depth: 2350,
      issues: "",
    },
    {
      date: "2024-03-28",
      engineer: "Сидоров А.А.",
      depth: 2300,
      issues: "Небольшая утечка",
    },
  ],
  2: [],
  3: [
    {
      date: "2024-05-10",
      engineer: "Петров П.П.",
      depth: 1200,
      issues: "Авария — обрушение стенки",
    },
  ],
};

export const Reports = () => {
  const { id } = useParams<{ id: string }>();

  const currentReport = id ? reportsData[id] || [] : [];

  const columns: TableColumnsType<Report> = [
    {
      title: "Дата",
      dataIndex: "date",
      key: "0",
    },
    {
      title: "Дата",
      dataIndex: "engineer",
      key: "1",
    },
    {
      title: "Глубина бурения (м)",
      dataIndex: "depth",
      key: "2",
    },
    {
      title: "Проблемы",
      dataIndex: "issues",
      key: "3",
    },
  ];

  return <Table columns={columns} dataSource={currentReport} />;
};
