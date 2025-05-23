import { Modal, Form, Input, InputNumber, DatePicker } from "antd";
import { addReport } from "@entities/report/reportsSlice";
import { useAppDispatch } from "./hooks";

interface Props {
  wellId: string;
  open: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<Props> = ({ wellId, open, onClose }) => {
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
    <Modal
      title="Добавить отчет"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="date"
          label="Дата"
          rules={[
            { required: true, message: "Пожалуйста, укажите дату" },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" placeholder="ГГГГ-ММ-ДД" />
        </Form.Item>
        <Form.Item name="engineer" label="Инженер" rules={[{ required: true, message: "Пожалуйста, укажите ФИО инженера"  }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="depth"
          label="Глубина бурения (м)"
          rules={[{ required: true, message: "Пожалуйста, укажите глубину бурения"  }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="issues" label="Проблемы">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
