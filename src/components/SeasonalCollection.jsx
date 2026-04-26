import { ArrowLeft, Flower2, Sparkles } from "lucide-react";

import ManagedImage from "./ManagedImage";
const items = [
  {
    title: "Pink Spring Mood",
    text: "مجموعة ناعمة بألوان وردي وأوف وايت تناسب الخروجات الهادية.",
    slot: "seasonalOne",
  },
  {
    title: "Soft Casual Edit",
    text: "اختيارات كاجوال شيك وسهلة التنسيق للجامعة والمشاوير اليومية.",
    slot: "seasonalTwo",
  },
  {
    title: "Evening Feminine",
    text: "ستايلات أرق للمناسبات الخفيفة والسهرات البسيطة.",
    slot: "seasonalThree",
  },
];

export default function SeasonalCollection({ homeImages }) {
  return (
    <section className="seasonal-collection section-padding-sm">
      <div className="container">
        <div className="section-head simple">
          <div>
            <span className="section-label">
              <Flower2 size={17} />
              Seasonal Collection
            </span>
            <h2>مجموعات موسمية بشكل جذاب</h2>
            <p>قسم جديد يعرض الستايلات حسب الإحساس والموسم، ويدي الصفحة الرئيسية شكل أقرب لمتاجر البراندات.</p>
          </div>
        </div>

        <div className="seasonal-grid">
          {items.map((item, index) => (
            <article className={`seasonal-card seasonal-${index + 1}`} key={item.title}>
              <ManagedImage homeImages={homeImages} slot={item.slot} alt={item.title} />
              <div className="seasonal-card-shade" />
              <div className="seasonal-card-content">
                <span>
                  <Sparkles size={15} />
                  Fashion Edit
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href="#products">
                  تسوقي المجموعة
                  <ArrowLeft size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
