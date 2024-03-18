import { Button, Form, Input, message } from "antd";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MainFooter from "../components/Footer";
import { fetchUserLogin } from "../services/user_service";
import { useAuth } from "../context/AuthContext";
import { encryptStorage } from "../components/utils/storage";
import { sha256 } from "hash.js";
import { CaretLeftOutlined } from "@ant-design/icons";
// import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const { setUser, routePath } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      if (routePath) {
        const data = await fetchUserLogin(username, password);
        if (data) {
          setUser(data);
          encryptStorage.setItem(`${routePath}User`, data);
          setTimeout(() => {
            setLoading(false);
            navigate("/" + routePath);
          }, 1000);
        } else {
          setLoading(false);
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      message.error("Login error");
      setLoading(false);
    }
  }

  return (
    <div className={styles.box}>
      <Button
        icon={<CaretLeftOutlined />}
        className={styles.backButton}
        onClick={() => navigate("/")}
      >
        Geri
      </Button>
      <div className={styles.login_box}>
        <p className={styles.title}>Giriş</p>
        <Form
          className={styles.input_box}
          onFinish={handleLogin}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="İstifadəçi adı"
            name="username"
            rules={[
              {
                required: true,
                message: "Xananı doldurun",
              },
            ]}
          >
            <Input size="large" onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Şifrə"
            name="password"
            rules={[
              {
                required: true,
                message: "Xananı doldurun",
              },
            ]}
          >
            <Input
              size="large"
              type="password"
              onChange={(e) => {
                setPassword(sha256().update(e.target.value).digest("hex"));
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              style={{ float: "right" }}
              htmlType="submit"
              loading={loading}
            >
              Daxil ol
            </Button>
          </Form.Item>
        </Form>
      </div>
      <MainFooter />
    </div>
  );
}

export default LoginPage;
