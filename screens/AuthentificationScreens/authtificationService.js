import axios from "axios";
import { authApis } from "../../constants/api-url";

export const signUpSevice = (data) => {
  return new Promise((resolve, reject) => {

    axios.post(authApis.signUp, data)
      .then(async response => {
        await resolve(response?.data?.user);
      })
      .catch(error => {
        reject(error);
      });
  });
};