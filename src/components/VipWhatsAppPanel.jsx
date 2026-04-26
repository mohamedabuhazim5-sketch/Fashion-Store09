import { MessageCircle, PhoneCall, Sparkles, Star } from "lucide-react";
import { STORE } from "../config/store";

const points = [
  "مساعدة في اختيار المقاس",
  "تأكيد اللون والموديل",
  "تجهيز رسالة الطلب",
  "متابعة حالة الأوردر",
];

export default function VipWhatsAppPanel() {
  return (
    <section className="vip-whatsapp section-padding-sm">
      <div className="container vip-whatsapp-shell">
        <div className="vip-whatsapp-copy">
          <span>
            <Sparkles size={17} />
            VIP WhatsApp Support
          </span>
          <h2>خلي واتساب جزء من تجربة البراند</h2>
          <p>
            بدل ما يكون زر تواصل فقط، خليناه جزء واضح من رحلة الشراء علشان العميلة تحس إن في مساعدة حقيقية.
          </p>

          <div className="vip-points">
            {points.map((point) => (
              <b key={point}>
                <Star size={14} fill="currentColor" />
                {point}
              </b>
            ))}
          </div>
        </div>

        <div className="vip-whatsapp-card">
          <PhoneCall size={26} />
          <strong>{STORE.whatsappDisplay}</strong>
          <span>دعم مباشر قبل الطلب وبعده</span>
          <a href={`https://wa.me/${STORE.whatsappNumber}`} target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            افتحي واتساب الآن
          </a>
        </div>
      </div>
    </section>
  );
}
