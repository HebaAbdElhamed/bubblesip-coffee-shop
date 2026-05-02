import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const categories = [
{
  name: 'Bubble Tea',
  emoji: '🧋',
  count: '24 drinks',
  gradient: 'from-purple-400/80 to-pink-500/80',
  image: "https://images.unsplash.com/photo-1732946097786-d129ee336ed8",
  alt: 'Colorful assortment of bubble tea drinks with boba pearls in clear cups, vibrant pink and purple tones',
  span: 'lg:col-span-2 lg:row-span-2',
  height: 'h-72 lg:h-full'
},
{
  name: 'Iced Coffee',
  emoji: '☕',
  count: '18 drinks',
  gradient: 'from-amber-600/80 to-orange-400/80',
  image: "https://images.unsplash.com/photo-1630184799093-59dc8486e7f6",
  alt: 'Iced coffee with cream swirl in a glass on a wooden table, warm brown tones, cozy café atmosphere',
  span: 'lg:col-span-2',
  height: 'h-48'
},
{
  name: 'Smoothies',
  emoji: '🍓',
  count: '16 drinks',
  gradient: 'from-rose-400/80 to-pink-300/80',
  image: "https://images.unsplash.com/photo-1624370272306-5eb13fc061ca",
  alt: 'Fresh strawberry smoothie with fruit garnish in a tall glass, bright natural daylight, vibrant red-pink color',
  span: 'lg:col-span-1',
  height: 'h-48'
},
{
  name: 'Specials',
  emoji: '✨',
  count: '8 limited',
  gradient: 'from-teal-400/80 to-cyan-300/80',
  image: "https://images.unsplash.com/photo-1597991548246-e9a4f601df3a",
  alt: 'Special limited edition colorful drink with layered colors in a glass, bright studio lighting',
  span: 'lg:col-span-1',
  height: 'h-48'
}];


export default function CategoriesSection() {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10 reveal-up-hidden">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Our Menu</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            What are you<br />
            <span className="text-gradient-warm">craving today?</span>
          </h2>
        </div>
        <Link href="/shop" className="hidden md:flex items-center gap-2 text-sm font-bold text-primary hover:text-cta transition-colors">
          View all drinks →
        </Link>
      </div>
      {/* Bento Grid */}
      {/* 
         BENTO AUDIT:
         Array: [BubbleTea, IcedCoffee, Smoothies, Specials] = 4 cards
         Desktop grid-cols-4:
         Row 1: [col-1-2: BubbleTea cs-2 rs-2] [col-3-4: IcedCoffee cs-2]
         Row 2: [col-1-2: BubbleTea (cont)] [col-3: Smoothies cs-1] [col-4: Specials cs-1]
         Placed 4/4 ✓
        */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:grid-rows-2 stagger-children">
        {categories?.map((cat, i) =>
        <Link
          key={cat?.name}
          href="/shop"
          className={`${cat?.span} ${cat?.height} relative rounded-3xl overflow-hidden group cursor-pointer reveal-up-hidden`}
          style={{ minHeight: i === 0 ? undefined : '180px' }}>

            <AppImage
            src={cat?.image}
            alt={cat?.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw" />

            {/* Gradient scrim — dark enough for white text */}
            <div className={`absolute inset-0 bg-gradient-to-t ${cat?.gradient} opacity-70 group-hover:opacity-80 transition-opacity duration-300`} />
            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
              <span className="text-2xl md:text-3xl mb-1">{cat?.emoji}</span>
              <h3 className="text-white font-extrabold text-lg md:text-2xl leading-tight">{cat?.name}</h3>
              <p className="text-white/80 text-xs md:text-sm font-semibold mt-1">{cat?.count}</p>
            </div>
            {/* Hover arrow */}
            <div className="absolute top-4 right-4 size-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <span className="text-white text-sm font-bold">→</span>
            </div>
          </Link>
        )}
      </div>
    </section>);

}