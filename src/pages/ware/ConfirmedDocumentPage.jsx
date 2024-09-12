import { DatePicker, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import {
  fetchUnlinkFiches,
  fetchUnlinkFichesByRange,
  fetchUnlinkFichesBySearch,
} from "../../services/fiches_service";
import { useFiches } from "../../context/FichesContext";
import LinkFileToFicheModal from "../../components/modal/LinkFileToFicheModal";
import { useAuth } from "../../context/AuthContext";
const { RangePicker } = DatePicker;

function ConfirmedDocumentPage() {
  const { user } = useAuth();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setLinkFileIsOpen, setSelectedUnlinkFiche } = useFiches();

  const getFiches = async () => {
    setLoading(true);
    const data = await fetchUnlinkFiches(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  };

  const onSearch = async (e) => {
    const data = await fetchUnlinkFichesBySearch(e, user.TOKEN);
    setDataSource(data);
  };

  const handleRange = async (range) => {
    if (range[0] === "") {
      getFiches();
    }
    setLoading(true);
    const data = await fetchUnlinkFichesByRange({ ...range }, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  };

  const openFicheModal = async (record) => {
    setSelectedUnlinkFiche(record);
    setLinkFileIsOpen(true);
  };

  useEffect(() => {
    getFiches();
  }, []);

  const columns = [
    {
      title: "Nömrə",
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
      title: "Müştəri kodu",
      dataIndex: "CODE",
      key: "CODE",
    },
    {
      title: "Müştəri adı",
      dataIndex: "DEFINITION_",
      key: "DEFINITION_",
    },
    {
      title: "Təslimat",
      dataIndex: "TESLIMAT",
      key: "TESLIMAT",
    },
    {
      title: "Məbləğ",
      dataIndex: "NETTOTAL",
      key: "NETTOTAL",
    },
    {
      title: "Tarix",
      dataIndex: "DATE_",
      key: "DATE_",
      render: (_, { DATE_ }) => (
        <>
          <span>{new Date(DATE_).toLocaleDateString("az")}</span>
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-between items-center">
        <div>
          <label>Axtarış</label>
          <Search
            placeholder="İrsaliyə nömrəsi"
            onSearch={onSearch}
            style={{
              marginTop: "5px",
            }}
            size="middle"
          />
        </div>

        <div className="flex gap-1">
          <RangePicker
            placeholder={["Başlanğıc", "Son"]}
            onChange={(_, info) => handleRange(info)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="label_process">TƏSDİQ EDİLMİŞ SƏNƏDLƏR</p>
        <div className="flex flex-col gap-1">
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 100 }}
            rowKey={(record) => record.LOGICALREF}
            loading={loading}
          />
        </div>
      </div>
      <LinkFileToFicheModal getData={getFiches} />
    </div>
  );
}

export default ConfirmedDocumentPage;
