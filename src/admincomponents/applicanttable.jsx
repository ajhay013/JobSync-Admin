import React, { useState } from 'react';
import Pagination from './pagination';
import SearchBar from './searchbar';
import { useNavigate } from 'react-router-dom';  

const ApplicantTable = () => {
  const applicantsData = [
    { name: 'John Doe', appliedPosition: 'Software Engineer', skills: 'React, Node.js', resume: 'Resume.pdf', idFront: '/src/assets/idfront.jpg', idBack: '/src/assets/idback.jpg' },
    { name: 'Jane Smith', appliedPosition: 'UI/UX Designer', skills: 'Figma, Sketch, Adobe XD', resume: 'Resume.docx' , idFront: '/src/assets/idfront.jpg', idBack: '/src/assets/idback.jpg'},
    { name: 'Michael Johnson', appliedPosition: 'DevOps Engineer', skills: 'AWS, Docker, Kubernetes', resume: 'Resume.pdf' , idFront: '/src/assets/idfront.jpg', idBack: '/src/assets/idback.jpg' },
    { name: 'Amy Brown', appliedPosition: 'Data Scientist', skills: 'Python, R, SQL', resume: 'Resume.pdf' , idFront: '/src/assets/idfront.jpg', idBack: '/src/assets/idback.jpg' },
    { name: 'David Wilson', appliedPosition: 'Product Manager', skills: 'Agile, Scrum, Jira', resume: 'Resume.pdf' , idFront: '/src/assets/idfront.jpg', idBack: '/src/assets/idback.jpg' },
    { name: 'Sarah Lee', appliedPosition: 'Marketing Specialist', skills: 'SEO, Content Marketing', resume: 'Resume.pdf' , idFront: '/src/assets/idfront.jpg', idBack: '/src/assets/idback.jpg' },
    { name: 'Chris White', appliedPosition: 'Backend Developer', skills: 'Java, Spring, MongoDB', resume: 'Resume.pdf' , idFront: '/src/assets/idfront.jpg', idBack: '/src/assets/idback.jpg' },
    { name: 'Emily Green', appliedPosition: 'HR Specialist', skills: 'Employee Relations, Recruitment', resume: 'Resume.docx' , idFront: '/src/assets/idfront.jpg', idBack: '/src/assets/idback.jpg' },
    { name: 'Jason Miller', appliedPosition: 'Frontend Developer', skills: 'HTML, CSS, JavaScript', resume: 'Resume.pdf' , idFront: '/src/assets/idfront.jpg', idBack: '/src/assets/idback.jpg' },
    { name: 'Linda Harris', appliedPosition: 'QA Engineer', skills: 'Manual Testing, Automation', resume: 'Resume.docx', idFront: '/src/assets/idfront.jpg', idBack: '/src/assets/idback.jpg' },
    { name: 'Mark Lee', appliedPosition: 'Data Analyst', skills: 'Excel, Tableau, SQL', resume: 'Resume.pdf' , idFront: '/src/assets/idfront.jpg', idBack: '/src/assets/idback.jpg'},
    { name: 'Patricia Clark', appliedPosition: 'Project Manager', skills: 'PMP, Risk Management', resume: 'Resume.docx', idFront: '/src/assets/idfront.jpg', idBack: '/src/assets/idback.jpg' },
    { name: 'William Turner', appliedPosition: 'Product Designer', skills: 'Prototyping, Wireframing', resume: 'Resume.pdf' , idFront: '/src/assets/idfront.jpg', idBack: '/src/assets/idback.jpg'},
    { name: 'Olivia Adams', appliedPosition: 'Software Developer', skills: 'JavaScript, TypeScript', resume: 'Resume.pdf' , idFront: '/src/assets/idfront.jpg', idBack: '/src/assets/idback.jpg'},
    { name: 'James Scott', appliedPosition: 'Business Analyst', skills: 'Business Modeling, SQL', resume: 'Resume.pdf', idFront: '/src/assets/idfront.jpg', idBack: '/src/assets/idback.jpg' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [applicants, setApplicants] = useState(applicantsData);
  const itemsPerPage = 10;

  const navigate = useNavigate();  // Initialize useNavigate

  const totalItems = applicants.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const filteredData = applicants.filter((applicant) =>
    applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    applicant.appliedPosition.toLowerCase().includes(searchQuery.toLowerCase()) ||
    applicant.skills.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle row click and navigate to preview page
  const handleRowClick = (applicant) => {
    navigate('/adminapplicants/applicantdetailspreview', { state: { applicant } });  
  };

  // Function to handle deleting an applicant
  const handleDelete = (name) => {
    const updatedApplicants = applicants.filter((applicant) => applicant.name !== name);
    setApplicants(updatedApplicants);
  };

  return (
    <div>
      {/* Search Bar Component */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <table className="table table-hover" style={{ width: '130%', tableLayout: 'fixed', marginBottom: '20px', marginLeft: '-140px' }}>
      <thead>
        <tr>
          <th style={{ width: '40%' }}>Applicant</th>
          <th style={{ width: '35%' }}>Applied Position</th>
          <th style={{ width: '25%' }}>Action</th> {/* Action Column */}
        </tr>
      </thead>
      <tbody>
        {currentItems.map((applicant, index) => (
          <tr key={index} onClick={() => handleRowClick(applicant)} style={{ cursor: 'pointer' }}>
            <td style={{ width: '40%' }}>
              <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
                <img
                  src="/src/assets/logo jobsync2.png"
                  alt="Logo"
                  style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px', borderRadius: '50%' }}
                />
                <div>
                  <div>{applicant.name}</div>
                  <div>{applicant.skills}</div>
                </div>
              </div>
            </td>
            <td style={{ width: '35%' }}>{applicant.appliedPosition}</td>
            <td style={{ width: '25%' }}>
              <i
                className="fas fa-trash-alt"
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();  // Prevent row click event from firing
                  handleDelete(applicant.name);
                }}
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
    </div>
  );
};

export default ApplicantTable;
