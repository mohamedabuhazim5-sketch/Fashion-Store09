import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";

import ManagedImage from "./ManagedImage";
const tabs = [
  {
    key: "soft",
    title: "Soft Girl",
    headline: "ستايل ناعم بألوان هادية",
    text: "مناسب للبنات اللي بتحب الروز، الأوف وايت، والقطع البسيطة اللي شكلها شيك من غير مبالغة.",
    slot: "styleTabsSoft",
    points: ["ألوان هادئة", "فساتين ناعمة", "إكسسوارات بسيطة"],
  },
  {
    key: "casual",
    title: "Casual Chic",
    headline: "كاجوال بناتي عملي وشيك",
    text: "اختيارات مناسبة للجامعة والخروجات اليومية مع عرض بصري واضح يساعد العميلة تختار أسرع.",
    slot: "styleTabsCasual",
    points: ["أطقم سهلة", "خامات مريحة", "ستايل يومي"],
  },
  {
    key: "evening",
    title: "Evening",
    headline: "إطلالة أرق للخروجات والمناسبات",
    text: "ستايلات أكثر أنوثة وتفاصيل أوضح تناسب التصوير والخروجات المسائية والمناسبات الخفيفة.",
    slot: "styleTabsEvening",
    points: ["تفاصيل راقية", "ألوان بارزة", "لوك مميز"],
  },
];

export default function StyleTabsShowcase({ homeImages }) {
  const [activeKey, setActiveKey] = useState(tabs[0].key);
  const active = tabs.find((tab) => tab.key === activeKey) || tabs[0];

  return (
    <section className="style-tabs-showcase section-padding-sm">
      <div className="container style-tabs-shell">
        <div className="style-tabs-copy">
          <span className="section-label">
            <Sparkles size={17} />
            Style Finder
          </span>
          <h2>اختاري الستايل المناسب من غير حيرة</h2>
          <p>
            قسم تفاعلي جديد يعطي إحساس أن المتجر ذكي ومنظم، ويساعد العميلة تشوف الستايل الأقرب لها.
          </p>

          <div className="style-tabs-buttons">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={tab.key === activeKey ? "active" : ""}
                onClick={() => setActiveKey(tab.key)}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        <div className="style-tab-panel">
          <ManagedImage homeImages={homeImages} slot={active.slot} alt={active.title} />
          <div className="style-tab-content">
            <span>{active.title}</span>
            <h3>{active.headline}</h3>
            <p>{active.text}</p>

            <div className="style-tab-points">
              {active.points.map((point) => (
                <b key={point}>
                  <CheckCircle2 size={15} />
                  {point}
                </b>
              ))}
            </div>

            <a href="#products">
              شاهدي المنتجات
              <ArrowLeft size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
