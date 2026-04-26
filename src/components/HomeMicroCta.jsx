import { ArrowLeft, Heart, Sparkles } from "lucide-react";

export default function HomeMicroCta() {
  return (
    <section className="home-micro-cta">
      <div className="container home-micro-shell">
        <span>
          <Sparkles size={16} />
          Fashion Store Experience
        </span>
        <strong>كل جزء في الصفحة بقى معمول علشان يعرض البراند بشكل أرقى ويقرب العميلة من الطلب.</strong>
        <a href="#products">
          ابدئي التسوق
          <ArrowLeft size={16} />
        </a>
        <a href="#/wishlist">
          <Heart size={16} />
          المفضلة
        </a>
      </div>
    </section>
  );
}
