import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { getStorage, setStorage } from "../utils/storage";
import { createOrderNumber } from "../utils/format";

const LOCAL_ORDERS_KEY = "fashion_orders_v3";

function normalizeOrderFromDb(order) {
  return {
    id: order.id,
    orderNumber: order.order_number,
    createdAt: order.created_at,
    status: order.status,
    subtotal: Number(order.subtotal || order.total || 0),
    discount: Number(order.discount || 0),
    shippingFee: Number(order.shipping_fee || 0),
    couponCode: order.coupon_code || "",
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
      qty: item.qty,
      price: Number(item.price || 0),
    })),
  };
}

export async function getOrders() {
  if (!isSupabaseConfigured) {
    return getStorage(LOCAL_ORDERS_KEY, []);
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(normalizeOrderFromDb);
}

export async function createOrder({
  customer,
  items,
  subtotal,
  discount,
  shippingFee,
  couponCode,
  total,
}) {
  const orderNumber = createOrderNumber();

  const safeSubtotal = Number(subtotal ?? total ?? 0);
  const safeDiscount = Number(discount || 0);
  const safeShipping = Number(shippingFee || 0);
  const safeTotal = Number(total ?? Math.max(0, safeSubtotal - safeDiscount + safeShipping));

  if (!isSupabaseConfigured) {
    const current = getStorage(LOCAL_ORDERS_KEY, []);
    const localOrder = {
      id: `local-order-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      status: "جديد",
      customer,
      items,
      subtotal: safeSubtotal,
      discount: safeDiscount,
      shippingFee: safeShipping,
      couponCode: couponCode || "",
      total: safeTotal,
    };
    setStorage(LOCAL_ORDERS_KEY, [localOrder, ...current]);
    return localOrder;
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      customer_name: customer.name || "",
      customer_phone: customer.phone || "",
      customer_city: customer.city || "",
      customer_address: customer.address || "",
      customer_notes: customer.notes || "",
      subtotal: safeSubtotal,
      discount: safeDiscount,
      shipping_fee: safeShipping,
      coupon_code: couponCode || "",
      total: safeTotal,
      status: "جديد",
      source: "website",
    })
    .select("*")
    .single();

  if (orderError) throw orderError;

  const rows = items.map((item) => ({
    order_id: order.id,
    product_id: String(item.id || "").startsWith("local-") ? null : item.id,
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

  return normalizeOrderFromDb({ ...order, order_items: orderItems || [] });
}

export async function updateOrderStatus(id, status) {
  if (!isSupabaseConfigured) {
    const current = getStorage(LOCAL_ORDERS_KEY, []);
    const updated = current.map((order) =>
      order.id === id ? { ...order, status } : order
    );
    setStorage(LOCAL_ORDERS_KEY, updated);
    return;
  }

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteOrder(id) {
  if (!isSupabaseConfigured) {
    const current = getStorage(LOCAL_ORDERS_KEY, []);
    setStorage(
      LOCAL_ORDERS_KEY,
      current.filter((order) => order.id !== id)
    );
    return;
  }

  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) throw error;
}

export async function trackOrder(orderNumber, phone) {
  const cleanOrderNumber = String(orderNumber || "").trim();
  const cleanPhone = String(phone || "").trim();

  if (!cleanOrderNumber || !cleanPhone) {
    throw new Error("اكتب رقم الطلب ورقم الموبايل");
  }

  if (!isSupabaseConfigured) {
    const orders = getStorage(LOCAL_ORDERS_KEY, []);
    const order = orders.find(
      (item) =>
        String(item.orderNumber).toLowerCase() === cleanOrderNumber.toLowerCase() &&
        String(item.customer?.phone || "").trim() === cleanPhone
    );

    if (!order) return null;

    return {
      orderNumber: order.orderNumber,
      status: order.status,
      total: order.total,
      createdAt: order.createdAt,
      customerCity: order.customer?.city || "",
      itemCount: (order.items || []).reduce((sum, item) => sum + Number(item.qty || 0), 0),
    };
  }

  const { data, error } = await supabase.rpc("track_order", {
    p_order_number: cleanOrderNumber,
    p_phone: cleanPhone,
  });

  if (error) throw error;

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return null;

  return {
    orderNumber: row.order_number,
    status: row.status,
    total: Number(row.total || 0),
    createdAt: row.created_at,
    customerCity: row.customer_city || "",
    itemCount: Number(row.item_count || 0),
  };
}
