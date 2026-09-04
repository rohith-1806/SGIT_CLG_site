import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import API from '../../services/api';
import { FiBookmark, FiFolder, FiYoutube, FiCode, FiTrash2, FiExternalLink } from 'react-icons/fi';

const StudentBookmarks = () => {
  const { user, updateUserProfile } = useAuth();
  const { addToast } = useToast();
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const bookmarks = user?.bookmarks || [];

  useEffect(() => {
    fetchBookmarks();
  }, [user]);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const [projRes, ytRes] = await Promise.all([
        API.get('/projects'),
        API.get('/youtube')
      ]);

      const projects = projRes.data.success ? projRes.data.data : [];
      const videos = ytRes.data.success ? ytRes.data.data : [];

      const matchedProjects = projects.filter(p => bookmarks.includes(p._id || p.id)).map(p => ({ ...p, type: 'Project' }));
      const matchedVideos = videos.filter(v => bookmarks.includes(v._id || v.youtubeId)).map(v => ({ ...v, type: 'Video' }));

      setBookmarkedItems([...matchedProjects, ...matchedVideos]);
    } catch (err) {
      console.error('Error loading bookmarks:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async (id) => {
    const updated = bookmarks.filter(bId => bId !== id);
    updateUserProfile({ bookmarks: updated });
    setBookmarkedItems(prev => prev.filter(item => (item._id || item.youtubeId || item.id) !== id));
    addToast('Bookmark removed', 'info');
    try {
      await API.put('/auth/update-profile', { bookmarks: updated });
    } catch (e) {}
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div className="badge badge-red" style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <FiBookmark size={16} /> Saved Resources
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Your Bookmarks</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Quick access to saved technical projects, tutorials, and roadmaps.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading saved items...</div>
      ) : bookmarkedItems.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem' }}>
          <FiBookmark size={48} style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }} />
          <h3>No Bookmarks Saved Yet</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Explore projects or YouTube learning tutorials and click the bookmark button to save them here.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {bookmarkedItems.map((item, idx) => {
            const itemId = item._id || item.youtubeId || item.id || idx;
            const isVideo = item.type === 'Video';

            return (
              <div key={itemId} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className={isVideo ? 'badge badge-red' : 'badge badge-blue'} style={{ fontSize: '0.75rem' }}>
                      {isVideo ? 'YouTube Tutorial' : 'Project'}
                    </span>
                    <button 
                      onClick={() => removeBookmark(itemId)} 
                      style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer' }}
                      title="Remove Bookmark"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                    {item.description || item.abstract || 'Saved engineering resource'}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Category: <strong>{item.category || item.department || 'Tech'}</strong>
                  </span>
                  {item.youtubeUrl ? (
                    <a href={item.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                      Watch <FiExternalLink size={12} />
                    </a>
                  ) : item.githubUrl ? (
                    <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                      View Repo <FiExternalLink size={12} />
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentBookmarks;
