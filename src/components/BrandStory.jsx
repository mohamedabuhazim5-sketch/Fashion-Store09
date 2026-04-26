import { ArrowLeft, Crown, HeartHandshake, Sparkles } from "lucide-react";

import ManagedImage from "./ManagedImage";
export default function BrandStory({ homeImages }) {
  return (
    <section className="brand-story section-padding-sm">
      <div className="container brand-story-shell">
        <div className="brand-story-copy">
          <span className="section-label">
            <Crown size={17} />
            Brand Story
          </span>
          <h2>Fashion Store مش مجرد متجر… دي تجربة بناتي كاملة</h2>
          <p>
            النسخة دي بتقرب شكل المتجر من إحساس البراندات الكبيرة: مساحة بيضاء مريحة،
            صور قوية، أقسام منظمة، وواجهة تخلي العميلة تحس إن كل تفصيلة معمولة بذوق.
          </p>

          <div className="brand-story-points">
            <div>
              <Sparkles size={18} />
              <strong>تصميم ناعم</strong>
              <span>ألوان هادئة وتفاصيل راقية</span>
            </div>
            <div>
              <HeartHandshake size={18} />
              <strong>ثقة أسرع</strong>
              <span>عرض واضح وتجربة شراء مباشرة</span>
            </div>
          </div>

          <a href="#products" className="brand-story-link">
            اكتشفي المنتجات
            <ArrowLeft size={17} />
          </a>
        </div>

        <div className="brand-story-media">
          <div className="brand-story-main-image">
            <ManagedImage homeImages={homeImages} slot="brandStoryMain" alt="Fashion brand story" />
          </div>

          <div className="brand-story-small-card">
            <ManagedImage homeImages={homeImages} slot="brandStorySmall" alt="Fashion detail" />
            <div>
              <strong>Soft feminine mood</strong>
              <span>إحساس براند بناتي حقيقي</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
