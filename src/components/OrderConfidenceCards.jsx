import { BadgeCheck, CreditCard, MessageCircle, PackageCheck, ShieldCheck } from "lucide-react";

const cards = [
  {
    icon: <MessageCircle size={20} />,
    title: "تأكيد على واتساب",
    text: "كل طلب يتراجع ويتأكد قبل التنفيذ.",
  },
  {
    icon: <PackageCheck size={20} />,
    title: "تفاصيل واضحة",
    text: "المنتجات، المقاس، اللون، والسعر يظهروا في الطلب.",
  },
  {
    icon: <CreditCard size={20} />,
    title: "مرونة في الاتفاق",
    text: "تفاصيل الدفع والشحن تتأكد حسب العنوان.",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "ثقة أعلى",
    text: "واجهة منظمة تقلل التردد قبل الشراء.",
  },
];

export default function OrderConfidenceCards() {
  return (
    <section className="order-confidence section-padding-sm">
      <div className="container order-confidence-shell">
        <div className="order-confidence-head">
          <span className="section-label">
            <BadgeCheck size={17} />
            Order Confidence
          </span>
          <h2>ثقة أكبر قبل إرسال الطلب</h2>
          <p>معلومات صغيرة لكن مهمة تساعد العميلة تكمل الطلب من غير قلق.</p>
        </div>

        <div className="order-confidence-grid">
          {cards.map((card) => (
            <article className="order-confidence-card" key={card.title}>
              <span>{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
