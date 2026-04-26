import { MessageCircle } from "lucide-react";
import { STORE } from "../config/store";

export default function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={`https://wa.me/${STORE.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
    >
      <MessageCircle />
      <span>واتساب</span>
    </a>
  );
}
