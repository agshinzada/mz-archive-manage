import { Button, DatePicker, Form, Select, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import {
  fetchUnConfirmedFiches,
  fetchUnConfirmedFichesByRange,
  fetchUnConfirmedFichesBySearch,
} from "../../services/fiches_service";
import LinkFileToFicheModal from "../../components/modal/LinkFileToFicheModal";
import { useAuth } from "../../context/AuthContext";
import { FileExcelOutlined } from "@ant-design/icons";
import { utils, writeFile } from "xlsx";
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
            <Search
              placeholder="İrsaliyə nömrəsi və ya müştəri kodu"
              size="middle"
            />
          </Form.Item>
        </Form>

        <div className="flex gap-1">
          <Form
            layout="vertical"
            initialValues={{
              region: 0,
            }}
            onFinish={handleFilter}
            autoComplete="off"
          >
            <div className="flex gap-1">
              <Form.Item
                label="Region"
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
                label="İrsaliyə tarixi"
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
        <div className="flex justify-between">
          <p className="label_process">TƏSDİQSİZ SƏNƏDLƏR</p>
          <Button
            icon={<FileExcelOutlined />}
            onClick={handleExport}
            loading={exportLoading}
          >
            Excel
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 100 }}
          rowKey={(record) => record.LOGICALREF}
          loading={loading}
        />
      </div>
      <LinkFileToFicheModal getData={getFiches} />
    </div>
  );
}

export default UnConfirmedDocumentPage;
