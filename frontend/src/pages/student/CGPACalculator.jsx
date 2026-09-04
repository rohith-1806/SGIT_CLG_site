import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  Calculator, Award, Save, RefreshCw, CheckCircle2, 
  ArrowRight, ShieldCheck, HelpCircle, Layers, Sparkles
} from 'lucide-react';

const CGPACalculator = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // State for Semesters (1 to 8)
  const [semesters, setSemesters] = useState([
    { semesterNumber: 1, credits: 20, sgpa: 8.40, completed: true },
    { semesterNumber: 2, credits: 20, sgpa: 8.60, completed: true },
    { semesterNumber: 3, credits: 22, sgpa: 8.25, completed: true },
    { semesterNumber: 4, credits: 22, sgpa: 8.50, completed: true },
    { semesterNumber: 5, credits: 22, sgpa: 8.75, completed: true },
    { semesterNumber: 6, credits: 22, sgpa: 0, completed: false },
    { semesterNumber: 7, credits: 20, sgpa: 0, completed: false },
    { semesterNumber: 8, credits: 18, sgpa: 0, completed: false }
  ]);

  // Fetch student's saved academic data from backend API
  const fetchAcademicData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch('/api/student/academic', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (data.success && data.data && data.data.semesters) {
        const loadedSems = data.data.semesters.map(sem => ({
          semesterNumber: sem.semesterNumber,
          credits: sem.semesterCredits || 20,
          sgpa: sem.semesterSGPA || 0,
          completed: sem.semesterCredits > 0 || (sem.subjects && sem.subjects.length > 0)
        }));
        setSemesters(loadedSems);
      }
    } catch (err) {
      console.error('Error loading academic calculator data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAcademicData();
  }, []);

  // Update a semester's SGPA or Credits
  const handleSemesterChange = (index, field, value) => {
    const updated = [...semesters];
    if (field === 'sgpa') {
      const num = parseFloat(value) || 0;
      updated[index].sgpa = Math.min(10, Math.max(0, num));
      updated[index].completed = updated[index].sgpa > 0;
    } else if (field === 'credits') {
      updated[index].credits = Math.max(0, parseFloat(value) || 0);
    } else if (field === 'completed') {
      updated[index].completed = value;
    }
    setSemesters(updated);
  };

  // Perform Credit-Weighted CGPA Calculation
  // CGPA = Σ(Semester Credits × Semester SGPA) / Σ(Semester Credits)
  let totalWeightedPoints = 0;
  let totalCompletedCredits = 0;
  let currentSGPA = 0;

  semesters.forEach(sem => {
    if (sem.completed && sem.credits > 0 && sem.sgpa > 0) {
      totalCompletedCredits += sem.credits;
      totalWeightedPoints += (sem.credits * sem.sgpa);
      currentSGPA = sem.sgpa; // Last completed semester SGPA
    }
  });

  const calculatedCGPA = totalCompletedCredits > 0 
    ? parseFloat((totalWeightedPoints / totalCompletedCredits).toFixed(2)) 
    : 0.00;

  // Determine Degree Class Award
  const getDegreeClass = (cgpa) => {
    if (cgpa >= 7.50) return 'First Class with Distinction';
    if (cgpa >= 6.50) return 'First Class';
    if (cgpa >= 5.50) return 'Second Class';
    if (cgpa >= 5.00) return 'Pass Class';
    return 'Below Pass Class Threshold';
  };

  // Determine Academic Standing
  const getAcademicStanding = (cgpa) => {
    if (cgpa >= 8.50) return 'Outstanding';
    if (cgpa >= 7.50) return 'Excellent';
    if (cgpa >= 6.50) return 'Very Good';
    if (cgpa >= 5.50) return 'Good';
    if (cgpa >= 5.00) return 'Satisfactory';
    return 'Academic Warning';
  };

  const degreeClass = getDegreeClass(calculatedCGPA);
  const academicStanding = getAcademicStanding(calculatedCGPA);

  // SVG Circular Progress calculation
  const circleRadius = 70;
  const circumference = 2 * Math.PI * circleRadius;
  const progressPercent = (calculatedCGPA / 10) * 100;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // Color dynamic based on performance
  const getProgressColor = (cgpa) => {
    if (cgpa >= 7.50) return '#10b981'; // Emerald
    if (cgpa >= 6.50) return '#3b82f6'; // Blue
    if (cgpa >= 5.50) return '#f59e0b'; // Amber
    if (cgpa >= 5.00) return '#f97316'; // Orange
    return '#E31E24'; // SGIT Red
  };

  const progressColor = getProgressColor(calculatedCGPA);

  // Save Calculator Data to Backend API
  const handleSaveCalculation = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');

      // Map semesters payload
      const formattedSemesters = semesters.map(s => ({
        semesterNumber: s.semesterNumber,
        semesterCredits: s.credits,
        semesterSGPA: s.sgpa
      }));

      const res = await fetch('/api/student/cgpa/calculate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          semesters: formattedSemesters
        })
      });

      const data = await res.json();
      if (data.success) {
        addToast('CGPA calculation saved successfully to database!', 'success');
      } else {
        addToast(data.error || 'Failed to save calculation', 'error');
      }
    } catch (err) {
      console.error('Error saving CGPA:', err);
      addToast('Network error while saving CGPA', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <RefreshCw className="animate-spin" size={32} style={{ color: 'var(--accent-primary)', margin: '0 auto 1rem auto' }} />
        <p style={{ color: 'var(--text-secondary)' }}>Loading SGIT CGPA Engine...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Title & Banner */}
      <div className="glass-panel" style={{
        padding: '1.75rem',
        background: 'linear-gradient(135deg, rgba(227, 30, 36, 0.15) 0%, rgba(18, 18, 21, 0.9) 100%)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(227, 30, 36, 0.3)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <Calculator style={{ color: 'var(--accent-gold)' }} size={24} />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              SGIT Autonomous Credit-Weighted Engine
            </span>
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
            SGIT CGPA Calculator
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.35rem', maxWidth: '650px' }}>
            Enter your semester-wise SGPAs and credit allocations. The system calculates your cumulative grade point average (CGPA) and determines your official Degree Class Award.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.85rem' }}>
          <button
            onClick={() => navigate('/academic-progress')}
            className="btn-secondary"
            style={{ padding: '0.65rem 1.25rem', gap: '0.5rem' }}
          >
            <Award size={18} />
            <span>Academic Progress</span>
          </button>
          <button
            onClick={handleSaveCalculation}
            disabled={saving}
            className="btn-primary"
            style={{ padding: '0.65rem 1.4rem', gap: '0.5rem' }}
          >
            <Save size={18} />
            <span>{saving ? 'Saving...' : 'SAVE CGPA'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Calculator Form & Result UI Card */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        alignItems: 'start'
      }}>

        {/* LEFT: Semester Input Table */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} style={{ color: 'var(--accent-primary)' }} />
            Semester-wise Performance Entry
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {semesters.map((sem, idx) => (
              <div 
                key={sem.semesterNumber} 
                style={{
                  background: sem.completed ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                  border: sem.completed ? '1px solid var(--border-color)' : '1px dashed var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="checkbox"
                    checked={sem.completed}
                    onChange={(e) => handleSemesterChange(idx, 'completed', e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
                  />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      Semester {sem.semesterNumber}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Credits: {sem.credits}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>Credits</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={sem.credits}
                      onChange={(e) => handleSemesterChange(idx, 'credits', e.target.value)}
                      className="form-input"
                      style={{ width: '70px', padding: '0.35rem 0.55rem', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>SGPA</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.01"
                      placeholder="0.00"
                      value={sem.sgpa || ''}
                      onChange={(e) => handleSemesterChange(idx, 'sgpa', e.target.value)}
                      className="form-input"
                      style={{ width: '85px', padding: '0.35rem 0.55rem', fontSize: '0.85rem', fontWeight: 800 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSaveCalculation}
            disabled={saving}
            className="btn-primary"
            style={{ width: '100%', marginTop: '1.25rem', justifyContent: 'center' }}
          >
            <Save size={18} />
            <span>{saving ? 'Saving...' : 'Save Performance Entry'}</span>
          </button>
        </div>

        {/* RIGHT: PREMIUM CGPA RESULT CARD */}
        <div className="glass-card" style={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          border: '1px solid var(--border-glow)',
          boxShadow: 'var(--shadow-glass), var(--shadow-glow)'
        }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--accent-gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            OFFICIAL SGIT PERFORMANCE METRICS
          </div>

          {/* Animated SVG Circular Progress */}
          <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 1.5rem auto' }}>
            <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="90"
                cy="90"
                r={circleRadius}
                fill="transparent"
                stroke="var(--border-color)"
                strokeWidth="12"
              />
              <circle
                cx="90"
                cy="90"
                r={circleRadius}
                fill="transparent"
                stroke={progressColor}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.8s ease-in-out, stroke 0.4s ease' }}
              />
            </svg>

            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>
                {calculatedCGPA.toFixed(2)}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                OUT OF 10.0
              </span>
            </div>
          </div>

          {/* Degree Class Award */}
          <div style={{ marginBottom: '1.5rem', width: '100%' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              DEGREE CLASS AWARD
            </div>
            <div 
              className="badge" 
              style={{
                fontSize: '0.9rem',
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                background: calculatedCGPA >= 7.5 ? 'rgba(16, 185, 129, 0.15)' : calculatedCGPA >= 6.5 ? 'rgba(59, 130, 246, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                color: calculatedCGPA >= 7.5 ? '#10b981' : calculatedCGPA >= 6.5 ? '#3b82f6' : '#f59e0b',
                border: `1px solid ${calculatedCGPA >= 7.5 ? '#10b981' : calculatedCGPA >= 6.5 ? '#3b82f6' : '#f59e0b'}`
              }}
            >
              <Sparkles size={16} />
              <span>{degreeClass}</span>
            </div>
          </div>

          {/* Secondary Stats Grid */}
          <div style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.85rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-color)',
            textAlign: 'left'
          }}>
            <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>COMPLETED CREDITS</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                {totalCompletedCredits}
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>CURRENT SGPA</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--accent-emerald)' }}>
                {currentSGPA.toFixed(2)}
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', gridColumn: 'span 2' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>ACADEMIC STANDING</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--accent-gold)', marginTop: '0.1rem' }}>
                {academicStanding}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SGIT Class Award Threshold Reference */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HelpCircle size={16} style={{ color: 'var(--accent-primary)' }} />
          Official SGIT Degree Class Thresholds
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.85rem' }}>
          <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #10b981' }}>
            <div style={{ fontWeight: 800, color: '#10b981' }}>First Class with Distinction</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>CGPA ≥ 7.50</div>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #3b82f6' }}>
            <div style={{ fontWeight: 800, color: '#3b82f6' }}>First Class</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>6.50 ≤ CGPA &lt; 7.50</div>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #f59e0b' }}>
            <div style={{ fontWeight: 800, color: '#f59e0b' }}>Second Class</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>5.50 ≤ CGPA &lt; 6.50</div>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #a1a1aa' }}>
            <div style={{ fontWeight: 800, color: '#a1a1aa' }}>Pass Class</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>5.00 ≤ CGPA &lt; 5.50</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CGPACalculator;
