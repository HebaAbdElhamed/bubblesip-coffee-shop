'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const productImages = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_115a66401-1772699045928.png",
  alt: 'Taro milk tea with boba pearls in a clear cup, vibrant purple color, wide straw, pastel background'
},
{
  src: "https://images.unsplash.com/photo-1600340432752-a407bab94cc3",
  alt: 'Brown sugar boba tea with tiger stripes inside the cup, caramel colored pearls, dramatic dark background'
},
{
  src: "https://images.unsplash.com/photo-1631679263367-9095fca628de",
  alt: 'Matcha green latte with ice in a clear glass, marble surface, clean bright studio lighting'
}];


const reviews = [
{
  id: 1,
  name: 'Priya Nair',
  avatar: "https://images.unsplash.com/photo-1729999967434-aff46d2823d1",
  rating: 5,
  date: 'Apr 22, 2026',
  text: 'Absolutely obsessed with the taro flavor! The boba pearls are perfectly chewy every single time. This is my weekly order now.',
  verified: true,
  reviewImage: null
},
{
  id: 2,
  name: 'Marcus Webb',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_115a66401-1772699045928.png",
  rating: 5,
  date: 'Apr 18, 2026',
  text: "Best bubble tea I've had outside of an actual boba shop. The customization options are insane — I go 50% sugar, extra boba, and it's perfect.",
  verified: true,
  reviewImage: 'https://images.unsplash.com/photo-1592345935810-4cf723242746'
},
{
  id: 3,
  name: 'Yuna Kim',
  avatar: "https://images.unsplash.com/photo-1643793571490-2ef3090d0aa4",
  rating: 4,
  date: 'Apr 14, 2026',
  text: 'Love the drink! Arrived cold and fresh. Delivery was fast. Knocked off one star because the cup was slightly tilted in the bag.',
  verified: true,
  reviewImage: null
}];


const sizes = [
{ label: 'S', volume: '12 oz', price: 0 },
{ label: 'M', volume: '16 oz', price: 1.00 },
{ label: 'L', volume: '20 oz', price: 2.00 }];


const sugarLevels = ['0%', '25%', '50%', '75%', '100%'];
const iceLevels = ['No Ice', 'Less Ice', 'Regular', 'Extra Ice'];

const addOns = [
{ id: 'boba', label: 'Boba Pearls', emoji: '⚫', price: 0.75 },
{ id: 'jelly', label: 'Coconut Jelly', emoji: '🟡', price: 0.75 },
{ id: 'cream', label: 'Cream Cheese', emoji: '🧀', price: 1.25 },
{ id: 'pudding', label: 'Egg Pudding', emoji: '🟠', price: 1.00 }];


