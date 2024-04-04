import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Select,
  Upload,
  notification,
} from "antd";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "../modal.module.css";
import { fetchUploadHandoverFiles } from "../../../services/file_service";
import { fetchHandoverTypes } from "../../../services/handover_service";

const NewHandoverModal = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();

  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [type, setType] = useState(null);
  const [date, setDate] = useState(null);

  const [types, setTypes] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

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

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file);
    });
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("type", type);
    formData.append("date", date);
    formData.append("token", user.TOKEN);
    setUploading(true);
    const res = await fetchUploadHandoverFiles(formData);
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

  function generateName(file) {
    try {
      const ext = file.name.substring(file.name.lastIndexOf("."));
      const fileName = `tt_${name}_${Math.random()
        .toString(36)
        .substring(2, 6)}${ext}`;
      const newFile = new File([file], fileName, { type: file.type });
      return newFile;
    } catch (error) {
      console.log(error);
    }
  }

  const getTypes = async () => {
    const data = await fetchHandoverTypes(user.TOKEN);
    setTypes(data);
  };

  useEffect(() => {
    getTypes();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setName(null);
      setSurname(null);
      setType(null);
      setFileList([]);
    }
  }, [isOpen]);

  return (
    <Modal
      title="Yeni təhvil-təslim"
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
            <p>Ad</p>
            <Input
              type="text"
              value={name}
              onChange={(e) => {
                e.target.value.trim() === ""
                  ? setName(null)
                  : setName(e.target.value.trim());
              }}
            />
          </div>
          <div>
            <p>Soyad</p>
            <Input
              type="text"
              value={surname}
              onChange={(e) => {
                e.target.value.trim() === ""
                  ? setSurname(null)
                  : setSurname(e.target.value.trim());
              }}
            />
          </div>
          <div>
            <p>Tip</p>
            <Select
              style={{
                width: "100%",
              }}
              value={type}
              onChange={(e) => setType(e)}
              options={types}
              fieldNames={{ label: "NAME", value: "ID" }}
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
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className={styles.p}>Fayl</p>
            <div>
              <Upload {...props}>
                <Button
                  icon={<UploadOutlined />}
                  disabled={!(name && surname && date && type)}
                >
                  Faylı seç <small> (.jpg, .png və ya .pdf)</small>
                </Button>
              </Upload>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewHandoverModal;
