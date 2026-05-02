import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
  const floatingDrinks = [
  {
    src: "https://images.unsplash.com/photo-1592345935810-4cf723242746",
    alt: 'Vibrant purple taro bubble tea with black boba pearls in a clear plastic cup, soft pastel background',
    className: 'w-44 md:w-56 animate-float',
    style: { top: '8%', right: '2%' }
  },
  {
    src: "https://images.unsplash.com/photo-1726164530309-81f67e2f2778",
    alt: 'Bright pink strawberry smoothie with cream top in a tall glass, light airy studio setting',
    className: 'w-36 md:w-44 animate-float-2',
    style: { top: '42%', right: '20%' }
  },
  {
    src: "https://images.unsplash.com/photo-1595522099140-18383a74b7f4",
    alt: 'Matcha green iced latte in a glass with ice cubes, white marble surface, clean bright lighting',
    className: 'w-28 md:w-36 animate-float-3',
    style: { top: '62%', right: '6%' }
  }];


  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated gradient bg */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background: 'linear-gradient(135deg, #F2D7B6 0%, #ECC9A0 20%, #d4f0ee 55%, #b8ede9 80%, #F2D7B6 100%)'
        }} />

      {/* Blob shapes */}
      <div
        className="absolute animate-blob opacity-30 pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, #4CDBD5 0%, transparent 70%)',
          top: '-100px',
          right: '-100px',
          filter: 'blur(60px)'
        }} />

      <div
        className="absolute animate-blob-2 opacity-20 pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, #F2A35E 0%, transparent 70%)',
          bottom: '0px',
          left: '-80px',
          filter: 'blur(80px)'
        }} />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px'
        }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-7">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 bg-white/70 backdrop-blur-sm border border-white/80 rounded-full px-5 py-2.5 shadow-warm-sm reveal-up-hidden">
              <span className="size-2 rounded-full bg-cta animate-pulse" />
              <span className="text-sm font-bold text-foreground/80 tracking-wide">New Spring Menu — Now Live 🌸</span>
            </div>

            {/* Massive headline */}
            <h1
              className="font-extrabold leading-[0.88] tracking-tight text-foreground reveal-up-hidden"
              style={{ fontSize: 'clamp(3.2rem, 9vw, 7.5rem)' }}>

              Sip. <span className="text-gradient-warm">Smile.</span>
              <br />
              <span className="text-gradient-aqua">Repeat.</span>
            </h1>

            <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-xl font-medium reveal-up-hidden">
              Handcrafted bubble tea, iced coffee & smoothies made exactly the way you love them. Customize every sip, earn rewards, and get it delivered fresh.
            </p>

            <div className="flex flex-wrap gap-4 reveal-up-hidden">
              <Link href="/shop" className="btn-cta text-base">
                Shop Now 🛍️
              </Link>
              <Link
                href="/shop"
                className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-foreground/20 bg-white/60 backdrop-blur-sm text-foreground font-bold text-base hover:bg-white hover:border-primary transition-all duration-300">

                Explore Drinks ✨
              </Link>
            </div>

            {/* Social proof strip */}
            <div className="flex items-center gap-6 pt-2 reveal-up-hidden">
              <div className="flex -space-x-3">
                {[
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&q=80',
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&q=80']?.
                map((src, i) =>
                <div key={i} className="size-9 rounded-full border-2 border-white overflow-hidden">
                    <AppImage src={src} alt={`Happy BubbleSip customer ${i + 1}`} width={36} height={36} className="object-cover w-full h-full" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5]?.map((s) =>
                  <svg key={s} className="size-4 text-accent fill-accent" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  )}
                </div>
                <p className="text-xs font-semibold text-muted-foreground">48,200+ happy sippers</p>
              </div>
            </div>
          </div>

          {/* Right: Floating drinks */}
          <div className="lg:col-span-5 relative h-[420px] md:h-[560px] hidden sm:block">
            {floatingDrinks?.map((drink, i) =>
            <div
              key={i}
              className={`absolute ${drink?.className} drop-shadow-2xl`}
              style={drink?.style}>

                <div className="rounded-[32px] overflow-hidden shadow-warm-lg border-4 border-white/60">
                  <AppImage
                  src={drink?.src}
                  alt={drink?.alt}
                  width={224}
                  height={280}
                  priority={i === 0}
                  className="w-full h-full object-cover" />

                </div>
              </div>
            )}

            {/* Points badge floating */}
            <div
              className="absolute glass-card rounded-2xl px-4 py-3 flex items-center gap-3 animate-float shadow-warm-md z-10"
              style={{ bottom: '15%', left: '0%' }}>

              <div className="size-10 rounded-xl bg-gradient-to-br from-accent to-cta flex items-center justify-center text-white text-lg">🏆</div>
              <div>
                <p className="text-xs font-bold text-foreground">+120 Points Earned!</p>
                <p className="text-[10px] text-muted-foreground font-medium">Just from this order</p>
              </div>
            </div>

            {/* New arrival badge */}
            <div
              className="absolute glass-card rounded-2xl px-4 py-3 flex items-center gap-3 animate-float-2 shadow-warm-md z-10"
              style={{ top: '5%', left: '5%' }}>

              <span className="text-xl">🌸</span>
              <div>
                <p className="text-xs font-bold text-foreground">Sakura Milk Tea</p>
                <p className="text-[10px] text-primary font-bold">NEW this season</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}