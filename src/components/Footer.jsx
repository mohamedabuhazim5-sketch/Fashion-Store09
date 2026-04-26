import { Globe, Camera, MessageCircle, Phone } from "lucide-react";
import { STORE } from "../config/store";

export default function Footer() {
  return (
    <footer className="footer footer-v7 footer-v11">
      <div className="container footer-top-card">
        <div>
          <span className="section-label">Girly Boutique</span>
          <h3>Fashion Store</h3>
          <p>متجر بناتي بتصميم أفخم وأهدى وتجربة شراء أسهل من أول التصفح لحد تأكيد الطلب.</p>
        </div>

        <div className="footer-top-actions">
          <a href="#products">ابدئي التسوق</a>
          <a href={`https://wa.me/${STORE.whatsappNumber}`} target="_blank" rel="noreferrer">واتساب</a>
        </div>
      </div>

      <div className="container footer-grid-v7">
        <div className="footer-brand-block">
          <h3>{STORE.name}</h3>
          <p>
            متجر ملابس بناتي بتصميم راقٍ ولمسة أنثوية ناعمة، هدفه يقدّم تجربة تسوق جميلة وأفخم من أول نظرة لحد تأكيد الطلب.
          </p>
        </div>

        <div>
          <h4>روابط سريعة</h4>
          <a href="#home">الرئيسية</a>
          <a href="#products">المنتجات</a>
          <a href="#features">المميزات</a>
          <a href="#/track">تتبع الطلب</a>
        </div>

        <div>
          <h4>تواصل معنا</h4>
          <a href={`https://wa.me/${STORE.whatsappNumber}`} target="_blank" rel="noreferrer">
            <Phone size={16} /> {STORE.whatsappDisplay}
          </a>
          <a href={STORE.instagram} target="_blank" rel="noreferrer">
            <Camera size={16} /> Instagram
          </a>
          <a href={STORE.facebook} target="_blank" rel="noreferrer">
            <Globe size={16} /> Facebook
          </a>
          <a href={STORE.whatsappChannel} target="_blank" rel="noreferrer">
            <MessageCircle size={16} /> WhatsApp Channel
          </a>
        </div>
      </div>

      <div className="container footer-bottom-v7">
        <p>© 2026 {STORE.name}. All rights reserved.</p>
        <p>Designed with a soft girly aesthetic 💗</p>
      </div>
    </footer>
  );
}
