import { Modal, Form, Input, InputNumber, DatePicker, message } from "antd";
import { addReport } from "../../Helpers/reportsSlice";
import { useAppDispatch } from "../../Helpers/hooks";
import { useState } from "react";

interface Props {
  wellId: string;
  open: boolean;
  onClose: () => void;
}

export const AddReportModal: React.FC<Props> = ({ wellId, open, onClose }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      await dispatch(
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

      message.success("Отчёт успешно добавлен!");
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Ошибка при добавлении отчёта:", error);
      message.error("Не удалось добавить отчёт. Пожалуйста, попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Добавить отчет"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={loading}
      okText="Добавить"
      cancelText="Отмена"
    >
      <Form layout="vertical" form={form}>
        <Form.Item 
          name="date" 
          label="Дата" 
          rules={[{ required: true, message: 'Пожалуйста, укажите дату' }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item 
          name="engineer" 
          label="Инженер" 
          rules={[{ required: true, message: 'Пожалуйста, укажите инженера' }]}
        >
          <Input placeholder="ФИО инженера" />
        </Form.Item>
        <Form.Item 
          name="depth" 
          label="Глубина бурения (м)" 
          rules={[
            { required: true, message: 'Пожалуйста, укажите глубину' },
            { type: 'number', min: 0, message: 'Глубина не может быть отрицательной' }
          ]}
        >
          <InputNumber min={0} style={{ width: '100%' }} placeholder="В метрах" />
        </Form.Item>
        <Form.Item name="issues" label="Проблемы">
          <Input.TextArea rows={4} placeholder="Опишите обнаруженные проблемы" />
        </Form.Item>
      </Form>
    </Modal>
  );
};