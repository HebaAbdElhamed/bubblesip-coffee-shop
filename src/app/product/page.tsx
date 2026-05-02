import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import MobileBottomNav from '@/components/MobileBottomNav';
import ProductClient from './components/ProductClient';
import RelatedProducts from './components/RelatedProducts';

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header cartCount={3} />
      <main className="pt-20 md:pt-24 pb-24 md:pb-0">
        <ProductClient />
        <RelatedProducts />
      </main>
      <Footer />
      <FloatingChat />
      <MobileBottomNav />
    </div>
  );
}