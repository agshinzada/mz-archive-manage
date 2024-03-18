import { Button, Modal, Upload, notification } from "antd";
import styles from "../modal.module.css";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  fetchDownloadContractFile,
  fetchUploadContractFiles,
} from "../../../services/file_service";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function ClientDetailModal({ isOpen, setIsOpen, selectedClient, clientFiles }) {
  const { user } = useAuth();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file);
    });
    formData.append("code", selectedClient.CODE);
    formData.append("token", user.TOKEN);

    setUploading(true);
    const res = await fetchUploadContractFiles(formData);
    setTimeout(async () => {
      if (res.status === 200) {
        notification.success({
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
      setFileList([]);
      setUploading(false);
      setIsOpen(false);
    }, 500);
  };

  async function downloadFile(e) {
    const data = await fetchDownloadContractFile(
      e.target.innerText,
      user.TOKEN
    );
    const blob = new Blob([data], { type: "application/octet-stream" });
    saveAs(blob, e.target.innerText);
  }

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "application/pdf"
      ) {
        const newFile = generateName(file);
        setFileList([...fileList, newFile]);
        return false;
      } else {
        notification.info({
          placement: "topRight",
          message: "Sənəd düzəlişi",
          description: "Fayl tipi düzgün deyil!",
        });
        return Upload.LIST_IGNORE;
      }
    },
    fileList,
  };

  function generateName(file) {
    try {
      const ext = file.name.substring(file.name.lastIndexOf("."));
      const fileName = `contract_${selectedClient.CODE}_${Math.random()
        .toString(36)
        .substring(2, 6)}${ext}`;
      const newFile = new File([file], fileName, { type: file.type });
      return newFile;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      title="Müştəri məlumatları"
      centered
      open={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      footer={[
        <Button
          key={"back"}
          type="primary"
          icon={<UploadOutlined />}
          size={"middle"}
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
        >
          Göndər
        </Button>,
      ]}
    >
      <div className={styles.container}>
        <p className={styles.title}>{selectedClient?.CODE}</p>
        <div className={styles.grid}>
          <p>
            <span>Müştəri adı:</span>
            <p>{selectedClient?.DEFINITION_}</p>
          </p>
          <p>
            <span>Ünvan:</span>
            <p>{selectedClient?.ADDR1}</p>
          </p>
          <p>
            <span>VÖEN:</span>
            <p>{selectedClient?.TAXNR}</p>
          </p>
          <p>
            <span>Bölgə:</span>
            <p>{selectedClient?.CITY}</p>
          </p>
          <p>
            <span>Rayon:</span>
            <p>{selectedClient?.TOWNCODE}</p>
          </p>
        </div>
        <div>
          <p className={styles.p}>Yüklənmiş fayllar</p>
          <div className={styles.grid1}>
            {clientFiles.map((item) => (
              <span
                style={{
                  color: "blue",
                  cursor: "pointer",
                }}
                key={item.ID}
                onClick={downloadFile}
              >
                {item.FILENAME}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className={styles.p}>Yeni müqavilə</p>
          <div className={styles.grid1}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>
                Faylı seç <small> (.jpg, .png və ya .pdf)</small>
              </Button>
            </Upload>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ClientDetailModal;
