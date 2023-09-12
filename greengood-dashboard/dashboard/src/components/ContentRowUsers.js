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
      icono: 'users',
      borderColor: '#2b5297',
      color: "#2b5297"
    },
    {
      titulo: 'Total Users Buyers in Data Base',
      cifra: `${userCount.Comprador}`,
      icono: 'user',
      borderColor: '#f6c23e',
      color: "#f6c23e"
    },
    {
      titulo: 'Total Users Sellers in Data Base',
      cifra: `${userCount.Vendedor}`,
      icono: 'user',
      borderColor: '#973be7',
      color: "#973be7"
    },
  ];

  return (
    <>
      {arrayMetricsU.map((box, index) => {
        return (
          <div className={`col-md-${index === 0 ? '12' : '6'} mb-4`} key={index + 'ContentRowProducts'} style={{boder: "1px"}}>
            <div className={`card shadow h-55`} style={{borderBlockColor: box.borderColor}}>
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2 text-center">
                    <div className={`text-${index === 0 ? '' : 'xs'} font-weight-bold text-uppercase mb-1`} style={{color: box.borderColor }}>
                      {box.titulo}
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{box.cifra}</div>
                  </div>
                  <div className="col-auto">
                    <i className={`fas fa-${box.icono} fa-2x `} style={{color: `${box.color}`}}></i>
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
