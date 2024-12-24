import { Button, Form, Input, Space, Table, Tag } from "antd";
import { useFiches } from "../../context/FichesContext";
import {
  fetchFicheFileListByCode,
  fetchFichesBySearch,
  fetchProblemFiches,
  fetchProblemFichesBySearch,
} from "../../services/fiches_service";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import ProblemUpdateFicheModal from "../../components/modal/ProblemFicheUpdateModal";
import { fetchDownloadFiles } from "../../services/file_service";

function ProblemFichesPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    fiches,
    setFiches,
    setFicheDetailIsOpen,
    setSelectedFiche,
    setSelectedFicheFileList,
  } = useFiches();

  async function openFicheModal(record) {
    const fileList = await fetchFicheFileListByCode(
      record.FICHENO,
      record.TRCODE,
      user.TOKEN
    );
    setSelectedFicheFileList(fileList);
    setSelectedFiche(record);
    setFicheDetailIsOpen(true);
  }

  const getFiches = async () => {
    setLoading(true);
    const data = await fetchProblemFiches(user.TOKEN);
    setFiches(data);
    setLoading(false);
  };

  async function onSearch(params) {
    setLoading(true);
    const data = await fetchProblemFichesBySearch(params.value, user.TOKEN);
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
            onClick={() => openFicheModal(record)}
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
          rowKey={(record) => record.Row}
          loading={loading}
          pagination={{ pageSize: 50 }}
        />
      </div>
      <ProblemUpdateFicheModal getData={getFiches} />
    </div>
  );
}

export default ProblemFichesPage;
