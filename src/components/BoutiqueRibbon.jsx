import { ArrowLeft, Crown, Gem, Sparkles } from "lucide-react";

import ManagedImage from "./ManagedImage";
const cards = [
  {
    icon: <Crown size={18} />,
    title: "Premium Boutique Feel",
    text: "شكل المتجر أقرب لبوتيك أزياء بناتي راقٍ، مش مجرد صفحة منتجات.",
    slot: "boutiqueOne",
  },
  {
    icon: <Gem size={18} />,
    title: "Curated Pieces",
    text: "عرض المنتجات بترتيب بصري يساعد العميلة تختار بسرعة وبثقة.",
    slot: "boutiqueTwo",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Soft Girly Details",
    text: "فراغات، ألوان، وظلال أنعم تخلي الواجهة مريحة للعين.",
    slot: "boutiqueThree",
  },
];

export default function BoutiqueRibbon({ homeImages }) {
  return (
    <section className="boutique-ribbon section-padding-sm">
      <div className="container boutique-ribbon-grid">
        {cards.map((card) => (
          <article className="boutique-ribbon-card" key={card.title}>
            <ManagedImage homeImages={homeImages} slot={card.slot} alt={card.title} />
            <div className="boutique-ribbon-content">
              <span>{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <a href="#products">
                تسوقي الآن
                <ArrowLeft size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
