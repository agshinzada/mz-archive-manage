import { Button, Modal, Popconfirm, Table, Tag } from "antd";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { fetchDownloadFiles } from "../../services/file_service";
import {
  fetchUpdateFichePageStatus,
  fetchUpdateFicheStatus,
} from "../../services/fiches_service";

function DublicateFicheDetailModal({ isOpen, setIsOpen, fiches, getData }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleViewFile = async (name) => {
    setLoading(true);
    const data = await fetchDownloadFiles(name, user.TOKEN);
    if (data) {
      const blob = new Blob([data], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    }
    setLoading(false);
  };

  async function handleStatus(params) {
    setLoading(true);
    await fetchUpdateFicheStatus(
      {
        id: params.ID,
        status: 1,
      },
      user.TOKEN
    );
    getData();
    setLoading(false);
  }

  async function handlePageStatus(params) {
    setLoading(true);
    const ficheIdArr = params.map((item) => item.ID);
    await fetchUpdateFichePageStatus(ficheIdArr, user.TOKEN);
    getData();
    setLoading(false);
    setIsOpen(false);
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Sənəd nömrəsi",
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
            <Tag color={"green"} key={TRCODE}>
              {"QAYTARMA"}
            </Tag>
          ) : (
            ""
          )}
          {TRCODE === 0 ? (
            <Tag color={"red"} key={TRCODE}>
              0
            </Tag>
          ) : (
            ""
          )}
        </>
      ),
    },
    {
      title: "Fayl adı",
      dataIndex: "FILENAME",
      key: "FILENAME",
      render: (_, { FILENAME }) => (
        <div className="flex gap-1">
          <span>{FILENAME}</span>
          <Button
            onClick={() => handleViewFile(FILENAME)}
            type="primary"
            size="small"
          >
            Baxış
          </Button>
        </div>
      ),
    },

    {
      title: "Yüklənmə tarixi",
      dataIndex: "INSERT_DATE",
      key: "INSERT_DATE",
      render: (_, { INSERT_DATE }) => (
        <>{new Date(INSERT_DATE).toLocaleDateString("az")}</>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Popconfirm
            title="Sənəd düzəlişi"
            description="Sənəd deaktiv edilsin?"
            onConfirm={() => handleStatus(record)}
            okText="Bəli"
            cancelText="İmtina"
          >
            <Button
              type="text"
              danger
              loading={loading}
              disabled={record.STATUS === 1}
            >
              Deaktiv et
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Modal
      title="Təkrarlanan irsaliyələr"
      centered
      open={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      footer={[]}
      className="w-fit"
      // style={{
      //   width: "100%",
      // }}
    >
      <div
        style={{
          marginTop: "2rem",
        }}
      >
        <Table
          columns={columns}
          dataSource={fiches}
          rowKey={(record) => record.ID}
          loading={loading}
          pagination={false}
        />
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            border: "1px solid #efefef",
            padding: "1rem",
          }}
        >
          <span>
            Əgər <strong>fayllar</strong> irsaliyənin səhifələridirsə -
          </span>
          <Popconfirm
            title="Sənəd düzəlişi"
            description="İrsaliyələrin status dəyişəcək"
            onConfirm={() => handlePageStatus(fiches)}
            okText="Bəli"
            cancelText="İmtina"
          >
            <Button
              danger
              type="primary"
              loading={loading}
              disabled={fiches?.some((item) => item.PAGE_STATUS === 1)}
            >
              Təsdiq et
            </Button>
          </Popconfirm>
        </div>
      </div>
    </Modal>
  );
}

export default DublicateFicheDetailModal;
