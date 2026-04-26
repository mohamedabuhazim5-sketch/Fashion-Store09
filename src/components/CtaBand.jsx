import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { STORE } from "../config/store";

export default function CtaBand() {
  return (
    <section className="cta-band section-padding-sm">
      <div className="container cta-band-shell">
        <div>
          <span className="section-label cta-band-label">
            <Sparkles size={17} />
            Ready to Order?
          </span>
          <h2>اختاري القطعة المناسبة وابدئي طلبك الآن</h2>
          <p>
            المتجر جاهز بشكل أفضل، وعرض المنتجات أوضح، وكمان الطلب سهل جدًا سواء من السلة أو على واتساب.
          </p>
        </div>

        <div className="cta-band-actions">
          <a href="#products" className="primary-btn ghost-light">
            تصفحي المنتجات
            <ArrowLeft size={18} />
          </a>
          <a
            href={`https://wa.me/${STORE.whatsappNumber}`}
            className="whatsapp-btn inverted"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            تواصلي واتساب
          </a>
        </div>
      </div>
    </section>
  );
}
