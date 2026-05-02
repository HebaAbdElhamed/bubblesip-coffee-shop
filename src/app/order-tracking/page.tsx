'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import FloatingChat from '@/components/FloatingChat';

const trackingSteps = [
  {
    id: 0,
    label: 'Order Placed',
    emoji: '✅',
    description: 'We received your order',
    time: '2:04 PM',
    detail: 'Payment confirmed · Order BS-20260427-8842',
  },
  {
    id: 1,
    label: 'Preparing',
    emoji: '🍹',
    description: 'Our team is crafting your drinks',
    time: '2:08 PM',
    detail: 'Taro Milk Tea × 2, Brown Sugar Boba × 1, Matcha Latte × 1',
  },
  {
    id: 2,
    label: 'On the Way',
    emoji: '🚚',
    description: 'Your order is out for delivery',
    time: '2:22 PM',
    detail: 'Driver: Alex K. · 1.2 km away',
  },
  {
    id: 3,
    label: 'Delivered',
    emoji: '🎉',
    description: 'Enjoy your BubbleSip!',
    time: 'Est. 2:35 PM',
    detail: 'Leave a review and earn +50 pts',
  },
];

export default function OrderTrackingPage() {
  const [activeStep, setActiveStep] = useState(2);
  const [pulse, setPulse] = useState(true);
  const [etaSeconds, setEtaSeconds] = useState(13 * 60);

  useEffect(() => {
    const interval = setInterval(() => setPulse((p) => !p), 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setEtaSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const etaMin = Math.floor(etaSeconds / 60);
  const etaSec = etaSeconds % 60;
  const progressPercent = (activeStep / (trackingSteps?.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} />
      <main className="pt-24 pb-32 md:pb-16 px-4 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">Order Tracking 🚚</h1>
          <p className="text-muted-foreground mt-1">
            Order <span className="font-mono font-bold">BS-20260427-8842</span>
          </p>
        </div>

        {/* Live Status Banner */}
        <div className="glass-card rounded-3xl p-5 mb-6 flex items-center gap-4">
          <div className="relative">
            <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl shadow-aqua">
              {trackingSteps?.[activeStep]?.emoji}
            </div>
            <div
              className={`absolute -top-1 -right-1 size-4 rounded-full bg-green-500 border-2 border-white transition-all duration-300 ${pulse ? 'scale-110' : 'scale-90'}`}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-foreground text-lg">{trackingSteps?.[activeStep]?.label}</span>
              <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">LIVE</span>
            </div>
            <p className="text-sm text-muted-foreground">{trackingSteps?.[activeStep]?.description}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-muted-foreground">ETA</p>
            <p className="font-extrabold text-primary text-xl">
              {etaMin}:{etaSec?.toString()?.padStart(2, '0')}
            </p>
            <p className="text-xs text-muted-foreground">min</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="glass-card rounded-3xl p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-foreground">Delivery Progress</span>
            <span className="text-sm font-bold text-primary">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, #4CDBD5, #F2A35E, #F25A38)',
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-muted-foreground">Placed</span>
            <span className="text-xs text-muted-foreground">Delivered</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="glass-card rounded-3xl p-6 mb-6">
          <h2 className="font-extrabold text-foreground text-lg mb-5">Delivery Timeline</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border" />
            <div
              className="absolute left-6 top-6 w-0.5 bg-gradient-to-b from-primary to-accent transition-all duration-1000"
              style={{ height: `${progressPercent}%` }}
            />

            <div className="flex flex-col gap-6">
              {trackingSteps?.map((step, idx) => {
                const isDone = idx <= activeStep;
                const isActive = idx === activeStep;
                return (
                  <div key={step?.id} className="flex items-start gap-4 relative">
                    {/* Circle */}
                    <div
                      className={`relative z-10 size-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-500 ${
                        isDone
                          ? isActive
                            ? 'bg-gradient-to-br from-cta to-accent shadow-cta scale-110'
                            : 'bg-gradient-to-br from-primary to-secondary shadow-aqua' :'bg-muted'
                      }`}
                    >
                      {step?.emoji}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold text-base ${isDone ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step?.label}
                        </span>
                        <span className={`text-xs font-semibold ${isDone ? 'text-primary' : 'text-muted-foreground'}`}>
                          {step?.time}
                        </span>
                      </div>
                      <p className={`text-sm mt-0.5 ${isDone ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
                        {step?.description}
                      </p>
                      {isDone && (
                        <p className="text-xs text-muted-foreground/70 mt-0.5">{step?.detail}</p>
                      )}
                      {isActive && (
                        <div className="mt-2 flex items-center gap-1.5">
                          <div className={`size-2 rounded-full bg-green-500 transition-all duration-300 ${pulse ? 'scale-125' : 'scale-75'}`} />
                          <span className="text-xs text-green-600 font-bold">In progress</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="glass-card rounded-3xl p-5 mb-6">
          <h3 className="font-bold text-foreground mb-3">Your Order</h3>
          <div className="flex flex-col gap-2 text-sm">
            {[
              { item: 'Taro Milk Tea × 2', price: '$15.00' },
              { item: 'Brown Sugar Boba × 1', price: '$7.90' },
              { item: 'Matcha Latte × 1', price: '$6.80' },
            ]?.map((o, i) => (
              <div key={i} className="flex items-center justify-between text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-base">🧋</span>
                  <span>{o?.item}</span>
                </div>
                <span className="font-semibold text-foreground">{o?.price}</span>
              </div>
            ))}
            <div className="border-t border-border pt-2 mt-1 flex justify-between font-extrabold text-foreground">
              <span>Total</span>
              <span className="text-cta">$32.20</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <Link href="/account" className="btn-primary w-full text-center">
            View in Account Dashboard
          </Link>
          <Link href="/product" className="btn-cta w-full text-center">
            ✍️ Leave a Review (+50 pts)
          </Link>
          <Link href="/shop" className="text-center text-sm text-muted-foreground hover:text-primary transition-colors font-semibold py-2">
            Order Again →
          </Link>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
      <FloatingChat />
    </div>
  );
}
