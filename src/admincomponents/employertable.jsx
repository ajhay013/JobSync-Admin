import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from './pagination';
import SearchBar from './searchbar';

const EmployerTable = () => {
  const [employersData, setEmployersData] = useState([
    { name: 'John Doe', company: 'ABC Corp', position: 'Manager', document: 'Resume.pdf', contact: '123-456-7890', email: 'john@example.com' },
    { name: 'Jane Smith', company: 'XYZ Ltd', position: 'Developer', document: 'CoverLetter.docx', contact: '987-654-3210', email: 'jane@example.com' },
    { name: 'Michael Johnson', company: 'Tech Solutions', position: 'Lead Engineer', document: 'Resume.pdf', contact: '555-123-4567', email: 'michael@example.com' },
    { name: 'Emily Davis', company: 'InnoTech', position: 'Product Manager', document: 'Resume.pdf', contact: '222-333-4444', email: 'emily@example.com' },
    { name: 'Daniel Brown', company: 'Smart Innovations', position: 'Software Engineer', document: 'Portfolio.pdf', contact: '111-555-7890', email: 'daniel@example.com' },
    { name: 'Olivia Wilson', company: 'Tech Innovators', position: 'UX/UI Designer', document: 'CoverLetter.docx', contact: '333-444-5555', email: 'olivia@example.com' },
    { name: 'James Miller', company: 'GlobalTech', position: 'CTO', document: 'Resume.pdf', contact: '444-555-6666', email: 'james@example.com' },
    { name: 'Sophia Taylor', company: 'Innovative Designs', position: 'Creative Director', document: 'Portfolio.pdf', contact: '555-666-7777', email: 'sophia@example.com' },
    { name: 'Liam Anderson', company: 'TechLab Solutions', position: 'Full Stack Developer', document: 'Resume.pdf', contact: '666-777-8888', email: 'liam@example.com' }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);  
  const [selectedIndex, setSelectedIndex] = useState(null);  
  const itemsPerPage = 10;

  const totalItems = employersData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const filteredData = employersData.filter((employer) =>
    employer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employer.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const navigate = useNavigate();

  const handleRowClick = (employer) => {
    navigate('/adminemployers/employerdetailspreview', { state: { employer } });
  };

  const handleDeleteClick = (index) => {
    setSelectedIndex(index); 
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = () => {
    const updatedData = [...employersData];
    updatedData.splice(selectedIndex, 1); 
    setEmployersData(updatedData);
    setShowConfirmModal(false); 
  };

  const handleDeleteCancel = () => {
    setShowConfirmModal(false); 
  };

  return (
    <div>
      {/* Search Bar Component */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <table
        className="table table-hover"
        style={{
          width: '130%',
          tableLayout: 'fixed',
          marginBottom: '20px',
          fontSize: '16px',
          marginLeft: '-140px'
        }}
      >
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Authorized Representative</th>
            <th style={{ width: '35%' }}>Company</th>
            <th style={{ width: '25%' }}>Action</th> 
          </tr>
        </thead>
        <tbody>
          {currentItems.map((employer, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(employer)}  
              style={{ cursor: 'pointer' }}  
            >
              <td style={{ width: '40%' }}>
                <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
                  <img
                    src="/src/assets/berns.jpg"
                    alt="Logo"
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      marginRight: '10px',
                      borderRadius: '50%',
                    }}
                  />
                  <div>
                    <div>{employer.name}</div>
                    <div>{employer.position}</div>
                  </div>
                </div>
              </td>
              <td style={{ width: '35%' }}>{employer.company}</td>
              <td style={{ width: '25%' }}>
                <i
                  className="fas fa-trash-alt icon-size"
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => handleDeleteClick(index)}  
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredData.length}
        paginate={paginate}
      />

      {/* Confirmation Modal for Delete */}
      {showConfirmModal && (
        <div className="modal" style={{ display: 'block', position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '1000' }}>
          <div className="modal-content" style={{ margin: 'auto', background: 'white', padding: '20px', width: '300px', borderRadius: '10px' }}>
            <h4>Are you sure you want to delete?</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handleDeleteConfirm} style={{ background: 'red', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px' }}>Yes</button>
              <button onClick={handleDeleteCancel} style={{ background: 'grey', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px' }}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerTable;
