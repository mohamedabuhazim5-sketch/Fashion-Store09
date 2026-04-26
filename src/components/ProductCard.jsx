import { Heart, ShoppingBag, Star, Eye, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { currency } from "../utils/format";

export default function ProductCard({ product, onAdd, onView, isFavorite = false, onToggleFavorite }) {
  const outOfStock = Number(product.stock || 0) <= 0;
  const lowStock = Number(product.stock || 0) > 0 && Number(product.stock || 0) <= 3;
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const saving = useMemo(
    () => Math.max(0, Number(product.oldPrice || 0) - Number(product.price || 0)),
    [product.oldPrice, product.price]
  );

  return (
    <article className="product-card product-card-v7 product-card-v11 product-card-v15 product-card-v16 product-card-v17 product-card-v18 product-card-v19 product-card-v20 product-card-v21 product-card-v22 product-card-v23 product-card-v24 product-card-v25">
      <div className="product-image-box">
        <a href={`#/product/${product.id}`} className="product-image-link"><img src={product.image} alt={product.name} /></a>
        <span className={`product-tag ${outOfStock ? "danger-tag" : ""}`}>
          {outOfStock ? "نفذت الكمية" : product.tag}
        </span>

        {saving > 0 && <span className="discount-pill">وفري {currency(saving)}</span>}

        <button className={`favorite-btn ${isFavorite ? "active" : ""}`} aria-label="Favorite" onClick={() => onToggleFavorite?.()}>
          <Heart size={19} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <div className="product-image-overlay">
          <button className="quick-view-btn" onClick={() => onView(product)}>
            <Eye size={18} />
            عرض سريع
          </button>
        </div>
      </div>

      <div className="product-body product-body-v11">
        <div className="product-top">
          <div>
            <span className="product-category">{product.category}</span>
            <a href={`#/product/${product.id}`} className="product-title-link"><h3>{product.name}</h3></a>
          </div>

          <span className="rating">
            <Star size={15} fill="currentColor" />
            {product.rating}
          </span>
        </div>

        <p className="product-description">{product.description}</p>

        <div className="product-meta-chips">
          <span>
            <Sparkles size={14} />
            {product.colors.slice(0, 2).join(" • ")}
          </span>
          <span>المقاسات: {product.sizes.join(" - ")}</span>
        </div>

        <div className="product-color-dots">
          {product.colors.slice(0, 4).map((color) => (
            <span key={color} title={color}>{color.slice(0,1)}</span>
          ))}
        </div>

        <div className="price-row">
          <strong>{currency(product.price)}</strong>
          <del>{currency(product.oldPrice)}</del>
        </div>

        <div className="stock-line">
          المتوفر: <strong>{product.stock ?? 0}</strong> قطعة {lowStock && <em>آخر قطع!</em>}
        </div>

        <div className="select-grid select-grid-v7">
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

        <div className="product-actions-grid">
          <a className="details-btn" href={`#/product/${product.id}`}>
            <Eye size={18} />
            التفاصيل
          </a>

          <button
            className="add-to-cart-btn compact"
            disabled={outOfStock}
            onClick={() => onAdd(product, selectedSize, selectedColor)}
          >
            <ShoppingBag size={18} />
            {outOfStock ? "نفذت" : "أضيفي للسلة"}
          </button>
        </div>
      </div>
    </article>
  );
}
