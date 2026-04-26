import { ArrowLeft, Gift, Heart, Sparkles } from "lucide-react";

const guides = [
  {
    title: "هدية ناعمة لصاحبتك",
    text: "اختيارات لطيفة وسعرها مناسب وتبان شيك جدًا.",
    tag: "Under 500 EGP",
    icon: <Gift size={18} />,
  },
  {
    title: "لوك عيد ميلاد",
    text: "قطع جذابة مناسبة للمناسبات والصور والخروجات.",
    tag: "Birthday Look",
    icon: <Sparkles size={18} />,
  },
  {
    title: "اختيار رومانسي",
    text: "ألوان وردي ولافندر وإحساس أنثوي هادي.",
    tag: "Soft Mood",
    icon: <Heart size={18} />,
  },
];

export default function GiftGuide() {
  return (
    <section className="gift-guide section-padding-sm">
      <div className="container">
        <div className="section-head simple">
          <div>
            <span className="section-label">
              <Gift size={17} />
              Gift Guide
            </span>
            <h2>دليل هدايا بشكل بناتي</h2>
            <p>قسم يساعد العميلة تختار حسب المناسبة أو الميزانية، ويزود إحساس المتجر كبراند منظم.</p>
          </div>
        </div>

        <div className="gift-guide-grid">
          {guides.map((guide) => (
            <article className="gift-guide-card" key={guide.title}>
              <span>{guide.icon}</span>
              <small>{guide.tag}</small>
              <h3>{guide.title}</h3>
              <p>{guide.text}</p>
              <a href="#products">
                شاهدي الاختيارات
                <ArrowLeft size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
