import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AdminLogin from './Pages/Admin/AdminLogin';
import { AuthProvider } from './AuthContext';
import AdminApplicants from './Pages/Admin/adminapplicants';
import Dashboard from './Pages/Admin/AdminDashboard';
import AdminEmployers from './Pages/Admin/adminemployers';
import ApplicantPreviewPage from './Pages/Admin/applicantdetailspreview';

function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

function Layout() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path='/' element={<AdminLogin />} />
      <Route path='/admindashboard' element={<Dashboard />} />
      <Route path='/adminapplicants' element={<AdminApplicants />} />
      <Route path='/adminemployers' element={<AdminEmployers />} />
      <Route path='/adminapplicants/applicantdetailspreview' element={<ApplicantPreviewPage />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
