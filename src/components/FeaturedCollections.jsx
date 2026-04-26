import { Sparkles, Flame } from "lucide-react";
import ProductCard from "./ProductCard";

function CollectionBlock({ id, label, title, description, products, onAdd, onView, icon, isFavorite, onToggleWishlist }) {
  if (!products.length) return null;

  return (
    <section id={id} className="collection-showcase section-padding-sm">
      <div className="container">
        <div className="section-head collection-head">
          <div>
            <span className="section-label">
              {icon}
              {label}
            </span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <a href="#products" className="collection-link">كل المنتجات</a>
        </div>

        <div className="products-grid featured-products-grid">
          {products.map((product) => (
            <ProductCard
              key={`${id}-${product.id}`}
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

export default function FeaturedCollections({ products = [], onAdd, onView, isFavorite = () => false, onToggleWishlist = () => {} }) {
  const newArrivals = [...(products || [])]
    .filter((item) => item && item.is_active !== false)
    .sort((a, b) => Number(b?.id) - Number(a?.id))
    .slice(0, 4);

  const bestSellers = [...(products || [])]
    .filter((item) => item && item.is_active !== false)
    .sort((a, b) => Number(b?.rating || 0) - Number(a?.rating || 0) || Number(b?.stock || 0) - Number(a?.stock || 0))
    .slice(0, 4);

  return (
    <>
      <CollectionBlock
        id="new-arrivals"
        label="New Arrivals"
        title="وصل حديثًا"
        description="قسم خاص يعرض آخر المنتجات المضافة بشكل مرتب وجذاب جدًا."
        products={newArrivals}
        onAdd={onAdd}
        onView={onView}
        icon={<Sparkles size={17} />}
        isFavorite={isFavorite}
        onToggleWishlist={onToggleWishlist}
      />

      <CollectionBlock
        id="best-sellers"
        label="Best Sellers"
        title="الأكثر مبيعًا"
        description="أفضل المنتجات طلبًا وتقييمًا في عرض واضح يساعد على زيادة التحويلات."
        products={bestSellers}
        onAdd={onAdd}
        onView={onView}
        icon={<Flame size={17} />}
        isFavorite={isFavorite}
        onToggleWishlist={onToggleWishlist}
      />
    </>
  );
}
