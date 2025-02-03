import { Button, Form, Input, Space } from "antd";

const SearchBox = ({ handleSearch, placeholderText }) => {
  return (
    <Form layout="vertical" onFinish={handleSearch} autoComplete="off">
      <Form.Item
        label="Axtarış"
        name="value"
        className="w-full"
        rules={[
          {
            required: true,
            message: "Xananı doldurun",
          },
        ]}
      >
        <Space.Compact>
          <Input placeholder={placeholderText} />
          <Button type="primary" htmlType="submit">
            Axtar
          </Button>
        </Space.Compact>
      </Form.Item>
    </Form>
  );
};

export default SearchBox;
