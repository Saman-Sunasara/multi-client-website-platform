import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Layers, Zap, Server, ShieldCheck,
  ArrowRight, Github, Globe, Mail, CheckCircle, ChevronRight,
  Database, UserPlus, Send, Lock, Globe2, Cpu, BarChart3,
  MessageSquare, Star, Plus, Minus
} from 'lucide-react';

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } 
  }),
};

const FadeSection = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      custom={delay} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────── */

const Navbar = ({ user }) => (
  <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/[0.06] backdrop-blur-xl bg-[#09090b]/80">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <LayoutDashboard size={18} color="white" />
        </div>
        <span className="font-['Outfit'] font-bold text-xl tracking-tight text-white">ClientOS</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {['Features', 'Solution', 'Security', 'FAQ'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <Link to="/dashboard" className="btn-primary py-2 px-5 text-sm">
            Dashboard
          </Link>
        ) : (
          <>
            <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Sign in</Link>
            <Link to="/register" className="btn-primary py-2 px-5 text-sm">
              Get Started
            </Link>
          </>
        )}
      </div>
    </div>
  </nav>
);

const LogoBar = () => (
  <div className="mt-20 py-8 border-y border-white/[0.03]">
    <p className="text-center text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-8">
      Trusted by Teams at High-Growth Startups
    </p>
    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
      {['ACME CORP', 'GLOBAL TECH', 'PULSE AI', 'VERTEX', 'MODERN WEB', 'NEXUS'].map(logo => (
        <span key={logo} className="font-['Outfit'] font-black text-lg tracking-tighter text-zinc-400">{logo}</span>
      ))}
    </div>
  </div>
);

const DashboardMockup = () => (
  <div className="w-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_48px_128px_rgba(0,0,0,0.8)] bg-[#0d0d0f] relative group">
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent pointer-events-none" />
    {/* Browser Header */}
    <div className="px-4 py-3 bg-[#111113] border-b border-white/[0.06] flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 max-w-md mx-auto h-6 rounded-md bg-white/[0.03] border border-white/[0.05] flex items-center px-4">
        <Globe size={10} className="text-zinc-600 mr-2" />
        <span className="text-[10px] text-zinc-500">clientos.app/dashboard/main</span>
      </div>
    </div>
    
    <div className="flex aspect-[16/10]">
      {/* Sidebar */}
      <div className="w-48 bg-[#0a0a0c] border-r border-white/[0.05] p-5 hidden lg:block">
        <div className="w-full h-8 bg-white/[0.03] rounded-lg mb-8" />
        <div className="space-y-4">
          {[1,2,3,4,5].map(i => <div key={i} className="w-full h-3 bg-white/[0.03] rounded" />)}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 p-6 relative">
        <div className="flex justify-between items-center mb-8">
          <div className="w-32 h-6 bg-white/[0.05] rounded-md" />
          <div className="w-24 h-8 bg-indigo-500/20 border border-indigo-500/30 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="aspect-video bg-[#111113] border border-white/[0.05] rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-white/[0.03] mb-4" />
              <div className="w-full h-3 bg-white/[0.05] rounded mb-2" />
              <div className="w-2/3 h-2 bg-white/[0.03] rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const StepCard = ({ number, title, desc, icon: Icon }) => (
  <div className="relative p-8 rounded-2xl bg-zinc-900/40 border border-white/[0.05] hover:border-white/[0.1] transition-all group">
    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-indigo-500/20">
      {number}
    </div>
    <div className="mt-4 mb-6 w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-300">
      <Icon size={24} />
    </div>
    <h3 className="font-['Outfit'] font-bold text-xl text-white mb-3">{title}</h3>
    <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
  </div>
);

const FeatureDetail = ({ title, desc, icon: Icon, color }) => (
  <div className="p-10 rounded-[2rem] premium-border hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-500/5 transition-all" />
    <div className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg`} style={{ background: `linear-gradient(135deg, ${color}, transparent)`, boxShadow: `0 8px 16px -4px ${color}33` }}>
      <Icon size={28} />
    </div>
    <h3 className="font-['Outfit'] font-bold text-2xl text-white mb-4 leading-tight">{title}</h3>
    <p className="text-zinc-400 leading-relaxed mb-6">{desc}</p>
    <ul className="space-y-3">
      {['Enterprise security', 'Automated workflows', 'Real-time sync'].map(item => (
        <li key={item} className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
          <CheckCircle size={14} className="text-indigo-500" /> {item.toUpperCase()}
        </li>
      ))}
    </ul>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.04] py-6">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between text-left group">
        <span className="font-['Outfit'] font-bold text-lg text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{question}</span>
        {isOpen ? <Minus size={20} className="text-indigo-500" /> : <Plus size={20} className="text-zinc-600 group-hover:text-white" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden">
            <p className="pt-4 text-zinc-400 leading-relaxed max-w-3xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────
   SECTIONS
───────────────────────────────────────── */

const Hero = ({ user }) => (
  <section className="relative pt-40 pb-24 overflow-hidden px-6">
    {/* Decorative Orbs */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-screen pointer-events-none z-0">
      <div className="absolute top-[-10%] left-[10%] w-[40%] h-[60%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute top-[-5%] right-[10%] w-[35%] h-[55%] bg-violet-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
    </div>

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col items-center text-center mb-24">
        <FadeSection>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border-white/[0.08] mb-8 shadow-inner shadow-white/5">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="text-xs font-bold tracking-[0.1em] text-indigo-400 uppercase">Version 3.0 Live - Professional Suite</span>
          </div>
        </FadeSection>

        <FadeSection delay={1}>
          <h1 className="font-['Outfit'] font-black text-6xl md:text-8xl leading-[0.95] tracking-tighter text-white mb-8 max-w-4xl">
            Scale Your Agency with <br className="hidden md:block"/>
            <span className="text-gradient">Professional Infrastructure</span>
          </h1>
        </FadeSection>

        <FadeSection delay={2}>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
            The all-in-one platform for professional developers and agencies. Build, manage, and deploy client portfolios with enterprise-grade reliability and zero complexity.
          </p>
        </FadeSection>

        <FadeSection delay={3}>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link to="/register" className="btn-primary text-base font-bold px-10 py-5 rounded-2xl group">
              Start Free Trial <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#solution" className="glass px-10 py-5 rounded-2xl text-base font-bold text-white hover:bg-white/[0.05] transition-all">
              Watch Product Demo
            </a>
          </div>
        </FadeSection>

        <FadeSection delay={4}>
          <div className="mt-12 flex gap-8">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-amber-500" fill="currentColor" />
              <span className="text-sm font-bold text-zinc-500">4.9/5 RATING</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-500 border-l border-white/[0.1] pl-8">
              <ShieldCheck size={16} />
              <span className="text-sm font-bold">SOPS COMPLIANT</span>
            </div>
          </div>
        </FadeSection>
      </div>

      <FadeSection delay={5}>
        <div className="max-w-5xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-[2.2rem] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-1000" />
          <DashboardMockup />
        </div>
      </FadeSection>

      <LogoBar />
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="solution" className="py-32 px-6 bg-[#09090b]">
    <div className="max-w-7xl mx-auto">
      <FadeSection className="text-center mb-24">
        <h2 className="font-['Outfit'] font-black text-4xl md:text-5xl text-white mb-6 uppercase tracking-tight">The Professional Workflow</h2>
        <p className="text-zinc-500 max-w-xl mx-auto font-medium">Three simple steps to transform your agency operations from chaotic to enterprise-grade.</p>
      </FadeSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: UserPlus, title: 'Rapid Onboarding', desc: 'Deploy your instance in under 60 seconds with pre-configured schemas and professional themes.' },
          { icon: Server, title: 'Client Integration', desc: 'Securely map client projects and isolate environments with a single click. No DevOps required.' },
          { icon: Send, title: 'Instant Deployment', desc: 'Push your projects live to high-performance edge servers with automated SSL and monitoring.' }
        ].map((step, i) => (
          <FadeSection key={i} delay={i}>
            <StepCard number={i+1} {...step} />
          </FadeSection>
        ))}
      </div>
    </div>
  </section>
);

const SecuritySection = () => (
  <section id="security" className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2">
          <FadeSection>
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">
              Infrastructure
            </div>
            <h2 className="font-['Outfit'] font-black text-4xl md:text-5xl text-white mb-8 tracking-tight leading-none uppercase">
              Enterprise Grade <br/> Security & Speed
            </h2>
            <div className="space-y-8">
              {[
                { icon: Lock, title: 'Edge-Level Encryption', desc: 'All client data is encrypted at rest and in transit using bank-grade AES-256 protocols.' },
                { icon: Globe2, title: 'Global CDN Distribution', desc: 'Static assets are delivered from 120+ edge locations for sub-100ms response times.' },
                { icon: Database, title: 'Automatic Backups', desc: 'Daily automated snapshots of your database ensure your client data is never at risk.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-indigo-400 flex-shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-['Outfit'] font-bold text-lg text-white mb-1 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
        <div className="lg:w-1/2 relative">
          <FadeSection className="grid grid-cols-2 gap-4">
            {[Cpu, BarChart3, ShieldCheck, Mail].map((Icon, i) => (
              <div key={i} className="aspect-square rounded-3xl bg-zinc-900/40 border border-white/[0.05] flex items-center justify-center text-zinc-700 hover:text-indigo-400 hover:border-indigo-500/20 transition-all">
                <Icon size={48} strokeWidth={1} />
              </div>
            ))}
          </FadeSection>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-32 px-6 bg-[#09090b]">
    <div className="max-w-7xl mx-auto">
      <FadeSection className="text-center mb-24">
        <h2 className="font-['Outfit'] font-black text-4xl md:text-5xl text-white mb-6 uppercase tracking-tight">Core Platform Features</h2>
        <p className="text-zinc-500 max-w-xl mx-auto font-medium">Tailored for organizations that demand total control and sophisticated styling.</p>
      </FadeSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureDetail icon={LayoutDashboard} title="Unified Control Center" desc="The central nervous system for your entire agency operation." color="#6366f1" />
        <FeatureDetail icon={Layers} title="Workspace Isolation" desc="Strict environment separation for maximum client privacy and security." color="#8b5cf6" />
        <FeatureDetail icon={Zap} title="Blink-Fast Pipelines" desc="Proprietary deployment engine optimized for ultra-low latency updates." color="#06b6d4" />
        <FeatureDetail icon={Globe} title="Global Scale API" desc="A high-performance RESTful backbone that handles thousands of requests per second." color="#22c55e" />
        <FeatureDetail icon={ShieldCheck} title="Advanced Role Access" desc="Granular permissions to control exactly who sees what in your dashboard." color="#f59e0b" />
        <FeatureDetail icon={MessageSquare} title="Client Portal Support" desc="Automated white-label public portfolios with professional UI/UX styling." color="#ec4899" />
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="font-['Outfit'] font-black text-4xl md:text-5xl text-white mb-6 uppercase tracking-tight text-gradient">The Professional Choice</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { name: 'Sarah Jenkins', role: 'CTO @ Nexus Web', quote: "ClientOS transformed our internal operations. We went from managing 5 clients with friction to 50+ clients with zero overhead. The professional tech stack is unmatched." },
          { name: 'David Chen', role: 'Creative Director', quote: "I needed a platform that didn't look like a template. ClientOS provides the high-end SaaS aesthetic my clients expect while keeping my developer workflow intact." }
        ].map((t, i) => (
          <FadeSection key={i} className="p-10 rounded-3xl bg-zinc-900/40 border border-white/[0.05] relative">
            <Star className="text-indigo-500 mb-6" fill="currentColor" size={24} />
            <p className="text-xl text-white font-medium italic mb-8 leading-relaxed">"{t.quote}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600" />
              <div>
                <h4 className="font-bold text-white uppercase tracking-tight">{t.name}</h4>
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          </FadeSection>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section id="faq" className="py-32 px-6 bg-[#09090b]">
    <div className="max-w-3xl mx-auto">
      <FadeSection className="mb-20">
        <h2 className="font-['Outfit'] font-black text-4xl md:text-5xl text-white mb-6 uppercase tracking-tight text-center">Frequently Asked</h2>
      </FadeSection>
      <div className="space-y-4">
        <FAQItem question="IS DATA ISOLATION GUARANTEED?" answer="Yes. Every client environment is logically isolated at the database and application levels, ensuring that data cross-contamination is impossible." />
        <FAQItem question="CAN I USE A CUSTOM DOMAIN?" answer="Standard accounts use the /p/:username format. Enterprise plans support full white-labeled custom domains for all public portfolios." />
        <FAQItem question="HOW FAST ARE THE SERVERS?" answer="Our core infrastructure is built on Node.js and MongoDB, with static assets delivered via a global CDN. Average page load as per Lighthouse is 98+." />
        <FAQItem question="WHAT IS THE STORAGE LIMIT?" answer="Standard plans include 50GB of project media storage. Enterprise clients can upgrade to unlimited storage as needed." />
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-32 px-6">
    <div className="max-w-5xl mx-auto">
      <div className="relative p-16 md:p-24 rounded-[3rem] bg-gradient-to-br from-indigo-600 to-violet-800 overflow-hidden shadow-2xl shadow-indigo-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 text-center flex flex-col items-center">
          <h2 className="font-['Outfit'] font-black text-5xl md:text-7xl text-white mb-8 leading-none tracking-tighter uppercase italic">
            Stop Tinkering. <br/> Start Shipping.
          </h2>
          <p className="text-white/80 text-xl font-medium max-w-xl mb-12">
            Join 2,000+ top-tier agencies and freelancers building on the most professional client management platform available.
          </p>
          <Link to="/register" className="bg-white text-indigo-700 font-black text-lg px-12 py-6 rounded-2xl shadow-2xl hover:bg-zinc-100 transition-all scale-110">
            GET STARTED NOW
          </Link>
          <p className="mt-8 text-white/40 text-xs font-black uppercase tracking-[0.2em]">NO CREDIT CARD REQUIRED · INSTANT DEPLOY</p>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="pt-32 pb-16 px-6 border-t border-white/[0.03]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <LayoutDashboard size={18} color="white" />
            </div>
            <span className="font-['Outfit'] font-bold text-xl tracking-tight text-white">ClientOS</span>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed font-medium mb-8">
            The high-end ecosystem for professional developers and agencies managing multiple client projects at scale.
          </p>
        </div>
        
        {[
          { title: 'Product', links: ['Features', 'Security', 'FAQ', 'API Docs'] },
          { title: 'Company', links: ['About', 'Blog', 'Careers', 'Brand'] },
          { title: 'Social', links: ['GitHub', 'Twitter', 'LinkedIn', 'Instagram'] }
        ].map((group, i) => (
          <div key={i}>
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8">{group.title}</h4>
            <ul className="space-y-4">
              {group.links.map(link => (
                <li key={link}><a href="#" className="text-sm font-semibold text-zinc-500 hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="pt-12 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] font-black text-zinc-600 tracking-widest uppercase">© 2026 ClientOS Infrastructure Group · All Rights Reserved</p>
        <div className="flex gap-10">
          {['Privacy Policy', 'Terms of Service', 'Cookies'].map(link => (
            <a key={link} href="#" className="text-[10px] font-black text-zinc-600 hover:text-white uppercase tracking-widest">{link}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

const LandingPage = ({ user }) => (
  <div className="min-h-screen">
    <Navbar user={user} />
    <Hero user={user} />
    <HowItWorks />
    <SecuritySection />
    <Features />
    <Testimonials />
    <FAQ />
    <FinalCTA />
    <Footer />
  </div>
);

export default LandingPage;
