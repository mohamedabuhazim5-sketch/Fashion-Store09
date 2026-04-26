import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";

const options = [
  {
    key: "soft",
    title: "ناعم وهادي",
    result: "اختاري درجات الروز والأوف وايت والفساتين الخفيفة.",
  },
  {
    key: "casual",
    title: "كاجوال شيك",
    result: "اختاري الأطقم والبلوزات العملية مع سكيرت أو بنطلون هادي.",
  },
  {
    key: "evening",
    title: "مناسبات وخروجات",
    result: "اختاري القطع الأعلى تقييمًا والألوان الواضحة مثل لافندر وروز.",
  },
];

export default function QuickStyleQuiz() {
  const [selected, setSelected] = useState(options[0]);

  return (
    <section className="style-quiz section-padding-sm">
      <div className="container style-quiz-shell">
        <div className="style-quiz-copy">
          <span className="section-label light-pill">
            <Sparkles size={17} />
            Quick Style Quiz
          </span>
          <h2>مساعدة صغيرة تخلي العميلة تختار أسرع</h2>
          <p>
            قسم تفاعلي بسيط يدي اقتراح سريع حسب الستايل، وبيخلي المتجر يحس إنه أذكى وأكثر اهتمامًا بالعميلة.
          </p>
        </div>

        <div className="style-quiz-box">
          <div className="style-quiz-options">
            {options.map((option) => (
              <button
                key={option.key}
                className={selected.key === option.key ? "active" : ""}
                onClick={() => setSelected(option)}
              >
                {selected.key === option.key && <CheckCircle2 size={17} />}
                {option.title}
              </button>
            ))}
          </div>

          <div className="style-quiz-result">
            <strong>اقتراح مناسب لكِ</strong>
            <p>{selected.result}</p>
            <a href="#products">
              شوفي المنتجات المناسبة
              <ArrowLeft size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
