import { ArrowLeft, Clock3, Sparkles } from "lucide-react";

export default function NewDropsBanner() {
  return (
    <section className="new-drops-banner section-padding-sm">
      <div className="container new-drops-shell">
        <div className="new-drops-copy">
          <span>
            <Sparkles size={17} />
            New Drops Every Week
          </span>
          <h2>نزلات جديدة بستايل بناتي ناعم</h2>
          <p>
            بانر مخصص للنزلات الجديدة يخلي الصفحة الرئيسية أقوى تسويقيًا، ويشجع العميلة تتابع الجديد والعروض.
          </p>
          <a href="#new-arrivals">
            شوفي وصل حديثًا
            <ArrowLeft size={17} />
          </a>
        </div>

        <div className="new-drops-card">
          <div>
            <Clock3 size={20} />
            <strong>Weekly Drop</strong>
            <span>موديلات جديدة وعروض متجددة</span>
          </div>
        </div>
      </div>
    </section>
  );
}
