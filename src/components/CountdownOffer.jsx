import { useEffect, useMemo, useState } from "react";
import { Clock3, Gift, Tag } from "lucide-react";

function getTimeLeft() {
  const target = new Date();
  target.setDate(target.getDate() + 5);
  target.setHours(23, 59, 59, 999);
  return target;
}

export default function CountdownOffer() {
  const targetDate = useMemo(() => getTimeLeft(), []);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="countdown-offer section-padding-sm">
      <div className="container countdown-wrap">
        <div className="countdown-copy">
          <span className="section-label light-pill">
            <Gift size={17} />
            Limited Time Offer
          </span>
          <h2>عرض خاص لفترة محدودة</h2>
          <p>
            شوفي الموديلات الجديدة واستفيدي من أكواد الخصم الموجودة داخل المتجر قبل انتهاء العرض.
          </p>
          <div className="countdown-tags">
            <span><Tag size={15} /> FASHION10</span>
            <span><Tag size={15} /> WELCOME50</span>
            <span><Clock3 size={15} /> عروض تتجدد باستمرار</span>
          </div>
        </div>

        <div className="countdown-boxes">
          <div><strong>{String(timeLeft.days).padStart(2, "0")}</strong><span>يوم</span></div>
          <div><strong>{String(timeLeft.hours).padStart(2, "0")}</strong><span>ساعة</span></div>
          <div><strong>{String(timeLeft.minutes).padStart(2, "0")}</strong><span>دقيقة</span></div>
          <div><strong>{String(timeLeft.seconds).padStart(2, "0")}</strong><span>ثانية</span></div>
        </div>
      </div>
    </section>
  );
}
