'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import FloatingChat from '@/components/FloatingChat';
import Icon from '@/components/ui/AppIcon';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/account');
    }, 1500);
  };

  const passwordStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthLabels = ['', 'Weak', 'Good', 'Strong'];
  const strengthColors = ['', 'bg-cta', 'bg-accent', 'bg-green-500'];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header cartCount={0} />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/15 blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cta/10 blur-3xl animate-blob-2 pointer-events-none" />

      <main className="pt-24 pb-32 md:pb-16 px-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-3 animate-float inline-block">🎁</div>
            <h1 className="text-3xl font-extrabold text-foreground">Create Account</h1>
            <p className="text-muted-foreground mt-1 font-medium">Join BubbleSip and earn rewards from day one</p>
          </div>

          {/* Signup Bonus Banner */}
          <div className="glass-card rounded-2xl p-4 mb-6 flex items-center gap-3 border border-primary/30">
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl flex-shrink-0">🎁</div>
            <div>
              <p className="font-extrabold text-foreground text-sm">Signup Bonus: +200 Points!</p>
              <p className="text-xs text-muted-foreground">Instantly credited when you create your account</p>
            </div>
            <div className="ml-auto text-2xl font-extrabold text-gradient-aqua">200</div>
          </div>

          <div className="glass-card rounded-[32px] p-7 md:p-8">
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Full Name</label>
                <div className="relative">
                  <Icon name="UserIcon" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    required
                    className="w-full bg-input/60 border border-border rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Email Address</label>
                <div className="relative">
                  <Icon name="EnvelopeIcon" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-input/60 border border-border rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Password</label>
                <div className="relative">
                  <Icon name="LockClosedIcon" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    required
                    className="w-full bg-input/60 border border-border rounded-2xl pl-11 pr-12 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
                  </button>
                </div>
                {/* Password strength */}
                {form.password.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            passwordStrength >= level ? strengthColors[passwordStrength] : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">{strengthLabels[passwordStrength]}</span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Confirm Password</label>
                <div className="relative">
                  <Icon name="LockClosedIcon" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    name="confirm"
                    type="password"
                    value={form.confirm}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    required
                    className={`w-full bg-input/60 border rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      form.confirm && form.password !== form.confirm ? 'border-cta' : 'border-border'
                    }`}
                  />
                  {form.confirm && form.password === form.confirm && (
                    <Icon name="CheckCircleIcon" size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                  )}
                </div>
                {form.confirm && form.password !== form.confirm && (
                  <p className="text-xs text-cta font-semibold mt-1">Passwords don&apos;t match</p>
                )}
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  onClick={() => setAgreed(!agreed)}
                  className={`size-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    agreed ? 'bg-primary border-primary' : 'border-border bg-white/40'
                  }`}
                >
                  {agreed && <Icon name="CheckIcon" size={12} className="text-white" />}
                </div>
                <span className="text-xs text-muted-foreground font-medium leading-relaxed">
                  I agree to the{' '}
                  <Link href="#" className="text-primary font-bold hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="#" className="text-primary font-bold hover:underline">Privacy Policy</Link>
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !agreed || form.password !== form.confirm}
                className="btn-cta w-full mt-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <div className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account & Get 200 pts 🎁'
                )}
              </button>
            </form>

            {/* Login link */}
            <p className="text-center text-sm text-muted-foreground mt-5 font-medium">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-primary hover:text-cta transition-colors">
                Sign in →
              </Link>
            </p>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { emoji: '🏆', label: 'Earn Points' },
              { emoji: '🎁', label: 'Free Rewards' },
              { emoji: '🚚', label: 'Free Delivery' },
            ].map((perk) => (
              <div key={perk.label} className="glass-card rounded-2xl p-3 text-center">
                <div className="text-2xl mb-1">{perk.emoji}</div>
                <p className="text-xs font-bold text-foreground">{perk.label}</p>
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
