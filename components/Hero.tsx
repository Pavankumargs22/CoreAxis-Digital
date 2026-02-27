'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroCanvas from './HeroCanvas';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5,
      });

      gsap.from('.hero-btn', {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex items-center overflow-hidden">
      <HeroCanvas />
      
      <div className="container mx-auto px-6 md:px-12 z-20 flex flex-col md:flex-row items-center">
        <div ref={textRef} className="w-full md:w-1/2 flex flex-col justify-center pointer-events-auto">
          <h1 className="hero-text text-[44px] md:text-[72px] lg:text-[110px] font-bold leading-[0.95] tracking-[-2px] mb-6">
            Engineering <br />
            <span className="text-gradient">Digital Dominance</span>
          </h1>
          <p className="hero-text text-[16px] md:text-[18px] text-gray-400 max-w-md mb-10 leading-[1.6]">
            We architect immersive systems and automated digital infrastructure.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="hero-btn interactive group relative px-8 py-4 bg-primary text-background font-bold uppercase tracking-[3px] text-xs overflow-hidden rounded-sm">
              <span className="relative z-10">Start a Project</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 z-0" />
            </button>
            <button className="hero-btn interactive group relative px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-[3px] text-xs overflow-hidden rounded-sm hover:border-primary/50 transition-colors">
              <span className="relative z-10">View Work</span>
              <div className="absolute inset-0 bg-primary/10 transform scale-y-0 origin-bottom transition-transform duration-300 ease-out group-hover:scale-y-100 z-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
