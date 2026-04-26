import { Crown, PackagePlus, ShoppingBag, Sparkles } from "lucide-react";

export default function AdminHeroUpgrade({ productsCount = 0, ordersCount = 0, newOrdersCount = 0 }) {
  return (
    <section className="admin-hero-upgrade">
      <div>
        <span>
          <Crown size={16} />
          Fashion Store Admin
        </span>
        <h2>لوحة تحكم أنضف وأسرع لإدارة Fashion Store</h2>
        <p>تابعي المنتجات والطلبات والحالات من مكان واحد بتصميم أوضح وأنعم.</p>
      </div>

      <div className="admin-hero-mini-stats">
        <article>
          <PackagePlus size={18} />
          <strong>{productsCount}</strong>
          <small>منتجات</small>
        </article>
        <article>
          <ShoppingBag size={18} />
          <strong>{ordersCount}</strong>
          <small>طلبات</small>
        </article>
        <article>
          <Sparkles size={18} />
          <strong>{newOrdersCount}</strong>
          <small>جديدة</small>
        </article>
      </div>
    </section>
  );
}
