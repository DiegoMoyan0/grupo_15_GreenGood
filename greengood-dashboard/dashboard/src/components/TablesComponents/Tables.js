import React from 'react';
import ProductsTablesContainer from "./ProductsTablesContainer";

// Products Tables
function Tables() {
  
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
       {/*    <div className="col-md-4">
            <ProductsTablesContainer title="User Type Distribution" />
          </div> */}
          <div className="col">
            <h3 className="m-4">Listado de todos los productos de la base de datos Green Good</h3>
          </div>
           <ProductsTablesContainer title="Monthly Registrations" />
        </div>
        <div className="row">
          {/* <div className="col-md-4">
            <ProductsTablesContainer title="Last Registered User" />
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Tables;
