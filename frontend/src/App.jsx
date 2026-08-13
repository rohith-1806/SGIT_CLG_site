import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

// Public Pages
import LandingHome from './pages/public/LandingHome';
import About from './pages/public/About';
import DepartmentsPage from './pages/public/DepartmentsPage';
import PlacementsPage from './pages/public/PlacementsPage';
import InternshipsPublic from './pages/public/InternshipsPublic';
import ProjectsPublic from './pages/public/ProjectsPublic';
import WorkshopsPublic from './pages/public/WorkshopsPublic';
import ResourcesPublic from './pages/public/ResourcesPublic';
import FAQPage from './pages/public/FAQPage';
import ContactPage from './pages/public/ContactPage';
import Login from './pages/public/Login';
import AdminLogin from './pages/public/AdminLogin';
import SuperAdminLogin from './pages/public/SuperAdminLogin';
import Register from './pages/public/Register';
import VerifyOTP from './pages/public/VerifyOTP';
import ForgotPassword from './pages/public/ForgotPassword';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import ResumeBuilder from './pages/student/ResumeBuilder';
import CVBuilder from './pages/student/CVBuilder';
import CoverLetterBuilder from './pages/student/CoverLetterBuilder';
import ATSChecker from './pages/student/ATSChecker';
import MockInterviewStudio from './pages/student/MockInterviewStudio';
import StudentInternships from './pages/student/StudentInternships';
import StudentWorkshops from './pages/student/StudentWorkshops';
import StudentSkills from './pages/student/StudentSkills';
import StudentProjects from './pages/student/StudentProjects';
import StudentProfile from './pages/student/StudentProfile';

// Admin & Super Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';

// Protected Layout Component
const DashboardLayout = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '1.5rem 2rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
};

const AppContent = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/placements" element={<PlacementsPage />} />
        <Route path="/internships" element={<InternshipsPublic />} />
        <Route path="/projects" element={<ProjectsPublic />} />
        <Route path="/workshops" element={<WorkshopsPublic />} />
        <Route path="/resources" element={<ResourcesPublic />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />

        {/* Hidden Administrative Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/super-admin/login" element={<SuperAdminLogin />} />

        {/* Auth & Verification Flow */}
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Student Portal Routes */}
        <Route path="/student" element={<DashboardLayout allowedRoles={['student', 'admin', 'superadmin']}><StudentDashboard /></DashboardLayout>} />
        <Route path="/student/resume" element={<DashboardLayout allowedRoles={['student', 'admin', 'superadmin']}><ResumeBuilder /></DashboardLayout>} />
        <Route path="/student/cv" element={<DashboardLayout allowedRoles={['student', 'admin', 'superadmin']}><CVBuilder /></DashboardLayout>} />
        <Route path="/student/cover-letter" element={<DashboardLayout allowedRoles={['student', 'admin', 'superadmin']}><CoverLetterBuilder /></DashboardLayout>} />
        <Route path="/student/ats-checker" element={<DashboardLayout allowedRoles={['student', 'admin', 'superadmin']}><ATSChecker /></DashboardLayout>} />
        <Route path="/student/mock-interview" element={<DashboardLayout allowedRoles={['student', 'admin', 'superadmin']}><MockInterviewStudio /></DashboardLayout>} />
        <Route path="/student/internships" element={<DashboardLayout allowedRoles={['student', 'admin', 'superadmin']}><StudentInternships /></DashboardLayout>} />
        <Route path="/student/workshops" element={<DashboardLayout allowedRoles={['student', 'admin', 'superadmin']}><StudentWorkshops /></DashboardLayout>} />
        <Route path="/student/skills" element={<DashboardLayout allowedRoles={['student', 'admin', 'superadmin']}><StudentSkills /></DashboardLayout>} />
        <Route path="/student/projects" element={<DashboardLayout allowedRoles={['student', 'admin', 'superadmin']}><StudentProjects /></DashboardLayout>} />
        <Route path="/student/notifications" element={<DashboardLayout allowedRoles={['student', 'admin', 'superadmin']}><StudentDashboard /></DashboardLayout>} />
        <Route path="/student/profile" element={<DashboardLayout allowedRoles={['student', 'admin', 'superadmin']}><StudentProfile /></DashboardLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<DashboardLayout allowedRoles={['admin', 'superadmin']}><AdminDashboard /></DashboardLayout>} />

        {/* Super Admin Routes */}
        <Route path="/superadmin/*" element={<DashboardLayout allowedRoles={['superadmin']}><SuperAdminDashboard /></DashboardLayout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
