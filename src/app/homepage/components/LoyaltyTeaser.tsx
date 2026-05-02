import React from 'react';
import Link from 'next/link';

const levels = [
  { name: 'Bronze', emoji: '🥉', color: '#CD7F32', min: 0, max: 500 },
  { name: 'Silver', emoji: '🥈', color: '#C0C0C0', min: 500, max: 1500 },
  { name: 'Gold', emoji: '🥇', color: '#FFD700', min: 1500, max: 3000 },
  { name: 'VIP', emoji: '💎', color: '#4CDBD5', min: 3000, max: null },
];

const perks = [
  { icon: '☕', label: 'Free drink on birthday' },
  { icon: '🎯', label: '2x points on weekends' },
  { icon: '🚀', label: 'Early access to new drinks' },
  { icon: '💝', label: 'Exclusive member discounts' },
];

export default function LoyaltyTeaser() {
  const currentPoints = 780;
  const nextLevelPoints = 1500;
  const progress = (currentPoints / nextLevelPoints) * 100;

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6" id="loyalty">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[32px] overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #1A1008 0%, #2D1F0E 50%, #0D3B39 100%)' }}>
          {/* Background blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 animate-blob"
            style={{ background: 'radial-gradient(circle, #4CDBD5, transparent)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 animate-blob-2"
            style={{ background: 'radial-gradient(circle, #F2A35E, transparent)', filter: 'blur(60px)' }} />

          <div className="relative z-10 p-8 md:p-14 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 border border-white/20">
                <span>🏆</span>
                <span className="text-xs font-bold text-white/80 uppercase tracking-widest">BubbleSip Rewards</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Every sip earns<br />
                <span style={{ color: '#4CDBD5' }}>your next reward</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed font-medium">
                Join 48,000+ members earning points with every order. Unlock free drinks, exclusive discounts, and VIP perks as you level up.
              </p>

              {/* Perks */}
              <div className="grid grid-cols-2 gap-3">
                {perks?.map((perk) => (
                  <div key={perk?.label} className="flex items-center gap-3 bg-white/8 rounded-2xl px-4 py-3 border border-white/10">
                    <span className="text-lg">{perk?.icon}</span>
                    <span className="text-xs font-semibold text-white/80">{perk?.label}</span>
                  </div>
                ))}
              </div>

              <Link href="/homepage" className="btn-cta inline-flex text-sm">
                Join Rewards — Free 🎁
              </Link>
            </div>

            {/* Right: Points card */}
            <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)' }}>
              {/* Current level */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Current Level</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🥈</span>
                    <span className="text-2xl font-extrabold text-white">Silver</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Your Points</p>
                  <p className="text-3xl font-extrabold" style={{ color: '#4CDBD5' }}>{currentPoints?.toLocaleString()}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-white/60">Silver — 780 pts</span>
                  <span style={{ color: '#FFD700' }}>Gold — 1,500 pts</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #4CDBD5, #FFD700)',
                    }}
                  />
                </div>
                <p className="text-xs text-white/50 mt-2 font-medium">Only 720 points to reach 🥇 Gold</p>
              </div>

              {/* Level ladder */}
              <div className="flex items-center gap-2">
                {levels?.map((level, i) => (
                  <React.Fragment key={level?.name}>
                    <div className={`flex flex-col items-center gap-1 ${level?.name === 'Silver' ? 'opacity-100' : 'opacity-40'}`}>
                      <span className="text-lg">{level?.emoji}</span>
                      <span className="text-[10px] font-bold text-white">{level?.name}</span>
                    </div>
                    {i < levels?.length - 1 && <div className="flex-1 h-px bg-white/20" />}
                  </React.Fragment>
                ))}
              </div>

              {/* Recent activity */}
              <div className="border-t border-white/10 pt-4 space-y-2.5">
                <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Recent Activity</p>
                {[
                  { label: 'Taro Milk Tea order', pts: '+45', time: '2h ago' },
                  { label: 'Weekend bonus 2x', pts: '+90', time: 'Yesterday' },
                  { label: 'Account verified', pts: '+200', time: '3 days ago' },
                ]?.map((activity) => (
                  <div key={activity?.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white/80">{activity?.label}</p>
                      <p className="text-[10px] text-white/40">{activity?.time}</p>
                    </div>
                    <span className="text-xs font-extrabold" style={{ color: '#4CDBD5' }}>{activity?.pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}