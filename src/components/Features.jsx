import { MessageCircle, ShieldCheck, Truck, ReceiptText, Sparkles, HeartHandshake } from "lucide-react";
import { STORE } from "../config/store";

export default function Features() {
  const features = [
    {
      icon: <Sparkles />,
      title: "عرض شيك للمنتجات",
      text: "كل منتج ظاهر بصورة أوضح، تفاصيل أجمل، وتصميم بناتي يبرز القطع بطريقة جذابة.",
    },
    {
      icon: <MessageCircle />,
      title: "طلب مباشر على واتساب",
      text: `كل أوردر بيتجهز برسالة منظمة على رقم ${STORE.whatsappDisplay} بسهولة وسرعة.`,
    },
    {
      icon: <ShieldCheck />,
      title: "تجربة سهلة وواضحة",
      text: "مقاسات، ألوان، مخزون، كوبونات، وتتبع طلب — كل حاجة موجودة بشكل مرتب.",
    },
    {
      icon: <Truck />,
      title: "تأكيد الشحن بسرعة",
      text: "بنراجع الأوردر معاكِ بسرعة ونؤكد بيانات التوصيل والتكلفة عبر واتساب.",
    },
    {
      icon: <ReceiptText />,
      title: "فاتورة وطلبات منظمة",
      text: "الطلبات محفوظة ولوحة التحكم منظمة لمتابعة الحالات وطباعة الفواتير بسهولة.",
    },
    {
      icon: <HeartHandshake />,
      title: "ستايل بناتي فعلًا",
      text: "ألوان هادية، تصميم أنيق، وتفاصيل مريحة للعين تخلي المتجر شكله يلفت أي بنت.",
    },
  ];

  return (
    <section id="features" className="features section-padding-sm">
      <div className="container">
        <div className="section-head feature-head-v7">
          <div>
            <span className="section-label">Why Fashion Store</span>
            <h2>المتجر بقى أحلى في الشكل والتجربة</h2>
            <p>
              تصميم بناتي واضح، عرض منتجات أقوى، وأسلوب تسوق مرتب يخلي العميلة تحب
              تكمل وتطلب بسهولة.
            </p>
          </div>
        </div>

        <div className="features-grid features-grid-v7">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
