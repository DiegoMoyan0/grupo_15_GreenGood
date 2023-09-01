import React, { useEffect, useState } from 'react';


function ProductDetail() {
  const [productData, setProductData] = useState(null);
  const id = 177;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch(`http://localhost:3001/api/product/${id}/detail`)
        const productData = await productsResponse.json();

        if (productData.meta.success) {
          setProductData(productData);
        };
      } catch (error) {
        console.error('Error fetching data:', error);
      };
    };
    
    fetchData()
    
  }, []);

  if (!productData) {
    return <div>Cargando información...</div>
  }

  const prod = productData.data;

  return (
    <div className="container fluis">
      <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={prod.image} alt="" className='img-fluid'/>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{prod.title}</h5>
            <h3 className="card-title">{prod.description}</h3>
            
            <div className="container text-center rounded m-2 bg-opacity-80" style={{backgroundColor : "#1cc88a", color: "white"}}>
                <div className="row align-items-start">
                    <div className="col">
                        <p className='p-3'>CATEGORÍA:</p>
                        <p>{prod.category}</p>
                    </div>
                    <div className="col">
                        <p className='p-3'> SUBCATEGORÍA: </p>
                        <p>{prod.subcategory}</p>
                    </div>
                    <div className="col">
                        <p className='p-3'> TIPO: </p>
                        <p> {prod.type}</p>
                    </div>
                </div>
            </div>

            <div className="container text-center  border border-success rounded m-2">
                <div className="row row-cols-2">
                    <div className="col">
                        <p className='p-3' style={{color: "green"}}>Precio:</p>
                        <p>ARS ${prod.price}</p>
                    </div>
                    <div className="col">
                        <p className='p-3' style={{color: "green"}}>Descuento:</p>
                        <p>{prod.discount? prod.discount + "%" : "s/d"}</p>
                    </div>
                    <div className="col" style={{color: "green"}}>
                        <p className='p-3'>Stock:</p>
                        <p>{prod.stock}</p>
                    </div>
                    <div className="col" style={{color: "green"}}>
                        <p className='p-3'>Ventas:</p>
                        <p>{prod.sales_amount}</p>
                    </div>
                </div>
            </div>
        
            <p className="card-text">{prod.info}</p>
            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ProductDetail;