import { Button, Modal, Upload, notification } from "antd";
import styles from "./modal.module.css";
import { UploadOutlined } from "@ant-design/icons";
import { useFiches } from "../../context/FichesContext";
import { useState } from "react";
import { fetchUploadFiles } from "../../services/file_service";
import { useAuth } from "../../context/AuthContext";

function LinkFileToFicheModal({ getData }) {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const { selectedUnlinkFiche, linkFileIsOpen, setLinkFileIsOpen } =
    useFiches();

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file);
    });
    formData.append("ficheno", selectedUnlinkFiche.FICHENO);
    formData.append("type", selectedUnlinkFiche.TRCODE);
    formData.append("token", user.TOKEN);
    formData.append("readstatus", 1);
    setUploading(true);
    const res = await fetchUploadFiles(formData);
    if (res) {
      setFileList([]);
      setLinkFileIsOpen(false);
      getData();
    }
    setUploading(false);
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      if (file.type === "image/png" || file.type === "image/jpeg") {
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
      const fileName = `${selectedUnlinkFiche.FICHENO}_${
        selectedUnlinkFiche.TRCODE
      }_M_${Math.random().toString(36).substring(2, 6)}${ext}`;
      const newFile = new File([file], fileName, { type: file.type });
      return newFile;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Modal
      title="Fayl əlavəsi"
      centered
      open={linkFileIsOpen}
      onOk={() => setLinkFileIsOpen(false)}
      onCancel={() => setLinkFileIsOpen(false)}
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
        <p className={styles.title}>{selectedUnlinkFiche?.FICHENO}</p>
        <div className={styles.grid}>
          <p>
            <span>Müştəri adı:</span>
            <p>{selectedUnlinkFiche?.DEFINITION_}</p>
          </p>
          <p>
            <span>Müştəri kodu:</span>
            <p>{selectedUnlinkFiche?.CODE}</p>
          </p>
          <p>
            <span>Təslimatçı:</span>
            <p>{selectedUnlinkFiche?.TESLIMAT}</p>
          </p>
          <p>
            <span>Məbləğ:</span>
            <p>{selectedUnlinkFiche?.NETTOTAL}</p>
          </p>
          <p>
            <span>Tarix:</span>
            <p>
              {new Date(selectedUnlinkFiche?.DATE_).toLocaleDateString("az")}
            </p>
          </p>
        </div>
        <div className={styles.grid1}>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>
              Faylı seç <small> (.jpg və ya .png)</small>
            </Button>
          </Upload>

          {/* <span>Fayllar: 1 fayl əlavə edildi</span> */}
        </div>
      </div>
    </Modal>
  );
}

export default LinkFileToFicheModal;
