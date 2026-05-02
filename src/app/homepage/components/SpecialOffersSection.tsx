'use client';
import React, { useState } from 'react';
import Link from 'next/link';


const offers = [
{
  id: 'buy4get1',
  title: 'Buy 4 Get 1 Free',
  emoji: '🎁',
  description: 'Add any 5 drinks — the cheapest one is automatically free!',
  badge: 'AUTO-APPLY',
  badgeColor: 'bg-green-500',
  savings: 'Save up to $9',
  gradient: 'from-[#F25A38] to-[#F2A35E]',
  image: "https://images.unsplash.com/photo-1574235004245-ce6c07ac1605",
  alt: 'Five colorful bubble tea drinks lined up in a row, vibrant colors, clear cups with boba pearls',
  tag: 'Most Popular'
},
{
  id: 'family',
  title: 'Family Combo',
  emoji: '👨‍👩‍👧‍👦',
  description: '6 drinks of your choice + free boba upgrade for everyone',
  badge: 'BUNDLE DEAL',
  badgeColor: 'bg-primary',
  savings: 'Save $12.50',
  gradient: 'from-[#4CDBD5] to-[#8FD9CB]',
  image: "https://images.unsplash.com/photo-1574235004245-ce6c07ac1605",
  alt: 'Six assorted smoothies and bubble teas arranged together, colorful family-sized drink collection',
  tag: 'Family Size'
},
{
  id: 'party',
  title: 'Party Pack',
  emoji: '🎉',
  description: '12 drinks + 2 free desserts + priority delivery for your event',
  badge: 'BEST VALUE',
  badgeColor: 'bg-purple-500',
  savings: 'Save $28',
  gradient: 'from-purple-500 to-[#F25A38]',
  image: "https://images.unsplash.com/photo-1536718797547-b2238cf8e680",
  alt: 'Large party spread of colorful tropical drinks and smoothies, festive arrangement, bright colors',
  tag: 'Party Size'
}];


const limitedDeals = [
{
  name: 'Sakura Milk Tea',
  originalPrice: 8.50,
  salePrice: 5.90,
  image: "https://images.unsplash.com/photo-1656423112383-be8e52e9631d",
  alt: 'Pink sakura milk tea with flower petals floating on top, soft pastel pink background, spring aesthetic',
  endsIn: '2h 14m',
  badge: '🌸 Spring Special'
},
{
  name: 'Mango Tango Smoothie',
  originalPrice: 9.00,
  salePrice: 6.50,
  image: "https://images.unsplash.com/photo-1704881661177-7747fe663400",
  alt: 'Bright orange mango smoothie with tropical garnish, vibrant yellow-orange colors, fresh fruit visible',
  endsIn: '5h 42m',
  badge: '🥭 Flash Sale'
},
{
  name: 'Brown Sugar Boba',
  originalPrice: 7.90,
  salePrice: 5.50,
  image: 'https://images.unsplash.com/photo-1732946097786-d129ee336ed8',
  alt: 'Brown sugar tiger stripe bubble tea with caramel swirls in clear cup, dramatic dark background',
  endsIn: '1h 08m',
  badge: '🔥 Hot Deal'
},
{
  name: 'Matcha Latte',
  originalPrice: 6.80,
  salePrice: 4.90,
  image: 'https://images.unsplash.com/photo-1631679263367-9095fca628de',
  alt: 'Vibrant green matcha iced latte in glass with ice, white marble surface, clean minimalist setting',
  endsIn: '3h 55m',
  badge: '⭐ Top Pick'
}];


export default function SpecialOffersSection() {
  const [activeOffer, setActiveOffer] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6" id="offers">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10 reveal-up-hidden">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Exclusive Deals</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Special <span className="text-gradient-warm">Offers</span> 🎁
            </h2>
          </div>
          <Link href="/shop" className="hidden md:flex items-center gap-2 text-sm font-bold text-primary hover:text-cta transition-colors">
            All offers →
          </Link>
        </div>

        {/* Offer Cards — Asymmetric Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14 stagger-children">
          {offers?.map((offer) =>
          <div
            key={offer?.id}
            className={`relative rounded-[28px] overflow-hidden cursor-pointer group transition-all duration-500 hover:-translate-y-2 reveal-up-hidden ${
            activeOffer === offer?.id ? 'ring-2 ring-cta shadow-cta' : ''}`
            }
            style={{ minHeight: '280px' }}
            onClick={() => setActiveOffer(activeOffer === offer?.id ? null : offer?.id)}>

              {/* Background image */}
              <div className="absolute inset-0">
                <img
                src={offer?.image}
                alt={offer?.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                <div className={`absolute inset-0 bg-gradient-to-t ${offer?.gradient} opacity-80`} />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col h-full justify-between" style={{ minHeight: '280px' }}>
                <div className="flex items-start justify-between">
                  <span className={`${offer?.badgeColor} text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wide`}>
                    {offer?.badge}
                  </span>
                  <span className="text-white/80 text-xs font-bold bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {offer?.tag}
                  </span>
                </div>

                <div>
                  <div className="text-4xl mb-2">{offer?.emoji}</div>
                  <h3 className="text-white font-extrabold text-xl md:text-2xl leading-tight mb-2">
                    {offer?.title}
                  </h3>
                  <p className="text-white/80 text-sm font-medium leading-snug mb-4">
                    {offer?.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-extrabold text-sm bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      💰 {offer?.savings}
                    </span>
                    <Link
                    href="/shop"
                    className="bg-white text-foreground font-extrabold text-xs px-4 py-2 rounded-full hover:bg-cta hover:text-white transition-all duration-200"
                    onClick={(e) => e?.stopPropagation()}>

                      Grab Deal →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Limited-Time Deals */}
        <div className="reveal-up-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
                Limited-Time Deals 🛍️
              </h2>
              <div className="flex items-center gap-1.5 bg-cta/10 text-cta text-xs font-bold px-3 py-1.5 rounded-full">
                <span className="size-2 rounded-full bg-cta animate-pulse" />
                LIVE NOW
              </div>
            </div>
            <Link href="/shop" className="hidden md:flex text-sm font-bold text-primary hover:text-cta transition-colors">
              See all →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {limitedDeals?.map((deal, i) => {
              const discountPct = Math.round((deal?.originalPrice - deal?.salePrice) / deal?.originalPrice * 100);
              return (
                <div
                  key={deal?.name}
                  className="product-card rounded-3xl overflow-hidden group"
                  style={{ animationDelay: `${i * 80}ms` }}>

                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: '160px' }}>
                    <img
                      src={deal?.image}
                      alt={deal?.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                    {/* Discount badge */}
                    <div className="absolute top-2 left-2 bg-cta text-white text-xs font-extrabold px-2.5 py-1 rounded-full">
                      -{discountPct}%
                    </div>
                    {/* Timer */}
                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      ⏱ {deal?.endsIn}
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-3 md:p-4">
                    <span className="text-[10px] font-bold text-primary">{deal?.badge}</span>
                    <h4 className="font-extrabold text-foreground text-sm mt-0.5 leading-tight">{deal?.name}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-base font-extrabold text-cta">${deal?.salePrice?.toFixed(2)}</span>
                      <span className="text-xs text-muted-foreground line-through">${deal?.originalPrice?.toFixed(2)}</span>
                    </div>
                    <Link
                      href="/shop"
                      className="mt-2 w-full block text-center text-xs font-bold bg-cta/10 text-cta py-2 rounded-xl hover:bg-cta hover:text-white transition-all duration-200">

                      Add to Cart
                    </Link>
                  </div>
                </div>);

            })}
          </div>
        </div>
      </div>
    </section>);

}