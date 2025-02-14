import React from 'react';
import Sidebar from '../../components/adminsidebar';
import '../../admin.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register necessary components in ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

// Reusable Card Component
const Card = ({ title, value, icon, color, progress }) => {
  return (
    <div className={`col-xl-3 col-md-6 mb-4`}>
      <div className={`card border-left-${color} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>
                {title}
              </div>
              {progress ? (
                <div className="row no-gutters align-items-center">
                  <div className="col-auto">
                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{value}%</div>
                  </div>
                  <div className="col">
                    <div className="progress progress-sm mr-2">
                      <div className={`progress-bar bg-${color}`} role="progressbar" style={{ width: `${value}%` }}
                        aria-valuenow={value} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h5 mb-0 font-weight-bold text-gray-800">{value}</div>
              )}
            </div>
            <div className="col-auto">
              <i className={`fas fa-${icon} fa-2x text-gray-300`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  // Data for the charts
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
      label: 'Job Applications',
      data: [50, 100, 200, 300, 400],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    }],
  };

  const barChartData = {
    labels: ['Job A', 'Job B', 'Job C', 'Job D', 'Job E'],
    datasets: [{
      label: 'Applications per Job',
      data: [45, 50, 60, 75, 80],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  };

  const doughnutChartData = {
    labels: ['Applicants', 'Employers', 'Jobs'],
    datasets: [{
      data: [300, 150, 250],
      backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
      borderWidth: 1,
    }],
  };

  return (
    <div id="page-top">
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
      <div id="wrapper" style={{ padding: 0 }}>
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" style={{ width: '100%', margin: 0 }}>
           {/* Topbar */}
           <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <ul className="navbar-nav ml-auto">
                {/* Search Dropdown */}
                <li className="nav-item dropdown no-arrow d-sm-none">
                  <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-search fa-fw"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                    <form className="form-inline mr-auto w-100 navbar-search">
                      <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>

                {/* Alerts Dropdown */}
                <li className="nav-item dropdown no-arrow mx-1">
                  <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-bell fa-fw"></i>
                    <span className="badge badge-danger badge-counter">3+</span>
                  </a>
                  <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                    <h6 className="dropdown-header">Alerts Center</h6>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                      <div className="mr-3">
                        <div className="icon-circle bg-primary">
                          <i className="fas fa-file-alt text-white"></i>
                        </div>
                      </div>
                      <div>
                        <div className="small text-gray-500">December 12, 2019</div>
                        <span className="font-weight-bold">A new monthly report is ready to download!</span>
                      </div>
                    </a>
                    {/* Add more alert items here */}
                    <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                  </div>
                </li>

                {/* Messages Dropdown */}
                <li className="nav-item dropdown no-arrow mx-1">
                  <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-envelope fa-fw"></i>
                    <span className="badge badge-danger badge-counter">7</span>
                  </a>
                  <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                    <h6 className="dropdown-header">Message Center</h6>
                    {/* Add message items here */}
                    <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                  </div>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>

                {/* User Information Dropdown */}
                <li className="nav-item dropdown no-arrow">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                    <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt="Profile" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Profile
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i> Settings
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i> Activity Log
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout
                    </a>
                  </div>
                </li>
              </ul>
            </nav>

            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                  <i className="fas fa-download fa-sm text-white-50"></i> Generate Report
                </a>
              </div>

              {/* Content Row */}
              <div className="row">
                <Card title="Earnings (Monthly)" value="$40,000" icon="calendar" color="primary" />
                <Card title="Earnings (Annual)" value="$215,000" icon="dollar-sign" color="success" />
                <Card title="Tasks" value="50" icon="clipboard-list" color="info" progress={true} />
                <Card title="Pending Requests" value="18" icon="comments" color="warning" />
              </div>

              <div className="row">
                {/* Line Chart */}
                <div className="col-lg-6 mb-4">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">Job Applications Over Time</h6>
                    </div>
                    <div className="card-body" style={{ height: '350px' }}> {/* Set fixed height */}
                      <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                  </div>
                </div>

                {/* Doughnut Chart (Replaced "Most Applied Jobs") */}
                <div className="col-lg-6 mb-4">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">Applicants, Employers, and Jobs Distribution</h6>
                    </div>
                    <div className="card-body" style={{ height: '350px' }}> {/* Set fixed height */}
                      <Doughnut data={doughnutChartData} options={{
                        cutout: '70%', // Creates the hole in the center
                        responsive: true,
                        maintainAspectRatio: false, // Allows resizing
                        plugins: {
                          tooltip: {
                            enabled: true, // Tooltip enabled
                          },
                          legend: {
                            position: 'top', // Legend position
                            labels: {
                              font: {
                                size: 12, // Adjust font size for the legend
                              },
                            },
                          },
                        },
                      }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Most Applied Jobs (Moved below Line Chart) */}
              <div className="row">
                <div className="col-lg-6 mb-4">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">Most Applied Jobs</h6>
                    </div>
                    <div className="card-body" style={{ height: '450px' , width: '100%' }}> {/* Set fixed height */}
                      <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
