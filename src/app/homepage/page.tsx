import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import MobileBottomNav from '@/components/MobileBottomNav';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import FeaturedProductsSection from './components/FeaturedProductsSection';
import SpecialOffersSection from './components/SpecialOffersSection';
import LoyaltyTeaser from './components/LoyaltyTeaser';
import SubscriptionBanner from './components/SubscriptionBanner';
import ScrollRevealInit from './components/ScrollRevealInit';

export default function HomepagePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header cartCount={3} />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProductsSection />
        <SpecialOffersSection />
        <LoyaltyTeaser />
        <SubscriptionBanner />
      </main>
      <Footer />
      <FloatingChat />
      <MobileBottomNav />
      <ScrollRevealInit />
    </div>
  );
}