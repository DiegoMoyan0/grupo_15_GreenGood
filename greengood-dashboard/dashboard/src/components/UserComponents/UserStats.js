import React from 'react';
import LastUserCard from './LastUserCard';
import UserColumnChart from './UserColumnChart';
import UserTypePieChart from './UserTypePieChart';
import UserRegionalPurchases from './UserRegionalPurchases';
import UserTable from "./UserTable";
import TopBar from "../TopBar";


// Create user stats main component
function UserStats() {
  return (
    <React.Fragment>
      <div className="container-fluid p-0">
        <TopBar />
        <div className="container-fluid" style={{ backgroundColor: '#F7F7F8' }}>
          <div className="row">
            <div className="col-md-4">
              <UserTypePieChart title="User Type Distribution" />
            </div>
            <div className="col">
              <UserColumnChart title="Monthly Registrations" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 p-3">
              <LastUserCard title="Last Registered User" />
            </div>
            <div className="col mt-3 p-3">
              <UserRegionalPurchases title="User Purchases Per Country" />
            </div>
          </div>
          <div className="container-fluid">
            <div className="row mt-5 p-3">
              <div className="col">
                <h3 className="mt-4 ml-4 mb-0 mr-4 p-4 text-center text-white bg-dark">Listado de todos los usuarios de la base de datos Green Good</h3>
                <UserTable title="User Table" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserStats;
