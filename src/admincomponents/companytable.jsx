import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/BreadCumbs';

const AdminCompanyTable = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([
    { id: 1, logo: 'src/assets/riot.png', name: 'Tech Solutions', organization: 'Private', teamSize: '50-100', industry: 'Technology' },
    { id: 2, logo: 'src/assets/riot.png', name: 'HealthCare Plus', organization: 'Non-Profit', teamSize: '200-500', industry: 'Healthcare' },
    { id: 3, logo: 'src/assets/riot.png', name: 'EduLearn', organization: 'Educational', teamSize: '100-200', industry: 'Education' },
    { id: 4, logo: 'src/assets/riot.png', name: 'Finance Corp', organization: 'Corporate', teamSize: '500+', industry: 'Finance' },
    { id: 5, logo: 'src/assets/riot.png', name: 'RetailMart', organization: 'Retail', teamSize: '20-50', industry: 'Retail' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  
  const industries = ['All', 'Technology', 'Finance', 'Healthcare', 'Education', 'Retail'];

  const filteredData = React.useMemo(() => {
    return companies.filter((company) =>
      (selectedIndustry === 'All' || company.industry === selectedIndustry) &&
      (company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.teamSize.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, selectedIndustry, companies]);

  const handleDelete = (id) => {
    setCompanies((prevCompanies) => prevCompanies.filter((company) => company.id !== id));
  };

  const handleRowClick = (rowData) => {
    navigate('/admincompany/companypreview', { state: { company: rowData } });
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: React.useMemo(
      () => [
        { 
          Header: 'Logo', 
          accessor: 'logo', 
          Cell: ({ value }) => <img src={value} alt="Company Logo" style={{ width: '50px', height: '50px' }} /> 
        },
        { Header: 'Company Name', accessor: 'name' },
        { Header: 'Organization', accessor: 'organization' },
        { Header: 'Team Size', accessor: 'teamSize' },
        { Header: 'Industry', accessor: 'industry' },
        {
          Header: 'Action',
          Cell: ({ row }) => (
            <button onClick={() => handleDelete(row.original.id)} className="btn btn-danger btn-sm">
              <FaTrashAlt />
            </button>
          ),
        },
      ],
      []
    ),
    data: filteredData,
  });

  return (
    <div className="container-fluid">
      <Breadcrumbs
        title="Company Details"
        links={[
            { label: "Dashboard", href: "/admindashboard" },
            { label: "Companies", href: "/admincompanies" },
            { label: "Company Details", active: true }
            ]}
    />
      <p style={{ textAlign: 'left' }}>
        The table below displays companies with their logo, name, organization type, team size, and action to delete their entries.
      </p>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
        
        <select
          className="form-control"
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
          style={{ maxWidth: '200px', marginLeft: '10px' }}
        >
          {industries.map((industry, index) => (
            <option key={index} value={industry}>{industry}</option>
          ))}
        </select>
      </div>

      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Companies Table</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" {...getTableProps()} width="100%" cellSpacing="0">
              <thead>
                {headerGroups.map((headerGroup, id) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={id}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()} key={column.id}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={row.id} onClick={() => handleRowClick(row.original)} style={{ cursor: 'pointer' }}>
                      {row.cells.map((cell) => (
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
  );
};

export default AdminCompanyTable;
