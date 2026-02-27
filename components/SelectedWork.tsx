'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Project Alpha',
    description: 'Immersive WebGL experience for a luxury automotive brand.',
    image: 'https://picsum.photos/seed/alpha/1920/1080?blur=2',
  },
  {
    title: 'Project Beta',
    description: 'Data visualization dashboard with real-time 3D rendering.',
    image: 'https://picsum.photos/seed/beta/1920/1080?blur=2',
  },
  {
    title: 'Project Gamma',
    description: 'Interactive e-commerce platform with AR integration.',
    image: 'https://picsum.photos/seed/gamma/1920/1080?blur=2',
  },
  {
    title: 'Project Delta',
    description: 'Generative art installation for a global tech conference.',
    image: 'https://picsum.photos/seed/delta/1920/1080?blur=2',
  },
];

export default function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;

      gsap.to(scrollRef.current, {
        x: -(scrollWidth - windowWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-background overflow-hidden py-32 md:py-0 md:h-screen flex items-center">
      <div className="container mx-auto px-6 md:px-12 mb-12 md:hidden">
        <h3 className="text-[12px] uppercase tracking-[3px] text-gray-500 mb-4 opacity-60">Selected Work</h3>
        <h2 className="text-[28px] font-bold leading-[1.1] tracking-[-1px]">
          Cinematic <span className="text-gradient">Case Studies</span>
        </h2>
      </div>

      <div 
        ref={scrollRef} 
        className="flex flex-col md:flex-row h-full md:h-[70vh] w-full md:w-max px-6 md:px-12 gap-8 md:gap-16"
      >
        <div className="hidden md:flex flex-col justify-center w-[400px] shrink-0">
          <h3 className="text-[12px] uppercase tracking-[3px] text-gray-500 mb-4 opacity-60">Selected Work</h3>
          <h2 className="text-[56px] font-bold leading-[1.1] tracking-[-1px]">
            Cinematic <br />
            <span className="text-gradient">Case Studies</span>
          </h2>
          <div className="w-12 h-1 bg-primary mt-8 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
        </div>

        {projects.map((project, index) => (
          <div 
            key={index} 
            className="group relative w-full md:w-[800px] h-[400px] md:h-full shrink-0 rounded-[18px] overflow-hidden cursor-pointer"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
            
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <h4 className="text-[28px] md:text-[38px] font-bold text-white mb-2 tracking-[-1px]">
                {project.title}
              </h4>
              <p className="text-[16px] md:text-[18px] text-gray-300 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
