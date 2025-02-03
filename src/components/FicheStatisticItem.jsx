import { Card, Statistic } from "antd";

const FicheStatisticItem = ({ value, loading, title }) => {
  return (
    <Card bordered={false} size="small">
      <Statistic title={title} value={value} loading={loading} />
    </Card>
  );
};

export default FicheStatisticItem;
