// Employers.js
import React from 'react';
import AdminSidebar from "../../admincomponents/adminsidebar";
import EmployerTable from '../../admincomponents/employertable';
import AdminHeader from '../../admincomponents/adminheader';  

const username = "AdminUser";

export default function AdminEmployers() {
  return (
    <div className="d-flex" style={{ height: "100vh", flexDirection: "row" }}>
      {/* Include Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "transparent" }}>
        {/* Include Header */}
        <AdminHeader username={username} />

        {/* Employer Table */}
        <EmployerTable />
      </div>
    </div>
  );
}
