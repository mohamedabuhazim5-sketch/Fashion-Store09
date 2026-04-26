import { Headphones, MessageCircle, PackageCheck, Sparkles } from "lucide-react";
import { STORE } from "../config/store";

export default function PremiumServiceStrip() {
  return (
    <section className="premium-service-strip section-padding-sm">
      <div className="container premium-service-shell">
        <div>
          <span>
            <Headphones size={18} />
            Premium Support
          </span>
          <strong>مساعدة قبل الطلب، تأكيد بعد الطلب، ومتابعة سهلة على واتساب.</strong>
        </div>

        <div className="premium-service-actions">
          <a href={`https://wa.me/${STORE.whatsappNumber}`} target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            واتساب مباشر
          </a>
          <span>
            <PackageCheck size={18} />
            Tracking Ready
          </span>
          <span>
            <Sparkles size={18} />
            Boutique Feel
          </span>
        </div>
      </div>
    </section>
  );
}
