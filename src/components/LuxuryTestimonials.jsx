import { Quote, Star, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "هنا محمود",
    role: "عميلة دائمة",
    text: "شكل المتجر بقى شيك جدًا، واضح إن كل حاجة معمولة بذوق وبيريّح العين.",
  },
  {
    name: "آية خالد",
    role: "طلب واتساب",
    text: "المنتجات واضحة، والطلب من السلة للواتساب منظم جدًا وسهل.",
  },
  {
    name: "بسملة أحمد",
    role: "Fashion Lover",
    text: "حبيت شكل الأقسام والعروض، حسيت إن المتجر براند بناتي فعلاً.",
  },
];

export default function LuxuryTestimonials() {
  return (
    <section className="luxury-testimonials section-padding-sm">
      <div className="container luxury-testimonials-shell">
        <div className="luxury-testimonials-head">
          <span className="section-label light-pill">
            <Sparkles size={17} />
            Real Experience
          </span>
          <h2>آراء بشكل أفخم يزود الثقة</h2>
          <p>قسم آراء بتصميم راقٍ يساعد العميلة الجديدة تحس بثقة أكبر قبل ما تطلب.</p>
        </div>

        <div className="luxury-testimonials-grid">
          {testimonials.map((item) => (
            <article className="luxury-testimonial-card" key={item.name}>
              <Quote size={28} />
              <p>{item.text}</p>
              <div className="luxury-rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={15} fill="currentColor" />
                ))}
              </div>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
