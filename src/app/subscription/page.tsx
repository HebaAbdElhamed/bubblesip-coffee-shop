'use client';
import React, { useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import FloatingChat from '@/components/FloatingChat';
import Icon from '@/components/ui/AppIcon';

interface Plan {
  id: string;
  name: string;
  emoji: string;
  price: number;
  drinks: number;
  discount: string;
  multiplier: string;
  color: string;
  recommended: boolean;
  benefits: string[];
  vipPerks?: string[];
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    emoji: '🌱',
    price: 12,
    drinks: 4,
    discount: '10% off',
    multiplier: '1.25×',
    color: 'from-secondary to-primary',
    recommended: false,
    benefits: [
      '4 drinks per month',
      '10% discount on all orders',
      '1.25× points multiplier',
      'Early access to new flavors',
      'Free delivery on subscription orders',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    emoji: '⭐',
    price: 24,
    drinks: 8,
    discount: '15% off',
    multiplier: '1.5×',
    color: 'from-primary to-accent',
    recommended: true,
    benefits: [
      '8 drinks per month',
      '15% discount on all orders',
      '1.5× points multiplier',
      'Priority order processing',
      'Free delivery on all orders',
      'Monthly surprise drink',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    emoji: '💎',
    price: 45,
    drinks: 16,
    discount: '25% off',
    multiplier: '2×',
    color: 'from-purple-500 to-cta',
    recommended: false,
    benefits: [
      '16 drinks per month',
      '25% discount on all orders',
      '2× points multiplier (VIP rate)',
      'Instant VIP loyalty status',
      'Free delivery + priority',
      'Monthly surprise bundle',
      'Exclusive member-only flavors',
      'Dedicated support line',
    ],
    vipPerks: ['VIP Badge', 'Exclusive Drops', 'Priority Queue', 'Dedicated Line'],
  },
];

export default function SubscriptionPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [selected, setSelected] = useState<string | null>('standard');

  const getPrice = (price: number) => billing === 'annual' ? Math.round(price * 0.8) : price;

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} />

      <main className="pt-24 pb-32 md:pb-16 px-4 max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary font-bold text-sm px-4 py-2 rounded-full mb-4">
            <span>💳</span> Subscription Plans
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3">
            Sip Smarter, <span className="text-gradient-warm">Save More</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Subscribe and unlock exclusive discounts, bonus points, and monthly drink credits.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-1 bg-muted/50 rounded-full p-1 mt-6">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${billing === 'monthly' ? 'bg-white shadow-warm-sm text-foreground' : 'text-muted-foreground'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${billing === 'annual' ? 'bg-white shadow-warm-sm text-foreground' : 'text-muted-foreground'}`}
            >
              Annual
              <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">-20%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-[32px] p-6 md:p-7 flex flex-col transition-all duration-300 cursor-pointer ${
                plan.recommended
                  ? 'ring-2 ring-primary shadow-aqua scale-105 bg-gradient-to-b from-white/90 to-primary/5'
                  : 'glass-card hover:shadow-warm-lg hover:-translate-y-1'
              } ${selected === plan.id ? 'ring-2 ring-cta' : ''}`}
              onClick={() => setSelected(plan.id)}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white text-xs font-extrabold px-4 py-1.5 rounded-full shadow-aqua whitespace-nowrap">
                  ⭐ Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`size-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-3xl shadow-warm-md`}>
                  {plan.emoji}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-foreground">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground">{plan.drinks} drinks/month</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-5">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-foreground">${getPrice(plan.price)}</span>
                  <span className="text-muted-foreground text-sm mb-1">/mo</span>
                </div>
                {billing === 'annual' && (
                  <p className="text-xs text-green-600 font-semibold mt-1">
                    Save ${(plan.price - getPrice(plan.price)) * 12}/year
                  </p>
                )}
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                <div className="bg-muted/40 rounded-2xl p-3 text-center">
                  <p className="text-xs text-muted-foreground">Discount</p>
                  <p className="font-extrabold text-cta text-sm">{plan.discount}</p>
                </div>
                <div className="bg-muted/40 rounded-2xl p-3 text-center">
                  <p className="text-xs text-muted-foreground">Points</p>
                  <p className="font-extrabold text-primary text-sm">{plan.multiplier}</p>
                </div>
              </div>

              {/* VIP Perks for Premium */}
              {plan.vipPerks && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {plan.vipPerks.map((perk) => (
                    <span key={perk} className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      💎 {perk}
                    </span>
                  ))}
                </div>
              )}

              {/* Benefits */}
              <ul className="flex flex-col gap-2 mb-6 flex-1">
                {plan.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Icon name="CheckCircleIcon" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-4 rounded-2xl font-extrabold text-sm transition-all duration-200 ${
                  plan.recommended
                    ? 'btn-cta'
                    : selected === plan.id
                    ? 'bg-cta text-white shadow-cta'
                    : 'btn-primary'
                }`}
              >
                {selected === plan.id ? '✅ Selected' : `Subscribe to ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        {/* Subscription Teaser Banner */}
        <div
          className="rounded-[32px] p-8 md:p-10 mb-10 relative overflow-hidden text-center"
          style={{ background: 'linear-gradient(135deg, #1A1008 0%, #2D1F0E 50%, #0D3B39 100%)' }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 animate-blob" style={{ background: 'radial-gradient(circle, #4CDBD5, transparent)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 animate-blob-2" style={{ background: 'radial-gradient(circle, #F2A35E, transparent)', filter: 'blur(60px)' }} />
          <div className="relative z-10">
            <div className="text-4xl mb-3">🎁</div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Start your subscription today</h2>
            <p className="text-white/60 mb-6 max-w-md mx-auto">Get your first month at 50% off. Cancel anytime, no commitment required.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => selected && undefined}
                className="btn-cta text-sm px-8 py-4"
              >
                Subscribe Now — {selected ? `${plans.find((p) => p.id === selected)?.name} Plan` : 'Choose a Plan'}
              </button>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <span className="size-1.5 rounded-full bg-green-400" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="glass-card rounded-3xl p-6 mb-8">
          <h2 className="text-xl font-extrabold text-foreground mb-5 text-center">What&apos;s Included</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-muted-foreground font-semibold">Feature</th>
                  {plans.map((p) => (
                    <th key={p.id} className="text-center py-3 font-extrabold text-foreground">{p.emoji} {p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Monthly Drinks', values: ['4', '8', '16'] },
                  { feature: 'Discount', values: ['10%', '15%', '25%'] },
                  { feature: 'Points Multiplier', values: ['1.25×', '1.5×', '2×'] },
                  { feature: 'Free Delivery', values: ['Subscription orders', 'All orders', 'All orders'] },
                  { feature: 'Priority Processing', values: ['—', '✅', '✅'] },
                  { feature: 'Surprise Bundle', values: ['—', 'Monthly drink', 'Monthly bundle'] },
                  { feature: 'VIP Status', values: ['—', '—', '✅ Instant'] },
                  { feature: 'Exclusive Flavors', values: ['—', '—', '✅'] },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-border/50">
                    <td className="py-3 text-muted-foreground font-medium">{row.feature}</td>
                    {row.values.map((val, i) => (
                      <td key={i} className="py-3 text-center font-semibold text-foreground">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="glass-card rounded-3xl p-6">
          <h2 className="text-xl font-extrabold text-foreground mb-5">Common Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes, cancel anytime with no fees. Your benefits continue until end of billing period.' },
              { q: 'Do unused drinks roll over?', a: 'Unused drinks expire at end of month, but you can gift them to friends!' },
              { q: 'Can I upgrade my plan?', a: "Absolutely! Upgrade anytime and we'll prorate the difference." },
              { q: 'How are points multiplied?', a: 'Your multiplier applies to all purchases, not just subscription orders.' },
            ].map((faq) => (
              <div key={faq.q} className="bg-muted/30 rounded-2xl p-4">
                <p className="font-bold text-foreground text-sm mb-1">{faq.q}</p>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
      <FloatingChat />
    </div>
  );
}
