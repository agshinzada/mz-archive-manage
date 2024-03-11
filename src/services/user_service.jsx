import { message } from "antd";

export async function fetchUserLogin(username, password) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}/auth/login?u=${username}&p=${password}`,
      {
        method: "POST",
      }
    );

    if (response.status === 200) {
      return response.json();
    } else if (response.status === 401) {
      message.error(await response.text());
      return false;
    } else if (response.status === 500) {
      message.error(`Server xətası: ${await response.text()}`);
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}
