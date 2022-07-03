import * as yup from "yup";

const requiredMessage = "Required";

export const validationAddress = yup.object({
  state: yup.string().required(requiredMessage),
  city: yup.string().required(requiredMessage),
  addressLine1: yup.string().required(requiredMessage).min(4),
  addressLine2: yup.string().required(requiredMessage),
  addressReference: yup.string().required(),
});

export default validationAddress;
