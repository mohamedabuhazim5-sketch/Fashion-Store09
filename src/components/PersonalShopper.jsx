import { MessageCircle, Sparkles, Star, Wand2 } from "lucide-react";
import { STORE } from "../config/store";

const tips = [
  "ابعتيلنا المناسبة أو الستايل اللي عايزاه",
  "نرشح لكِ المقاس واللون الأقرب",
  "نجهز لكِ رسالة الطلب على واتساب",
];

export default function PersonalShopper() {
  return (
    <section className="personal-shopper section-padding-sm">
      <div className="container personal-shopper-shell">
        <div className="personal-shopper-copy">
          <span className="section-label">
            <Wand2 size={17} />
            Personal Shopper
          </span>
          <h2>مساعدة شخصية لاختيار اللوك المناسب</h2>
          <p>
            قسم جديد يخلي العميلة تحس إن المتجر بيخدمها بذكاء: تقدر تسأل عن المقاس، اللون،
            أو اللوك المناسب قبل ما تطلب.
          </p>

          <div className="personal-shopper-tips">
            {tips.map((tip) => (
              <span key={tip}>
                <Star size={14} fill="currentColor" />
                {tip}
              </span>
            ))}
          </div>
        </div>

        <div className="personal-shopper-card">
          <Sparkles size={28} />
          <strong>مش عارفة تختاري؟</strong>
          <p>ابعتيلنا صورتك أو المناسبة، ونرشح لكِ أنسب ستايل من المنتجات المتاحة.</p>
          <a
            href={`https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent("محتاجة مساعدة في اختيار لوك مناسب من Fashion Store")}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            اطلبي ترشيح على واتساب
          </a>
        </div>
      </div>
    </section>
  );
}
