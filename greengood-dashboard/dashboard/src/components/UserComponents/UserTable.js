import React, { useEffect, useState } from 'react';
import CustomizedUserTable from './CustomizedUserTable';

// Create component
function UserTable() {
  // Define state variables and state-updating functions
  const [usersData, setUsersData] = useState(null);
  // Define useEffect hook to manipulate data being fetched from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('http://localhost:3001/api/user/full-list')
        const usersData = await usersResponse.json();

        if (usersData.meta.success) {
          //Update state variable value
          setUsersData(usersData);
        };
      } catch (error) {
        console.error('Error fetching data:', error);
      };
    };

    fetchData()

  }, []);

  // Return temporary element while the data is being fetched
  if (!usersData) {
    return <div>Cargando información...</div>
  }

  return (
    <div className="container-fluid">
      <CustomizedUserTable users={usersData.usersList} />
    </div>
  );
}

export default UserTable;