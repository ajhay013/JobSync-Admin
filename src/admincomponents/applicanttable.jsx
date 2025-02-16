import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/BreadCumbs';
import { postToEndpoint } from '../components/apiService'

const AdminApplicantTable = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
        try {
            const response = await postToEndpoint('/findApplicant.php');
            if (response.data.applicants) {
                console.log(response.data.applicants)
                setApplicants(response.data.applicants);
            } else {
                console.error('No jobs found or an error occurred:', response.data.error);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };
    fetchApplicants();
  }, []);

  const [applicantData, setApplicantData] = useState([]);

  useEffect(() => {
    setApplicantData(applicants);
  }, [applicants]);

  const [searchQuery, setSearchQuery] = React.useState('');

  // Hover state for rows
  const [hoveredRowIndex, setHoveredRowIndex] = React.useState(null);

  // Filter data based on the search query
  const filteredData = React.useMemo(() => {
    return applicantData.filter((applicant) => {
      return (
        (applicant.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (applicant.appliedPosition?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (applicant.skills?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery, applicantData]);
  

  // Columns configuration
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'firstname',
        Cell: ({ row }) => `${row.original.firstname} ${row.original.middlename} ${row.original.lastname}`
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Contact',
        accessor: 'contact',
      },
      {
        Header: 'Attainment',
        accessor: 'attainment',
      },
      {
        Header: 'Date of Birth',
        accessor: 'birthday', 
        Cell: ({ value }) => {
          if (!value) return '';  
          const date = new Date(value);
          return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
        }
      },
      {
        Header: 'City',
        accessor: 'city',
      },
      {
        Header: 'Action',
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

  const handleDelete = (index) => {
    setApplicantData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: filteredData,
  });


  const handleRowClick = (rowData) => {
    navigate('/adminapplicants/applicantdetailspreview', {
      state: { applicant: rowData },
    });
  };

  return (
    <>                
    <div className="container-fluid">
      <Breadcrumbs
        title="Applicant Details"
        links={[
          { label: "Dashboard", href: "/admindashboard" },
          { label: "Applicants", active: true },
        ]}
      />
      <p style={{ textAlign: 'left' }}>
        The table below displays applicants with their names, email, contact, and action to delete their entries.
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
          <table className="table table-bordered" {...getTableProps()} width="100%" cellSpacing="0">
            <thead>
              {headerGroups.map((headerGroup, id) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={id}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} key={column.id}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
              <tfoot>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Attainment</th>  
                  <th>Date of Birth</th>  
                  <th>Marital Status</th>  
                  <th>Action</th>
                </tr>
              </tfoot>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={row.id}
                        onClick={() => handleRowClick(row.original)}
                        onMouseEnter={() => setHoveredRowIndex(index)}
                        onMouseLeave={() => setHoveredRowIndex(null)}
                        style={{
                          cursor: 'pointer',
                          backgroundColor: index === hoveredRowIndex ? '#007bff' : '#007bff', 
                          color: 'white', 
                          transition: 'background-color 0.3s ease', 
                        }}>
                      {row.cells.map((cell, cellIndex) => (
                        <td {...cell.getCellProps()} key={cell.column.id}>{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminApplicantTable;
