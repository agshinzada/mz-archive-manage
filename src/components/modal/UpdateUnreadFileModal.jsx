import { Button, Modal, Popconfirm, Table, Tag, notification } from "antd";
import { useFiches } from "../../context/FichesContext";
import styles from "./modal.module.css";
import { DownloadOutlined } from "@ant-design/icons";
import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import Search from "antd/es/input/Search";
import {
  fetchUnlinkFichesBySearch,
  updateFicheForLinked,
} from "../../services/fiches_service";

function UpdateUnreadFileModal() {
  const { user } = useAuth();
  const {
    linkFicheToFileIsOpen,
    setLinkFicheToFileIsOpen,
    selectedFicheForLinkToFile,
  } = useFiches();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(false);

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
    {
      title: "Action",
      dataIndex: "STATUS",
      key: "STATUS",
      render: (_, record) => (
        <Popconfirm
          title="Birləşdirmə"
          description="İrsaliyə mövcud fayla birləşdirilsin?"
          onConfirm={() => linkFiche(record)}
          // onCancel={cancel}
          okText="Bəli"
          cancelText="İmtina"
        >
          <Button type="link">Birləşdir</Button>{" "}
        </Popconfirm>
      ),
    },
  ];

  const onSearch = async (e) => {
    try {
      setLoading(true);
      const data = await fetchUnlinkFichesBySearch(e, user.TOKEN);
      setDataSource(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const linkFiche = async (record) => {
    try {
      setLoading(true);
      const res = await updateFicheForLinked(
        record,
        selectedFicheForLinkToFile,
        user.TOKEN
      );
      if (res.status === 200) {
        setLoading(false);
        setLinkFicheToFileIsOpen(false);
        setDataSource([]);
        notification.success({
          placement: "topRight",
          message: "Sənəd düzəlişi",
          description: await res.text(),
        });
      } else if (res.status === 404) {
        notification.error({
          placement: "topRight",
          message: "Sənəd düzəlişi",
          description: await res.text(),
        });
      } else {
        notification.error({
          placement: "topRight",
          message: "Sənəd düzəlişi",
          description: await res.text(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="İrsaliyəni birləşdir"
      centered
      open={linkFicheToFileIsOpen}
      onOk={() => setLinkFicheToFileIsOpen(false)}
      onCancel={() => setLinkFicheToFileIsOpen(false)}
      footer={[
        <Button key="back" onClick={() => setLinkFicheToFileIsOpen(false)}>
          OK
        </Button>,
      ]}
      width={"fit-content"}
    >
      <div className={styles.container}>
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
          dataSource={dataSource}
          rowKey={(record) => record.LOGICALREF}
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </Modal>
  );
}

export default UpdateUnreadFileModal;
