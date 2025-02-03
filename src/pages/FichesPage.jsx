import { Button, Popconfirm, Table, Tag } from "antd";
import { useFiches } from "../context/FichesContext";
import {
  fetchFicheFileListByCode,
  fetchFiches,
  fetchFichesByRange,
  fetchFichesBySearch,
  fetchFichesCount,
  fetchFichesCountDetail,
  fetchUnreadFiches,
} from "../services/fiches_service";
import FicheDetailModal from "../components/modal/FIcheDetailModal";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { fetchDownloadFiles, fetchRemoveFile } from "../services/file_service";
import UpdateUnreadFileModal from "../components/modal/UpdateUnreadFileModal";
import {
  ExclamationCircleOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import FicheStatistics from "../components/FicheStatistics";
import SearchBox from "../components/SearchBox";
import FichePageFilter from "../components/FichePageFilter";
import PageTitle from "../components/PageTitle";

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
  } = useFiches();
  const [loading, setLoading] = useState(false);
  const [fichesCount, setFichesCount] = useState({ TOTAL: 0, TODAY: 0 });

  const getFiches = async () => {
    setLoading(true);
    let data = await fetchFiches(user.TOKEN);
    setFiches(data);
    setLoading(false);
  };

  const getUnreadFiches = async () => {
    setLoading(true);
    let data = await fetchUnreadFiches(user.TOKEN);
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
    setLoading(true);
    const data = await fetchFichesBySearch(params.value, user.TOKEN);
    setFiches(data);
    setLoading(false);
  }

  // async function downloadFile(param) {
  //   setDownloadLoading(true);
  //   const data = await fetchDownloadFiles(param, user.TOKEN);
  //   const blob = new Blob([data], { type: "application/octet-stream" });
  //   saveAs(blob, param);
  //   setDownloadLoading(false);
  // }

  const handleViewFile = async (name) => {
    setLoading(true);
    const data = await fetchDownloadFiles(name, user.TOKEN);
    if (data) {
      const blob = new Blob([data], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    }
    setLoading(false);
  };

  async function deleteFiche(param) {
    await fetchRemoveFile(param, user.TOKEN);
    getUnreadFiches();
  }

  const handleFilter = async (param) => {
    setLoading(true);
    const data = await fetchFichesByRange(
      {
        from: new Date(param.date[0].$d).toLocaleDateString("az"),
        to: new Date(param.date[1].$d).toLocaleDateString("az"),
        delivery: param.delivery,
        dateParam: param.dateParam,
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

  async function getFichesCount() {
    setLoading(true);
    const data = await fetchFichesCount(user.TOKEN);
    setFichesCount(data);
    setLoading(false);
  }

  useEffect(() => {
    getFiches();
    getFichesCount();
  }, []);

  const columns = [
    {
      title: "Müştəri Kodu",
      dataIndex: "CODE",
      key: "CODE",
    },
    {
      title: "Müştəri Adı",
      dataIndex: "DEFINITION_",
      key: "DEFINITION_",
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
                onClick={() => handleViewFile(record.FILENAME)}
                icon={<FolderViewOutlined />}
              >
                Fayla baxış
              </Button>
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
      <PageTitle title="Sənədlər" />
      <div>
        <FicheStatistics data={fichesCount} loading={loading} />
        <div className="flex justify-between items-center">
          <SearchBox
            handleSearch={onSearch}
            placeholderText={"İrsaliyə və ya müştəri kodu"}
          />
          <FichePageFilter handleFilter={handleFilter} />
        </div>
        <div className="flex justify-between mb-1 items-center">
          {user.ROLE !== "USER" ? (
            <Button
              size="medium"
              type="primary"
              onClick={getUnreadFiches}
              danger
              icon={<ExclamationCircleOutlined />}
            >
              Oxunmayanlar
            </Button>
          ) : (
            ""
          )}
          <p className="font-bold justify-self-end">
            Sətr sayı: {fiches.length}
          </p>
        </div>
        <Table
          columns={columns}
          dataSource={fiches}
          rowKey={(record) => record.ID}
          loading={loading}
          pagination={{ defaultPageSize: 50 }}
        />
      </div>
      <FicheDetailModal />
      <UpdateUnreadFileModal getFiches={getUnreadFiches} />
    </div>
  );
}

export default FichesPage;
