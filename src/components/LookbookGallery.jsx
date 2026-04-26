import { ArrowLeft, Camera, Heart, Sparkles } from "lucide-react";

import ManagedImage from "./ManagedImage";
const cards = [
  {
    title: "Soft Pink Edit",
    text: "إلهام بصري أقوى يخلي الصفحة الرئيسية تحسسك إنك داخل براند أزياء فعليًا.",
    slot: "lookbookOne",
    wide: true,
    icon: <Sparkles size={17} />,
  },
  {
    title: "Daily Chic",
    text: "لوك يومي أنيق ومريح بستايل بناتي جذاب.",
    slot: "lookbookTwo",
    icon: <Heart size={17} />,
  },
  {
    title: "Studio Mood",
    text: "قسم Lookbook يرفع إحساس الفخامة ويعرض البراند بشكل أجمل.",
    slot: "lookbookThree",
    icon: <Camera size={17} />,
  },
];

export default function LookbookGallery({ homeImages }) {
  return (
    <section className="lookbook-gallery section-padding-sm">
      <div className="container">
        <div className="section-head simple lookbook-head">
          <div>
            <span className="section-label">
              <Camera size={17} />
              Lookbook Aesthetic
            </span>
            <h2>شكل أقرب لبراند أزياء بناتي</h2>
            <p>أضفنا قسم بصري أقوى يدي إحساس أنعم وأفخم ويكسر شكل المتجر التقليدي.</p>
          </div>
        </div>

        <div className="lookbook-grid">
          {cards.map((card) => (
            <article className={`lookbook-card ${card.wide ? "wide" : ""}`} key={card.title}>
              <ManagedImage homeImages={homeImages} slot={card.slot} alt={card.title} />
              <div className="lookbook-shade" />
              <div className="lookbook-content">
                <span>{card.icon}{card.title}</span>
                <p>{card.text}</p>
                <a href="#products">
                  استكشفي الآن
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
