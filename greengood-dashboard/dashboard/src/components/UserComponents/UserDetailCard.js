import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from "../TopBar";

// Create component
function UserDetailCard() {
    // Define state variables and state-updating functions
    const [userData, setUserData] = useState(null);
    const { id } = useParams();
    // Define useEffect hook to manipulate data being fetched from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetch(`http://localhost:3001/api/user/users/${id}/detail`)
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

    return (

        <div className="container-fluid p-0" style={{ backgroundColor: '#F7F7F8' }}>
            <TopBar />
            <div className="card border border-secondary p-7 mt-3 w-25 mx-auto" >
                <div className="card-header text-center">Datos de {userData.user.first_name}</div>
                <div className="card-body text-center p-9">
                    <img className="img-fluid" style={{ maxWidth: '100%', maxHeight: '400px' }} src={userData.user.image} />
                    <h5 className="card-title text-center mt-3">{userData.user.first_name} {userData.user.last_name}</h5>
                    <div className='d-flex flex-column mx-auto'>
                        <p className="card-text text-center border border-secondary"><strong>Nombre de usuario:</strong> {userData.user.username}</p>
                        <p className="card-text text-center  border border-secondary"><strong>Email:</strong> {userData.user.email}</p>
                        <p className="card-text text-center  border border-secondary"><strong>Tipo de usuario:</strong> {userData.user.type}</p>
                        <p className="card-text text-center  border border-secondary"><strong>Teléfono:</strong> {userData.user.phone}</p>
                        <p className="card-text text-center  border border-secondary"><strong>País:</strong> {userData.user.address.country}</p>
                        <p className="card-text text-center  border border-secondary"><strong>Provincia:</strong> {userData.user.address.province}</p>
                        <p className="card-text text-center  border border-secondary"><strong>Ciudad:</strong> {userData.user.address.city}</p>
                        <p className="card-text text-center  border border-secondary"><strong>Fecha de registro:</strong> {registrationDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetailCard;
