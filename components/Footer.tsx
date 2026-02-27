import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full bg-panel border-t border-white/5 py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="interactive group flex items-center gap-3 mb-6">
              <div className="w-10 h-10 relative flex items-center justify-center bg-background rounded-lg border border-white/10 group-hover:border-primary/50 transition-colors duration-300">
                <div className="w-4 h-4 border-2 border-primary rotate-45 transform group-hover:rotate-90 transition-transform duration-500" />
              </div>
              <span className="text-[24px] font-bold tracking-[-1px] text-white">
                CoreAxis Digital
              </span>
            </Link>
            <p className="text-[16px] text-gray-400 max-w-sm leading-[1.6]">
              Elite Cinematic 3D Interactive Technology Agency. We architect immersive systems and automated digital infrastructure.
            </p>
          </div>

          <div>
            <h4 className="text-[14px] font-bold text-white uppercase tracking-[2px] mb-6">Navigation</h4>
            <ul className="space-y-4">
              {['Work', 'Process', 'Tech', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="interactive text-[15px] text-gray-400 hover:text-primary transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[14px] font-bold text-white uppercase tracking-[2px] mb-6">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="interactive w-10 h-10 rounded-full bg-background border border-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="interactive w-10 h-10 rounded-full bg-background border border-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="interactive w-10 h-10 rounded-full bg-background border border-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[14px] text-gray-500">
            &copy; {new Date().getFullYear()} CoreAxis Digital. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="interactive text-[14px] text-gray-500 hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link href="#" className="interactive text-[14px] text-gray-500 hover:text-white transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
