import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import styles from "./layout.module.css";
import { useNavigate } from "react-router-dom";
import { encryptStorage } from "./components/utils/storage";

function MainLayout({ children }) {
  const navigate = useNavigate();
  const menuItems = [
    {
      key: 1,
      label: "Processing",
      target: "/",
    },
    {
      key: 2,
      label: "Sənədlər",
      target: "/invoices",
    },
    {
      key: 3,
      label: "Sistemə yüklə",
      target: "/uploader",
    },
  ];

  const handleMenuClick = ({ key }) => {
    const { target } = menuItems.find((item) => item.key == key) || {};
    if (target) {
      navigate(target);
    }
  };

  function handleLogout() {
    encryptStorage.clear();
    navigate("auth/login");
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <img src="/logo.svg" style={{ width: "24px", marginRight: "7px" }} />
        <p className={styles.logo}>archive</p>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          onClick={handleMenuClick}
          items={menuItems}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <Button onClick={handleLogout}>Çıxış</Button>
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            marginTop: "1rem",
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Mazarina Trade Company ©{new Date().getFullYear()} Powered by{" "}
        <a href="https://agshin.dev/" style={{ fontWeight: 700 }}>
          agshin
          <span style={{ color: "#6E06F2", fontSize: "16px" }}>.dev</span>
        </a>
      </Footer>
    </Layout>
  );
}

export default MainLayout;
