import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faUser, faBriefcase, faClipboardList } from '@fortawesome/free-solid-svg-icons'; 
import "bootstrap/dist/css/bootstrap.min.css";
import { Line, Bar, Pie } from "react-chartjs-2";
import '../../../src/adminresponsive.css';
import AdminHeader from '../../admincomponents/adminheader';
import AdminSidebar from "../../admincomponents/adminsidebar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement
);

const Dashboard = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeLink, setActiveLink] = useState(null); 

  const username = "AdminUser";

  const financialStats = [
    { value: "4", description: "Total Applicants", icon: faUser, iconColor: "text-primary", bgColor: "bg-primary" },
    { value: "3", description: "Total Employers", icon: faBriefcase, iconColor: "text-success", bgColor: "bg-success" },
    { value: "10", description: "Total Jobs", icon: faClipboardList, iconColor: "text-warning", bgColor: "bg-warning" }
  ];

  const topJobsData = {
    labels: ["Software Engineer", "Web Developer", "Product Manager", "Designer", "Executive Manager"],
    datasets: [{ label: "Top Jobs", data: [120, 80, 100, 50, 30], borderColor: "#36a2eb", tension: 0.4, fill: false }]
  };

  const companyAppliedData = {
    labels: ["Riot", "Facebook", "Google"],
    datasets: [{ label: "Most Company Applied", data: [150, 120, 100], backgroundColor: "#ff6384" }]
  };

  const userGrowthData = {
    labels: ["Nov", "Dec"],
    datasets: [{ label: "User Growth", data: [2000, 2300], borderColor: "#4caf50", tension: 0.3, fill: false }]
  };

  const jobApplicationsByMonthData = {
    labels: ["Nov", "Dec"],
    datasets: [{ label: "Job Applications", data: [120, 150], backgroundColor: "#ff9800" }]
  };

  const jobTypesDistributionData = {
    labels: ["Full-Time", "Part-Time", "Contract", "Internship"],
    datasets: [{ label: "Job Type Distribution", data: [5000, 2500, 1000, 460], backgroundColor: ["#ffeb3b", "#8bc34a", "#f44336", "#2196f3"] }]
  };

  const jobTypesDistributionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.5,
  };

  return (
    <div className="d-flex" style={{ height: "100vh", flexDirection: "row" }}>
      {/* Sidebar */}
      <AdminSidebar
        hoveredLink={hoveredLink}
        setHoveredLink={setHoveredLink}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      />

      {/* Main Content */}
      <div className="flex-grow-1" style={{ backgroundColor: "transparent", marginTop: "0" }}>

        {/* Top Bar */}
        <AdminHeader username={username} />

        {/* Financial Statistics */}
        <div className="row g-5 mb-5"> {/* Added g-3 for spacing between cards */}
          {financialStats.map((stat, index) => (
            <div 
              key={index} 
              className={`col-12 col-md-6 col-lg-4 mb-4`}
            >
              <div className={`card shadow-sm ${stat.bgColor}`} style={{ width: "100%" , marginTop: "30px" , marginLeft: "-85px"}}>
                <div className="card-body d-flex justify-content-between align-items-center text-white">
                  <div>
                    <h2>{stat.value}</h2>
                    <p className="mb-0" style={{ fontSize: "20px", color: "white" }}>
                      {stat.description}
                    </p>
                  </div>
                  <div
                    className={`text-center ${stat.iconColor} p-3 rounded-circle`}
                    style={{
                      backgroundColor: "white",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <FontAwesomeIcon icon={stat.icon} size="3x" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="row g-3 mb-5" style={{ height: "350px" , width: "100%" , marginLeft: "-115px" }}> 
          <div className="col-12 col-md-7">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2>Top Jobs</h2>
                <div style={{ height: "275px", width: "130%" }}>
                  <Line data={topJobsData} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5">
            <div className="card shadow-sm" style={{ height: "350px", width: "120%" }}>
              <div className="card-body">
                <h2>Job Types Distribution</h2>
                <div style={{ height: "280px" }}>
                  <Pie data={jobTypesDistributionData} options={jobTypesDistributionOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Individual Cards without Shared Container */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' , marginLeft: "-130px" }}>
          {/* First Card: Most Company Applied */}
          <div style={{ flex: '1 1 40%', padding: '0.5rem' }}> 
            <div className="card shadow-sm" style={{ height: '100%' }}>
              <div className="card-body" style={{ padding: '2rem' }}>
                <h2>Most Company Applied</h2>
                <Bar data={companyAppliedData} />
              </div>
            </div>
          </div>

          {/* Second Card: User Growth */}
          <div style={{ flex: '1 1 33%', padding: '0.5rem' }}> {/* Set width to 33% */}
            <div className="card shadow-sm" style={{ height: '100%' }}>
              <div className="card-body" style={{ padding: '2rem' }}>
                <h2>User Growth</h2>
                <Line data={userGrowthData} />
              </div>
            </div>
          </div>

          {/* Third Card: Job Applications by Month */}
          <div style={{ flex: '1 1 33%', padding: '0.5rem' }}> {/* Set width to 33% */}
            <div className="card shadow-sm" style={{ height: '100%' }}>
              <div className="card-body" style={{ padding: '2rem' }}>
                <h2>Job Applications by Month</h2>
                <Bar data={jobApplicationsByMonthData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
