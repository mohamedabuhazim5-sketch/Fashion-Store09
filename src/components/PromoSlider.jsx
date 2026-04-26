import { useEffect, useState } from "react";
import { ArrowLeft, Sparkles, ShoppingBag, Gift } from "lucide-react";

const slides = [
  {
    label: "Special Drop",
    title: "عروض شيك جدًا على الموديلات البناتي الجديدة",
    text: "واجهة جذابة، عرض أوضح للمنتجات، وتجربة تسوق أجمل من أول ما العميلة تدخل الموقع.",
    button: "شاهدي المنتجات",
    href: "#products",
    icon: <Sparkles size={18} />,
  },
  {
    label: "Best Picks",
    title: "الأكثر مبيعًا في مكان واحد علشان القرار يبقى أسهل",
    text: "اختيار أسرع للعميلة مع إبراز القطع المميزة والمنتجات المحبوبة داخل المتجر.",
    button: "الأكثر مبيعًا",
    href: "#best-sellers",
    icon: <ShoppingBag size={18} />,
  },
  {
    label: "Offers & Gifts",
    title: "بانرات عروض داخل الصفحة تخلي المتجر شكله أقوى وأفخم",
    text: "أسلوب تسويقي أوضح يساعد على زيادة الطلبات ويشد الانتباه للموديلات الجديدة والعروض.",
    button: "العروض",
    href: "#promo-banners",
    icon: <Gift size={18} />,
  },
];

export default function PromoSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[active];

  return (
    <section className="promo-slider-section section-padding-sm">
      <div className="container">
        <div className="promo-slider-card">
          <div className="promo-slider-content">
            <span className="promo-slider-label">
              {slide.icon}
              {slide.label}
            </span>
            <h2>{slide.title}</h2>
            <p>{slide.text}</p>
            <a href={slide.href} className="promo-slider-btn">
              {slide.button}
              <ArrowLeft size={18} />
            </a>
          </div>

          <div className="promo-slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={index === active ? "active" : ""}
                onClick={() => setActive(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
