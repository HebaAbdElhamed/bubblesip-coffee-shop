import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  return (
    <footer className="border-t border-border/60 pt-16 pb-10 px-4 sm:px-6" style={{ background: '#ECC9A0' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          {/* Left: Logo + tagline */}
          <div className="flex flex-col gap-3 max-w-xs">
            <div className="flex items-center gap-2.5">
              <AppLogo size={36} />
              <span className="font-extrabold text-lg tracking-tight text-foreground">BubbleSip</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              Every sip, a little celebration. Handcrafted bubble tea, iced coffee & smoothies — made your way.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {['instagram', 'tiktok', 'twitter']?.map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="size-9 rounded-full bg-white/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-white transition-all duration-200"
                >
                  <Icon name="HeartIcon" size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">Menu</span>
              {[
                { label: 'Home', href: '/homepage' },
                { label: 'Shop', href: '/shop' },
                { label: 'Products', href: '/product' },
              ]?.map((l) => (
                <Link key={l?.label} href={l?.href} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                  {l?.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">Legal</span>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy']?.map((l) => (
                <a key={l} href="#" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold text-muted-foreground/60">© 2026 BubbleSip Inc. All rights reserved.</p>
          <div className="flex gap-6 text-xs font-semibold text-muted-foreground/60">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}