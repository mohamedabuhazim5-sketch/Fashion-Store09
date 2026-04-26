import { isSupabaseConfigured, supabase } from "../lib/supabase";

const BUCKET_NAME = "product-images";

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("لم نتمكن من قراءة الصورة"));
    reader.readAsDataURL(file);
  });
}

function cleanFileName(name) {
  return String(name || "image")
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

export async function uploadProductImage(file) {
  if (!file) return "";

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("صيغة الصورة غير مدعومة. استخدم JPG أو PNG أو WEBP.");
  }

  const maxSize = 6 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error("حجم الصورة كبير. الحد الأقصى 6MB.");
  }

  if (!isSupabaseConfigured) {
    return await fileToDataUrl(file);
  }

  const ext = file.name.split(".").pop() || "jpg";
  const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}-${cleanFileName(file.name || `image.${ext}`)}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);

  if (!data?.publicUrl) {
    throw new Error("تم رفع الصورة لكن لم نتمكن من الحصول على رابطها");
  }

  return data.publicUrl;
}
