import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { createOrderNumber } from "../utils/format";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function fromDbProduct(row) {
  return {
    ...row,
    price: Number(row.price || 0),
    oldPrice: Number(row.old_price || 0),
    rating: Number(row.rating || 4.8),
    stock: Number(row.stock || 0),
    colors: row.colors || [],
    sizes: row.sizes || [],
  };
}

export function toDbProduct(product) {
  return {
    name: product.name,
    category: product.category,
    price: Number(product.price) || 0,
    old_price: Number(product.oldPrice ?? product.old_price ?? product.price) || 0,
    tag: product.tag || "جديد",
    rating: Number(product.rating) || 4.8,
    stock: Number(product.stock) || 0,
    image: product.image,
    colors: Array.isArray(product.colors) ? product.colors : [],
    sizes: Array.isArray(product.sizes) ? product.sizes : [],
    description: product.description || "",
    is_active: product.is_active !== false,
    sort_order: Number(product.sort_order) || 0,
  };
}

export async function fetchProductsFromSupabase() {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(fromDbProduct);
}

export async function createProductSupabase(product) {
  const { data, error } = await supabase
    .from("products")
    .insert(toDbProduct(product))
    .select("*")
    .single();
  if (error) throw error;
  return fromDbProduct(data);
}

export async function updateProductSupabase(id, product) {
  const { data, error } = await supabase
    .from("products")
    .update(toDbProduct(product))
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return fromDbProduct(data);
}

export async function deleteProductSupabase(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

function fromDbOrder(order) {
  return {
    id: order.id,
    orderNumber: order.order_number,
    createdAt: order.created_at,
    status: order.status,
    total: Number(order.total || 0),
    customer: {
      name: order.customer_name || "",
      phone: order.customer_phone || "",
      city: order.customer_city || "",
      address: order.customer_address || "",
      notes: order.customer_notes || "",
    },
    items: (order.order_items || []).map((item) => ({
      key: item.id,
      id: item.product_id,
      name: item.product_name,
      image: item.product_image,
      size: item.size,
      color: item.color,
      qty: Number(item.qty || 1),
      price: Number(item.price || 0),
    })),
  };
}

export async function fetchOrdersFromSupabase() {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(fromDbOrder);
}

export async function createOrderSupabase({ customer, items, total }) {
  const orderNumber = createOrderNumber();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      customer_name: customer.name || "",
      customer_phone: customer.phone || "",
      customer_city: customer.city || "",
      customer_address: customer.address || "",
      customer_notes: customer.notes || "",
      total: Number(total) || 0,
      status: "جديد",
      source: "website",
    })
    .select("*")
    .single();

  if (orderError) throw orderError;

  const rows = items.map((item) => ({
    order_id: order.id,
    product_id: uuidPattern.test(String(item.id)) ? item.id : null,
    product_name: item.name,
    product_image: item.image,
    size: item.size,
    color: item.color,
    qty: Number(item.qty) || 1,
    price: Number(item.price) || 0,
    line_total: Number(item.price || 0) * Number(item.qty || 1),
  }));

  const { data: orderItems, error: itemsError } = await supabase
    .from("order_items")
    .insert(rows)
    .select("*");

  if (itemsError) throw itemsError;
  return fromDbOrder({ ...order, order_items: orderItems || [] });
}

export async function updateOrderStatusSupabase(id, status) {
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deleteOrderSupabase(id) {
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) throw error;
}


export async function uploadProductImage(file, folder = "products") {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase غير متصل. لا يمكن رفع الصورة على Storage.");
  }

  if (!file) {
    throw new Error("لم يتم اختيار صورة");
  }

  const extension = file.name?.split(".").pop() || "jpg";
  const safeFolder = String(folder || "products").replace(/[^a-zA-Z0-9-_]/g, "-");
  const fileName = `${safeFolder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function uploadSiteImage(file) {
  return uploadProductImage(file, "site-images");
}

export async function fetchHomeImagesFromSupabase() {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "home_images")
    .maybeSingle();

  if (error) {
    console.warn("Home images settings are not ready:", error.message);
    return null;
  }

  return data?.value || null;
}

export async function saveHomeImagesSupabase(value) {
  if (!isSupabaseConfigured) return null;

  const { error } = await supabase
    .from("site_settings")
    .upsert(
      {
        key: "home_images",
        value,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" }
    );

  if (error) throw error;
  return value;
}
