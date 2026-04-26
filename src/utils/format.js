import { STORE } from "../config/store";

export function currency(value) {
  const safeValue = Number(value) || 0;
  return `${safeValue.toLocaleString("ar-EG")} ${STORE.currency}`;
}

export function buildWhatsAppLink(message) {
  return `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function createOrderNumber() {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `FS-${y}${m}${d}-${rand}`;
}

export function formatDate(dateValue) {
  const date = new Date(dateValue);
  return date.toLocaleString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
