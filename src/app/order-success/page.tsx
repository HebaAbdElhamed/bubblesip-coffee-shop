'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import FloatingChat from '@/components/FloatingChat';

export default function OrderSuccessPage() {
  const [visible, setVisible] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);
  const orderId = 'BS-20260427-8842';
  const eta = '25–35 min';
  const pointsEarned = 297;

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setConfettiVisible(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2D7B6] via-[#d4f0ee] to-[#b8ede9] relative overflow-hidden">
      <Header cartCount={0} />
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/20 blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/20 blur-3xl animate-blob-2 pointer-events-none" />
      <main className="pt-24 pb-32 md:pb-16 px-4 flex items-center justify-center min-h-screen">
        <div className={`max-w-lg w-full transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Success Card */}
          <div className="glass-card rounded-[32px] p-8 md:p-10 text-center">
            {/* Bubble Tea Illustration */}
            <div className="relative inline-block mb-6">
              <div className="text-8xl animate-float">🧋</div>
              <div className="absolute -top-2 -right-2 text-3xl animate-float-2">🎉</div>
              <div className="absolute -bottom-1 -left-3 text-2xl animate-float-3">✨</div>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
              Your order has been placed 🎉
            </h1>
            <p className="text-muted-foreground text-base mb-6">
              Sit back and relax — your drinks are being prepared with love!
            </p>

            {/* Order Details */}
            <div className="bg-muted/40 rounded-2xl p-5 mb-6 text-left flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">Order ID</span>
                <span className="font-bold text-foreground text-sm font-mono">{orderId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">Estimated Delivery</span>
                <span className="font-bold text-primary text-sm">⏱ {eta}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">Points Earned</span>
                <span className="font-bold text-accent text-sm">🎁 +{pointsEarned} points</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">Payment</span>
                <span className="font-bold text-foreground text-sm">💳 Visa •••• 4242</span>
              </div>
            </div>

            {/* Points earned animation */}
            {confettiVisible && (
              <div className="mb-5 p-4 rounded-2xl" style={{ background: 'linear-gradient(135deg, #4CDBD5, #8FD9CB)' }}>
                <p className="text-white font-extrabold text-sm">🏆 +{pointsEarned} points added to your account!</p>
                <p className="text-white/80 text-xs mt-0.5">You&apos;re now {660 - pointsEarned} points away from Gold level</p>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <Link href="/order-tracking" className="btn-cta w-full text-center">
                Track Your Order 🚚
              </Link>
              <Link href="/account" className="btn-primary w-full text-center">
                View Account Dashboard 🎁
              </Link>
              <Link href="/register" className="w-full text-center py-3.5 rounded-2xl border-2 border-border bg-white/40 text-foreground font-bold text-sm hover:border-primary/50 transition-all">
                Create Account & Earn Rewards 🎁
              </Link>
              <Link href="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors font-semibold py-2">
                Continue Shopping →
              </Link>
            </div>
          </div>

          {/* Floating confetti dots */}
          <div className="flex justify-center gap-3 mt-6">
            {['bg-cta', 'bg-primary', 'bg-accent', 'bg-secondary', 'bg-cta']?.map((c, i) => (
              <div
                key={i}
                className={`size-3 rounded-full ${c} opacity-70`}
                style={{ animation: `floatY ${2 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
              />
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
