'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import FloatingChat from '@/components/FloatingChat';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  alt: string;
  customization: string;
}

const initialCartItems: CartItem[] = [
{
  id: 1,
  name: 'Taro Milk Tea',
  description: 'Large • 50% Sugar • Less Ice',
  price: 7.50,
  quantity: 2,
  image: 'https://images.unsplash.com/photo-1657336576113-1ea39af07fdd',
  alt: 'Purple taro milk tea with boba pearls in clear cup',
  customization: '+ Boba Pearls'
},
{
  id: 2,
  name: 'Brown Sugar Boba',
  description: 'Medium • Normal Sugar • Normal Ice',
  price: 7.90,
  quantity: 1,
  image: 'https://images.unsplash.com/photo-1637273484213-3b41dfbdcf99',
  alt: 'Brown sugar tiger stripe bubble tea with caramel swirls',
  customization: '+ Cream Top'
},
{
  id: 3,
  name: 'Matcha Latte',
  description: 'Large • No Sugar • Extra Ice',
  price: 6.80,
  quantity: 1,
  image: 'https://images.unsplash.com/photo-1595522099140-18383a74b7f4',
  alt: 'Vibrant green matcha iced latte in glass with ice',
  customization: 'Oat Milk'
},
{
  id: 4,
  name: 'Mango Passion',
  description: 'Medium • 75% Sugar • Regular Ice',
  price: 7.20,
  quantity: 1,
  image: "https://images.unsplash.com/photo-1584586994460-0c8d029148fd",
  alt: 'Bright orange mango passion fruit drink with tropical garnish',
  customization: '+ Coconut Jelly'
}];


