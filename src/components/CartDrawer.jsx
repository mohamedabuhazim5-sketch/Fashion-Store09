import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, X, CheckCircle2, AlertTriangle, BadgePercent } from "lucide-react";
import { useMemo, useState } from "react";
import { STORE } from "../config/store";
import { buildWhatsAppLink, currency } from "../utils/format";
import { createOrder } from "../services/orderService";

function findCoupon(code) {
  const normalized = String(code || "").trim().toUpperCase();
  return STORE.coupons.find((coupon) => coupon.code.toUpperCase() === normalized) || null;
}

function calculateDiscount(coupon, subtotal, shippingFee) {
  if (!coupon) return { discount: 0, shippingDiscount: 0 };

  if (subtotal < Number(coupon.minSubtotal || 0)) {
    return { discount: 0, shippingDiscount: 0 };
  }

  if (coupon.type === "percent") {
    return {
      discount: Math.round((subtotal * Number(coupon.value || 0)) / 100),
      shippingDiscount: 0,
    };
  }

  if (coupon.type === "fixed") {
    return {
      discount: Math.min(Number(coupon.value || 0), subtotal),
      shippingDiscount: 0,
    };
  }

  if (coupon.type === "shipping") {
    return {
      discount: 0,
      shippingDiscount: Math.min(Number(coupon.value || shippingFee), shippingFee),
    };
  }

  return { discount: 0, shippingDiscount: 0 };
}

