import { BadgePercent, Clock3, Flame } from "lucide-react";
import ProductCard from "./ProductCard";
import { currency } from "../utils/format";

export default function DailyDeals({ products = [], onAdd, onView, isFavorite = () => false, onToggleWishlist = () => {} }) {
  const deals = [...(products || [])]
    .filter((item) => item && item.is_active !== false && Number(item.oldPrice) > Number(item.price))
    .sort((a, b) => (Number(b?.oldPrice) - Number(b?.price)) - (Number(a?.oldPrice) - Number(a?.price)))
    .slice(0, 4);

  if (!deals.length) return null;

  const bestDeal = deals[0];
  const bestSaving = Number(bestDeal.oldPrice) - Number(bestDeal.price);

  return (
    <section id="daily-deals" className="daily-deals-section section-padding-sm">
      <div className="container">
        <div className="daily-deals-hero">
          <div>
            <span className="section-label light-pill">
              <Flame size={17} />
              Daily Deals
            </span>
            <h2>عروض اليوم</h2>
            <p>
              منتجات عليها توفير واضح، اتعرضت بشكل خاص علشان العميلة تشوف العرض بسرعة وتطلب بسهولة.
            </p>
          </div>

          <div className="best-deal-card">
            <BadgePercent size={28} />
            <span>أقوى توفير اليوم</span>
            <strong>{currency(bestSaving)}</strong>
            <small>{bestDeal.name}</small>
          </div>
        </div>

        <div className="deal-time-row">
          <Clock3 size={18} />
          <span>العروض تتغير باستمرار حسب المخزون والكوبونات المتاحة</span>
        </div>

        <div className="products-grid featured-products-grid">
          {deals.map((product) => (
            <ProductCard
              key={`deal-${product.id}`}
              product={product}
              onAdd={onAdd}
              onView={onView}
              isFavorite={isFavorite(product.id)}
              onToggleFavorite={() => onToggleWishlist(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
