import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { encryptStorage } from "../utils/storage";

function MenuRoot({ role }) {
  const navigate = useNavigate();
  const menuItems = [
    {
      key: 1,
      label: "Processing",
      target: `/processing`,
      role: ["ADMIN", "MODERATOR"],
    },
    {
      key: 2,
      label: "Sənədlər",
      target: `invoices`,
      role: ["ADMIN", "MODERATOR", "USER"],
    },
    {
      key: 3,
      label: "Arxivsiz sənədlər",
      target: `invoices/approved`,
      role: ["ADMIN", "MODERATOR"],
    },
    {
      key: 4,
      label: "Təsdiqsiz sənədlər",
      target: `invoices/unconfirmed`,
      role: ["ADMIN", "MODERATOR"],
    },
    {
      key: 5,
      label: "Problemli sənədlər",
      target: `invoices/problems`,
      role: ["ADMIN"],
    },
    {
      key: 6,
      label: "Təkrar sənədlər",
      target: `invoices/duplicate`,
      role: ["ADMIN", "MODERATOR"],
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
        items={menuItems.filter((item) => item.role.includes(role))}
        style={{
          flex: 1,
          minWidth: 0,
        }}
      />
      <Button onClick={handleLogout}>Çıxış</Button>
    </>
  );
}

export default MenuRoot;
