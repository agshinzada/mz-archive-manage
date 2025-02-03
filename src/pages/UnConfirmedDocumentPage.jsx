import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import {
  fetchUnConfirmedFiches,
  fetchUnConfirmedFichesByRange,
  fetchUnConfirmedFichesBySearch,
} from "../services/fiches_service";
import LinkFileToFicheModal from "../components/modal/LinkFileToFicheModal";
import { useAuth } from "../context/AuthContext";
import { FileExcelOutlined } from "@ant-design/icons";
import { utils, writeFile } from "xlsx";
import SearchBox from "../components/SearchBox";
import UnConfirmedDocumentPageFilter from "../components/UnConfirmedDocumentPageFilter";
import PageTitle from "../components/PageTitle";
import FicheStatisticItem from "../components/FicheStatisticItem";
const { RangePicker } = DatePicker;

function UnConfirmedDocumentPage() {
  const { user } = useAuth();
  const [dataSource, setDataSource] = useState([]);
  const [exportLoading, setExportLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const getFiches = async () => {
    setLoading(true);
    const data = await fetchUnConfirmedFiches(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  };

  const handleFilter = async (param) => {
    setLoading(true);
    const data = await fetchUnConfirmedFichesByRange(
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

  const onSearch = async (param) => {
    const data = await fetchUnConfirmedFichesBySearch(param.value, user.TOKEN);
    setDataSource(data);
  };

  const handleExport = async () => {
    setExportLoading(true);
    const data = getExportData();
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Skan edilməyənlər");
    writeFile(workbook, "unconfirm-fiches.xlsx");
    setExportLoading(false);
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

  useEffect(() => {
    getFiches();
  }, []);

  const columns = [
    {
      title: "Nömrə",
      dataIndex: "FICHENO",
      key: "FICHENO",
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
      title: "Region",
      dataIndex: "REGION",
      key: "REGION",
      render: (_, { REGION }) => (
        <Tag color={"blue"} key={REGION}>
          {REGION}
        </Tag>
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
      <PageTitle title="Təsdiq edilməmiş sənədlər" />
      <Row gutter={24} className="w-full mb-2">
        <Col span={6}>
          <FicheStatisticItem
            value={dataSource.length}
            loading={loading}
            title={"Bu gün (BAKI)"}
          />
        </Col>
      </Row>
      <div className="flex gap-2 justify-between items-center">
        <SearchBox
          handleSearch={onSearch}
          placeholderText="İrsaliyə və ya müştəri kodu"
        />
        <UnConfirmedDocumentPageFilter handleFilter={handleFilter} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-end gap-1 items-center">
          <Button
            icon={<FileExcelOutlined />}
            onClick={handleExport}
            loading={exportLoading}
          >
            Excel
          </Button>
          <p className="font-bold">Sətr sayı: {dataSource.length}</p>
        </div>

        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ defaultPageSize: 50 }}
          rowKey={(record) => record.LOGICALREF}
          loading={loading}
        />
      </div>
      <LinkFileToFicheModal getData={getFiches} />
    </div>
  );
}

export default UnConfirmedDocumentPage;
