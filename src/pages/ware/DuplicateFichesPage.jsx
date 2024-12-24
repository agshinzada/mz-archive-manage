import { Button, Form, Input, Space, Table, Tag } from "antd";
import { useFiches } from "../../context/FichesContext";
import {
  fetchDuplicateFiches,
  fetchDuplicateFichesBySearch,
  fetchFicheByFicheNo,
} from "../../services/fiches_service";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import DublicateFicheDetailModal from "../../components/modal/DublicateFicheDetailModal";

function DuplicateFichesPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiches, setSelectedFiches] = useState([]);
  const { fiches, setFiches } = useFiches();

  async function openFicheModal(value) {
    setLoading(true);
    const data = await fetchFicheByFicheNo(value, user.TOKEN);
    setSelectedFiches(data);
    setLoading(false);
    setIsOpen(true);
  }

  const getFiches = async () => {
    setLoading(true);
    const data = await fetchDuplicateFiches(user.TOKEN);
    setFiches(data);
    setLoading(false);
  };

  async function onSearch(params) {
    setLoading(true);
    const data = await fetchDuplicateFichesBySearch(params.value, user.TOKEN);
    setFiches(data);
    setLoading(false);
  }

  useEffect(() => {
    getFiches();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Sənəd nömrəsi",
      dataIndex: "FICHENO",
      key: "FICHENO",
      render: (_, record) => (
        <>
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => openFicheModal(record.FICHENO)}
            key={record.FICHENO}
          >
            {record.FICHENO}
          </span>
        </>
      ),
    },

    {
      title: "Sənəd növü",
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
            <Tag color={"green"} key={TRCODE}>
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
      title: "Fayl adı",
      dataIndex: "FILENAME",
      key: "FILENAME",
    },

    {
      title: "Yüklənmə tarixi",
      dataIndex: "INSERT_DATE",
      key: "INSERT_DATE",
      render: (_, { INSERT_DATE }) => (
        <>{new Date(INSERT_DATE).toLocaleDateString("az")}</>
      ),
    },
  ];

  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <Form layout="vertical" onFinish={onSearch} autoComplete="off">
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
                <Input placeholder="ID və ya sənəd nömrəsi" />
                <Button type="primary" htmlType="submit">
                  Axtar
                </Button>
              </Space.Compact>
            </Form.Item>
          </Form>
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

        <Table
          columns={columns}
          dataSource={fiches}
          rowKey={(record) => record.ID}
          loading={loading}
          pagination={{ pageSize: 50 }}
        />
      </div>
      <DublicateFicheDetailModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        fiches={selectedFiches}
        getData={getFiches}
      />
    </div>
  );
}

export default DuplicateFichesPage;
