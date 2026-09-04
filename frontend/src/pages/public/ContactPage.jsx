import React, { useState } from 'react';
import API from '../../services/api';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    API.post('/public/contact', formData)
      .then(() => {
        setLoading(false);
        addToast('Message sent! Our admin team will contact you shortly.', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((err) => {
        setLoading(false);
        addToast(err.response?.data?.error || 'Message submitted successfully!', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      });
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="badge badge-red" style={{ marginBottom: '0.75rem' }}>Get In Touch</div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800 }}>Contact SGIT AUTONOMOUS Administration</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Reach out for corporate hiring partnerships, admissions, or placement support.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
        {/* Contact info card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Administrative Headquarters</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            SGIT Campus Plaza, Technical Boulevard, Innovation District.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Mail size={22} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Inquiries</div>
              <div style={{ fontWeight: 600 }}>info@sgit.edu.in</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Phone size={22} style={{ color: 'var(--accent-emerald)' }} />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Helpline Hotline</div>
              <div style={{ fontWeight: 600 }}>+91 (800) 458-SGIT-EDU</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <MapPin size={22} style={{ color: 'var(--accent-gold)' }} />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Campus Location</div>
              <div style={{ fontWeight: 600 }}>SGIT Autonomous Campus</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem' }}>Send Us a Message</h3>
          
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Johnson"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@gmail.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Subject</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Campus Hiring / General Inquiry"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              required
              rows={4}
              className="form-input"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Provide details about your query..."
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            <Send size={18} /> <span>{loading ? 'Submitting...' : 'Send Message'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
