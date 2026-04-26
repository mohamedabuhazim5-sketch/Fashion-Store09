import { Search, SlidersHorizontal, Sparkles, LayoutGrid, BadgePercent } from "lucide-react";
import ProductCard from "./ProductCard";
import { categories } from "../data/defaultProducts";

export default function ProductsSection({
  filteredProducts,
  activeCategory,
  setActiveCategory,
  search,
  setSearch,
  sort,
  setSort,
  onAdd,
  onView,
  loading,
  totalCount,
  isFavorite,
  onToggleWishlist,
}) {
  return (
    <section id="products" className="products-section section-padding">
      <div className="container">
        <div className="products-shell products-shell-v11">
          <div className="section-head products-head-v7">
            <div>
              <span className="section-label">
                <Sparkles size={18} />
                Curated Collection
              </span>
              <h2>عرض المنتجات بشكل أجمل وأسهل</h2>
              <p>
                رتبنا الفلاتر وكروت المنتجات بشكل أنعم وأوضح، مع تحسين الهوامش والظلال علشان التجربة تبقى أهدى وأفخم.
              </p>
            </div>

            <div className="product-tools">
              <div className="search-box">
                <Search size={20} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ابحثي عن فستان، طقم، بلوزة..."
                />
              </div>

              <label className="sort-box">
                <SlidersHorizontal size={18} />
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="newest">الأحدث</option>
                  <option value="low">الأقل سعرًا</option>
                  <option value="high">الأعلى سعرًا</option>
                  <option value="rating">الأعلى تقييمًا</option>
                </select>
              </label>
            </div>
          </div>

          <div className="products-feature-chips">
            <span>بطاقات Premium</span>
            <span>بحث أسرع</span>
            <span>فلترة أوضح</span>
            <span>ستايل بناتي ناعم</span>
          </div>

          <div className="products-summary-row">
            <div className="summary-pill">
              <LayoutGrid size={18} />
              <span>{filteredProducts.length} منتج ظاهر الآن</span>
            </div>
            <div className="summary-pill soft">
              <BadgePercent size={18} />
              <span>{totalCount} منتج داخل المتجر</span>
            </div>
          </div>

          <div className="categories-row categories-row-v7">
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="products-loading">جاري تحميل المنتجات...</div>
          ) : filteredProducts.length ? (
            <div className="products-grid products-grid-v7">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={onAdd}
                  onView={onView}
                  isFavorite={isFavorite(product.id)}
                  onToggleFavorite={() => onToggleWishlist(product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-products">
              <h3>لا يوجد منتجات مطابقة للبحث</h3>
              <p>جربي كلمة بحث مختلفة أو اختاري قسم آخر.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
