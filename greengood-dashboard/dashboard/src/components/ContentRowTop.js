import  React  from "react";
import imagenFondo from '../assets/images/logo.png';
import ContentRowProducts from "./ContentRowProducts";
import LastProduct from "./LastProduct";
import LastUser from "./LastUser";
import Subcategories from "./Subcategories";
import ProductsTable from "./TablesComponents/ProductsTablesContainer";


function ContentRowTop(){
    return(
        <>
				{/*<!-- Content Row Top -->*/}
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">Dashboard Greengood</h1>
					</div>
				
					{/*<!-- Content Row Products-->*/}
					<div className="row">
						<ContentRowProducts />
					</div>
					{/*<!-- End products in Data Base -->*/}
					
	
					{/*<!-- Content Row Last Product in Data Base -->*/}
					<div className="row">
						{/*<!-- Last Product in DB -->*/}
						<LastProduct />

						{/*<!-- End content row last movie in Data Base -->*/}

						{/*<!-- Last User in DB -->*/}
						<LastUser />

						{/*<!-- End content row last movie in Data Base -->*/}

						{/*<!-- Subcategories in DB -->*/}
						<Subcategories />
						
					</div>
				</div>
				{/*<!--End Content Row Top-->*/}

        </>
    )

}
export default ContentRowTop;