import { Camera, ExternalLink } from "lucide-react";
import { STORE } from "../config/store";

const images = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
];

export default function InstagramGallery() {
  return (
    <section className="instagram-gallery section-padding-sm">
      <div className="container">
        <div className="section-head gallery-head-v9">
          <div>
            <span className="section-label">
              <Camera size={17} />
              Instagram Gallery
            </span>
            <h2>لمسة سوشيال أقوى داخل الصفحة</h2>
            <p>
              قسم شبيه بالإنستجرام يعرض ستايلات وصور جذابة تساعد في إبراز روح البراند بشكل أنيق.
            </p>
          </div>

          <a href={STORE.instagram} target="_blank" rel="noreferrer" className="gallery-link-btn">
            زيارة الإنستجرام
            <ExternalLink size={16} />
          </a>
        </div>

        <div className="instagram-grid">
          {images.map((image, index) => (
            <div className="instagram-item" key={index}>
              <img src={image} alt={`Instagram ${index + 1}`} />
              <div className="instagram-overlay">
                <Camera size={18} />
                <span>@Fashion Store</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
