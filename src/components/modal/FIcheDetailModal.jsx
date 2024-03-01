import { Button, Modal } from "antd";
import { useFiches } from "../../context/FichesContext";
import styles from "./modal.module.css";
import { DownloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function FicheDetailModal() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState([]);

  const {
    ficheDetailIsOpen,
    setFicheDetailIsOpen,
    selectedFiche,
    selectedFicheFileList,
  } = useFiches();

  const handleDownload = async () => {
    try {
      const zip = new JSZip();
      for (const iterator of selectedFicheFileList) {
        const res = await axios(
          `http://localhost:5180/api/files/download?name=${iterator.FILENAME}&token=${user.TOKEN}`,
          {
            responseType: "arraybuffer",
          }
        );
        const fileData = await res.data;
        zip.file(iterator.FILENAME, fileData);
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, selectedFiche?.FICHENO);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="İrsaliyə məlumatları"
      centered
      open={ficheDetailIsOpen}
      onOk={() => setFicheDetailIsOpen(false)}
      onCancel={() => setFicheDetailIsOpen(false)}
      footer={[
        <Button key="back" onClick={() => setFicheDetailIsOpen(false)}>
          OK
        </Button>,
      ]}
    >
      <div className={styles.container}>
        <p className={styles.title}>{selectedFiche?.FICHENO}</p>
        <div className={styles.grid}>
          <p>
            <span>Müştəri adı:</span>
            <p>{selectedFiche?.DEFINITION_}</p>
          </p>
          <p>
            <span>Müştəri kodu:</span>
            <p>{selectedFiche?.CODE}</p>
          </p>
          <p>
            <span>Təslimatçı:</span>
            <p>{selectedFiche?.TESLIMAT}</p>
          </p>
          <p>
            <span>Məbləğ:</span>
            <p>{selectedFiche?.NETTOTAL}</p>
          </p>
          <p>
            <span>Tarix:</span>
            <p>{new Date(selectedFiche?.DATE_).toLocaleDateString("az")}</p>
          </p>
        </div>
        <div className={styles.grid1}>
          <span>Fayllar: {selectedFicheFileList.length} fayl mövcuddur</span>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            size={"middle"}
            loading={loading}
            onClick={handleDownload}
          >
            Yüklə
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default FicheDetailModal;
