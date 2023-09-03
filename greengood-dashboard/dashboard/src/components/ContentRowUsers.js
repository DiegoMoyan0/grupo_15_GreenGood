import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

function ContentRowUsers() {

  const [userCount, setUserCounts] = useState({ Vendedor: 0, Comprador: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {

        const userCountsResponse = await fetch('http://localhost:3001/api/user/type-count');
        const userCountNumber = await userCountsResponse.json();

        if (userCountNumber.meta.success) {
          setUserCounts(userCountNumber.counts);
        };

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  }, [])

 
  const arrayMetricsU = [
    {
      titulo: 'Total Users in Data Base',
      cifra: `${userCount.Comprador + userCount.Vendedor}`,
      icono: 'gift',
      borderColor: 'primary',
    },
    {
      titulo: 'Total Users Buyers in Data Base',
      cifra: `${userCount.Comprador}`,
      icono: 'user',
      borderColor: 'warning',
    },
    {
      titulo: 'Total Users Sellers in Data Base',
      cifra: `${userCount.Vendedor}`,
      icono: 'user',
      borderColor: 'success',
    },
  ];

  return (
    <>
      {arrayMetricsU.map((box, index) => {
        return (
          <div className="col-md-4 mb-4" key={index + 'ContentRowMovies'}>
            <div className={`card border-left-${box.borderColor} shadow h-100 py-2`}>
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className={`text-xs font-weight-bold text-${box.borderColor} text-uppercase mb-1`}>
                      {box.titulo}
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{box.cifra}</div>
                  </div>
                  <div className="col-auto">
                    <i className={`fas fa-${box.icono} fa-2x text-gray-300`}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ContentRowUsers;
