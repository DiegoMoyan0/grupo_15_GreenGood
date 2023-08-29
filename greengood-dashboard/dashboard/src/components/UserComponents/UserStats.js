import React from 'react';
import LastUserCard from './LastUserCard'
import UserHighChart from './UserHighChart'
import UserTypePieChart from './UserTypePieChart'


function UserStats() {
  return (
    <React.Fragment>
      <div>


  {/*<!-- <UserCard title="Info Users" />-->*/}

  <LastUserCard title="Info Users" />
        

      </div>

  {/*<!--   -->*/}

  <UserHighChart  title="Monthly Registrations" />


  <UserTypePieChart  title="User Type Tistribution" />
      
 
    </React.Fragment>
  );
}

export default UserStats;
