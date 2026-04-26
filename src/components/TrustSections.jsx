import { HelpCircle, Ruler, Star, Sparkles } from "lucide-react";

const reviews = [
  {
    name: "سارة محمد",
    text: "الخامة طلعت أحلى من الصور والتوصيل كان سريع جدًا. أكيد هطلب تاني.",
    rate: 5,
  },
  {
    name: "منة أحمد",
    text: "المقاس كان مظبوط والتغليف شيك جدًا. شكراً Fashion Store.",
    rate: 5,
  },
  {
    name: "روان خالد",
    text: "أحلى حاجة إن الطلب بيتبعت واتساب بسهولة ومفيش تعقيد.",
    rate: 5,
  },
];

const faqs = [
  {
    q: "إزاي أعرف المقاس المناسب؟",
    a: "راجعي دليل المقاسات الموجود في الصفحة، ولو محتارة ابعتي لنا على واتساب وهنساعدك.",
  },
  {
    q: "هل الشحن متاح لكل المحافظات؟",
    a: "نعم، الشحن يتم تأكيده على واتساب حسب المحافظة والعنوان.",
  },
  {
    q: "إمتى بيتأكد الطلب؟",
    a: "بعد إرسال الطلب على واتساب، هنراجع التفاصيل ونأكد معاكِ السعر والشحن.",
  },
];

export default function TrustSections() {
  return (
    <>
      <section className="size-guide-section section-padding-sm">
        <div className="container">
          <div className="section-head simple">
            <div>
              <span className="section-label">
                <Ruler size={18} />
                Size Guide
              </span>
              <h2>دليل المقاسات</h2>
              <p>اختاري المقاس الأقرب لكِ، ولو محتارة كلمينا على واتساب.</p>
            </div>
          </div>

          <div className="size-table-card">
            <table>
              <thead>
                <tr>
                  <th>المقاس</th>
                  <th>الصدر</th>
                  <th>الوسط</th>
                  <th>الطول التقريبي</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>S</td>
                  <td>84 - 88 سم</td>
                  <td>66 - 70 سم</td>
                  <td>حسب الموديل</td>
                </tr>
                <tr>
                  <td>M</td>
                  <td>89 - 94 سم</td>
                  <td>71 - 76 سم</td>
                  <td>حسب الموديل</td>
                </tr>
                <tr>
                  <td>L</td>
                  <td>95 - 100 سم</td>
                  <td>77 - 82 سم</td>
                  <td>حسب الموديل</td>
                </tr>
                <tr>
                  <td>XL</td>
                  <td>101 - 108 سم</td>
                  <td>83 - 90 سم</td>
                  <td>حسب الموديل</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="reviews-section section-padding-sm">
        <div className="container">
          <div className="section-head simple">
            <div>
              <span className="section-label">
                <Sparkles size={18} />
                Reviews
              </span>
              <h2>آراء العميلات</h2>
              <p>ثقة العميلات أهم حاجة عندنا.</p>
            </div>
          </div>

          <div className="reviews-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <div className="review-stars">
                  {Array.from({ length: review.rate }).map((_, index) => (
                    <Star key={index} size={17} fill="currentColor" />
                  ))}
                </div>
                <p>{review.text}</p>
                <strong>{review.name}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section section-padding-sm">
        <div className="container">
          <div className="section-head simple">
            <div>
              <span className="section-label">
                <HelpCircle size={18} />
                FAQ
              </span>
              <h2>أسئلة شائعة</h2>
              <p>إجابات سريعة على أهم الأسئلة.</p>
            </div>
          </div>

          <div className="faq-grid">
            {faqs.map((item) => (
              <article className="faq-card" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
