
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Layout from '@/components/Layout';
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
import AgendaPage from '@/pages/Agenda/index';
import SpeakersPage from '@/pages/Speakers/index';
import { Toaster } from '@/components/ui/toaster';

const AdminLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="agenda" element={<AgendaPage />} />
            <Route path="speakers" element={<SpeakersPage />} />
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
        <Toaster />
      </Router>
    </>
  );
}

export default App;
