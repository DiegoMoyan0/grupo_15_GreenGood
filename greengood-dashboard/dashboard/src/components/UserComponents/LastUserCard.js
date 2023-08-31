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
          const userId = userData.user.id
          const userImageResponse = await fetch(`http://localhost:3001/api/user/image/${userId}`)
          const userImageData = await userImageResponse.json()

          if (userImageData.meta.success) {
            userData.userImage = userImageData.userImage
          }
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

  return (

    <div className="card mt-3">
      <div className="card-header text-center">Último Usuario Registrado</div>
      <div className="card-body text-center">
        <img  className="img-fluid" style={{ maxWidth: '100%', maxHeight: '200px' }} src={userData.userImage}/>
        <h5 className="card-title mt-3">{userData.user.first_name} {userData.user.last_name}</h5>
        <p className="card-text text-center">Tipo: {userData.user.type}</p>
        <p className="card-text text-center">Provincia: {userData.user.address.province}</p>
        <p className="card-text text-center">País: {userData.user.address.country}</p>
        <p className="card-text text-center">Fecha de Registro: {registrationDate}</p>
      </div>
    </div>
  );
}

export default LastUserCard;
