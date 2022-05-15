import * as yup from "yup";
import { string } from "yup";

export const validationLogin = yup.object({
  username: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export default validationLogin;
