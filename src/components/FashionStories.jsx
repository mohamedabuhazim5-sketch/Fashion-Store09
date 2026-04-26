import { BadgePercent, Crown, Gift, Heart, Sparkles, Star } from "lucide-react";

const stories = [
  { icon: <Sparkles size={20} />, title: "New In", href: "#new-arrivals" },
  { icon: <Star size={20} />, title: "Best", href: "#best-sellers" },
  { icon: <BadgePercent size={20} />, title: "Offers", href: "#daily-deals" },
  { icon: <Heart size={20} />, title: "Wishlist", href: "#/wishlist" },
  { icon: <Gift size={20} />, title: "Gifts", href: "#products" },
  { icon: <Crown size={20} />, title: "Premium", href: "#products" },
];

export default function FashionStories() {
  return (
    <section className="fashion-stories-section">
      <div className="container fashion-stories">
        {stories.map((story) => (
          <a href={story.href} className="fashion-story" key={story.title}>
            <span>{story.icon}</span>
            <strong>{story.title}</strong>
          </a>
        ))}
      </div>
    </section>
  );
}
