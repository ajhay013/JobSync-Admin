import React from 'react';
import { useTable } from 'react-table';
import { FaTrashAlt } from 'react-icons/fa'; // Importing trash icon from react-icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Breadcrumbs from '../components/BreadCumbs';

const EmployerTable = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Sample data for authorized representatives and their respective companies
  const initialData = React.useMemo(
    () => [
      {
        name: 'John Doe',  // Changed from representative to name
        company: 'Tech Innovators Ltd.',
        position: 'CEO',   // Added position field
        contact: '123-456-7890',  // Added contact field
        email: 'john.doe@example.com',  // Added email field
        idFront: 'path/to/front-id.jpg', // Added ID images
        idBack: 'path/to/back-id.jpg',
      },
      {
        name: 'Jane Smith',
        company: 'Creative Solutions Inc.',
        position: 'CTO',
        contact: '987-654-3210',
        email: 'jane.smith@example.com',
        idFront: 'path/to/front-id2.jpg',
        idBack: 'path/to/back-id2.jpg',
      },
      // Additional entries...
    ],
    []
  );

  const [representativeData, setRepresentativeData] = React.useState(initialData);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Filter data based on the search query
  const filteredData = React.useMemo(() => {
    return representativeData.filter((applicant) => {
      return (
        applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        applicant.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        applicant.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery, representativeData]);

  // Columns configuration
  const columns = React.useMemo(
    () => [
      {
        Header: 'Authorized Representative',  // Renamed from Authorized Representative to Employer Name
        accessor: 'name',         // Changed from 'representative' to 'name'
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Designation',
        accessor: 'position',
      },
      {
        Header: 'Contact',
        accessor: 'contact',
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
    setRepresentativeData((prevData) => prevData.filter((_, i) => i !== index));
  };
  const handleRowClick = (rowData) => {
    navigate('/adminemployers/employerdetailspreview', { state: { employer: rowData } });
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: filteredData,   
  });

  return (
    <div className="container-fluid">
      <Breadcrumbs
        title="Authorized Representative"
        links={[
          { label: "Dashboard", href: "/admindashboard" },
          { label: "Authorized Representative", active: true },
        ]}
      />
      <p className="mb-4" style={{ textAlign: 'left' }}>
        The table below displays authorized representatives with their respective companies, and an action to delete their entries.
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

      {/* DataTable Example */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Authorized Representative Table</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" {...getTableProps()} width="100%" cellSpacing="0">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tfoot>
                <tr>
                  <th>Authorized Representative</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Contact</th>
                  <th>Action</th>
                </tr>
              </tfoot>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      onClick={() => handleRowClick(row.original)} // Row click to navigate
                      style={{ cursor: 'pointer' }} // Make it look clickable
                    >
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
  );
};

export default EmployerTable;
