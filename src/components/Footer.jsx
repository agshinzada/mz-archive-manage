import { Footer } from "antd/es/layout/layout";
import pack from "../../package.json";
function MainFooter({ props }) {
  return (
    <Footer
      style={{
        textAlign: "center",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      {...props}
    >
      Mazarina Trade Company ©{new Date().getFullYear()} v{pack.version}
      <a href="https://agshin.dev/">
        <img src="/powered.svg" alt="logo" style={{ width: "80px" }} />
      </a>
    </Footer>
  );
}

export default MainFooter;
