import { ArrowLeft, Sparkles } from "lucide-react";

const items = [
  {
    title: "فساتين أنيقة",
    subtitle: "قطـع ناعمة مناسبة للخروجات والمناسبات الخفيفة.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "أطقم وكاجوال",
    subtitle: "إطلالات يومية شيك ومريحة بستايل بناتي جذاب.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "بلوزات ناعمة",
    subtitle: "تفاصيل رقيقة وسهلة التنسيق مع أكثر من لوك.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "إكسسوارات تكمل اللوك",
    subtitle: "شنط ولمسات صغيرة تخلي الإطلالة أشيك وأكمل.",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="category-showcase section-padding-sm">
      <div className="container">
        <div className="section-head category-showcase-head simple">
          <div>
            <span className="section-label">
              <Sparkles size={17} />
              Signature Collections
            </span>
            <h2>أقسام مرتبة بشكل أجمل</h2>
            <p>
              تصميم بصري أوضح يساعد العميلة تتنقل بسرعة وتشوف الأقسام اللي تناسب ذوقها.
            </p>
          </div>
        </div>

        <div className="category-showcase-grid">
          {items.map((item) => (
            <article className="category-showcase-card" key={item.title}>
              <img src={item.image} alt={item.title} />
              <div className="category-showcase-overlay" />
              <div className="category-showcase-content">
                <span>Fashion Store</span>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                <a href="#products">
                  شاهدي المجموعة
                  <ArrowLeft size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
