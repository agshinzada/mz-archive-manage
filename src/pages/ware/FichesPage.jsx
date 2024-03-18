import { Button, Popconfirm, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import { useFiches } from "../../context/FichesContext";
import {
  fetchFicheDetailByCode,
  fetchFicheFileListByCode,
  fetchFiches,
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
  const [loading, setLoading] = useState();

  async function openFicheModal(record) {
    const data = await fetchFicheDetailByCode(
      record.FICHENO,
      record.TRCODE,
      user.TOKEN
    );
    const fileList = await fetchFicheFileListByCode(
      record.FICHENO,
      record.TRCODE,
      user.TOKEN
    );
    setSelectedFicheFileList(fileList);
    setSelectedFiche(...data);
    setFicheDetailIsOpen(true);
  }

  async function onSearch(params) {
    const data = await fetchFichesBySearch(params, user.TOKEN);
    setFiches(data);
  }

  async function downloadFile(param) {
    const data = await fetchDownloadFiles(param, user.TOKEN);
    const blob = new Blob([data], { type: "application/octet-stream" });
    saveAs(blob, param);
  }

  async function deleteFiche(param) {
    const res = await fetchRemoveFile(param, user.TOKEN);
    getFiches();
  }

  async function openLinkedModal(record) {
    setSelectedFicheForLinkToFile(record);
    setLinkFicheToFileIsOpen(true);
  }

  const getFiches = async () => {
    setLoading(true);
    const data = await fetchFiches(user.TOKEN);
    setTimeout(() => {
      setFiches(data);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getFiches();
  }, []);

  useEffect(() => {
    if (!linkFicheToFileIsOpen) {
      getFiches();
    }
  }, [linkFicheToFileIsOpen]);

  const columns = [
    {
      title: "NÖMRƏ",
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
      title: "SƏNƏD NÖVÜ",
      dataIndex: "TRCODE",
      key: "TRCODE",
      render: (_, { TRCODE }) => (
        <>
          {TRCODE !== 0 ? (
            <Tag color={"blue"} key={TRCODE}>
              {"SATIŞ"}
            </Tag>
          ) : (
            <Tag color={"blue"} key={TRCODE}>
              0
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "FAYL ADI",
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
      title: "TARİX",
      dataIndex: "INSERT_DATE",
      key: "INSERT_DATE",
      render: (_, { INSERT_DATE }) => (
        <>{new Date(INSERT_DATE).toLocaleDateString("az")}</>
      ),
      sorter: (a, b) => a.INSERT_DATE - b.INSERT_DATE,
    },
    {
      title: "STATUS",
      dataIndex: "STATUS",
      key: "STATUS",
      render: (_, { STATUS }) => (
        <>
          {STATUS === 0 ? (
            <Tag color={"blue"} key={STATUS}>
              {"AKTIV"}
            </Tag>
          ) : (
            <Tag color={"red"} key={STATUS}>
              {"PASSIV"}
            </Tag>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <div>
        <label>Axtarış</label>

        <Search
          placeholder="İrsaliyə nömrəsi"
          onSearch={onSearch}
          style={{
            width: "100%",
            marginTop: "5px",
          }}
          size="large"
        />

        <Table
          columns={columns}
          dataSource={fiches}
          rowKey={(record) => record.ID}
          loading={loading}
        />
      </div>
      <FicheDetailModal />
      <UpdateUnreadFileModal />
    </div>
  );
}

export default FichesPage;
