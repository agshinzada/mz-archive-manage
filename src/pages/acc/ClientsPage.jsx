import { Badge, Button, Table } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useRef, useState } from "react";
import {
  fetchClientBySearch,
  fetchClientFilesByCode,
  fetchClients,
} from "../../services/client_service";
import { useAuth } from "../../context/AuthContext";
import { CloudDownloadOutlined } from "@ant-design/icons";
import ClientDetailModal from "../../components/modal/acc/ClientDetailModal";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { fetchDownloadContractFile } from "../../services/file_service";

function ClientsPage() {
  const [dataSource, setDataSource] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [noneContractStatus, setNoneContractStatus] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { user } = useAuth();
  const filterRef = useRef();

  const columns = [
    {
      title: "Müştəri adı",
      dataIndex: "DEFINITION_",
      key: "DEFINITION_",
    },
    {
      title: "Müştəri kodu",
      dataIndex: "CODE",
      key: "CODE",
      render: (_, record) => (
        <>
          <span
            style={{ color: "blue", cursor: "pointer" }}
            key={record.CODE}
            onClick={() => handleModal(record)}
          >
            {record.CODE}
          </span>
        </>
      ),
    },
    {
      title: "VÖEN",
      dataIndex: "TAXNR",
      key: "TAXNR",
    },
    {
      title: "Bölgə",
      dataIndex: "CITY",
      key: "CITY",
    },
    {
      title: "Ünvan",
      dataIndex: "ADDR1",
      key: "ADDR1",
    },
    {
      title: "Müqavilə",
      dataIndex: "",
      key: "",
      render: (_, record) => (
        <>
          {noneContractStatus ? (
            ""
          ) : (
            <Button
              type="link"
              icon={<CloudDownloadOutlined />}
              onClick={() => downloadFile(record.CODE)}
              loading={downloading}
            >
              Yüklə
            </Button>
          )}
        </>
      ),
    },
  ];

  async function downloadFile(code) {
    setDownloading(true);
    const list = await fetchClientFilesByCode(code, user.TOKEN);
    const zip = new JSZip();
    for (const iterator of list) {
      const fileData = await fetchDownloadContractFile(
        iterator.FILENAME,
        user.TOKEN
      );
      if (fileData) {
        zip.file(iterator.FILENAME, fileData);
      }
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, code);
    setDownloading(false);
  }

  const getClients = async (status = false) => {
    setLoading(true);
    const data = await fetchClients(status, user.TOKEN);
    setTimeout(() => {
      setDataSource(data);
      setLoading(false);
    }, 500);
  };

  const handleClick = async () => {
    if (noneContractStatus) {
      getClients(false);
      setNoneContractStatus(false);
      filterRef.current.classList.remove("bg-gray");
    } else {
      filterRef.current.classList.add("bg-gray");
      setNoneContractStatus(true);
      getClients(true);
    }
  };

  const handleSearch = async (value) => {
    setLoading(true);
    const data = await fetchClientBySearch(
      value,
      noneContractStatus,
      user.TOKEN
    );

    setTimeout(() => {
      setDataSource(data);
      setLoading(false);
    }, 500);
  };

  async function handleModal(record) {
    const list = await fetchClientFilesByCode(record.CODE, user.TOKEN);
    setFileList(list);
    setSelectedClient(record);
    setIsOpen(true);
  }

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      getClients(true);
    }
  }, [isOpen]);

  return (
    <div>
      <div
        style={{
          float: "right",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <Badge
          count={noneContractStatus && dataSource.length}
          overflowCount={100}
        >
          <div
            style={{
              border: "1px solid #c6c1c1",
              borderRadius: "5px",
              padding: "0.5rem 1rem",
              marginBottom: "0.5rem",
            }}
            ref={filterRef}
          >
            Müqaviləsiz
          </div>
        </Badge>
      </div>

      <Search
        placeholder="İrsaliyə nömrəsi"
        onSearch={handleSearch}
        style={{
          width: "100%",
          marginTop: "5px",
        }}
        size="large"
      />

      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record.LOGICALREF}
        loading={loading}
        pagination={false}
      />
      <ClientDetailModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedClient={selectedClient}
        clientFiles={fileList}
      />
    </div>
  );
}

export default ClientsPage;
