import * as yup from "yup";
import { string } from "yup";

const requiredMessage = "Campo requerido";

export const validationLogin = yup.object({
  username: yup.string().email("Correo no válido").required(requiredMessage),
  password: yup
    .string()
    .min(8, "Contraseña no válida")
    .required(requiredMessage),
});

export default validationLogin;
