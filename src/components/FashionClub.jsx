import { Mail, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { STORE } from "../config/store";

export default function FashionClub() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
  }

  return (
    <section className="fashion-club section-padding-sm">
      <div className="container fashion-club-shell">
        <div className="fashion-club-copy">
          <span>
            <Sparkles size={17} />
            Join The Fashion Club
          </span>
          <h2>خلي العميلة تحس إنها جزء من البراند</h2>
          <p>
            قسم بسيط وأنيق لجمع اهتمام العميلات بالعروض والموديلات الجديدة، مع زر واتساب
            واضح للتواصل المباشر.
          </p>
        </div>

        <form className="fashion-club-form" onSubmit={submit}>
          <label>
            <Mail size={18} />
            <input
              type="email"
              value={email}
              placeholder="اكتبي الإيميل لمتابعة العروض"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button type="submit">اشتركي الآن</button>
          {done && <p>تم تسجيل الاهتمام بنجاح ✨</p>}
        </form>

        <a
          className="fashion-club-whatsapp"
          href={`https://wa.me/${STORE.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={18} />
          واتساب مباشر
        </a>
      </div>
    </section>
  );
}
