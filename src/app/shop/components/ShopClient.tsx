'use client';
import React, { useState, useMemo } from 'react';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

type BadgeType = 'bestseller' | 'trending' | 'toprated' | 'new' | null;

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  badge: BadgeType;
  category: string;
  image: string;
  alt: string;
  tags: string[];
}

const allProducts: Product[] = [
{
  id: 1, name: 'Taro Milk Tea', description: 'Creamy taro with chewy boba pearls', price: 7.50, originalPrice: null, rating: 4.9, reviews: 1284, badge: 'bestseller', category: 'Bubble Tea',
  image: 'https://images.unsplash.com/photo-1592345935810-4cf723242746',
  alt: 'Purple taro milk tea with boba pearls in clear cup, pastel purple background, wide straw',
  tags: ['Bubble Tea']
},
{
  id: 2, name: 'Matcha Latte', description: 'Premium ceremonial grade, oat milk', price: 6.80, originalPrice: null, rating: 4.8, reviews: 892, badge: 'toprated', category: 'Iced Coffee',
  image: 'https://images.unsplash.com/photo-1631679263367-9095fca628de',
  alt: 'Vibrant green matcha iced latte in glass with ice, white marble surface, clean minimalist setting',
  tags: ['Iced Coffee']
},
{
  id: 3, name: 'Strawberry Smoothie', description: 'Fresh strawberries, banana, honey', price: 8.20, originalPrice: 9.50, rating: 4.7, reviews: 654, badge: 'trending', category: 'Smoothies',
  image: 'https://images.unsplash.com/photo-1705917677610-12ac0db4873c',
  alt: 'Bright red strawberry smoothie with fresh fruit garnish, natural daylight, vibrant pink tones',
  tags: ['Smoothies']
},
{
  id: 4, name: 'Brown Sugar Boba', description: 'Tiger stripes, caramel pearls', price: 7.90, originalPrice: null, rating: 4.9, reviews: 2103, badge: 'bestseller', category: 'Bubble Tea',
  image: 'https://images.unsplash.com/photo-1732946097786-d129ee336ed8',
  alt: 'Brown sugar tiger stripe bubble tea with caramel swirls in clear cup, dramatic dark background',
  tags: ['Bubble Tea']
},
{
  id: 5, name: 'Mango Passion', description: 'Tropical mango, passion fruit tea', price: 7.20, originalPrice: null, rating: 4.6, reviews: 478, badge: 'trending', category: 'Specials',
  image: 'https://images.unsplash.com/photo-1580081705797-bcde40934b4b',
  alt: 'Bright orange mango passion fruit drink with tropical garnish, vibrant yellow-orange colors, light background',
  tags: ['Specials']
},
{
  id: 6, name: 'Iced Americano', description: 'Double shot, cold brew style', price: 5.50, originalPrice: null, rating: 4.7, reviews: 1567, badge: 'toprated', category: 'Iced Coffee',
  image: 'https://images.unsplash.com/photo-1651657631890-1bc7000c0f69',
  alt: 'Iced americano coffee in tall glass with ice cubes and dark espresso layers, minimalist white background',
  tags: ['Iced Coffee']
},
{
  id: 7, name: 'Peach Oolong Tea', description: 'Light oolong, fresh peach slices', price: 6.50, originalPrice: null, rating: 4.5, reviews: 321, badge: 'new', category: 'Bubble Tea',
  image: 'https://images.unsplash.com/photo-1634219780646-a4615672ec4f',
  alt: 'Light golden peach oolong tea with fresh peach slices in a clear glass, soft warm background',
  tags: ['Bubble Tea']
},
{
  id: 8, name: 'Avocado Smoothie', description: 'Creamy avocado, honey, oat milk', price: 9.00, originalPrice: 10.50, rating: 4.6, reviews: 289, badge: 'trending', category: 'Smoothies',
  image: 'https://images.unsplash.com/photo-1630252595285-3bbcb51378d8',
  alt: 'Creamy green avocado smoothie in a glass with honey drizzle, natural light, fresh ingredients visible',
  tags: ['Smoothies']
},
{
  id: 9, name: 'Lychee Rose Tea', description: 'Floral lychee, rose petals, jasmine', price: 7.80, originalPrice: null, rating: 4.8, reviews: 543, badge: 'new', category: 'Bubble Tea',
  image: "https://images.unsplash.com/photo-1697569593981-79ba1d0e2120",
  alt: 'Pink lychee rose tea with flower petals floating on top, soft pastel pink background, spring aesthetic',
  tags: ['Bubble Tea']
},
{
  id: 10, name: 'Cold Brew Coffee', description: 'Smooth 12-hour cold brew, oat milk', price: 6.20, originalPrice: null, rating: 4.7, reviews: 876, badge: 'bestseller', category: 'Iced Coffee',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_182e252dd-1776396939549.png",
  alt: 'Dark cold brew coffee in a glass with ice cubes, clean white background, rich dark brown color',
  tags: ['Iced Coffee']
},
{
  id: 11, name: 'Blueberry Açaí Bowl', description: 'Thick açaí, granola, fresh blueberries', price: 10.50, originalPrice: 12.00, rating: 4.9, reviews: 412, badge: 'toprated', category: 'Smoothies',
  image: "https://images.unsplash.com/photo-1676515841519-7bb498597c73",
  alt: 'Purple açaí smoothie bowl with granola and fresh blueberries on top, bright natural light',
  tags: ['Smoothies']
},
{
  id: 12, name: 'Passion Fruit Soda', description: 'Sparkling passion fruit, mint, lime', price: 5.90, originalPrice: null, rating: 4.5, reviews: 234, badge: 'new', category: 'Specials',
  image: "https://images.unsplash.com/photo-1582590437272-8579724788c4",
  alt: 'Bright yellow passion fruit sparkling soda with mint leaves and lime in a tall glass, vibrant colors',
  tags: ['Specials']
}];


