import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { encryptStorage } from "../utils/storage";

function MenuWare() {
  const navigate = useNavigate();
  const { routePath } = useAuth();
  const menuItems = [
    {
      key: 1,
      label: "Processing",
      target: `/${routePath}`,
    },
    {
      key: 2,
      label: "Sənədlər",
      target: `invoices`,
    },
    {
      key: 3,
      label: "Arxivsiz sənədlər",
      target: `invoices/approved`,
    },
    {
      key: 4,
      label: "Təsdiqsiz sənədlər",
      target: `invoices/unconfirmed`,
    },
  ];

  const handleMenuClick = ({ key }) => {
    const { target } = menuItems.find((item) => item.key == key) || {};
    localStorage.setItem("menuId", key);
    if (target) {
      navigate(target);
    }
  };

  function handleLogout() {
    encryptStorage.clear();
    navigate("auth/login");
  }
  return (
    <>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[localStorage.getItem("menuId") || "1"]}
        onClick={handleMenuClick}
        items={menuItems}
        style={{
          flex: 1,
          minWidth: 0,
        }}
      />
      <Button onClick={handleLogout}>Çıxış</Button>
    </>
  );
}

export default MenuWare;
