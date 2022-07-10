import * as yup from "yup";

const requiredMessage = "Campo requerido";

export const validationAddress = yup.object({
  state: yup.string().required(requiredMessage),
  city: yup.string().required(requiredMessage),
  addressLine1: yup.string().required(requiredMessage),
  addressLine2: yup.string().required(requiredMessage),
  addressReference: yup.string().required(requiredMessage),
});

export default validationAddress;
