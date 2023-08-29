import React from 'react';
import LastUserCard from './LastUserCard'
import UserHighChart from './UserHighChart'

function UserStats() {
  return (
    <React.Fragment>
      <div>


  {/*<!-- <UserCard title="Info Users" />-->*/}

  <LastUserCard title="Info Users" />
        


  
      </div>

  {/*<!-- <UserHighChart />-->*/}
  <UserHighChart  title="Monthly Registrations" />
      
 
    </React.Fragment>
  );
}

export default UserStats;
