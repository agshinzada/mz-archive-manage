import { Card, Col, Row, Statistic } from "antd";
import FicheStatisticItem from "./FicheStatisticItem";

const FicheStatistics = ({ data, loading }) => {
  return (
    <Row gutter={24} className="w-full mb-2">
      <Col span={6}>
        <FicheStatisticItem
          value={data?.TODAY}
          loading={loading}
          title={"Bu gün"}
        />
      </Col>
      <Col span={6}>
        <FicheStatisticItem
          value={data?.MONTH}
          loading={loading}
          title={"Bu ay"}
        />
      </Col>
      <Col span={6}>
        <FicheStatisticItem
          value={data?.YEAR}
          loading={loading}
          title={"Bu il"}
        />
      </Col>
      <Col span={6}>
        <FicheStatisticItem
          value={data?.TOTAL}
          loading={loading}
          title={"Ümumi"}
        />
      </Col>
    </Row>
  );
};

export default FicheStatistics;
