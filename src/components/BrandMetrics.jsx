import { Crown, HeartHandshake, PackageCheck, Sparkles } from "lucide-react";

const items = [
  {
    icon: <Sparkles size={19} />,
    value: "Soft Luxury",
    label: "ستايل بناتي أنعم وأكثر أناقة",
  },
  {
    icon: <PackageCheck size={19} />,
    value: "+120",
    label: "منتج بتنسيق أوضح وعرض أجمل",
  },
  {
    icon: <HeartHandshake size={19} />,
    value: "+300",
    label: "عميلة سعيدة بتجربة التسوق",
  },
  {
    icon: <Crown size={19} />,
    value: "Premium UI",
    label: "شكل واجهة أقرب لبراند موضة حقيقي",
  },
];

export default function BrandMetrics() {
  return (
    <section className="brand-metrics-section">
      <div className="container brand-metrics-grid">
        {items.map((item) => (
          <article className="brand-metric-card" key={item.value + item.label}>
            <span className="brand-metric-icon">{item.icon}</span>
            <strong>{item.value}</strong>
            <p>{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
