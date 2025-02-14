// Employers.js
import React from 'react';
import AdminSidebar from '../../components/adminsidebar';
import EmployerTable from '../../admincomponents/employertable'; 

const username = "AdminUser";

export default function AdminEmployers() {
  return (

    
    <div className="d-flex" style={{ height: "100vh", flexDirection: "row" }}>
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
          }
          #content-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          }
        `}
      </style>
      {/* Include Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "transparent" }}>
        {/* Employer Table */}
        <EmployerTable />
      </div>
    </div>
  );
}
