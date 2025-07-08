import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import Dashboard from '@/pages/Dashboard';
import CertificatesPage from '@/pages/Certificates';
import GoogleAnalytics from '@/pages/GoogleAnalytics';
import MultimediaPage from '@/pages/Multimedia/index';
import SubmissionsReviewPage from '@/pages/SubmissionsReview/index';
import UsersPage from '@/pages/Users/index';
import TemplatesPage from '@/pages/Templates/index';
import EbooksPage from '@/pages/Ebooks/index';
import SettingsPage from '@/pages/Settings/index';
import LandingPage from '@/pages/LandingPage';
import Register from '@/pages/Register';
import RegisterTerms from '@/pages/RegisterTerms';
import RegisterForm from '@/pages/RegisterForm';
import RegisterResearch from '@/pages/RegisterResearch';
import RegisterCreative from '@/pages/RegisterCreative';
import RegisterSuccess from '@/pages/RegisterSuccess';
import Login from '@/pages/Login';
import AgendaPage from '@/pages/Agenda/index';
import SpeakersPage from '@/pages/Speakers/index';
import AttendeesPage from '@/pages/Attendees/index';
import CheckInPage from '@/pages/CheckIn/index';
import Account from '@/pages/Account';
import { Toaster } from '@/components/ui/toaster';

const AdminLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

// Component to handle navbar logic
const AppWithNavbar = () => {
  const location = useLocation();
  
  // Determine navbar configuration based on route
  const getNavbarConfig = () => {
    const path = location.pathname;
    
    // Admin pages - no navbar (Layout handles its own navbar)
    if (path.startsWith('/admin')) {
      return null;
    }
    
    // CheckIn page - simple navbar only
    if (path === '/checkin') {
      return { variant: 'simple' };
    }
    
    // Account page - user navbar without navigation
    if (path === '/account') {
      return { showNavigation: false };
    }
    
    // Register pages - navbar without auth buttons (since they're on register flow)
    if (path.startsWith('/register')) {
      return { showAuthButtons: false };
    }
    
    // Login page - navbar without auth buttons
    if (path === '/login') {
      return { showAuthButtons: false };
    }
    
    // Landing page and other pages - full navbar
    return {};
  };
  
  const navbarConfig = getNavbarConfig();
  
  const handleFeatureClick = () => {
    console.log("Feature not implemented yet.");
  };
  
  return (
    <>
      {navbarConfig && (
        <Navbar 
          {...navbarConfig}
          onFeatureClick={handleFeatureClick}
        />
      )}
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/terms" element={<RegisterTerms />} />
        <Route path="/register/form" element={<RegisterForm />} />
        <Route path="/register/research" element={<RegisterResearch />} />
        <Route path="/register/creative" element={<RegisterCreative />} />
        <Route path="/register/success" element={<RegisterSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkin" element={<CheckInPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="agenda" element={<AgendaPage />} />
          <Route path="speakers" element={<SpeakersPage />} />
          <Route path="attendees" element={<AttendeesPage />} />
          <Route path="certificates" element={<CertificatesPage />} />
          <Route path="google-analytics" element={<GoogleAnalytics />} />
          <Route path="multimedia" element={<MultimediaPage />} />
          <Route path="submissions-review" element={<SubmissionsReviewPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="ebooks" element={<EbooksPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <>
      <Router>
        <AppWithNavbar />
        <Toaster />
      </Router>
    </>
  );
}

export default App;
