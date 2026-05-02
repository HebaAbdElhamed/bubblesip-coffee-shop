'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import FloatingChat from '@/components/FloatingChat';
import Icon from '@/components/ui/AppIcon';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guestMode, setGuestMode] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header cartCount={0} />
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/15 blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent/15 blur-3xl animate-blob-2 pointer-events-none" />

      <main className="pt-24 pb-32 md:pb-16 px-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          {/* Logo area */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-3 animate-float inline-block">🧋</div>
            <h1 className="text-3xl font-extrabold text-foreground">Welcome back!</h1>
            <p className="text-muted-foreground mt-1 font-medium">Sign in to your BubbleSip account</p>
          </div>

          <div className="glass-card rounded-[32px] p-7 md:p-8">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Email Address</label>
                <div className="relative">
                  <Icon name="EnvelopeIcon" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-input/60 border border-border rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-foreground">Password</label>
                  <Link href="#" className="text-xs font-semibold text-primary hover:text-cta transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Icon name="LockClosedIcon" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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
              </div>

              {/* Login CTA */}
              <button
                type="submit"
                disabled={loading}
                className="btn-cta w-full mt-2 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In 🧋'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs font-semibold text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Continue as guest */}
            <button
              onClick={() => setGuestMode(true)}
              className="w-full py-3.5 rounded-2xl border-2 border-border bg-white/40 text-foreground font-bold text-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
            >
              Continue as Guest 👤
            </button>

            {guestMode && (
              <div className="mt-3 p-3 bg-primary/10 rounded-2xl text-xs text-primary font-semibold text-center">
                ✅ Browsing as guest — <Link href="/shop" className="underline">Start shopping</Link>
              </div>
            )}

            {/* Register link */}
            <p className="text-center text-sm text-muted-foreground mt-5 font-medium">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-bold text-primary hover:text-cta transition-colors">
                Sign up free 🎁
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
      <FloatingChat />
    </div>
  );
}
