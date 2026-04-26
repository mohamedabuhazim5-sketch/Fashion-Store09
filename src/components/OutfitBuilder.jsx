import { ArrowLeft, CheckCircle2, Shirt, Sparkles } from "lucide-react";

import ManagedImage from "./ManagedImage";
const steps = [
  "اختاري القطعة الأساسية",
  "حددي اللون والمقاس",
  "أضيفي الإكسسوارات المناسبة",
  "ابعتي الطلب واتساب",
];

export default function OutfitBuilder({ homeImages }) {
  return (
    <section className="outfit-builder section-padding-sm">
      <div className="container outfit-builder-shell">
        <div className="outfit-builder-copy">
          <span className="section-label">
            <Shirt size={17} />
            Outfit Builder
          </span>
          <h2>ساعدي العميلة تتخيل اللوك كامل</h2>
          <p>
            قسم جديد يشرح تجربة اختيار اللوك بشكل بسيط وبصري، وده بيخلي المتجر
            شكله أذكى وأكثر احترافية.
          </p>

          <div className="outfit-steps">
            {steps.map((step) => (
              <div className="outfit-step" key={step}>
                <CheckCircle2 size={17} />
                <span>{step}</span>
              </div>
            ))}
          </div>

          <a href="#products" className="outfit-builder-link">
            ابدئي تكوين اللوك
            <ArrowLeft size={17} />
          </a>
        </div>

        <div className="outfit-builder-collage">
          <div className="outfit-main-photo">
            <ManagedImage homeImages={homeImages} slot="outfitMain" alt="Outfit main" />
          </div>
          <div className="outfit-side-photo top">
            <ManagedImage homeImages={homeImages} slot="outfitAccessory" alt="Accessory" />
          </div>
          <div className="outfit-side-photo bottom">
            <ManagedImage homeImages={homeImages} slot="outfitSecond" alt="Outfit" />
          </div>
          <div className="outfit-floating-note">
            <Sparkles size={16} />
            <span>Complete the look</span>
          </div>
        </div>
      </div>
    </section>
  );
}
