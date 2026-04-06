import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Globe, Zap, CheckCircle } from 'lucide-react';

const LandingPage = ({ user }) => {
  return (
    <div className="min-h-screen" style={{ background: 'transparent' }}>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass" style={{ borderBottom: '1px solid rgba(51,65,85,0.3)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', background: 'linear-gradient(to right, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            SaaS Portfolio
          </div>
          <div className="hidden md:flex gap-8 text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
          </div>
          <div>
            {user ? (
              <Link to="/dashboard" className="btn-primary">Dashboard</Link>
            ) : (
              <Link to="/login" className="btn-primary" style={{ padding: '0.6rem 1.8rem' }}>Get Started</Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block text-indigo-400"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)' }}>
              Now in Public Beta ✨
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-slate-100"
              style={{ fontFamily: 'Outfit, sans-serif' }}>
              Build Your Professional <br />
              <span style={{ background: 'linear-gradient(to right, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Portfolio in Minutes
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              The ultimate multi-client platform for designers, developers, and creators.
              Get a unique public URL, managed dashboard, and stunning UI out of the box.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="btn-primary text-lg" style={{ padding: '1rem 2.5rem' }}>
                Create Your Site
              </Link>
              <a href="#features" className="px-10 py-4 rounded-lg font-semibold transition-all text-slate-200"
                style={{ background: 'rgba(15,23,42,0.4)', border: '1px solid rgba(51,65,85,0.5)' }}>
                See Features
              </a>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 text-left">
            {[
              { icon: <Zap className="w-6 h-6" style={{ color: '#818cf8' }} />, title: "Instant Setup", desc: "Sign up and have your portfolio live in less than 60 seconds." },
              { icon: <Globe className="w-6 h-6" style={{ color: '#a78bfa' }} />, title: "Unique Public URL", desc: "Every user gets a shareable link at /p/:username — no domain needed." },
              { icon: <Shield className="w-6 h-6" style={{ color: '#60a5fa' }} />, title: "Secure & Fast", desc: "JWT authentication and bcrypt hashing keeps your account safe." }
            ].map((feature, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="glass-card p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: '#0f172a', border: '1px solid #334155' }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="about" className="py-20 px-6" style={{ borderTop: '1px solid rgba(30,41,59,0.5)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6 text-slate-100" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Manage Everything <br /> From One Dashboard
            </h2>
            <div className="space-y-4">
              {[
                "Update your bio, role, and social links instantly",
                "Showcase projects with descriptions and live links",
                "Pick your brand's primary color — it applies everywhere",
                "Share your portfolio via a clean, unique public URL",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#818cf8' }} />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <Link to="/register" className="btn-primary mt-8 inline-block">Get Started Free</Link>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="glass rounded-2xl shadow-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: 'rgba(15,23,42,0.8)', borderBottom: '1px solid rgba(51,65,85,0.5)' }}>
                <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }}></div>
                <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }}></div>
                <div className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }}></div>
                <span className="ml-4 text-xs text-slate-500">localhost:5173/dashboard</span>
              </div>
              <div className="p-8 flex flex-col gap-4" style={{ background: 'rgba(15,23,42,0.6)' }}>
                <div className="h-8 rounded" style={{ background: 'rgba(99,102,241,0.2)', width: '60%' }}></div>
                <div className="h-4 rounded" style={{ background: 'rgba(51,65,85,0.4)', width: '90%' }}></div>
                <div className="h-4 rounded" style={{ background: 'rgba(51,65,85,0.4)', width: '75%' }}></div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[1,2,3,4].map(n => (
                    <div key={n} className="h-20 rounded-xl" style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(51,65,85,0.4)' }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-slate-600 px-6" style={{ borderTop: '1px solid rgba(30,41,59,0.5)' }}>
        <p className="text-sm">© 2026 SaaS Portfolio Platform · Built for creators worldwide</p>
      </footer>
    </div>
  );
};

export default LandingPage;
