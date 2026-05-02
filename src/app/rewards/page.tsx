'use client';
import React, { useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import FloatingChat from '@/components/FloatingChat';


const levels = [
  { name: 'Bronze', emoji: '🥉', color: 'from-amber-700 to-amber-500', min: 0, max: 500, multiplier: '1×', perks: ['10 pts per $1', 'Birthday bonus', 'Early flavor access'] },
  { name: 'Silver', emoji: '🥈', color: 'from-gray-400 to-gray-300', min: 500, max: 1500, multiplier: '1.25×', perks: ['12.5 pts per $1', 'Weekend 2× bonus', 'Free delivery on orders $20+'] },
  { name: 'Gold', emoji: '🏆', color: 'from-yellow-400 to-amber-500', min: 1500, max: 3500, multiplier: '1.5×', perks: ['15 pts per $1', 'Monthly free drink', 'Priority support'] },
  { name: 'VIP', emoji: '💎', color: 'from-purple-500 to-indigo-500', min: 3500, max: 5000, multiplier: '2×', perks: ['20 pts per $1', 'Exclusive flavors', 'Dedicated VIP line', 'Free delivery always'] },
];

const redeemOptions = [
  { name: 'Free Taro Milk Tea', points: 500, emoji: '🧋', value: '$7.50', category: 'Free Drinks' },
  { name: '20% Off Next Order', points: 300, emoji: '💰', value: '20% OFF', category: 'Discounts' },
  { name: 'Free Smoothie Bundle', points: 800, emoji: '🥤', value: '$9.00', category: 'Bundles' },
  { name: '$5 Store Credit', points: 250, emoji: '💵', value: '$5.00', category: 'Discounts' },
  { name: 'Free Boba Upgrade', points: 150, emoji: '🫧', value: 'Free Add-on', category: 'Free Drinks' },
  { name: 'VIP Early Access', points: 1000, emoji: '⭐', value: 'Exclusive', category: 'Bundles' },
  { name: 'Free Matcha Latte', points: 450, emoji: '🍵', value: '$6.80', category: 'Free Drinks' },
  { name: 'Party Pack Discount', points: 600, emoji: '🎉', value: '30% OFF', category: 'Bundles' },
];

const earnWays = [
  { action: 'Every purchase', points: '10 pts per $1', emoji: '🛍️' },
  { action: 'Account creation', points: '+200 pts (once)', emoji: '👤' },
  { action: 'Verified social share', points: '+100 pts', emoji: '📱' },
  { action: 'Leave a review', points: '+50 pts', emoji: '⭐' },
  { action: 'Birthday bonus', points: '+500 pts', emoji: '🎂' },
  { action: 'Refer a friend', points: '+150 pts', emoji: '👥' },
];

const redeemCategories = ['All', 'Free Drinks', 'Discounts', 'Bundles'];

export default function RewardsPage() {
  const userPoints = 2840;
  const currentLevel = levels?.[2]; // Gold
  const nextLevel = levels?.[3]; // VIP
  const progressToNext = ((userPoints - currentLevel?.min) / (nextLevel?.min - currentLevel?.min)) * 100;
  const drinksLeft = Math.ceil((nextLevel?.min - userPoints) / 75);
  const [redeemed, setRedeemed] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredOptions = activeCategory === 'All' ? redeemOptions : redeemOptions?.filter((o) => o?.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} />
      <main className="pt-24 pb-32 md:pb-16 px-4 max-w-5xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary font-bold text-sm px-4 py-2 rounded-full mb-4">
            <span>🎁</span> Loyalty & Rewards
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2">
            Your Rewards 🎁
          </h1>
          <p className="text-muted-foreground text-lg">Sip more, earn more, unlock exclusive perks</p>
        </div>

        {/* Points & Level Card */}
        <div className="glass-card rounded-[32px] p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            {/* Level Badge */}
            <div className="flex flex-col items-center">
              <div className={`size-24 rounded-3xl bg-gradient-to-br ${currentLevel?.color} flex items-center justify-center text-5xl shadow-lg animate-float`}>
                {currentLevel?.emoji}
              </div>
              <span className="mt-2 font-extrabold text-foreground text-lg">{currentLevel?.name}</span>
              <span className="text-xs text-muted-foreground">{currentLevel?.multiplier} points rate</span>
            </div>

            {/* Points & Progress */}
            <div className="flex-1 w-full">
              <div className="text-center md:text-left mb-4">
                <div className="text-5xl md:text-6xl font-extrabold text-gradient-warm">{userPoints?.toLocaleString()}</div>
                <p className="text-muted-foreground font-semibold mt-1">Points Balance · ≈ ${(userPoints / 100)?.toFixed(2)} value</p>
              </div>

              <div className="mb-2 flex justify-between text-sm font-semibold">
                <span className="text-foreground">{currentLevel?.name}</span>
                <span className="text-primary">{nextLevel?.name} ({nextLevel?.min?.toLocaleString()} pts)</span>
              </div>
              <div className="w-full h-5 bg-muted rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all duration-1000 relative"
                  style={{ width: `${Math.min(progressToNext, 100)}%`, background: 'linear-gradient(90deg, #F2A35E, #F25A38)' }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 rounded-full" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                🧋 <strong className="text-foreground">{drinksLeft} more drinks</strong> to reach <strong className="text-cta">{nextLevel?.name}</strong> and unlock {nextLevel?.multiplier} points!
              </p>
            </div>
          </div>
        </div>

        {/* Level Progression */}
        <div className="glass-card rounded-3xl p-6 mb-8">
          <h2 className="text-xl font-extrabold text-foreground mb-5">Level Progression & Multipliers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {levels?.map((level, idx) => {
              const isActive = level?.name === currentLevel?.name;
              const isPast = idx < levels?.indexOf(currentLevel);
              return (
                <div
                  key={level?.name}
                  className={`rounded-3xl p-4 text-center transition-all duration-300 ${
                    isActive ? 'ring-2 ring-primary shadow-aqua bg-primary/5' : 'bg-muted/30'
                  }`}
                >
                  <div className={`size-14 rounded-2xl bg-gradient-to-br ${level?.color} flex items-center justify-center text-3xl mx-auto mb-2 shadow-warm-sm ${isActive ? 'scale-110' : ''}`}>
                    {level?.emoji}
                  </div>
                  <p className="font-extrabold text-foreground">{level?.name}</p>
                  <p className="text-sm font-extrabold text-cta mt-0.5">{level?.multiplier}</p>
                  <p className="text-xs text-muted-foreground">{level?.min?.toLocaleString()}+ pts</p>
                  <div className="mt-2 space-y-1">
                    {level?.perks?.slice(0, 2)?.map((perk) => (
                      <p key={perk} className="text-[10px] text-muted-foreground leading-tight">• {perk}</p>
                    ))}
                  </div>
                  {isActive && <span className="text-xs bg-primary/20 text-primary font-bold px-2 py-0.5 rounded-full mt-2 inline-block">Current</span>}
                  {isPast && <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full mt-2 inline-block">✓ Unlocked</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Redeem Options */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-extrabold text-foreground">Redeem Your Points 🎁</h2>
            <div className="flex gap-2">
              {redeemCategories?.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeCategory === cat ? 'bg-primary text-white' : 'bg-muted/50 text-muted-foreground hover:bg-primary/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOptions?.map((option, idx) => {
              const canRedeem = userPoints >= option?.points;
              return (
                <div
                  key={option?.name}
                  className={`glass-card rounded-3xl p-5 flex flex-col gap-3 transition-all duration-300 ${canRedeem ? 'hover:shadow-warm-lg hover:-translate-y-1' : 'opacity-70'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-2xl bg-gradient-to-br from-accent to-cta flex items-center justify-center text-2xl shadow-cta">
                      {option?.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground text-sm">{option?.name}</p>
                      <p className="text-xs text-primary font-semibold">{option?.value}</p>
                      <span className="text-[10px] bg-muted/50 text-muted-foreground px-2 py-0.5 rounded-full">{option?.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-foreground">{option?.points?.toLocaleString()} pts</span>
                    <button
                      onClick={() => canRedeem && setRedeemed(idx)}
                      className={`text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 ${
                        redeemed === idx
                          ? 'bg-green-500 text-white'
                          : canRedeem
                          ? 'bg-cta text-white hover:bg-cta/80 shadow-cta'
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                      disabled={!canRedeem}
                    >
                      {redeemed === idx ? '✅ Redeemed!' : canRedeem ? 'Redeem' : 'Not enough pts'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How to Earn */}
        <div className="glass-card rounded-3xl p-6">
          <h2 className="text-xl font-extrabold text-foreground mb-5">How to Earn Points 💡</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {earnWays?.map((way) => (
              <div key={way?.action} className="flex items-center gap-3 bg-muted/30 rounded-2xl p-4">
                <span className="text-2xl">{way?.emoji}</span>
                <div>
                  <p className="font-semibold text-foreground text-sm">{way?.action}</p>
                  <p className="text-xs text-primary font-bold">{way?.points}</p>
                </div>
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
