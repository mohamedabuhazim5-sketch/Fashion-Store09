import { Sparkles, Truck, BadgePercent, MessageCircle } from "lucide-react";

const items = [
  { icon: <BadgePercent size={16} />, text: "كوبونات وعروض جاهزة داخل المتجر" },
  { icon: <Truck size={16} />, text: "تأكيد الشحن سريع على واتساب" },
  { icon: <MessageCircle size={16} />, text: "اطلبي بسهولة من غير تعقيد" },
  { icon: <Sparkles size={16} />, text: "موديلات بناتي جديدة بشكل مستمر" },
];

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="announcement-track">
        {[...items, ...items].map((item, index) => (
          <div className="announcement-item" key={`${item.text}-${index}`}>
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
