import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, FileText, Clock, Users, Building2, HardHat, ChevronDown } from 'lucide-react';
import { LogoIcon, CheckIcon, LayersIcon } from './components/ui/Icons';
import { WaitlistForm } from './components/WaitlistForm';

type FadeInProps = React.PropsWithChildren<{
  delay?: number;
  className?: string;
}>;

type SectionHeadingProps = {
  kicker: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

type SolutionStep = {
  step: string;
  title: string;
  description: string;
  align: 'left' | 'right';
};

const trustSignals = [
  'Built in Vancouver, BC',
  '99.2% Symbol Detection Accuracy',
  'Free Beta \u2014 No Credit Card',
];

const problemItems = [
  {
    title: 'Manual Symbol Counting',
    description: 'Estimators spend 15\u201330+ minutes per page scanning drawings by hand, counting receptacles, switches, and fixtures one by one.',
    Icon: FileText,
  },
  {
    title: 'Inconsistent Counts',
    description: 'Manual counting carries a 5\u201315% human error rate. Different estimators count different totals from the same drawings \u2014 no single source of truth.',
    Icon: LayersIcon,
  },
  {
    title: 'Lost Revenue',
    description: 'When takeoffs take days instead of minutes, you can\u2019t bid on enough projects to grow. Every hour spent counting is an hour not spent winning work.',
    Icon: Clock,
  },
];

const solutionSteps: SolutionStep[] = [
  {
    step: '01',
    title: 'Upload Electrical Drawings',
    description: 'Drag and drop your PDF blueprints. Bidfast handles full-size architectural sheets at production resolution \u2014 no downsizing or splitting required.',
    align: 'left',
  },
  {
    step: '02',
    title: 'AI Symbol Counting',
    description: 'Click any symbol on the legend \u2014 no training, no setup. Bidfast runs a multi-stage verification process that checks each detection five different ways before confirming it. The whole process takes under 2 seconds per page.',
    align: 'right',
  },
  {
    step: '03',
    title: 'Complete Takeoff List',
    description: 'Receive a structured takeoff with quantities, symbol types, and page references \u2014 with 99.2% of symbols found, verified against 610+ hand-checked symbols from real commercial electrical drawings.',
    align: 'left',
  },
];

const processSteps = [
  { num: '1', title: 'Upload Drawings', description: 'Drag and drop your electrical PDFs.' },
  { num: '2', title: 'AI Symbol Count', description: 'Bidfast identifies and counts every symbol.' },
  { num: '3', title: 'Get Your Takeoff', description: 'Download a complete takeoff list instantly.' },
];

const benefits = [
  { title: 'Finish Takeoffs in Under 2 Seconds/Page', description: 'Replace 15\u201330+ minutes of manual counting per sheet with AI that processes a full page in under 2 seconds.' },
  { title: '99.2% of Symbols Found', description: 'Bidfast catches symbols that manual counting and simpler tools miss. Only 1 in 125 slips through.' },
  { title: 'Zero Training Required', description: 'Click any symbol on the legend and Bidfast finds every instance. No setup, no configuration, no waiting.' },
];

const workflowShots = [
  { step: '1', title: 'Drawing Upload' },
  { step: '2', title: 'Symbol Detection' },
  { step: '3', title: 'Quantity Counts' },
  { step: '4', title: 'Takeoff List' },
  { step: '5', title: 'Export & Review' },
];

const audiences = [
  {
    title: 'Electrical Estimators',
    description: 'Stop counting symbols by hand. Upload your drawings and get accurate takeoff lists in minutes instead of hours.',
    Icon: HardHat,
  },
  {
    title: 'Electrical Contractors',
    description: 'Bid on more projects by cutting takeoff time dramatically. Purpose-built for Canadian commercial and industrial electrical work.',
    Icon: Building2,
  },
  {
    title: 'Estimating Managers',
    description: 'Standardize your takeoff process across your team. Every estimator gets the same accurate counts from the same drawings.',
    Icon: Users,
  },
];

const faqs = [
  {
    question: 'What is electrical takeoff software?',
    answer:
      'Electrical takeoff software automates the process of counting symbols on electrical drawings and generating a list of materials and quantities. Instead of counting receptacles, switches, and fixtures by hand, the software scans your PDF drawings and produces an accurate takeoff list in minutes.',
  },
  {
    question: 'How does Bidfast count symbols on electrical drawings?',
    answer:
      'Click on any symbol in the drawing legend \u2014 that\u2019s it. Bidfast checks each potential match five different ways before confirming it, combining image matching, PDF geometry analysis, text recognition, and AI verification. The whole process takes under 2 seconds per page.',
  },
  {
    question: 'Is Bidfast designed for Canadian electrical contractors?',
    answer:
      'Yes. Bidfast is built in Vancouver and our AI model is trained entirely on Canadian electrical drawing data. This means it recognizes the symbol conventions, drawing standards, and annotation styles used by Canadian electrical professionals.',
  },
  {
    question: 'How accurate is the AI symbol counting?',
    answer:
      'Bidfast finds 99.2% of symbols \u2014 that means it misses only about 1 in 125. On our toughest real-world test drawings, it produced zero false alarms and zero missed real symbols. You always have full control to review and adjust before exporting, and accuracy improves with every release.',
  },
  {
    question: 'What file formats does Bidfast accept?',
    answer:
      'Bidfast accepts PDF electrical drawings, the standard format used for blueprints in the Canadian electrical contracting industry. You can upload individual pages or full drawing sets.',
  },
  {
    question: 'How is Bidfast different from Countfire or Togal?',
    answer:
      'Three key differences: (1) Bidfast is purpose-built for Canadian electrical drawings \u2014 built in Vancouver, tested on real Canadian commercial projects. (2) Bidfast verifies each detection five different ways, so you get zero false alarms on busy drawings where simpler tools break down. (3) You just click a symbol on the legend \u2014 no model training, no uploading thousands of examples.',
  },
  {
    question: 'How is Bidfast different from Bluebeam or PlanSwift symbol counting?',
    answer:
      'Bluebeam and PlanSwift use basic template matching that can\u2019t handle rotated symbols and produces false counts on busy drawings. Bidfast automatically handles symbols at any rotation, and our multi-stage verification eliminated 100% of false counts on our hardest test drawings. Bidfast also reads the actual PDF geometry \u2014 not just the image \u2014 which makes it fundamentally more accurate on construction drawings.',
  },
  {
    question: 'Can Bidfast handle custom or unusual symbols?',
    answer:
      'Yes. Unlike AI tools that need to be pre-trained on specific symbol types, Bidfast works from a single example. Just click any symbol on the legend and it finds every instance across the sheet \u2014 including rotated, scaled, or symbols buried in dense linework. No retraining needed.',
  },
  {
    question: 'Is my drawing data secure?',
    answer:
      'Yes. We use enterprise-grade encryption for all uploads. Your proprietary drawings are never shared or used to train public models.',
  },
  {
    question: 'Does Bidfast integrate with estimating software like Accubid?',
    answer:
      'We are building export integrations for common estimating tools including Accubid and standard CSV/Excel formats. During beta, you can export your takeoff list and import it into your existing workflow.',
  },
];

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  description,
  align = 'left',
  className = '',
}) => (
  <div className={`${align === 'center' ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'} ${className}`}>
    <p className="mb-4 font-label text-[11px] font-black uppercase tracking-[0.28em] text-secondary">
      {kicker}
    </p>
    <h2 className="font-headline text-4xl font-black leading-[0.95] tracking-[-0.04em] text-primary md:text-6xl">
      {title}
    </h2>
    {description ? (
      <p className={`mt-5 text-base leading-relaxed text-on-surface-variant md:text-lg ${align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
        {description}
      </p>
    ) : null}
  </div>
);

export default function App() {
  const waitlistRef = useRef<HTMLDivElement>(null);
  const productDemoRef = useRef<HTMLElement>(null);
  const [useLightNavTheme, setUseLightNavTheme] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateNavTheme = () => {
      const section = productDemoRef.current;

      if (!section) {
        setUseLightNavTheme(false);
        return;
      }

      const navActivationLine = 96;
      const { top, bottom } = section.getBoundingClientRect();
      setUseLightNavTheme(top <= navActivationLine && bottom > navActivationLine);
    };

    const handleViewportChange = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateNavTheme);
    };

    updateNavTheme();
    window.addEventListener('scroll', handleViewportChange, { passive: true });
    window.addEventListener('resize', handleViewportChange);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleViewportChange);
      window.removeEventListener('resize', handleViewportChange);
    };
  }, []);

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="page-atmosphere absolute inset-0" />
        <div className="editorial-grid absolute right-[-8rem] top-[-4rem] hidden h-[36rem] w-[36rem] rounded-full opacity-60 lg:block" />
        <div className="absolute left-[-6rem] top-[28rem] hidden h-64 w-64 rounded-full bg-surface-tint/10 blur-3xl lg:block" />
      </div>

      <div className="relative z-10">
        <nav
          className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
            useLightNavTheme
              ? 'nav-glass border-outline-variant/25'
              : 'border-white/10 bg-primary/95 shadow-[0_14px_36px_rgba(0,30,64,0.18)]'
          }`}
        >
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <LogoIcon className={`h-8 w-auto ${useLightNavTheme ? 'text-primary' : 'text-white'}`} accentColor={useLightNavTheme ? '#e11d24' : undefined} />
            </a>
            <div
              className={`hidden items-center gap-8 font-headline text-sm font-semibold md:flex ${
                useLightNavTheme ? 'text-primary/70' : 'text-white/72'
              }`}
            >
              <a
                href="#how-it-works"
                className={`transition-colors ${useLightNavTheme ? 'hover:text-primary' : 'hover:text-white'}`}
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className={`transition-colors ${useLightNavTheme ? 'hover:text-primary' : 'hover:text-white'}`}
              >
                Pricing
              </a>
            </div>
            <button
              onClick={scrollToWaitlist}
              className={`rounded-xl px-6 py-3 font-headline text-sm font-black uppercase tracking-[0.14em] transition-all duration-200 hover:-translate-y-0.5 ${
                useLightNavTheme
                  ? 'signature-gradient text-on-primary'
                  : 'bg-white text-primary hover:bg-surface-container-lowest'
              }`}
            >
              Get Early Access
            </button>
          </div>
        </nav>

        <section className="overflow-hidden px-4 pb-24 pt-20 md:px-8 md:pt-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 px-2 lg:grid-cols-12 lg:px-6">
            <div className="lg:col-span-7">
              <FadeIn delay={0.1}>
                <h1 className="max-w-5xl font-headline text-[3.4rem] font-black leading-[0.9] tracking-[-0.06em] text-primary sm:text-[4.5rem] lg:text-[6.15rem]">
                  AUTOMATED ELECTRICAL
                  <span className="block text-secondary">TAKEOFFS</span>
                  <span className="block">FOR CANADIAN CONTRACTORS</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
                  Upload your electrical drawings and Bidfast counts every symbol automatically &mdash; under 2 seconds per page, finding 99.2% of symbols. No training required. Just click a symbol on the legend.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    onClick={scrollToWaitlist}
                    className="signature-gradient rounded-xl px-7 py-4 font-headline text-sm font-black uppercase tracking-[0.16em] text-on-primary transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Get Early Access
                  </button>
                  <a
                    href="#how-it-works"
                    className="ghost-border rounded-xl bg-surface-container-lowest px-7 py-4 font-headline text-sm font-black uppercase tracking-[0.16em] text-primary transition-colors hover:bg-surface-container-low"
                  >
                    See How It Works
                  </a>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <div className="ghost-border editorial-shadow rounded-2xl bg-surface-container-lowest p-5">
                    <p className="font-label text-[11px] font-black uppercase tracking-[0.24em] text-secondary">
                      Speed
                    </p>
                    <p className="mt-2 font-headline text-3xl font-black tracking-[-0.04em] text-primary">
                      &lt; 2 Seconds
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                      Full-page symbol detection in under 2 seconds &mdash; vs. 15&ndash;30 minutes of manual counting per sheet.
                    </p>
                  </div>
                  <div className="ghost-border editorial-shadow rounded-2xl bg-surface-container-lowest p-5">
                    <p className="font-label text-[11px] font-black uppercase tracking-[0.24em] text-secondary">
                      Recall
                    </p>
                    <p className="mt-2 font-headline text-3xl font-black tracking-[-0.04em] text-primary">
                      99.2%
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                      Misses only 1 symbol in 125. Finds what manual counting and simpler tools can&rsquo;t.
                    </p>
                  </div>
                  <div className="ghost-border editorial-shadow rounded-2xl bg-surface-container-lowest p-5">
                    <p className="font-label text-[11px] font-black uppercase tracking-[0.24em] text-secondary">
                      Setup
                    </p>
                    <p className="mt-2 font-headline text-3xl font-black tracking-[-0.04em] text-primary">
                      1 Click
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                      Click any symbol on the legend. No training, no configuration &mdash; results in seconds.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.25} className="lg:col-span-5">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="editorial-shadow ghost-border rounded-[2rem] bg-surface-container-lowest p-4"
              >
                <div className="preview-grid relative overflow-hidden rounded-[1.5rem] bg-surface-container-low p-6 md:p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-surface-tint/10" />
                  <div className="relative z-10">
                    <div className="mb-8 flex items-center justify-between">
                      <div>
                        <p className="font-label text-[11px] font-black uppercase tracking-[0.28em] text-secondary">
                          Takeoff Preview
                        </p>
                        <h3 className="mt-2 font-headline text-2xl font-black tracking-[-0.04em] text-primary">
                          From drawing to takeoff list, automatically.
                        </h3>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container"
                      >
                        <Play className="ml-1 h-7 w-7" />
                      </motion.div>
                    </div>
                    <div className="rounded-[1.25rem] bg-primary p-5 text-white">
                      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                          <p className="font-label text-[10px] font-black uppercase tracking-[0.24em] text-primary-fixed-dim">
                            Active Drawing Set
                          </p>
                          <p className="mt-2 font-headline text-xl font-black">Office Tower - Floor 3 Electrical</p>
                        </div>
                        <span className="rounded-full bg-white/10 px-3 py-1 font-label text-[10px] font-black uppercase tracking-[0.24em] text-secondary-container">
                          Counting Complete
                        </span>
                      </div>
                      <div className="space-y-3">
                        {[
                          '142 receptacles counted',
                          '87 light fixtures identified',
                          'Takeoff list generated',
                        ].map((item) => (
                          <div key={item} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                            <CheckIcon className="h-5 w-5 text-secondary-container" />
                            <span className="text-sm text-white/80">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[1.25rem] bg-white/70 p-4">
                        <p className="font-label text-[10px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                          Drawing Pages
                        </p>
                        <p className="mt-2 font-headline text-3xl font-black tracking-[-0.04em] text-primary">12</p>
                      </div>
                      <div className="rounded-[1.25rem] bg-white/70 p-4">
                        <p className="font-label text-[10px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                          Time to Takeoff
                        </p>
                        <p className="mt-2 font-headline text-3xl font-black tracking-[-0.04em] text-primary">04:27</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </section>

        <section className="bg-surface-container-low py-12">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <p className="font-label text-[11px] font-black uppercase tracking-[0.3em] text-on-surface-variant">
              Purpose-built for the Canadian electrical industry
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-8 md:gap-14">
              {trustSignals.map((signal, index) => (
                <motion.div
                  key={signal}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-full bg-surface-container-lowest px-5 py-2.5 font-label text-[11px] font-black uppercase tracking-[0.18em] text-primary ghost-border"
                >
                  {signal}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <SectionHeading
                kicker="The Manual Takeoff Problem"
                title={
                  <>
                    MANUAL TAKEOFFS ARE SLOW,
                    <br className="hidden md:block" />
                    <span className="text-secondary"> INCONSISTENT, AND COSTLY.</span>
                  </>
                }
                align="center"
              />
            </FadeIn>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {problemItems.map((item, index) => (
                <FadeIn key={item.title} delay={index * 0.12}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="editorial-shadow ghost-border h-full rounded-[1.75rem] bg-surface-container-lowest p-8"
                  >
                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-low text-primary">
                      <item.Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-headline text-2xl font-black tracking-[-0.03em] text-primary">{item.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-on-surface-variant">{item.description}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <SectionHeading
                kicker="How Bidfast Works"
                title={
                  <>
                    BIDFAST AUTOMATES THE
                    <br className="hidden md:block" />
                    <span className="text-secondary"> ENTIRE TAKEOFF PROCESS.</span>
                  </>
                }
                description="Upload your electrical drawings. Bidfast counts every symbol and delivers a structured takeoff list. You review, adjust, and export."
                align="center"
              />
            </FadeIn>
            <div className="mt-20 space-y-20">
              {solutionSteps.map((feature, index) => (
                <div
                  key={feature.step}
                  className={`grid items-center gap-10 lg:grid-cols-12 ${
                    feature.align === 'right' ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
                  }`}
                >
                  <FadeIn delay={index * 0.1} className="lg:col-span-5">
                    <div className="relative overflow-hidden rounded-[2rem] bg-surface-container-lowest p-8 editorial-shadow ghost-border md:p-10">
                      <p className="font-headline text-7xl font-black leading-none tracking-[-0.08em] text-primary-fixed">
                        {feature.step}
                      </p>
                      <p className="mt-6 font-label text-[11px] font-black uppercase tracking-[0.28em] text-secondary">
                        Step {feature.step}
                      </p>
                      <h3 className="mt-4 font-headline text-3xl font-black tracking-[-0.04em] text-primary md:text-4xl">
                        {feature.title}
                      </h3>
                      <p className="mt-4 max-w-lg text-lg leading-relaxed text-on-surface-variant">
                        {feature.description}
                      </p>
                    </div>
                  </FadeIn>
                  <FadeIn delay={index * 0.1 + 0.15} className="lg:col-span-7">
                    <div className="editorial-shadow ghost-border rounded-[2rem] bg-surface-container-lowest p-5">
                      <div className="preview-grid relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-surface-container-low p-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/45 via-transparent to-surface-tint/10" />
                        <div className="relative z-10 flex h-full flex-col justify-between">
                          <div className="flex items-start justify-between gap-6">
                            <div>
                              <p className="font-label text-[10px] font-black uppercase tracking-[0.24em] text-secondary">
                                Takeoff View {feature.step}
                              </p>
                              <p className="mt-2 max-w-sm font-headline text-2xl font-black tracking-[-0.04em] text-primary">
                                Symbol counts organized for estimator review.
                              </p>
                            </div>
                            <div className="rounded-full bg-secondary-container/20 px-4 py-2 font-label text-[10px] font-black uppercase tracking-[0.24em] text-on-secondary-container">
                              Review Ready
                            </div>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {['Symbols identified', 'Quantities tallied', 'Pages referenced', 'Export ready'].map((detail) => (
                              <div key={detail} className="rounded-xl bg-white/75 px-4 py-3 text-sm font-medium text-primary">
                                {detail}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <SectionHeading
                kicker="Process"
                title="HOW IT WORKS"
                description="Three steps to a complete electrical takeoff."
                align="center"
              />
            </FadeIn>
            <div className="relative mt-16 grid gap-8 md:grid-cols-3">
              <div className="section-divider absolute left-0 top-1/2 hidden w-full -translate-y-1/2 md:block" />
              {processSteps.map((step, index) => (
                <FadeIn key={step.num} delay={index * 0.12} className="relative">
                  <div className="editorial-shadow ghost-border relative z-10 h-full rounded-[1.75rem] bg-surface-container-lowest p-8 text-center">
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-secondary-container font-headline text-xl font-black text-on-secondary-container">
                      {step.num}
                    </div>
                    <h3 className="font-headline text-2xl font-black tracking-[-0.03em] text-primary">{step.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-on-surface-variant">{step.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section ref={productDemoRef} className="bg-primary px-6 py-28 text-on-primary">
          <FadeIn className="mx-auto max-w-6xl text-center">
            <p className="mb-4 font-label text-[11px] font-black uppercase tracking-[0.28em] text-secondary-container">
              Product Demo
            </p>
            <h2 className="font-headline text-4xl font-black tracking-[-0.04em] md:text-6xl">
              SEE BIDFAST IN ACTION
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              Watch Bidfast count symbols across a full electrical drawing set and generate a takeoff list in under five minutes.
            </p>
            <div className="editorial-shadow mt-12 rounded-[2rem] border border-white/10 bg-white/5 p-5">
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/10">
                <div className="absolute inset-0 editorial-grid opacity-20" />
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container"
                >
                  <Play className="ml-1 h-10 w-10" />
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </section>

        <section className="px-6 py-20">
          <FadeIn className="mx-auto max-w-7xl">
            <SectionHeading
              kicker="Why Bidfast"
              title={
                <>
                  FASTER TAKEOFFS.
                  <br />
                  <span className="text-secondary">BETTER ACCURACY.</span>
                  <br />
                  MORE BIDS.
                </>
              }
            />
          </FadeIn>
          <div className="mx-auto mt-12 grid max-w-7xl grid-rows-3 gap-10 md:grid-cols-2 md:items-stretch">
            <div className="row-span-3 grid grid-rows-3 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="flex gap-4 rounded-2xl bg-surface-container-low px-5 py-4"
                >
                  <div className="mt-1">
                    <CheckIcon className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-headline text-lg font-black tracking-[-0.02em] text-primary">
                      {benefit.title}
                    </h4>
                    <p className="mt-1 text-base leading-relaxed text-on-surface-variant">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="row-span-3 grid grid-rows-3 gap-4">
              {[
                { value: '< 2s', label: 'Per-page detection time' },
                { value: '99.2%', label: 'Symbol detection accuracy' },
                { value: '22x', label: 'Accuracy improvement on the hardest symbols' },
              ].map((stat, index) => (
                <FadeIn
                  key={stat.label}
                  delay={0.18 + index * 0.08}
                  className="editorial-shadow ghost-border flex flex-col items-center justify-center rounded-[1.75rem] bg-surface-container-lowest p-6 text-center"
                >
                  <p className="font-headline text-3xl font-black tracking-[-0.05em] text-secondary md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-label text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                    {stat.label}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-surface-container-low py-28">
          <FadeIn className="mx-auto mb-14 max-w-7xl px-6">
            <SectionHeading kicker="Platform" title="THE TAKEOFF WORKFLOW" />
          </FadeIn>
          <div className="relative w-full overflow-hidden">
            <motion.div
              className="flex w-max gap-6 px-6"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
            >
              {[...workflowShots, ...workflowShots].map((shot, index) => (
                <div key={`${shot.step}-${index}`} className="w-[320px] shrink-0 md:w-[500px]">
                  <div className="editorial-shadow ghost-border rounded-[1.75rem] bg-surface-container-lowest p-4">
                    <div className="preview-grid relative mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.35rem] bg-surface-container-low">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-surface-tint/10" />
                      <p className="relative z-10 font-label text-[11px] font-black uppercase tracking-[0.26em] text-primary/60">
                        Workflow Step {shot.step}
                      </p>
                    </div>
                    <p className="font-label text-[10px] font-black uppercase tracking-[0.24em] text-secondary">
                      Step 0{shot.step}
                    </p>
                    <h4 className="mt-3 font-headline text-2xl font-black tracking-[-0.03em] text-primary">
                      {shot.title}
                    </h4>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <SectionHeading kicker="Audience" title="WHO IT'S FOR" align="center" />
            </FadeIn>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {audiences.map((audience, index) => (
                <FadeIn key={audience.title} delay={index * 0.12}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="editorial-shadow ghost-border h-full rounded-[1.75rem] bg-surface-container-lowest p-8"
                  >
                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-low text-primary">
                      <audience.Icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-headline text-2xl font-black tracking-[-0.03em] text-primary">{audience.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-on-surface-variant">{audience.description}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <SectionHeading kicker="Proven Results" title="ACCURACY YOU CAN COUNT ON." align="center" />
            </FadeIn>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                { number: '< 2s', label: 'Per Page', explanation: 'What used to take 15\u201330 minutes of manual counting now takes under 2 seconds per sheet.' },
                { number: '99.2%', label: 'Symbols Found', explanation: 'Only 1 in 125 symbols missed \u2014 virtually nothing slips through the cracks.' },
                { number: '0', label: 'False Alarms', explanation: 'On the hardest real-world test drawings, zero incorrect counts and zero missed symbols.' },
                { number: '610+', label: 'Real Symbols Tested', explanation: 'Accuracy verified against hundreds of hand-checked symbols from real commercial electrical drawings.' },
                { number: '24+', label: 'Tests Run', explanation: 'Every detection method rigorously tested and benchmarked against real commercial electrical drawings.' },
                { number: '1 Click', label: 'To Start Counting', explanation: 'Select any symbol from the legend. No training, no setup, no waiting. Results in seconds.' },
              ].map((stat, index) => (
                <FadeIn key={stat.label} delay={index * 0.08}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="editorial-shadow ghost-border h-full rounded-[1.75rem] bg-surface-container-lowest p-8"
                  >
                    <p className="font-headline text-4xl font-black tracking-[-0.05em] text-secondary md:text-5xl">
                      {stat.number}
                    </p>
                    <p className="mt-3 font-headline text-lg font-black tracking-[-0.02em] text-primary">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-on-surface-variant">
                      {stat.explanation}
                    </p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>


        <section id="pricing" className="px-6 py-28">
          <FadeIn className="mx-auto max-w-4xl text-center">
            <SectionHeading
              kicker="Early Access"
              title="EARLY ACCESS BETA"
              description="Free during beta. Upload your drawings and see results before you pay anything."
              align="center"
            />
            <div className="editorial-shadow ghost-border relative mt-14 rounded-[2rem] bg-surface-container-lowest p-10 md:p-14">
              <div className="absolute inset-x-10 top-0 h-1 rounded-full bg-secondary-container" />
              <p className="font-label text-[11px] font-black uppercase tracking-[0.26em] text-secondary">
                Beta Access
              </p>
              <div className="mt-6 font-headline text-6xl font-black tracking-[-0.05em] text-primary md:text-7xl">
                $0
                <span className="ml-2 text-2xl font-medium text-on-surface-variant">/mo</span>
              </div>
              <ul className="mx-auto mt-10 max-w-md space-y-4 text-left">
                {['AI Symbol Counting', 'Unlimited Drawing Uploads', 'Takeoff List Export', 'Priority Support'].map((feature) => (
                  <li key={feature} className="flex gap-3 rounded-2xl bg-surface-container-low px-5 py-4">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                    <span className="text-base text-primary">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToWaitlist}
                className="signature-gradient mt-10 w-full rounded-xl px-8 py-5 font-headline text-sm font-black uppercase tracking-[0.16em] text-on-primary transition-transform duration-200 hover:-translate-y-0.5"
              >
                Join the Beta
              </button>
            </div>
          </FadeIn>
        </section>

        <section className="px-6 py-28">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <SectionHeading kicker="Questions" title="FAQS" align="center" />
            </FadeIn>
            <div className="mt-14 space-y-4">
              {faqs.map((faq, index) => (
                <FadeIn key={faq.question} delay={index * 0.06}>
                  <details className="editorial-shadow ghost-border group rounded-[1.5rem] bg-surface-container-lowest p-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-headline text-lg font-black tracking-[-0.02em] text-primary">
                      {faq.question}
                      <ChevronDown className="h-5 w-5 shrink-0 text-secondary transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <p className="mt-4 border-t border-outline-variant/25 pt-4 text-base leading-relaxed text-on-surface-variant">
                      {faq.answer}
                    </p>
                  </details>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-primary px-6 py-32 text-on-primary">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(252,212,0,0.14),transparent_22%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
          <FadeIn className="relative z-10 mx-auto max-w-5xl text-center">
            <p className="mb-4 font-label text-[11px] font-black uppercase tracking-[0.28em] text-secondary-container">
              Final Call
            </p>
            <h2 className="font-headline text-5xl font-black tracking-[-0.05em] md:text-7xl">
              START YOUR TAKEOFFS <span className="text-secondary-container">FASTER.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Join the Bidfast beta. Upload your first drawing set and see results in minutes. No credit card required.
            </p>
            <div ref={waitlistRef} id="waitlist" className="mt-14 scroll-mt-24">
              <WaitlistForm />
            </div>
          </FadeIn>
        </section>

        <footer className="bg-surface-container-low px-6 pb-8 pt-16">
          <div className="mx-auto grid max-w-7xl gap-12 border-b border-outline-variant/25 pb-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <LogoIcon className="h-8 w-auto text-primary" accentColor="#e11d24" />
              <p className="mt-6 text-sm leading-relaxed text-on-surface-variant">
                © 2026 COGNITIVE COMPUTER SYSTEMS
                <br />
                VANCOUVER, BC, CANADA
              </p>
            </div>
            <div>
              <h4 className="font-label text-[11px] font-black uppercase tracking-[0.24em] text-secondary">Product</h4>
              <ul className="mt-6 space-y-4 text-sm text-on-surface-variant">
                <li>
                  <a href="#how-it-works" className="transition-colors hover:text-primary">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="transition-colors hover:text-primary">
                    Pricing
                  </a>
                </li>
                <li>
                  <button onClick={scrollToWaitlist} className="transition-colors hover:text-primary">
                    Demo
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-label text-[11px] font-black uppercase tracking-[0.24em] text-secondary">Company</h4>
              <ul className="mt-6 space-y-4 text-sm text-on-surface-variant">
                <li>
                  <a href="https://www.ccsystems.ai/#/about" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-label text-[11px] font-black uppercase tracking-[0.24em] text-secondary">Legal</h4>
              <ul className="mt-6 space-y-4 text-sm text-on-surface-variant">
                <li>
                  <a href="https://www.ccsystems.ai/#/privacy" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://www.ccsystems.ai/#/terms" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
