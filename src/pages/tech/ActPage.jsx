import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import NewActModal from "../../components/modal/tech/NewActModal";
import { fetchActBySearch, fetchActs } from "../../services/act_service";
import { useAuth } from "../../context/AuthContext";
import dayjs from "dayjs";
import { CloudDownloadOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { saveAs } from "file-saver";
import { fetchDownloadActFiles } from "../../services/file_service";
import JSZip from "jszip";

const ActPage = () => {
  const { user } = useAuth();
  const [dataSource, setDataSource] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const getData = async () => {
    setLoading(true);
    setTimeout(async () => {
      const data = await fetchActs(user.TOKEN);
      setDataSource(data);
      setLoading(false);
    }, 500);
  };

  const handleSearch = async (e) => {
    setLoading(true);
    setTimeout(async () => {
      const data = await fetchActBySearch(e, user.TOKEN);
      setDataSource(data);
      setLoading(false);
    }, 500);
  };

  async function downloadFile(e) {
    setDownloading(true);
    const filterRecord = dataSource.filter((record) => record.CODE === e.CODE);
    const zip = new JSZip();
    for (const iterator of filterRecord) {
      const fileData = await fetchDownloadActFiles(
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

  const columns = [
    {
      title: "Nömrə",
      dataIndex: "CODE",
      key: "CODE",
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
        placeholder="Akt nömrəsi"
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
      <NewActModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ActPage;
