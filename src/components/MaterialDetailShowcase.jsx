import { Gem, Sparkles, Shirt, Wand2 } from "lucide-react";

import ManagedImage from "./ManagedImage";
const details = [
  {
    icon: <Shirt size={20} />,
    title: "تفاصيل الخامة",
    text: "عرض بصري يوضح اهتمام البراند بالخامة والراحة قبل الشراء.",
  },
  {
    icon: <Gem size={20} />,
    title: "لمسة Premium",
    text: "مساحات أنظف وظلال أنعم تخلي المنتج يبان أغلى وأكثر أناقة.",
  },
  {
    icon: <Wand2 size={20} />,
    title: "تنسيق أسهل",
    text: "كل قسم مصمم يساعد العميلة تتخيل اللوك وتطلب بسرعة.",
  },
];

export default function MaterialDetailShowcase({ homeImages }) {
  return (
    <section className="material-detail section-padding-sm">
      <div className="container material-detail-shell">
        <div className="material-detail-media">
          <ManagedImage homeImages={homeImages} slot="materialDetail" alt="Material detail" />
          <div className="material-detail-floating">
            <Sparkles size={16} />
            Soft fabric feeling
          </div>
        </div>

        <div className="material-detail-content">
          <span className="section-label">
            <Gem size={17} />
            Material Details
          </span>
          <h2>تفاصيل الخامة واللوك بشكل أفخم</h2>
          <p>
            قسم جديد يعطي إحساس إن المتجر مهتم بالتفاصيل الصغيرة، وده بيفرق جدًا في متاجر الملابس البناتي.
          </p>

          <div className="material-detail-list">
            {details.map((item) => (
              <article className="material-detail-card" key={item.title}>
                <span>{item.icon}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
