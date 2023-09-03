import React from 'react';
import ProductsPieCharts from './ProductsPieCharts';
import MostFavs from './MostFavs';
import BestSellers from './BestSellers';


// Create user stats main component
function ProductsStats() {
  return (
    <React.Fragment>
      <div className="container text-center m-2 p-2 ">
        <div className='row'>
          <h3 className='card-title'>Distribución de productos</h3>  
            <div className="col-md-12">
              {<ProductsPieCharts/>}
          </div>
        </div>
        <div className='row d-flex mt-5 flex-row justify-content-space-between'>
          <div className="col-md-4 rounded m-2 p-3" style={{backgroundColor: "#e74a3b"}}>
            <h3 className='card-title' style={{color: "white", fontWeight: "600" }}>Top 3 de Productos favoritos</h3>  
            {<MostFavs/>}
          </div>
          <div className="col-md-7 rounded m-2 p-3 d-flex flex-column justify-content-center" style={{backgroundColor: "#1cc88a"}}>
            <h3 className='card-title' style={{color: "white", fontWeight: "600" }}>Top 5 Best Sellers</h3>  
            {<BestSellers/>}
          </div>
        </div>
        
      </div>
    </React.Fragment>
  );
}

export default ProductsStats;
