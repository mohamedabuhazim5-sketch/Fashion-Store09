import { LogOut, PackagePlus, ShoppingBag, Trash2, Edit3, Save, X, Printer, RotateCcw, Home, Search, BarChart3, UploadCloud, ImagePlus, Download } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { STORE } from "../config/store";
import AdminHeroUpgrade from "./AdminHeroUpgrade";
import AdminPolishNotes from "./AdminPolishNotes";
import AdminHomeImages from "./AdminHomeImages";
import { defaultProducts } from "../data/defaultProducts";
import { currency, formatDate } from "../utils/format";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import {
  createProductSupabase,
  deleteProductSupabase,
  updateProductSupabase,
  updateOrderStatusSupabase,
  deleteOrderSupabase,
  uploadProductImage,
} from "../services/supabaseService";



function cleanProductList(list) {
  return (Array.isArray(list) ? list : []).filter((item) => item && typeof item === "object" && item.id !== null && item.id !== undefined);
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

const emptyProduct = {
  name: "",
  category: "فساتين",
  price: "",
  oldPrice: "",
  tag: "جديد",
  rating: 4.8,
  stock: 1,
  image: "",
  colors: "وردي, أسود, أبيض",
  sizes: "S, M, L",
  description: "",
};

function normalizeProduct(form, editingId) {
  return {
    id: editingId || Date.now(),
    name: form.name.trim() || "منتج جديد",
    category: form.category.trim() || "كاجوال",
    price: Number(form.price) || 0,
    oldPrice: Number(form.oldPrice) || Number(form.price) || 0,
    old_price: Number(form.oldPrice) || Number(form.price) || 0,
    tag: form.tag.trim() || "جديد",
    rating: Number(form.rating) || 4.8,
    stock: Number(form.stock) || 0,
    image:
      form.image.trim() ||
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    colors: String(form.colors)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    sizes: String(form.sizes)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    description: form.description.trim() || "منتج أنيق من Fashion Store.",
    is_active: form.is_active !== false,
    sort_order: Number(form.sort_order) || 0,
  };
}

function productToForm(product) {
  return {
    ...product,
    oldPrice: product.oldPrice ?? product.old_price,
    colors: Array.isArray(product.colors) ? product.colors.join(", ") : String(product.colors || ""),
    sizes: Array.isArray(product.sizes) ? product.sizes.join(", ") : String(product.sizes || ""),
  };
}

export default function AdminPage({
  products = [],
  setProducts,
  orders = [],
  setOrders,
  refreshProducts,
  refreshOrders,
  homeImages,
  setHomeImages,
}) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!isSupabaseConfigured && localStorage.getItem("fashion_admin") === "yes");
  const [login, setLogin] = useState({ username: "", email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState("products");
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");
  const [orderQuery, setOrderQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("الكل");

  useEffect(() => {
    async function checkSession() {
      if (!isSupabaseConfigured) return;
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setLoggedIn(true);
        await refreshProducts?.();
        await refreshOrders?.();
      }
    }
    checkSession();
  }, []);

  const filteredProducts = useMemo(() => {
    const key = query.trim().toLowerCase();
    if (!key) return cleanProductList(products);
    return cleanProductList(products).filter(
      (product) =>
        product.name.toLowerCase().includes(key) ||
        product.category.toLowerCase().includes(key)
    );
  }, [products, query]);

  
  const filteredOrders = useMemo(() => {
    const key = orderQuery.trim().toLowerCase();

    return (orders || []).filter(Boolean).filter((order) => {
      const matchStatus = orderStatusFilter === "الكل" || order.status === orderStatusFilter;
      const matchSearch =
        !key ||
        String(order.orderNumber || "").toLowerCase().includes(key) ||
        String(order.customer?.name || "").toLowerCase().includes(key) ||
        String(order.customer?.phone || "").toLowerCase().includes(key);

      return matchStatus && matchSearch;
    });
  }, [orders, orderQuery, orderStatusFilter]);

  const stats = useMemo(() => {
    const safeOrders = (orders || []).filter(Boolean);
    const revenue = safeOrders.reduce((sum, order) => sum + Number(order.total || 0), 0);
    return {
      products: cleanProductList(products).length,
      orders: safeOrders.length,
      revenue,
      newOrders: safeOrders.filter((order) => order.status === "جديد").length,
    };
  }, [products, orders]);

  const recentOrders = useMemo(() => {
    return (orders || [])
      .filter(Boolean)
      .slice()
      .sort((a, b) => new Date(b.createdAt || b.created_at || 0) - new Date(a.createdAt || a.created_at || 0))
      .slice(0, 4);
  }, [orders]);

  async function handleLogin(e) {
    e.preventDefault();

    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithPassword({
        email: login.email,
        password: login.password,
      });

      if (error) {
        setLoginError(error.message || "بيانات الدخول غير صحيحة");
        return;
      }

      setLoggedIn(true);
      setLoginError("");
      await refreshProducts?.();
      await refreshOrders?.();
      return;
    }

    if (
      login.username === STORE.localAdminUsername &&
      login.password === STORE.localAdminPassword
    ) {
      localStorage.setItem("fashion_admin", "yes");
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("بيانات الدخول غير صحيحة");
    }
  }

  async function logout() {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem("fashion_admin");
    }
    setLoggedIn(false);
  }

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }


  async function handleImageUpload(file) {
    if (!file) return;

    setUploadingImage(true);
    setActionError("");

    try {
      const imageUrl = await uploadProductImage(file);
      updateForm("image", imageUrl);
    } catch (err) {
      setActionError(err.message || "حدث خطأ أثناء رفع الصورة");
    } finally {
      setUploadingImage(false);
    }
  }

  async function saveProduct(e) {
    e.preventDefault();
    const product = normalizeProduct(form, editingId);

    try {
      if (isSupabaseConfigured) {
        if (editingId && isUuid(editingId)) {
          const saved = await updateProductSupabase(editingId, product);
          setProducts((current) => cleanProductList(current).map((item) => (String(item.id) === String(editingId) ? saved : item)));
        } else if (editingId && !isUuid(editingId)) {
          // منتج قديم/محلي برقم عادي: نضيفه كمنتج جديد في Supabase بدل تحديث id غير UUID
          const { id: _localId, ...productWithoutLocalId } = product;
          const saved = await createProductSupabase(productWithoutLocalId);
          setProducts((current) => [
            saved,
            ...cleanProductList(current).filter((item) => String(item.id) !== String(editingId)),
          ]);
        } else {
          const saved = await createProductSupabase(product);
          setProducts((current) => [saved, ...cleanProductList(current)]);
        }
        await refreshProducts?.();
      } else {
        if (editingId) {
          setProducts((current) => cleanProductList(current).map((item) => (String(item.id) === String(editingId) ? product : item)));
        } else {
          setProducts((current) => [product, ...cleanProductList(current)]);
        }
      }

      setForm(emptyProduct);
      setEditingId(null);
    } catch (error) {
      alert(error.message || "حدث خطأ أثناء حفظ المنتج");
    }
  }

  function editProduct(product) {
    setEditingId(product.id);
    setForm(productToForm(product));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteProduct(id) {
    if (!id) return;
    if (!confirm("هل تريد حذف المنتج؟")) return;

    try {
      if (isSupabaseConfigured && isUuid(id)) {
        await deleteProductSupabase(id);
        await refreshProducts?.();
      }

      // حذف آمن: ينظف null/undefined ويمنع قراءة id من عنصر فاضي
      setProducts((current) =>
        cleanProductList(current).filter((product) => String(product.id) !== String(id))
      );
    } catch (error) {
      alert(error.message || "حدث خطأ أثناء حذف المنتج");
    }
  }

  function resetProducts() {
    if (isSupabaseConfigured) {
      alert("الرجوع للمنتجات الافتراضية متاح في الوضع المحلي فقط. في Supabase احذف أو أضف المنتجات من اللوحة.");
      return;
    }
    if (confirm("سيتم حذف المنتجات الحالية ورجوع المنتجات الافتراضية. هل أنت متأكد؟")) {
      setProducts(cleanProductList(defaultProducts));
    }
  }

  async function updateOrderStatus(orderId, status) {
    try {
      if (isSupabaseConfigured) {
        await updateOrderStatusSupabase(orderId, status);
      }
      setOrders(
        (filteredOrders || []).map((order) => (order.id === orderId ? { ...order, status } : order))
      );
    } catch (error) {
      alert(error.message || "حدث خطأ أثناء تحديث حالة الطلب");
    }
  }

  async function deleteOrder(orderId) {
    if (!confirm("هل تريد حذف الطلب؟")) return;

    try {
      if (isSupabaseConfigured) {
        await deleteOrderSupabase(orderId);
      }
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      alert(error.message || "حدث خطأ أثناء حذف الطلب");
    }
  }


  function exportOrdersCsv() {
    const rows = [
      [
        "Order Number",
        "Date",
        "Customer",
        "Phone",
        "City",
        "Status",
        "Subtotal",
        "Discount",
        "Shipping",
        "Total",
        "Coupon",
      ],
      ...(filteredOrders || []).map((order) => [
        order.orderNumber,
        formatDate(order.createdAt),
        order.customer?.name || "",
        order.customer?.phone || "",
        order.customer?.city || "",
        order.status,
        order.subtotal || order.total,
        order.discount || 0,
        order.shippingFee || 0,
        order.total,
        order.couponCode || "",
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\ufeff" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fashion-store-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function printOrder(order) {
    const itemsRows = order.items
      .map(
        (item) => `
          <tr>
            <td>${item.name}<br><small>${item.size} / ${item.color}</small></td>
            <td>${item.qty}</td>
            <td>${currency(item.price * item.qty)}</td>
          </tr>
        `
      )
      .join("");

    const html = `
      <!doctype html>
      <html lang="ar" dir="rtl">
        <head>
          <meta charset="UTF-8" />
          <title>${order.orderNumber || order.order_number || 'طلب'}</title>
          <style>
            @page { size: 80mm auto; margin: 4mm; }
            body { width: 72mm; margin: 0 auto; font-family: Arial, sans-serif; color: #111; direction: rtl; }
            .receipt { padding: 6px; }
            h1 { font-size: 18px; text-align: center; margin: 0; }
            .sub { text-align: center; font-size: 11px; margin: 4px 0 10px; }
            .line { border-top: 1px dashed #111; margin: 8px 0; }
            p { margin: 4px 0; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; font-size: 11px; }
            th, td { padding: 5px 2px; border-bottom: 1px dashed #999; vertical-align: top; }
            th { text-align: right; }
            .total { font-size: 15px; font-weight: bold; display: flex; justify-content: space-between; margin-top: 8px; }
            .thanks { text-align: center; margin-top: 10px; font-weight: bold; }
            small { font-size: 10px; }
          </style>
        </head>
        <body>
          <div class="receipt">
            <h1>${STORE.name}</h1>
            <div class="sub">${STORE.whatsappDisplay}</div>
            <div class="line"></div>
            <p><b>رقم الطلب:</b> ${order.orderNumber || order.order_number || 'طلب'}</p>
            <p><b>التاريخ:</b> ${formatDate(order.createdAt)}</p>
            <p><b>العميلة:</b> ${order.customer.name || "-"}</p>
            <p><b>الموبايل:</b> ${order.customer.phone || "-"}</p>
            <p><b>العنوان:</b> ${order.customer.city || ""} - ${order.customer.address || ""}</p>
            <div class="line"></div>
            <table>
              <thead>
                <tr>
                  <th>الصنف</th>
                  <th>كمية</th>
                  <th>السعر</th>
                </tr>
              </thead>
              <tbody>${itemsRows}</tbody>
            </table>
            <div class="total"><span>Subtotal</span><span>${currency(order.subtotal || order.total)}</span></div>
            <div class="total"><span>الخصم</span><span>- ${currency(order.discount || 0)}</span></div>
            <div class="total"><span>الشحن</span><span>${currency(order.shippingFee || 0)}</span></div>
            <div class="total"><span>الإجمالي</span><span>${currency(order.total)}</span></div>
            <div class="line"></div>
            <p><b>ملاحظات:</b> ${order.customer.notes || "لا يوجد"}</p>
            <p class="thanks">شكرًا لطلبك من Fashion Store 💗</p>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `;

    const win = window.open("", "_blank", "width=420,height=700");
    win.document.write(html);
    win.document.close();
  }

  if (!loggedIn) {
    return (
      <main className="admin-login-page">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <a href="#/" className="back-home-link">
            <Home size={18} />
            رجوع للمتجر
          </a>

          <div className="login-logo">
            <ShoppingBag />
          </div>

          <h1>لوحة تحكم Fashion Store</h1>
          <p>{isSupabaseConfigured ? "سجّل دخول بإيميل الأدمن في Supabase." : "ادخل بيانات الأدمن لإدارة المنتجات والطلبات."}</p>

          {loginError && <div className="login-error">{loginError}</div>}

          {isSupabaseConfigured ? (
            <input
              type="email"
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
              placeholder="إيميل الأدمن"
            />
          ) : (
            <input
              value={login.username}
              onChange={(e) => setLogin({ ...login, username: e.target.value })}
              placeholder="اسم المستخدم"
            />
          )}
          <input
            type="password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            placeholder="كلمة المرور"
          />

          <button type="submit">دخول لوحة التحكم</button>

          {!isSupabaseConfigured && (
            <div className="admin-hint">
              Username: <b>admin</b> / Password: <b>123456</b>
            </div>
          )}
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <ShoppingBag />
          <div>
            <strong>{STORE.name}</strong>
            <span>Admin Dashboard</span>
          </div>
        </div>

        <button className={tab === "products" ? "active" : ""} onClick={() => setTab("products")}>
          <PackagePlus />
          المنتجات
        </button>

        <button className={tab === "orders" ? "active" : ""} onClick={() => setTab("orders")}>
          <ShoppingBag />
          الطلبات
        </button>

        <button className={tab === "homeImages" ? "active" : ""} onClick={() => setTab("homeImages")}>
          <ImagePlus />
          صور الواجهة
        </button>

        <a href="#/">
          <Home />
          فتح المتجر
        </a>

        <button onClick={logout}>
          <LogOut />
          تسجيل خروج
        </button>
      </aside>

      <section className="admin-content admin-content-v12">
        <div className="admin-topbar">
          <div>
            <span>Fashion Store</span>
            <h1>لوحة التحكم</h1>
          </div>

          <div className="admin-search">
            <Search size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="بحث في المنتجات..."
            />
          </div>
        </div>

        <AdminHeroUpgrade
          productsCount={stats.products}
          ordersCount={stats.orders}
          newOrdersCount={stats.newOrders}
        />

        <AdminPolishNotes />

        <div className="stats-grid">
          <div>
            <BarChart3 />
            <span>عدد المنتجات</span>
            <strong>{stats.products}</strong>
          </div>
          <div>
            <ShoppingBag />
            <span>عدد الطلبات</span>
            <strong>{stats.orders}</strong>
          </div>
          <div>
            <PackagePlus />
            <span>طلبات جديدة</span>
            <strong>{stats.newOrders}</strong>
          </div>
          <div>
            <BarChart3 />
            <span>إجمالي المبيعات</span>
            <strong>{currency(stats.revenue)}</strong>
          </div>
        </div>

        <div className="admin-insights-grid">
          <div className="admin-insight-card">
            <h3>نظرة سريعة</h3>
            <p>من هنا تقدري تديري المنتجات، تراجعي الأوردرات، وتتابعي الأداء بشكل أسرع.</p>
            <div className="admin-insight-actions">
              <button type="button" onClick={() => setTab("products")}>إدارة المنتجات</button>
              <button type="button" onClick={() => setTab("orders")}>متابعة الطلبات</button>
            </div>
          </div>

          <div className="admin-insight-card">
            <h3>آخر الطلبات</h3>
            {recentOrders.length ? (
              <div className="recent-orders-list">
                {(recentOrders || []).map((order) => (
                  <div className="recent-order-item" key={order.id || order.orderNumber || order.order_number}>
                    <div>
                      <strong>{order.orderNumber || order.order_number || 'طلب'}</strong>
                      <span>{order.customer?.name || order.customer_name || "عميلة"} • {order.status || "جديد"}</span>
                    </div>
                    <b>{currency(order.total || 0)}</b>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-recent-orders">لا توجد طلبات بعد.</p>
            )}
          </div>
        </div>

        {tab === "homeImages" && (
          <AdminHomeImages homeImages={homeImages} setHomeImages={setHomeImages} />
        )}

        {tab === "products" && (
          <>
            <form className="admin-form" onSubmit={saveProduct}>
              <div className="form-head">
                <h2>{editingId ? "تعديل منتج" : "إضافة منتج جديد"}</h2>

                {editingId && (
                  <button
                    type="button"
                    className="cancel-edit"
                    onClick={() => {
                      setEditingId(null);
                      setForm(emptyProduct);
                    }}
                  >
                    <X size={18} />
                    إلغاء
                  </button>
                )}
              </div>

              <div className="admin-form-grid">
                <input value={form.name} onChange={(e) => updateForm("name", e.target.value)} placeholder="اسم المنتج" />
                <input value={form.category} onChange={(e) => updateForm("category", e.target.value)} placeholder="القسم" />
                <input type="number" value={form.price} onChange={(e) => updateForm("price", e.target.value)} placeholder="السعر" />
                <input type="number" value={form.oldPrice} onChange={(e) => updateForm("oldPrice", e.target.value)} placeholder="السعر قبل الخصم" />
                <input value={form.tag} onChange={(e) => updateForm("tag", e.target.value)} placeholder="بادج المنتج مثل جديد" />
                <input type="number" step="0.1" value={form.rating} onChange={(e) => updateForm("rating", e.target.value)} placeholder="التقييم" />
                <input type="number" value={form.stock} onChange={(e) => updateForm("stock", e.target.value)} placeholder="المخزون" />
                <input value={form.sizes} onChange={(e) => updateForm("sizes", e.target.value)} placeholder="المقاسات: S, M, L" />
                <input value={form.colors} onChange={(e) => updateForm("colors", e.target.value)} placeholder="الألوان: وردي, أسود" />
                
                <div className="image-upload-box">
                  <label className="upload-btn">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      onChange={(e) => handleImageUpload(e.target.files?.[0])}
                    />
                    <UploadCloud size={18} />
                    {uploadingImage ? "جاري رفع الصورة..." : "رفع صورة المنتج"}
                  </label>

                  {form.image ? (
                    <div className="image-preview">
                      <img src={form.image} alt="Product preview" />
                      <span>تم اختيار الصورة</span>
                    </div>
                  ) : (
                    <div className="image-preview empty">
                      <ImagePlus size={24} />
                      <span>لم يتم اختيار صورة</span>
                    </div>
                  )}
                </div>

                <input value={form.image} onChange={(e) => updateForm("image", e.target.value)} placeholder="أو ضع رابط الصورة يدويًا" />

                <textarea value={form.description} onChange={(e) => updateForm("description", e.target.value)} placeholder="وصف المنتج" />
              </div>

              <div className="admin-form-actions">
                <button type="submit">
                  <Save size={18} />
                  {editingId ? "حفظ التعديل" : "إضافة المنتج"}
                </button>
                <button type="button" className="reset-btn" onClick={resetProducts}>
                  <RotateCcw size={18} />
                  رجوع المنتجات الافتراضية
                </button>
              </div>
            </form>

            <div className="admin-table-card">
              <h2>قائمة المنتجات</h2>

              <div className="admin-products-grid">
                {cleanProductList(filteredProducts).map((product) => (
                  <article className="admin-product-card" key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <div>
                      <span>{product.category}</span>
                      <h3>{product.name}</h3>
                      <p>{currency(product.price)} - مخزون {product.stock ?? 0} {Number(product.stock || 0) <= 3 && <b className="low-stock-admin">مخزون منخفض</b>}</p>
                    </div>
                    <div className="admin-product-actions">
                      <button onClick={() => editProduct(product)}>
                        <Edit3 size={17} />
                        تعديل
                      </button>
                      <button className="danger" onClick={() => deleteProduct(product.id)}>
                        <Trash2 size={17} />
                        حذف
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === "orders" && (
          <div className="admin-table-card">
            <div className="orders-toolbar">
              <h2>الطلبات</h2>

              <div className="orders-tools">
                <input
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  placeholder="بحث برقم الطلب / الاسم / الموبايل"
                />
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                >
                  <option>الكل</option>
                  <option>جديد</option>
                  <option>قيد التجهيز</option>
                  <option>تم الشحن</option>
                  <option>تم التسليم</option>
                  <option>ملغي</option>
                </select>
                <button onClick={exportOrdersCsv}>
                  <Download size={17} />
                  تصدير CSV
                </button>
              </div>
            </div>

            {!filteredOrders.length ? (
              <div className="empty-products">
                <h3>لا يوجد طلبات حتى الآن</h3>
                <p>أي طلب يتم إرساله من السلة سيتم تسجيله هنا.</p>
              </div>
            ) : (
              <div className="orders-list">
                {(filteredOrders || []).map((order) => (
                  <article className="order-card" key={order.id || order.orderNumber || order.order_number}>
                    <div className="order-head">
                      <div>
                        <span>{order.orderNumber || order.order_number || 'طلب'}</span>
                        <h3>{order.customer.name || "عميلة بدون اسم"}</h3>
                        <p>{formatDate(order.createdAt)}</p>
                      </div>

                      <strong>{currency(order.total)}</strong>
                    </div>

                    <div className="order-meta">
                      <p><b>الموبايل:</b> {order.customer.phone || "-"}</p>
                      <p><b>المدينة:</b> {order.customer.city || "-"}</p>
                      <p><b>العنوان:</b> {order.customer.address || "-"}</p>
                      <p><b>ملاحظات:</b> {order.customer.notes || "لا يوجد"}</p>
                      <p><b>كود الخصم:</b> {order.couponCode || "لا يوجد"}</p>
                    </div>

                    <div className="order-items">
                      {order.items.map((item) => (
                        <div key={item.key}>
                          <span>{item.name}</span>
                          <small>{item.size} / {item.color} × {item.qty}</small>
                        </div>
                      ))}
                    </div>

                    <div className="order-actions">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      >
                        <option>جديد</option>
                        <option>قيد التجهيز</option>
                        <option>تم الشحن</option>
                        <option>تم التسليم</option>
                        <option>ملغي</option>
                      </select>

                      <button onClick={() => printOrder(order)}>
                        <Printer size={17} />
                        طباعة فاتورة
                      </button>

                      <button className="danger" onClick={() => deleteOrder(order.id)}>
                        <Trash2 size={17} />
                        حذف
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
