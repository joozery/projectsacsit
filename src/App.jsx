
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import CertificatesPage from '@/pages/Certificates';
import GoogleAnalytics from '@/pages/GoogleAnalytics';
import MultimediaPage from '@/pages/Multimedia/index';
import SubmissionsReviewPage from '@/pages/SubmissionsReview/index';
import LandingPage from '@/pages/LandingPage'; 
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
            <Route path="certificates" element={<CertificatesPage />} />
            <Route path="google-analytics" element={<GoogleAnalytics />} />
            <Route path="multimedia" element={<MultimediaPage />} />
            <Route path="submissions-review" element={<SubmissionsReviewPage />} />
            {/* Add other admin routes here as needed */}
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
