import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

// Inline SVG social icons (no brand icons in lucide v1)
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

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

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020817', color: '#6366f1' }}>
      Loading...
    </div>
  );
  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020817', color: '#f87171' }}>
      {error}
    </div>
  );

  const { displayName, bio, role, avatar, projects, theme, socials } = data;
  const primaryColor = theme?.primaryColor || '#6366f1';

  return (
    <div style={{ minHeight: '100vh', background: '#020817', color: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      {/* Dynamic background blobs */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.15,
        background: `radial-gradient(circle at 20% 20%, ${primaryColor} 0%, transparent 40%), radial-gradient(circle at 80% 80%, ${primaryColor} 0%, transparent 40%)`
      }}/>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '5rem 1.5rem', position: 'relative' }}>
        {/* Hero */}
        <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '6rem' }}>
          {avatar && (
            <img src={avatar} alt={displayName}
              style={{ width: '8rem', height: '8rem', borderRadius: '9999px', margin: '0 auto 2rem', objectFit: 'cover', border: `4px solid ${primaryColor}40` }}
              onError={(e) => e.target.style.display = 'none'}
            />
          )}
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: primaryColor, marginBottom: '1rem' }}>
            {displayName || username}
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2rem' }}>{role || 'Creator'}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', color: '#64748b' }}>
            {socials?.github && (
              <a href={socials.github} target="_blank" rel="noopener noreferrer"
                style={{ color: '#64748b', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = primaryColor}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
                <GithubIcon />
              </a>
            )}
            {socials?.linkedin && (
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
                style={{ color: '#64748b', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
                <LinkedinIcon />
              </a>
            )}
            {socials?.twitter && (
              <a href={socials.twitter} target="_blank" rel="noopener noreferrer"
                style={{ color: '#64748b', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
                <TwitterIcon />
              </a>
            )}
            {socials?.instagram && (
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer"
                style={{ color: '#64748b', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#f472b6'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
                <InstagramIcon />
              </a>
            )}
          </div>
        </motion.header>

        {/* Bio */}
        {bio && (
          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif', marginBottom: '1.5rem', paddingLeft: '1rem', borderLeft: `4px solid ${primaryColor}` }}>
              About Me
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.8 }}>{bio}</p>
          </motion.section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <section style={{ marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif', marginBottom: '2rem', paddingLeft: '1rem', borderLeft: `4px solid ${primaryColor}` }}>
              Featured Projects
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {projects.map((proj, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                  style={{ background: 'rgba(30,41,59,0.4)', border: '1px solid rgba(51,65,85,0.4)', borderRadius: '1.25rem', padding: '2rem', transition: 'border-color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${primaryColor}60`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(51,65,85,0.4)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f1f5f9' }}>{proj.title}</h3>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ color: '#64748b' }}
                        onMouseEnter={e => e.currentTarget.style.color = primaryColor}
                        onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>{proj.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        <footer style={{ textAlign: 'center', paddingTop: '4rem', borderTop: '1px solid rgba(51,65,85,0.3)' }}>
          <p style={{ color: '#1e293b', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Powered by SaaS Portfolio Platform
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PortfolioView;
