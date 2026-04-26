import { ArrowLeft, Crown, MessageCircle, ShoppingBag, Sparkles, Star } from "lucide-react";
import { STORE } from "../config/store";

const highlights = [
  {
    title: "Fashion Store",
    text: "متجر ملابس بناتي بتصميم ناعم وتجربة طلب سهلة.",
    icon: <Crown size={26} />,
  },
  {
    title: "New Collection",
    text: "أقسام مرتبة، عروض واضحة، ومنتجات سهلة التصفح.",
    icon: <Sparkles size={26} />,
  },
  {
    title: "Fast WhatsApp",
    text: "تأكيد سريع للطلبات من خلال واتساب.",
    icon: <MessageCircle size={26} />,
  },
];

export default function Hero() {
  return (
    <section className="hero-v9 hero-clean-no-images">
      <div className="container hero-clean-grid">
        <div className="hero-v9-copy hero-clean-copy">
          <span className="hero-v9-kicker">
            <Sparkles size={18} />
            Fashion Store
          </span>

          <h1>Fashion Store</h1>

          <p>
            `افضل العروض  ，
            مع طلب سريع ومباشر على واتساب.
          </p>

          <div className="hero-v9-actions">
            <a href="#products" className="primary-btn">
              <ShoppingBag size={19} />
              تسوقي الآن
              <ArrowLeft size={18} />
            </a>

            <a
              href={`https://wa.me/${STORE.whatsappNumber}`}
              className="whatsapp-btn"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={19} />
              اطلبي على واتساب
            </a>
          </div>

          <div className="hero-v9-badges hero-v13-badges">
            <span>
              <Star size={15} />
              عروض منتجات أقوى
            </span>
            <span>
              <Crown size={15} />
              شكل بناتي جدًا
            </span>
            <span>Luxury product cards</span>
          </div>
        </div>

        <div className="hero-clean-panel-only">
          {highlights.map((item, index) => (
            <article className="hero-clean-card-only" key={`${item.title}-${index}`}>
              <span>{item.icon}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}

          <div className="hero-clean-mini-stats">
            <div>
              <strong>120+</strong>
              <span>قطعة بستايل أنيق</span>
            </div>
            <div>
              <strong>WhatsApp</strong>
              <span>تأكيد سريع للطلبات</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
