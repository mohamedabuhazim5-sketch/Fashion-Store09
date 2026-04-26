import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Heart,
  MessageCircle,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import ProductCard from "./ProductCard";
import { STORE } from "../config/store";
import { currency } from "../utils/format";

export default function ProductDetailsPage({
  product,
  products = [],
  onAdd,
  wishlist,
  onToggleWishlist,
  isFavorite,
}) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    setSelectedSize(product?.sizes?.[0] || "");
    setSelectedColor(product?.colors?.[0] || "");
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return (products || [])
      .filter((item) => item && item.id !== product.id && item.category === product.category && item.is_active !== false)
      .slice(0, 4);
  }, [products = [], product]);

  if (!product) {
    return (
      <main className="product-page product-not-found">
        <div className="container">
          <a href="#/" className="back-home-link">
            <ArrowRight size={18} />
            رجوع للمتجر
          </a>
          <h1>المنتج غير موجود</h1>
          <p>يمكن أن يكون المنتج اتحذف أو الرابط غير صحيح.</p>
          <a href="#products" className="primary-btn">كل المنتجات</a>
        </div>
      </main>
    );
  }

  const outOfStock = Number(product.stock || 0) <= 0;
  const saving = Math.max(0, Number(product.oldPrice || 0) - Number(product.price || 0));
  const shareMessage = `شوفي المنتج ده من ${STORE.name}: ${product.name} - السعر ${currency(product.price)} ${window.location.origin}${window.location.pathname}#/product/${product.id}`;

  return (
    <main className="product-page product-page-v14">
      <section className="product-details-hero">
        <div className="container product-details-grid">
          <div className="product-details-image">
            <img src={product.image} alt={product.name} />
            <span>{product.tag}</span>
          </div>

          <div className="product-details-content product-details-content-v14">
            <a href="#/" className="back-home-link">
              <ArrowRight size={18} />
              رجوع للمتجر
            </a>

            <span className="product-category">{product.category}</span>
            <h1>{product.name}</h1>

            <div className="product-details-rating">
              <span className="rating">
                <Star size={15} fill="currentColor" />
                {product.rating}
              </span>
              {saving > 0 && <b>وفري {currency(saving)}</b>}
            </div>

            <p>{product.description}</p>

            <div className="price-row product-details-price">
              <strong>{currency(product.price)}</strong>
              <del>{currency(product.oldPrice)}</del>
            </div>

            <div className="product-details-premium-note">
              <strong>Premium fit note</strong>
              <span>اختاري المقاس واللون، ولو محتارة ابعتي لنا على واتساب وهنساعدك فورًا.</span>
            </div>

            <div className="product-details-chips">
              <span><Sparkles size={15} /> تصميم بناتي ناعم</span>
              <span><ShieldCheck size={15} /> اختيار آمن ومريح</span>
              <span><Truck size={15} /> شحن حسب العنوان</span>
            </div>

            <div className="product-details-stock">
              المخزون: <strong>{product.stock}</strong> قطعة
              {outOfStock && <em>نفذت الكمية</em>}
            </div>

            <div className="select-grid product-page-selects">
              <label>
                المقاس
                <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                  {product.sizes.map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>
              </label>

              <label>
                اللون
                <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                  {product.colors.map((color) => (
                    <option key={color}>{color}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="product-details-actions">
              <button
                className="add-to-cart-btn"
                disabled={outOfStock}
                onClick={() => onAdd(product, selectedSize, selectedColor)}
              >
                <ShoppingBag size={19} />
                {outOfStock ? "نفذت الكمية" : "أضيفي للسلة"}
              </button>

              <button
                className={`wishlist-action ${isFavorite(product.id) ? "active" : ""}`}
                onClick={() => onToggleWishlist(product.id)}
              >
                <Heart size={19} fill={isFavorite(product.id) ? "currentColor" : "none"} />
                {isFavorite(product.id) ? "في المفضلة" : "أضيفي للمفضلة"}
              </button>

              <a
                className="share-whatsapp-btn"
                href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={19} />
                مشاركة واتساب
              </a>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="related-products-section section-padding-sm">
          <div className="container">
            <div className="section-head simple">
              <div>
                <span className="section-label">Related Products</span>
                <h2>منتجات مشابهة</h2>
                <p>اختيارات قريبة من نفس القسم يمكن تعجبك برضو.</p>
              </div>
            </div>

            <div className="products-grid featured-products-grid">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onAdd={onAdd}
                  onView={() => {}}
                  isFavorite={isFavorite(item.id)}
                  onToggleFavorite={() => onToggleWishlist(item.id)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
