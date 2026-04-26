import { X, ShoppingBag, Star, Sparkles, ShieldCheck, Truck, Heart, MessageCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { currency } from "../utils/format";

export default function ProductModal({ product, onClose, onAdd, isFavorite = false, onToggleFavorite }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");

  useEffect(() => {
    setSelectedSize(product?.sizes?.[0] || "");
    setSelectedColor(product?.colors?.[0] || "");
  }, [product]);

  const saving = useMemo(
    () => Math.max(0, Number(product?.oldPrice || 0) - Number(product?.price || 0)),
    [product]
  );

  if (!product) return null;
  const outOfStock = Number(product.stock || 0) <= 0;

  return (
    <div className="modal-layer open">
      <button className="modal-backdrop" onClick={onClose} aria-label="Close" />

      <div className="product-modal product-modal-v8">
        <button className="modal-close" onClick={onClose}>
          <X />
        </button>

        <div className="product-modal-image-wrap">
          <img src={product.image} alt={product.name} />
          <span className="product-modal-tag">{product.tag}</span>
        </div>

        <div className="product-modal-content product-modal-content-v8">
          <span className="product-category">{product.category}</span>
          <h2>{product.name}</h2>

          <div className="modal-top-row">
            <span className="rating modal-rating">
              <Star size={15} fill="currentColor" />
              {product.rating}
            </span>
            {saving > 0 && <span className="modal-saving">وفري {currency(saving)}</span>}
          </div>

          <p>{product.description}</p>

          <div className="price-row">
            <strong>{currency(product.price)}</strong>
            <del>{currency(product.oldPrice)}</del>
          </div>

          <div className="modal-info-chips">
            <span><Sparkles size={15} /> ستايل بناتي أنيق</span>
            <span><ShieldCheck size={15} /> خامة مختارة بعناية</span>
            <span><Truck size={15} /> التوصيل يتأكد على واتساب</span>
          </div>

          <div className="modal-stock-line">
            المخزون الحالي: <strong>{product.stock ?? 0}</strong> قطعة
          </div>

          <div className="select-grid">
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

          <div className="modal-action-row">
            <button
            className="add-to-cart-btn"
            disabled={outOfStock}
            onClick={() => {
              onAdd(product, selectedSize, selectedColor);
              onClose();
            }}
          >
            <ShoppingBag size={19} />
            {outOfStock ? "نفذت الكمية" : "أضيفي للسلة"}
            </button>

            <button className={`wishlist-action ${isFavorite ? "active" : ""}`} onClick={onToggleFavorite}>
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
              مفضلة
            </button>

            <a
              className="share-whatsapp-btn"
              href={`https://wa.me/?text=${encodeURIComponent(`شوفي المنتج ده من ${product.name}: ${window.location.origin}${window.location.pathname}#/product/${product.id}`)}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} />
              مشاركة
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
