import React from 'react';
import ApplicantTable from '../../admincomponents/applicanttable';
import AdminHeader from '../../admincomponents/adminheader';  
import AdminSidebar from "../../admincomponents/adminsidebar";

export default function AdminApplicants() {
    const username = "Adminser"; 

    return (
        <>
            <div className="d-flex" style={{ height: "100vh", flexDirection: "row" }}>
                {/* Include Sidebar */}
                <AdminSidebar />

                {/* Main Content */}
                <div className="flex-grow-1 p-4" style={{ backgroundColor: "transparent" }}>
                    {/* Include Header */}
                    <AdminHeader username={username} />
                    {/* Include the ApplicantTable here */}
                    <ApplicantTable />
                </div>
            </div>
        </>
    );
}
