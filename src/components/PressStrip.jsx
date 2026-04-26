import { BadgeCheck, Heart, Sparkles, Star } from "lucide-react";

const items = [
  { icon: <Star size={17} />, text: "4.9 تقييم تجربة التسوق" },
  { icon: <Heart size={17} />, text: "واجهة بناتي ناعمة" },
  { icon: <BadgeCheck size={17} />, text: "طلب منظم على واتساب" },
  { icon: <Sparkles size={17} />, text: "ستايل براند احترافي" },
];

export default function PressStrip() {
  return (
    <section className="press-strip-section">
      <div className="container press-strip">
        {items.map((item) => (
          <div className="press-strip-item" key={item.text}>
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
