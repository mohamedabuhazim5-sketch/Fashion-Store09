import { Gift, Heart, Shirt } from "lucide-react";

const banners = [
  {
    icon: <Gift size={24} />,
    title: "خصومات موسمية",
    text: "فعّلي كوبونات الخصم وخلي تجربة الشراء أحلى وأسهل.",
    anchor: "#products",
    cta: "تسوقي الآن",
  },
  {
    icon: <Shirt size={24} />,
    title: "موديلات جديدة",
    text: "اختيارات بناتي عصرية مناسبة للخروج والمشاوير واليوميات.",
    anchor: "#new-arrivals",
    cta: "وصل حديثًا",
  },
  {
    icon: <Heart size={24} />,
    title: "الأكثر مبيعًا",
    text: "القطع المحبوبة والأكثر طلبًا موجودة في قسم منفصل وواضح.",
    anchor: "#best-sellers",
    cta: "شاهدي الآن",
  },
];

export default function PromoBanners() {
  return (
    <section id="promo-banners" className="promo-banners section-padding-sm">
      <div className="container promo-banners-grid">
        {banners.map((item) => (
          <article className="promo-banner-card" key={item.title}>
            <span className="promo-banner-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <a href={item.anchor}>{item.cta}</a>
          </article>
        ))}
      </div>
    </section>
  );
}
