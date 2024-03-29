import React, { useEffect, useState } from 'react';
import CustomizedTables from './CustomizedTables';

function ProductsTable() {
  const [productsData, setProductsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch('http://localhost:3001/api/product/list')
        const productsData = await productsResponse.json();

        if (productsData.meta.success) {
          setProductsData(productsData);
        };
      } catch (error) {
        console.error('Error fetching data:', error);
      };
    };
    
    fetchData()
    
  }, []);

  if (!productsData) {
    return <div>Cargando información...</div>
  }

  return (
    <div className="container fluis p-2">
      <CustomizedTables products={productsData.data}/>
    </div>
  );
}

export default ProductsTable;