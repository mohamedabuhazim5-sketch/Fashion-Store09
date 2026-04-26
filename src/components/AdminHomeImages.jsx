import { ImagePlus, Link, RefreshCw, Save, Trash2, UploadCloud } from "lucide-react";
import { useState } from "react";
import { HOME_IMAGE_SLOTS, emptyHomeImages } from "../config/homeImages";
import { isSupabaseConfigured } from "../lib/supabase";
import { saveHomeImagesSupabase, uploadSiteImage } from "../services/supabaseService";

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("تعذر قراءة الصورة"));
    reader.readAsDataURL(file);
  });
}

export default function AdminHomeImages({ homeImages = {}, setHomeImages = null }) {
  const [uploadingSlot, setUploadingSlot] = useState("");
  const [message, setMessage] = useState("");
  const images = { ...emptyHomeImages, ...(homeImages || {}) };

  async function persist(nextImages) {
    if (typeof setHomeImages === "function") {
      setHomeImages(nextImages);
    } else {
      localStorage.setItem("fashion_home_images", JSON.stringify(nextImages));
    }

    if (isSupabaseConfigured) {
      await saveHomeImagesSupabase(nextImages);
    }
  }

  async function updateSlot(key, value) {
    const nextImages = { ...images, [key]: value };
    try {
      await persist(nextImages);
      setMessage("تم حفظ الصورة بنجاح");
    } catch (error) {
      setMessage(error.message?.includes("site_settings") ? "لازم تشغل ملف SQL الخاص بصور الواجهة في Supabase الأول" : error.message || "حدث خطأ أثناء حفظ صور الواجهة");
    }
  }

  async function handleUpload(key, file) {
    if (!file) return;

    setUploadingSlot(key);
    setMessage("");

    try {
      const imageUrl = isSupabaseConfigured
        ? await uploadSiteImage(file)
        : await fileToDataUrl(file);

      await updateSlot(key, imageUrl);
    } catch (error) {
      setMessage(error.message?.includes("site_settings") ? "الصورة اترفعت لكن الحفظ يحتاج تشغيل SQL الخاص بصور الواجهة" : error.message || "حدث خطأ أثناء رفع الصورة");
    } finally {
      setUploadingSlot("");
    }
  }

  async function clearSlot(key) {
    await updateSlot(key, "");
  }

  async function clearAll() {
    if (!confirm("هل تريد حذف كل صور الواجهة؟")) return;

    try {
      await persist(emptyHomeImages);
      setMessage("تم حذف كل صور الواجهة");
    } catch (error) {
      setMessage(error.message || "حدث خطأ أثناء حذف صور الواجهة");
    }
  }

  return (
    <section className="admin-home-images">
      <div className="admin-home-images-head">
        <div>
          <span>
            <ImagePlus size={18} />
            صور الواجهة
          </span>
          <h2>إدارة صور الصفحة الرئيسية</h2>
          <p>
            هنا تقدري تشيلي الصور الافتراضية وتضيفي صور البراند من لوحة التحكم. لو Supabase
            متوصل، الصور هتترفع على Storage وتظهر لكل الزوار.
          </p>
        </div>

        <button type="button" className="reset-btn" onClick={clearAll}>
          <Trash2 size={18} />
          حذف كل الصور
        </button>
      </div>

      {message && <div className="admin-home-images-message">{message}</div>}

      {!isSupabaseConfigured && (
        <div className="admin-home-images-warning">
          ملاحظة: أنت تعمل الآن في الوضع المحلي، الصور هتتخزن على نفس المتصفح فقط. بعد ربط
          Supabase وتشغيل SQL الخاص بالإعدادات، الصور هتتخزن لكل الزوار.
        </div>
      )}

      <div className="admin-home-images-grid">
        {HOME_IMAGE_SLOTS.map((slot) => (
          <article className="admin-home-image-card" key={slot.key}>
            <div className="home-image-preview">
              {images[slot.key] ? (
                <img src={images[slot.key]} alt={slot.label} />
              ) : (
                <div>
                  <ImagePlus size={26} />
                  <span>لا توجد صورة</span>
                </div>
              )}
            </div>

            <div className="home-image-info">
              <h3>{slot.label}</h3>
              <p>{slot.hint}</p>

              <label className="upload-btn home-image-upload-btn">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={(e) => handleUpload(slot.key, e.target.files?.[0])}
                />
                <UploadCloud size={17} />
                {uploadingSlot === slot.key ? "جاري الرفع..." : "رفع صورة"}
              </label>

              <div className="home-image-url-row">
                <Link size={16} />
                <input
                  value={images[slot.key] || ""}
                  onChange={(e) => updateSlot(slot.key, e.target.value)}
                  placeholder="أو ضعي رابط الصورة"
                />
              </div>

              <div className="home-image-actions">
                <button type="button" onClick={() => updateSlot(slot.key, images[slot.key])}>
                  <Save size={16} />
                  حفظ
                </button>
                <button type="button" className="danger-btn" onClick={() => clearSlot(slot.key)}>
                  <RefreshCw size={16} />
                  إفراغ المكان
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
