import React, { useRef, useEffect, useState } from 'react';
import { LogoIcon, ArrowIcon, CheckIcon, LayersIcon } from './components/ui/Icons';
import { WaitlistForm } from './components/WaitlistForm';
import { Play, FileText, Clock, Users, Building2, HardHat, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

const FloatingParticles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 75 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-white rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 0.6, 0],
            scale: [0.8, 1.5, 0.8]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  const waitlistRef = useRef<HTMLDivElement>(null);

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full relative bg-navy-950 text-white selection:bg-flash-400 selection:text-black font-sans">
      <div className="bg-noise"></div>
      
      {/* Ambient Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-navy-800/20 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-flash-400/5 rounded-full blur-[100px]"></div>
         <div className="absolute inset-0 opacity-10" 
              style={{
                backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
                backgroundSize: '60px 60px'
              }}>
         </div>
      </div>

      <FloatingParticles />

      <div className="relative z-10">
        {/* 1. Navigation Bar */}
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <LogoIcon className="h-8 w-auto text-white" />
            <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-white/80 capitalize">
              <a href="#how-it-works" className="hover:text-flash-400 transition-colors">How It Works</a>
              <a href="#pricing" className="hover:text-flash-400 transition-colors">Pricing</a>
            </div>
            <button onClick={scrollToWaitlist} className="bg-flash-400 text-navy-950 font-bold font-sans text-sm px-6 py-3 uppercase tracking-wide hover:bg-white transition-colors">
              Book Demo
            </button>
          </div>
        </nav>

        {/* 2. Hero Section */}
        <section className="pt-32 pb-20 px-4 md:px-8 w-full flex flex-col items-center justify-start overflow-hidden max-w-7xl mx-auto">
          
          <div className="w-full flex flex-col items-start text-left mb-16">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-flash-400/30 rounded-full bg-flash-400/5 mb-6">
                <span className="w-2 h-2 bg-flash-400 rounded-full animate-pulse-slow"></span>
                <span className="text-xs font-mono font-medium text-flash-400 tracking-wider">SYSTEM STATUS: PRE-RELEASE</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-[6.5vw] sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.9] text-white italic whitespace-nowrap mb-6">
                CREATE ACCURATE BIDS IN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-flash-400 to-white/80 not-italic">MINUTES INSTEAD OF HOURS.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed max-w-2xl">
                Upload an RFQ and Bidfast analyzes requirements, extracts line items, and generates a structured bid instantly.
              </p>
            </FadeIn>
          </div>

          {/* Wireframe Visual - Full Width of Container */}
          <FadeIn delay={0.4} className="w-full">
            <div className="relative border border-white/10 bg-navy-900/50 p-2 md:p-3 rounded-xl shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-flash-400/0 via-flash-400 to-flash-400/0 opacity-50"></div>
              <div className="border border-white/5 bg-navy-950 aspect-[16/9] md:aspect-[21/9] flex items-center justify-center relative group w-full rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
                <div className="text-center z-10">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 mx-auto border-2 border-flash-400/50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform bg-navy-900/80 backdrop-blur-sm cursor-pointer"
                  >
                    <Play className="w-8 h-8 text-flash-400 ml-1" />
                  </motion.div>
                  <p className="font-mono text-sm text-flash-400 tracking-widest uppercase">[ DASHBOARD_PREVIEW.MP4 ]</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* 3. Social Proof */}
        <section className="py-12 border-y border-white/10 bg-navy-900/30">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-8">Built with feedback from industry professionals</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
              {/* Wireframe Logos */}
              {['PCL', 'ELLISDON', 'BIRD', 'STUART OLSON', 'GRAHAM'].map((logo, i) => (
                <motion.div 
                  key={logo} 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="font-black text-2xl tracking-tighter italic text-white/80"
                >
                  {logo}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Problem Section */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 italic">
              PREPARING BIDS IS SLOW, <br className="hidden md:block" />
              <span className="text-flash-400">MANUAL, AND ERROR-PRONE.</span>
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Manual RFQ Analysis", desc: "Teams spend hours reading specs and extracting line items manually.", icon: <FileText className="w-8 h-8 text-flash-400 mb-6" /> },
              { title: "Spreadsheet Chaos", desc: "Multiple pricing files and manual data entry increase costly errors.", icon: <LayersIcon className="w-8 h-8 text-flash-400 mb-6" /> },
              { title: "Missed Opportunities", desc: "Slow response times cause lost deals to faster competitors.", icon: <Clock className="w-8 h-8 text-flash-400 mb-6" /> }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="p-8 border border-white/10 bg-navy-900/20 hover:bg-navy-900/50 transition-colors h-full"
                >
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="inline-block">
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 5. Solution Section */}
        <section className="py-32 px-6 bg-navy-900/30 border-y border-white/10">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 italic">
                BIDFAST AUTOMATES THE <br className="hidden md:block" />
                <span className="text-flash-400">ENTIRE BID PREPARATION PROCESS.</span>
              </h2>
            </FadeIn>

            <div className="space-y-32">
              {[
                { step: "01", title: "Upload RFQ Documents", desc: "Bidfast reads specifications and extracts key data instantly.", align: "left" },
                { step: "02", title: "Automatic Line Item Generation", desc: "Convert requirements into structured bid items without manual entry.", align: "right" },
                { step: "03", title: "Instant Bid Drafts", desc: "Generate proposals ready for review and submission.", align: "left" }
              ].map((feature, i) => (
                <div key={i} className={`flex flex-col ${feature.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
                  <FadeIn className="flex-1" delay={0.1}>
                    <div className="font-mono text-flash-400 text-sm tracking-widest mb-4">STEP {feature.step}</div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-xl text-white/60">{feature.desc}</p>
                  </FadeIn>
                  <FadeIn className="flex-1 w-full" delay={0.3}>
                    <div className="aspect-video border border-white/10 bg-navy-950 flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-20"></div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-flash-400/20 group-hover:bg-flash-400 transition-colors"></div>
                      <p className="font-mono text-xs text-white/30 tracking-widest uppercase">[ UI_MOCKUP_{feature.step}.PNG ]</p>
                    </div>
                  </FadeIn>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. How It Works (Simplified) */}
        <section id="how-it-works" className="py-32 px-6 max-w-7xl mx-auto">
          <FadeIn className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic mb-4">HOW IT WORKS</h2>
            <p className="text-white/60 font-mono text-sm uppercase tracking-widest">Three steps to your next winning bid</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 z-0"></div>
            {[
              { num: "1", title: "Upload RFQ", desc: "Drag and drop your PDF specs." },
              { num: "2", title: "AI Extraction", desc: "Bidfast analyzes requirements." },
              { num: "3", title: "Generate Bid", desc: "Get a structured proposal instantly." }
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.2} className="relative z-10 bg-navy-950 p-8 border border-white/10 text-center hover:border-flash-400 transition-colors">
                <div className="w-12 h-12 bg-flash-400 text-navy-950 font-black flex items-center justify-center rounded-full mx-auto mb-6 text-xl">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/60">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 7. Product Demo */}
        <section className="py-32 border-y border-white/10 bg-navy-900/50">
          <FadeIn className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12 italic">SEE BIDFAST IN ACTION</h2>
            <div className="aspect-video border border-white/20 bg-navy-950 flex items-center justify-center relative cursor-pointer group shadow-2xl">
              <div className="absolute inset-0 bg-flash-400/5 group-hover:bg-flash-400/10 transition-colors"></div>
              <div className="w-24 h-24 border-2 border-flash-400 rounded-full flex items-center justify-center bg-navy-950/80 backdrop-blur-sm group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-flash-400 ml-2" />
              </div>
            </div>
          </FadeIn>
        </section>

        {/* 8. Key Benefits */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12 italic">
                MEASURABLE OUTCOMES. <br />
                <span className="text-flash-400">REAL RESULTS.</span>
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Save Hours on Every Bid", desc: "Automate repetitive analysis and calculations." },
                  { title: "Improve Accuracy", desc: "Reduce pricing and spreadsheet errors." },
                  { title: "Respond Faster", desc: "Submit bids before competitors." },
                  { title: "Standardize Proposals", desc: "Generate consistent bid documents." }
                ].map((benefit, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <CheckIcon className="w-6 h-6 text-flash-400 shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg mb-1">{benefit.title}</h4>
                      <p className="text-white/60">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 gap-4">
              <FadeIn delay={0.2} className="p-8 border border-white/10 bg-navy-900/30 text-center flex flex-col justify-center">
                <div className="text-5xl md:text-6xl font-black text-flash-400 mb-2">80%</div>
                <div className="font-mono text-xs text-white/60 uppercase tracking-widest">Reduction in prep time</div>
              </FadeIn>
              <FadeIn delay={0.3} className="p-8 border border-white/10 bg-navy-900/30 text-center flex flex-col justify-center">
                <div className="text-5xl md:text-6xl font-black text-flash-400 mb-2">&lt;5m</div>
                <div className="font-mono text-xs text-white/60 uppercase tracking-widest">To generate a bid</div>
              </FadeIn>
              <FadeIn delay={0.4} className="p-8 border border-white/10 bg-navy-900/30 text-center col-span-2 flex flex-col justify-center">
                <div className="text-5xl md:text-6xl font-black text-flash-400 mb-2">100%</div>
                <div className="font-mono text-xs text-white/60 uppercase tracking-widest">Consistency across proposals</div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 9. Screenshots Section */}
        <section className="py-32 border-y border-white/10 bg-navy-900/20 overflow-hidden">
          <FadeIn className="max-w-7xl mx-auto px-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic">THE WORKFLOW</h2>
          </FadeIn>
          <div className="relative w-full overflow-hidden">
            <motion.div 
              className="flex gap-6 px-6 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            >
              {[
                { step: "1", title: "RFQ Upload Interface" },
                { step: "2", title: "Extracted Bid Items" },
                { step: "3", title: "Pricing Calculations" },
                { step: "4", title: "Generated Proposal" },
                { step: "5", title: "Export View" },
                { step: "1", title: "RFQ Upload Interface" },
                { step: "2", title: "Extracted Bid Items" },
                { step: "3", title: "Pricing Calculations" },
                { step: "4", title: "Generated Proposal" },
                { step: "5", title: "Export View" }
              ].map((shot, i) => (
                <div 
                  key={i} 
                  className="w-[300px] md:w-[500px] shrink-0"
                >
                  <div className="aspect-[4/3] border border-white/10 bg-navy-950 mb-6 flex items-center justify-center relative hover:border-flash-400 transition-colors group">
                    <div className="absolute inset-0 bg-flash-400/0 group-hover:bg-flash-400/5 transition-colors"></div>
                    <div className="font-mono text-xs text-white/30 tracking-widest uppercase group-hover:text-flash-400 transition-colors">[ WORKFLOW_STEP_{shot.step}.PNG ]</div>
                  </div>
                  <div className="font-mono text-flash-400 text-xs tracking-widest mb-2">STEP 0{shot.step}</div>
                  <h4 className="text-xl font-bold">{shot.title}</h4>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 10. Who It's For */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <FadeIn className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic mb-4">WHO IT'S FOR</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <HardHat className="w-10 h-10 text-flash-400 mb-6" />, title: "Contractors", desc: "Generate bids faster and respond to more tenders with high accuracy." },
              { icon: <Building2 className="w-10 h-10 text-flash-400 mb-6" />, title: "Suppliers", desc: "Quickly respond to RFQs with structured, competitive pricing." },
              { icon: <Users className="w-10 h-10 text-flash-400 mb-6" />, title: "Procurement Teams", desc: "Standardize vendor responses and streamline the evaluation process." }
            ].map((audience, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="p-8 border border-white/10 bg-navy-900/30 hover:bg-navy-900/50 transition-colors h-full"
                >
                  <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="inline-block">
                    {audience.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">{audience.title}</h3>
                  <p className="text-white/60 leading-relaxed">{audience.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 11. Testimonials */}
        <section className="py-32 border-y border-white/10 bg-navy-900/50">
          <FadeIn className="max-w-5xl mx-auto px-6 text-center">
            <div className="text-flash-400 text-6xl md:text-8xl font-serif leading-none mb-6">"</div>
            <h3 className="text-3xl md:text-5xl font-light leading-tight mb-12 italic">
              Bidfast reduced our bid preparation time by more than half. It's completely changed how we handle RFQs.
            </h3>
            <div className="font-mono text-sm tracking-widest uppercase">
              <span className="text-white font-bold">Beta User</span> <span className="text-white/40">| Commercial Electrical Contractor</span>
            </div>
          </FadeIn>
        </section>

        {/* 12. Pricing / Beta Access */}
        <section id="pricing" className="py-32 px-6 max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic mb-4">EARLY ACCESS BETA</h2>
            <p className="text-xl text-white/60 mb-12">Free during the beta period. Starter plan coming soon.</p>
            <div className="p-12 border border-flash-400/30 bg-flash-400/5 relative shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-flash-400"></div>
              <h3 className="text-3xl font-bold mb-4">Beta Access</h3>
              <div className="text-6xl font-black text-flash-400 mb-8">$0<span className="text-2xl text-white/40 font-light">/mo</span></div>
              <ul className="text-left space-y-4 mb-12 max-w-sm mx-auto text-lg">
                <li className="flex gap-3"><CheckIcon className="w-6 h-6 text-flash-400 shrink-0" /> Full AI Extraction</li>
                <li className="flex gap-3"><CheckIcon className="w-6 h-6 text-flash-400 shrink-0" /> Unlimited RFQs</li>
                <li className="flex gap-3"><CheckIcon className="w-6 h-6 text-flash-400 shrink-0" /> Priority Support</li>
              </ul>
              <button onClick={scrollToWaitlist} className="w-full bg-flash-400 text-navy-950 font-bold px-8 py-5 uppercase tracking-widest hover:bg-white transition-colors text-lg">
                Book Demo
              </button>
            </div>
          </FadeIn>
        </section>

        {/* 13. FAQ Section */}
        <section className="py-32 px-6 max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic mb-16 text-center">FAQS</h2>
            <div className="space-y-4">
              {[
                { q: "What types of RFQs does Bidfast support?", a: "Bidfast supports standard PDF specifications, blueprints, and Excel-based RFQs commonly used in commercial electrical contracting." },
                { q: "How accurate are the generated bids?", a: "Our AI engine achieves 98%+ accuracy on standard symbol detection and line-item extraction. You always have full control to review and edit before submission." },
                { q: "Can I edit the generated bid?", a: "Yes. Bidfast generates a draft. You can adjust quantities, modify pricing, and add custom line items in our editor." },
                { q: "Is my data secure?", a: "Absolutely. We use enterprise-grade encryption. Your proprietary pricing data and RFQs are never shared or used to train public models." },
                { q: "Does Bidfast integrate with existing systems?", a: "We are currently building integrations for Procore, Accubid, and standard CSV/Excel exports." }
              ].map((faq, i) => (
                <details key={i} className="group border border-white/10 bg-navy-900/20 p-6 cursor-pointer hover:border-flash-400/50 transition-colors">
                  <summary className="flex justify-between items-center font-bold text-lg list-none">
                    {faq.q}
                    <ChevronDown className="w-5 h-5 text-flash-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-4 text-white/60 leading-relaxed border-t border-white/10 pt-4">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* 14. Final Call to Action (Waitlist Form) */}
        <section ref={waitlistRef} className="py-40 px-6 border-t border-white/10 bg-navy-900/40 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-flash-400/10 rounded-full blur-[120px] pointer-events-none"></div>
          <FadeIn className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 italic">
              START CREATING BIDS <span className="text-flash-400">FASTER.</span>
            </h2>
            <p className="text-xl text-white/60 mb-16 font-light">
              Join the beta today. No credit card required.
            </p>
            
            <WaitlistForm />
            
          </FadeIn>
        </section>

        {/* 15. Footer */}
        <footer className="border-t border-white/10 bg-navy-950 pt-20 pb-8 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <LogoIcon className="h-8 w-auto text-white mb-6" />
              <p className="text-white/40 text-sm font-mono">
                © 2025 BIDFAST SYSTEMS INC.<br />
                VANCOUVER, CA
              </p>
            </div>
            <div>
              <h4 className="font-sans text-sm font-bold text-flash-400 tracking-wide uppercase mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><button onClick={scrollToWaitlist} className="hover:text-white transition-colors">Demo</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-sm font-bold text-flash-400 tracking-wide uppercase mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-sm font-bold text-flash-400 tracking-wide uppercase mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto text-center border-t border-white/10 pt-8">
            <p className="text-white/30 text-xs font-mono">SYSTEM STATUS: ALL SYSTEMS OPERATIONAL</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
