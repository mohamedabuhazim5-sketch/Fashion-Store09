import { Crown, Gem, Heart, Sparkles, Star } from "lucide-react";

const items = [
  { icon: <Sparkles size={16} />, text: "Premium Girly Fashion" },
  { icon: <Heart size={16} />, text: "Soft Pink Aesthetic" },
  { icon: <Crown size={16} />, text: "Luxury Product Cards" },
  { icon: <Gem size={16} />, text: "Fashion Store Experience" },
  { icon: <Star size={16} />, text: "WhatsApp Orders Ready" },
];

export default function LuxuryMarquee() {
  return (
    <section className="luxury-marquee-section">
      <div className="luxury-marquee-track">
        {[...items, ...items, ...items].map((item, index) => (
          <div className="luxury-marquee-item" key={`${item.text}-${index}`}>
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
