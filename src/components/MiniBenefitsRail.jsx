import { BadgePercent, Heart, PackageCheck, Truck } from "lucide-react";

const benefits = [
  { icon: <Heart size={18} />, title: "ستايل بناتي", text: "ألوان ناعمة وتصميم راقي" },
  { icon: <BadgePercent size={18} />, title: "عروض وكوبونات", text: "خصومات واضحة داخل السلة" },
  { icon: <PackageCheck size={18} />, title: "طلب منظم", text: "كل التفاصيل بتتبعت واتساب" },
  { icon: <Truck size={18} />, title: "شحن سريع", text: "تأكيد حسب العنوان" },
];

export default function MiniBenefitsRail() {
  return (
    <section className="mini-benefits-rail">
      <div className="container mini-benefits-grid">
        {benefits.map((item) => (
          <article className="mini-benefit-card" key={item.title}>
            <span>{item.icon}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
