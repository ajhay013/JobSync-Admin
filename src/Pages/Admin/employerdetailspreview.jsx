import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminSidebar from "../../admincomponents/adminsidebar";
import { FaUser, FaBriefcase, FaPhoneAlt, FaEnvelope, FaCalendarAlt, FaFlag, FaGenderless, FaGraduationCap, FaBusinessTime, FaHeart } from 'react-icons/fa';  // Add appropriate icons

const PreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employer } = location.state || {};  // Destructuring with fallback

  if (!employer) {
    return <div>Employer details are unavailable. Please go back.</div>;
  }

  const documents = [
    { name: 'Resume.pdf', type: 'pdf', url: 'path/to/resume.pdf' },
    { name: 'ProfilePic.jpg', type: 'image', url: 'path/to/profilePic.jpg' }
  ];

  const handleBackClick = () => {
    navigate(-1); // This will navigate to the previous page
  };

  return (
    <div className="d-flex" style={{ height: "100vh", flexDirection: "row", position: 'relative' }}>
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Back Button */}
      <button 
        onClick={handleBackClick} 
        style={{
          position: 'absolute',
          top: '-10px',
          left: '-275px',
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
          flex: '2 1 200%', // Increased width to 200% of available space
          padding: '30px', 
          borderRadius: '8px', 
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
          textAlign: 'left',
          minHeight: 'auto', 
          minWidth: 'calc(100% + 100px)',
          marginLeft: '-200px',
        }}
        initial={{ y: 50, opacity: 0 }}  
        animate={{ y: 0, opacity: 1 }}    
        transition={{ duration: 0.8 }}     
      >
        <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '30px' }}>Employer Details</h2>

        {/* Employer Details Section */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns layout
            gap: '20px',
          }}
        >
          {/* Employer Details */}
          <div 
            style={{
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              width: '200%',
            }}
          >
            <p style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <FaUser style={{ marginRight: '10px' }} /> <strong>Name:</strong> {employer.name}
            </p>
            <p style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <FaBriefcase style={{ marginRight: '10px' }} /> <strong>Designation:</strong> {employer.position}
            </p>
            <p style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <FaPhoneAlt style={{ marginRight: '10px' }} /> <strong>Contact Number:</strong> {employer.contact}
            </p>
            <p style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <FaEnvelope style={{ marginRight: '10px' }} /> <strong>Email:</strong> {employer.email}
            </p>
          </div>
        </div>

        {/* ID Preview Section - Moved below Employer Details */}
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
                src={employer.idFront} 
                alt="ID Front" 
                style={{
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '8px',
                  opacity: employer.idFront ? 1 : 0, // Hide the image if not available
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
                src={employer.idBack} 
                alt="ID Back" 
                style={{
                  width: '100%', 
                  height: '100%',  
                  objectFit: 'cover',
                  borderRadius: '8px',
                  opacity: employer.idBack ? 1 : 0, // Hide the image if not available
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

export default PreviewPage;
