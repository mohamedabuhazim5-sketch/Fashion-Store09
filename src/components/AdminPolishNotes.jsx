import { BadgeCheck, Sparkles } from "lucide-react";

export default function AdminPolishNotes() {
  return (
    <div className="admin-polish-notes">
      <span>
        <Sparkles size={16} />
        Admin Tip
      </span>
      <p>
        حافظي على صور المنتجات بنفس المقاس والخلفية قدر الإمكان علشان شكل المتجر يفضل Premium ومنظم.
      </p>
      <b>
        <BadgeCheck size={15} />
        Recommended image ratio: 4:5
      </b>
    </div>
  );
}
