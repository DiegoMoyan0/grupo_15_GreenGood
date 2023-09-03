import React, { useEffect, useState } from 'react';
import imagenFondo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';


function LastProduct() {
    // Define state variables and state-updating functions
    const [productData, setProductData] = useState(null);
    // Define useEffect hook to manipulate data being fetched from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await fetch('http://localhost:3001/api/product/newests')
                let productData = await productResponse.json();

                productData = productData.data[0]

                //Update state variable value
                setProductData(productData)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData()
    }, []);


    // Return temporary element while the data is being fetched
    if (!productData) {
        return <div>Cargando información...</div>
    }

    //Change Date format
    const registrationDate = new Date(productData.created_at).toLocaleDateString()

    return (
        <div className="col-lg-3 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Last product in Data Base</h5>
                </div>
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 40 + 'rem' }} src={productData.image} alt=" Product" />
                    </div>
                    <h5 className="card-title mt-3 text-center">{productData.title}</h5>
                    <p className="card-text text-center">Descripcion: {productData.description}</p>
                    <p className="card-text text-center">Price: {productData.price}</p>
                    <p className="card-text text-center">Fecha de Registro: {registrationDate}</p>
                    <Link className="btn btn-danger" target="_blank" rel="nofollow" to={`/product/${productData.id}/detail`}>
                        View Product detail
                    </Link>
                </div>
            </div>
        </div>
    )

}
export default LastProduct;