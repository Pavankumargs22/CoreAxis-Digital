'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Settings, Cpu, Cuboid, Server, TrendingUp, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: 'Automation Architecture',
    description: 'Intelligent workflows that eliminate manual friction and scale operations.',
    icon: Settings,
  },
  {
    title: 'AI Integrated Systems',
    description: 'Custom LLM deployments and predictive models for enterprise data.',
    icon: Cpu,
  },
  {
    title: 'Immersive 3D Interfaces',
    description: 'WebGL and Three.js experiences that command attention and drive engagement.',
    icon: Cuboid,
  },
  {
    title: 'Backend Infrastructure',
    description: 'Robust, scalable server architectures built for high-throughput environments.',
    icon: Server,
  },
  {
    title: 'Conversion Engineering',
    description: 'Data-driven funnel optimization designed to maximize user acquisition.',
    icon: TrendingUp,
  },
  {
    title: 'Performance Optimization',
    description: 'Sub-second load times and 90+ Lighthouse scores across all metrics.',
    icon: Zap,
  },
];

export default function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.capability-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20">
          <h3 className="text-[12px] uppercase tracking-[3px] text-gray-500 mb-4 opacity-60">Capabilities</h3>
          <h2 className="text-[28px] md:text-[38px] lg:text-[56px] font-bold leading-[1.1] tracking-[-1px]">
            Engineering the <br />
            <span className="text-gradient">Unfair Advantage</span>
          </h2>
          <div className="w-12 h-1 bg-primary mt-8 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, index) => (
            <div
              key={index}
              className="capability-card group relative p-8 rounded-[18px] bg-panel border border-white/5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[18px] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-6 border border-white/10 group-hover:border-primary/50 transition-colors duration-300 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <cap.icon className="w-6 h-6 text-gray-400 group-hover:text-primary transition-all duration-300 group-hover:rotate-6" />
                </div>
                <h4 className="text-[20px] font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                  {cap.title}
                </h4>
                <p className="text-[16px] text-gray-400 leading-[1.6]">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
