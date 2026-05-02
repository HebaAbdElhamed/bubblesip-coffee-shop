import React from 'react';
import Link from 'next/link';

const plans = [
  {
    name: 'Basic',
    price: 19,
    drinks: 4,
    discount: '10%',
    multiplier: '1.5x',
    color: '#8FD9CB',
    popular: false,
  },
  {
    name: 'Standard',
    price: 39,
    drinks: 10,
    discount: '20%',
    multiplier: '2x',
    color: '#4CDBD5',
    popular: true,
  },
  {
    name: 'Premium',
    price: 69,
    drinks: 20,
    discount: '30%',
    multiplier: '3x',
    color: '#F2A35E',
    popular: false,
  },
];

export default function SubscriptionBanner() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6" id="subscription">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 reveal-up-hidden">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Monthly Plans</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Subscribe & <span className="text-gradient-warm">Save More</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto font-medium leading-relaxed">
            Get your favorite drinks delivered monthly. Cancel anytime, no commitment.
          </p>
        </div>

        {/* Plan cards */}
        {/* 
          GRID AUDIT:
          Array: [Basic, Standard, Premium] = 3 cards
          Row 1: [col-1: Basic cs-1] [col-2: Standard cs-1] [col-3: Premium cs-1]
          Placed 3/3 ✓
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 stagger-children">
          {plans?.map((plan) => (
            <div
              key={plan?.name}
              className={`relative rounded-3xl p-6 md:p-8 flex flex-col gap-5 reveal-up-hidden transition-all duration-300 hover:-translate-y-2 ${
                plan?.popular
                  ? 'shadow-aqua'
                  : 'shadow-warm-md'
              }`}
              style={{
                background: plan?.popular
                  ? 'linear-gradient(135deg, #4CDBD5 0%, #2BB8B2 100%)'
                  : 'var(--card)',
                border: plan?.popular ? 'none' : '1px solid var(--border)',
              }}
            >
              {plan?.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cta text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-cta">
                  Most Popular ⭐
                </div>
              )}

              <div>
                <h3 className={`text-xl font-extrabold mb-1 ${plan?.popular ? 'text-white' : 'text-foreground'}`}>
                  {plan?.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold ${plan?.popular ? 'text-white' : 'text-foreground'}`}>
                    ${plan?.price}
                  </span>
                  <span className={`text-sm font-medium ${plan?.popular ? 'text-white/70' : 'text-muted-foreground'}`}>/mo</span>
                </div>
              </div>

              <ul className="space-y-3 flex-1">
                {[
                  `${plan?.drinks} drinks/month`,
                  `${plan?.discount} off all orders`,
                  `${plan?.multiplier} points multiplier`,
                  'Free delivery',
                  plan?.popular ? 'Priority queue ⚡' : 'Standard queue',
                ]?.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm font-semibold">
                    <span className={`size-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      plan?.popular ? 'bg-white/20 text-white' : 'bg-primary/15 text-primary'
                    }`}>✓</span>
                    <span className={plan?.popular ? 'text-white/90' : 'text-foreground/80'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/homepage"
                className={`w-full text-center py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${
                  plan?.popular
                    ? 'bg-white text-primary shadow-warm-md'
                    : 'bg-cta text-white shadow-cta'
                }`}
              >
                Get {plan?.name} Plan
              </Link>
            </div>
          ))}
        </div>

        {/* Reassurance */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 reveal-up-hidden">
          {['Cancel anytime', 'No hidden fees', 'Pause any month', 'Free delivery included']?.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
              <span className="size-1.5 rounded-full bg-primary" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}