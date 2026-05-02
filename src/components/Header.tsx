'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  cartCount?: number;
}

export default function Header({ cartCount = 3 }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/homepage' },
    { label: 'Shop', href: '/shop' },
    { label: 'Offers', href: '/homepage#offers' },
    { label: 'Subscription', href: '/subscription' },
    { label: 'Rewards', href: '/rewards' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-warm-md border-b border-border/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/homepage" className="flex items-center gap-2.5 flex-shrink-0">
            <AppLogo size={40} />
            <span className="font-extrabold text-xl tracking-tight text-foreground hidden sm:block">
              BubbleSip
            </span>
          </Link>

          {/* Center Nav — Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-600 text-foreground/70 hover:text-foreground rounded-full hover:bg-primary/10 transition-all duration-200 font-semibold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden md:flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors text-foreground/70 hover:text-foreground">
              <Icon name="MagnifyingGlassIcon" size={20} />
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors text-foreground/70 hover:text-foreground">
              <Icon name="ShoppingBagIcon" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 size-5 bg-cta text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login / Profile */}
            <Link href="/account" className="hidden md:flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors text-foreground/70 hover:text-foreground">
              <Icon name="UserCircleIcon" size={20} />
            </Link>

            {/* Login CTA — desktop */}
            <Link
              href="/login"
              className="hidden md:flex items-center gap-1.5 bg-cta text-white text-xs font-bold px-4 py-2 rounded-full hover:scale-105 transition-all shadow-cta"
            >
              Sign In
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="flex lg:hidden size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <Icon name={mobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-border shadow-warm-lg p-6">
            <nav className="flex flex-col gap-1 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3.5 text-base font-semibold text-foreground hover:text-primary hover:bg-primary/8 rounded-2xl transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex gap-3 pt-3 border-t border-border">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center py-3 rounded-2xl border-2 border-border font-bold text-sm text-foreground hover:border-primary transition-all">
                Sign In
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center py-3 rounded-2xl bg-cta text-white font-bold text-sm shadow-cta">
                Sign Up 🎁
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}