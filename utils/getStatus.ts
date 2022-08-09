import { Status, StatusType } from "../interfaces";

export const getStatus = (status: Status): string => {
  if (status.orderReceived) {
    return "Finalizada";
  }
  if (status.orderPrepared) {
    return "En camino";
  }
  if (status.orderConfirmed) {
    return "Preparando";
  }
  if (status.orderPaid) {
    return "Pagada";
  }
  return "Sin pagar";
};

export const getStatusType = (status: Status): StatusType => {
  if (status.orderReceived) {
    return StatusType.DELIVERED;
  }
  if (status.orderPrepared) {
    return StatusType.PREPARED;
  }
  if (status.orderConfirmed) {
    return StatusType.CONFIRMED;
  }
  if (status.orderPaid) {
    return StatusType.PAID;
  }
  return StatusType.PLACED;
};
