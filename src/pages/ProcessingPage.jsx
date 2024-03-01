import { Button, Table, Tag } from "antd";
import { fetchFiches } from "../services/fiches_service";
import { useEffect, useState } from "react";
import { useFiches } from "../context/FichesContext";
import { useAuth } from "../context/AuthContext";

function ProcessingPage() {
  const { user } = useAuth();
  const { fiches, setFiches } = useFiches();
  const [loading, setLoading] = useState(false);

  const getFiches = async () => {
    setLoading(true);
    const data = await fetchFiches(user.TOKEN);
    setTimeout(() => {
      setFiches(data);
      setLoading(false);
    }, 1000);
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
          {TRCODE === null ? (
            <Tag color={"red"} key={TRCODE}>
              {"OXUNMADI"}
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
      <Button
        type="primary"
        size="large"
        className="w-fit self-end"
        loading={loading}
        onClick={getFiches}
      >
        Yenilə
      </Button>
      <div className="flex flex-col gap-1">
        <p className="label_process">SKAN EDİLƏNLƏR</p>
        <div className="flex flex-col gap-1">
          <Table
            columns={columns}
            dataSource={fiches}
            pagination={false}
            rowKey={(record) => record.ID}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default ProcessingPage;
