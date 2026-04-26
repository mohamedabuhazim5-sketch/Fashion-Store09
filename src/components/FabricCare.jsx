import { Droplets, Ruler, ShieldCheck, Shirt, Sparkles } from "lucide-react";

const items = [
  {
    icon: <Shirt size={20} />,
    title: "اختيار الخامة",
    text: "اعرضي وصف الخامة بوضوح داخل صفحة المنتج علشان العميلة تطمّن قبل الطلب.",
  },
  {
    icon: <Ruler size={20} />,
    title: "المقاس المناسب",
    text: "دليل المقاسات موجود داخل المتجر لتقليل الحيرة وقت الاختيار.",
  },
  {
    icon: <Droplets size={20} />,
    title: "العناية بالقطعة",
    text: "نصائح بسيطة للحفاظ على لون وشكل المنتج بعد الغسيل.",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "ثقة قبل الشراء",
    text: "كل التفاصيل المهمة ظاهرة بشكل مرتب قبل إرسال الأوردر.",
  },
];

export default function FabricCare() {
  return (
    <section className="fabric-care section-padding-sm">
      <div className="container fabric-care-shell">
        <div className="fabric-care-head">
          <span className="section-label">
            <Sparkles size={17} />
            Fabric & Care
          </span>
          <h2>تفاصيل الخامة والعناية بشكل أنيق</h2>
          <p>قسم ثقة مهم جدًا لأي متجر ملابس، يوضح للعميلة إن البراند مهتم بالتفاصيل.</p>
        </div>

        <div className="fabric-care-grid">
          {items.map((item) => (
            <article className="fabric-care-card" key={item.title}>
              <span>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
