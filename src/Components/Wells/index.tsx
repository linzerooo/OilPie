import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useTableSearch } from "../Helpers/getSearchProps";
import { useNavigate } from "react-router-dom";

interface Well {
  id: number;
  name: string;
  field: string;
  status: string;
  lastReportDate: string;
}

const WELLS_DATA: Well[] = [
  {
    id: 1,
    name: "Скважина №101",
    field: "Южное месторождение",
    status: "активна",
    lastReportDate: "2024-04-15",
  },
  {
    id: 2,
    name: "Скважина №202",
    field: "Северное месторождение",
    status: "законсервирована",
    lastReportDate: "2023-12-01",
  },
  {
    id: 3,
    name: "Скважина №303",
    field: "Восточное месторождение",
    status: "авария",
    lastReportDate: "2024-05-10",
  },
];

export const WellsTable = () => {
  const { getColumnSearchProps } = useTableSearch();
  const navigate = useNavigate();

  const columns: TableColumnsType<Well> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Название скважины",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Месторождение",
      dataIndex: "field",
      key: "field",
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Дата последнего отчёта",
      dataIndex: "lastReportDate",
      key: "lastReportDate",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, well) => (
        <Button
          onClick={() => {
            console.log(well)
            navigate(`/reports/${well.lastReportDate}`);
          }}
        >
          Посмотреть отчет
        </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={WELLS_DATA} rowKey="id" />;
};
