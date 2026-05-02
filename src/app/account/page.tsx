'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import FloatingChat from '@/components/FloatingChat';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

type TabId = 'orders' | 'tracking' | 'favorites' | 'addresses' | 'payments' | 'rewards' | 'loyalty' | 'subscription' | 'reviews';

interface SidebarItem {
  id: TabId;
  label: string;
  emoji: string;
}

const sidebarItems: SidebarItem[] = [
{ id: 'orders', label: 'Orders', emoji: '📦' },
{ id: 'tracking', label: 'Tracking', emoji: '🚚' },
{ id: 'favorites', label: 'Favorites', emoji: '❤️' },
{ id: 'addresses', label: 'Addresses', emoji: '📍' },
{ id: 'payments', label: 'Payments', emoji: '💳' },
{ id: 'rewards', label: 'Rewards', emoji: '🎁' },
{ id: 'loyalty', label: 'Loyalty Level', emoji: '🏆' },
{ id: 'subscription', label: 'Subscription', emoji: '💳' },
{ id: 'reviews', label: 'Reviews', emoji: '⭐' }];


const orders = [
{ id: 'BS-8842', date: 'Apr 27, 2026', items: 'Taro Milk Tea × 2, Brown Sugar Boba', total: 29.70, status: 'Delivered', points: 297 },
{ id: 'BS-8801', date: 'Apr 20, 2026', items: 'Matcha Latte × 1, Strawberry Smoothie', total: 15.00, status: 'Delivered', points: 150 },
{ id: 'BS-8765', date: 'Apr 14, 2026', items: 'Iced Americano × 3', total: 16.50, status: 'Delivered', points: 165 },
{ id: 'BS-8720', date: 'Apr 8, 2026', items: 'Mango Passion × 2, Peach Oolong', total: 21.40, status: 'Delivered', points: 214 }];


const favorites = [
{ id: 1, name: 'Taro Milk Tea', price: 7.50, image: 'https://images.unsplash.com/photo-1657336576113-1ea39af07fdd', alt: 'Purple taro milk tea with boba pearls in clear cup' },
{ id: 2, name: 'Brown Sugar Boba', price: 7.90, image: "https://images.unsplash.com/photo-1637273484213-3b41dfbdcf99", alt: 'Brown sugar tiger stripe bubble tea with caramel swirls' },
{ id: 3, name: 'Matcha Latte', price: 6.80, image: 'https://images.unsplash.com/photo-1595522099140-18383a74b7f4', alt: 'Vibrant green matcha iced latte in glass with ice' },
{ id: 4, name: 'Mango Passion', price: 7.20, image: "https://images.unsplash.com/photo-1584586994460-0c8d029148fd", alt: 'Bright orange mango passion fruit drink with tropical garnish' },
{ id: 5, name: 'Strawberry Smoothie', price: 8.20, image: "https://img.rocket.new/generatedImages/rocket_gen_img_154189725-1773926573162.png", alt: 'Bright red strawberry smoothie with fresh fruit garnish' },
{ id: 6, name: 'Iced Americano', price: 5.50, image: "https://images.unsplash.com/photo-1720271339195-d35eb0c69de0", alt: 'Iced americano coffee in tall glass with ice cubes' }];


const initialAddresses = [
{ id: 1, label: 'Home', icon: '🏠', name: 'Jane Doe', phone: '+1 555-0100', city: 'San Francisco', street: '42 Blossom Lane, Apt 3B', building: 'Apt 3B', floor: '', landmark: 'Near Central Park', default: true },
{ id: 2, label: 'Work', icon: '💼', name: 'Jane Doe', phone: '+1 555-0200', city: 'San Francisco', street: '100 Market St, Floor 12', building: 'Tower B', floor: '12', landmark: '', default: false }];


const reviews = [
{ id: 1, product: 'Taro Milk Tea', rating: 5, comment: 'Absolutely divine! The taro flavor is so authentic and the boba pearls are perfectly chewy.', date: 'Apr 20, 2026', image: "https://images.unsplash.com/photo-1657336576113-1ea39af07fdd", alt: 'Taro milk tea review photo' },
{ id: 2, product: 'Brown Sugar Boba', rating: 5, comment: "Best brown sugar boba I\'ve ever had. The tiger stripes are gorgeous!", date: 'Apr 14, 2026', image: null, alt: '' }];


