'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const words = textRef.current.innerText.split(' ');
    textRef.current.innerHTML = '';
    
    words.forEach((word) => {
      const span = document.createElement('span');
      span.innerText = word + ' ';
      span.className = 'inline-block opacity-0 translate-y-8';
      textRef.current?.appendChild(span);
    });

    const ctx = gsap.context(() => {
      gsap.to(textRef.current!.children, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 1,
        },
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'power2.out',
      });

      gsap.fromTo('.manifesto-line', 
        { scaleX: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'bottom 50%',
            scrub: 1,
          },
          scaleX: 1,
          transformOrigin: 'left center',
          ease: 'power2.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[60vh] flex items-center justify-center py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-panel/30 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 z-20 text-center">
        <h2 
          ref={textRef} 
          className="text-[38px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] tracking-[-1px] max-w-4xl mx-auto"
        >
          We design systems, not pages.
        </h2>
        <div className="manifesto-line w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-12 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
      </div>
    </section>
  );
}
