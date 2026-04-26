import { ImagePlus } from "lucide-react";

export default function ManagedImage({
  homeImages,
  slot,
  alt = "Fashion Store image",
  className = "",
  placeholder = "أضيفي الصورة من لوحة التحكم",
}) {
  const src = homeImages?.[slot];

  if (src) {
    return <img src={src} alt={alt} className={className} loading="lazy" />;
  }

  return (
    <div className={`managed-image-placeholder ${className}`.trim()}>
      <ImagePlus size={28} />
      <span>{placeholder}</span>
      <small>{slot}</small>
    </div>
  );
}
