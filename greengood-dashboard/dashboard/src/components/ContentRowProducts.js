import React, { useState, useEffect } from 'react';

function ContentRowProducts(props){
    const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await fetch(`http://localhost:3001/api/product/list`);
			const data = await response.json();
			if (data.meta.success) {
			  setProducts(data);
			}
		  } catch (error) {
			console.error('Error fetching products:', error);
		  }
		};
	
		fetchData();
	}, []);
	  
	const arrayMetrics = [{
		titulo: "Products in Data Base",
		cifra : `${products.meta.total}`,
		icono : `gift`,
		borderColor : "primary"
	},{
		titulo: "Seller Users in Data Base",
		cifra : "79",
		icono : "user",
		borderColor : "warning"
	},{
		titulo: "Buyers Users in Data Base",
		cifra : "49",
		icono : "user",
		borderColor : "success"
	}];

    return(
        <React.Fragment>

            
            {arrayMetrics.map((box, index) => {
                return (
                    <div className="col-md-4 mb-4" key={index+"ContentRowMovies"}>
                        <div className={`card border-left-${box.borderColor} shadow h-100 py-2`} >
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className={`text-xs font-weight-bold text-${box.borderColor} text-uppercase mb-1`}>{box.titulo}</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{box.cifra}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className={`fas fa-${box.icono} fa-2x text-gray-300`}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}   
            

        </React.Fragment>
    )
}
export default ContentRowProducts;