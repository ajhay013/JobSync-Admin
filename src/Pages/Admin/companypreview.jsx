import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminSidebar from '../../components/adminsidebar';
import { FaBuilding, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaGlobe, FaFileAlt } from 'react-icons/fa';
import Topbar from '../../components/Navigation';
import picture from '../../assets/user_default.png';
import Breadcrumbs from '../../components/BreadCumbs';

const CompanyPreview = () => {
  const location = useLocation();
  
  const { company } = location.state || {};  

  if (!company) {
    return <div>Company details are unavailable. Please go back.</div>;
  }

  const documents = [
    { name: company.businessPermit, type: 'pdf', url: `path/to/${company.businessPermit}` }
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
        <AdminSidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" style={{ width: "100%", margin: "0" }}>
            <Topbar />
            <motion.div
              style={{ flex: '1 1 70%', padding: '30px', paddingTop: '20px', borderRadius: '12px', textAlign: 'left' }}
              initial={{ y: 50, opacity: 0 }}  
              animate={{ y: 0, opacity: 1 }}    
              transition={{ duration: 0.8 }}
            >
              <div style={{ padding: '40px', borderRadius: '16px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', margin: '0 auto', textAlign: 'center' }}>
              <Breadcrumbs
                title="Company Details"
                links={[
                { label: "Dashboard", href: "/admindashboard" },
                { label: "Companies", href: "/admincompanies" },
                { label: "Company Details", active: true }
                    ]}
                />

                <img 
                  src={company.logo || picture} 
                  alt="Company Logo" 
                  style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover', border: '5px solid #007bff', marginBottom: '25px' }} 
                />
                <h2 style={{ fontSize: '28px', marginBottom: '10px', color: '#333' }}>{company.name}</h2>
                <p style={{ fontSize: '20px', color: '#555', marginBottom: '30px' }}>{company.industry}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left' }}>
                  <div>
                    <p><FaPhoneAlt /> <strong>Contact:</strong> {company.contact}</p>
                    <p><FaEnvelope /> <strong>Email:</strong> {company.email}</p>
                    <p><FaMapMarkerAlt /> <strong>Address:</strong> {company.address}</p>
                  </div>
                  <div>
                    <p><FaCalendarAlt /> <strong>Established:</strong> {company.established}</p>
                    <p><FaGlobe /> <strong>Website:</strong> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></p>
                  </div>
                </div>
                <div style={{ marginTop: '30px', textAlign: 'left' }}>
                  <h4>Business Documents</h4>
                  <div>
                    {documents.map((doc, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', width: '48%', marginBottom: '25px' }}>
                        <FaFileAlt style={{ marginRight: '12px', color: '#007bff' }} />
                        <div>
                          <p><strong>{doc.name}</strong> ({doc.type.toUpperCase()})</p>
                          <a href={doc.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>View File</a>
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

export default CompanyPreview;
