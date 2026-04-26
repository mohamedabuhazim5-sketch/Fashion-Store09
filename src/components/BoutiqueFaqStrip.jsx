import { HelpCircle, MessageCircle, PackageCheck, Ruler } from "lucide-react";

const faqs = [
  {
    icon: <Ruler size={18} />,
    q: "أختار المقاس إزاي؟",
    a: "راجعي دليل المقاسات أو ابعتي لنا على واتساب.",
  },
  {
    icon: <PackageCheck size={18} />,
    q: "الطلب بيتأكد إزاي؟",
    a: "بعد إرسال الأوردر على واتساب نراجع التفاصيل ونأكد معاكِ.",
  },
  {
    icon: <MessageCircle size={18} />,
    q: "ممكن أسأل قبل الطلب؟",
    a: "أكيد، زر واتساب موجود في كل مكان داخل المتجر.",
  },
];

export default function BoutiqueFaqStrip() {
  return (
    <section className="boutique-faq-strip section-padding-sm">
      <div className="container boutique-faq-shell">
        <div className="boutique-faq-title">
          <span>
            <HelpCircle size={18} />
          </span>
          <h2>إجابات سريعة قبل الطلب</h2>
        </div>

        <div className="boutique-faq-list">
          {faqs.map((item) => (
            <article className="boutique-faq-item" key={item.q}>
              <span>{item.icon}</span>
              <div>
                <strong>{item.q}</strong>
                <p>{item.a}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
