import { ArrowLeft, BadgeCheck, Sparkles } from "lucide-react";

import ManagedImage from "./ManagedImage";
const columns = [
  {
    title: "Soft Look",
    slot: "styleCompareOne",
    points: ["ألوان هادئة", "تفاصيل ناعمة", "خروجات يومية"],
  },
  {
    title: "Chic Look",
    slot: "styleCompareTwo",
    points: ["كاجوال شيك", "عملي ومريح", "سهل التنسيق"],
  },
  {
    title: "Evening Look",
    slot: "styleCompareThree",
    points: ["مناسبات", "إطلالة أوضح", "ألوان مميزة"],
  },
];

export default function StyleCompare({ homeImages }) {
  return (
    <section className="style-compare section-padding-sm">
      <div className="container">
        <div className="section-head simple">
          <div>
            <span className="section-label">
              <Sparkles size={17} />
              Compare Your Style
            </span>
            <h2>قارني الستايلات واختاري الأقرب لكِ</h2>
            <p>قسم بصري يساعد العميلة تفهم الفرق بين الستايلات، ويدفعها لتصفح المنتجات بثقة.</p>
          </div>
        </div>

        <div className="style-compare-grid">
          {columns.map((column) => (
            <article className="style-compare-card" key={column.title}>
              <ManagedImage homeImages={homeImages} slot={column.slot} alt={column.title} />
              <div className="style-compare-body">
                <h3>{column.title}</h3>
                <div>
                  {column.points.map((point) => (
                    <span key={point}>
                      <BadgeCheck size={15} />
                      {point}
                    </span>
                  ))}
                </div>
                <a href="#products">
                  تسوقي الستايل
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
