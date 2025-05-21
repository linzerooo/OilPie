import { useState, useRef } from "react";
import {
  Button,
  Input,
  Space,
  type InputRef,
  type TableColumnType,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

export const useTableSearch = () => {
  const [searchState, setSearchState] = useState({
    text: "",
    column: "",
  });

  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchState({
      text: selectedKeys[0],
      column: dataIndex,
    });
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchState((prev) => ({ ...prev, text: "" }));
  };

  const getColumnSearchProps = <T extends object>(
    dataIndex: keyof T
  ): TableColumnType<T> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, String(dataIndex))
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, String(dataIndex))
            }
            icon={<SearchOutlined />}
            size="small"
          >
            Поиск
          </Button>
          <Button
            onClick={() => {
              handleReset(clearFilters!);
              handleSearch(
                selectedKeys as string[],
                confirm,
                String(dataIndex)
              );
              setSearchState((prev) => ({ ...prev, text: "" }));
            }}
            size="small"
          >
            Сброс
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      String(record[dataIndex])
        .toLowerCase()
        .includes(String(value).toLowerCase()),
    render: (text) =>
      searchState.column === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchState.text]}
          autoEscape
          textToHighlight={String(text)}
        />
      ) : (
        text
      ),
  });

  return { getColumnSearchProps };
};