export default function CartDrawer({ open, onClose, cart, setCart, onOrderCreated }) {
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0),
    [cart]
  );

  const baseShippingFee = cart.length ? Number(STORE.shippingFee || 0) : 0;

  const { discount, shippingDiscount } = useMemo(
    () => calculateDiscount(appliedCoupon, subtotal, baseShippingFee),
    [appliedCoupon, subtotal, baseShippingFee]
  );

  const shippingFee = Math.max(0, baseShippingFee - shippingDiscount);
  const total = Math.max(0, subtotal - discount + shippingFee);

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateQty(key, qty) {
    setCart((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  }

  function removeItem(key) {
    setCart((prev) => prev.filter((item) => item.key !== key));
  }

  function clearCart() {
    setCart([]);
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponMessage("");
  }

  function applyCoupon() {
    setCouponMessage("");
    const coupon = findCoupon(couponCode);

    if (!coupon) {
      setAppliedCoupon(null);
      setCouponMessage("كود الخصم غير صحيح");
      return;
    }

    if (subtotal < Number(coupon.minSubtotal || 0)) {
      setAppliedCoupon(null);
      setCouponMessage(`الكود يحتاج طلب بقيمة ${currency(coupon.minSubtotal)} أو أكثر`);
      return;
    }

    setAppliedCoupon(coupon);
    setCouponMessage(`تم تطبيق ${coupon.label}`);
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponMessage("");
  }

  function buildOrderMessage(order) {
    const itemsText = order.items
      .map(
        (item, index) =>
          `${index + 1}) ${item.name}\n- المقاس: ${item.size}\n- اللون: ${
            item.color
          }\n- الكمية: ${item.qty}\n- السعر: ${currency(Number(item.price) * Number(item.qty))}`
      )
      .join("\n\n");

    return `أهلًا ${STORE.name} 💗\nرقم الطلب: ${order.orderNumber}\nعايزة أطلب الأوردر ده:\n\n${itemsText}\n\nملخص الطلب:\nSubtotal: ${currency(
      order.subtotal
    )}\nالخصم: ${currency(order.discount)}${
      order.couponCode ? `\nكود الخصم: ${order.couponCode}` : ""
    }\nالشحن: ${currency(order.shippingFee)}\nالإجمالي: ${currency(
      order.total
    )}\n\nبيانات العميلة:\nالاسم: ${
      order.customer.name || "لم يتم الإدخال"
    }\nالموبايل: ${order.customer.phone || "لم يتم الإدخال"}\nالمحافظة/المدينة: ${
      order.customer.city || "لم يتم الإدخال"
    }\nالعنوان: ${order.customer.address || "لم يتم الإدخال"}\nملاحظات: ${
      order.customer.notes || "لا يوجد"
    }\n\nتتبع الطلب من الرابط:\n${window.location.origin}${window.location.pathname}#/track`;
  }

  async function sendOrderToWhatsApp() {
    if (!cart.length || sending) return;

    if (!form.name.trim() || !form.phone.trim() || !form.city.trim() || !form.address.trim()) {
      setError("من فضلك اكتبي الاسم ورقم الموبايل والمدينة والعنوان قبل إرسال الطلب");
      return;
    }

    if (!/^01[0-9]{9}$/.test(form.phone.trim().replace(/\s+/g, ""))) {
      setError("رقم الموبايل غير صحيح. اكتبي رقم مصري صحيح مثل 01100792962");
      return;
    }

    setSending(true);
    setError("");
    setNotice("");

    try {
      const order = await createOrder({
        customer: { ...form },
        items: cart,
        subtotal,
        discount: discount + shippingDiscount,
        shippingFee,
        couponCode: appliedCoupon?.code || "",
        total,
      });

      setNotice(`تم تسجيل الطلب ${order.orderNumber}`);
      onOrderCreated?.();
      window.open(buildWhatsAppLink(buildOrderMessage(order)), "_blank");

      setCart([]);
      setAppliedCoupon(null);
      setCouponCode("");
      setCouponMessage("");
      setForm({ name: "", phone: "", city: "", address: "", notes: "" });
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء تسجيل الطلب");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={`cart-layer ${open ? "open" : ""}`}>
      <button className="cart-backdrop" onClick={onClose} aria-label="Close cart" />

      <aside className="cart-drawer">
        <div className="cart-header">
          <div>
            <span>{STORE.name}</span>
            <h2>سلة الطلبات</h2>
          </div>

          <button className="close-btn" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {notice && (
            <div className="success-notice">
              <CheckCircle2 />
              {notice}
            </div>
          )}

          {error && (
            <div className="error-notice">
              <AlertTriangle />
              {error}
            </div>
          )}

          {!cart.length ? (
            <div className="empty-cart">
              <span>
                <ShoppingBag size={46} />
              </span>
              <h3>السلة فاضية</h3>
              <p>اختاري المنتجات اللي عجباكي واضغطي أضيفي للسلة.</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.key}>
                    <img src={item.image} alt={item.name} />

                    <div className="cart-item-info">
                      <div className="cart-item-title">
                        <h3>{item.name}</h3>
                        <button onClick={() => removeItem(item.key)} aria-label="Remove">
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <p>
                        {item.size} / {item.color}
                      </p>

                      <strong>{currency(Number(item.price) * Number(item.qty))}</strong>

                      <div className="qty-controls">
                        <button onClick={() => updateQty(item.key, item.qty - 1)}>
                          <Minus size={14} />
                        </button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.key, item.qty + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="coupon-box">
                <div className="coupon-title">
                  <BadgePercent size={19} />
                  كود الخصم
                </div>

                <div className="coupon-row">
                  <input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="مثال: FASHION10"
                  />
                  <button onClick={applyCoupon}>تطبيق</button>
                </div>

                {couponMessage && (
                  <p className={appliedCoupon ? "coupon-success" : "coupon-error"}>
                    {couponMessage}
                    {appliedCoupon && (
                      <button onClick={removeCoupon}>إزالة</button>
                    )}
                  </p>
                )}
              </div>

              <div className="total-box">
                <div>
                  <span>Subtotal</span>
                  <strong>{currency(subtotal)}</strong>
                </div>
                <div>
                  <span>الخصم</span>
                  <strong>- {currency(discount + shippingDiscount)}</strong>
                </div>
                <div>
                  <span>الشحن</span>
                  <strong>{currency(shippingFee)}</strong>
                </div>
                <div className="grand-total">
                  <span>الإجمالي</span>
                  <strong>{currency(total)}</strong>
                </div>
                <p>{STORE.shippingText}</p>
              </div>

              <div className="order-form">
                <h3>بيانات الطلب</h3>

                <input
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  placeholder="الاسم"
                />
                <input
                  value={form.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                  placeholder="رقم الموبايل"
                />
                <input
                  value={form.city}
                  onChange={(e) => updateForm("city", e.target.value)}
                  placeholder="المحافظة / المدينة"
                />
                <textarea
                  value={form.address}
                  onChange={(e) => updateForm("address", e.target.value)}
                  placeholder="العنوان بالتفصيل"
                  rows="3"
                />
                <textarea
                  value={form.notes}
                  onChange={(e) => updateForm("notes", e.target.value)}
                  placeholder="ملاحظات اختيارية"
                  rows="2"
                />

                <button className="clear-cart-btn" onClick={clearCart}>
                  تفريغ السلة
                </button>
              </div>
            </>
          )}
        </div>

        <div className="cart-footer">
          <button
            className="send-order-btn"
            onClick={sendOrderToWhatsApp}
            disabled={!cart.length || sending}
          >
            <MessageCircle size={22} />
            {sending ? "جاري تسجيل الطلب..." : "تسجيل وإرسال الطلب على واتساب"}
          </button>
        </div>
      </aside>
    </div>
  );
}
