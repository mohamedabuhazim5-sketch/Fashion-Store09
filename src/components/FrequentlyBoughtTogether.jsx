import { ArrowLeft, PackagePlus, Sparkles } from "lucide-react";
import { currency } from "../utils/format";

export default function FrequentlyBoughtTogether({ products = [] }) {
  const bundle = [...(products || [])]
    .filter((item) => item && item.is_active !== false)
    .slice(0, 3);

  if (bundle.length < 2) return null;

  const total = bundle.reduce((sum, item) => sum + Number(item.price || 0), 0);

  return (
    <section className="bundle-section section-padding-sm">
      <div className="container bundle-shell">
        <div className="bundle-copy">
          <span className="section-label">
            <PackagePlus size={17} />
            Frequently Bought Together
          </span>
          <h2>منتجات ينفع تتطلب مع بعض</h2>
          <p>
            قسم بيساعد العميلة تتخيل تنسيق كامل ويزود فرصة إضافة أكتر من منتج للسلة.
          </p>

          <div className="bundle-total">
            <span>إجمالي المجموعة</span>
            <strong>{currency(total)}</strong>
          </div>

          <a href="#products" className="bundle-link">
            تصفحي المجموعة
            <ArrowLeft size={17} />
          </a>
        </div>

        <div className="bundle-products">
          {bundle.map((product, index) => (
            <article className="bundle-product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div>
                <small>
                  <Sparkles size={13} />
                  قطعة {index + 1}
                </small>
                <strong>{product.name}</strong>
                <span>{currency(product.price)}</span>
                <a href={`#/product/${product.id}`}>عرض المنتج</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