export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const updateQty = (id: number, delta: number) => {
    setCartItems((prev) =>
    prev.map((item) =>
    item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItemCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  // Buy 4 Get 1 Free auto-apply logic: cheapest item becomes free
  const buy4Get1FreeDiscount = useMemo(() => {
    if (totalItemCount < 5) return 0;
    const allItems = cartItems.flatMap((item) =>
    Array(item.quantity).fill(item.price)
    );
    allItems.sort((a, b) => a - b);
    return allItems[0] ?? 0;
  }, [cartItems, totalItemCount]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const couponDiscount = couponApplied ? subtotal * 0.15 : 0;
  const delivery = 2.50;
  const total = subtotal - couponDiscount - buy4Get1FreeDiscount + delivery;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'BUBBLE15') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try BUBBLE15');
      setCouponApplied(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={totalItemCount} />

      <main className="pt-24 pb-32 md:pb-16 px-4 max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Your Cart 🧺
          </h1>
          <p className="text-muted-foreground mt-1">{totalItemCount} items in your cart</p>
        </div>

        {/* Buy 4 Get 1 Free Banner */}
        {totalItemCount >= 5 ?
        <div className="mb-6 p-4 rounded-2xl flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #4CDBD5, #8FD9CB)' }}>
            <span className="text-2xl">🎁</span>
            <div>
              <p className="font-extrabold text-white text-sm">Buy 4 Get 1 Free — Applied!</p>
              <p className="text-white/80 text-xs">Cheapest item (${buy4Get1FreeDiscount.toFixed(2)}) is free automatically</p>
            </div>
            <span className="ml-auto font-extrabold text-white text-sm">-${buy4Get1FreeDiscount.toFixed(2)}</span>
          </div> :
        totalItemCount >= 4 ?
        <div className="mb-6 p-4 rounded-2xl flex items-center gap-3 bg-accent/20 border border-accent/30">
            <span className="text-2xl">🎁</span>
            <div>
              <p className="font-extrabold text-foreground text-sm">Add 1 more drink to get the cheapest one FREE!</p>
              <p className="text-muted-foreground text-xs">Buy 4 Get 1 Free offer — {5 - totalItemCount} item away</p>
            </div>
          </div> :

        <div className="mb-6 p-4 rounded-2xl flex items-center gap-3 bg-muted/40 border border-border">
            <span className="text-2xl">🎁</span>
            <div>
              <p className="font-semibold text-foreground text-sm">Add {5 - totalItemCount} more drinks to unlock Buy 4 Get 1 Free!</p>
              <p className="text-muted-foreground text-xs">The cheapest item will be automatically free</p>
            </div>
            <Link href="/shop" className="ml-auto text-xs font-bold text-primary hover:text-cta transition-colors flex-shrink-0">
              Add drinks →
            </Link>
          </div>
        }

        {cartItems.length === 0 ?
        <div className="flex flex-col items-center justify-center py-24 gap-6">
            <div className="text-8xl">🧺</div>
            <h2 className="text-2xl font-bold text-foreground">Your cart is empty</h2>
            <p className="text-muted-foreground">Add some delicious drinks to get started!</p>
            <Link href="/shop" className="btn-cta">Browse Drinks</Link>
          </div> :

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cartItems.map((item) =>
            <div key={item.id} className="glass-card rounded-3xl p-4 md:p-5 flex gap-4 items-center group">
                  {/* Image */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0">
                    <AppImage src={item.image} alt={item.alt} fill className="object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-base md:text-lg leading-tight">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                    <p className="text-xs text-primary font-semibold mt-1">{item.customization}</p>
                    <p className="text-base font-extrabold text-cta mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-3">
                    <button
                  onClick={() => removeItem(item.id)}
                  className="text-muted-foreground hover:text-cta transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Remove item">

                      <Icon name="TrashIcon" size={16} />
                    </button>
                    <div className="flex items-center gap-2 bg-muted/40 rounded-full px-2 py-1">
                      <button
                    onClick={() => updateQty(item.id, -1)}
                    className="size-7 rounded-full bg-white/80 flex items-center justify-center hover:bg-primary/20 transition-colors font-bold text-foreground shadow-warm-sm"
                    aria-label="Decrease quantity">

                        <Icon name="MinusIcon" size={14} />
                      </button>
                      <span className="w-6 text-center font-bold text-foreground text-sm">{item.quantity}</span>
                      <button
                    onClick={() => updateQty(item.id, 1)}
                    className="size-7 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors font-bold text-white shadow-aqua"
                    aria-label="Increase quantity">

                        <Icon name="PlusIcon" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
            )}

              {/* Coupon Input */}
              <div className="glass-card rounded-3xl p-5">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span>💰</span> Apply Coupon
                </h3>
                <div className="flex gap-3">
                  <input
                  type="text"
                  value={coupon}
                  onChange={(e) => {setCoupon(e.target.value);setCouponError('');}}
                  placeholder="Enter coupon code (e.g. BUBBLE15)"
                  className="flex-1 bg-input/60 border border-border rounded-2xl px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />

                  <button onClick={applyCoupon} className="btn-primary px-6 py-3 text-sm">
                    Apply
                  </button>
                </div>
                {couponApplied &&
              <p className="text-sm text-green-600 font-semibold mt-2 flex items-center gap-1">
                    <Icon name="CheckCircleIcon" size={16} /> 15% discount applied!
                  </p>
              }
                {couponError &&
              <p className="text-sm text-cta font-semibold mt-2 flex items-center gap-1">
                    <Icon name="ExclamationCircleIcon" size={16} /> {couponError}
                  </p>
              }
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-3xl p-6 sticky top-24">
                <h2 className="text-xl font-extrabold text-foreground mb-5">Order Summary</h2>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between text-foreground/80">
                    <span>Subtotal ({totalItemCount} items)</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  {buy4Get1FreeDiscount > 0 &&
                <div className="flex justify-between text-primary font-semibold">
                      <span>🎁 Buy 4 Get 1 Free</span>
                      <span>-${buy4Get1FreeDiscount.toFixed(2)}</span>
                    </div>
                }
                  {couponApplied &&
                <div className="flex justify-between text-green-600 font-semibold">
                      <span>Coupon (BUBBLE15)</span>
                      <span>-${couponDiscount.toFixed(2)}</span>
                    </div>
                }
                  <div className="flex justify-between text-foreground/80">
                    <span>Delivery fee</span>
                    <span className="font-semibold">${delivery.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-foreground font-extrabold text-lg">
                    <span>Total</span>
                    <span className="text-cta">${total.toFixed(2)}</span>
                  </div>
                </div>

                {(buy4Get1FreeDiscount > 0 || couponApplied) &&
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-2xl">
                    <p className="text-xs text-green-700 font-semibold">
                      🎉 You saved ${(buy4Get1FreeDiscount + couponDiscount).toFixed(2)} on this order!
                    </p>
                  </div>
              }

                <div className="mt-4 p-3 bg-primary/10 rounded-2xl flex items-center gap-2">
                  <span className="text-lg">🎁</span>
                  <p className="text-xs text-primary-foreground font-semibold">
                    You&apos;ll earn <strong>{Math.floor(total * 10)} points</strong> on this order!
                  </p>
                </div>

                <Link href="/checkout" className="btn-cta w-full text-center mt-5 block">
                  Checkout Now →
                </Link>

                <Link href="/shop" className="mt-3 w-full text-center block text-sm text-muted-foreground hover:text-primary transition-colors font-semibold py-2">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        }
      </main>

      <Footer />
      <MobileBottomNav />
      <FloatingChat />
    </div>);

}