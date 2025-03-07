import React, { useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { FaTrashAlt } from 'react-icons/fa';
import Breadcrumbs from '../components/BreadCumbs';

const JobsTable = () => {
  const [jobs, setJobs] = useState([
    { id: 1, company: 'Tech Solutions', title: 'Software Engineer', applications: 25, status: 'ACTIVE' },
    { id: 2, company: 'HealthCare Plus', title: 'Medical Assistant', applications: 12, status: 'EXPIRED' },
    { id: 3, company: 'EduLearn', title: 'Math Teacher', applications: 18, status: 'ACTIVE' },
    { id: 4, company: 'Finance Corp', title: 'Financial Analyst', applications: 30, status: 'EXPIRED' },
    { id: 5, company: 'RetailMart', title: 'Sales Associate', applications: 9, status: 'ACTIVE' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');

  // Filtered jobs based on search query and company filter
  const filteredData = useMemo(() => {
    return jobs.filter(job =>
      (job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (companyFilter === '' || job.company === companyFilter)
    );
  }, [searchQuery, companyFilter, jobs]);

  // Function to delete job
  const handleDelete = (id) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
  };

  // Define table columns
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: useMemo(
      () => [
        { Header: 'Company Name', accessor: 'company' },
        { Header: 'Job Title', accessor: 'title' },
        { Header: 'No. of Applications', accessor: 'applications' },
        { 
          Header: 'Status', 
          accessor: 'status', 
          Cell: ({ value }) => (
            <span style={{ 
              backgroundColor: value === 'ACTIVE' ? 'green' : 'red', 
              color: 'white',
              fontSize: '10px',
              padding: '3px 8px',
              borderRadius: '7px',
              display: 'inline-block',
              minWidth: '70px',
              textAlign: 'center'
            }}>
              {value}
            </span>
          ) 
        },
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
  title="Job Details"
  links={[
    { label: "Dashboard", href: "/admindashboard" },
    { label: "Jobs" , href: "/admincompanies" },
    { label: "Job Details", active: true }
  ]}
/>
      <p style={{ textAlign: 'left' }}>
        The table below displays job listings with the company name, job title, number of applications, and status.
      </p>

      {/* Search and Filter */}
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
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          style={{ maxWidth: '200px', marginLeft: '10px' }}
        >
          <option value="">All Companies</option>
          {[...new Set(jobs.map(job => job.company))].map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
      </div>

      {/* Jobs Table */}
      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Jobs Table</h6>
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
                    <tr {...row.getRowProps()} key={row.id}>
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

export default JobsTable;