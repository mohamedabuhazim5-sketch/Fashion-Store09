import { Search, Sparkles, Tag } from "lucide-react";

const hints = ["فساتين", "أطقم", "بلوزات", "كاجوال", "إكسسوارات", "روز", "لافندر"];

export default function SearchHints() {
  return (
    <section className="search-hints-section">
      <div className="container search-hints-shell">
        <div className="search-hints-title">
          <Search size={18} />
          <strong>اقتراحات بحث سريعة</strong>
        </div>

        <div className="search-hints-list">
          {hints.map((hint) => (
            <a href={`#products`} key={hint}>
              <Tag size={14} />
              {hint}
            </a>
          ))}
        </div>

        <span className="search-hints-note">
          <Sparkles size={15} />
          تساعد العميلة تبدأ البحث أسرع
        </span>
      </div>
    </section>
  );
}