const categories = ['All', 'Bubble Tea', 'Iced Coffee', 'Smoothies', 'Specials'];
const badgeFilters = ['All', 'Best Seller', 'Top Rated', 'Trending', 'New'];
const sortOptions = ['Popular', 'Price: Low to High', 'Price: High to Low', 'Highest Rated'];
const priceRanges = [
{ label: 'All Prices', min: 0, max: 20 },
{ label: 'Under $6', min: 0, max: 6 },
{ label: '$6 – $8', min: 6, max: 8 },
{ label: '$8+', min: 8, max: 20 }];


const badgeConfig: Record<string, {label: string;className: string;}> = {
  bestseller: { label: '🏆 Best Seller', className: 'badge-bestseller' },
  trending: { label: '🔥 Trending', className: 'badge-trending' },
  toprated: { label: '⭐ Top Rated', className: 'badge-toprated' },
  new: { label: '🌸 New', className: 'bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full' }
};

export default function ShopClient() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBadge, setSelectedBadge] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState('Popular');
  const [filterOpen, setFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const priceRange = priceRanges[selectedPriceRange];

  const filteredProducts = React.useMemo(() => {
    let result = [...allProducts];
    if (selectedCategory !== 'All') result = result.filter((p) => p.category === selectedCategory);
    if (selectedBadge !== 'All') {
      const badgeMap: Record<string, string> = {
        'Best Seller': 'bestseller', 'Top Rated': 'toprated', 'Trending': 'trending', 'New': 'new'
      };
      result = result.filter((p) => p.badge === badgeMap[selectedBadge]);
    }
    result = result.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    if (sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);else
    if (sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);else
    if (sortBy === 'Highest Rated') result.sort((a, b) => b.rating - a.rating);else
    result.sort((a, b) => b.reviews - a.reviews);
    return result;
  }, [selectedCategory, selectedBadge, selectedPriceRange, sortBy]);

  const toggleFavorite = (id: number) => setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  const addToCart = (id: number) => setCartItems((prev) => prev.includes(id) ? prev : [...prev, id]);

  const activeFiltersCount = (selectedCategory !== 'All' ? 1 : 0) + (selectedBadge !== 'All' ? 1 : 0) + (selectedPriceRange !== 0 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Page header */}
      <div className="py-8 md:py-10">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Our Menu</p>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
          All <span className="text-gradient-warm">Drinks</span> 🧋
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">
          {filteredProducts.length} drinks found
        </p>
      </div>

      <div className="flex gap-6 lg:gap-8">
        {/* Sidebar Filters — Desktop */}
        <aside className="hidden lg:flex flex-col gap-6 w-64 flex-shrink-0">
          <div className="glass-card rounded-3xl p-6 space-y-6 sticky top-24">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-foreground">Filters</h3>
              {activeFiltersCount > 0 &&
              <span className="size-5 bg-cta text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              }
            </div>

            {/* Category */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Category</p>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) =>
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                  selectedCategory === cat ?
                  'bg-primary text-primary-foreground shadow-aqua' :
                  'text-foreground/70 hover:bg-primary/10 hover:text-foreground'}`
                  }>

                    {cat}
                  </button>
                )}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Price Range</p>
              <div className="flex flex-col gap-1.5">
                {priceRanges.map((range, idx) =>
                <button
                  key={range.label}
                  onClick={() => setSelectedPriceRange(idx)}
                  className={`text-left px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                  selectedPriceRange === idx ?
                  'bg-accent/20 text-accent-foreground' :
                  'text-foreground/70 hover:bg-accent/10 hover:text-foreground'}`
                  }>

                    {range.label}
                  </button>
                )}
              </div>
            </div>

            {/* Badge */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Badge</p>
              <div className="flex flex-col gap-1.5">
                {badgeFilters.map((badge) =>
                <button
                  key={badge}
                  onClick={() => setSelectedBadge(badge)}
                  className={`text-left px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                  selectedBadge === badge ?
                  'bg-cta/15 text-cta' : 'text-foreground/70 hover:bg-cta/8 hover:text-foreground'}`
                  }>

                    {badge}
                  </button>
                )}
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => {setSelectedCategory('All');setSelectedBadge('All');setSelectedPriceRange(0);}}
              className="w-full text-sm font-bold text-muted-foreground hover:text-cta transition-colors py-2 border border-border rounded-2xl">

              Reset All Filters
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            {/* Active filter chips */}
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'All' &&
              <span className="flex items-center gap-1.5 bg-primary/15 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="hover:text-cta transition-colors">✕</button>
                </span>
              }
              {selectedBadge !== 'All' &&
              <span className="flex items-center gap-1.5 bg-cta/15 text-cta text-xs font-bold px-3 py-1.5 rounded-full">
                  {selectedBadge}
                  <button onClick={() => setSelectedBadge('All')} className="hover:text-cta transition-colors">✕</button>
                </span>
              }
              {selectedPriceRange !== 0 &&
              <span className="flex items-center gap-1.5 bg-accent/15 text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full">
                  {priceRanges[selectedPriceRange].label}
                  <button onClick={() => setSelectedPriceRange(0)} className="hover:text-cta transition-colors">✕</button>
                </span>
              }
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-2xl text-sm font-bold text-foreground hover:bg-primary/10 transition-all">

                <Icon name="AdjustmentsHorizontalIcon" size={16} />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </button>

              {/* View mode toggle */}
              <div className="hidden md:flex items-center gap-1 bg-card border border-border rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  aria-label="Grid view">

                  <Icon name="Squares2X2Icon" size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  aria-label="List view">

                  <Icon name="ListBulletIcon" size={16} />
                </button>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-card border border-border rounded-2xl px-4 py-2.5 text-sm font-semibold text-foreground outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer">

                {sortOptions.map((opt) =>
                <option key={opt} value={opt}>{opt}</option>
                )}
              </select>
            </div>
          </div>

          {/* Mobile Filter Panel */}
          {filterOpen &&
          <div className="lg:hidden glass-card rounded-3xl p-5 mb-6 space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) =>
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === cat ? 'bg-primary text-white' : 'bg-muted/50 text-foreground/70'}`
                  }>

                      {cat}
                    </button>
                )}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Price Range</p>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range, idx) =>
                <button
                  key={range.label}
                  onClick={() => setSelectedPriceRange(idx)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedPriceRange === idx ? 'bg-accent/30 text-accent-foreground' : 'bg-muted/50 text-foreground/70'}`
                  }>

                      {range.label}
                    </button>
                )}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Badge</p>
                <div className="flex flex-wrap gap-2">
                  {badgeFilters.map((badge) =>
                <button
                  key={badge}
                  onClick={() => setSelectedBadge(badge)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedBadge === badge ? 'bg-cta/20 text-cta' : 'bg-muted/50 text-foreground/70'}`
                  }>

                      {badge}
                    </button>
                )}
                </div>
              </div>
            </div>
          }

          {/* Product Grid — 3-4 columns desktop */}
          {filteredProducts.length === 0 ?
          <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="text-6xl">🧋</div>
              <h3 className="text-xl font-bold text-foreground">No drinks found</h3>
              <p className="text-muted-foreground text-sm">Try adjusting your filters</p>
              <button
              onClick={() => {setSelectedCategory('All');setSelectedBadge('All');setSelectedPriceRange(0);}}
              className="btn-primary text-sm px-6 py-3">

                Clear Filters
              </button>
            </div> :
          viewMode === 'grid' ?
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {filteredProducts.map((product) => {
              const badge = product.badge ? badgeConfig[product.badge] : null;
              const isFav = favorites.includes(product.id);
              const inCart = cartItems.includes(product.id);
              return (
                <div key={product.id} className="product-card group flex flex-col">
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-t-3xl" style={{ height: '200px' }}>
                      <AppImage
                      src={product.image}
                      alt={product.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw" />

                      {/* Badge */}
                      {badge &&
                    <div className="absolute top-3 left-3">
                          <span className={badge.className}>{badge.label}</span>
                        </div>
                    }
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
                        name="HeartIcon"
                        variant={isFav ? 'solid' : 'outline'}
                        size={16}
                        className={isFav ? 'text-cta' : 'text-muted-foreground'} />

                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-3 md:p-4 flex flex-col flex-1 gap-2">
                      <h3 className="font-extrabold text-sm md:text-base text-foreground leading-tight">{product.name}</h3>
                      <p className="text-xs text-muted-foreground font-medium leading-snug">{product.description}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => <svg key={s} className="size-3 text-accent fill-accent" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                        </div>
                        <span className="text-xs font-bold">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
                      </div>

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between mt-auto pt-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base md:text-lg font-extrabold text-foreground">${product.price.toFixed(2)}</span>
                          {product.originalPrice &&
                        <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                        }
                        </div>
                        <button
                        onClick={() => addToCart(product.id)}
                        className={`flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-full transition-all duration-200 ${
                        inCart ?
                        'bg-green-500 text-white' : 'bg-cta text-white hover:scale-105 active:scale-95 shadow-cta'}`
                        }>

                          {inCart ? '✓ Added' :
                        <>
                              <Icon name="PlusIcon" size={12} className="text-white" />
                              Add
                            </>
                        }
                        </button>
                      </div>
                    </div>
                  </div>);

            })}
            </div> : (

          /* List View */
          <div className="flex flex-col gap-3">
              {filteredProducts.map((product) => {
              const badge = product.badge ? badgeConfig[product.badge] : null;
              const isFav = favorites.includes(product.id);
              const inCart = cartItems.includes(product.id);
              return (
                <div key={product.id} className="glass-card rounded-3xl p-4 flex gap-4 items-center group hover:shadow-warm-lg transition-all duration-300">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                      <AppImage src={product.image} alt={product.alt} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-extrabold text-foreground text-base">{product.name}</h3>
                        {badge && <span className={`${badge.className} text-[10px] py-0.5`}>{badge.label}</span>}
                      </div>
                      <p className="text-xs text-muted-foreground">{product.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => <svg key={s} className="size-3 text-accent fill-accent" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                        </div>
                        <span className="text-xs font-bold">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-extrabold text-foreground">${product.price.toFixed(2)}</span>
                        {product.originalPrice && <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleFavorite(product.id)} className="size-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-cta/10 transition-colors">
                          <Icon name="HeartIcon" variant={isFav ? 'solid' : 'outline'} size={14} className={isFav ? 'text-cta' : 'text-muted-foreground'} />
                        </button>
                        <button
                        onClick={() => addToCart(product.id)}
                        className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${inCart ? 'bg-green-500 text-white' : 'bg-cta text-white hover:scale-105 shadow-cta'}`}>

                          {inCart ? '✓ Added' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>);

            })}
            </div>)
          }
        </div>
      </div>
    </div>);

}