export default function ProductClient() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedSugar, setSelectedSugar] = useState('50%');
  const [selectedIce, setSelectedIce] = useState('Regular');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['boba']);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'write'>('description');
  const [shareClicked, setShareClicked] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, text: '', imageFile: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const basePrice = 7.50;
  const sizeUpcharge = sizes.find((s) => s.label === selectedSize)?.price ?? 0;
  const addOnTotal = selectedAddOns.reduce((sum, id) => {
    const ao = addOns.find((a) => a.id === id);
    return sum + (ao?.price ?? 0);
  }, 0);
  const totalPrice = (basePrice + sizeUpcharge + addOnTotal) * quantity;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleShare = () => {
    setShareClicked(true);
    setTimeout(() => setShareClicked(false), 3000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {setReviewSubmitted(false);setActiveTab('reviews');}, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground font-medium mb-8">
        <Link href="/homepage" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-foreground font-bold">Taro Milk Tea</span>
      </nav>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Images */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Main image */}
          <div className="relative rounded-3xl overflow-hidden bg-card shadow-warm-lg" style={{ height: '480px' }}>
            <AppImage
              src={productImages[selectedImage].src}
              alt={productImages[selectedImage].alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw" />

            {/* Favorite */}
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className={`absolute top-4 right-4 size-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 shadow-warm-md ${
              isFavorited ? 'bg-cta' : 'bg-white/80 backdrop-blur-sm'}`
              }
              aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}>

              <Icon name="HeartIcon" variant={isFavorited ? 'solid' : 'outline'} size={20} className={isFavorited ? 'text-white' : 'text-muted-foreground'} />
            </button>
            {/* Share button with earn rewards */}
            <button
              onClick={handleShare}
              className={`absolute top-4 left-4 flex items-center gap-2 backdrop-blur-sm rounded-full px-3 py-2 text-xs font-bold transition-all shadow-warm-sm ${
              shareClicked ? 'bg-green-500 text-white' : 'bg-white/80 text-foreground hover:bg-white'}`
              }>

              <Icon name="ShareIcon" size={14} />
              {shareClicked ? '✅ +50 pts earned!' : 'Share +50 pts'}
            </button>
            {/* Badge */}
            <div className="absolute bottom-4 left-4">
              <span className="badge-bestseller text-sm">🏆 Best Seller</span>
            </div>
          </div>

          {/* Thumbnail row */}
          <div className="flex gap-3">
            {productImages.map((img, i) =>
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`relative flex-1 rounded-2xl overflow-hidden transition-all duration-200 ${
              selectedImage === i ?
              'ring-3 ring-primary shadow-aqua scale-[1.03]' :
              'opacity-60 hover:opacity-100'}`
              }
              style={{ height: '80px' }}
              aria-label={`View image ${i + 1}`}>

                <AppImage src={img.src} alt={img.alt} fill className="object-cover" sizes="120px" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Product details */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Title + meta */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Bubble Tea</span>
              <span className="size-1 rounded-full bg-border" />
              <span className="text-xs font-bold text-muted-foreground">SKU: BT-TARO-001</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
              Taro Milk Tea
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed font-medium">
              Velvety taro root blended with premium milk tea and topped with our signature chewy boba pearls. A fan favorite for a reason.
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) =>
              <svg key={s} className="size-5 text-accent fill-accent" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              )}
              <span className="text-lg font-extrabold text-foreground ml-1">4.9</span>
            </div>
            <span className="text-muted-foreground font-medium text-sm">1,284 reviews</span>
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
              🔥 847 ordered today
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-foreground">${totalPrice.toFixed(2)}</span>
            <span className="text-base text-muted-foreground font-medium">base $7.50</span>
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">+45 pts per order</span>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Size selector */}
          <div>
            <p className="text-sm font-extrabold text-foreground mb-3 flex items-center gap-2">
              Size
              <span className="text-xs font-medium text-muted-foreground">
                ({sizes.find((s) => s.label === selectedSize)?.volume})
              </span>
            </p>
            <div className="flex gap-3">
              {sizes.map((size) =>
              <button
                key={size.label}
                onClick={() => setSelectedSize(size.label)}
                className={`flex flex-col items-center gap-1 px-5 py-3 rounded-2xl border-2 font-extrabold transition-all duration-200 ${
                selectedSize === size.label ?
                'border-primary bg-primary/10 text-primary shadow-aqua' :
                'border-border bg-card text-foreground hover:border-primary/50'}`
                }>

                  <span className="text-lg">{size.label}</span>
                  <span className="text-[10px] font-semibold text-muted-foreground">{size.volume}</span>
                  {size.price > 0 && <span className="text-[10px] font-bold text-cta">+${size.price.toFixed(2)}</span>}
                </button>
              )}
            </div>
          </div>

          {/* Sugar Level */}
          <div>
            <p className="text-sm font-extrabold text-foreground mb-3">Sugar Level</p>
            <div className="flex gap-2 flex-wrap">
              {sugarLevels.map((level) =>
              <button
                key={level}
                onClick={() => setSelectedSugar(level)}
                className={`px-4 py-2 rounded-2xl border-2 text-sm font-bold transition-all duration-200 ${
                selectedSugar === level ?
                'border-accent bg-accent/15 text-accent-foreground' :
                'border-border bg-card text-foreground hover:border-accent/50'}`
                }>

                  {level}
                </button>
              )}
            </div>
          </div>

          {/* Ice Level */}
          <div>
            <p className="text-sm font-extrabold text-foreground mb-3">Ice Level</p>
            <div className="flex gap-2 flex-wrap">
              {iceLevels.map((level) =>
              <button
                key={level}
                onClick={() => setSelectedIce(level)}
                className={`px-4 py-2 rounded-2xl border-2 text-sm font-bold transition-all duration-200 ${
                selectedIce === level ?
                'border-secondary bg-secondary/20 text-secondary-foreground' :
                'border-border bg-card text-foreground hover:border-secondary/50'}`
                }>

                  {level}
                </button>
              )}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <p className="text-sm font-extrabold text-foreground mb-3">Add-ons</p>
            {/* 
                GRID AUDIT (Add-ons):
                Array: [boba, jelly, cream, pudding] = 4 items
                grid-cols-2: Row 1: [col-1: boba] [col-2: jelly]  Row 2: [col-1: cream] [col-2: pudding]
                Placed 4/4 ✓
               */}
            <div className="grid grid-cols-2 gap-3">
              {addOns.map((ao) => {
                const isSelected = selectedAddOns.includes(ao.id);
                return (
                  <button
                    key={ao.id}
                    onClick={() => toggleAddOn(ao.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-left transition-all duration-200 ${
                    isSelected ?
                    'border-cta bg-cta/8 shadow-cta/20' :
                    'border-border bg-card hover:border-cta/40'}`
                    }>

                    <span className="text-xl">{ao.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${isSelected ? 'text-cta' : 'text-foreground'}`}>{ao.label}</p>
                      <p className="text-[10px] font-semibold text-muted-foreground">+${ao.price.toFixed(2)}</p>
                    </div>
                    {isSelected &&
                    <div className="size-5 rounded-full bg-cta flex items-center justify-center flex-shrink-0">
                        <Icon name="CheckIcon" size={12} className="text-white" />
                      </div>
                    }
                  </button>);

              })}
            </div>
          </div>

          {/* Quantity + CTA */}
          <div className="flex items-center gap-4 pt-2">
            {/* Quantity */}
            <div className="flex items-center gap-0 bg-card border border-border rounded-2xl overflow-hidden shadow-warm-sm">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="size-12 flex items-center justify-center hover:bg-primary/10 transition-colors font-extrabold text-lg text-foreground"
                aria-label="Decrease quantity">

                −
              </button>
              <span className="w-10 text-center font-extrabold text-base text-foreground">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="size-12 flex items-center justify-center hover:bg-primary/10 transition-colors font-extrabold text-lg text-foreground"
                aria-label="Increase quantity">

                +
              </button>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-extrabold text-base transition-all duration-300 ${
              addedToCart ?
              'bg-primary text-primary-foreground scale-[0.98]' :
              'btn-cta'}`
              }>

              {addedToCart ?
              <>
                  <Icon name="CheckIcon" size={20} className="text-primary-foreground" />
                  Added to Cart!
                </> :

              <>
                  <Icon name="ShoppingBagIcon" size={20} className="text-white" />
                  Add to Cart — ${totalPrice.toFixed(2)}
                </>
              }
            </button>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-4 pt-1">
            {[
            { icon: '🚀', text: 'Ready in 20 min' },
            { icon: '🌿', text: 'Fresh ingredients' },
            { icon: '🎁', text: '+45 reward points' }].
            map((item) =>
            <div key={item.text} className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs: Description + Reviews + Write Review */}
      <div className="mt-14 md:mt-16">
        <div className="flex gap-1 border-b border-border mb-8">
          {(['description', 'reviews', 'write'] as const).map((tab) =>
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-extrabold capitalize transition-all duration-200 border-b-2 -mb-px ${
            activeTab === tab ?
            'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`
            }>

              {tab === 'reviews' ? 'Reviews (1,284)' : tab === 'write' ? '✍️ Write Review' : 'Description'}
            </button>
          )}
        </div>

        {activeTab === 'description' &&
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-foreground">About this drink</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Our Taro Milk Tea starts with freshly brewed premium oolong tea, blended with real taro root powder for that signature purple hue and naturally sweet, nutty flavor. We use whole milk or your choice of oat milk, and finish with our house-made boba pearls cooked daily in brown sugar syrup.
              </p>
              <p className="text-muted-foreground leading-relaxed font-medium">
                No artificial colorings. No preservatives. Just real ingredients, real flavor, and real satisfaction in every sip.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-extrabold text-foreground">Nutrition (M size)</h3>
              {[
            { label: 'Calories', value: '320 kcal' },
            { label: 'Sugar', value: '28g (at 50%)' },
            { label: 'Fat', value: '8g' },
            { label: 'Protein', value: '4g' },
            { label: 'Caffeine', value: '40mg' }].
            map((item) =>
            <div key={item.label} className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm font-semibold text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-extrabold text-foreground">{item.value}</span>
                </div>
            )}
            </div>
          </div>
        }

        {activeTab === 'reviews' &&
        <div className="space-y-5">
            {/* Review summary */}
            <div className="glass-card rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="text-center">
                <p className="text-6xl font-extrabold text-foreground">4.9</p>
                <div className="flex justify-center gap-0.5 my-1">
                  {[1, 2, 3, 4, 5].map((s) =>
                <svg key={s} className="size-5 text-accent fill-accent" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                )}
                </div>
                <p className="text-xs text-muted-foreground font-medium">1,284 reviews</p>
              </div>
              <div className="flex-1 space-y-2 w-full">
                {[5, 4, 3, 2, 1].map((star) => {
                const pct = [78, 14, 5, 2, 1][5 - star];
                return (
                  <div key={star} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground w-4">{star}★</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground w-8">{pct}%</span>
                    </div>);

              })}
              </div>
            </div>

            {/* Individual reviews */}
            {reviews.map((review) =>
          <div key={review.id} className="glass-card rounded-3xl p-5 md:p-6 space-y-3">
                <div className="flex items-start gap-4">
                  <div className="size-11 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-warm-sm">
                    <AppImage src={review.avatar} alt={`${review.name} profile photo`} width={44} height={44} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-extrabold text-sm text-foreground">{review.name}</p>
                      {review.verified &&
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">✓ Verified Buyer</span>
                  }
                      <span className="text-xs text-muted-foreground ml-auto">{review.date}</span>
                    </div>
                    <div className="flex gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((s) =>
                  <svg key={s} className={`size-3.5 ${s <= review.rating ? 'text-accent fill-accent' : 'text-border fill-border'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  )}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium pl-0 md:pl-15">{review.text}</p>
                {review.reviewImage &&
            <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                    <AppImage src={review.reviewImage} alt="Review photo of taro milk tea drink" fill className="object-cover" />
                  </div>
            }
              </div>
          )}
          </div>
        }

        {/* Write Review Tab — Verified Buyers Only */}
        {activeTab === 'write' &&
        <div className="max-w-2xl">
            <div className="glass-card rounded-3xl p-6 mb-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-2xl bg-green-100 flex items-center justify-center text-xl">✓</div>
                <div>
                  <p className="font-bold text-foreground text-sm">Verified Purchase Required</p>
                  <p className="text-xs text-muted-foreground">Only customers who have purchased this item can leave a review</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-2xl">
                <span className="text-sm">🎁</span>
                <p className="text-xs text-primary font-semibold">Leave a review and earn <strong>+50 points</strong>!</p>
              </div>
            </div>

            {reviewSubmitted ?
          <div className="glass-card rounded-3xl p-8 text-center">
                <div className="text-5xl mb-3">🎉</div>
                <h3 className="text-xl font-extrabold text-foreground mb-1">Review Submitted!</h3>
                <p className="text-muted-foreground text-sm">+50 points added to your account</p>
              </div> :

          <form onSubmit={handleSubmitReview} className="glass-card rounded-3xl p-6 flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) =>
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewForm((prev) => ({ ...prev, rating: star }))}
                  className="transition-transform hover:scale-110">

                        <svg
                    className={`size-8 transition-colors ${star <= reviewForm.rating ? 'text-accent fill-accent' : 'text-muted fill-muted'}`}
                    viewBox="0 0 20 20">

                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                )}
                    <span className="text-sm font-bold text-muted-foreground ml-2 self-center">
                      {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][reviewForm.rating]}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Your Review</label>
                  <textarea
                value={reviewForm.text}
                onChange={(e) => setReviewForm((prev) => ({ ...prev, text: e.target.value }))}
                placeholder="Share your experience with this drink..."
                rows={4}
                required
                className="w-full bg-input/60 border border-border rounded-2xl px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />

                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Add Photo (optional)</label>
                  <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm text-muted-foreground font-medium">Click to upload a photo</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                    <input type="file" accept="image/*" className="hidden" />
                  </div>
                </div>

                <button type="submit" className="btn-cta w-full">
                  Submit Review & Earn 50 pts 🎁
                </button>
              </form>
          }
          </div>
        }
      </div>
    </div>);

}