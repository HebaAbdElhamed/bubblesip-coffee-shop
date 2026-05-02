'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import FloatingChat from '@/components/FloatingChat';
import Icon from '@/components/ui/AppIcon';

type DeliveryMethod = 'delivery' | 'pickup';
type PaymentType = 'cod' | 'visa' | 'mastercard' | 'applepay' | 'new';

const branches = [
  { id: 1, name: 'Downtown Hub', address: '123 Main St, Downtown', time: '10–20 min', emoji: '🏙️' },
  { id: 2, name: 'Westside Mall', address: '456 West Ave, Mall Level 2', time: '15–25 min', emoji: '🏬' },
  { id: 3, name: 'Eastpark Station', address: '789 East Blvd, Station Plaza', time: '20–30 min', emoji: '🚉' },
];

const savedAddresses = [
  { id: 1, label: 'Home 🏠', address: '42 Blossom Lane, Apt 3B, San Francisco, CA 94102' },
  { id: 2, label: 'Work 💼', address: '100 Market St, Floor 12, San Francisco, CA 94105' },
];

const orderItems = [
  { name: 'Taro Milk Tea × 2', price: 15.00 },
  { name: 'Brown Sugar Boba × 1', price: 7.90 },
  { name: 'Matcha Latte × 1', price: 6.80 },
];

const steps = ['Delivery', 'Payment', 'Summary'];

