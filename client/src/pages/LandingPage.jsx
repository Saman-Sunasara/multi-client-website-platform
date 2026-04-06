import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  LayoutDashboard, Layers, Zap, Server, ShieldCheck,
  ArrowRight, Github, Globe, Mail, CheckCircle, ChevronRight
} from 'lucide-react';

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] } }),
};

const FadeSection = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      custom={delay} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
const Navbar = ({ user }) => (
  <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', background: 'rgba(9,9,11,0.8)' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LayoutDashboard size={15} color="white" />
        </div>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff' }}>ClientOS</span>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }} className="hidden md:flex">
        {['Features', 'Dashboard', 'Tech Stack'].map(item => (
          <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
            style={{ fontSize: '0.875rem', color: '#71717a', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = '#71717a'}>
            {item}
          </a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {user ? (
          <Link to="/dashboard" style={{ padding: '0.45rem 1.1rem', borderRadius: '8px', background: '#6366f1', color: '#fff', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
            Dashboard
          </Link>
        ) : (
          <>
            <Link to="/login" style={{ fontSize: '0.875rem', color: '#a1a1aa', textDecoration: 'none' }}>Sign in</Link>
            <Link to="/register" style={{ padding: '0.45rem 1.1rem', borderRadius: '8px', background: '#6366f1', color: '#fff', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 0 0 1px rgba(99,102,241,0.5)' }}>
              Get Started
            </Link>
          </>
        )}
      </div>
    </div>
  </nav>
);

/* ─────────────────────────────────────────
   HERO — DASHBOARD MOCKUP
───────────────────────────────────────── */
const DashboardMockup = () => (
  <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 80px rgba(0,0,0,0.6)', background: '#0d0d0f' }}>
    {/* Top bar */}
    <div style={{ padding: '10px 16px', background: '#111113', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '6px' }}>
      {['#ef4444','#f59e0b','#22c55e'].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
      <div style={{ flex: 1, height: '20px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)', margin: '0 12px', display: 'flex', alignItems: 'center', paddingLeft: '8px' }}>
        <span style={{ fontSize: '10px', color: '#52525b' }}>clientos.app/dashboard</span>
      </div>
    </div>
    {/* Dashboard body */}
    <div style={{ display: 'flex', height: '280px' }}>
      {/* Sidebar */}
      <div style={{ width: '140px', background: '#0a0a0c', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '12px 8px', flexShrink: 0 }}>
        <div style={{ marginBottom: '16px', padding: '0 8px' }}>
          <div style={{ fontSize: '9px', color: '#52525b', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Workspace</div>
          {[{label:'Dashboard',active:true},{label:'Clients',active:false},{label:'Projects',active:false},{label:'Analytics',active:false},{label:'Settings',active:false}].map(({label,active}) => (
            <div key={label} style={{ padding: '5px 8px', borderRadius: '6px', marginBottom: '2px', background: active ? 'rgba(99,102,241,0.15)' : 'transparent', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: active ? '#6366f1' : '#3f3f46' }} />
              <span style={{ fontSize: '10px', color: active ? '#a5b4fc' : '#71717a', fontWeight: active ? 600 : 400 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Main content */}
      <div style={{ flex: 1, padding: '14px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#e4e4e7' }}>Client Projects</span>
          <div style={{ padding: '3px 8px', borderRadius: '6px', background: '#6366f1', fontSize: '9px', color: '#fff', fontWeight: 600 }}>+ New</div>
        </div>
        {/* Client cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
          {[
            { name: 'Client A', color: '#6366f1', status: 'Live', lang: 'React' },
            { name: 'Client B', color: '#8b5cf6', status: 'Building', lang: 'Next.js' },
            { name: 'Client C', color: '#06b6d4', status: 'Live', lang: 'Vite' },
          ].map(client => (
            <div key={client.name} style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '10px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: client.color, marginBottom: '6px', opacity: 0.9 }} />
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#e4e4e7', marginBottom: '3px' }}>{client.name}</div>
              <div style={{ fontSize: '8px', color: '#71717a', marginBottom: '6px' }}>{client.lang}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '2px 6px', borderRadius: '4px', background: client.status === 'Live' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: client.status === 'Live' ? '#22c55e' : '#f59e0b' }} />
                <span style={{ fontSize: '8px', color: client.status === 'Live' ? '#22c55e' : '#f59e0b', fontWeight: 600 }}>{client.status}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Activity */}
        <div style={{ fontSize: '10px', fontWeight: 700, color: '#e4e4e7', marginBottom: '8px' }}>Recent Activity</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {['Client A deployed v2.4', 'Client B build started', 'Client C SSL renewed'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 8px', borderRadius: '6px', background: '#111113', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: ['#6366f1','#f59e0b','#22c55e'][i], flexShrink: 0 }} />
              <span style={{ fontSize: '9px', color: '#71717a' }}>{item}</span>
              <span style={{ marginLeft: 'auto', fontSize: '8px', color: '#3f3f46' }}>{['2m ago','5m ago','1h ago'][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────── */
const Hero = ({ user }) => (
  <section style={{ paddingTop: '140px', paddingBottom: '100px', padding: '140px 1.5rem 100px' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="hero-grid">
        {/* Left */}
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px 4px 6px', borderRadius: '9999px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', marginBottom: '24px' }}>
              <span style={{ padding: '2px 8px', borderRadius: '9999px', background: '#6366f1', fontSize: '11px', fontWeight: 700, color: '#fff' }}>NEW</span>
              <span style={{ fontSize: '12px', color: '#a5b4fc' }}>Multi-client deployment v2.0</span>
              <ChevronRight size={12} color="#6366f1" />
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
            style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 800, lineHeight: 1.15, color: '#fafafa', marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
            Manage Multiple Client Websites from{' '}
            <span style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              One Powerful Dashboard
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }}
            style={{ fontSize: '1.05rem', color: '#71717a', lineHeight: 1.75, marginBottom: '2.25rem', maxWidth: '480px' }}>
            Create, manage, and scale client projects effortlessly. Built for developers, agencies, and freelancers who ship fast.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.24 }}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.7rem 1.5rem', borderRadius: '10px', background: '#6366f1', color: '#fff', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 0 0 1px rgba(99,102,241,0.4), 0 8px 24px rgba(99,102,241,0.3)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#818cf8'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#6366f1'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              Get Started <ArrowRight size={16} />
            </Link>
            <a href="#dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.7rem 1.5rem', borderRadius: '10px', background: 'transparent', color: '#e4e4e7', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}>
              View Demo
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['Built for Developers', 'Scalable Architecture', 'Fast Deployment'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={14} color="#6366f1" />
                <span style={{ fontSize: '0.8rem', color: '#71717a', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Dashboard mockup */}
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-30px', left: '-30px', right: '-30px', bottom: '-30px', background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DashboardMockup />
          </div>
        </motion.div>
      </div>
    </div>

    <style>{`
      @media (max-width: 768px) {
        .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
      }
    `}</style>
  </section>
);

/* ─────────────────────────────────────────
   LOGOS / SOCIAL PROOF
───────────────────────────────────────── */
const SocialProof = () => (
  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 1.5rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '0.75rem', color: '#52525b', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>Trusted stack</span>
      {['React', 'Node.js', 'MongoDB', 'Vercel', 'Render'].map(tech => (
        <span key={tech} style={{ fontSize: '0.875rem', color: '#3f3f46', fontWeight: 600, letterSpacing: '-0.01em' }}>{tech}</span>
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────
   FEATURES SECTION
───────────────────────────────────────── */
const features = [
  { icon: <LayoutDashboard size={22} />, title: 'Multi-Client Dashboard', desc: 'Manage all client websites in one unified view. Switch context instantly without confusion.', color: '#6366f1' },
  { icon: <Layers size={22} />, title: 'Project Isolation', desc: 'Each client has their own isolated environment, credentials, and portfolio data.', color: '#8b5cf6' },
  { icon: <Zap size={22} />, title: 'Fast Deployment', desc: 'Push changes and deploy instantly. Built on modern infrastructure for zero lag.', color: '#06b6d4' },
  { icon: <Server size={22} />, title: 'Scalable Backend', desc: 'RESTful API built with Node.js and MongoDB. Ready to handle thousands of clients.', color: '#f59e0b' },
  { icon: <ShieldCheck size={22} />, title: 'Authentication Ready', desc: 'JWT-based secure authentication system. Register, log in, and manage sessions safely.', color: '#22c55e' },
  { icon: <Globe size={22} />, title: 'Unique Public URLs', desc: 'Every client gets a shareable public portfolio at /p/:username — no extra setup.', color: '#ec4899' },
];

const Features = () => (
  <section id="features" style={{ padding: '100px 1.5rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <FadeSection style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '9999px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', fontSize: '12px', color: '#a5b4fc', fontWeight: 600, marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Features
        </div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fafafa', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
          Everything you need to run a client business
        </h2>
        <p style={{ fontSize: '1.05rem', color: '#71717a', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
          Stop juggling multiple tools. ClientOS gives you a complete platform to create, manage, and scale.
        </p>
      </FadeSection>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {features.map((f, i) => (
          <FadeSection key={f.title} delay={i % 3}>
            <div
              style={{ padding: '28px', borderRadius: '16px', background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.06)', cursor: 'default', transition: 'all 0.25s', height: '100%' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${f.color}40`; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${f.color}15`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${f.color}15`, border: `1px solid ${f.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px', color: f.color }}>
                {f.icon}
              </div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#e4e4e7', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#71717a', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          </FadeSection>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────
   DASHBOARD PREVIEW SECTION
───────────────────────────────────────── */
const DashboardPreview = () => (
  <section id="dashboard" style={{ padding: '80px 1.5rem', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <FadeSection style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '9999px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', fontSize: '12px', color: '#a5b4fc', fontWeight: 600, marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Product
        </div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fafafa', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
          See Everything in One Place
        </h2>
        <p style={{ fontSize: '1.05rem', color: '#71717a', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
          One dashboard. All your clients. Real-time status, fast navigation, clean UI.
        </p>
      </FadeSection>

      <FadeSection>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '-1px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.1) 50%, transparent)', zIndex: 0, pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, borderRadius: '18px', overflow: 'hidden', boxShadow: '0 60px 120px rgba(0,0,0,0.8)' }}>
            <DashboardMockup />
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '40px' }}>
          {[
            { label: 'Active Clients', value: '3+', desc: 'Manage unlimited clients' },
            { label: 'Deployment Time', value: '<1s', desc: 'Lightning fast updates' },
            { label: 'Uptime', value: '99.9%', desc: 'Reliable infrastructure' },
          ].map((stat, i) => (
            <div key={i} style={{ padding: '24px', borderRadius: '14px', background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 800, color: '#6366f1', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e4e4e7', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{ fontSize: '0.8rem', color: '#52525b' }}>{stat.desc}</div>
            </div>
          ))}
        </div>
      </FadeSection>
    </div>
  </section>
);

/* ─────────────────────────────────────────
   TECH STACK SECTION
───────────────────────────────────────── */
const techStack = [
  { name: 'React', desc: 'Frontend framework', color: '#61dafb', bg: 'rgba(97,218,251,0.08)', icon: '⚛' },
  { name: 'Node.js', desc: 'Backend runtime', color: '#68a063', bg: 'rgba(104,160,99,0.08)', icon: '🟢' },
  { name: 'MongoDB', desc: 'Database', color: '#00ed64', bg: 'rgba(0,237,100,0.08)', icon: '🍃' },
  { name: 'Express', desc: 'REST API', color: '#f0f0f0', bg: 'rgba(240,240,240,0.06)', icon: '⚡' },
  { name: 'Vercel', desc: 'Frontend hosting', color: '#fff', bg: 'rgba(255,255,255,0.06)', icon: '▲' },
  { name: 'Render', desc: 'Backend hosting', color: '#46e3b7', bg: 'rgba(70,227,183,0.08)', icon: '🚀' },
  { name: 'JWT', desc: 'Authentication', color: '#fb015b', bg: 'rgba(251,1,91,0.08)', icon: '🔐' },
  { name: 'Tailwind', desc: 'Styling', color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', icon: '🎨' },
];

const TechStack = () => (
  <section id="tech-stack" style={{ padding: '100px 1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <FadeSection style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '9999px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', fontSize: '12px', color: '#a5b4fc', fontWeight: 600, marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Tech Stack
        </div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fafafa', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
          Built with Modern Technologies
        </h2>
        <p style={{ fontSize: '1.05rem', color: '#71717a', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
          Industry-standard tools chosen for performance, scalability, and developer experience.
        </p>
      </FadeSection>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
        {techStack.map((tech, i) => (
          <FadeSection key={tech.name} delay={i * 0.05}>
            <div style={{ padding: '20px', borderRadius: '12px', background: tech.bg, border: `1px solid ${tech.color}20`, display: 'flex', alignItems: 'center', gap: '14px', transition: 'all 0.2s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.borderColor = `${tech.color}50`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = `${tech.color}20`; }}>
              <span style={{ fontSize: '1.5rem' }}>{tech.icon}</span>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: tech.color }}>{tech.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#52525b' }}>{tech.desc}</div>
              </div>
            </div>
          </FadeSection>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────
   CTA SECTION
───────────────────────────────────────── */
const CTA = () => (
  <section style={{ padding: '80px 1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
    <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
      <FadeSection>
        <div style={{ padding: '64px 40px', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.06))', border: '1px solid rgba(99,102,241,0.2)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(99,102,241,0.08)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(139,92,246,0.06)', pointerEvents: 'none' }} />

          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: '#fafafa', marginBottom: '12px', letterSpacing: '-0.03em', position: 'relative' }}>
            Start Managing Your Clients Smarter
          </h2>
          <p style={{ color: '#71717a', marginBottom: '32px', fontSize: '1rem', position: 'relative' }}>
            No setup. No complexity. Just sign up and go.
          </p>
          <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.8rem 2rem', borderRadius: '10px', background: '#6366f1', color: '#fff', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 0 0 1px rgba(99,102,241,0.5), 0 8px 32px rgba(99,102,241,0.4)', transition: 'all 0.2s', position: 'relative' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#818cf8'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#6366f1'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            Get Started Now <ArrowRight size={18} />
          </Link>
        </div>
      </FadeSection>
    </div>
  </section>
);

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
const Footer = () => (
  <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 1.5rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LayoutDashboard size={12} color="white" />
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#e4e4e7', fontSize: '0.9rem' }}>ClientOS</span>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a href="https://github.com/Saman-Sunasara/multi-client-website-platform" target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#71717a', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#e4e4e7'}
            onMouseLeave={e => e.currentTarget.style.color = '#71717a'}>
            <Github size={15} /> GitHub
          </a>
          <a href="https://multi-client-website-platform.vercel.app" target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#71717a', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#e4e4e7'}
            onMouseLeave={e => e.currentTarget.style.color = '#71717a'}>
            <Globe size={15} /> Live Site
          </a>
          <a href="mailto:samansunasara5@gmail.com"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#71717a', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#e4e4e7'}
            onMouseLeave={e => e.currentTarget.style.color = '#71717a'}>
            <Mail size={15} /> Contact
          </a>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <p style={{ fontSize: '0.8rem', color: '#3f3f46' }}>© 2026 ClientOS by Saman Sunasara. All rights reserved.</p>
        <p style={{ fontSize: '0.8rem', color: '#3f3f46' }}>Built with React · Node.js · MongoDB</p>
      </div>
    </div>
  </footer>
);

/* ─────────────────────────────────────────
   MAIN LANDING PAGE
───────────────────────────────────────── */
const LandingPage = ({ user }) => (
  <div style={{ minHeight: '100vh', background: '#09090b', color: '#e4e4e7' }}>
    <Navbar user={user} />
    <Hero user={user} />
    <SocialProof />
    <Features />
    <DashboardPreview />
    <TechStack />
    <CTA />
    <Footer />
  </div>
);

export default LandingPage;
