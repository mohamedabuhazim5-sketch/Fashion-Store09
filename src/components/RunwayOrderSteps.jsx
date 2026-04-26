import { MessageCircle, PackageCheck, Ruler, ShoppingBag, Sparkles } from "lucide-react";
import { STORE } from "../config/store";

const steps = [
  {
    icon: <ShoppingBag size={21} />,
    title: "تصفحي",
    text: "شوفي المنتجات والأقسام والعروض من الصفحة الرئيسية.",
  },
  {
    icon: <Ruler size={21} />,
    title: "اختاري",
    text: "حددي المقاس واللون وأضيفي المنتج للسلة أو المفضلة.",
  },
  {
    icon: <MessageCircle size={21} />,
    title: "ارسلي",
    text: "الأوردر يتسجل ويتبعت واتساب برسالة منظمة.",
  },
  {
    icon: <PackageCheck size={21} />,
    title: "استلمي",
    text: "نأكد التفاصيل والتوصيل حسب العنوان.",
  },
];

export default function RunwayOrderSteps() {
  return (
    <section className="runway-steps section-padding-sm">
      <div className="container runway-steps-shell">
        <div className="runway-steps-head">
          <span className="section-label light-pill">
            <Sparkles size={17} />
            From Look to Order
          </span>
          <h2>رحلة الطلب بقت واضحة وأنيقة</h2>
          <p>من أول اختيار الستايل لحد تأكيد الطلب على واتساب، كل خطوة معروضة بشكل بسيط ومريح.</p>
        </div>

        <div className="runway-steps-grid">
          {steps.map((step, index) => (
            <article className="runway-step-card" key={step.title}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <span>{step.icon}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <a
          className="runway-whatsapp"
          href={`https://wa.me/${STORE.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={18} />
          اسألي على واتساب
        </a>
      </div>
    </section>
  );
}
