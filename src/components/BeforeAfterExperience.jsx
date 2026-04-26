import { ArrowLeft, BadgeCheck, Sparkles } from "lucide-react";

const before = [
  "عرض منتجات عادي",
  "أقسام كثيرة بدون توجيه",
  "ثقة أقل قبل الطلب",
];

const after = [
  "عرض Premium للمنتجات",
  "أقسام تساعد العميلة تختار",
  "ثقة أعلى مع مقاسات وسياسات وآراء",
];

export default function BeforeAfterExperience() {
  return (
    <section className="before-after section-padding-sm">
      <div className="container before-after-shell">
        <div className="before-after-head">
          <span className="section-label light-pill">
            <Sparkles size={17} />
            Store Upgrade
          </span>
          <h2>الفرق في تجربة المتجر بقى واضح</h2>
          <p>
            أضفنا أقسام كثيرة لكن بشكل منظم علشان المتجر يبان كبراند، مش صفحة منتجات فقط.
          </p>
        </div>

        <div className="before-after-grid">
          <article className="before-after-card muted">
            <h3>قبل</h3>
            {before.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </article>

          <article className="before-after-card active">
            <h3>بعد V22</h3>
            {after.map((item) => (
              <p key={item}>
                <BadgeCheck size={16} />
                {item}
              </p>
            ))}
            <a href="#products">
              شوفي النتيجة
              <ArrowLeft size={16} />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
