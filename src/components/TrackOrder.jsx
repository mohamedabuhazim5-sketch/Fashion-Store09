import { useState } from "react";
import { Home, PackageSearch, Search, AlertTriangle, CheckCircle2, Clock3, Truck, PackageCheck } from "lucide-react";
import { trackOrder } from "../services/orderService";
import { currency, formatDate } from "../utils/format";

function statusIcon(status) {
  if (status === "تم التسليم") return <PackageCheck />;
  if (status === "تم الشحن") return <Truck />;
  if (status === "قيد التجهيز") return <Clock3 />;
  return <CheckCircle2 />;
}

export default function TrackOrder() {
  const [form, setForm] = useState({ orderNumber: "", phone: "" });
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTrack(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setNotFound(false);
    setResult(null);

    try {
      const order = await trackOrder(form.orderNumber, form.phone);
      if (!order) {
        setNotFound(true);
      } else {
        setResult(order);
      }
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء تتبع الطلب");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="track-page">
      <section className="track-card">
        <a href="#/" className="back-home-link">
          <Home size={18} />
          رجوع للمتجر
        </a>

        <div className="track-icon">
          <PackageSearch />
        </div>

        <h1>تتبع طلبك</h1>
        <p>اكتبي رقم الطلب ورقم الموبايل المستخدم في الطلب لمعرفة الحالة.</p>

        <form className="track-form" onSubmit={handleTrack}>
          <input
            value={form.orderNumber}
            onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
            placeholder="رقم الطلب مثال: FS-20260426-1234"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="رقم الموبايل"
          />
          <button type="submit" disabled={loading}>
            <Search size={19} />
            {loading ? "جاري البحث..." : "تتبع الطلب"}
          </button>
        </form>

        {error && (
          <div className="error-notice track-notice">
            <AlertTriangle />
            {error}
          </div>
        )}

        {notFound && (
          <div className="error-notice track-notice">
            <AlertTriangle />
            لم يتم العثور على الطلب. تأكدي من رقم الطلب ورقم الموبايل.
          </div>
        )}

        {result && (
          <div className="track-result">
            <div className="track-status">
              {statusIcon(result.status)}
              <div>
                <span>حالة الطلب</span>
                <strong>{result.status}</strong>
              </div>
            </div>

            <div className="track-info-grid">
              <div>
                <span>رقم الطلب</span>
                <strong>{result.orderNumber}</strong>
              </div>
              <div>
                <span>الإجمالي</span>
                <strong>{currency(result.total)}</strong>
              </div>
              <div>
                <span>عدد القطع</span>
                <strong>{result.itemCount}</strong>
              </div>
              <div>
                <span>المدينة</span>
                <strong>{result.customerCity || "-"}</strong>
              </div>
            </div>

            <p className="track-date">تاريخ الطلب: {formatDate(result.createdAt)}</p>
          </div>
        )}
      </section>
    </main>
  );
}
