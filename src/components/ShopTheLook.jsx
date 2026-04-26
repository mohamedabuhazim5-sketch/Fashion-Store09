import { ArrowLeft, Shirt, Sparkles } from "lucide-react";

import ManagedImage from "./ManagedImage";
const looks = [
  {
    title: "University Soft Look",
    text: "لوك هادي ومريح للجامعة والخروجات اليومية.",
    slot: "shopLookOne",
  },
  {
    title: "Evening Rose Look",
    text: "اختيارات أنعم للمناسبات والخروجات المسائية.",
    slot: "shopLookTwo",
  },
  {
    title: "Casual Chic Look",
    text: "ستايل شيك وسهل التنسيق لكل يوم.",
    slot: "shopLookThree",
  },
];

export default function ShopTheLook({ homeImages }) {
  return (
    <section className="shop-look section-padding-sm">
      <div className="container">
        <div className="section-head simple shop-look-head">
          <div>
            <span className="section-label">
              <Shirt size={17} />
              Shop The Look
            </span>
            <h2>تسوقي حسب اللوك</h2>
            <p>قسم بصري جديد يخلي العميلة تختار حسب الإحساس والستايل، مش بس حسب اسم المنتج.</p>
          </div>
        </div>

        <div className="shop-look-grid">
          {looks.map((look) => (
            <article className="shop-look-card" key={look.title}>
              <ManagedImage homeImages={homeImages} slot={look.slot} alt={look.title} />
              <div className="shop-look-content">
                <span>
                  <Sparkles size={15} />
                  Fashion Mood
                </span>
                <h3>{look.title}</h3>
                <p>{look.text}</p>
                <a href="#products">
                  شاهدي المنتجات
                  <ArrowLeft size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
