import React from 'react';
import UserDistMap from './UserCountryMap';
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
            <div className="col-md-8">
              <UserColumnChart title="Monthly Registrations" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mt-4">
              <UserDistMap title="Last Registered User" />
            </div>
            <div className="col-md-8 mt-5">
              <UserRegionalPurchases title="User Purchases Per Country" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserStats;
