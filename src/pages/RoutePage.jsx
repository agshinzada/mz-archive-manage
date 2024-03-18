import MainFooter from "../components/Footer";
import { encryptStorage } from "../components/utils/storage";
import { useAuth } from "../context/AuthContext";
import styles from "./styles.module.css";

function RoutePage() {
  return (
    <div className={styles.box1}>
      <a href="/" className={styles.logo}>
        <img src="/logov2.svg" style={{ width: "26px", marginRight: "7px" }} />
        <p>archive mazarina</p>
      </a>
      <div className={styles.routes}>
        <a
          href="/ware"
          className={styles.route}
          onClick={() => {
            encryptStorage.setItem("routePath", "ware");
          }}
        >
          Anbar
        </a>
        <a
          href="/acc"
          className={styles.route}
          onClick={() => {
            encryptStorage.setItem("routePath", "acc");
          }}
        >
          Mühasibatlıq
        </a>
        {/* <div className={styles.route}>
          <a href="/">Yeni müştəri</a>
        </div>
        <div className={styles.route}>
          <a href="/">HR</a>
        </div> */}
      </div>
      <MainFooter />
    </div>
  );
}

export default RoutePage;
