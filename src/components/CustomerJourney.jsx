import { BadgeCheck, Heart, MessageCircle, PackageCheck, Search, ShoppingBag } from "lucide-react";

const steps = [
  { icon: <Search size={19} />, title: "تكتشف", text: "العميلة تشوف البانرات والأقسام والستايلات." },
  { icon: <Heart size={19} />, title: "تحفظ", text: "تضيف المنتجات للمفضلة لو محتارة." },
  { icon: <ShoppingBag size={19} />, title: "تطلب", text: "تضيف للسلة وتكتب بياناتها بسهولة." },
  { icon: <MessageCircle size={19} />, title: "تؤكد", text: "الطلب يتبعت واتساب برسالة منظمة." },
  { icon: <PackageCheck size={19} />, title: "تستلم", text: "تأكيد الشحن والتوصيل حسب العنوان." },
];

export default function CustomerJourney() {
  return (
    <section className="customer-journey section-padding-sm">
      <div className="container customer-journey-shell">
        <div className="customer-journey-head">
          <span className="section-label light-pill">
            <BadgeCheck size={17} />
            Customer Journey
          </span>
          <h2>رحلة العميلة داخل المتجر أوضح</h2>
          <p>كل خطوة من التصفح للطلب بقت مفهومة، وده بيخلي المتجر أسهل وأكثر إقناعًا.</p>
        </div>

        <div className="customer-journey-line">
          {steps.map((step, index) => (
            <article className="journey-step" key={step.title}>
              <small>{index + 1}</small>
              <span>{step.icon}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
