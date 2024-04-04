import { CloudDownloadOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import Search from "antd/es/input/Search";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import NewHandoverModal from "../../components/modal/tech/NewHandoverModal";
import {
  fetchHandoverBySearch,
  fetchHandovers,
} from "../../services/handover_service";
import { useAuth } from "../../context/AuthContext";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { fetchDownloadHandoverFiles } from "../../services/file_service";

const HandoverPage = () => {
  const { user } = useAuth();
  const [dataSource, setDataSource] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const columns = [
    {
      title: "Ad",
      dataIndex: "NAME",
      key: "NAME",
    },
    {
      title: "Soyad",
      dataIndex: "SURNAME",
      key: "SURNAME",
    },
    {
      title: "Tip",
      dataIndex: "TYPE",
      key: "TYPE",
    },
    {
      title: "Fayl adı",
      dataIndex: "FILE_NAME",
      key: "FILE_NAME",
    },
    {
      title: "Tarix",
      dataIndex: "DATE",
      key: "DATE",
      render: (_, { DATE }) => <a>{dayjs(DATE).format("YYYY-MM-DD")}</a>,
    },
    {
      title: "Action",
      dataIndex: "STATUS",
      key: "STATUS",
      render: (_, record) => (
        <Button
          type="link"
          icon={<CloudDownloadOutlined />}
          onClick={() => downloadFile(record)}
          loading={downloading}
        >
          Yüklə
        </Button>
      ),
    },
  ];

  const getData = async () => {
    setLoading(true);
    setTimeout(async () => {
      const data = await fetchHandovers(user.TOKEN);
      setDataSource(data);
      setLoading(false);
    }, 500);
  };

  const handleSearch = async (e) => {
    setLoading(true);
    setTimeout(async () => {
      const data = await fetchHandoverBySearch(e, user.TOKEN);
      setDataSource(data);
      setLoading(false);
    }, 500);
  };

  async function downloadFile(e) {
    setDownloading(true);
    const filterRecord = dataSource.filter((record) => record.NAME === e.NAME);
    const zip = new JSZip();
    for (const iterator of filterRecord) {
      const fileData = await fetchDownloadHandoverFiles(
        iterator.FILE_NAME,
        user.TOKEN
      );
      if (fileData) {
        zip.file(iterator.FILE_NAME, fileData);
      }
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, e.CODE);
    setDownloading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <Button type="primary" onClick={() => setIsOpen(true)}>
          Yeni
        </Button>
        <Button type="primary" onClick={() => getData()} loading={loading}>
          Yenilə
        </Button>
      </div>
      <Search
        placeholder="Ad və ya Soyad"
        onSearch={handleSearch}
        style={{
          width: "100%",
          marginBottom: "10px",
        }}
        size="large"
      />
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record.ID}
        pagination={false}
        loading={loading}
      />
      <NewHandoverModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default HandoverPage;
