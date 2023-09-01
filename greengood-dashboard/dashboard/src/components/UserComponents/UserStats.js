import React from 'react';
import LastUserCard from './LastUserCard';
import UserColumnChart from './UserColumnChart';
import UserTypePieChart from './UserTypePieChart';
import UserPurchasesProvince from './UserPurchasesProvince';

// Create user stats main component
function UserStats() {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <UserTypePieChart title="User Type Distribution" />
          </div>
          <div className="col">
            <UserColumnChart title="Monthly Registrations" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <LastUserCard title="Last Registered User" />
          </div>
          <div className="col mt-5">
            <UserPurchasesProvince title="User Purchases Per Province" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserStats;
