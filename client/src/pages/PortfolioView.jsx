import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, ExternalLink, Mail } from 'lucide-react';

const PortfolioView = () => {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const res = await api.get(`/user/public/${username}`);
        setData(res.data);
      } catch (err) {
        setError('Portfolio not found');
      }
      setLoading(false);
    };
    fetchPublicData();
  }, [username]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background text-indigo-400">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-background text-red-400">{error}</div>;

  const { displayName, bio, role, avatar, skills, projects, theme, socials } = data;
  const primaryColor = theme?.primaryColor || '#6366f1';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Inter'] selection:bg-indigo-500/30">
      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{ 
          background: `radial-gradient(circle at 20% 20%, ${primaryColor} 0%, transparent 40%), radial-gradient(circle at 80% 80%, ${primaryColor} 0%, transparent 40%)` 
        }}
      ></div>

      <div className="max-w-5xl mx-auto px-6 py-20 relative">
        {/* Header/Hero */}
        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          {avatar && (
            <img 
              src={avatar} 
              alt={displayName} 
              className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-slate-800 object-cover shadow-2xl"
              onError={(e) => e.target.style.display = 'none'}
            />
          )}
          <h1 className="text-5xl md:text-7xl font-bold font-['Outfit'] mb-4 tracking-tight" style={{ color: primaryColor }}>
            {displayName || username}
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light mb-8 max-w-2xl mx-auto">
            {role || 'AI/ML Engineer'}
          </p>
          <div className="flex justify-center gap-6">
            {socials?.github && <a href={socials.github} target="_blank" className="hover:scale-110 transition-transform"><Github className="w-6 h-6 hover:text-indigo-400" /></a>}
            {socials?.linkedin && <a href={socials.linkedin} target="_blank" className="hover:scale-110 transition-transform"><Linkedin className="w-6 h-6 hover:text-blue-500" /></a>}
            {socials?.twitter && <a href={socials.twitter} target="_blank" className="hover:scale-110 transition-transform"><Twitter className="w-6 h-6 hover:text-sky-400" /></a>}
            {socials?.instagram && <a href={socials.instagram} target="_blank" className="hover:scale-110 transition-transform"><Instagram className="w-6 h-6 hover:text-pink-500" /></a>}
          </div>
        </motion.header>

        {/* Bio Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-2xl font-bold mb-8 border-l-4 pl-4" style={{ borderColor: primaryColor }}>About Me</h2>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
            {bio || "Welcome to my portfolio! I'm a passionate developer building amazing experiences. Check out my work below."}
          </p>
        </motion.section>

        {/* Projects Grid */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-10 border-l-4 pl-4" style={{ borderColor: primaryColor }}>Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects?.map((proj, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 rounded-3xl hover:border-slate-700 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">{proj.title}</h3>
                  {proj.link && (
                    <a href={proj.link} target="_blank" className="text-slate-500 hover:text-indigo-400 transition-all p-2 rounded-full hover:bg-slate-800">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed min-h-[60px]">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                   {/* Tags can be added here */}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Footer */}
        <footer className="text-center pt-20 border-t border-slate-800">
          <p className="text-slate-500 mb-4">Want to work together?</p>
          <a 
            href={`mailto:${username}@example.com`} 
            className="text-2xl font-bold hover:underline"
            style={{ color: primaryColor }}
          >
            Get In Touch
          </a>
          <p className="mt-20 text-slate-700 text-xs tracking-widest uppercase">
            Powered by SaaS Portfolio Platform
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PortfolioView;
