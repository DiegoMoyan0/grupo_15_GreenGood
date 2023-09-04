import React, { useEffect, useState } from 'react';
import imagenFondo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';


function LastUser() {
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
    <div className="col-lg-3 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">Last User in Data Base</h5>
        </div>
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <div className="text-center">
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 40 + 'rem', height: 20 + 'rem' }}  src={userData.userImage} alt=" User" />
          </div>
          <h5 className="card-title mt-3 text-center">{userData.user.first_name} {userData.user.last_name}</h5>
          <p className="card-text text-center">Tipo: {userData.user.type}</p>
          <p className="card-text text-center">Provincia: {userData.user.address.province}</p>
          <p className="card-text text-center">País: {userData.user.address.country}</p>
          <p className="card-text text-center">Fecha de Registro: {registrationDate}</p>
          <Link className="btn btn-danger" to={`/user/${userData.user.id}/detail`}>View User detail</Link>
        </div>
      </div>
    </div>
  )

}
export default LastUser;