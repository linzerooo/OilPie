// components/AddReportModal.tsx
import { Modal, Form, Input, InputNumber, DatePicker } from "antd";
import { addReport } from "../../Helpers/reportsSlice";
import { useAppDispatch } from "../../Helpers/hooks";

interface Props {
  wellId: string;
  open: boolean;
  onClose: () => void;
}

export const AddReportModal: React.FC<Props> = ({ wellId, open, onClose }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      dispatch(
        addReport({
          wellId,
          report: {
            date: values.date.format("YYYY-MM-DD"),
            engineer: values.engineer,
            depth: values.depth,
            issues: values.issues || "",
          },
        })
      );
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal title="Добавить отчет" open={open} onOk={handleOk} onCancel={onClose}>
      <Form layout="vertical" form={form}>
        <Form.Item name="date" label="Дата" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="engineer" label="Инженер" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="depth" label="Глубина бурения (м)" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="issues" label="Проблемы">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
