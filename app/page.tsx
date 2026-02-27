import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import Capabilities from '@/components/Capabilities';
import SelectedWork from '@/components/SelectedWork';
import ProcessTimeline from '@/components/ProcessTimeline';
import TechOrbit from '@/components/TechOrbit';
import SystemsShowcase from '@/components/SystemsShowcase';
import FinalCTA from '@/components/FinalCTA';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-background text-text overflow-x-hidden">
      <Header />
      <div id="hero">
        <Hero />
      </div>
      <div id="manifesto">
        <Manifesto />
      </div>
      <div id="capabilities">
        <Capabilities />
      </div>
      <div id="work">
        <SelectedWork />
      </div>
      <div id="process">
        <ProcessTimeline />
      </div>
      <div id="tech">
        <TechOrbit />
      </div>
      <div id="systems">
        <SystemsShowcase />
      </div>
      <div id="contact">
        <FinalCTA />
      </div>
      <Footer />
    </main>
  );
}
