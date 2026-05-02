'use client';
import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function MobileBottomNav() {
  const items = [
    { label: 'Home', icon: 'HomeIcon', href: '/homepage' },
    { label: 'Shop', icon: 'ShoppingBagIcon', href: '/shop' },
    { label: 'Cart', icon: 'ShoppingCartIcon', href: '/shop', badge: 3 },
    { label: 'Account', icon: 'UserCircleIcon', href: '/homepage' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-border/60 bottom-nav-safe shadow-warm-lg">
      <div className="flex items-center justify-around py-2 px-2">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl hover:bg-primary/10 transition-all group"
          >
            <div className="relative">
              <Icon
                name={item.icon as Parameters<typeof Icon>[0]['name']}
                size={22}
                className="text-muted-foreground group-hover:text-primary transition-colors"
              />
              {item.badge && (
                <span className="absolute -top-1 -right-1.5 size-4 bg-cta text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold text-muted-foreground group-hover:text-primary transition-colors">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}