// SVG brand logos inline
function VisaLogo() {
  return (
    <svg viewBox="0 0 48 16" className="h-5 w-auto" aria-label="Visa">
      <text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#1A1F71">VISA</text>
    </svg>
  );
}
function MastercardLogo() {
  return (
    <svg viewBox="0 0 38 24" className="h-6 w-auto" aria-label="Mastercard">
      <circle cx="13" cy="12" r="10" fill="#EB001B" />
      <circle cx="25" cy="12" r="10" fill="#F79E1B" />
      <path d="M19 5.5a10 10 0 0 1 0 13A10 10 0 0 1 19 5.5z" fill="#FF5F00" />
    </svg>
  );
}
function ApplePayLogo() {
  return (
    <svg viewBox="0 0 60 24" className="h-6 w-auto" aria-label="Apple Pay">
      <text x="0" y="17" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontWeight="600" fontSize="14" fill="currentColor"> Pay</text>
    </svg>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [selectedBranch, setSelectedBranch] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [paymentType, setPaymentType] = useState<PaymentType>('visa');
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [newAddress, setNewAddress] = useState(false);

  const subtotal = orderItems.reduce((s, i) => s + i.price, 0);
  const discount = couponApplied ? subtotal * 0.15 : 0;
  const delivery = deliveryMethod === 'delivery' ? 2.50 : 0;
  const total = subtotal - discount + delivery;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'BUBBLE15') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid code. Try BUBBLE15');
      setCouponApplied(false);
    }
  };

  const paymentOptions: { id: PaymentType; label: string; desc: string; logo: React.ReactNode }[] = [
    {
      id: 'cod',
      label: 'Cash on Delivery',
      desc: 'Pay when your order arrives',
      logo: <span className="text-2xl">💵</span>,
    },
    {
      id: 'visa',
      label: 'Visa Card',
      desc: '•••• •••• •••• 4242',
      logo: <VisaLogo />,
    },
    {
      id: 'mastercard',
      label: 'Mastercard',
      desc: '•••• •••• •••• 8888',
      logo: <MastercardLogo />,
    },
    {
      id: 'applepay',
      label: 'Apple Pay',
      desc: 'Touch ID or Face ID',
      logo: <ApplePayLogo />,
    },
    {
      id: 'new',
      label: 'Add New Card',
      desc: 'Visa, Mastercard, Amex',
      logo: <Icon name="PlusIcon" size={20} className="text-muted-foreground" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={4} />

      <main className="pt-24 pb-32 md:pb-16 px-4 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">Checkout 💳</h1>
          <p className="text-muted-foreground mt-1">Complete your order in 3 easy steps</p>
        </div>

        {/* Step Progress */}
        <div className="glass-card rounded-3xl p-5 mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-5 h-0.5 bg-border mx-10" />
            <div
              className="absolute left-0 top-5 h-0.5 bg-primary transition-all duration-500 mx-10"
              style={{ width: `${(currentStep / (steps.length - 1)) * 80}%` }}
            />
            {steps.map((step, idx) => (
              <div key={step} className="flex flex-col items-center gap-2 relative z-10">
                <div
                  className={`size-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    idx < currentStep
                      ? 'bg-primary text-white shadow-aqua'
                      : idx === currentStep
                      ? 'bg-cta text-white shadow-cta scale-110'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {idx < currentStep ? <Icon name="CheckIcon" size={16} /> : idx + 1}
                </div>
                <span className={`text-xs font-semibold ${idx === currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Delivery */}
        {currentStep === 0 && (
          <div className="flex flex-col gap-5">
            <div className="glass-card rounded-3xl p-6">
              <h2 className="text-xl font-extrabold text-foreground mb-4">Delivery Method</h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {(['delivery', 'pickup'] as DeliveryMethod[]).map((method) => (
                  <button
                    key={method}
                    onClick={() => setDeliveryMethod(method)}
                    className={`rounded-2xl p-4 border-2 transition-all duration-200 text-left ${
                      deliveryMethod === method ? 'border-primary bg-primary/10' : 'border-border bg-white/40 hover:border-primary/40'
                    }`}
                  >
                    <div className="text-2xl mb-1">{method === 'delivery' ? '🚚' : '🏪'}</div>
                    <div className="font-bold text-foreground capitalize">{method}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {method === 'delivery' ? 'To your door' : 'Pick up in store'}
                    </div>
                  </button>
                ))}
              </div>

              {deliveryMethod === 'delivery' ? (
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Saved Addresses</label>
                  <div className="flex flex-col gap-2 mb-4">
                    {savedAddresses.map((addr) => (
                      <button
                        key={addr.id}
                        onClick={() => setSelectedAddress(addr.id)}
                        className={`rounded-2xl p-4 border-2 transition-all text-left flex items-start gap-3 ${
                          selectedAddress === addr.id ? 'border-primary bg-primary/10' : 'border-border bg-white/40 hover:border-primary/40'
                        }`}
                      >
                        <span className="text-lg mt-0.5">📍</span>
                        <div className="flex-1">
                          <p className="font-bold text-foreground text-sm">{addr.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{addr.address}</p>
                        </div>
                        {selectedAddress === addr.id && <Icon name="CheckCircleIcon" size={18} className="text-primary flex-shrink-0 mt-0.5" />}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setNewAddress(!newAddress)}
                    className="w-full rounded-2xl p-3.5 border-2 border-dashed border-border hover:border-primary/50 flex items-center gap-3 transition-all text-sm font-semibold text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="PlusIcon" size={18} />
                    Add New Address
                  </button>
                  {newAddress && (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {['Full Name', 'Phone', 'City', 'Street', 'Building', 'Floor (optional)'].map((field) => (
                        <input
                          key={field}
                          placeholder={field}
                          className={`bg-input/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                            field === 'Street' || field === 'Full Name' ? 'col-span-2' : ''
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-3">⏱ Estimated delivery: 20–35 min</p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Select Branch</label>
                  <div className="flex flex-col gap-3">
                    {branches.map((branch) => (
                      <button
                        key={branch.id}
                        onClick={() => setSelectedBranch(branch.id)}
                        className={`rounded-2xl p-4 border-2 transition-all text-left flex items-center justify-between ${
                          selectedBranch === branch.id ? 'border-primary bg-primary/10' : 'border-border bg-white/40 hover:border-primary/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{branch.emoji}</span>
                          <div>
                            <p className="font-bold text-foreground">{branch.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{branch.address}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs font-semibold text-primary">{branch.time}</p>
                          {selectedBranch === branch.id && <Icon name="CheckCircleIcon" size={18} className="text-primary mt-1 ml-auto" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => setCurrentStep(1)} className="btn-cta w-full">
              Continue to Payment →
            </button>
          </div>
        )}

        {/* Step 2: Payment */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-5">
            <div className="glass-card rounded-3xl p-6">
              <h2 className="text-xl font-extrabold text-foreground mb-4">Payment Method</h2>
              <div className="flex flex-col gap-3">
                {paymentOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setPaymentType(option.id)}
                    className={`rounded-2xl p-4 border-2 transition-all duration-200 flex items-center gap-4 ${
                      paymentType === option.id ? 'border-primary bg-primary/10' : 'border-border bg-white/40 hover:border-primary/40'
                    }`}
                  >
                    <div className="size-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-warm-sm">
                      {option.logo}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-foreground text-sm">{option.label}</p>
                      <p className="text-xs text-muted-foreground">{option.desc}</p>
                    </div>
                    {paymentType === option.id && <Icon name="CheckCircleIcon" size={20} className="text-primary flex-shrink-0" />}
                  </button>
                ))}
              </div>

              {paymentType === 'new' && (
                <div className="mt-4 flex flex-col gap-3 p-4 bg-muted/30 rounded-2xl">
                  <input placeholder="Card Number" className="bg-input/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM / YY" className="bg-input/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    <input placeholder="CVV" className="bg-input/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <input placeholder="Cardholder Name" className="bg-input/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              )}
            </div>

            {/* Coupon */}
            <div className="glass-card rounded-3xl p-5">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <span>💰</span> Coupon Code
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => { setCoupon(e.target.value); setCouponError(''); }}
                  placeholder="Enter coupon (BUBBLE15)"
                  className="flex-1 bg-input/60 border border-border rounded-2xl px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button onClick={applyCoupon} className="btn-primary px-5 py-3 text-sm">Apply</button>
              </div>
              {couponApplied && <p className="text-sm text-green-600 font-semibold mt-2">✅ 15% discount applied!</p>}
              {couponError && <p className="text-sm text-cta font-semibold mt-2">❌ {couponError}</p>}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setCurrentStep(0)} className="btn-primary flex-1 py-4">← Back</button>
              <button onClick={() => setCurrentStep(2)} className="btn-cta flex-1 py-4">Review Order →</button>
            </div>
          </div>
        )}

        {/* Step 3: Summary */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-5">
            <div className="glass-card rounded-3xl p-6">
              <h2 className="text-xl font-extrabold text-foreground mb-4">Order Summary</h2>

              {/* Items */}
              <div className="flex flex-col gap-2 mb-5">
                {orderItems.map((item) => (
                  <div key={item.name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🧋</span>
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                    </div>
                    <span className="font-bold text-foreground text-sm">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Delivery info */}
              <div className="bg-muted/30 rounded-2xl p-4 mb-5 flex items-center gap-3">
                <span className="text-xl">{deliveryMethod === 'delivery' ? '🚚' : '🏪'}</span>
                <div>
                  <p className="font-bold text-foreground text-sm capitalize">{deliveryMethod}</p>
                  <p className="text-xs text-muted-foreground">
                    {deliveryMethod === 'delivery'
                      ? savedAddresses.find((a) => a.id === selectedAddress)?.address
                      : branches.find((b) => b.id === selectedBranch)?.name}
                  </p>
                </div>
              </div>

              {/* Payment info */}
              <div className="bg-muted/30 rounded-2xl p-4 mb-5 flex items-center gap-3">
                <span className="text-xl">💳</span>
                <div>
                  <p className="font-bold text-foreground text-sm">
                    {paymentOptions.find((p) => p.id === paymentType)?.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {paymentOptions.find((p) => p.id === paymentType)?.desc}
                  </p>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="flex flex-col gap-2.5 text-sm border-t border-border pt-4">
                <div className="flex justify-between text-foreground/80">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Discount (BUBBLE15)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-foreground/80">
                  <span>Delivery</span>
                  <span className="font-semibold">{delivery === 0 ? 'Free' : `$${delivery.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-foreground font-extrabold text-lg border-t border-border pt-2.5 mt-1">
                  <span>Total</span>
                  <span className="text-cta">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-primary/10 rounded-2xl flex items-center gap-2">
                <span>🎁</span>
                <p className="text-xs text-primary font-semibold">
                  You&apos;ll earn <strong>{Math.floor(total * 10)} points</strong> on this order!
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setCurrentStep(1)} className="btn-primary flex-1 py-4">← Back</button>
              <button
                onClick={() => router.push('/order-success')}
                className="btn-cta flex-1 py-4"
              >
                Place Order 🎉
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />
      <FloatingChat />
    </div>
  );
}
