import { Camera, CheckCircle2, HeartHandshake, MessageCircle, Sparkles } from "lucide-react";
import { STORE } from "../config/store";

const points = [
  "ستايل بناتي ناعم ومريح للعين",
  "تأكيد الطلب بسهولة على واتساب",
  "عرض منتجات أوضح وأقوى",
  "أقسام مرتبة وتجربة تصفح أسهل",
];

export default function StyleShowcase() {
  return (
    <section className="style-showcase section-padding-sm">
      <div className="container style-showcase-grid">
        <div className="style-showcase-copy">
          <span className="section-label light-pill">
            <Sparkles size={17} />
            Fashion Store Mood
          </span>
          <h2>الهوية البصرية بقت أهدى وأشيك</h2>
          <p>
            ركزنا في النسخة دي على التفاصيل اللي ترفع شكل المتجر: فراغات أريح، كروت أجمل،
            وأقسام فيها طابع بناتي أوضح يخلي الانطباع الأول أقوى.
          </p>

          <div className="style-points-grid">
            {points.map((point) => (
              <div className="style-point" key={point}>
                <CheckCircle2 size={17} />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="style-showcase-actions">
            <a href="#products" className="primary-btn">
              شوفي المنتجات
            </a>
            <a
              href={`https://wa.me/${STORE.whatsappNumber}`}
              className="whatsapp-btn"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} />
              اطلبي على واتساب
            </a>
          </div>
        </div>

        <div className="style-showcase-media">
          <article className="style-media-main">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80"
              alt="Style showcase"
            />
            <div className="style-floating-badge">
              <Camera size={16} />
              Soft lookbook feeling
            </div>
          </article>

          <div className="style-media-stack">
            <article className="style-mini-card">
              <strong>Packaging Feel</strong>
              <p>شكل جذاب من أول نظرة لحد الطلب.</p>
            </article>
            <article className="style-mini-card hot">
              <HeartHandshake size={16} />
              <div>
                <strong>Better shopping mood</strong>
                <p>سهولة أكثر وثقة أكبر للعميلة.</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
