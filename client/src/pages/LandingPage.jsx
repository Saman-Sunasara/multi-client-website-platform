import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Shield, Globe, Zap, CheckCircle } from 'lucide-react';

const LandingPage = ({ user }) => {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-slate-700/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold font-['Outfit'] bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            SaaS Portfolio
          </div>
          <div className="space-x-8 hidden md:flex">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          </div>
          <div>
            {user ? (
              <Link to="/dashboard" className="btn-primary">Dashboard</Link>
            ) : (
              <Link to="/login" className="btn-primary px-8">Get Started</Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm font-medium mb-6 inline-block">
              Now in Public Beta
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Build Your Professional <br />
              <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">Portfolio in Minutes</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              The ultimate multi-client platform for designers, developers, and creators.
              Get a unique public URL, managed dashboard, and stunning UI out of the box.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="btn-primary text-lg px-10 py-4">Create Your Site</Link>
              <button className="px-10 py-4 glass rounded-lg font-semibold hover:bg-slate-800 transition-all">View Examples</button>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 text-left">
            {[
              { icon: <Zap className="text-indigo-500" />, title: "Instant Setup", desc: "Sign up and have your landing page live in less than 60 seconds." },
              { icon: <Globe className="text-violet-500" />, title: "Custom Domain", desc: "Get a unique /p/:username URL or connect your own personal domain." },
              { icon: <Shield className="text-blue-500" />, title: "Secure & Fast", desc: "Hosted on high-speed servers with top-tier security for your data." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-6 border border-slate-700">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Manage Everything <br /> From One Dashboard</h2>
            <div className="space-y-4">
              {[
                "Update your bio and social links instantly",
                "Add your best projects with tags and links",
                "Customize colors and fonts to match your brand",
                "Detailed analytics on your profile visitors"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="text-indigo-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="glass aspect-video rounded-2xl p-4 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full translate-x-1/2 translate-y-1/2"></div>
                <div className="relative h-full w-full bg-slate-900/50 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center text-slate-500 text-sm">
                   [ Modern Dashboard Preview ]
                </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-slate-500 border-t border-slate-800/50 px-6">
        <p>© 2026 SaaS Portfolio Platform. Built for creators.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
