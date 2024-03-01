import { EncryptStorage } from "encrypt-storage";

export const encryptStorage = new EncryptStorage("this app not for Mazarina", {
  storageType: "sessionStorage",
});
