import { Button, Form, Input, Modal, Select } from "antd";
import { useFiches } from "../../context/FichesContext";
import styles from "./modal.module.css";
import {
  FilePdfOutlined,
  FileZipOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useAuth } from "../../context/AuthContext";
import { fetchDownloadFiles } from "../../services/file_service";
import { PDFDocument } from "pdf-lib";
import { useEffect, useState } from "react";
import { fetchUpdateProblemFiche } from "../../services/fiches_service";

function ProblemUpdateFicheModal({ getData }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    ficheDetailIsOpen,
    setFicheDetailIsOpen,
    selectedFiche,
    selectedFicheFileList,
  } = useFiches();
  const [form] = Form.useForm();

  async function handleFiche(params) {
    setLoading(true);
    await fetchUpdateProblemFiche(
      {
        ...params,
        oldFilePath: selectedFiche.FILEPATH,
        id: selectedFiche.ID,
      },
      user.TOKEN
    );
    getData();
    setFicheDetailIsOpen(false);
    setLoading(false);
  }

  const handleDownload = async () => {
    setLoading(true);
    const zip = new JSZip();
    for (const iterator of selectedFicheFileList) {
      const fileData = await fetchDownloadFiles(iterator.FILENAME, user.TOKEN);
      if (fileData) {
        zip.file(iterator.FILENAME, fileData);
      }
    }
    if (zip.length > 0) {
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, selectedFiche?.FICHENO);
    }
    setLoading(false);
  };

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

  const handlePdfDownload = async () => {
    setLoading(true);
    const pdfDoc = await PDFDocument.create();

    for (let iterator of selectedFicheFileList) {
      const fileData = await fetchDownloadFiles(iterator.FILENAME, user.TOKEN);
      if (fileData) {
        const page = pdfDoc.addPage();
        const pngImage = await pdfDoc.embedJpg(fileData);
        const pageWidth = page.getWidth();
        const pageHeight = page.getHeight();

        // Görsel boyutlarını sayfa boyutuna göre ayarlama
        const imageWidth = pngImage.width;
        const imageHeight = pngImage.height;
        const aspectRatio = imageWidth / imageHeight;

        let scaledWidth, scaledHeight;

        // Görseli sayfaya sığdırmak için ölçeklendirme
        if (imageWidth > pageWidth || imageHeight > pageHeight) {
          if (pageWidth / aspectRatio <= pageHeight) {
            scaledWidth = pageWidth;
            scaledHeight = pageWidth / aspectRatio;
          } else {
            scaledHeight = pageHeight;
            scaledWidth = pageHeight * aspectRatio;
          }
        } else {
          scaledWidth = imageWidth;
          scaledHeight = imageHeight;
        }

        page.drawImage(pngImage, {
          x: (pageWidth - scaledWidth) / 2, // Ortalamak için X konumu
          y: (pageHeight - scaledHeight) / 2, // Ortalamak için Y konumu
          width: scaledWidth,
          height: scaledHeight,
        });
      } else {
        setLoading(false);
        return;
      }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedFiche.FICHENO}.pdf`;
    link.click();
    setLoading(false);
  };

  useEffect(() => {
    if (selectedFiche) {
      form.setFieldsValue({
        ficheno: selectedFiche?.FICHENO,
        fileName: selectedFiche?.FILENAME,
        filePath: selectedFiche?.FILEPATH,
        ficheType: selectedFiche?.TRCODE,
        status: selectedFiche?.STATUS,
      });
    }
  }, [selectedFiche, form]);

  return (
    <Modal
      title="İrsaliyə məlumatları"
      centered
      open={ficheDetailIsOpen}
      onOk={() => setFicheDetailIsOpen(false)}
      onCancel={() => setFicheDetailIsOpen(false)}
      footer={[]}
    >
      <div className={styles.container}>
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            remember: false,
          }}
          onFinish={handleFiche}
        >
          <div className="flex gap-1">
            <Form.Item
              label="Sənəd nömrəsi"
              name="ficheno"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Sənəd növü"
              name={"ficheType"}
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item
            label="Fayl adı"
            name={"fileName"}
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Fayl yolu"
            name={"filePath"}
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: 0,
                  label: "Aktiv",
                },
                {
                  value: 1,
                  label: "Deaktiv",
                },
                {
                  value: 2,
                  label: "Sistemdə yoxdur",
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="mt-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">
              {selectedFicheFileList.length} fayl mövcuddur
            </span>
            <div className="flex gap-1">
              <Button
                type="primary"
                icon={<FileZipOutlined />}
                size={"middle"}
                loading={loading}
                onClick={handleDownload}
              >
                ZIP
              </Button>
              <Button
                type="primary"
                icon={<FilePdfOutlined />}
                size={"middle"}
                loading={loading}
                onClick={handlePdfDownload}
                // disabled
              >
                PDF
              </Button>
            </div>
          </div>
          <div
            style={{
              padding: "10px",
              border: "1px solid #ebebeb",
              marginTop: "10px",
            }}
          >
            {Object.keys(selectedFicheFileList).length &&
              selectedFicheFileList?.map((item) => (
                <div
                  key={item.ID}
                  className="flex justify-between items-center"
                >
                  <div className="font-bold">{item.FILENAME}</div>
                  <Button
                    type="link"
                    icon={<FolderViewOutlined />}
                    size={"middle"}
                    loading={loading}
                    onClick={() => handleViewFile(item.FILENAME)}
                    // disabled
                  >
                    View
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProblemUpdateFicheModal;
