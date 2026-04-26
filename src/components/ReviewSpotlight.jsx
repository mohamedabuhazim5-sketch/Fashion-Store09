import { Heart, Star, Sparkles } from "lucide-react";

const items = [
  {
    name: "سجدة علي",
    text: "الواجهة بقت جميلة جدًا والمنتجات واضحة وسهلة في الاختيار، وحقيقي المتجر شكله يفتح النفس.",
  },
  {
    name: "مريم أحمد",
    text: "أجمل حاجة في الموقع إنه بناتي فعلًا، وكمان الطلب على واتساب سريع وسهل جدًا.",
  },
  {
    name: "نور خالد",
    text: "شكل عرض المنتجات احترافي جدًا، وبيدي ثقة للعميلة إنها تكمل شراء.",
  },
];

export default function ReviewSpotlight() {
  return (
    <section className="review-spotlight section-padding-sm">
      <div className="container review-spotlight-grid">
        <div className="review-highlight-card">
          <span className="section-label">
            <Sparkles size={17} />
            Customer Love
          </span>
          <h2>عميلاتك لازم يحبوا شكل المتجر من أول دخول</h2>
          <p>
            علشان كده ضفنا قسم آراء بطريقة أفخم، مع إبراز التجربة الأنثوية الأنيقة وسهولة التصفح والشراء.
          </p>

          <div className="review-metrics">
            <div>
              <strong>4.9/5</strong>
              <span>متوسط التقييم</span>
            </div>
            <div>
              <strong>+300</strong>
              <span>عميلة راضية</span>
            </div>
            <div>
              <strong>+1200</strong>
              <span>طلب تم تأكيده</span>
            </div>
          </div>
        </div>

        <div className="review-cards-column">
          {items.map((item) => (
            <article className="review-spot-card" key={item.name}>
              <div className="review-spot-stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </div>
              <p>{item.text}</p>
              <strong>
                <Heart size={14} />
                {item.name}
              </strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
