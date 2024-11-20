import { Button, DatePicker, Form, Popconfirm, Select, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import { useFiches } from "../../context/FichesContext";
import {
  fetchFicheFileListByCode,
  fetchFiches,
  fetchFichesByRange,
  fetchFichesBySearch,
} from "../../services/fiches_service";
import FicheDetailModal from "../../components/modal/FIcheDetailModal";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import {
  fetchDownloadFiles,
  fetchRemoveFile,
} from "../../services/file_service";
import { saveAs } from "file-saver";
import UpdateUnreadFileModal from "../../components/modal/UpdateUnreadFileModal";
import { fetchDelivery } from "../../services/delivery_service";
const { RangePicker } = DatePicker;

function FichesPage() {
  const { user } = useAuth();
  const {
    fiches,
    setFiches,
    setFicheDetailIsOpen,
    setSelectedFiche,
    setSelectedFicheFileList,
    setLinkFicheToFileIsOpen,
    setSelectedFicheForLinkToFile,
    linkFicheToFileIsOpen,
  } = useFiches();
  const [loading, setLoading] = useState(false);
  const [delivery, setDelivery] = useState([]);

  const getFiches = async () => {
    setLoading(true);
    const data = await fetchFiches(user.TOKEN);
    setFiches(data);
    setLoading(false);
  };

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

  async function onSearch(params) {
    const data = await fetchFichesBySearch(params.value, user.TOKEN);
    setFiches(data);
  }

  async function downloadFile(param) {
    const data = await fetchDownloadFiles(param, user.TOKEN);
    const blob = new Blob([data], { type: "application/octet-stream" });
    saveAs(blob, param);
  }

  async function deleteFiche(param) {
    await fetchRemoveFile(param, user.TOKEN);
    getFiches();
  }

  const handleFilter = async (param) => {
    setLoading(true);
    const data = await fetchFichesByRange(
      {
        from: new Date(param.date[0].$d).toLocaleDateString("az"),
        to: new Date(param.date[1].$d).toLocaleDateString("az"),
        delivery: param.delivery,
      },
      user.TOKEN
    );
    setFiches(data);
    setLoading(false);
  };

  function openLinkedModal(record) {
    setSelectedFicheForLinkToFile(record);
    setLinkFicheToFileIsOpen(true);
  }
  async function getDelivery() {
    const data = await fetchDelivery(user.TOKEN);
    setDelivery(data);
  }

  useEffect(() => {
    getFiches();
    getDelivery();
  }, []);

  useEffect(() => {
    if (!linkFicheToFileIsOpen) {
      getFiches();
    }
  }, [linkFicheToFileIsOpen]);

  const columns = [
    {
      title: "Müştəri Kodu",
      dataIndex: "CODE",
      key: "CODE",
    },
    {
      title: "Sənəd nömrəsi",
      dataIndex: "FICHENO",
      key: "FICHENO",
      render: (_, record) => (
        <>
          {record.TRCODE === 0 ? (
            <>
              <span key={record.FICHENO}>{record.FICHENO}</span>
              <Button
                size="small"
                type="primary"
                className="ml-1"
                onClick={() => openLinkedModal(record)}
              >
                Birləşdir
              </Button>
              <Popconfirm
                title="Ləğv edilmə"
                description="Mövcud fayl ləğv edilsin?"
                onConfirm={() => deleteFiche(record)}
                okText="Bəli"
                cancelText="İmtina"
              >
                <Button size="small" type="primary" className="ml-1" danger>
                  Ləğv et
                </Button>
              </Popconfirm>
            </>
          ) : (
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => openFicheModal(record)}
              key={record.FICHENO}
            >
              {record.FICHENO}
            </span>
          )}
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
      render: (_, record) => (
        <>
          {record.FILENAME}
          {record.TRCODE === 0 ? (
            <Button
              size="small"
              type="primary"
              className="ml-1"
              onClick={() => downloadFile(record.FILENAME)}
            >
              Yüklə
            </Button>
          ) : (
            ""
          )}
        </>
      ),
    },
    {
      title: "Təslimat",
      dataIndex: "TESLIMAT",
      key: "TESLIMAT",
    },
    {
      title: "İrsaliyə tarixi",
      dataIndex: "FICHE_DATE",
      key: "FICHE_DATE",
      render: (_, { FICHE_DATE }) => (
        <>{new Date(FICHE_DATE).toLocaleDateString("az")}</>
      ),
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
              <Search
                placeholder="İrsaliyə nömrəsi və ya müştəri kodu"
                size="middle"
              />
            </Form.Item>
          </Form>
          <div className="flex gap-1">
            <Form
              layout="vertical"
              initialValues={{
                delivery: "2001",
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
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Select
                    options={delivery}
                    filterOption={(input, option) =>
                      (option?.CODE ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    fieldNames={{
                      label: "CODE",
                      value: "CODE",
                    }}
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
        </div>

        <Table
          columns={columns}
          dataSource={fiches}
          rowKey={(record) => record.Row}
          loading={loading}
          pagination={{ pageSize: 50 }}
        />
      </div>
      <FicheDetailModal />
      <UpdateUnreadFileModal />
    </div>
  );
}

export default FichesPage;
