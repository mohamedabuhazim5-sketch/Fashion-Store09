import { ArrowLeft, Camera, Heart, Sparkles } from "lucide-react";

import ManagedImage from "./ManagedImage";
const images = [
  {
    title: "Soft Girl Mood",
    tag: "Pink / Cream",
    slot: "moodboardOne",
  },
  {
    title: "Chic Everyday",
    tag: "Casual",
    slot: "moodboardTwo",
  },
  {
    title: "Elegant Details",
    tag: "Premium",
    slot: "moodboardThree",
  },
  {
    title: "Accessories Feel",
    tag: "Complete Look",
    slot: "moodboardFour",
  },
];

export default function FashionMoodboard({ homeImages }) {
  return (
    <section className="fashion-moodboard section-padding-sm">
      <div className="container">
        <div className="section-head simple">
          <div>
            <span className="section-label">
              <Camera size={17} />
              Fashion Moodboard
            </span>
            <h2>مود بورد بصري يخلي المتجر أفخم</h2>
            <p>قسم صور مرتب يعطي إحساس براند أزياء ويخلي الصفحة أكثر حياة وأنوثة.</p>
          </div>
        </div>

        <div className="moodboard-grid">
          {images.map((item, index) => (
            <article className={`moodboard-card moodboard-${index + 1}`} key={item.title}>
              <ManagedImage homeImages={homeImages} slot={item.slot} alt={item.title} />
              <div className="moodboard-overlay" />
              <div className="moodboard-content">
                <span>
                  <Sparkles size={14} />
                  {item.tag}
                </span>
                <h3>{item.title}</h3>
                <a href="#products">
                  استكشفي
                  <ArrowLeft size={15} />
                </a>
              </div>
              <button className="moodboard-heart" aria-label="like">
                <Heart size={18} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
