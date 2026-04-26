import { ArrowLeft, Sparkles, Star } from "lucide-react";
import { currency } from "../utils/format";

export default function LuxeProductRail({ products = [] }) {
  const items = [...(products || [])]
    .filter((item) => item && item.is_active !== false)
    .sort((a, b) => Number(b?.rating || 0) - Number(a?.rating || 0))
    .slice(0, 8);

  if (!items.length) return null;

  return (
    <section className="luxe-product-rail section-padding-sm">
      <div className="container">
        <div className="section-head simple">
          <div>
            <span className="section-label">
              <Sparkles size={17} />
              Luxe Product Rail
            </span>
            <h2>منتجات مختارة في شريط سريع</h2>
            <p>عرض أفقي خفيف يبرز المنتجات المهمة ويخلي التصفح أسرع على الموبايل والديسكتوب.</p>
          </div>
        </div>

        <div className="luxe-rail-scroll">
          {items.map((product) => (
            <a className="luxe-rail-card" href={`#/product/${product.id}`} key={product.id}>
              <img src={product.image} alt={product.name} />
              <div>
                <span>
                  <Star size={13} fill="currentColor" />
                  {product.rating}
                </span>
                <strong>{product.name}</strong>
                <p>{currency(product.price)}</p>
                <b>
                  عرض المنتج
                  <ArrowLeft size={14} />
                </b>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
