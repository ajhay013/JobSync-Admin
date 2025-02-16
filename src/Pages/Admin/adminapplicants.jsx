import React from 'react';
import ApplicantTable from '../../admincomponents/applicanttable';
import '../../admin.css';
import AdminSidebar from '../../components/adminsidebar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminApplicants() {
    const username = "Adminser"; 

    return (
        
        <>  
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
        
            <div className="d-flex" style={{ height: "100vh", flexDirection: "row" }}>
                {/* Include Sidebar */}
                <AdminSidebar />

                {/* Main Content */}
                <div className="flex-grow-1 p-4" style={{ backgroundColor: "transparent" }}>
                    {/* Include Header */}
                    {/* <AdminHeader username={username} /> */}
                    
                    {/* Include the ApplicantTable here */}
                    <ApplicantTable />
                </div>
            </div>
        </>
    );
}
