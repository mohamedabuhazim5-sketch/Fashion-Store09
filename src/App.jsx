import { useEffect, useMemo, useState } from "react";
import AnnouncementBar from "./components/AnnouncementBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PromoSlider from "./components/PromoSlider";
import CountdownOffer from "./components/CountdownOffer";
import ReviewSpotlight from "./components/ReviewSpotlight";
import InstagramGallery from "./components/InstagramGallery";
import PromoBanners from "./components/PromoBanners";
import FeaturedCollections from "./components/FeaturedCollections";
import Features from "./components/Features";
import ProductsSection from "./components/ProductsSection";
import SocialSection from "./components/SocialSection";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import AdminPage from "./components/AdminPage";
import ProductModal from "./components/ProductModal";
import TrackOrder from "./components/TrackOrder";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ProductDetailsPage from "./components/ProductDetailsPage";
import WishlistPage from "./components/WishlistPage";
import DailyDeals from "./components/DailyDeals";
import CategoryShowcase from "./components/CategoryShowcase";
import StyleShowcase from "./components/StyleShowcase";
import CtaBand from "./components/CtaBand";
import EditorialBanners from "./components/EditorialBanners";
import LuxuryTestimonials from "./components/LuxuryTestimonials";
import MobileBottomNav from "./components/MobileBottomNav";
import TrustSections from "./components/TrustSections";
import BrandMetrics from "./components/BrandMetrics";
import LookbookGallery from "./components/LookbookGallery";
import StylePromise from "./components/StylePromise";
import BrandStory from "./components/BrandStory";
import ShopTheLook from "./components/ShopTheLook";
import PressStrip from "./components/PressStrip";
import BrandPaletteStrip from "./components/BrandPaletteStrip";
import PremiumBentoShowcase from "./components/PremiumBentoShowcase";
import StorePolicies from "./components/StorePolicies";
import FinalPolishCta from "./components/FinalPolishCta";
import LuxuryMarquee from "./components/LuxuryMarquee";
import DesignerPicks from "./components/DesignerPicks";
import FashionClub from "./components/FashionClub";
import ScrollToTop from "./components/ScrollToTop";
import MiniBenefitsRail from "./components/MiniBenefitsRail";
import SeasonalCollection from "./components/SeasonalCollection";
import FeaturedProductSpotlight from "./components/FeaturedProductSpotlight";
import SoftDivider from "./components/SoftDivider";
import BoutiqueRibbon from "./components/BoutiqueRibbon";
import OutfitBuilder from "./components/OutfitBuilder";
import GiftGuide from "./components/GiftGuide";
import ConversionDock from "./components/ConversionDock";
import FashionMoodboard from "./components/FashionMoodboard";
import QuickStyleQuiz from "./components/QuickStyleQuiz";
import QualityPromise from "./components/QualityPromise";
import SocialProofWall from "./components/SocialProofWall";
import CouponCorner from "./components/CouponCorner";
import FashionStories from "./components/FashionStories";
import StyleTabsShowcase from "./components/StyleTabsShowcase";
import RunwayOrderSteps from "./components/RunwayOrderSteps";
import HomeMicroCta from "./components/HomeMicroCta";
import MagazineLookBanner from "./components/MagazineLookBanner";
import LuxeProductRail from "./components/LuxeProductRail";
import FabricCare from "./components/FabricCare";
import CustomerJourney from "./components/CustomerJourney";
import FloatingCouponCard from "./components/FloatingCouponCard";
import NewDropsBanner from "./components/NewDropsBanner";
import SizeConfidence from "./components/SizeConfidence";
import BeforeAfterExperience from "./components/BeforeAfterExperience";
import BoutiqueFaqStrip from "./components/BoutiqueFaqStrip";
import { defaultProducts } from "./data/defaultProducts";
import { emptyHomeImages } from "./config/homeImages";
import { useLocalState } from "./hooks/useLocalState";
import { isSupabaseConfigured } from "./lib/supabase";
import { fetchHomeImagesFromSupabase, fetchOrdersFromSupabase, fetchProductsFromSupabase } from "./services/supabaseService";

