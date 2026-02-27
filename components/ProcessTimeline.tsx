'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: '01', title: 'Discovery', desc: 'Deep dive into business objectives and technical constraints.' },
  { num: '02', title: 'Architecture', desc: 'Designing the scalable backend and WebGL infrastructure.' },
  { num: '03', title: 'Design System', desc: 'Establishing the cinematic visual language and motion curves.' },
  { num: '04', title: 'Build', desc: 'Engineering the frontend, shaders, and backend integrations.' },
  { num: '05', title: 'Automation', desc: 'Implementing intelligent workflows and data pipelines.' },
  { num: '06', title: 'Scale', desc: 'Performance optimization and global deployment.' },
];

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: 1,
        },
        height: '100%',
        ease: 'none',
      });

      gsap.from('.process-step', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12 relative">
        <div className="mb-20 text-center">
          <h3 className="text-[12px] uppercase tracking-[3px] text-gray-500 mb-4 opacity-60">Methodology</h3>
          <h2 className="text-[38px] md:text-[56px] font-bold leading-[1.1] tracking-[-1px]">
            The <span className="text-gradient">Process</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-panel transform md:-translate-x-1/2">
            <div ref={lineRef} className="w-full bg-gradient-to-b from-primary to-secondary h-0 shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
          </div>

          <div className="space-y-24">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`process-step relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Number Indicator */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary transform -translate-x-1/2 mt-2 md:mt-0 z-10 shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
                
                {/* Content */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className="relative">
                    <span className="absolute -top-12 md:-top-16 left-0 md:left-auto md:right-0 text-[80px] md:text-[120px] font-bold text-white/5 tracking-[-5px] leading-none pointer-events-none select-none">
                      {step.num}
                    </span>
                    <h4 className="text-[24px] md:text-[28px] font-bold text-white mb-4 relative z-10">
                      {step.title}
                    </h4>
                    <p className="text-[16px] text-gray-400 leading-[1.6] relative z-10">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
