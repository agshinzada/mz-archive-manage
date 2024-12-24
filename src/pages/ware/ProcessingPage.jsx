import { Avatar, Badge, Button, Card, DatePicker, Table, Tag } from "antd";
import {
  fetchFiches,
  fetchProcessingFiches,
  fetchProcessingFichesByRange,
} from "../../services/fiches_service";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

function ProcessingPage() {
  const { user } = useAuth();
  const [fiches, setFiches] = useState([]);
  const [loading, setLoading] = useState(false);
  let successProcess = fiches?.filter(
    (record) => record.READ_STATUS === 1
  ).length;
  let unreadProcess = fiches?.filter(
    (record) => record.READ_STATUS === 0
  ).length;

  const getFiches = async () => {
    setLoading(true);
    const data = await fetchProcessingFiches(user.TOKEN);
    setFiches(data);
    setLoading(false);
  };

  const handleRange = async (range) => {
    if (range[0] === "") {
      getFiches();
    }
    setLoading(true);
    const data = await fetchProcessingFichesByRange({ ...range }, user.TOKEN);
    setFiches(data);
    setLoading(false);
  };

  useEffect(() => {
    getFiches();
  }, []);

  const columns = [
    {
      title: "NÖMRƏ",
      dataIndex: "FICHENO",
      key: "FICHENO",
      render: (_, { FICHENO }) => (
        <>
          {FICHENO === null ? (
            <Tag color={"red"} key={FICHENO}>
              {"OXUNMADI"}
            </Tag>
          ) : (
            <span>{FICHENO}</span>
          )}
        </>
      ),
    },
    {
      title: "SƏNƏD NÖVÜ",
      dataIndex: "TRCODE",
      key: "TRCODE",
      render: (_, { TRCODE }) => (
        <>
          {TRCODE === 8 ? (
            <Tag color={"blue"} key={TRCODE}>
              {"SATIŞ"}
            </Tag>
          ) : (
            ""
          )}
          {TRCODE === 3 ? (
            <Tag color={"blue"} key={TRCODE}>
              {"QAYTARMA"}
            </Tag>
          ) : (
            ""
          )}
          {TRCODE === 0 ? (
            <Tag color={"red"} key={TRCODE}>
              0
            </Tag>
          ) : (
            ""
          )}
        </>
      ),
    },
    {
      title: "FAYL ADI",
      dataIndex: "FILENAME",
      key: "FILENAME",
    },
    {
      title: "STATUS",
      dataIndex: "READ_STATUS",
      key: "READ_STATUS",
      render: (_, { READ_STATUS }) => (
        <>
          {READ_STATUS === 0 ? (
            <Tag color={"red"} key={READ_STATUS}>
              {"UĞURSUZ ƏMƏLİYYAT"}
            </Tag>
          ) : (
            <Tag color={"blue"} key={READ_STATUS}>
              {"UĞURLU"}
            </Tag>
          )}
        </>
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-between">
        <div className="flex gap-1">
          <RangePicker
            placeholder={["Başlanğıc", "Son"]}
            onChange={(_, info) => handleRange(info)}
            style={{
              height: "fit-content",
            }}
          />
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex gap-1">
            <div
              style={{
                width: 300,
                height: 45,
                border: "1px solid #efefef",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p className="font-bold flex items-center gap-1">
                Yüklənmiş sənəd sayı:
                <span className="">{successProcess}</span>
              </p>
            </div>

            <div
              style={{
                width: 300,
                height: 45,
                border: "1px solid #efefef",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "red",
              }}
            >
              <p className="font-bold flex items-center gap-1">
                Oxunmayan sənəd sayı:
                <span className="">{unreadProcess}</span>
              </p>
            </div>
          </div>

          <Button
            type="primary"
            size="middle"
            className="w-fit"
            loading={loading}
            onClick={getFiches}
          >
            Yenilə
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="label_process">SKAN EDİLƏNLƏR</p>
        <div className="flex flex-col gap-1">
          <Table
            columns={columns}
            dataSource={fiches}
            pagination={{ pageSize: 100 }}
            rowKey={(record) => record.ID}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default ProcessingPage;
