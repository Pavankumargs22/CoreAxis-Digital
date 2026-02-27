'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Database, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SystemsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.system-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Simple typing effect
      if (codeRef.current) {
        const text = codeRef.current.innerText;
        codeRef.current.innerText = '';
        
        let i = 0;
        const typeWriter = () => {
          if (i < text.length) {
            codeRef.current!.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
          }
        };

        ScrollTrigger.create({
          trigger: codeRef.current,
          start: 'top 80%',
          onEnter: () => typeWriter(),
          once: true,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 text-center md:text-left">
          <h3 className="text-[12px] uppercase tracking-[3px] text-gray-500 mb-4 opacity-60">Infrastructure</h3>
          <h2 className="text-[38px] md:text-[56px] font-bold leading-[1.1] tracking-[-1px]">
            Automated <span className="text-gradient">Workflows</span>
          </h2>
          <p className="text-[16px] md:text-[18px] text-gray-400 max-w-xl mt-6 leading-[1.6]">
            We build intelligent systems that connect your data, automate your processes, and scale your operations without friction.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Mock Dashboard */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="system-card p-6 rounded-[18px] bg-panel border border-white/5 shadow-lg flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-[18px] font-bold text-white mb-1">Lead Ingestion</h4>
                <p className="text-[14px] text-gray-400">Real-time data capture and validation.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-600 ml-auto" />
            </div>

            <div className="system-card p-6 rounded-[18px] bg-panel border border-white/5 shadow-lg flex items-center gap-6 ml-0 md:ml-12">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
                <Database className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h4 className="text-[18px] font-bold text-white mb-1">Data Enrichment</h4>
                <p className="text-[14px] text-gray-400">AI-powered profile building and scoring.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-600 ml-auto" />
            </div>

            <div className="system-card p-6 rounded-[18px] bg-panel border border-white/5 shadow-lg flex items-center gap-6 ml-0 md:ml-24">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                <Zap className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h4 className="text-[18px] font-bold text-white mb-1">Automated Action</h4>
                <p className="text-[14px] text-gray-400">Instant routing and personalized outreach.</p>
              </div>
              <ShieldCheck className="w-5 h-5 text-green-500 ml-auto" />
            </div>
          </div>

          {/* Code View */}
          <div className="w-full lg:w-1/2">
            <div className="system-card relative rounded-[18px] bg-[#0d0d12] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center px-4 py-3 border-b border-white/5 bg-panel/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto text-[12px] text-gray-500 font-mono">webhook.ts</div>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre ref={codeRef} className="text-[14px] font-mono text-gray-300 leading-[1.8]">
{`export async function POST(req: Request) {
  try {
    const payload = await req.json();
    
    // 1. Validate incoming data
    const validatedData = schema.parse(payload);
    
    // 2. Enrich via AI Service
    const enrichedProfile = await ai.enrich(validatedData);
    
    // 3. Store in Database
    const record = await db.leads.create({
      data: enrichedProfile
    });
    
    // 4. Trigger Automation Chain
    await n8n.trigger('lead-workflow', record.id);
    
    return Response.json({ status: 'success' });
  } catch (error) {
    return Response.json({ error: 'Invalid payload' }, { status: 400 });
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
