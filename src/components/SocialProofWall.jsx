import { Heart, Star } from "lucide-react";

const quotes = [
  "شكل المتجر مريح جدًا والمنتجات واضحة.",
  "السلة والواتساب مخليين الطلب سهل وسريع.",
  "الألوان بناتي وهادية جدًا.",
  "صفحة المنتج واضحة ومقنعة.",
  "المفضلة حلوة جدًا للمنتجات اللي محتارة فيها.",
  "العروض والكوبونات ظاهرة بشكل جميل.",
];

export default function SocialProofWall() {
  return (
    <section className="social-proof-wall section-padding-sm">
      <div className="container">
        <div className="section-head simple">
          <div>
            <span className="section-label">
              <Heart size={17} />
              Social Proof
            </span>
            <h2>إحساس ثقة من أول تصفح</h2>
            <p>عرض آراء قصيرة بشكل مختلف يزود إحساس الثقة والاحتراف.</p>
          </div>
        </div>

        <div className="proof-wall-grid">
          {quotes.map((quote, index) => (
            <article className="proof-wall-card" key={quote}>
              <div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p>{quote}</p>
              <strong>عميلة #{index + 1}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
