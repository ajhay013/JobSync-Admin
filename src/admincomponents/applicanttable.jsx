import React from 'react';
import { useTable } from 'react-table';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminApplicantTable = () => {
  const navigate = useNavigate();

  // Sample data for applicants
  const initialData = React.useMemo(
    () => [
      {
        name: 'John Doe',
        appliedPosition: 'Software Engineer',
        skills: 'JavaScript, React, Node.js',
        contact: '+1234567890',
        email: 'johndoe@example.com',
        dob: '1990-01-01',
        nationality: 'American',
        gender: 'Male',
        maritalStatus: 'Single',
        experience: '3 years',
        education: 'B.Sc. Computer Science',
        resume: 'johndoe_resume.pdf',   
      },
      {
        name: 'Jane Smith',
        appliedPosition: 'Frontend Developer',
        skills: 'HTML, CSS, JavaScript, Angular',
        contact: '+0987654321',
        email: 'janesmith@example.com',
        dob: '1992-05-15',
        nationality: 'Canadian',
        gender: 'Female',
        maritalStatus: 'Married',
        experience: '2 years',
        education: 'B.A. Design',
        resume: 'janesmith_resume.pdf',   
      },
      // Add more sample data as needed
    ],
    []
  );

  const [applicantData, setApplicantData] = React.useState(initialData);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Hover state for rows
  const [hoveredRowIndex, setHoveredRowIndex] = React.useState(null);

  // Filter data based on the search query
  const filteredData = React.useMemo(() => {
    return applicantData.filter((applicant) => {
      return (
        applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        applicant.appliedPosition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        applicant.skills.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery, applicantData]);

  // Columns configuration
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Applied Position',
        accessor: 'appliedPosition',
      },
      {
        Header: 'Skills',
        accessor: 'skills',
      },
      {
        Header: 'Action',
        // Define a custom cell for the Action column with a delete button
        Cell: ({ row }) => (
          <button
            onClick={() => handleDelete(row.index)}
            className="btn btn-danger btn-sm"
          >
            <FaTrashAlt />
          </button>
        ),
      },
    ],
    []
  );

  // Delete handler function
  const handleDelete = (index) => {
    setApplicantData((prevData) => prevData.filter((_, i) => i !== index));
  };

  // Use the useTable hook to create the table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: filteredData, // Use filtered data here
  });

  // Handle row click to navigate to the applicant preview page
  const handleRowClick = (rowData) => {
    navigate('/adminapplicants/applicantdetailspreview', {
      state: { applicant: rowData },
    });
  };

  return (
    <div className="container-fluid">
      <h1 className="h3" style={{ textAlign: 'left' }}>Applicants</h1>
      <p style={{ textAlign: 'left' }}>
        The table below displays applicants with their respective applied positions, skills, and action to delete their entries.
      </p>

      {/* Search Filter */}
      <div className="mb-3">
        <div style={{ maxWidth: '300px', marginBottom: '15px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Applicants Table</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" {...getTableProps()} width="100%" cellspacing="0">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tfoot>
                <tr>
                  <th>Name</th>
                  <th>Applied Position</th>
                  <th>Skills</th>
                  <th>Action</th>
                </tr>
              </tfoot>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                  prepareRow(row);
                  const isHovered = index === hoveredRowIndex; // Check if this row is hovered
                  return (
                    <tr
                      {...row.getRowProps()}
                      onClick={() => handleRowClick(row.original)}
                      onMouseEnter={() => setHoveredRowIndex(index)} // Set hover state
                      onMouseLeave={() => setHoveredRowIndex(null)} // Reset hover state
                      style={{
                        cursor: 'pointer',
                        backgroundColor: isHovered ? '#007bff' : '#007bff', 
                        color: 'white', 
                        transition: 'background-color 0.3s ease', 
                      }}
                    >
                      {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminApplicantTable;