import SearchHints from "./components/SearchHints";
import FrequentlyBoughtTogether from "./components/FrequentlyBoughtTogether";
import CheckoutConfidence from "./components/CheckoutConfidence";
import BrandValues from "./components/BrandValues";
import PremiumServiceStrip from "./components/PremiumServiceStrip";
import BackInStockAlert from "./components/BackInStockAlert";
import BrandRibbonFinal from "./components/BrandRibbonFinal";
import BrandTimeline from "./components/BrandTimeline";
import MaterialDetailShowcase from "./components/MaterialDetailShowcase";
import OrderConfidenceCards from "./components/OrderConfidenceCards";
import PersonalShopper from "./components/PersonalShopper";
import ProductVisualGuide from "./components/ProductVisualGuide";
import StickyBrandNote from "./components/StickyBrandNote";
import StyleCompare from "./components/StyleCompare";
import VipWhatsAppPanel from "./components/VipWhatsAppPanel";
export default function App() {
  const [route, setRoute] = useState(window.location.hash || "#/");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useLocalState("fashion_products", defaultProducts);
  const [orders, setOrders] = useLocalState("fashion_orders", []);
  const [cart, setCart] = useLocalState("fashion_cart", []);
  const [wishlist, setWishlist] = useLocalState("fashion_wishlist", []);
  const [homeImages, setHomeImages] = useLocalState("fashion_home_images", emptyHomeImages);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  async function refreshProducts() {
    if (!isSupabaseConfigured) return;

    try {
      setLoading(true);
      const remoteProducts = await fetchProductsFromSupabase();
      if (remoteProducts?.length) {
        setProducts(remoteProducts);
      }
      setDataError("");
    } catch (error) {
      setDataError(error.message || "حدث خطأ أثناء تحميل المنتجات من Supabase");
    } finally {
      setLoading(false);
    }
  }

  async function refreshOrders() {
    if (!isSupabaseConfigured) return;

    try {
      const remoteOrders = await fetchOrdersFromSupabase();
      if (remoteOrders) {
        setOrders(remoteOrders);
      }
      setDataError("");
    } catch (error) {
      setDataError(error.message || "حدث خطأ أثناء تحميل الطلبات من Supabase");
    }
  }

  async function refreshHomeImages() {
    if (!isSupabaseConfigured) return;

    try {
      const remoteHomeImages = await fetchHomeImagesFromSupabase();
      if (remoteHomeImages) {
        setHomeImages({ ...emptyHomeImages, ...remoteHomeImages });
      }
    } catch (error) {
      console.warn("Home images load error:", error.message);
    }
  }

  useEffect(() => {
    refreshProducts();
    refreshOrders();
    refreshHomeImages();
  }, []);

  const safeProducts = useMemo(() => {
    const fallbackImage =
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80";

    const source = Array.isArray(products) ? products : [];

    return source
      .map((product, index) => {
        if (!product || typeof product !== "object") return null;

        const price = Number(product.price ?? 0);
        const oldPrice = Number(product.oldPrice ?? product.old_price ?? price);

        return {
          ...product,
          id: product.id ?? `local-${index + 1}`,
          name: product.name || "منتج Fashion Store",
          category: product.category || "كاجوال",
          price: Number.isFinite(price) ? price : 0,
          oldPrice: Number.isFinite(oldPrice) ? oldPrice : price || 0,
          tag: product.tag || "جديد",
          rating: Number.isFinite(Number(product.rating)) ? Number(product.rating) : 4.8,
          stock: Number.isFinite(Number(product.stock)) ? Number(product.stock) : 0,
          image: product.image || product.image_url || fallbackImage,
          colors: Array.isArray(product.colors) && product.colors.length ? product.colors : ["وردي"],
          sizes: Array.isArray(product.sizes) && product.sizes.length ? product.sizes : ["One Size"],
          description: product.description || "قطعة مميزة من Fashion Store.",
          is_active: product.is_active !== false,
          sort_order: Number.isFinite(Number(product.sort_order)) ? Number(product.sort_order) : index + 1,
        };
      })
      .filter(Boolean);
  }, [products]);

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    const result = safeProducts.filter((product) => {
      if (!product) return false;

      const matchCategory = activeCategory === "الكل" || product.category === activeCategory;
      const name = String(product.name || "").toLowerCase();
      const category = String(product.category || "").toLowerCase();
      const description = String(product.description || "").toLowerCase();

      const matchSearch =
        !keyword ||
        name.includes(keyword) ||
        category.includes(keyword) ||
        description.includes(keyword);

      return matchCategory && matchSearch && product.is_active !== false;
    });

    return [...result].sort((a, b) => {
      if (sort === "low") return Number(a.price || 0) - Number(b.price || 0);
      if (sort === "high") return Number(b.price || 0) - Number(a.price || 0);
      if (sort === "rating") return Number(b.rating || 0) - Number(a.rating || 0);
      return Number(a.sort_order || 9999) - Number(b.sort_order || 9999);
    });
  }, [safeProducts, activeCategory, search, sort]);

  const safeCart = useMemo(() => (Array.isArray(cart) ? cart.filter(Boolean) : []), [cart]);
  const safeWishlist = useMemo(
    () => (Array.isArray(wishlist) ? wishlist.filter(Boolean).map(String) : []),
    [wishlist]
  );

  const cartCount = useMemo(
    () => safeCart.reduce((sum, item) => sum + Number(item?.qty || 0), 0),
    [safeCart]
  );

  function isFavorite(productId) {
    return safeWishlist.includes(String(productId));
  }

  function toggleWishlist(productId) {
    const id = String(productId);
    setWishlist((prev) => {
      const list = Array.isArray(prev) ? prev.map(String) : [];
      return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
    });
  }

  function addToCart(product, size, color) {
    const stock = Number(product.stock || 0);
    if (stock <= 0) {
      alert("المنتج نفذت كميته حاليًا");
      return;
    }

    const key = `${product.id}-${size}-${color}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);

      if (existing) {
        if (Number(existing.qty) >= stock) {
          alert("لا يمكن إضافة كمية أكبر من المخزون المتاح");
          return prev;
        }

        return prev.map((item) =>
          item.key === key ? { ...item, qty: Number(item.qty) + 1 } : item
        );
      }

      return [...prev, { ...product, size, color, qty: 1, key }];
    });

    setCartOpen(true);
  }

  if (route.startsWith("#/product/")) {
    const productId = decodeURIComponent(route.replace("#/product/", ""));
    const product = safeProducts.find((item) => item && String(item.id) === productId);
    return (
      <ProductDetailsPage
        product={product}
        products={safeProducts}
        onAdd={addToCart}
        wishlist={safeWishlist}
        onToggleWishlist={toggleWishlist}
        isFavorite={isFavorite}
      />
    );
  }

  if (route === "#/wishlist") {
    return (
      <WishlistPage
        products={safeProducts}
        wishlist={safeWishlist}
        onAdd={addToCart}
        onView={setSelectedProduct}
        onToggleWishlist={toggleWishlist}
      />
    );
  }

  if (route === "#/track") {
    return <TrackOrder />;
  }

  if (route === "#/admin") {
    return (
      <AdminPage
        products={safeProducts}
        setProducts={setProducts}
        orders={orders}
        setOrders={setOrders}
        refreshProducts={refreshProducts}
        refreshOrders={refreshOrders}
      />
    );
  }

  return (
    <main>
      <AnnouncementBar />
      <Header
        cartCount={cartCount}
        wishlistCount={safeWishlist.length}
        onCartOpen={() => setCartOpen(true)}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {dataError && <div className="global-error">{dataError}</div>}

      <Hero />
      <PressStrip />
      <LuxuryMarquee />
      <FashionStories />
      <SearchHints />
      <MagazineLookBanner homeImages={homeImages} />
      <MaterialDetailShowcase homeImages={homeImages} />
      <NewDropsBanner />
      <BrandPaletteStrip />
      <MiniBenefitsRail />
      <BrandMetrics />
      <CategoryShowcase />
      <SeasonalCollection homeImages={homeImages} />
      <BoutiqueRibbon homeImages={homeImages} />
      <FashionMoodboard homeImages={homeImages} />
      <BrandStory homeImages={homeImages} />
      <StyleTabsShowcase homeImages={homeImages} />
      <StyleCompare homeImages={homeImages} />
      <ProductVisualGuide />
      <FeaturedProductSpotlight products={safeProducts} />
      <LuxeProductRail products={safeProducts} />
      <FrequentlyBoughtTogether products={safeProducts} />
      <DesignerPicks products={safeProducts} />
      <PremiumBentoShowcase homeImages={homeImages} />
      <EditorialBanners />
      <StyleShowcase />
      <ShopTheLook homeImages={homeImages} />
      <OutfitBuilder homeImages={homeImages} />
      <QuickStyleQuiz />
      <RunwayOrderSteps />
      <CountdownOffer />
      <PromoSlider />
      <Features />
      <PromoBanners />
      <CouponCorner />

      <DailyDeals
        products={safeProducts}
        onAdd={addToCart}
        onView={setSelectedProduct}
        isFavorite={isFavorite}
        onToggleWishlist={toggleWishlist}
      />
      <FeaturedCollections
        products={safeProducts}
        onAdd={addToCart}
        onView={setSelectedProduct}
        isFavorite={isFavorite}
        onToggleWishlist={toggleWishlist}
      />

      <SoftDivider />

      <ProductsSection
        filteredProducts={filteredProducts}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        onAdd={addToCart}
        onView={setSelectedProduct}
        loading={loading}
        totalCount={safeProducts.filter((item) => item && item.is_active !== false).length}
        isFavorite={isFavorite}
        onToggleWishlist={toggleWishlist}
      />

      <ReviewSpotlight />
      <SocialProofWall />
      <LuxuryTestimonials />
      <LookbookGallery homeImages={homeImages} />
      <TrustSections />
      <InstagramGallery />
      <BeforeAfterExperience />
      <CustomerJourney />
      <CheckoutConfidence />
      <OrderConfidenceCards />
      <BackInStockAlert />
      <BoutiqueFaqStrip />
      <StorePolicies />
      <QualityPromise />
      <SizeConfidence />
      <FabricCare />
      <GiftGuide />
      <PersonalShopper />
      <VipWhatsAppPanel />
      <FashionClub />
      <StylePromise />
      <BrandTimeline />
      <BrandValues />
      <PremiumServiceStrip />
      <HomeMicroCta />
      <FinalPolishCta />
      <BrandRibbonFinal />
      <CtaBand />
      <SocialSection />
      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        setCart={setCart}
        orders={orders}
        setOrders={setOrders}
        refreshOrders={refreshOrders}
      />

      <FloatingWhatsApp />
      <ScrollToTop />
      <FloatingCouponCard />
      <StickyBrandNote />

      <ConversionDock
        cartCount={cartCount}
        wishlistCount={safeWishlist.length}
        onCartOpen={() => setCartOpen(true)}
      />

      <MobileBottomNav
        cartCount={cartCount}
        wishlistCount={safeWishlist.length}
        onCartOpen={() => setCartOpen(true)}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdd={addToCart}
        isFavorite={selectedProduct ? isFavorite(selectedProduct.id) : false}
        onToggleFavorite={() => selectedProduct && toggleWishlist(selectedProduct.id)}
      />
    </main>
  );
}
