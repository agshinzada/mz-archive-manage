import { Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import { useFiches } from "../context/FichesContext";
import {
  fetchFicheDetailByCode,
  fetchFicheFileListByCode,
  fetchFichesBySearch,
} from "../services/fiches_service";
import FicheDetailModal from "../components/modal/FIcheDetailModal";
import { useAuth } from "../context/AuthContext";

function FichesPage() {
  const { user } = useAuth();
  const {
    fiches,
    setFiches,
    setFicheDetailIsOpen,
    setSelectedFiche,
    setSelectedFicheFileList,
  } = useFiches();

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
  const columns = [
    {
      title: "NÖMRƏ",
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
            <Tag color={"blue"} key={TRCODE}>
              {"QAYTARMA"}
            </Tag>
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
          dataSource={fiches.filter(
            (record) => record.READ_STATUS === 1 && record.STATUS === 0
          )}
          rowKey={(record) => record.ID}
        />
      </div>
      <FicheDetailModal />
    </div>
  );
}

export default FichesPage;
