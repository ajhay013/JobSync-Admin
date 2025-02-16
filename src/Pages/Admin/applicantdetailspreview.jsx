import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminSidebar from '../../components/adminsidebar';
import { FaUser, FaBriefcase, FaPhoneAlt, FaEnvelope, FaCalendarAlt, FaFlag, FaGenderless, FaHeart, FaBusinessTime, FaGraduationCap } from 'react-icons/fa';  // Add appropriate icons
import Topbar from '../../components/Navigation';
import picture from '../../assets/berns.jpg'
import Breadcrumbs from '../../components/BreadCumbs';

const ApplicantPreviewPage = () => {
  const location = useLocation();
  
  // Add fallback in case location.state is null or undefined
  const { applicant } = location.state || {};  

  if (!applicant) {
    return <div>Applicant details are unavailable. Please go back.</div>;
  }

  const documents = [
    { name: applicant.resume, type: 'pdf', url: `path/to/${applicant.resume}` }
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
            width: 100vw
          }
          #content-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
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
          flex: '1 1 70%',  
          padding: '30px', 
          paddingTop: '20px',
          borderRadius: '12px', 
          textAlign: 'left',
          minHeight: 'auto', 
        }}
        initial={{ y: 50, opacity: 0 }}  
        animate={{ y: 0, opacity: 1 }}    
        transition={{ duration: 0.8 }}     
      >

        {/* Applicant Details Section */}
        <div 
          style={{
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff', 
            margin: '0 auto',
            textAlign: 'center',
            transition: '0.3s ease-in-out',
          }}
        >
        <Breadcrumbs
          title="Applicant Details"
          links={[
            { label: "Dashboard", href: "/admindashboard" },
            { label: "Applicants", href: "/adminapplicants" },
            { label: "Applicant Details", active: true }
          ]}
        />
          {/* Profile Picture */}
          <img 
            src={picture} 
            alt="Profile" 
            style={{ 
              width: '200px', 
              height: '200px', 
              borderRadius: '50%', 
              objectFit: 'cover', 
              border: '5px solid #007bff', 
              marginBottom: '25px' 
            }} 
          />

          {/* Name & Applied Position */}
          <h2 style={{ fontSize: '28px', marginBottom: '10px', color: '#333' }}>{applicant.name}</h2>
          <p style={{ fontSize: '20px', color: '#555', marginBottom: '30px' }}>{applicant.appliedPosition}</p>

          {/* Contact Info & Additional Information */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left' }}>
            
            {/* Left Column */}
            <div>
              <p style={{ display: 'flex', alignItems: 'center', fontSize: '20px', marginBottom: '15px' }}>
                <FaPhoneAlt style={{ marginRight: '12px', color: '#007bff' }} /> <strong>Contact:</strong> {applicant.contact}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', fontSize: '20px', marginBottom: '15px' }}>
                <FaEnvelope style={{ marginRight: '12px', color: '#007bff' }} /> <strong>Email:</strong> {applicant.email}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', fontSize: '20px', marginBottom: '15px' }}>
                <FaCalendarAlt style={{ marginRight: '12px', color: '#007bff' }} /> <strong>Date of Birth:</strong> {applicant.dob}
              </p>
            </div>

            {/* Right Column */}
            <div>
              <p style={{ display: 'flex', alignItems: 'center', fontSize: '20px', marginBottom: '15px' }}>
                <FaFlag style={{ marginRight: '12px', color: '#007bff' }} /> <strong>Nationality:</strong> {applicant.nationality}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', fontSize: '20px', marginBottom: '15px' }}>
                <FaGenderless style={{ marginRight: '12px', color: '#007bff' }} /> <strong>Gender:</strong> {applicant.gender}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', fontSize: '20px', marginBottom: '15px' }}>
                <FaHeart style={{ marginRight: '12px', color: '#007bff' }} /> <strong>Marital Status:</strong> {applicant.maritalStatus}
              </p>
            </div>
          </div>

          {/* Full-width Information */}
          <div style={{ marginTop: '30px', textAlign: 'left' }}>
            <p style={{ display: 'flex', alignItems: 'center', fontSize: '20px', marginBottom: '15px' }}>
              <FaBusinessTime style={{ marginRight: '12px', color: '#007bff' }} /> <strong>Experience:</strong> {applicant.experience}
            </p>
            <p style={{ display: 'flex', alignItems: 'center', fontSize: '20px', marginBottom: '15px' }}>
              <FaGraduationCap style={{ marginRight: '12px', color: '#007bff' }} /> <strong>Education:</strong> {applicant.education}
            </p>
          </div>
          
       {/* Document Attached Section */}
       <div
          style={{
            padding: '25px',
            marginBottom: '40px', // Added margin bottom for spacing between sections
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
            backgroundColor: '#ffff'
          }}
        >
          <h4 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>Documents Attached</h4>
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '30px', // Increased the gap between document items
              flexWrap: 'wrap'  
            }}
          >
            {documents.map((doc, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '48%', 
                  marginBottom: '25px' // Added margin to separate document items
                }}
              >
                {/* Display Icon based on file type */}
                <div style={{ marginRight: '20px' }}>
                  {doc.type === 'pdf' ? (
                    <img 
                      src="/src/assets/pdf.png" 
                      alt="PDF Icon" 
                      style={{ width: '40px', height: 'auto' }} 
                    />
                  ) : (
                    <img 
                      src="/src/assets/image.png" 
                      alt="Image Icon" 
                      style={{ width: '40px', height: 'auto' }} 
                    />
                  )}
                </div>
                
                {/* File Name and Type */}
                <div>
                  <p style={{ margin: 0, fontSize: '16px' }}>
                    <strong>{doc.name}</strong> 
                    <span style={{ color: '#888', marginLeft: '5px' }}>(
                      {doc.type === 'pdf' ? 'PDF' : 'Image'}
                    )</span>
                  </p>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', fontSize: '16px' }}>
                    View File
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </motion.div>
        </div>
      </div>
      </div>

    </>
  );
};

export default ApplicantPreviewPage;
