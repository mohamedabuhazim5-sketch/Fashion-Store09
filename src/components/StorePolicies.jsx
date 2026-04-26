import { MessageCircle, PackageCheck, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { STORE } from "../config/store";

const policies = [
  {
    icon: <Truck size={20} />,
    title: "الشحن",
    text: "تأكيد الشحن والميعاد على واتساب حسب المحافظة والعنوان.",
  },
  {
    icon: <RotateCcw size={20} />,
    title: "الاستبدال",
    text: "يمكن مراجعة تفاصيل الاستبدال مع خدمة العملاء قبل تأكيد الطلب.",
  },
  {
    icon: <PackageCheck size={20} />,
    title: "تأكيد الطلب",
    text: "كل طلب بيتسجل ويتبعت واتساب برسالة منظمة فيها كل التفاصيل.",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "تجربة آمنة",
    text: "مقاسات وألوان وأسعار واضحة قبل إرسال الأوردر.",
  },
];

export default function StorePolicies() {
  return (
    <section className="store-policies section-padding-sm">
      <div className="container store-policies-shell">
        <div className="store-policies-head">
          <span className="section-label">
            <ShieldCheck size={17} />
            Store Policies
          </span>
          <h2>كل التفاصيل المهمة بشكل واضح وشيك</h2>
          <p>قسم الثقة ده بيخلي العميلة تطمّن قبل ما تطلب، وبيخلي المتجر شكله أكثر احترافية.</p>
        </div>

        <div className="store-policies-grid">
          {policies.map((policy) => (
            <article className="store-policy-card" key={policy.title}>
              <span>{policy.icon}</span>
              <h3>{policy.title}</h3>
              <p>{policy.text}</p>
            </article>
          ))}
        </div>

        <a
          className="store-policies-whatsapp"
          href={`https://wa.me/${STORE.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={18} />
          اسألي عن أي تفاصيل على واتساب
        </a>
      </div>
    </section>
  );
}
