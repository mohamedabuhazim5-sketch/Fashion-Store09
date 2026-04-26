export const STORE = {
  name: "Fashion Store",
  slogan: "Girly Fashion Boutique",
  description:
    "متجر ملابس بناتي أنيق جدًا، ستايل ناعم وجذاب، وتجربة شراء سهلة وسريعة من المتجر مباشرة إلى واتساب.",
  whatsappNumber: "201100792962",
  whatsappDisplay: "01100792962",
  whatsappChannel: "https://whatsapp.com/channel/0029VbD7qjqGzzKVKWEzEF2B",
  facebook: "https://www.facebook.com/share/18F6VVRRa1/",
  instagram: "https://www.instagram.com/deer.6634101?igsh=MWpuMXZ3eGs5bGlncg==",
  currency: "جنيه",
  shippingText: "الشحن يتم تأكيده على واتساب حسب العنوان.",
  adminUsername: "admin",
  adminPassword: "123456",
  localAdminUsername: "admin",
  localAdminPassword: "123456",
  shippingFee: 50,
  coupons: [
    {
      code: "FASHION10",
      type: "percent",
      value: 10,
      label: "خصم 10%",
      minSubtotal: 300
    },
    {
      code: "WELCOME50",
      type: "fixed",
      value: 50,
      label: "خصم 50 جنيه",
      minSubtotal: 500
    },
    {
      code: "FREEDELIVERY",
      type: "shipping",
      value: 50,
      label: "شحن مجاني",
      minSubtotal: 700
    }
  ]
};
