'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function FloatingChat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="glass-card rounded-3xl p-5 w-72 shadow-warm-lg animate-float-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="ChatBubbleLeftRightIcon" size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-foreground">BubbleSip Support</p>
              <p className="text-xs text-muted-foreground">Usually replies in 2 min</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Hey! 👋 How can we help you today? Ask us about our drinks, orders, or rewards!
          </p>
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full bg-background border border-border rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="size-14 rounded-full flex items-center justify-center text-white shadow-cta transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #4CDBD5, #F25A38)' }}
        aria-label="Open chat"
      >
        <Icon name={open ? 'XMarkIcon' : 'ChatBubbleLeftEllipsisIcon'} size={24} className="text-white" />
      </button>
    </div>
  );
}