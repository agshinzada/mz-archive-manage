import { Button, DatePicker, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { fetchDelivery } from "../services/delivery_service";
import { useAuth } from "../context/AuthContext";
const { RangePicker } = DatePicker;

const FichePageFilter = ({ handleFilter }) => {
  const [delivery, setDelivery] = useState([]);
  const { user } = useAuth();
  async function getDelivery() {
    const data = await fetchDelivery(user.TOKEN);
    setDelivery(data);
  }
  useEffect(() => {
    getDelivery();
  }, []);
  return (
    <div className="flex gap-1">
      <Form
        layout="vertical"
        initialValues={{
          delivery: "Hamısı",
          dateParam: 1,
        }}
        onFinish={handleFilter}
        autoComplete="off"
      >
        <div className="flex gap-1">
          <Form.Item
            label="Təslimat"
            name="delivery"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Xananı doldurun",
              },
            ]}
          >
            <Select
              options={[{ CODE: "Hamısı" }, ...delivery]}
              filterOption={(input, option) =>
                (option?.CODE ?? "").toLowerCase().includes(input.toLowerCase())
              }
              fieldNames={{
                label: "CODE",
                value: "CODE",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Parametr"
            name="dateParam"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Xananı doldurun",
              },
            ]}
          >
            <Select
              options={[
                { value: 1, label: "İrsaliyə tarixi" },
                { value: 2, label: "Yükləmə tarixi" },
              ]}
              rules={[
                {
                  required: true,
                  message: "Xananı doldurun",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Tarix"
            name="date"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Xananı doldurun",
              },
            ]}
          >
            <RangePicker placeholder={["Başlanğıc", "Son"]} />
          </Form.Item>
          <Form.Item className="self-end">
            <Button type="primary" htmlType="submit">
              Axtar
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default FichePageFilter;
