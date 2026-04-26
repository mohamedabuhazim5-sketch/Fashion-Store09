import { ArrowLeft, Crown, Heart, MessageCircle, Sparkles } from "lucide-react";
import { STORE } from "../config/store";
import { currency } from "../utils/format";

export default function FeaturedProductSpotlight({ products = [] }) {
  const product = [...(products || [])]
    .filter((item) => item && item.is_active !== false)
    .sort((a, b) => Number(b?.rating || 0) - Number(a?.rating || 0))[0];

  if (!product) return null;

  const saving = Math.max(0, Number(product.oldPrice || 0) - Number(product.price || 0));

  return (
    <section className="featured-spotlight section-padding-sm">
      <div className="container featured-spotlight-shell">
        <div className="featured-spotlight-image">
          <img src={product.image} alt={product.name} />
          <span>
            <Crown size={15} />
            Pick of the week
          </span>
        </div>

        <div className="featured-spotlight-content">
          <span className="section-label">
            <Sparkles size={17} />
            Featured Product
          </span>
          <h2>{product.name}</h2>
          <p>{product.description}</p>

          <div className="featured-price-row">
            <strong>{currency(product.price)}</strong>
            <del>{currency(product.oldPrice)}</del>
            {saving > 0 && <b>وفري {currency(saving)}</b>}
          </div>

          <div className="featured-mini-list">
            <span><Heart size={15} /> تقييم {product.rating}</span>
            <span>الألوان: {product.colors.slice(0, 3).join(" • ")}</span>
            <span>المقاسات: {product.sizes.join(" - ")}</span>
          </div>

          <div className="featured-actions">
            <a href={`#/product/${product.id}`}>
              عرض المنتج
              <ArrowLeft size={17} />
            </a>
            <a
              href={`https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(`عايزة أسأل عن ${product.name}`)}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} />
              اسألي واتساب
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
