import { Button, DatePicker, Form, Select } from "antd";
const { RangePicker } = DatePicker;

const UnConfirmedDocumentPageFilter = ({ handleFilter }) => {
  return (
    <div className="flex gap-1">
      <Form
        layout="vertical"
        initialValues={{
          region: 0,
        }}
        onFinish={handleFilter}
        autoComplete="off"
      >
        <div className="flex gap-1">
          <Form.Item
            label="Region"
            name="region"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: 0,
                  label: "Bakı",
                },
                {
                  value: 3,
                  label: "Lənkəran",
                },
                {
                  value: 4,
                  label: "Bərdə",
                },
                {
                  value: 5,
                  label: "Göyçay",
                },
                {
                  value: 6,
                  label: "Xaçmaz",
                },
                {
                  value: 7,
                  label: "Şəki",
                },
                {
                  value: 9,
                  label: "Gəncə",
                },
                {
                  value: 11,
                  label: "Şirvan",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="İrsaliyə tarixi"
            name="date"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Input your value",
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

export default UnConfirmedDocumentPageFilter;
