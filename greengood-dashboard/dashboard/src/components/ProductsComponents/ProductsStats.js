import React from 'react';
import ProductsPieCharts from './ProductsPieCharts';
import MostFavs from './MostFavs';
import BestSellers from './BestSellers';
import TopBar from '../TopBar';


// Create user stats main component
function ProductsStats() {
  return (
    <React.Fragment>
      <div className="container-fluid text-center p-0 " style={{backgroundColor: "#10142F"}}>
      <TopBar />
        <div className='row'>
          <h3 className='card-title'>Distribución de productos</h3>  
            <div className="col-md-12">
              {<ProductsPieCharts/>}
          </div>
        </div>
        <div className='row d-flex mt-5 flex-row justify-content-center'>
          <div className="col-md-4 rounded m-2 p-3" style={{backgroundColor: "#6c757d"}}>
            <h3 className='card-title' style={{color: "white", fontWeight: "600" }}>TOP 3 - PRODUCTOS FAVORITOS</h3>  
            {<MostFavs/>}
          </div>
          <div className="col-md-7 rounded m-2 p-3 d-flex flex-column justify-content-center" style={{backgroundColor: "#f8f9fa"}}>
            <h3 className='card-title mb-5' style={{color: "#dc3545", fontWeight: "600" }}>TOP 5 - MAS VENDIDOS</h3>  
            {<BestSellers/>}
          </div>
        </div>
        
      </div>
    </React.Fragment>
  );
}

export default ProductsStats;
