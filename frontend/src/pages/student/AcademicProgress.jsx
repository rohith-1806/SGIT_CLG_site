import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  Award, Save, Plus, Trash2, Edit3, Calculator, CheckCircle2, 
  BookOpen, RefreshCw, Layers, ArrowRight, ShieldCheck, HelpCircle
} from 'lucide-react';

const AcademicProgress = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [activeSemester, setActiveSemester] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [academicProfile, setAcademicProfile] = useState(null);

  // Subject Form State for adding new subject
  const [subjectForm, setSubjectForm] = useState({
    subjectName: '',
    credits: 3,
    marks: ''
  });

  // Calculate SGIT Grade & Grade Point dynamically from marks
  const getSGITGrade = (marksInput) => {
    if (marksInput === 'Ab' || marksInput === 'absent' || marksInput === 'ABSENT' || marksInput === '' || marksInput === null) {
      return { grade: 'Ab', gradePoint: 0, label: 'Absent' };
    }
    const num = parseFloat(marksInput);
    if (isNaN(num)) return { grade: 'Ab', gradePoint: 0, label: 'Absent' };
    if (num >= 90) return { grade: 'S', gradePoint: 10, label: 'Superior' };
    if (num >= 80) return { grade: 'A', gradePoint: 9, label: 'Excellent' };
    if (num >= 70) return { grade: 'B', gradePoint: 8, label: 'Very Good' };
    if (num >= 60) return { grade: 'C', gradePoint: 7, label: 'Good' };
    if (num >= 50) return { grade: 'D', gradePoint: 6, label: 'Average' };
    if (num >= 40) return { grade: 'E', gradePoint: 5, label: 'Pass' };
    return { grade: 'F', gradePoint: 0, label: 'Fail' };
  };

  // Fetch Academic Profile from Backend Database
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
      if (data.success && data.data) {
        setAcademicProfile(data.data);
      } else {
        // Fallback default 8 semesters
        initDefaultProfile();
      }
    } catch (err) {
      console.error('Error fetching academic data:', err);
      initDefaultProfile();
    } finally {
      setLoading(false);
    }
  };

  const initDefaultProfile = () => {
    const defaultSems = Array.from({ length: 8 }, (_, i) => ({
      semesterNumber: i + 1,
      subjects: [],
      semesterCredits: 0,
      semesterSGPA: 0
    }));
    setAcademicProfile({
      studentId: user?._id,
      semesters: defaultSems,
      cgpa: 0,
      degreeClass: 'Below Pass Class Threshold',
      completedCredits: 0,
      academicStanding: 'Satisfactory'
    });
  };

  useEffect(() => {
    fetchAcademicData();
  }, []);

  // Current Semester Data
  const currentSemesterData = academicProfile?.semesters?.find(
    s => s.semesterNumber === activeSemester
  ) || { semesterNumber: activeSemester, subjects: [], semesterCredits: 0, semesterSGPA: 0 };

  // Handle Input change for subject form
  const handleSubjectFormChange = (e) => {
    const { name, value } = e.target;
    setSubjectForm(prev => ({ ...prev, [name]: value }));
  };

  // Add Subject to current active semester
  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!subjectForm.subjectName.trim()) {
      addToast('Please enter a subject name', 'warning');
      return;
    }

    const credits = parseFloat(subjectForm.credits) || 0;
    const marks = subjectForm.marks === 'Ab' ? 'Ab' : parseFloat(subjectForm.marks) || 0;
    const { grade, gradePoint } = getSGITGrade(marks);
    const creditPoints = parseFloat((credits * gradePoint).toFixed(2));

    const newSubject = {
      _id: 'temp_' + Date.now(),
      subjectName: subjectForm.subjectName.trim(),
      credits,
      marks,
      grade,
      gradePoint,
      creditPoints
    };

    const updatedSubjects = [...currentSemesterData.subjects, newSubject];
    updateSemesterState(updatedSubjects);

    setSubjectForm({ subjectName: '', credits: 3, marks: '' });
    addToast(`Subject "${newSubject.subjectName}" added`, 'success');
  };

  // Update a subject in current semester
  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...currentSemesterData.subjects];
    const subject = { ...updatedSubjects[index] };

    if (field === 'credits') {
      subject.credits = parseFloat(value) || 0;
    } else if (field === 'marks') {
      subject.marks = value === 'Ab' || value === 'ab' ? 'Ab' : (value === '' ? '' : parseFloat(value));
    } else if (field === 'subjectName') {
      subject.subjectName = value;
    }

    const { grade, gradePoint } = getSGITGrade(subject.marks);
    subject.grade = grade;
    subject.gradePoint = gradePoint;
    subject.creditPoints = parseFloat((subject.credits * gradePoint).toFixed(2));

    updatedSubjects[index] = subject;
    updateSemesterState(updatedSubjects);
  };

  // Delete subject
  const handleDeleteSubject = (index) => {
    const updatedSubjects = currentSemesterData.subjects.filter((_, i) => i !== index);
    updateSemesterState(updatedSubjects);
    addToast('Subject removed', 'info');
  };

  // Helper to re-calculate local semester SGPA & overall CGPA
  const updateSemesterState = (updatedSubjects) => {
    let semCredits = 0;
    let semPoints = 0;

    updatedSubjects.forEach(s => {
      semCredits += s.credits || 0;
      semPoints += s.creditPoints || 0;
    });

    const semSGPA = semCredits > 0 ? parseFloat((semPoints / semCredits).toFixed(2)) : 0;

    const updatedSemesters = academicProfile.semesters.map(sem => {
      if (sem.semesterNumber === activeSemester) {
        return {
          ...sem,
          subjects: updatedSubjects,
          semesterCredits: semCredits,
          semesterSGPA: semSGPA
        };
      }
      return sem;
    });

    // Compute Overall CGPA locally
    let totalWeightedPoints = 0;
    let totalCompletedCredits = 0;

    updatedSemesters.forEach(s => {
      if (s.semesterCredits > 0) {
        totalCompletedCredits += s.semesterCredits;
        totalWeightedPoints += (s.semesterCredits * s.semesterSGPA);
      }
    });

    const cgpa = totalCompletedCredits > 0 ? parseFloat((totalWeightedPoints / totalCompletedCredits).toFixed(2)) : 0;
    
    let degreeClass = 'Below Pass Class Threshold';
    if (cgpa >= 7.5) degreeClass = 'First Class with Distinction';
    else if (cgpa >= 6.5) degreeClass = 'First Class';
    else if (cgpa >= 5.5) degreeClass = 'Second Class';
    else if (cgpa >= 5.0) degreeClass = 'Pass Class';

    setAcademicProfile(prev => ({
      ...prev,
      semesters: updatedSemesters,
      cgpa,
      completedCredits: totalCompletedCredits,
      degreeClass
    }));
  };

  // SAVE SEMESTER PROGRESS TO BACKEND DATABASE
  const handleSaveProgress = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      const res = await fetch('/api/student/academic/semester', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          semesterNumber: activeSemester,
          subjects: currentSemesterData.subjects
        })
      });

      const data = await res.json();
      if (data.success) {
        setAcademicProfile(data.data);
        addToast(`Semester ${activeSemester} progress saved to database!`, 'success');
      } else {
        addToast(data.error || 'Failed to save progress', 'error');
      }
    } catch (err) {
      console.error('Error saving progress:', err);
      addToast('Network error while saving progress', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <RefreshCw className="animate-spin" size={32} style={{ color: 'var(--accent-primary)', margin: '0 auto 1rem auto' }} />
        <p style={{ color: 'var(--text-secondary)' }}>Loading Academic Records from Database...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
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
            <Award style={{ color: 'var(--accent-gold)' }} size={24} />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              SGIT Autonomous Grading Engine
            </span>
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
            Academic Progress & Marks Ledger
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.35rem', maxWidth: '650px' }}>
            Enter your semester subjects, credits, and marks. The system automatically applies official SGIT grading rules (S, A, B, C, D, E, F, Ab) and updates your credit-weighted SGPA & CGPA.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.85rem' }}>
          <button
            onClick={() => navigate('/cgpa-calculator')}
            className="btn-secondary"
            style={{ padding: '0.65rem 1.25rem', gap: '0.5rem' }}
          >
            <Calculator size={18} />
            <span>CGPA Calculator</span>
          </button>
          <button
            onClick={handleSaveProgress}
            disabled={saving}
            className="btn-primary"
            style={{ padding: '0.65rem 1.4rem', gap: '0.5rem' }}
          >
            <Save size={18} />
            <span>{saving ? 'Saving...' : 'SAVE PROGRESS'}</span>
          </button>
        </div>
      </div>

      {/* Overview Metric Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem'
      }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>OVERALL CGPA</div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-primary)', marginTop: '0.2rem' }}>
            {academicProfile?.cgpa ? academicProfile.cgpa.toFixed(2) : '0.00'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700, marginTop: '0.2rem' }}>
            {academicProfile?.degreeClass || 'Pass Class'}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>SEMESTER {activeSemester} SGPA</div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>
            {currentSemesterData.semesterSGPA ? currentSemesterData.semesterSGPA.toFixed(2) : '0.00'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Based on {currentSemesterData.subjects.length} subjects
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>COMPLETED CREDITS</div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            {academicProfile?.completedCredits || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Credit-Weighted System
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>ACADEMIC STANDING</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--accent-gold)', marginTop: '0.4rem' }}>
            {academicProfile?.academicStanding || 'Outstanding'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ShieldCheck size={14} /> <span>SGIT Autonomous Approved</span>
          </div>
        </div>
      </div>

      {/* Semester Selection Tabs (Sem 1 to Sem 8) */}
      <div className="glass-panel" style={{ padding: '0.85rem 1rem', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((semNum) => {
          const semData = academicProfile?.semesters?.find(s => s.semesterNumber === semNum);
          const hasData = semData && semData.subjects && semData.subjects.length > 0;
          const isActive = activeSemester === semNum;

          return (
            <button
              key={semNum}
              onClick={() => setActiveSemester(semNum)}
              style={{
                flex: '1 0 110px',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: isActive ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                background: isActive ? 'var(--gradient-brand)' : (hasData ? 'rgba(255, 255, 255, 0.04)' : 'transparent'),
                color: isActive ? '#ffffff' : (hasData ? 'var(--text-primary)' : 'var(--text-muted)'),
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'var(--transition-fast)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.2rem'
              }}
            >
              <span style={{ fontSize: '0.825rem' }}>Semester {semNum}</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.85 }}>
                {hasData ? `SGPA: ${semData.semesterSGPA.toFixed(2)}` : 'Empty'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Semester Table & Form Container */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Semester {activeSemester} Subject Ledger
            </h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Total Semester Credits: <strong style={{ color: 'var(--accent-primary)' }}>{currentSemesterData.semesterCredits}</strong> | Semester SGPA: <strong style={{ color: 'var(--accent-emerald)' }}>{currentSemesterData.semesterSGPA.toFixed(2)}</strong>
            </div>
          </div>

          <button
            onClick={handleSaveProgress}
            disabled={saving}
            className="btn-primary"
            style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem', gap: '0.4rem' }}
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Semester'}</span>
          </button>
        </div>

        {/* Add Subject Row Form */}
        <form onSubmit={handleAddSubject} style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px dashed var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr)) 120px',
          gap: '0.85rem',
          alignItems: 'end'
        }}>
          <div>
            <label className="form-label">Subject Name</label>
            <input
              type="text"
              name="subjectName"
              placeholder="e.g. Operating Systems"
              value={subjectForm.subjectName}
              onChange={handleSubjectFormChange}
              className="form-input"
              style={{ width: '100%', padding: '0.55rem 0.85rem', fontSize: '0.85rem' }}
            />
          </div>

          <div>
            <label className="form-label">Credits</label>
            <input
              type="number"
              name="credits"
              min="1"
              max="10"
              step="0.5"
              value={subjectForm.credits}
              onChange={handleSubjectFormChange}
              className="form-input"
              style={{ width: '100%', padding: '0.55rem 0.85rem', fontSize: '0.85rem' }}
            />
          </div>

          <div>
            <label className="form-label">Marks (0-100 or 'Ab')</label>
            <input
              type="text"
              name="marks"
              placeholder="e.g. 85 or Ab"
              value={subjectForm.marks}
              onChange={handleSubjectFormChange}
              className="form-input"
              style={{ width: '100%', padding: '0.55rem 0.85rem', fontSize: '0.85rem' }}
            />
          </div>

          <button
            type="submit"
            className="btn-secondary"
            style={{ width: '100%', padding: '0.6rem 0.85rem', fontSize: '0.85rem', gap: '0.35rem', justifyContent: 'center' }}
          >
            <Plus size={16} />
            <span>Add Subject</span>
          </button>
        </form>

        {/* Subjects Data Table */}
        {currentSemesterData.subjects.length === 0 ? (
          <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <BookOpen size={36} style={{ color: 'var(--border-color)', marginBottom: '0.75rem' }} />
            <p style={{ fontSize: '0.95rem', fontWeight: 600 }}>No subjects added for Semester {activeSemester} yet.</p>
            <p style={{ fontSize: '0.825rem' }}>Use the form above to add your semester subjects and marks.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>#</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Subject Name</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Credits</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Marks</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Grade</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Grade Point</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Credit Points</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSemesterData.subjects.map((sub, idx) => (
                  <tr 
                    key={sub._id || idx} 
                    style={{ 
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--text-muted)' }}>{idx + 1}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <input
                        type="text"
                        value={sub.subjectName}
                        onChange={(e) => handleSubjectChange(idx, 'subjectName', e.target.value)}
                        className="form-input"
                        style={{ padding: '0.35rem 0.6rem', fontSize: '0.85rem', width: '100%', maxWidth: '240px' }}
                      />
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={sub.credits}
                        onChange={(e) => handleSubjectChange(idx, 'credits', e.target.value)}
                        className="form-input"
                        style={{ padding: '0.35rem 0.6rem', fontSize: '0.85rem', width: '70px' }}
                      />
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <input
                        type="text"
                        value={sub.marks}
                        onChange={(e) => handleSubjectChange(idx, 'marks', e.target.value)}
                        className="form-input"
                        style={{ padding: '0.35rem 0.6rem', fontSize: '0.85rem', width: '80px', fontWeight: 700 }}
                      />
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span className={`badge ${sub.grade === 'S' || sub.grade === 'A' ? 'badge-emerald' : sub.grade === 'F' || sub.grade === 'Ab' ? 'badge-red' : 'badge-gold'}`}>
                        {sub.grade}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>{sub.gradePoint}</td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{sub.creditPoints}</td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                      <button
                        onClick={() => handleDeleteSubject(idx)}
                        aria-label="Delete subject"
                        style={{
                          background: 'rgba(227, 30, 36, 0.12)',
                          border: '1px solid rgba(227, 30, 36, 0.3)',
                          color: 'var(--accent-primary)',
                          borderRadius: '6px',
                          padding: '0.35rem 0.65rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.75rem'
                        }}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bottom Save Action Bar */}
        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            * Note: SGIT grading system is automatically calculated upon marks entry.
          </div>

          <button
            onClick={handleSaveProgress}
            disabled={saving}
            className="btn-primary"
            style={{ padding: '0.65rem 1.5rem', gap: '0.5rem' }}
          >
            <CheckCircle2 size={18} />
            <span>{saving ? 'Saving...' : 'SAVE PROGRESS'}</span>
          </button>
        </div>
      </div>

      {/* SGIT Grading Reference Card */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HelpCircle size={16} style={{ color: 'var(--accent-primary)' }} />
          Official SGIT Autonomous Grading Scheme & Degree Class Thresholds
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', fontSize: '0.825rem' }}>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>Marks & Grade Mapping</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', color: 'var(--text-secondary)' }}>
              <li><strong>90 & above:</strong> Grade S (Superior) — 10 Grade Points</li>
              <li><strong>80 – 89:</strong> Grade A (Excellent) — 9 Grade Points</li>
              <li><strong>70 – 79:</strong> Grade B (Very Good) — 8 Grade Points</li>
              <li><strong>60 – 69:</strong> Grade C (Good) — 7 Grade Points</li>
              <li><strong>50 – 59:</strong> Grade D (Average) — 6 Grade Points</li>
              <li><strong>40 – 49:</strong> Grade E (Pass) — 5 Grade Points</li>
              <li><strong>Below 40:</strong> Grade F (Fail) — 0 Grade Points</li>
              <li><strong>Absent:</strong> Grade Ab (Absent) — 0 Grade Points</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>Degree Class Awards</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', color: 'var(--text-secondary)' }}>
              <li><strong>First Class with Distinction:</strong> CGPA ≥ 7.50</li>
              <li><strong>First Class:</strong> CGPA ≥ 6.50 and &lt; 7.50</li>
              <li><strong>Second Class:</strong> CGPA ≥ 5.50 and &lt; 6.50</li>
              <li><strong>Pass Class:</strong> CGPA ≥ 5.00 and &lt; 5.50</li>
              <li><strong>Below Pass Threshold:</strong> CGPA &lt; 5.00</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicProgress;
