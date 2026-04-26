import { ArrowLeft, Heart, MessageCircle, Sparkles } from "lucide-react";
import { STORE } from "../config/store";

export default function FinalPolishCta() {
  return (
    <section className="final-polish-cta section-padding-sm">
      <div className="container final-polish-shell">
        <div>
          <span>
            <Sparkles size={17} />
            Premium Girly Store
          </span>
          <h2>دلوقتي المتجر بقى شكله مناسب لبراند ملابس بناتي بجد</h2>
          <p>
            واجهة ناعمة، أقسام قوية، عرض منتجات Premium، تجربة موبايل أفضل،
            وكل طرق التواصل والطلب جاهزة.
          </p>
        </div>

        <div className="final-polish-actions">
          <a href="#products">
            <Heart size={18} />
            تصفحي المنتجات
            <ArrowLeft size={17} />
          </a>
          <a href={`https://wa.me/${STORE.whatsappNumber}`} target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            واتساب مباشر
          </a>
        </div>
      </div>
    </section>
  );
}
