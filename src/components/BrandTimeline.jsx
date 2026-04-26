import { Camera, Heart, MessageCircle, PackageCheck, Sparkles } from "lucide-react";

const steps = [
  {
    icon: <Camera size={20} />,
    title: "إلهام بصري",
    text: "صور وأقسام تساعد العميلة تتخيل اللوك.",
  },
  {
    icon: <Heart size={20} />,
    title: "اختيار ومفضلة",
    text: "تحفظ المنتجات وتقارن بينها بسهولة.",
  },
  {
    icon: <MessageCircle size={20} />,
    title: "واتساب منظم",
    text: "الطلب يتبعت برسالة واضحة بكل التفاصيل.",
  },
  {
    icon: <PackageCheck size={20} />,
    title: "تأكيد وتسليم",
    text: "تأكيد الشحن والحالة من لوحة التحكم.",
  },
];

export default function BrandTimeline() {
  return (
    <section className="brand-timeline section-padding-sm">
      <div className="container brand-timeline-shell">
        <div className="brand-timeline-head">
          <span className="section-label light-pill">
            <Sparkles size={17} />
            Brand Flow
          </span>
          <h2>تجربة المتجر بقت متصلة من أول صورة لحد الطلب</h2>
          <p>كل قسم في الصفحة ليه دور: جذب، ثقة، اختيار، ثم تحويل الطلب لواتساب.</p>
        </div>

        <div className="brand-timeline-grid">
          {steps.map((step, index) => (
            <article className="brand-timeline-card" key={step.title}>
              <small>{String(index + 1).padStart(2, "0")}</small>
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
