import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout Wrappers
import StudentPortalLayout from '../layouts/StudentPortalLayout';
import ProtectedRoute from './ProtectedRoute';

// Public Pages
import LandingHome from '../pages/public/LandingHome';
import About from '../pages/public/About';
import FAQPage from '../pages/public/FAQPage';
import ContactPage from '../pages/public/ContactPage';
import Login from '../pages/public/Login';
import AdminLogin from '../pages/public/AdminLogin';
import SuperAdminLogin from '../pages/public/SuperAdminLogin';
import Register from '../pages/public/Register';
import VerifyOTP from '../pages/public/VerifyOTP';
import ForgotPassword from '../pages/public/ForgotPassword';
import NCCPage from '../pages/public/NCCPage';
import NSSPage from '../pages/public/NSSPage';

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import AcademicProgress from '../pages/student/AcademicProgress';
import CGPACalculator from '../pages/student/CGPACalculator';
import ResumeBuilder from '../pages/student/ResumeBuilder';
import CVBuilder from '../pages/student/CVBuilder';
import CoverLetterBuilder from '../pages/student/CoverLetterBuilder';
import ATSChecker from '../pages/student/ATSChecker';
import MockInterviewStudio from '../pages/student/MockInterviewStudio';
import StudentInternships from '../pages/student/StudentInternships';
import StudentWorkshops from '../pages/student/StudentWorkshops';
import StudentSkills from '../pages/student/StudentSkills';
import StudentProjects from '../pages/student/StudentProjects';
import StudentProfile from '../pages/student/StudentProfile';
import YouTubeLearningHub from '../pages/student/YouTubeLearningHub';
import SGITPridePage from '../pages/student/SGITPridePage';
import StudentCertificates from '../pages/student/StudentCertificates';
import StudentBookmarks from '../pages/student/StudentBookmarks';
import StudentNotifications from '../pages/student/StudentNotifications';
import StudentSettings from '../pages/student/StudentSettings';

// Admin & Super Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import SuperAdminDashboard from '../pages/superadmin/SuperAdminDashboard';

// Error Pages
import NotFound from '../pages/errors/NotFound';
import Forbidden from '../pages/errors/Forbidden';
import Unauthorized from '../pages/errors/Unauthorized';
import ServerError from '../pages/errors/ServerError';

// Wrapper for Student Portal Routes (ProtectedRoute + StudentPortalLayout)
const StudentPortalRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['student', 'admin', 'superadmin']}>
    <StudentPortalLayout>
      {children}
    </StudentPortalLayout>
  </ProtectedRoute>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Pre-Login Public Routes */}
      <Route path="/" element={<LandingHome />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/ncc" element={<NCCPage />} />
      <Route path="/nss" element={<NSSPage />} />
      <Route path="/pride" element={<SGITPridePage />} />
      <Route path="/sgit-pride" element={<SGITPridePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Dedicated Login Pages */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/sadmin" element={<SuperAdminLogin />} />

      {/* Legacy/Alias Redirects */}
      <Route path="/admin/login" element={<Navigate to="/admin" replace />} />
      <Route path="/super-admin/login" element={<Navigate to="/sadmin" replace />} />
      <Route path="/superadmin" element={<Navigate to="/sadmin/dashboard" replace />} />
      <Route path="/student" element={<Navigate to="/dashboard" replace />} />

      {/* Student Portal Protected Routes (Using Sticky Sidebar & Clean Top Header) */}
      <Route 
        path="/dashboard" 
        element={
          <StudentPortalRoute>
            <StudentDashboard />
          </StudentPortalRoute>
        } 
      />
      <Route 
        path="/academic-progress" 
        element={
          <StudentPortalRoute>
            <AcademicProgress />
          </StudentPortalRoute>
        } 
      />
      <Route 
        path="/cgpa-calculator" 
        element={
          <StudentPortalRoute>
            <CGPACalculator />
          </StudentPortalRoute>
        } 
      />
      <Route 
        path="/dashboard/profile" 
        element={
          <StudentPortalRoute>
            <StudentProfile />
          </StudentPortalRoute>
        } 
      />
      <Route 
        path="/dashboard/resume" 
        element={
          <StudentPortalRoute>
            <ResumeBuilder />
          </StudentPortalRoute>
        } 
      />
      <Route 
        path="/dashboard/cv" 
        element={
          <StudentPortalRoute>
            <CVBuilder />
          </StudentPortalRoute>
        } 
      />
      <Route 
        path="/dashboard/cover-letter" 
        element={
          <StudentPortalRoute>
            <CoverLetterBuilder />
          </StudentPortalRoute>
        } 
      />
      <Route 
        path="/dashboard/ats-checker" 
        element={
          <StudentPortalRoute>
            <ATSChecker />
          </StudentPortalRoute>
        } 
      />
      <Route 
        path="/dashboard/mock-interview" 
        element={
          <StudentPortalRoute>
            <MockInterviewStudio />
          </StudentPortalRoute>
        } 
      />
      <Route 
        path="/dashboard/internships" 
        element={
          <StudentPortalRoute>
            <StudentInternships />
          </StudentPortalRoute>
        } 
      />
      <Route 
        path="/dashboard/workshops" 
        element={
          <StudentPortalRoute>
            <StudentWorkshops />
          </StudentPortalRoute>
        } 
      />
      <Route 
        path="/dashboard/skills" 
        element={
          <StudentPortalRoute>
            <StudentSkills />
          </StudentPortalRoute>
        } 
      />
      <Route 
        path="/dashboard/projects" 
        element={
          <StudentPortalRoute>
            <StudentProjects />
          </StudentPortalRoute>
        } 
      />
      <Route 
        path="/dashboard/youtube" 
        element={
          <StudentPortalRoute>
            <YouTubeLearningHub />
          </StudentPortalRoute>
        } 
      />

      <Route 
        path="/dashboard/certificates" 
        element={
          <StudentPortalRoute>
            <StudentCertificates />
          </StudentPortalRoute>
        } 
      />
      <Route 
        path="/dashboard/bookmarks" 
        element={
          <StudentPortalRoute>
            <StudentBookmarks />
          </StudentPortalRoute>
        } 
      />
      <Route 
        path="/dashboard/notifications" 
        element={
          <StudentPortalRoute>
            <StudentNotifications />
          </StudentPortalRoute>
        } 
      />
      <Route 
        path="/dashboard/settings" 
        element={
          <StudentPortalRoute>
            <StudentSettings />
          </StudentPortalRoute>
        } 
      />

      {/* Admin Dashboard Protected Route */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Super Admin Dashboard Protected Route */}
      <Route 
        path="/sadmin/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['superadmin']}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Error Pages */}
      <Route path="/401" element={<Unauthorized />} />
      <Route path="/403" element={<Forbidden />} />
      <Route path="/500" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
