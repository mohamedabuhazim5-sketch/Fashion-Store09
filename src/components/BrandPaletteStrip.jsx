import { Gem, Palette, Sparkles } from "lucide-react";

export default function BrandPaletteStrip() {
  return (
    <section className="palette-strip-section">
      <div className="container palette-strip">
        <div className="palette-copy">
          <span>
            <Palette size={16} />
            Brand Palette
          </span>
          <strong>Pink • Rose Gold • Off White • Soft Lavender</strong>
        </div>

        <div className="palette-dots">
          <i className="dot-pink" />
          <i className="dot-rose" />
          <i className="dot-cream" />
          <i className="dot-lavender" />
        </div>

        <div className="palette-note">
          <Gem size={16} />
          <span>ستايل بصري موحد يخلي المتجر يبان كبراند حقيقي</span>
        </div>
      </div>
    </section>
  );
}
