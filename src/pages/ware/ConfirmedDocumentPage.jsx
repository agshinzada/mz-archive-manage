import {
  Button,
  Collapse,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import {
  fetchUnlinkFiches,
  fetchUnlinkFichesByRange,
  fetchUnlinkFichesBySearch,
  fetchUnlinkFichesCount,
} from "../../services/fiches_service";
import { useFiches } from "../../context/FichesContext";
import LinkFileToFicheModal from "../../components/modal/LinkFileToFicheModal";
import { useAuth } from "../../context/AuthContext";
import { FileExcelOutlined } from "@ant-design/icons";
import { utils, writeFile } from "xlsx";
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
    setFichesCount(...data);
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
      <Collapse
        size="small"
        items={[
          {
            key: 1,
            label: `Ümumi sənəd sayı (BAKI): ${fichesCount.TOTAL}`,
            // children: (
            //   <div className="flex flex-col gap-1 font-bold">
            //     <p>Regular (TT): 300</p>
            //     <p>Horeca (HR): 50</p>
            //     <p>Şəbəkə (KA): 100</p>
            //   </div>
            // ),
          },
          {
            key: 2,
            label: `Bu gün (BAKI): ${fichesCount.TODAY}`,
            // children: (
            //   <div className="flex flex-col gap-1 font-bold">
            //     <p>Regular (TT): 300</p>
            //     <p>Horeca (HR): 50</p>
            //     <p>Şəbəkə (KA): 100</p>
            //   </div>
            // ),
          },
        ]}
        style={{
          width: 500,
          marginBottom: "1rem",
          fontSize: "12px",
          backgroundColor: "transparent",
          border: "1px solid #efefef",
          fontWeight: "bold",
        }}
      />

      <div className="flex gap-2 justify-between items-center">
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
            <Space.Compact>
              <Input placeholder="İrsaliyə və ya müştəri kodu" />
              <Button type="primary" htmlType="submit">
                Axtar
              </Button>
            </Space.Compact>
          </Form.Item>
        </Form>

        <div className="flex gap-1">
          <Form
            layout="vertical"
            initialValues={{
              remember: true,
              region: 0,
            }}
            onFinish={handleFilter}
            autoComplete="off"
          >
            <div className="flex gap-1">
              <Form.Item
                label="Bölgə"
                name="region"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      value: 0,
                      label: "Bakı",
                    },
                    {
                      value: 3,
                      label: "Lənkəran",
                    },
                    {
                      value: 4,
                      label: "Bərdə",
                    },
                    {
                      value: 5,
                      label: "Göyçay",
                    },
                    {
                      value: 6,
                      label: "Xaçmaz",
                    },
                    {
                      value: 7,
                      label: "Şəki",
                    },
                    {
                      value: 9,
                      label: "Gəncə",
                    },
                    {
                      value: 11,
                      label: "Şirvan",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Tarix"
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

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <p className="label_process">TƏSLİMAT TƏSDİQLİ SƏNƏDLƏR</p>
          <Button
            icon={<FileExcelOutlined />}
            onClick={handleExport}
            loading={exportLoading}
          >
            Excel
          </Button>
        </div>

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
