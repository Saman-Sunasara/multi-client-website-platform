import React, { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { Save, LogOut, ExternalLink, Plus, Trash2, Layout, User as UserIcon, Briefcase, Share2 } from 'lucide-react';

const Dashboard = ({ user, setUser }) => {
  const normalize = (u) => ({
    ...u,
    displayName: u?.displayName || '',
    bio: u?.bio || '',
    role: u?.role || '',
    avatar: u?.avatar || '',
    projects: u?.projects || [],
    theme: u?.theme || { primaryColor: '#6366f1', darkMode: true },
    socials: u?.socials || { github: '', linkedin: '', twitter: '', instagram: '' },
  });

  const [formData, setFormData] = useState(() => normalize(user));
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setFormData(normalize(user));
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      const res = await api.put('/user/profile', formData);
      setUser(res.data);
      setMsg('Profile updated successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setMsg('Failed to update profile.');
    }
    setSaving(false);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: '', description: '', link: '', tags: [] }]
    });
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const publicUrl = `${window.location.origin}/p/${user.username}`;

  return (
    <div className="min-h-screen bg-transparent pb-20">
      {/* Header */}
      <header className="glass border-b border-slate-700/30 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold" style={{ background: 'linear-gradient(to right, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Creator Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleSave} 
              disabled={saving}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button onClick={logout} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-all">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Sidebar: Sidebar & Global Settings */}
        <div className="lg:col-span-1 space-y-6">
          <section className="glass-card p-6 rounded-2xl">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Share2 size={18} className="text-indigo-400" /> Public Link
            </h2>
            <div className="bg-slate-900 rounded-lg p-3 border border-slate-700 flex items-center justify-between mb-4">
              <span className="text-sm text-slate-400 truncate">{publicUrl}</span>
              <a href={publicUrl} target="_blank" className="text-indigo-400 hover:text-indigo-300">
                <ExternalLink size={16} />
              </a>
            </div>
            {msg && <p className="text-green-400 text-sm font-medium animate-pulse">{msg}</p>}
          </section>

          <section className="glass-card p-6 rounded-2xl">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Layout size={18} className="text-indigo-400" /> Theme & Identity
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase text-slate-500 font-bold mb-1 block">Avatar URL</label>
                <input 
                  type="text" 
                  className="input-field py-2 text-sm" 
                  value={formData.avatar || ''} 
                  onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs uppercase text-slate-500 font-bold mb-1 block">Primary Color</label>
                <input 
                  type="color" 
                  className="w-full h-10 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer" 
                  value={formData.theme.primaryColor} 
                  onChange={(e) => setFormData({...formData, theme: {...formData.theme, primaryColor: e.target.value} })}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Center: Main Content Form */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Profile Section */}
          <section className="glass-card p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <UserIcon size={20} className="text-indigo-400" /> Profile Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Display Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={formData.displayName || ''} 
                  onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Role/Tagline</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={formData.role || ''} 
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Short Bio</label>
              <textarea 
                rows="4" 
                className="input-field" 
                value={formData.bio || ''} 
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              />
            </div>
          </section>

          {/* Projects Section */}
          <section className="glass-card p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Briefcase size={20} className="text-indigo-400" /> Featured Projects
              </h2>
              <button 
                onClick={addProject}
                className="text-sm bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-2 border border-slate-700 transition-all"
              >
                <Plus size={16} /> Add Project
              </button>
            </div>
            
            <div className="space-y-6">
              {formData.projects.map((proj, i) => (
                <div key={i} className="p-6 bg-slate-900/50 rounded-xl border border-slate-700/50 relative group">
                  <button 
                    onClick={() => removeProject(i)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-slate-500 uppercase block mb-1">Project Title</label>
                      <input 
                        type="text" 
                        className="bg-slate-800/80 border border-slate-700/50 rounded px-2 py-1.5 w-full text-sm outline-none focus:border-indigo-500 transition-all" 
                        value={proj.title} 
                        onChange={(e) => handleProjectChange(i, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 uppercase block mb-1">Link</label>
                      <input 
                        type="text" 
                        className="bg-slate-800/80 border border-slate-700/50 rounded px-2 py-1.5 w-full text-sm outline-none focus:border-indigo-500 transition-all" 
                        value={proj.link} 
                        onChange={(e) => handleProjectChange(i, 'link', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase block mb-1">Description</label>
                    <textarea 
                      rows="2" 
                      className="bg-slate-800/80 border border-slate-700/50 rounded px-2 py-1.5 w-full text-sm outline-none focus:border-indigo-500 transition-all" 
                      value={proj.description} 
                      onChange={(e) => handleProjectChange(i, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              {formData.projects.length === 0 && (
                <div className="text-center py-10 text-slate-500 italic">No projects added yet. Click 'Add Project' to showcase your work.</div>
              )}
            </div>
          </section>

          {/* Socials Section */}
          <section className="glass-card p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Share2 size={20} className="text-indigo-400" /> Connect Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['github', 'linkedin', 'twitter', 'instagram'].map(s => (
                <div key={s}>
                  <label className="text-xs uppercase text-slate-500 font-bold mb-1 block capitalize">{s}</label>
                  <input 
                    type="text" 
                    className="input-field py-2 text-sm" 
                    placeholder={`https://${s}.com/your-id`}
                    value={(formData.socials || {})[s] || ''} 
                    onChange={(e) => setFormData({...formData, socials: {...(formData.socials || {}), [s]: e.target.value}})}
                  />
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
