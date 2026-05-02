import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import MobileBottomNav from '@/components/MobileBottomNav';
import ShopClient from './components/ShopClient';

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header cartCount={3} />
      <main className="pt-20 md:pt-24 pb-24 md:pb-0">
        <ShopClient />
      </main>
      <Footer />
      <FloatingChat />
      <MobileBottomNav />
    </div>
  );
}