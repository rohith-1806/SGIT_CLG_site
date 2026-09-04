import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  FiPlay, FiBookmark, FiCheckCircle, FiSearch, FiYoutube, 
  FiAward, FiClock, FiArrowLeft
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const YOUTUBE_CATEGORIES = [
  'All', 'Java', 'Python', 'C', 'C++', 'JavaScript', 'React', 'Node.js', 
  'SQL', 'DSA', 'AI', 'ML', 'Data Science', 'Cloud', 'Cyber Security', 
  'GitHub', 'Placement Preparation'
];

const YouTubeLearningHub = () => {
  const { user, updateUserProfile } = useAuth();
  const { addToast } = useToast();
  const [resources, setResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const completedVideos = user?.completedVideos || [];
  const bookmarkedVideos = user?.bookmarks || [];

  useEffect(() => {
    fetchResources();
  }, [selectedCategory]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const url = selectedCategory === 'All' 
        ? '/youtube' 
        : `/youtube?category=${encodeURIComponent(selectedCategory)}`;
      const res = await API.get(url);
      if (res.data.success) {
        setResources(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load YouTube learning resources:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (videoId) => {
    const isCompleted = completedVideos.includes(videoId);
    let updated;
    if (isCompleted) {
      updated = completedVideos.filter(id => id !== videoId);
      addToast('Marked as incomplete', 'info');
    } else {
      updated = [...completedVideos, videoId];
      addToast('Great job! Video completed 🎉', 'success');
    }
    updateUserProfile({ completedVideos: updated });
    try {
      await API.put('/auth/update-profile', { completedVideos: updated });
    } catch (e) {}
  };

  const toggleBookmark = async (videoId) => {
    const isBookmarked = bookmarkedVideos.includes(videoId);
    let updated;
    if (isBookmarked) {
      updated = bookmarkedVideos.filter(id => id !== videoId);
      addToast('Removed from bookmarks', 'info');
    } else {
      updated = [...bookmarkedVideos, videoId];
      addToast('Saved to your bookmarks! 📌', 'success');
    }
    updateUserProfile({ bookmarks: updated });
    try {
      await API.put('/auth/update-profile', { bookmarks: updated });
    } catch (e) {}
  };

  const filteredResources = resources.filter(res => 
    res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.channel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const progressPercent = resources.length > 0 
    ? Math.round((completedVideos.length / resources.length) * 100)
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div className="badge badge-red" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <FiYoutube size={16} /> SGIT YouTube Learning Hub
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              Learn from the Best 🚀
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px' }}>
              Hand-picked technical tutorials, full-stack masterclasses, DSA problem walkthroughs, and placement preparation resources.
            </p>
          </div>

          {/* Progress Card */}
          <div style={{
            background: 'rgba(227, 30, 36, 0.08)',
            border: '1px solid rgba(227, 30, 36, 0.25)',
            borderRadius: '16px',
            padding: '1.25rem 1.75rem',
            minWidth: '220px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '0.25rem' }}>
              Your Progress
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-primary)' }}>
              {completedVideos.length} / {resources.length || 16}
            </div>
            <div style={{
              width: '100%', height: '8px', background: 'var(--bg-card)', borderRadius: '10px',
              overflow: 'hidden', marginTop: '0.5rem'
            }}>
              <div style={{
                width: `${Math.min(100, progressPercent)}%`, height: '100%',
                background: 'linear-gradient(90deg, #E31E24, #FF5252)', transition: 'width 0.4s ease'
              }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontWeight: 600 }}>
              {progressPercent}% Completed
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '260px', maxWidth: '400px' }}>
            <FiSearch size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.75rem' }}
              placeholder="Search tutorials, tech stacks, channels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
            Showing {filteredResources.length} Tutorials
          </div>
        </div>

        {/* Category Scroll Filter */}
        <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'thin' }}>
          {YOUTUBE_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '20px',
                fontSize: '0.825rem',
                fontWeight: 700,
                border: '1px solid',
                borderColor: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--border-color)',
                background: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--bg-card)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video Modal if Active */}
      {activeVideo && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '900px', padding: '1.5rem', background: '#0d0d12' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-red" style={{ fontSize: '0.75rem' }}>{activeVideo.category}</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '0.25rem' }}>{activeVideo.title}</h3>
              </div>
              <button 
                onClick={() => setActiveVideo(null)}
                className="btn-secondary" 
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
              >
                Close Video ✕
              </button>
            </div>

            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Channel: <strong>{activeVideo.channel}</strong> • Duration: {activeVideo.duration}
              </span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => toggleComplete(activeVideo._id || activeVideo.youtubeId)}
                  className={completedVideos.includes(activeVideo._id || activeVideo.youtubeId) ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', gap: '0.4rem' }}
                >
                  <FiCheckCircle size={16} />
                  <span>{completedVideos.includes(activeVideo._id || activeVideo.youtubeId) ? 'Completed' : 'Mark Completed'}</span>
                </button>
                <button
                  onClick={() => toggleBookmark(activeVideo._id || activeVideo.youtubeId)}
                  className="btn-secondary"
                  style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', gap: '0.4rem' }}
                >
                  <FiBookmark size={16} />
                  <span>{bookmarkedVideos.includes(activeVideo._id || activeVideo.youtubeId) ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          Loading YouTube Learning Resources...
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
          <FiYoutube size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
          <h3>No Tutorials Found in Category</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Try selecting a different category or clearing search filters.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredResources.map((res) => {
            const vidKey = res._id || res.youtubeId;
            const isDone = completedVideos.includes(vidKey);
            const isSaved = bookmarkedVideos.includes(vidKey);

            return (
              <div 
                key={vidKey} 
                className="glass-card" 
                style={{ 
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  border: isDone ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Thumbnail / Preview Header */}
                  <div 
                    onClick={() => setActiveVideo(res)}
                    style={{
                      position: 'relative', height: '160px', borderRadius: '12px', overflow: 'hidden',
                      cursor: 'pointer', marginBottom: '1rem',
                      backgroundImage: `url(https://img.youtube.com/vi/${res.youtubeId}/hqdefault.jpg)`,
                      backgroundSize: 'cover', backgroundPosition: 'center'
                    }}
                  >
                    <div style={{
                      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.2s ease'
                    }}>
                      <div style={{
                        width: '52px', height: '52px', borderRadius: '50%', background: 'var(--accent-primary)',
                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(227,30,36,0.6)'
                      }}>
                        <FiPlay size={24} style={{ marginLeft: '3px' }} />
                      </div>
                    </div>

                    <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                      <span className="badge badge-red" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                        {res.category}
                      </span>
                    </div>

                    <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', background: 'rgba(0,0,0,0.75)', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <FiClock size={12} /> {res.duration}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: '1.4' }}>
                    {res.title}
                  </h3>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    By <strong>{res.channel}</strong> • Level: <span style={{ color: 'var(--accent-gold)' }}>{res.level}</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                  <button
                    onClick={() => toggleComplete(vidKey)}
                    style={{
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      color: isDone ? 'var(--accent-emerald)' : 'var(--text-muted)',
                      fontSize: '0.8rem', fontWeight: 700
                    }}
                  >
                    <FiCheckCircle size={16} />
                    <span>{isDone ? 'Completed' : 'Mark Done'}</span>
                  </button>

                  <button
                    onClick={() => toggleBookmark(vidKey)}
                    style={{
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      color: isSaved ? 'var(--accent-gold)' : 'var(--text-muted)',
                      fontSize: '0.8rem', fontWeight: 700
                    }}
                  >
                    <FiBookmark size={16} />
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default YouTubeLearningHub;
