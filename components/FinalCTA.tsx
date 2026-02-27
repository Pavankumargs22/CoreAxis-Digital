'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.cta-btn', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[80vh] flex items-center justify-center py-32 bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[150px] mix-blend-screen animate-pulse" />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 md:px-12 z-20 text-center">
        <h2 
          ref={textRef} 
          className="text-[44px] md:text-[72px] lg:text-[96px] font-bold leading-[1] tracking-[-2px] max-w-5xl mx-auto mb-12"
        >
          Ready to Build Something <br />
          <span className="text-gradient">Unstoppable?</span>
        </h2>
        
        <button className="cta-btn interactive group relative px-12 py-6 bg-transparent border border-primary text-primary font-bold uppercase tracking-[4px] text-sm overflow-hidden rounded-full hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-shadow duration-500">
          <span className="relative z-10 group-hover:text-background transition-colors duration-300">Initiate Project</span>
          <div className="absolute inset-0 bg-primary transform scale-y-0 origin-bottom transition-transform duration-500 ease-out group-hover:scale-y-100 z-0" />
        </button>
      </div>
    </section>
  );
}
