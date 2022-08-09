import { Ticket } from "../interfaces";

export const getWhatsappText = (order: Ticket) => {
  return `*Número de orden:* ${order.id}%0A*Tipo:* ${
    order.orderType
  }%0A*Nombre:* ${order.customer?.firstName}%0A*Apellido:* ${
    order.customer?.lastName
  }${
    order.orderType == "delivery"
      ? `*Dirección:* ${order.address?.addressLine1}, ${order.address?.addressLine2}, ${order.address?.addressReference}`
      : ""
  }`;
};
