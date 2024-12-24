import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f0f2f5", // bg-gray-100
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px", // 3 Tailwind'deki 3 birimi = 12px
            position: "relative",
            padding: "20px", // 5 Tailwind'deki 5 birimi = 20px
          }}
        >
          <img
            src={"/logo.svg"}
            style={{
              width: "20rem", // w-80, 80 birimi = 20rem
              position: "absolute",
              opacity: 0.1,
              top: "-5rem", // -top-20 = -5rem
            }}
          />
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "2.25rem", // text-4xl = 2.25rem
              zIndex: 10,
              color: "black", // text-red-500
            }}
          >
            404 - SƏHİFƏ TAPILMADI!
          </h1>
          <Button
            style={{
              width: "fit-content",
            }}
            type="primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            Geri
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
