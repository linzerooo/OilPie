import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useTableSearch } from "../Helpers/getSearchProps";
import { useNavigate } from "react-router-dom";
import { wells } from "./mockWells";

const statuses = [
  {
    text: "активна",
    value: "активна",
  },
  {
    text: "пассивна",
    value: "пассивна",
  },
  {
    text: "законсервирована",
    value: "законсервирована",
  },
  {
    text: "авария",
    value: "авария",
  },
]

type StatusValue = typeof statuses[number]['value'];

interface Well {
  id: number;
  name: string;
  field: string;
  status: StatusValue;
  lastReportDate: string;
}

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
      filters: statuses,
      onFilter: (value, record) => record.status.indexOf(value as string) === 0,
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
            console.log(well);
            navigate(`/reports/${well.lastReportDate}`);
          }}
        >
          Посмотреть отчет
        </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={wells} rowKey="id" />;
};
