import { PackageCheck, Ruler, ShieldCheck, Sparkles } from "lucide-react";

const items = [
  {
    icon: <Ruler size={20} />,
    title: "مقاسات أوضح",
    text: "دليل المقاسات وألوان المنتج موجودين بشكل واضح قبل الطلب.",
  },
  {
    icon: <PackageCheck size={20} />,
    title: "طلب منظم",
    text: "كل أوردر بيتسجل وبيتبعت برسالة واتساب فيها كل التفاصيل.",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "ثقة أكبر",
    text: "أقسام آراء وسياسات وشحن تعطي العميلة اطمئنان قبل الشراء.",
  },
];

export default function QualityPromise() {
  return (
    <section className="quality-promise section-padding-sm">
      <div className="container quality-promise-shell">
        <div className="quality-promise-head">
          <span className="section-label">
            <Sparkles size={17} />
            Quality Promise
          </span>
          <h2>وعد Fashion Store للعميلة</h2>
          <p>تجربة واضحة، شكل راقٍ، وخطوات طلب سهلة من أول اختيار المنتج لحد تأكيده.</p>
        </div>

        <div className="quality-promise-grid">
          {items.map((item) => (
            <article className="quality-promise-card" key={item.title}>
              <span>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
