import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const related = [
{
  id: 2,
  name: 'Brown Sugar Boba',
  price: 7.90,
  rating: 4.9,
  badge: '🏆 Best Seller',
  badgeClass: 'badge-bestseller',
  image: "https://images.unsplash.com/photo-1732946097786-d129ee336ed8",
  alt: 'Brown sugar tiger stripe bubble tea in clear cup, caramel swirls, dark atmospheric background'
},
{
  id: 3,
  name: 'Matcha Latte',
  price: 6.80,
  rating: 4.8,
  badge: '⭐ Top Rated',
  badgeClass: 'badge-toprated',
  image: "https://images.unsplash.com/photo-1595522099140-18383a74b7f4",
  alt: 'Vibrant green matcha iced latte with ice cubes in glass, white marble surface, clean bright lighting'
},
{
  id: 4,
  name: 'Mango Passion',
  price: 7.20,
  rating: 4.6,
  badge: '🔥 Trending',
  badgeClass: 'badge-trending',
  image: "https://images.unsplash.com/photo-1580081705797-bcde40934b4b",
  alt: 'Orange mango passion fruit drink with tropical garnish and vibrant yellow-orange color, light background'
},
{
  id: 5,
  name: 'Strawberry Smoothie',
  price: 8.20,
  rating: 4.7,
  badge: '🔥 Trending',
  badgeClass: 'badge-trending',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_154189725-1773926573162.png",
  alt: 'Bright red strawberry smoothie with fresh strawberry garnish, natural daylight, vibrant pink-red tones'
}];


export default function RelatedProducts() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border/50 mt-4">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">You might alsolike</p>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            More Drinks You'll <span className="text-gradient-warm">Love</span> 🧋
          </h2>
        </div>
        <Link href="/shop" className="hidden md:flex items-center gap-2 text-sm font-bold text-primary hover:text-cta transition-colors">
          View all →
        </Link>
      </div>
      {/*
         GRID AUDIT (Related Products):
         Array: [BrownSugar, Matcha, Mango, Strawberry] = 4 cards
         grid-cols-2 md:grid-cols-4:
         Row 1: [col-1: BrownSugar] [col-2: Matcha] [col-3: Mango] [col-4: Strawberry]
         Placed 4/4 ✓
        */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {related?.map((product) =>
        <Link key={product?.id} href="/product" className="product-card group flex flex-col">
            <div className="relative overflow-hidden rounded-t-3xl" style={{ height: '200px' }}>
              <AppImage
              src={product?.image}
              alt={product?.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw" />

              <div className="absolute top-3 left-3">
                <span className={product?.badgeClass}>{product?.badge}</span>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-extrabold text-sm md:text-base text-foreground leading-tight">{product?.name}</h3>
              <div className="flex items-center gap-1">
                <svg className="size-3.5 text-accent fill-accent" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-bold text-foreground">{product?.rating}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-base font-extrabold text-foreground">${product?.price?.toFixed(2)}</span>
                <button className="flex items-center gap-1 bg-cta text-white text-xs font-bold px-3 py-2 rounded-full hover:scale-105 active:scale-95 transition-all shadow-cta">
                  <Icon name="PlusIcon" size={13} className="text-white" />
                  Add
                </button>
              </div>
            </div>
          </Link>
        )}
      </div>
    </section>);

}