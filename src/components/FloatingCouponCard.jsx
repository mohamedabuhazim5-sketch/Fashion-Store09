import { BadgePercent, Copy, Sparkles, X } from "lucide-react";
import { useState } from "react";

export default function FloatingCouponCard() {
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState(false);

  if (hidden) return null;

  function copy() {
    navigator.clipboard?.writeText("FASHION10");
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <aside className="floating-coupon-card">
      <button className="coupon-close" onClick={() => setHidden(true)} aria-label="close">
        <X size={15} />
      </button>
      <span>
        <BadgePercent size={17} />
        Special Coupon
      </span>
      <strong>FASHION10</strong>
      <p>خصم 10% على الطلبات المناسبة</p>
      <button onClick={copy}>
        <Copy size={15} />
        {copied ? "تم النسخ" : "نسخ الكود"}
      </button>
      <i><Sparkles size={12} /> limited look</i>
    </aside>
  );
}
