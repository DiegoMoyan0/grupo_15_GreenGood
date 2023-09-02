import React from 'react';
import LastProductCard from '../LastProduct';
import ProductsColumnsChart from './ProductsColumnsChart';
import ProductsPieCharts from './ProductsPieCharts';


// Create user stats main component
function ProductsStats() {
  return (
    <React.Fragment>
      <div className="container text-center m-2 p-2 " style={{width: "fit-content", height: "fit-content"}}>
        <h3 className='card-title'>Distribución de productos</h3>  
          <div className="col-md-12">
            {<ProductsPieCharts/>}
        </div>
      </div>
      <div className="container text-center m-2 p-2 " style={{width: "fit-content", height: "fit-content"}}>
        <h3 className='card-title'>Distribución de productos</h3>  
          <div className="col-md-12">
            {<ProductsPieCharts/>}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProductsStats;
