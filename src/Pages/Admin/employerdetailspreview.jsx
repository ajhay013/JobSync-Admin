import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminSidebar from '../../components/adminsidebar';
import { FaUser, FaBriefcase, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import Topbar from '../../components/Navigation';
import Breadcrumbs from '../../components/BreadCumbs';

const PreviewPage = () => {
  const location = useLocation();
  const { employer } = location.state || {};  // Destructuring with fallback

  if (!employer) {
    return <div>Employer details are unavailable. Please go back.</div>;
  }

  const documents = [
    { name: 'Resume.pdf', type: 'pdf', url: 'path/to/resume.pdf' },
    { name: 'ProfilePic.jpg', type: 'image', url: 'path/to/profilePic.jpg' },
    { name: 'ProfilePic.jpg', type: 'image', url: 'path/to/profilePic.jpg' }
  ];

  return (
    <>
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
          }
          #page-top {
            min-width: 100%;
            position: fixed;
            top: 0;
            left: 0;
          }
          #root {
            position: fixed;
            right: 0;
            margin: 0;
            left: -32px;
            min-width: 100%;
          }
          
          #wrapper {
            display: flex;
            height: 100vh;
            width: 100vw;
          }
          #content-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          }

          /* Custom Scrollbar */
          ::-webkit-scrollbar {
            width: 6px;
          }

          ::-webkit-scrollbar-track {
            background: #f1f1f1;
          }

          ::-webkit-scrollbar-thumb {
            background: #007bff;
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #0056b3;
          }
        `}
      </style>
      <div id="wrapper" style={{ padding: 0 }}>
      {/* Sidebar */}
      <AdminSidebar />
      <div id="content-wrapper" className="d-flex flex-column">
      <div id="content" style={{ width: "100%", margin: "0" }}>
      <Topbar />
      {/* Main Content */}
      <motion.div
        style={{
          margin: '15px',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
          overflowY: 'auto',
        }}
        initial={{ y: 50, opacity: 0 }}  
        animate={{ y: 0, opacity: 1 }}    
        transition={{ duration: 0.8 }}
      >
      <Breadcrumbs
        title="Authorized Representative"
        links={[
          { label: "Dashboard", href: "/admindashboard" },
          { label: "Authorized Representative", href: "/adminemployers" },
          { label: "Representative Details", active: true }
        ]}
      />
        {/* Employer Info */}
        <div className='mt-5' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <p style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
            <FaUser style={{ marginRight: '12px', color: '#007bff' }} /> <strong className='me-1'>Name:</strong>{employer.name}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
            <FaBriefcase style={{ marginRight: '12px', color: '#007bff' }} /> <strong className='me-1'>Designation:</strong>{employer.position}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
            <FaPhoneAlt style={{ marginRight: '12px', color: '#007bff' }} /> <strong className='me-1'>Contact:</strong>{employer.contact}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
            <FaEnvelope style={{ marginRight: '12px', color: '#007bff' }} /> <strong className='me-1'>Email:</strong>{employer.email}
          </p>
        </div>

        {/* ID Preview */}
        <div style={{ borderTop: '1px solid #ddd', paddingTop: '25px', marginBottom: '30px' }}>
          <h3 style={{ fontSize: '24px', color: '#333', marginBottom: '20px', textAlign: 'left' }}>
            Uploaded ID Preview
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {/* ID Card Front */}
            <div 
              style={{
                width: '48%',
                height: '250px',
                border: '2px dashed #007bff',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                backgroundColor: '#f5f5f5',
              }}
            >
              {employer.idFront ? (
                <img 
                  src={employer.idFront} 
                  alt="ID Front" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} 
                />
              ) : (
                <span style={{ fontSize: '20px', color: '#888', fontWeight: 'bold' }}>Front ID</span>
              )}
            </div>

            {/* ID Card Back */}
            <div 
              style={{
                width: '48%',
                height: '250px',
                border: '2px dashed #007bff',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                backgroundColor: '#f5f5f5',
              }}
            >
              {employer.idBack ? (
                <img 
                  src={employer.idBack} 
                  alt="ID Back" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} 
                />
              ) : (
                <span style={{ fontSize: '20px', color: '#888', fontWeight: 'bold' }}>Back ID</span>
              )}
            </div>
          </div>
        </div>

        {/* Attached Documents */}
        <div style={{ borderTop: '1px solid #ddd', paddingTop: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '24px', color: '#333', textAlign: 'left', margin: 0 }}>
              Documents Attached
            </h3>
            <a 
              href="https://bnrs.dti.gov.ph/search" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                backgroundColor: '#007bff', 
                color: '#fff', 
                padding: '10px 15px', 
                borderRadius: '5px', 
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Check DTI Registration
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '35px' }}>
            {documents.map((doc, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                {/* Document Icon */}
                <div style={{ marginRight: '15px' }}>
                  {doc.type === 'pdf' ? (
                    <img src="/src/assets/pdf.png" alt="PDF Icon" style={{ width: '50px', height: 'auto' }} />
                  ) : (
                    <img src="/src/assets/image.png" alt="Image Icon" style={{ width: '50px', height: 'auto' }} />
                  )}
                </div>

                {/* File Info */}
                <div>
                  <p style={{ margin: 0, fontSize: '20px' }}>
                    <strong>{doc.name}</strong> 
                    <span style={{ color: '#888', marginLeft: '10px', fontSize: '16px' }}>
                      ({doc.type === 'pdf' ? 'PDF' : 'Image'})
                    </span>
                  </p>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', fontSize: '16px' }}>
                    View File
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Approve & Reject Buttons */}
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button 
            onClick={() => handleApprove(applicant.id)}
            style={{
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#28a745',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: '0.3s ease',
            }}
          >
            Approve
          </button>

          <button 
            onClick={() => handleReject(applicant.id)}
            style={{
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#dc3545',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: '0.3s ease',
            }}
          >
            Reject
          </button>
        </div>


      </motion.div>

      </div>
    </div>
    </div>
    </>
  );
};

export default PreviewPage;
