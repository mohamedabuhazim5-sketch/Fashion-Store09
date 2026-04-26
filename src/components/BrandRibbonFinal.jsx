import { Crown, Gem, Heart, Sparkles } from "lucide-react";

const items = [
  { icon: <Heart size={16} />, text: "Soft feminine shopping" },
  { icon: <Crown size={16} />, text: "Premium boutique layout" },
  { icon: <Gem size={16} />, text: "Curated product sections" },
  { icon: <Sparkles size={16} />, text: "WhatsApp-ready orders" },
];

export default function BrandRibbonFinal() {
  return (
    <section className="brand-ribbon-final">
      <div className="brand-ribbon-track">
        {[...items, ...items, ...items].map((item, index) => (
          <div className="brand-ribbon-item" key={`${item.text}-${index}`}>
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
