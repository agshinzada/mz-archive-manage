import { Button, Form, Input, message } from "antd";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MainFooter from "../components/Footer";
import { fetchUserLogin } from "../services/user_service";
import { useAuth } from "../context/AuthContext";
import { encryptStorage } from "../components/utils/storage";
import bcrypt from "bcryptjs";

function LoginPage() {
  const { setUser } = useAuth();
  const { menuItem } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function handleLogin(params) {
    try {
      setLoading(true);
      const hashedPass = bcrypt.hashSync(
        params.password,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );
      const data = await fetchUserLogin(params.username, hashedPass);
      if (data) {
        setUser(data);
        encryptStorage.setItem(`user`, data);
        setLoading(false);
        const target = JSON.parse(localStorage.getItem("menuItem"))?.target;
        navigate(target ? `/${target}` : "/invoices");
      } else {
        setLoading(false);
      }
    } catch (error) {
      message.error("Login error");
      setLoading(false);
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.login_box}>
        <a href="/" className={styles.logo}>
          <img src="/logo.svg" style={{ width: "26px", marginRight: "7px" }} />
          <p>{"Arxiv İdarəetmə Paneli"}</p>
        </a>
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
            <Input size="middle" />
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
            <Input.Password size="middle" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="middle"
              style={{ float: "right", backgroundColor: "rgb(65, 64, 64)" }}
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
