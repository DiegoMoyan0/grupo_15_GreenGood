import React, { useState, useEffect } from 'react';

function ContentRowProducts() {
  const [products, setProducts] = useState({ meta: {}, data: [] })
  const [userCount, setUserCounts] = useState({ Vendedor: 0, Comprador: 0 });
  const [cultivoCount, setCultivoCount] = useState(0); // Contador para la categoría 'Cultivo'
  const [medicinalCount, setMedicinalCount] = useState(0); // Contador para la categoría 'Medicinal'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch('http://localhost:3001/api/product/list');
        const productsData = await productsResponse.json();

        const userCountsResponse = await fetch('http://localhost:3001/api/user/type-count');
        const userCountNumber = await userCountsResponse.json();

        if (productsData.meta.success && userCountNumber.meta.success) {
          setProducts(productsData);
          setUserCounts(userCountNumber.counts);
        }

        // Calcular los contadores de categoría 'Cultivo' y 'Medicinal'
        const cultivoTotal = productsData.data.filter((product) => product.category === 'Cultivo').length;
        const medicinalTotal = productsData.data.filter((product) => product.category === 'Medicinal').length;
        
        // Actualizar los estados de los contadores
        setCultivoCount(cultivoTotal);
        setMedicinalCount(medicinalTotal);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  }, [])

  const arrayMetricsP = [
    {
      titulo: 'Total Products in Data Base',
      cifra: `${products.meta.total}`,
      icono: 'gift',
      borderColor: 'primary',
    },
    {
      titulo: 'Total Products Cultive in Data Base',
      cifra: `${cultivoCount}`,
      icono: 'gift',
      borderColor: 'warning',
    },
    {
      titulo: 'Total Products Medicine in Data Base',
      cifra: `${medicinalCount}`,
      icono: 'gift',
      borderColor: 'success',
    },
  ];
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
      {arrayMetricsP.map((box, index) => {
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

export default ContentRowProducts;
