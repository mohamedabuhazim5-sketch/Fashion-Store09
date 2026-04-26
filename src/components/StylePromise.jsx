import { ArrowLeft, BadgeCheck, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { STORE } from "../config/store";

const items = [
  {
    icon: <BadgeCheck size={18} />,
    title: "اختيارات أجمل",
    text: "تنسيق بصري أوضح للمنتجات والمجموعات والعروض.",
  },
  {
    icon: <Truck size={18} />,
    title: "طلب أسهل",
    text: "تأكيد سريع من السلة أو بشكل مباشر على واتساب.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "ثقة أعلى",
    text: "قسم آراء ولمسات بصرية ترفع ثقة العميلة في المتجر.",
  },
];

export default function StylePromise() {
  return (
    <section className="style-promise section-padding-sm">
      <div className="container style-promise-shell">
        <div className="style-promise-copy">
          <span className="section-label light-pill">
            <BadgeCheck size={17} />
            Why Fashion Store?
          </span>
          <h2>لمسة أنعم وتجربة أقوى من أول نظرة</h2>
          <p>
            عملنا تحسينات إضافية على شكل المتجر علشان يبقى فعلاً مناسب لبراند ملابس بناتي:
            تصميم هادئ، بانرات أحلى، عرض منتجات أفخم، وتجربة شراء مريحة وواضحة.
          </p>
        </div>

        <div className="style-promise-list">
          {items.map((item) => (
            <article className="style-promise-card" key={item.title}>
              <span>{item.icon}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="style-promise-actions">
          <a href="#products" className="primary-btn">
            تسوقي الآن
            <ArrowLeft size={18} />
          </a>
          <a
            className="whatsapp-btn"
            href={`https://wa.me/${STORE.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            اطلبي على واتساب
          </a>
        </div>
      </div>
    </section>
  );
}
