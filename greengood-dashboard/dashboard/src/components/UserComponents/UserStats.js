import React from 'react';
import UserCountryMap from './UserCountryMap';
import UserColumnChart from './UserColumnChart';
import UserTypePieChart from './UserTypePieChart';
import UserRegionalPurchases from './UserRegionalPurchases';
import TopBar from "../TopBar";


// Create user stats main component
function UserStats() {
  return (
    <React.Fragment>
      <div className="container-fluid p-0" style={{ backgroundColor: '#10142F' }}>
        <TopBar />
        <div className="container-fluid">
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
              <UserCountryMap title="Users Registered Per Country" />
            </div>
            <div className="col-md-8 mt-4">
              <UserRegionalPurchases title="User Purchases Per Country" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserStats;
