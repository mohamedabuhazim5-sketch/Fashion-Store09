import { ArrowLeft, Crown, Sparkles, WandSparkles } from "lucide-react";

const banners = [
  {
    label: "Luxury Edit",
    title: "اختيارات شيك للوكات الهادية",
    text: "قسم مميز يدي للمتجر إحساس مجلة موضة بناتية بدل عرض منتجات عادي.",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    icon: <Crown size={18} />,
  },
  {
    label: "Soft Looks",
    title: "ستايلات ناعمة لكل يوم",
    text: "بانرات بتخلي العميلة تشوف إحساس البراند قبل تفاصيل المنتج.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    icon: <WandSparkles size={18} />,
  },
];

export default function EditorialBanners() {
  return (
    <section className="editorial-banners section-padding-sm">
      <div className="container">
        <div className="section-head simple editorial-head">
          <div>
            <span className="section-label">
              <Sparkles size={17} />
              Fashion Editorial
            </span>
            <h2>بانرات افتتاحية بشكل أفخم</h2>
            <p>عرض بصري أقوى يخلي المتجر يبدو كبراند موضة حقيقي، مش مجرد قائمة منتجات.</p>
          </div>
        </div>

        <div className="editorial-grid">
          {banners.map((item) => (
            <article className="editorial-card" key={item.title}>
              <img src={item.image} alt={item.title} />
              <div className="editorial-shade" />
              <div className="editorial-content">
                <span>{item.icon}{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href="#products">
                  تسوقي المجموعة
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
