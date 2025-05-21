import { Button, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { useNavigate } from "react-router-dom";
import { useTableSearch } from "../../Features/Well/getSearchProps";
import { mockWells } from "../../Entities/Well/mockWells";
import { statuses } from "../../Shared/constants/statuses";
import type { Well } from "../../Entities/Well/types";

export const WellsTable = () => {
  const { getColumnSearchProps } = useTableSearch();
  const navigate = useNavigate();

  const columns: TableColumnsType<Well> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "0",
    },
    {
      title: "Название скважины",
      dataIndex: "name",
      key: "1",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Месторождение",
      dataIndex: "field",
      key: "2",
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "3",
      filters: statuses,
      onFilter: (value, record) => record.status.indexOf(value as string) === 0,
      render: (val: string) => {
        const status = statuses.find((s) => s.value === val);
        return <Tag color={status?.color || "default"}>{val.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Дата последнего отчёта",
      dataIndex: "lastReportDate",
      key: "4",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "5",
      render: (_, well) => (
        <Button
          onClick={() => {
            navigate(`/reports/${well.id}`);
          }}
        >
          Посмотреть отчет
        </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={mockWells} />;
};
