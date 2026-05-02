'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const products = [
{
  id: 1,
  name: 'Taro Milk Tea',
  description: 'Creamy taro with chewy boba pearls',
  price: 7.50,
  originalPrice: null,
  rating: 4.9,
  reviews: 1284,
  badge: 'bestseller' as const,
  image: "https://images.unsplash.com/photo-1517318174634-1e1ac81cebe8",
  alt: 'Purple taro milk tea with boba pearls in a clear cup with a wide straw, pastel purple background',
  tags: ['Bubble Tea']
},
{
  id: 2,
  name: 'Matcha Latte',
  description: 'Premium ceremonial grade, oat milk',
  price: 6.80,
  originalPrice: null,
  rating: 4.8,
  reviews: 892,
  badge: 'toprated' as const,
  image: "https://images.unsplash.com/photo-1631679263367-9095fca628de",
  alt: 'Vibrant green matcha iced latte in a glass with ice, white marble surface, clean minimalist setting',
  tags: ['Iced Coffee']
},
{
  id: 3,
  name: 'Strawberry Smoothie',
  description: 'Fresh strawberries, banana, honey',
  price: 8.20,
  originalPrice: 9.50,
  rating: 4.7,
  reviews: 654,
  badge: 'trending' as const,
  image: "https://images.unsplash.com/photo-1705917677610-12ac0db4873c",
  alt: 'Bright red strawberry smoothie with fresh fruit garnish on top, natural bright daylight, pink tones',
  tags: ['Smoothies']
},
{
  id: 4,
  name: 'Brown Sugar Boba',
  description: 'Tiger stripes, caramel pearls',
  price: 7.90,
  originalPrice: null,
  rating: 4.9,
  reviews: 2103,
  badge: 'bestseller' as const,
  image: "https://images.unsplash.com/photo-1732946097786-d129ee336ed8",
  alt: 'Brown sugar tiger stripe bubble tea with caramel swirls on the inside of a clear cup, dramatic dark background',
  tags: ['Bubble Tea']
},
{
  id: 5,
  name: 'Mango Passion',
  description: 'Tropical mango, passion fruit tea',
  price: 7.20,
  originalPrice: null,
  rating: 4.6,
  reviews: 478,
  badge: 'trending' as const,
  image: "https://images.unsplash.com/photo-1580081705797-bcde40934b4b",
  alt: 'Bright orange mango passion fruit drink with tropical garnish, vibrant yellow-orange colors, light background',
  tags: ['Specials']
},
{
  id: 6,
  name: 'Iced Americano',
  description: 'Double shot, cold brew style',
  price: 5.50,
  originalPrice: null,
  rating: 4.7,
  reviews: 1567,
  badge: 'toprated' as const,
  image: "https://images.unsplash.com/photo-1651657631890-1bc7000c0f69",
  alt: 'Iced americano coffee in a tall glass with ice cubes and dark espresso layers, minimalist white background',
  tags: ['Iced Coffee']
}];


const badgeConfig = {
  bestseller: { label: '🏆 Best Seller', className: 'badge-bestseller' },
  trending: { label: '🔥 Trending', className: 'badge-trending' },
  toprated: { label: '⭐ Top Rated', className: 'badge-toprated' }
};

export default function FeaturedProductsSection() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto" id="featured">
      <div className="flex items-end justify-between mb-10 reveal-up-hidden">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Best Sellers</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Fan <span className="text-gradient-warm">Favorites</span> 🏆
          </h2>
        </div>
        <Link href="/shop" className="hidden md:flex items-center gap-2 text-sm font-bold text-primary hover:text-cta transition-colors">
          See all products →
        </Link>
      </div>

      {/* 
         GRID AUDIT:
         Array: 6 products
         Row 1: [col-1: Taro] [col-2: Matcha] [col-3: Strawberry]
         Row 2: [col-1: BrownSugar] [col-2: Mango] [col-3: Americano]
         Placed 6/6 ✓
        */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 stagger-children">
        {products.map((product) => {
          const badge = badgeConfig[product.badge];
          const isFav = favorites.includes(product.id);
          return (
            <div key={product.id} className="product-card reveal-up-hidden group flex flex-col">
              {/* Image */}
              <div className="relative overflow-hidden rounded-t-3xl" style={{ height: '220px' }}>
                <AppImage
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw" />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className={badge.className}>{badge.label}</span>
                </div>
                {/* Sale tag */}
                {product.originalPrice &&
                <div className="absolute top-3 right-12 bg-cta text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    SALE
                  </div>
                }
                {/* Favorite */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 size-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 active:scale-90 shadow-warm-sm"
                  aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}>

                  <Icon
                    name={isFav ? 'HeartIcon' : 'HeartIcon'}
                    variant={isFav ? 'solid' : 'outline'}
                    size={16}
                    className={isFav ? 'text-cta' : 'text-muted-foreground'} />

                </button>
              </div>

              {/* Info */}
              <div className="p-4 md:p-5 flex flex-col flex-1 gap-2">
                <h3 className="font-extrabold text-base md:text-lg text-foreground leading-tight">{product.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground font-medium leading-snug">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) =>
                    <svg key={s} className="size-3.5 text-accent fill-accent" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs font-bold text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg md:text-xl font-extrabold text-foreground">${product.price.toFixed(2)}</span>
                    {product.originalPrice &&
                    <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                    }
                  </div>
                  <Link
                    href="/product"
                    className="flex items-center gap-1.5 bg-cta text-white text-xs font-bold px-4 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-cta">

                    <Icon name="PlusIcon" size={14} className="text-white" />
                    Add
                  </Link>
                </div>
              </div>
            </div>);

        })}
      </div>

      <div className="mt-8 text-center md:hidden reveal-up-hidden">
        <Link href="/shop" className="btn-cta inline-flex">See All Drinks 🧋</Link>
      </div>
    </section>);

}