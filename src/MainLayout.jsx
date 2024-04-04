import { Layout, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import styles from "./layout.module.css";
import MenuWare from "./components/menu/MenuWare";
import MenuAcc from "./components/menu/MenuAcc";
import MenuTech from "./components/menu/MenuTech";

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
