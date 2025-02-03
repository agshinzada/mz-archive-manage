import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import {
  fetchUnlinkFiches,
  fetchUnlinkFichesByRange,
  fetchUnlinkFichesBySearch,
  fetchUnlinkFichesCount,
} from "../services/fiches_service";
import { useFiches } from "../context/FichesContext";
import LinkFileToFicheModal from "../components/modal/LinkFileToFicheModal";
import { useAuth } from "../context/AuthContext";
import { FileExcelOutlined } from "@ant-design/icons";
import { utils, writeFile } from "xlsx";
import FicheStatisticItem from "../components/FicheStatisticItem";
import SearchBox from "../components/SearchBox";
import ConfirmedDocumentPageFilter from "../components/ConfirmedDocumentPageFilter";
import PageTitle from "../components/PageTitle";
const { RangePicker } = DatePicker;

function ConfirmedDocumentPage() {
  const { user } = useAuth();
  const [dataSource, setDataSource] = useState([]);
  const [fichesCount, setFichesCount] = useState({ TOTAL: 0, TODAY: 0 });
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const { setLinkFileIsOpen, setSelectedUnlinkFiche } = useFiches();

  const getFiches = async () => {
    setLoading(true);
    const data = await fetchUnlinkFiches(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  };

  const onSearch = async (param) => {
    const data = await fetchUnlinkFichesBySearch(param.value, user.TOKEN);
    setDataSource(data);
  };

  async function getFichesCount() {
    const data = await fetchUnlinkFichesCount(user.TOKEN);
    setFichesCount(data);
  }

  const handleFilter = async (param) => {
    setLoading(true);
    const data = await fetchUnlinkFichesByRange(
      {
        from: new Date(param.date[0].$d).toLocaleDateString("az"),
        to: new Date(param.date[1].$d).toLocaleDateString("az"),
        region: param.region,
      },
      user.TOKEN
    );
    setDataSource(data);
    setLoading(false);
  };

  const openFicheModal = async (record) => {
    setSelectedUnlinkFiche(record);
    setLinkFileIsOpen(true);
  };

  const getExportData = () => {
    return dataSource.map((fiche) => ({
      "MÜŞTƏRİ KODU": fiche.CODE, // Customize column name
      AÇIQLAMA: fiche.DEFINITION_,
      "SƏNƏD NÖMRƏSİ": fiche.FICHENO,
      TƏSLİMAT: fiche.TESLIMAT,
      NET: fiche.NETTOTAL,
      TARİX: new Date(fiche.DATE_).toLocaleDateString("az"),
    }));
  };

  const handleExport = async () => {
    setExportLoading(true);
    const data = getExportData();
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Skan edilməyənlər");
    writeFile(workbook, "unlink-fiches.xlsx");
    setExportLoading(false);
  };

  useEffect(() => {
    getFiches();
    getFichesCount();
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
      title: "Bölgə",
      dataIndex: "REGION",
      key: "REGION",
      render: (_, { REGION }) => (
        <>
          <Tag color={"blue"} key={REGION}>
            {REGION}
          </Tag>
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
    <div className="flex flex-col">
      <PageTitle title="Təsdiqlənmiş sənədlər" />
      <Row gutter={24} className="w-full mb-2">
        <Col span={6}>
          <FicheStatisticItem
            value={fichesCount.TODAY}
            loading={loading}
            title={"Bu gün (BAKI)"}
          />
        </Col>
        <Col span={6}>
          <FicheStatisticItem
            value={fichesCount.TOTAL}
            loading={loading}
            title={"Ümumi (BAKI)"}
          />
        </Col>
      </Row>
      <div className="flex gap-2 justify-between items-center">
        <SearchBox
          handleSearch={onSearch}
          placeholderText={"İrsaliyə və ya Müştəri kodu"}
        />
        <ConfirmedDocumentPageFilter handleFilter={handleFilter} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-end items-center gap-1">
          <Button
            icon={<FileExcelOutlined />}
            onClick={handleExport}
            loading={exportLoading}
          >
            Excel
          </Button>
          <p className="font-bold">Sətr sayı: {dataSource.length}</p>
        </div>
        <div className="flex flex-col gap-1">
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{ defaultPageSize: 50 }}
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