const levels = [
{ name: 'Bronze', emoji: '🥉', color: 'from-amber-700 to-amber-500', min: 0, max: 500, multiplier: '1×' },
{ name: 'Silver', emoji: '🥈', color: 'from-gray-400 to-gray-300', min: 500, max: 1500, multiplier: '1.25×' },
{ name: 'Gold', emoji: '🏆', color: 'from-yellow-400 to-amber-500', min: 1500, max: 3500, multiplier: '1.5×' },
{ name: 'VIP', emoji: '💎', color: 'from-purple-500 to-indigo-500', min: 3500, max: 5000, multiplier: '2×' }];


const redeemOptions = [
{ name: 'Free Taro Milk Tea', points: 500, emoji: '🧋', value: '$7.50' },
{ name: '20% Off Next Order', points: 300, emoji: '💰', value: '20% OFF' },
{ name: 'Free Smoothie Bundle', points: 800, emoji: '🥤', value: '$9.00' },
{ name: '$5 Store Credit', points: 250, emoji: '💵', value: '$5.00' },
{ name: 'Free Boba Upgrade', points: 150, emoji: '🫧', value: 'Free Add-on' },
{ name: 'VIP Early Access', points: 1000, emoji: '⭐', value: 'Exclusive' }];


function VisaLogo() {
  return <svg viewBox="0 0 48 16" className="h-4 w-auto" aria-label="Visa"><text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#1A1F71">VISA</text></svg>;
}
function MastercardLogo() {
  return (
    <svg viewBox="0 0 38 24" className="h-5 w-auto" aria-label="Mastercard">
      <circle cx="13" cy="12" r="10" fill="#EB001B" />
      <circle cx="25" cy="12" r="10" fill="#F79E1B" />
      <path d="M19 5.5a10 10 0 0 1 0 13A10 10 0 0 1 19 5.5z" fill="#FF5F00" />
    </svg>);

}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabId>('orders');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [redeemed, setRedeemed] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('visa-4242');

  const loyaltyLevel = 'Gold';
  const loyaltyPoints = 2840;
  const currentLevel = levels[2]; // Gold
  const nextLevel = levels[3]; // VIP
  const loyaltyProgress = (loyaltyPoints - currentLevel.min) / (nextLevel.min - currentLevel.min) * 100;
  const drinksToNext = Math.ceil((nextLevel.min - loyaltyPoints) / 75);

  const setDefaultAddress = (id: number) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, default: a.id === id })));
  };

  const paymentMethods = [
  { id: 'visa-4242', brand: 'Visa', last4: '4242', expiry: '12/26', logo: <VisaLogo /> },
  { id: 'mc-8888', brand: 'Mastercard', last4: '8888', expiry: '09/25', logo: <MastercardLogo /> }];


  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} />

      <main className="pt-20 pb-32 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Mobile Tab Selector */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="glass-card rounded-2xl px-4 py-3 flex items-center gap-3 w-full">

              <span className="text-xl">{sidebarItems.find((s) => s.id === activeTab)?.emoji}</span>
              <span className="font-bold text-foreground flex-1 text-left">{sidebarItems.find((s) => s.id === activeTab)?.label}</span>
              <Icon name={sidebarOpen ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={18} className="text-muted-foreground" />
            </button>
            {sidebarOpen &&
            <div className="glass-card rounded-2xl mt-2 p-2 flex flex-col gap-1">
                {sidebarItems.map((item) =>
              <button
                key={item.id}
                onClick={() => {setActiveTab(item.id);setSidebarOpen(false);}}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeTab === item.id ? 'bg-primary/15 text-foreground font-bold' : 'text-muted-foreground hover:bg-muted/40'}`}>

                    <span>{item.emoji}</span>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </button>
              )}
              </div>
            }
          </div>

          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 flex-shrink-0">
              <div className="glass-card rounded-3xl p-5 mb-4 text-center">
                <div className="size-16 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-3 flex items-center justify-center text-2xl font-extrabold text-white shadow-aqua">
                  JD
                </div>
                <h3 className="font-extrabold text-foreground">Jane Doe</h3>
                <p className="text-xs text-muted-foreground">jane@example.com</p>
                <div className="mt-3 inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  🏆 {loyaltyLevel} Member
                </div>
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  <span className="text-lg font-extrabold text-gradient-warm">{loyaltyPoints.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground font-medium">pts</span>
                </div>
              </div>
              <div className="glass-card rounded-3xl p-3 flex flex-col gap-1">
                {sidebarItems.map((item) =>
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 ${
                  activeTab === item.id ?
                  'bg-primary/15 text-foreground font-bold shadow-warm-sm' :
                  'text-muted-foreground hover:bg-muted/40 hover:text-foreground'}`
                  }>

                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-sm font-semibold">{item.label}</span>
                    {activeTab === item.id && <div className="ml-auto size-1.5 rounded-full bg-primary" />}
                  </button>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">

              {/* ORDERS */}
              {activeTab === 'orders' &&
              <div>
                  <h2 className="text-2xl font-extrabold text-foreground mb-5">📦 Order History</h2>
                  <div className="flex flex-col gap-4">
                    {orders.map((order) =>
                  <div key={order.id} className="glass-card rounded-3xl p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className="font-mono font-bold text-foreground text-sm">{order.id}</span>
                            <p className="text-xs text-muted-foreground mt-0.5">{order.date}</p>
                          </div>
                          <span className="text-xs bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full">{order.status}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{order.items}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-extrabold text-foreground">${order.total.toFixed(2)}</span>
                            <span className="text-xs text-primary font-semibold ml-2">+{order.points} pts</span>
                          </div>
                          <div className="flex gap-2">
                            <Link href="/order-tracking" className="text-xs font-semibold text-primary hover:underline">Track</Link>
                            <button className="text-xs bg-cta/10 text-cta font-bold px-3 py-1.5 rounded-full hover:bg-cta/20 transition-colors">Reorder</button>
                          </div>
                        </div>
                      </div>
                  )}
                  </div>
                </div>
              }

              {/* TRACKING */}
              {activeTab === 'tracking' &&
              <div>
                  <h2 className="text-2xl font-extrabold text-foreground mb-5">🚚 Active Order</h2>
                  <div className="glass-card rounded-3xl p-6">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="size-12 rounded-2xl bg-gradient-to-br from-cta to-accent flex items-center justify-center text-2xl shadow-cta">🚚</div>
                      <div>
                        <p className="font-extrabold text-foreground">On the Way</p>
                        <p className="text-sm text-muted-foreground">Order BS-20260427-8842 · ETA ~13 min</p>
                      </div>
                      <div className="ml-auto">
                        <span className="text-xs bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full animate-pulse">LIVE</span>
                      </div>
                    </div>
                    <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden mb-4">
                      <div className="h-full w-3/4 rounded-full" style={{ background: 'linear-gradient(90deg, #4CDBD5, #F2A35E, #F25A38)' }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-5">
                      <span>✅ Placed</span>
                      <span>🍹 Preparing</span>
                      <span className="text-cta font-bold">🚚 On the Way</span>
                      <span>🎉 Delivered</span>
                    </div>
                    <Link href="/order-tracking" className="btn-cta w-full text-center block">View Full Tracking</Link>
                  </div>
                </div>
              }

              {/* FAVORITES */}
              {activeTab === 'favorites' &&
              <div>
                  <h2 className="text-2xl font-extrabold text-foreground mb-5">❤️ Favorites</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {favorites.map((item) =>
                  <div key={item.id} className="product-card rounded-3xl overflow-hidden">
                        <div className="relative h-36">
                          <AppImage src={item.image} alt={item.alt} fill className="object-cover" />
                          <button className="absolute top-2 right-2 size-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-cta shadow-warm-sm">
                            <Icon name="HeartIcon" variant="solid" size={16} />
                          </button>
                        </div>
                        <div className="p-3">
                          <p className="font-bold text-foreground text-sm">{item.name}</p>
                          <p className="text-cta font-extrabold text-sm mt-1">${item.price.toFixed(2)}</p>
                          <Link href="/product" className="mt-2 w-full text-center block text-xs bg-primary/15 text-primary font-bold py-2 rounded-xl hover:bg-primary/25 transition-colors">
                            Add to Cart
                          </Link>
                        </div>
                      </div>
                  )}
                  </div>
                </div>
              }

              {/* ADDRESSES */}
              {activeTab === 'addresses' &&
              <div>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-extrabold text-foreground">📍 Saved Addresses</h2>
                    <button
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    className="flex items-center gap-2 text-sm font-bold text-primary hover:text-cta transition-colors">

                      <Icon name="PlusIcon" size={16} />
                      Add New
                    </button>
                  </div>

                  {showAddAddress &&
                <div className="glass-card rounded-3xl p-5 mb-5">
                      <h3 className="font-bold text-foreground mb-4">New Address</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                    { placeholder: 'Full Name', colSpan: false },
                    { placeholder: 'Phone Number', colSpan: false },
                    { placeholder: 'City', colSpan: false },
                    { placeholder: 'Street Address', colSpan: true },
                    { placeholder: 'Building / Apartment', colSpan: false },
                    { placeholder: 'Floor (optional)', colSpan: false },
                    { placeholder: 'Landmark (optional)', colSpan: true }].
                    map((field) =>
                    <input
                      key={field.placeholder}
                      placeholder={field.placeholder}
                      className={`bg-input/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${field.colSpan ? 'col-span-2' : ''}`} />

                    )}
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button className="btn-cta flex-1 py-3 text-sm">Save Address</button>
                        <button onClick={() => setShowAddAddress(false)} className="btn-primary flex-1 py-3 text-sm">Cancel</button>
                      </div>
                    </div>
                }

                  <div className="flex flex-col gap-4">
                    {addresses.map((addr) =>
                  <div key={addr.id} className="glass-card rounded-3xl p-5">
                        <div className="flex items-start gap-4">
                          <div className="size-10 rounded-2xl bg-primary/15 flex items-center justify-center text-xl flex-shrink-0">{addr.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-foreground">{addr.label}</span>
                              {addr.default && <span className="text-xs bg-primary/20 text-primary font-bold px-2 py-0.5 rounded-full">Default</span>}
                            </div>
                            <p className="text-sm text-muted-foreground">{addr.name} · {addr.phone}</p>
                            <p className="text-sm text-muted-foreground">{addr.street}, {addr.city}</p>
                            {addr.landmark && <p className="text-xs text-muted-foreground mt-0.5">Near: {addr.landmark}</p>}
                          </div>
                          <div className="flex flex-col gap-2">
                            <button className="text-muted-foreground hover:text-primary transition-colors">
                              <Icon name="PencilIcon" size={16} />
                            </button>
                            {!addr.default &&
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-xs text-primary font-semibold hover:text-cta transition-colors">

                                Set default
                              </button>
                        }
                          </div>
                        </div>
                      </div>
                  )}
                    <button
                    onClick={() => setShowAddAddress(true)}
                    className="glass-card rounded-3xl p-5 flex items-center gap-3 border-2 border-dashed border-border hover:border-primary/50 transition-colors">

                      <div className="size-10 rounded-2xl bg-muted flex items-center justify-center">
                        <Icon name="PlusIcon" size={20} className="text-muted-foreground" />
                      </div>
                      <span className="font-semibold text-muted-foreground">Add New Address</span>
                    </button>
                  </div>
                </div>
              }

              {/* PAYMENTS */}
              {activeTab === 'payments' &&
              <div>
                  <h2 className="text-2xl font-extrabold text-foreground mb-5">💳 Payment Methods</h2>
                  <div className="flex flex-col gap-4">
                    {paymentMethods.map((card) =>
                  <button
                    key={card.id}
                    onClick={() => setSelectedPayment(card.id)}
                    className={`glass-card rounded-3xl p-5 flex items-center gap-4 transition-all duration-200 border-2 ${
                    selectedPayment === card.id ? 'border-primary bg-primary/5' : 'border-transparent hover:border-primary/30'}`
                    }>

                        <div className="size-14 rounded-2xl bg-white flex items-center justify-center shadow-warm-sm flex-shrink-0">
                          {card.logo}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-bold text-foreground">{card.brand} •••• {card.last4}</p>
                          <p className="text-xs text-muted-foreground">Expires {card.expiry}</p>
                        </div>
                        {selectedPayment === card.id &&
                    <Icon name="CheckCircleIcon" size={20} className="text-primary" />
                    }
                      </button>
                  )}

                    {/* COD option */}
                    <button
                    onClick={() => setSelectedPayment('cod')}
                    className={`glass-card rounded-3xl p-5 flex items-center gap-4 transition-all duration-200 border-2 ${
                    selectedPayment === 'cod' ? 'border-primary bg-primary/5' : 'border-transparent hover:border-primary/30'}`
                    }>

                      <div className="size-14 rounded-2xl bg-green-50 flex items-center justify-center text-2xl flex-shrink-0">💵</div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-foreground">Cash on Delivery</p>
                        <p className="text-xs text-muted-foreground">Pay when your order arrives</p>
                      </div>
                      {selectedPayment === 'cod' && <Icon name="CheckCircleIcon" size={20} className="text-primary" />}
                    </button>

                    {/* Apple Pay */}
                    <button
                    onClick={() => setSelectedPayment('applepay')}
                    className={`glass-card rounded-3xl p-5 flex items-center gap-4 transition-all duration-200 border-2 ${
                    selectedPayment === 'applepay' ? 'border-primary bg-primary/5' : 'border-transparent hover:border-primary/30'}`
                    }>

                      <div className="size-14 rounded-2xl bg-black flex items-center justify-center text-white text-sm font-bold flex-shrink-0"> Pay</div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-foreground">Apple Pay</p>
                        <p className="text-xs text-muted-foreground">Touch ID or Face ID</p>
                      </div>
                      {selectedPayment === 'applepay' && <Icon name="CheckCircleIcon" size={20} className="text-primary" />}
                    </button>

                    <button className="glass-card rounded-3xl p-5 flex items-center gap-3 border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                      <div className="size-10 rounded-2xl bg-muted flex items-center justify-center">
                        <Icon name="PlusIcon" size={20} className="text-muted-foreground" />
                      </div>
                      <span className="font-semibold text-muted-foreground">Add New Card</span>
                    </button>
                  </div>
                </div>
              }

              {/* REWARDS */}
              {activeTab === 'rewards' &&
              <div>
                  <h2 className="text-2xl font-extrabold text-foreground mb-5">🎁 Rewards</h2>
                  {/* Points balance */}
                  <div className="glass-card rounded-3xl p-6 mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex items-center gap-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Points Balance</p>
                        <div className="text-5xl font-extrabold text-gradient-warm">{loyaltyPoints.toLocaleString()}</div>
                        <p className="text-sm text-muted-foreground mt-1">≈ ${(loyaltyPoints / 100).toFixed(2)} in rewards</p>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="size-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-3xl shadow-warm-md">🏆</div>
                        <p className="text-xs font-bold text-foreground mt-1">{loyaltyLevel}</p>
                      </div>
                    </div>
                  </div>

                  {/* Redeem options */}
                  <h3 className="font-extrabold text-foreground mb-4">Redeem Points</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {redeemOptions.map((option, idx) => {
                    const canRedeem = loyaltyPoints >= option.points;
                    return (
                      <div key={option.name} className={`glass-card rounded-3xl p-4 flex items-center gap-3 transition-all ${canRedeem ? 'hover:shadow-warm-lg' : 'opacity-60'}`}>
                          <div className="size-12 rounded-2xl bg-gradient-to-br from-accent to-cta flex items-center justify-center text-2xl flex-shrink-0">{option.emoji}</div>
                          <div className="flex-1">
                            <p className="font-bold text-foreground text-sm">{option.name}</p>
                            <p className="text-xs text-primary font-semibold">{option.value}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-extrabold text-foreground mb-1">{option.points} pts</p>
                            <button
                            onClick={() => canRedeem && setRedeemed(idx)}
                            disabled={!canRedeem}
                            className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                            redeemed === idx ? 'bg-green-500 text-white' : canRedeem ? 'bg-cta text-white hover:bg-cta/80' : 'bg-muted text-muted-foreground cursor-not-allowed'}`
                            }>

                              {redeemed === idx ? '✅' : canRedeem ? 'Redeem' : 'Need more'}
                            </button>
                          </div>
                        </div>);

                  })}
                  </div>
                </div>
              }

              {/* LOYALTY */}
              {activeTab === 'loyalty' &&
              <div>
                  <h2 className="text-2xl font-extrabold text-foreground mb-5">🏆 Loyalty Level</h2>
                  {/* Current level card */}
                  <div className="glass-card rounded-3xl p-6 mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                      <div className={`size-20 rounded-3xl bg-gradient-to-br ${currentLevel.color} flex items-center justify-center text-4xl shadow-warm-lg animate-float`}>
                        {currentLevel.emoji}
                      </div>
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-2xl font-extrabold text-foreground">{currentLevel.name} Member</h3>
                          <span className="text-xs bg-primary/15 text-primary font-bold px-2.5 py-1 rounded-full">{currentLevel.multiplier} earn rate</span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">{loyaltyPoints.toLocaleString()} points · {drinksToNext} drinks to {nextLevel.name}</p>
                        <div className="mb-2 flex justify-between text-xs font-semibold">
                          <span>{currentLevel.name} ({currentLevel.min.toLocaleString()} pts)</span>
                          <span className="text-primary">{nextLevel.name} ({nextLevel.min.toLocaleString()} pts)</span>
                        </div>
                        <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                          <div
                          className="h-full rounded-full relative transition-all duration-1000"
                          style={{ width: `${Math.min(loyaltyProgress, 100)}%`, background: 'linear-gradient(90deg, #F2A35E, #F25A38)' }}>

                            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/30 rounded-full" />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">🧋 <strong className="text-foreground">{drinksToNext} more drinks</strong> to reach <strong className="text-cta">{nextLevel.name}</strong> and unlock {nextLevel.multiplier} points!</p>
                      </div>
                    </div>
                  </div>

                  {/* All levels */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {levels.map((level, idx) => {
                    const isActive = level.name === loyaltyLevel;
                    const isPast = idx < levels.indexOf(currentLevel);
                    return (
                      <div
                        key={level.name}
                        className={`rounded-3xl p-4 text-center transition-all ${isActive ? 'ring-2 ring-primary shadow-aqua bg-primary/5' : 'glass-card'}`}>

                          <div className={`size-14 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center text-3xl mx-auto mb-2 shadow-warm-sm ${isActive ? 'scale-110' : ''}`}>
                            {level.emoji}
                          </div>
                          <p className="font-extrabold text-foreground">{level.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{level.multiplier} earn rate</p>
                          <p className="text-xs text-muted-foreground">{level.min.toLocaleString()}+ pts</p>
                          {isActive && <span className="text-xs bg-primary/20 text-primary font-bold px-2 py-0.5 rounded-full mt-2 inline-block">Current</span>}
                          {isPast && <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full mt-2 inline-block">✓ Unlocked</span>}
                        </div>);

                  })}
                  </div>
                </div>
              }

              {/* SUBSCRIPTION */}
              {activeTab === 'subscription' &&
              <div>
                  <h2 className="text-2xl font-extrabold text-foreground mb-5">💳 Subscription</h2>
                  {/* Active plan */}
                  <div className="glass-card rounded-3xl p-6 mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl shadow-aqua">⭐</div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-0.5">Active Plan</p>
                          <h3 className="text-xl font-extrabold text-foreground">Standard Plan</h3>
                          <p className="text-sm text-muted-foreground">$24/month · Renews May 27, 2026</p>
                        </div>
                        <span className="ml-auto text-xs bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full">Active</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {[
                      { label: 'Drinks Left', value: '5 / 8' },
                      { label: 'Discount', value: '15% off' },
                      { label: 'Points', value: '1.5×' }].
                      map((stat) =>
                      <div key={stat.label} className="bg-muted/40 rounded-2xl p-3 text-center">
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                            <p className="font-extrabold text-foreground text-sm">{stat.value}</p>
                          </div>
                      )}
                      </div>
                      <div className="flex gap-3">
                        <Link href="/subscription" className="btn-cta flex-1 text-center text-sm py-3">Upgrade Plan</Link>
                        <button className="flex-1 py-3 rounded-2xl border-2 border-border text-sm font-bold text-muted-foreground hover:border-cta hover:text-cta transition-all">Cancel</button>
                      </div>
                    </div>
                  </div>
                  <Link href="/subscription" className="btn-primary w-full text-center block">View All Plans</Link>
                </div>
              }

              {/* REVIEWS */}
              {activeTab === 'reviews' &&
              <div>
                  <h2 className="text-2xl font-extrabold text-foreground mb-5">⭐ My Reviews</h2>
                  <div className="flex flex-col gap-4">
                    {reviews.map((review) =>
                  <div key={review.id} className="glass-card rounded-3xl p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-foreground">{review.product}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">{review.date}</p>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) =>
                        <svg key={s} className={`size-4 ${s <= review.rating ? 'text-accent fill-accent' : 'text-muted fill-muted'}`} viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                        )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                        {review.image &&
                    <div className="mt-3 relative w-20 h-20 rounded-xl overflow-hidden">
                            <AppImage src={review.image} alt={review.alt} fill className="object-cover" />
                          </div>
                    }
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-full">✓ Verified Purchase</span>
                        </div>
                      </div>
                  )}
                    <div className="glass-card rounded-3xl p-5 border-2 border-dashed border-border">
                      <h3 className="font-bold text-foreground mb-3">Write a Review</h3>
                      <p className="text-sm text-muted-foreground mb-3">Share your experience with a verified purchase</p>
                      <Link href="/shop" className="btn-primary text-sm py-3 inline-flex">Browse Orders to Review</Link>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
      <FloatingChat />
    </div>);

}