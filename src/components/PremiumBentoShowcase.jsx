import { ArrowLeft, Crown, Heart, Sparkles } from "lucide-react";

import ManagedImage from "./ManagedImage";
const cards = [
  {
    title: "Luxury Product Cards",
    text: "كروت منتجات أنعم، صور أكبر، وتفاصيل واضحة تساعد العميلة تختار بسرعة.",
    slot: "bentoOne",
    className: "large",
    icon: <Crown size={17} />,
  },
  {
    title: "Soft Looks",
    text: "إحساس بناتي هادي ومريح للعين.",
    slot: "bentoTwo",
    className: "tall",
    icon: <Heart size={17} />,
  },
  {
    title: "WhatsApp Ready",
    text: "طلب أسرع ورسالة منظمة للعميلة.",
    slot: "bentoThree",
    className: "",
    icon: <Sparkles size={17} />,
  },
];

export default function PremiumBentoShowcase({ homeImages }) {
  return (
    <section className="premium-bento section-padding-sm">
      <div className="container">
        <div className="section-head simple premium-bento-head">
          <div>
            <span className="section-label">
              <Crown size={17} />
              Premium Layout
            </span>
            <h2>تجربة عرض أفخم وأقرب للبراندات</h2>
            <p>قسم جديد بتوزيع Bento يعطي شكل مودرن وراقي ويكسر رتابة الصفحة.</p>
          </div>
        </div>

        <div className="premium-bento-grid">
          {cards.map((card) => (
            <article className={`premium-bento-card ${card.className}`} key={card.title}>
              <ManagedImage homeImages={homeImages} slot={card.slot} alt={card.title} />
              <div className="premium-bento-overlay" />
              <div className="premium-bento-content">
                <span>{card.icon}{card.title}</span>
                <p>{card.text}</p>
                <a href="#products">
                  ابدئي التسوق
                  <ArrowLeft size={16} />
                </a>
              </div>
            </article>
          ))}

          <article className="premium-bento-text-card">
            <span className="section-label">Fashion Store Mood</span>
            <h3>أهم هدف: العميلة تحب شكل المتجر قبل ما تختار المنتج</h3>
            <p>
              عشان كده ضفنا تدرجات أهدى، مساحات أوسع، hover effects أنعم،
              وأقسام بصرية تخلي المتجر يبان أقوى.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
