import React from 'react';

const SkeletonLoader = ({ count = 3, height = '120px' }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', width: '100%' }}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton" style={{ height, borderRadius: 'var(--radius-md)' }} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
