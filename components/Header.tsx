'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-4 bg-background/80 backdrop-blur-md border-b border-white/5' : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="interactive group flex items-center gap-3">
          <div className="w-10 h-10 relative flex items-center justify-center bg-panel rounded-lg border border-white/10 group-hover:border-primary/50 transition-colors duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            {/* Minimalist Logo Representation */}
            <div className="w-4 h-4 border-2 border-primary rotate-45 transform group-hover:rotate-90 transition-transform duration-500" />
          </div>
          <span className="text-[18px] font-bold tracking-[-0.5px] text-white group-hover:text-primary transition-colors duration-300">
            CoreAxis
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {['Work', 'Process', 'Tech', 'Contact'].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="interactive text-[13px] uppercase tracking-[2px] text-gray-400 hover:text-white transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <button className="md:hidden interactive w-10 h-10 flex flex-col justify-center items-center gap-1.5">
          <span className="w-6 h-[2px] bg-white rounded-full" />
          <span className="w-6 h-[2px] bg-white rounded-full" />
        </button>
      </div>
    </header>
  );
}
