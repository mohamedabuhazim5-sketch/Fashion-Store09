import { Bell, MessageCircle, PackageSearch, Sparkles } from "lucide-react";
import { STORE } from "../config/store";

export default function BackInStockAlert() {
  return (
    <section className="back-stock section-padding-sm">
      <div className="container back-stock-shell">
        <div>
          <span>
            <PackageSearch size={17} />
            Back In Stock
          </span>
          <h2>لو منتج خلص، العميلة تقدر تسألنا عليه</h2>
          <p>
            القسم ده بيقلل خسارة العميلة المهتمة بمنتج خلص، ويدفعها تتواصل على واتساب بدل ما تخرج من المتجر.
          </p>
        </div>

        <div className="back-stock-actions">
          <a
            href={`https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent("عايزة أعرف المنتجات اللي هترجع تاني للمخزون")}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            اسألي واتساب
          </a>
          <span>
            <Bell size={18} />
            رجوع المخزون قريبًا
          </span>
          <span>
            <Sparkles size={18} />
            New drops weekly
          </span>
        </div>
      </div>
    </section>
  );
}
