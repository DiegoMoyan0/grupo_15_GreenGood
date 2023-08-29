import React, { useEffect, useState } from 'react';

function LastUserCard() {
  const [userData, setUserData] = useState(null);

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

          setUserData(userData)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData()
    
  }, []);

  if (!userData) {
    return <div>Cargando información...</div>
  }


  const registrationDate = new Date(userData.user.created_at).toLocaleDateString()

  return (
    
    <div className="card">
      <div className="card-header">Último usuario registrado</div>
      <div className="card-body">
        <img src={userData.userImage} alt="User" className="user-image img-fluid" />
        <h5 className="card-title">{userData.user.first_name} {userData.user.last_name}</h5>
        <p className="card-text">Tipo: {userData.user.type}</p>
        <p className="card-text">Provincia: {userData.user.address.province}</p>
        <p className="card-text">País: {userData.user.address.country}</p>
        <p className="card-text">Fecha de Registro: {registrationDate}</p>
      </div>
    </div>
  );
}

export default LastUserCard;
