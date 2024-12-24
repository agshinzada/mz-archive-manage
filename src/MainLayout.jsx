import { Layout, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import styles from "./layout.module.css";
import MainFooter from "./components/Footer";
import { Toaster } from "react-hot-toast";
import MenuRoot from "./components/menu/MenuRoot";
import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function MainLayout() {
  const { user } = useAuth();
  function getMenu() {
    return <MenuRoot role={user?.ROLE} />;
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
        <a href="/" className={styles.logo}>
          <img src="/logo.svg" style={{ width: "24px", marginRight: "7px" }} />
          <p>ARXİV İDARƏETMƏ PANELİ</p>
        </a>
        {getMenu()}
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
          <Outlet />
        </div>
      </Content>
      <MainFooter />
      <Toaster position="top-right" reverseOrder={false} />
    </Layout>
  );
}

export default MainLayout;
