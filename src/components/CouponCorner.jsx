import { BadgePercent, Copy, Sparkles } from "lucide-react";
import { useState } from "react";

const coupons = ["FASHION10", "WELCOME50", "FREEDELIVERY"];

export default function CouponCorner() {
  const [copied, setCopied] = useState("");

  function copyCoupon(code) {
    navigator.clipboard?.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(""), 1400);
  }

  return (
    <section className="coupon-corner section-padding-sm">
      <div className="container coupon-corner-shell">
        <div>
          <span className="section-label light-pill">
            <BadgePercent size={17} />
            Coupon Corner
          </span>
          <h2>أكواد الخصم واضحة للعميلة</h2>
          <p>قسم منفصل للعروض يخلي العميلة تشوف الكوبونات بسرعة وتستخدمها داخل السلة.</p>
        </div>

        <div className="coupon-corner-list">
          {coupons.map((code) => (
            <button key={code} onClick={() => copyCoupon(code)}>
              <Sparkles size={16} />
              <strong>{code}</strong>
              <span>{copied === code ? "تم النسخ" : "انسخي الكود"}</span>
              <Copy size={16} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
