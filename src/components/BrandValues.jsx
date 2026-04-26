import { Gem, HeartHandshake, Palette, Sparkles } from "lucide-react";

const values = [
  {
    icon: <Palette size={20} />,
    title: "ستايل موحد",
    text: "ألوان وهوية بصرية ثابتة تخلي البراند واضح.",
  },
  {
    icon: <Gem size={20} />,
    title: "عرض Premium",
    text: "كروت وبانرات وأقسام أقرب لمتاجر الموضة.",
  },
  {
    icon: <HeartHandshake size={20} />,
    title: "ثقة العميلة",
    text: "مقاسات وآراء وسياسات واتساب بشكل واضح.",
  },
  {
    icon: <Sparkles size={20} />,
    title: "تجربة بناتي",
    text: "واجهة ناعمة ومريحة للعين على الموبايل والديسكتوب.",
  },
];

export default function BrandValues() {
  return (
    <section className="brand-values section-padding-sm">
      <div className="container brand-values-shell">
        {values.map((value) => (
          <article className="brand-value-card" key={value.title}>
            <span>{value.icon}</span>
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
