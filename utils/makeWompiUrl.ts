export const makeWompiUrl = (qr: string) => {
  const splitted = qr.split("/");
  const transactionId = splitted[splitted.length - 1];
  return `https://pagos.wompi.sv/IntentoPago/Redirect?id=${
    transactionId.split(".")[0]
  }`;
};

export default makeWompiUrl;
