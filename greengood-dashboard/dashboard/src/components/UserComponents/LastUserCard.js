import React, { useEffect, useState } from 'react'

function LastUserCard() {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user/last-registered');
        const data = await response.json()
        if (data.meta.success) {
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    };

    console.log(userData)

    fetchData()
  }, [])


  const registrationDate = new Date(userData.user.created_at).toLocaleDateString()

  return (
    <div className="card">
      <div className="card-header">Último usuario registrado</div>
      <div className="card-body">
        <img src={userData.user_image} alt="User" className="user-image" />
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
