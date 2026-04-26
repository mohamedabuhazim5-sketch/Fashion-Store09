import { Globe, Camera, MessageCircle, Phone, Send, Sparkles } from "lucide-react";
import { STORE } from "../config/store";

export default function SocialSection() {
  return (
    <section id="contact" className="social-section section-padding-sm">
      <div className="container">
        <div className="social-card social-card-v7">
          <div className="social-content">
            <span className="section-label light">
              <Sparkles size={17} />
              Fashion Store Community
            </span>
            <h2>تابعي صفحات المتجر وخليكي أول واحدة تشوف الموديلات الجديدة</h2>
            <p>
              تواصلي معنا على واتساب، تابعي الإنستجرام والفيسبوك، وانضمي لقناة
              الواتساب علشان توصلك كل العروض والنزولات الجديدة أول بأول.
            </p>

            <div className="social-cta-row">
              <a
                className="channel-btn"
                href={STORE.whatsappChannel}
                target="_blank"
                rel="noreferrer"
              >
                <Send size={21} />
                Follow Channel
              </a>

              <a
                className="social-whatsapp-outline"
                href={`https://wa.me/${STORE.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={20} />
                واتساب مباشر
              </a>
            </div>
          </div>

          <div className="links-box links-box-v7">
            <h3>روابط Fashion Store</h3>
            <p>اختاري المنصة المناسبة وتواصلي معنا بسهولة.</p>

            <a href={`https://wa.me/${STORE.whatsappNumber}`} target="_blank" rel="noreferrer">
              <Phone />
              {STORE.whatsappDisplay}
            </a>

            <a href={STORE.facebook} target="_blank" rel="noreferrer">
              <Globe />
              Facebook Page
            </a>

            <a href={STORE.instagram} target="_blank" rel="noreferrer">
              <Camera />
              Instagram
            </a>

            <a href={STORE.whatsappChannel} target="_blank" rel="noreferrer">
              <MessageCircle />
              WhatsApp Channel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
