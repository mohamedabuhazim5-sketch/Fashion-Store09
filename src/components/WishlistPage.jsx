import { ArrowRight, Heart } from "lucide-react";
import ProductCard from "./ProductCard";

export default function WishlistPage({ products, wishlist, onAdd, onView, onToggleWishlist }) {
  const wishlistProducts = products.filter((product) => wishlist.includes(String(product.id)));

  return (
    <main className="wishlist-page">
      <section className="section-padding">
        <div className="container">
          <a href="#/" className="back-home-link">
            <ArrowRight size={18} />
            رجوع للمتجر
          </a>

          <div className="wishlist-head">
            <span className="section-label">
              <Heart size={17} />
              Wishlist
            </span>
            <h1>المفضلة</h1>
            <p>كل المنتجات اللي عجبتك هتلاقيها هنا، وتقدري تضيفيها للسلة بسرعة.</p>
          </div>

          {wishlistProducts.length ? (
            <div className="products-grid products-grid-v7">
              {wishlistProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={onAdd}
                  onView={onView}
                  isFavorite
                  onToggleFavorite={() => onToggleWishlist(product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-products wishlist-empty">
              <Heart size={46} />
              <h3>المفضلة فاضية</h3>
              <p>اضغطي على علامة القلب في أي منتج علشان يظهر هنا.</p>
              <a href="#products" className="primary-btn">تصفحي المنتجات</a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
