import React, { useEffect, useState } from 'react';

// Create component
function LastUserCard() {
  // Define state variables and state-updating functions
  const [userData, setUserData] = useState(null);
  // Define useEffect hook to manipulate data being fetched from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch('http://localhost:3001/api/user/last-registered')
        const userData = await userResponse.json();

        if (userData.meta.success) {
          //Update state variable value
          setUserData(userData)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData()

  }, []);


  // Return temporary element while the data is being fetched
  if (!userData) {
    return <div>Cargando información...</div>
  }

  //Change Date format
  const registrationDate = new Date(userData.user.created_at).toLocaleDateString()
  console.log(userData.user.image)

  return (

    <div className="card mt-3 border border-secondary p-0">
      <div className="card-header text-center">Último Usuario Registrado</div>
      <div className="card-body text-center">
        <img className="img-fluid" style={{ maxWidth: '100%', maxHeight: '200px' }} src={userData.user.image} />
        <h5 className="card-title mt-3">{userData.user.first_name} {userData.user.last_name}</h5>
        <div className="d-flex flex-column w-75 mx-auto">
          <p className="card-text text-center  border border-secondary"><strong>Tipo:</strong> {userData.user.type}</p>
          <p className="card-text text-center  border border-secondary"><strong>Provincia:</strong> {userData.user.address.province}</p>
          <p className="card-text text-center  border border-secondary"><strong>País:</strong> {userData.user.address.country}</p>
          <p className="card-text text-center  border border-secondary"><strong>Fecha de Registro:</strong> {registrationDate}</p>
        </div>
      </div>
    </div>
  );
}

export default LastUserCard;
