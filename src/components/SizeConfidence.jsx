import { MessageCircle, Ruler, ShieldCheck, Sparkles } from "lucide-react";
import { STORE } from "../config/store";

const items = [
  {
    title: "راجعي المقاسات",
    text: "اختاري المقاس من دليل المقاسات حسب الصدر والوسط والطول.",
  },
  {
    title: "اسألي قبل الطلب",
    text: "لو محتارة بين مقاسين ابعتي لنا على واتساب ونساعدك تختاري.",
  },
  {
    title: "أكدي التفاصيل",
    text: "قبل إرسال الأوردر اتأكدي من اللون والمقاس والكمية.",
  },
];

export default function SizeConfidence() {
  return (
    <section className="size-confidence section-padding-sm">
      <div className="container size-confidence-shell">
        <div className="size-confidence-head">
          <span className="section-label">
            <Ruler size={17} />
            Size Confidence
          </span>
          <h2>اختيار المقاس بقى أسهل وأوضح</h2>
          <p>
            قسم ثقة مهم جدًا في متجر الملابس، يقلل التردد ويخلي العميلة تكمل الطلب وهي مطمّنة.
          </p>
        </div>

        <div className="size-confidence-grid">
          {items.map((item, index) => (
            <article className="size-confidence-card" key={item.title}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <span>{index === 0 ? <Ruler /> : index === 1 ? <MessageCircle /> : <ShieldCheck />}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <a
          href={`https://wa.me/${STORE.whatsappNumber}`}
          className="size-confidence-whatsapp"
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={18} />
          اسألي عن المقاس على واتساب
        </a>
      </div>
    </section>
  );
}
