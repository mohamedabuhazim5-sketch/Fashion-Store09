import {
  ChevronDown,
  Heart,
  Menu,
  Settings,
  Shirt,
  ShoppingBag,
  Sparkles,
  Tag,
  Truck,
  X,
} from "lucide-react";
import { STORE } from "../config/store";

export default function Header({ cartCount, wishlistCount = 0, onCartOpen, menuOpen, setMenuOpen }) {
  const links = [
    { href: "#home", label: "الرئيسية" },
    { href: "#products", label: "المنتجات" },
    { href: "#/wishlist", label: "المفضلة" },
    { href: "#/track", label: "تتبع الطلب" },
    { href: "#contact", label: "تواصل معنا" },
  ];

  const megaItems = [
    {
      icon: <Sparkles size={19} />,
      title: "وصل حديثًا",
      text: "آخر الموديلات البناتي بشكل مرتب وواضح.",
      href: "#new-arrivals",
    },
    {
      icon: <Tag size={19} />,
      title: "عروض اليوم",
      text: "خصومات وكوبونات وعروض يومية.",
      href: "#daily-deals",
    },
    {
      icon: <Heart size={19} />,
      title: "الأكثر مبيعًا",
      text: "القطع المحبوبة والمرشحة.",
      href: "#best-sellers",
    },
    {
      icon: <Truck size={19} />,
      title: "تتبع الطلب",
      text: "اعرفي حالة طلبك بسرعة.",
      href: "#/track",
    },
  ];

  return (
    <header className="site-header site-header-v12">
      <nav className="navbar container navbar-v11 navbar-v12">
        <a href="#/" className="brand brand-v12">
          <span className="brand-icon">
            <Shirt size={25} />
          </span>
          <span>
            <strong>{STORE.name}</strong>
            <small>{STORE.slogan}</small>
          </span>
        </a>

        <div className="desktop-links desktop-links-v12">
          {links.slice(0, 2).map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}

          <div className="mega-menu-wrap">
            <button className="mega-trigger">
              الأقسام والعروض
              <ChevronDown size={16} />
            </button>

            <div className="mega-panel">
              <div className="mega-panel-head">
                <span>Fashion Store</span>
                <strong>اكتشفي الأقسام والعروض</strong>
              </div>

              <div className="mega-grid">
                {megaItems.map((item) => (
                  <a href={item.href} className="mega-item" key={item.title}>
                    <span>{item.icon}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <small>{item.text}</small>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {links.slice(2).map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a className="wishlist-mini-link" href="#/wishlist" title="المفضلة">
            <Heart size={20} />
            {wishlistCount > 0 && <span>{wishlistCount}</span>}
          </a>

          <a className="admin-mini-link" href="#/admin" title="لوحة التحكم">
            <Settings size={20} />
          </a>

          <button className="cart-btn" onClick={onCartOpen} aria-label="Open cart">
            <ShoppingBag size={22} />
            {cartCount > 0 && <span>{cartCount}</span>}
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu mobile-menu-v12">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#daily-deals" onClick={() => setMenuOpen(false)}>عروض اليوم</a>
          <a href="#new-arrivals" onClick={() => setMenuOpen(false)}>وصل حديثًا</a>
          <a href="#/admin" onClick={() => setMenuOpen(false)}>لوحة التحكم</a>
        </div>
      )}
    </header>
  );
}
