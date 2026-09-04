import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Edit3, Save, X } from 'lucide-react';

const CMSEditModal = ({ sectionKey, isOpen, onClose, onSaveSuccess, defaultData }) => {
  const [formData, setFormData] = useState({
    title: defaultData?.title || '',
    subtitle: defaultData?.subtitle || '',
    heading: defaultData?.heading || '',
    description: defaultData?.description || '',
    imageUrl: defaultData?.imageUrl || '',
    bannerText: defaultData?.bannerText || ''
  });
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (defaultData) {
      setFormData({
        title: defaultData.title || '',
        subtitle: defaultData.subtitle || '',
        heading: defaultData.heading || '',
        description: defaultData.description || '',
        imageUrl: defaultData.imageUrl || '',
        bannerText: defaultData.bannerText || ''
      });
    }
  }, [defaultData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await API.put(`/cms/content/${sectionKey}`, formData);
      setSaving(false);
      if (res.data.success) {
        addToast(`CMS Section '${sectionKey}' updated successfully!`, 'success');
        if (onSaveSuccess) onSaveSuccess(res.data.content);
        onClose();
      }
    } catch (err) {
      setSaving(false);
      addToast(err.response?.data?.error || 'Failed to update CMS section', 'error');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Edit3 size={20} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Super Admin CMS Edit — [{sectionKey.toUpperCase()}]</h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Section Title</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Subtitle</label>
            <input
              type="text"
              className="form-input"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Heading</label>
            <input
              type="text"
              className="form-input"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description / Main Text</label>
            <textarea
              className="form-input"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image URL / Asset Path</label>
            <input
              type="text"
              className="form-input"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Banner Text / Alert Note</label>
            <input
              type="text"
              className="form-input"
              value={formData.bannerText}
              onChange={(e) => setFormData({ ...formData, bannerText: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary">
              <Save size={16} /> <span>{saving ? 'Saving Changes...' : 'Save CMS Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CMSEditModal;
