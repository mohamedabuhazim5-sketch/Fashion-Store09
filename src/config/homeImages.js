export const HOME_IMAGE_SLOTS = [
  {
    key: "magazineCover",
    label: "صورة كتالوج الصفحة الرئيسية",
    hint: "الصورة الكبيرة في قسم Magazine Look",
  },
  {
    key: "materialDetail",
    label: "صورة تفاصيل الخامة",
    hint: "الصورة الكبيرة في قسم Material Details",
  },
  {
    key: "brandStoryMain",
    label: "صورة قصة البراند الرئيسية",
    hint: "الصورة الكبيرة في Brand Story",
  },
  {
    key: "brandStorySmall",
    label: "صورة قصة البراند الصغيرة",
    hint: "الصورة الصغيرة فوق بطاقة Brand Story",
  },
  {
    key: "seasonalOne",
    label: "صورة المجموعة الموسمية 1",
    hint: "أول كارت في Seasonal Collection",
  },
  {
    key: "seasonalTwo",
    label: "صورة المجموعة الموسمية 2",
    hint: "ثاني كارت في Seasonal Collection",
  },
  {
    key: "seasonalThree",
    label: "صورة المجموعة الموسمية 3",
    hint: "ثالث كارت في Seasonal Collection",
  },
  {
    key: "boutiqueOne",
    label: "صورة بوتيك 1",
    hint: "أول كارت في Boutique Ribbon",
  },
  {
    key: "boutiqueTwo",
    label: "صورة بوتيك 2",
    hint: "ثاني كارت في Boutique Ribbon",
  },
  {
    key: "boutiqueThree",
    label: "صورة بوتيك 3",
    hint: "ثالث كارت في Boutique Ribbon",
  },
  {
    key: "shopLookOne",
    label: "صورة Shop The Look 1",
    hint: "أول كارت في Shop The Look",
  },
  {
    key: "shopLookTwo",
    label: "صورة Shop The Look 2",
    hint: "ثاني كارت في Shop The Look",
  },
  {
    key: "shopLookThree",
    label: "صورة Shop The Look 3",
    hint: "ثالث كارت في Shop The Look",
  },
  {
    key: "moodboardOne",
    label: "صورة Moodboard 1",
    hint: "أول صورة في Fashion Moodboard",
  },
  {
    key: "moodboardTwo",
    label: "صورة Moodboard 2",
    hint: "ثاني صورة في Fashion Moodboard",
  },
  {
    key: "moodboardThree",
    label: "صورة Moodboard 3",
    hint: "ثالث صورة في Fashion Moodboard",
  },
  {
    key: "moodboardFour",
    label: "صورة Moodboard 4",
    hint: "رابع صورة في Fashion Moodboard",
  },,
  {
    key: "styleCompareOne",
    label: "صورة مقارنة ستايل 1",
    hint: "أول كارت في Compare Your Style",
  },
  {
    key: "styleCompareTwo",
    label: "صورة مقارنة ستايل 2",
    hint: "ثاني كارت في Compare Your Style",
  },
  {
    key: "styleCompareThree",
    label: "صورة مقارنة ستايل 3",
    hint: "ثالث كارت في Compare Your Style",
  },
  {
    key: "bentoOne",
    label: "صورة Premium Layout 1",
    hint: "أول صورة في Premium Bento",
  },
  {
    key: "bentoTwo",
    label: "صورة Premium Layout 2",
    hint: "ثاني صورة في Premium Bento",
  },
  {
    key: "bentoThree",
    label: "صورة Premium Layout 3",
    hint: "ثالث صورة في Premium Bento",
  },
  {
    key: "lookbookOne",
    label: "صورة Lookbook 1",
    hint: "أول صورة في Lookbook",
  },
  {
    key: "lookbookTwo",
    label: "صورة Lookbook 2",
    hint: "ثاني صورة في Lookbook",
  },
  {
    key: "lookbookThree",
    label: "صورة Lookbook 3",
    hint: "ثالث صورة في Lookbook",
  },
  {
    key: "outfitMain",
    label: "صورة Outfit الرئيسية",
    hint: "الصورة الرئيسية في Outfit Builder",
  },
  {
    key: "outfitAccessory",
    label: "صورة Outfit الإكسسوار",
    hint: "الصورة الصغيرة الأولى في Outfit Builder",
  },
  {
    key: "outfitSecond",
    label: "صورة Outfit الثانية",
    hint: "الصورة الصغيرة الثانية في Outfit Builder",
  },
  {
    key: "styleTabsSoft",
    label: "صورة Style Finder الناعم",
    hint: "صورة Soft Girl في Style Finder",
  },
  {
    key: "styleTabsCasual",
    label: "صورة Style Finder كاجوال",
    hint: "صورة Casual Chic في Style Finder",
  },
  {
    key: "styleTabsEvening",
    label: "صورة Style Finder مناسبات",
    hint: "صورة Evening في Style Finder",
  }
];

export const emptyHomeImages = HOME_IMAGE_SLOTS.reduce((acc, slot) => {
  acc[slot.key] = "";
  return acc;
}, {});
