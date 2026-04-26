import { BadgeCheck, MessageCircle, PackageCheck, ShieldCheck, ShoppingBag } from "lucide-react";
import { STORE } from "../config/store";

const cards = [
  {
    icon: <ShoppingBag size={20} />,
    title: "راجعي السلة",
    text: "كل منتج بالمقاس واللون والكمية.",
  },
  {
    icon: <MessageCircle size={20} />,
    title: "ارسلي واتساب",
    text: "رسالة الطلب بتتجهز تلقائيًا.",
  },
  {
    icon: <PackageCheck size={20} />,
    title: "تأكيد سريع",
    text: "نراجع التفاصيل ونأكد الشحن.",
  },
];

export default function CheckoutConfidence() {
  return (
    <section className="checkout-confidence section-padding-sm">
      <div className="container checkout-confidence-shell">
        <div className="checkout-confidence-copy">
          <span className="section-label light-pill">
            <ShieldCheck size={17} />
            Checkout Confidence
          </span>
          <h2>قبل ما العميلة تطلب… كل حاجة واضحة</h2>
          <p>
            قسم يطمّن العميلة إن الطلب منظم وسهل، وبيوضح إن التواصل على واتساب جزء أساسي من تجربة الشراء.
          </p>

          <a
            href={`https://wa.me/${STORE.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            تواصلي قبل الطلب
          </a>
        </div>

        <div className="checkout-confidence-cards">
          {cards.map((card, index) => (
            <article className="checkout-confidence-card" key={card.title}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <span>{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <b>
                <BadgeCheck size={14} />
                جاهز
              </b>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
