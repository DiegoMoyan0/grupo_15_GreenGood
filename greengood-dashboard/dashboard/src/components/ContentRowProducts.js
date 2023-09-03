import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

function ContentRowProducts() {
  const [products, setProducts] = useState({ meta: {}, data: [] })
  const [cultivoCount, setCultivoCount] = useState(0); // Contador para la categoría 'Cultivo'
  const [medicinalCount, setMedicinalCount] = useState(0); // Contador para la categoría 'Medicinal'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch('http://localhost:3001/api/product/list');
        const productsData = await productsResponse.json();

        if (productsData.meta.success) {
          setProducts(productsData);
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
      borderColor: 'grey',
      color: "black"
    },
    {
      titulo: 'Total Products Cultive in Data Base',
      cifra: `${cultivoCount}`,
      icono: 'seedling',
      borderColor: 'success',
      color: "#1cc88a"
    },
    {
      titulo: 'Total Products Medicine in Data Base',
      cifra: `${medicinalCount}`,
      icono: 'prescription-bottle',
      borderColor: 'primary',
      color: "#4e73df"
    },
  ];

  return (
    <>
      {arrayMetricsP.map((box, index) => {
        return (
          <div className={`col-md-${index === 0 ? '12' : '6'} mb-4`} key={index + 'ContentRowProducts'} style={{boder: "1px"}}>
            <div className={`card border-${box.borderColor} shadow h-55`}>
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2 text-center">
                    <div className={`text-${index === 0 ? '' : 'xs'} font-weight-bold text-${box.borderColor} text-uppercase mb-1`} style={{}}>
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
};

export default ContentRowProducts;
