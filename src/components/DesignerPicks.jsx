import { ArrowLeft, Crown, Sparkles } from "lucide-react";
import { currency } from "../utils/format";

export default function DesignerPicks({ products = [] }) {
  const picks = [...(products || [])]
    .filter((item) => item && item.is_active !== false)
    .sort((a, b) => Number(b?.rating || 0) - Number(a?.rating || 0))
    .slice(0, 3);

  if (!picks.length) return null;

  return (
    <section className="designer-picks section-padding-sm">
      <div className="container">
        <div className="designer-picks-shell">
          <div className="designer-picks-intro">
            <span className="section-label">
              <Crown size={17} />
              Designer Picks
            </span>
            <h2>اختيارات مميزة بشكل أقرب للبراندات</h2>
            <p>
              قسم جديد يبرز أحلى المنتجات بطريقة Editorial أنيقة، مناسب جدًا لعرض القطع
              الأعلى تقييمًا أو الأكثر أهمية.
            </p>
            <a href="#products">
              تصفحي كل المنتجات
              <ArrowLeft size={17} />
            </a>
          </div>

          <div className="designer-picks-list">
            {picks.map((product, index) => (
              <article className={`designer-pick-card pick-${index + 1}`} key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="designer-pick-content">
                  <span>
                    <Sparkles size={14} />
                    {product.category}
                  </span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <strong>{currency(product.price)}</strong>
                  <a href={`#/product/${product.id}`}>عرض المنتج</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
