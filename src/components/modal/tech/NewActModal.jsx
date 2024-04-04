import { Button, DatePicker, Input, Modal, Upload, notification } from "antd";
import styles from "../modal.module.css";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { fetchUploadActFiles } from "../../../services/file_service";
import dayjs from "dayjs";

function NewActModal({ isOpen, setIsOpen }) {
  const { user } = useAuth();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [code, setCode] = useState(null);
  const [date, setDate] = useState(null);
  const ref = useRef();

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file);
    });
    formData.append("code", "N" + code);
    formData.append("date", date);
    formData.append("token", user.TOKEN);

    setUploading(true);
    const res = await fetchUploadActFiles(formData);
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
      setUploading(false);
      setIsOpen(false);
    }, 500);
  };

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
      const fileName = `act_N${code}_${Math.random()
        .toString(36)
        .substring(2, 6)}${ext}`;
      const newFile = new File([file], fileName, { type: file.type });
      return newFile;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setCode(null);
      setFileList([]);
    }
  }, [isOpen]);

  return (
    <Modal
      title="Yeni akt"
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
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <p>Akt nömrəsi</p>
            <Input
              addonBefore="N"
              type="number"
              placeholder="Ms. 112"
              value={code}
              onChange={(e) => {
                e.target.value.trim() === ""
                  ? setCode(null)
                  : setCode(e.target.value.trim());
              }}
            />
          </div>
          <div>
            <p>Tarix</p>
            <DatePicker
              style={{ width: "100%" }}
              onChange={(e) => {
                if (e) {
                  setDate(dayjs(e.$d).format("YYYY-MM-DD"));
                } else {
                  setDate(null);
                }
              }}
              ref={ref}
            />
          </div>
          <div>
            <p className={styles.p}>Fayl</p>
            <div className={styles.grid1}>
              <Upload {...props}>
                <Button icon={<UploadOutlined />} disabled={!(code && date)}>
                  Faylı seç <small> (.jpg, .png və ya .pdf)</small>
                </Button>
              </Upload>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default NewActModal;
