import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminSidebar from "../../admincomponents/adminsidebar";
import { FaUser, FaBriefcase, FaPhoneAlt, FaEnvelope, FaCalendarAlt, FaFlag, FaGenderless, FaGraduationCap, FaBusinessTime, FaHeart } from 'react-icons/fa';  // Add appropriate icons

const ApplicantPreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Add fallback in case location.state is null or undefined
  const { applicant } = location.state || {};  

  if (!applicant) {
    return <div>Applicant details are unavailable. Please go back.</div>;
  }

  const documents = [
    { name: applicant.resume, type: 'pdf', url: `path/to/${applicant.resume}` }
  ];

  const handleBackClick = () => {
    navigate(-1); // This will navigate to the previous page
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", flexDirection: "row", position: 'relative' }}>
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Back Button */}
      <button 
        onClick={handleBackClick} 
        style={{
          position: 'absolute',
          top: '-10px',
          left: '-45px',
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '20px',
          color: '#007bff',
          cursor: 'pointer',
        }}
      >
        {/* SVG Left Arrow Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ marginRight: '10px' }}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      {/* Main Content */}
      <motion.div
        style={{ 
          flex: '1 1 70%', // Adjusted width to 70% of the available space
          padding: '30px', 
          borderRadius: '8px', 
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
          textAlign: 'left',
          minHeight: 'auto', // Allow height to adjust based on content
        }}
        initial={{ y: 50, opacity: 0 }}  
        animate={{ y: 0, opacity: 1 }}    
        transition={{ duration: 0.8 }}     
      >
        <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '30px' }}>Applicant Details</h2>

        {/* Applicant Details Section */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns layout
            gap: '20px',
          }}
        >
          {/* Applicant Details */}
          <div 
            style={{
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <p style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <FaUser style={{ marginRight: '10px' }} /> <strong>Name:</strong> {applicant.name}
            </p>
            <p style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <FaBriefcase style={{ marginRight: '10px' }} /> <strong>Applied Position:</strong> {applicant.appliedPosition}
            </p>
            <p style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <FaPhoneAlt style={{ marginRight: '10px' }} /> <strong>Contact Number:</strong> {applicant.contact}
            </p>
            <p style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <FaEnvelope style={{ marginRight: '10px' }} /> <strong>Email:</strong> {applicant.email}
            </p>
            <p style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <FaCalendarAlt style={{ marginRight: '10px' }} /> <strong>Date of Birth:</strong> {applicant.dob}
            </p>
          </div>

          <div 
            style={{
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <p style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <FaFlag style={{ marginRight: '10px' }} /> <strong>Nationality:</strong> {applicant.nationality}
            </p>
            <p style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <FaGenderless style={{ marginRight: '10px' }} /> <strong>Gender:</strong> {applicant.gender}
            </p>
            <p style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <FaHeart style={{ marginRight: '10px' }} /> <strong>Marital Status:</strong> {applicant.maritalStatus}
            </p>
            <p style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <FaBusinessTime style={{ marginRight: '10px' }} /> <strong>Experience:</strong> {applicant.experience}
            </p>
            <p style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <FaGraduationCap style={{ marginRight: '10px' }} /> <strong>Education:</strong> {applicant.education}
            </p>
          </div>
        </div>

        {/* ID Preview Section */}
        <div 
          style={{
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px', marginTop: '20px' }}>Uploaded ID Preview</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            {/* Front ID */}
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
                minHeight: '250px', // Ensure the container maintains height
              }}
            >
              <span style={{
                fontSize: '18px', 
                color: '#888', 
                fontWeight: 'bold',
                position: 'absolute'
              }}>
                Front ID
              </span>
              <img 
                src={applicant.idFront} 
                alt="ID Front" 
                style={{
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '8px',
                  opacity: applicant.idFront ? 1 : 0, // Hide the image if not available
                }} 
              />
            </div>
            
            {/* Back ID */}
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
                minHeight: '250px', // Ensure the container maintains height
              }}
            >
              <span style={{
                fontSize: '18px', 
                color: '#888', 
                fontWeight: 'bold',
                position: 'absolute'
              }}>
                Back ID
              </span>
              <img 
                src={applicant.idBack} 
                alt="ID Back" 
                style={{
                  width: '100%', 
                  height: '100%',  
                  objectFit: 'cover',
                  borderRadius: '8px',
                  opacity: applicant.idBack ? 1 : 0, // Hide the image if not available
                }} 
              />
            </div>
          </div>
        </div>

        {/* Document Attached Section */}
        <div
          style={{
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
            backgroundColor: '#f9f9f9'
          }}
        >
          <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px', marginTop: '25px' }}>Documents Attached</h4>
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '20px',
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
                  marginBottom: '15px' 
                }}
              >
                {/* Display Icon based on file type */}
                <div style={{ marginRight: '15px' }}>
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
                  <p style={{ margin: 0 }}>
                    <strong>{doc.name}</strong> 
                    <span style={{ color: '#888', marginLeft: '5px' }}>(
                      {doc.type === 'pdf' ? 'PDF' : 'Image'}
                    )</span>
                  </p>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
                    View File
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ApplicantPreviewPage;
