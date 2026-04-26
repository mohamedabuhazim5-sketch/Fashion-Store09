import { BadgePercent, Heart, MessageCircle, ShoppingBag } from "lucide-react";
import { STORE } from "../config/store";

export default function ConversionDock({ cartCount = 0, wishlistCount = 0, onCartOpen }) {
  return (
    <div className="conversion-dock">
      <a href="#products">
        <ShoppingBag size={16} />
        المنتجات
      </a>
      <button onClick={onCartOpen}>
        <ShoppingBag size={16} />
        السلة {cartCount > 0 && <b>{cartCount}</b>}
      </button>
      <a href="#/wishlist">
        <Heart size={16} />
        المفضلة {wishlistCount > 0 && <b>{wishlistCount}</b>}
      </a>
      <a href={`https://wa.me/${STORE.whatsappNumber}`} target="_blank" rel="noreferrer">
        <MessageCircle size={16} />
        واتساب
      </a>
      <span>
        <BadgePercent size={16} />
        FASHION10
      </span>
    </div>
  );
}
