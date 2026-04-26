import { ArrowLeft, Crown, Sparkles } from "lucide-react";

import ManagedImage from "./ManagedImage";
export default function MagazineLookBanner({ homeImages }) {
  return (
    <section className="magazine-look section-padding-sm">
      <div className="container magazine-look-shell">
        <div className="magazine-look-copy">
          <span>
            <Crown size={17} />
            Magazine Look
          </span>
          <h2>شكل الصفحة بقى أقرب لكتالوج أزياء بناتي</h2>
          <p>
            بنرات أكبر، صور أوضح، ومحتوى بصري يخلي المتجر يبان كبراند منظم ومريح للعين.
          </p>
          <a href="#products">
            شوفي المنتجات
            <ArrowLeft size={17} />
          </a>
        </div>

        <div className="magazine-look-media">
          <article className="magazine-cover-card">
            <ManagedImage homeImages={homeImages} slot="magazineCover" alt="Magazine cover" />
            <div>
              <small>Fashion Store</small>
              <strong>Soft Premium Edit</strong>
            </div>
          </article>

          <article className="magazine-side-card">
            <Sparkles size={20} />
            <strong>Curated girly looks</strong>
            <p>كل قسم معمول علشان يساعد العميلة تختار بسرعة وبثقة.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
