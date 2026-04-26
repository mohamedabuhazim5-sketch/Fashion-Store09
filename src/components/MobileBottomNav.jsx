import { Heart, Home, PackageSearch, ShoppingBag, Tag } from "lucide-react";

export default function MobileBottomNav({ cartCount = 0, wishlistCount = 0, onCartOpen }) {
  return (
    <nav className="mobile-bottom-nav">
      <a href="#home"><Home size={19} /><span>الرئيسية</span></a>
      <a href="#daily-deals"><Tag size={19} /><span>عروض</span></a>
      <a href="#/wishlist" className="mobile-bottom-badge-wrap">
        <Heart size={19} />
        {wishlistCount > 0 && <b>{wishlistCount}</b>}
        <span>مفضلة</span>
      </a>
      <button onClick={onCartOpen} className="mobile-bottom-badge-wrap">
        <ShoppingBag size={19} />
        {cartCount > 0 && <b>{cartCount}</b>}
        <span>السلة</span>
      </button>
      <a href="#/track"><PackageSearch size={19} /><span>تتبع</span></a>
    </nav>
  );
}
