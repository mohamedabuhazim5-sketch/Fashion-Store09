import { ArrowLeft, CheckCircle2, Eye, Palette, Ruler, ShoppingBag } from "lucide-react";

const guide = [
  {
    icon: <Eye size={20} />,
    title: "شوفي الصورة",
    text: "ابدئي بالصور والستايل العام للقطعة.",
  },
  {
    icon: <Palette size={20} />,
    title: "اختاري اللون",
    text: "راجعي الألوان المتاحة واختاري الأقرب لذوقك.",
  },
  {
    icon: <Ruler size={20} />,
    title: "حددي المقاس",
    text: "قارني مع دليل المقاسات قبل إضافة المنتج.",
  },
  {
    icon: <ShoppingBag size={20} />,
    title: "أضيفي للسلة",
    text: "راجعي الطلب ثم أرسليه واتساب مباشرة.",
  },
];

export default function ProductVisualGuide() {
  return (
    <section className="product-visual-guide section-padding-sm">
      <div className="container product-guide-shell">
        <div className="product-guide-head">
          <span className="section-label light-pill">
            <CheckCircle2 size={17} />
            Product Guide
          </span>
          <h2>اختيار المنتج بقى واضح خطوة بخطوة</h2>
          <p>قسم إرشادي بسيط يخلي العميلة تفهم إزاي تختار المنتج المناسب بدون حيرة.</p>
        </div>

        <div className="product-guide-grid">
          {guide.map((item, index) => (
            <article className="product-guide-card" key={item.title}>
              <small>{index + 1}</small>
              <span>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <a href="#products" className="product-guide-link">
          ابدئي الاختيار
          <ArrowLeft size={16} />
        </a>
      </div>
    </section>
  );
}
