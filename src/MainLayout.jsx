import { Layout, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import styles from "./layout.module.css";
import MenuWare from "./components/menu/MenuWare";
import MenuAcc from "./components/menu/MenuAcc";
import MenuTech from "./components/menu/MenuTech";
import MainFooter from "./components/Footer";

function MainLayout({ children, type }) {
  function getMenu() {
    if (type === "ware") {
      return <MenuWare />;
    } else if (type === "acc") {
      return <MenuAcc />;
    } else if (type === "tech") {
      return <MenuTech />;
    }
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
          <p>archive</p>
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
          {children}
        </div>
      </Content>
      <MainFooter />
    </Layout>
  );
}

export default MainLayout;
